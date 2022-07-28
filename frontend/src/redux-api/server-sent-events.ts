import { parseJSON } from '../functions/parse-json';
import { userApi } from './user/api';

export enum ServerSentEventType {
  JOURNALPOSTID = 'journalpostId',
}

type ServerSentEvent = MessageEvent<string>;

type ListenerFn<T> = (event: T) => void;
type JsonListenerFn<T> = (data: T | null, event: ServerSentEvent) => void;
type EventListenerFn = (event: Event) => void;
type EventListener = [ServerSentEventType, EventListenerFn];

export class ServerSentEventManager {
  private events: EventSource;
  private listeners: EventListener[] = [];
  private connectionListeners: ListenerFn<boolean>[] = [];
  private url: string;
  private lastEventId: string | null = null;

  public isConnected = false;

  constructor(url: string, initialEventId: string | null = null) {
    this.url = url;
    this.lastEventId = initialEventId;
    this.events = this.createEventSource();
  }

  public addConnectionListener(listener: ListenerFn<boolean>) {
    if (!this.connectionListeners.includes(listener)) {
      this.connectionListeners.push(listener);
    }

    listener(this.isConnected);
  }

  public addEventListener(eventName: ServerSentEventType, listener: ListenerFn<ServerSentEvent>) {
    const eventListener: EventListenerFn = (event) => {
      if (isServerSentEvent(event)) {
        this.lastEventId = event.lastEventId;
        listener(event);
      }
    };

    this.listeners.push([eventName, eventListener]);
    this.events.addEventListener(eventName, eventListener);

    return this;
  }

  public addJsonEventListener<T>(eventName: ServerSentEventType, listener: JsonListenerFn<T>) {
    this.addEventListener(eventName, (event) => {
      if (event.data.length === 0) {
        return listener(null, event);
      }

      const parsed = parseJSON<T>(event.data);
      listener(parsed, event);
    });

    return this;
  }

  private removeAllEventListeners() {
    if (typeof this.events !== 'undefined') {
      this.listeners.forEach(([event, listener]) => this.events.removeEventListener(event, listener));
    }
  }

  private async preflight(url: string): Promise<boolean> {
    try {
      const { status } = await fetch(url, { method: 'GET' });

      return status >= 200 && status < 400;
    } catch {
      return false;
    }
  }

  private createEventSource(): EventSource {
    const url = this.lastEventId === null ? this.url : `${this.url}?lastEventId=${this.lastEventId}`;

    const events = new EventSource(url);

    events.addEventListener('error', () => {
      if (events.readyState !== EventSource.CLOSED) {
        return;
      }

      this.isConnected = false;
      this.connectionListeners.forEach((listener) => listener(this.isConnected));

      setTimeout(async () => {
        const preflightOK = await this.preflight(url);

        if (!preflightOK) {
          // Probably the session timed out. Double check the logged in status.
          userApi.util.invalidateTags(['user', 'isAuthenticated']);

          return;
        }

        this.events = this.createEventSource();
      }, 3000);
    });

    events.addEventListener('open', () => {
      this.listeners.forEach(([event, listener]) => events.addEventListener(event, listener));
      this.isConnected = true;
      this.connectionListeners.forEach((listener) => listener(this.isConnected));
    });

    return events;
  }

  public close() {
    this.events?.close();
    this.removeAllEventListeners();
  }
}

const isServerSentEvent = (event: Event): event is ServerSentEvent => typeof event['data'] !== 'undefined';
