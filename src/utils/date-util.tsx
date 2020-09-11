import moment from 'moment';
import 'moment/locale/nb';

// TODO: Make date format/locale dynamic

export const formatDate = (date: Date | undefined): string => {
    let dateObj = moment(date);

    if (dateObj.isValid()) {
        return dateObj.locale('nb').format('L');
    } else {
        return 'Ingen dato satt';
    }
};

export const toISOString = (date: Date): string => {
    let momentDate = moment(date);
    return momentDate.isValid() ? momentDate.toISOString(true).substring(0, 10) : '';
};

export const dateStringToDate = (input: string): Date => {
    return moment(input, 'DD-MM-YYYY').toDate();
};
