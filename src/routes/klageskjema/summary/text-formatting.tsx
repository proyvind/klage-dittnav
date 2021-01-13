export const foedselsnrFormat = (fnr: string): string => {
    let fnrFormatted = fnr;

    if (fnr.length === 11) {
        return fnr.substring(0, 6) + ' ' + fnrFormatted.substring(6);
    }
    return fnr;
};

export const navnFormat = (navn: string): string => navn.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
