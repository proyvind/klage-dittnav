// TODO: Make date format/locale dynamic

export const formatDate = (date: Date): string => {
    if (isValidDate(date)) {
        const dateFormatted = new Intl.DateTimeFormat('no-NB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
        return dateFormatted;
    }
    return 'Ingen dato satt';
};

const isValidDate = (date: Date): boolean => {
    // If the date object is invalid it
    // will return 'NaN' on getTime()
    // and NaN is never equal to itself.
    // eslint-disable-next-line
    return date.getTime() === date.getTime();
};

export const isValidDateString = (date: string): boolean => {
    return !Number.isNaN(Date.parse(date));
};

export const toISOString = (date: Date): string => {
    return isValidDate(date) ? date.toISOString().substring(0, 10) : '';
};

export const formattedDateToDateObject = (formattedDate: string): Date => {
    formattedDate.replace('.', '-');
    return new Date(formattedDate.split('-').reverse().join('-'));
};
