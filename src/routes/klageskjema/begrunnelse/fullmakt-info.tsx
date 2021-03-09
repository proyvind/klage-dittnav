import AlertStripe from 'nav-frontend-alertstriper';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../app-context/app-context';
import { Row } from '../../../styled-components/row';
import { getFullName } from '../summary/personlige-opplysninger-summary';
import { foedselsnrFormat } from '../summary/text-formatting';
import styled from 'styled-components/macro';
import { useTranslation } from '../../../language/use-translation';

const PaddedPanel = styled(Panel)`
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
    p:first-of-type {
        margin-bottom: 10px;
    }
`;

const FullmaktInfo = () => {
    const { klage, fullmaktsgiver } = useContext(AppContext);
    const { klageskjema } = useTranslation();

    if (klage && klage.fullmaktsgiver && fullmaktsgiver) {
        return (
            <Row>
                <PaddedPanel border>
                    <AlertStripe type="info" form="inline">
                        <Element>{klageskjema.begrunnelse.fullmakt.label}</Element>
                        <Normaltekst>{`${getFullName(fullmaktsgiver)} (${foedselsnrFormat(
                            klage.fullmaktsgiver
                        )})`}</Normaltekst>
                    </AlertStripe>
                </PaddedPanel>
            </Row>
        );
    }
    return null;
};

export default FullmaktInfo;
