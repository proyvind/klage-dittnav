import React from 'react';
import { Label } from 'nav-frontend-skjema';
import { Datepicker } from 'nav-datovelger';
import { ISODate } from '../../../date/date';
import { Row } from '../../../styled-components/row';
import { Languages } from '../../../language/language';

interface Props {
    vedtakDate: ISODate | null;
    setVedtakDate: (date: ISODate | null) => void;
    title: string;
    lang: Languages;
}

const VedtakDate = ({ title, vedtakDate, setVedtakDate, lang }: Props) => (
    <Row>
        <Label htmlFor="vedtaksdato">{title}</Label>
        <Datepicker
            onChange={(dateISO, isValid) => setVedtakDate(isValid ? dateISO : null)}
            value={vedtakDate ?? undefined}
            showYearSelector
            limitations={{
                maxDate: new Date().toISOString().substring(0, 10)
            }}
            inputId="vedtaksdato"
            locale={lang}
        />
    </Row>
);

export default VedtakDate;
