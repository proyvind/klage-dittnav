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
    return momentDate.isValid() ? (date.toISOString() ? date.toISOString().substring(0, 10) : '') : '';
};
