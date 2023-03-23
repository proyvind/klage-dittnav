import { getInstance } from 'amplitude-js';
import { Innsendingsytelse } from '../innsendingsytelser/innsendingsytelser';

const APP_NAME = 'klage-dittnav';

enum AmplitudeEvent {
  PAGE_VIEW = 'sidevisning',
}

export enum PageIdentifier {
  KLAGESKJEMA_BEGRUNNElSE = 'KLAGESKJEMA_BEGRUNNElSE',
  KLAGESKJEMA_KVITTERING = 'KLAGESKJEMA_KVITTERING',
  KLAGESKJEMA_OPPSUMMERING = 'KLAGESKJEMA_OPPSUMMERING',
  KLAGESKJEMA_INNSENDING = 'KLAGESKJEMA_INNSENDING',
  ANKESKJEMA_BEGRUNNElSE = 'ANKESKJEMA_BEGRUNNElSE',
  ANKESKJEMA_KVITTERING = 'ANKESKJEMA_KVITTERING',
  ANKESKJEMA_OPPSUMMERING = 'ANKESKJEMA_OPPSUMMERING',
  ANKESKJEMA_INNSENDING = 'ANKESKJEMA_INNSENDING',
  INNGANG_INNSENDING_POST = 'INNGANG_INNSENDING_POST',
  INNGANG_INNSENDING_DIGITAL = 'INNGANG_INNSENDING_DIGITAL',
  INNGANG_HOVEDKATEGORIER = 'INNGANG_HOVEDKATEGORIER',
  INNGANG_KATEGORIER = 'INNGANG_KATEGORIER',
  NOT_FOUND = 'NOT_FOUND',
}

const client = getInstance();

client.init('default', '', {
  apiEndpoint: 'amplitude.nav.no/collect-auto',
  saveEvents: false,
  includeUtm: true,
  includeReferrer: true,
  platform: window.location.origin,
});

interface ExtraEventData {
  page: PageIdentifier;
  innsendingsytelse?: Innsendingsytelse;
  title?: string;
}

interface EventData extends ExtraEventData {
  app: string;
  url: string;
}

const logAmplitudeEvent = async (eventName: AmplitudeEvent, eventProperties: ExtraEventData) =>
  await new Promise<void>((resolve, reject) => {
    const eventData: EventData = {
      ...eventProperties,
      app: APP_NAME,
      url: window.location.href,
    };
    client.logEvent(eventName, eventData, (responseCode) => {
      if (responseCode === 200) {
        resolve();

        return;
      }

      reject();
    });
  });

export const logPageView = (page: PageIdentifier, innsendingsytelse?: Innsendingsytelse, title?: string) =>
  logAmplitudeEvent(AmplitudeEvent.PAGE_VIEW, {
    page,
    title,
    innsendingsytelse,
  });
