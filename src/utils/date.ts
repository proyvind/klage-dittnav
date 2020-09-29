const isoRegex = /^\d{4}-\d{2}-\d{2}$/;

export function isoDateToPretty(isoDate: string | null): string | null {
    if (isoDate === null || !isoRegex.test(isoDate)) {
        return null;
    }
    return isoDate.split('-').reverse().join('.');
}

const prettyRegex = /^\d{2}.\d{2}.\d{4}$/;

export function prettyDateToISO(prettyDate: string | null): string | null {
    if (prettyDate === null || !prettyRegex.test(prettyDate)) {
        return null;
    }
    return prettyDate.split('.').reverse().join('-');
}
