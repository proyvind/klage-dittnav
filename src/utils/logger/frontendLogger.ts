import { v4 as uuidv4 } from 'uuid';
import { detect } from 'detect-browser';

const logCorrelation = uuidv4();

interface ValuePairs {
    [name: string]: string | number | boolean | object | null | undefined;
}

type Message = { message: string };
interface FrontendLogger {
    info: (e: string | Message) => void;
    warn: (e: string | Message) => void;
    error: (e: string | Message) => void;
    event: (name: string, fields: any, tags: any) => void;
}

declare global {
    interface Window {
        frontendlogger: FrontendLogger;
    }
}

export function loggEvent(action: string, location: string, extraTags?: ValuePairs, fields?: ValuePairs) {
    if (!uselogger()) {
        return;
    }
    const event = {
        table: 'klage-dittnav',
        fields: { ...fields, logCorrelation: logCorrelation },
        tags: {
            action: action,
            location: location,
            ...extraTags
        }
    };
    window.frontendlogger.event(event.table, emptyStringToUndefined(event.fields), emptyStringToUndefined(event.tags));
}

export function logInfo(message: string, fields?: ValuePairs) {
    const info = {
        uselogger: uselogger(),
        message: message,
        ...fields
    };
    console.info(info);
    if (uselogger()) {
        window.frontendlogger.info(info);
    }
}
export function logWarning(error: Error, message?: string, fields?: ValuePairs, extraTagsLogEvent?: ValuePairs) {
    const browser = detect();
    const info = {
        message: `${message ? message + ': ' : ''} ${error.name} ${error.message}`,
        url: document.URL,
        error: error.stack,
        browser: (browser && browser.name) || undefined,
        ...fields
    };
    console.warn(info);
    if (uselogger()) {
        loggEvent('Warning', 'Logger', extraTagsLogEvent);
        window.frontendlogger.warn(info);
    }
}

export function logError(error: Error, message?: string, fields?: ValuePairs, extraTagsLogEvent?: ValuePairs) {
    const browser = detect();
    const info = {
        message: `${message ? message + ': ' : ''} ${error.name} ${error.message}`,
        url: document.URL,
        error: error.stack,
        browser: (browser && browser.name) || undefined,
        ...fields
    };
    console.error(info);
    if (uselogger()) {
        loggEvent('Error', 'Logger', extraTagsLogEvent);
        window.frontendlogger.error(info);
    }
}

function frontendLoggerIsInitialized(): boolean {
    if (!window.frontendlogger) {
        console.warn('frontend-logger not initialized properly');
        return false;
    }
    return true;
}

function uselogger(): boolean {
    return frontendLoggerIsInitialized();
}

function emptyStringToUndefined(valuePairs: ValuePairs) {
    return Object.keys(valuePairs).reduce(
        (acc: ValuePairs, key: string) => ({
            ...acc,
            [key]: valuePairs[key] === '' ? undefined : valuePairs[key]
        }),
        {}
    );
}
