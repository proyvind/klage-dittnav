import React from 'react';
import { Label } from 'nav-frontend-skjema';
import { Datepicker } from 'nav-datovelger';
import { ISODate } from '../../../date/date';
import { Row } from '../../../styled-components/row';

interface Props {
    vedtakDate: ISODate | null;
    setVedtakDate: (date: ISODate | null) => void;
}

const VedtakDate = ({ vedtakDate, setVedtakDate }: Props) => (
    <Row>
        <Label htmlFor="vedtaksdato">Vedtaksdato (valgfri)</Label>
        <Datepicker
            onChange={(dateISO, isValid) => setVedtakDate(isValid ? dateISO : null)}
            value={vedtakDate ?? undefined}
            showYearSelector
            limitations={{
                maxDate: new Date().toISOString().substring(0, 10)
            }}
            inputId="vedtaksdato"
        />
    </Row>
);

export default VedtakDate;
