import moment from 'moment';
import 'moment/locale/nb';

// TODO: Make date format/locale dynamic

export const formatDate = (date: Date) => {
    return moment(date).locale('nb').format('L');
};

export const toISOString = (date: Date): string => {
    return date.toISOString().substring(0, 10);
};
