import React from 'react';
import { ISODate, dateDisplayWithFallbackText } from '../../../date/date';
import { Row } from '../../../styled-components/row';
import InformationPointBox from '../summary/information-point-box';
import { Normaltekst } from 'nav-frontend-typografi';
import { useTranslation } from '../../../language/use-translation';

interface Props {
    vedtakDate: ISODate | null;
    title: string;
}

const VedtakDate = ({ title, vedtakDate }: Props) => {
    const { ankeskjema } = useTranslation();

    return (
        <Row>
            <InformationPointBox header={title}>
                <Normaltekst>
                    {dateDisplayWithFallbackText(vedtakDate, ankeskjema.summary.sections.case.no_date)}
                </Normaltekst>
            </InformationPointBox>
        </Row>
    );
};

export default VedtakDate;
