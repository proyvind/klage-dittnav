import React, { useState } from 'react';
import styled from 'styled-components';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    MarginContainer,
    matchMediaQueries,
    ButtonFlexContainer,
    device,
    FlexWithSpacingContainer
} from '../../styled-components/main-styled-components';
import { useHistory } from 'react-router-dom';
import ViewDesklampBook from '../../assets/images/icons/ViewDesklampBook';
import QuestionActive from '../../assets/images/icons/QuestionActive';
import QuestionInactive from '../../assets/images/icons/QuestionInactive';
import Lenke from 'nav-frontend-lenker';
import ModalWrapper from 'nav-frontend-modal';
import ModalElektroniskId from './modal-elektronisk-id';
import { useSelector } from 'react-redux';
import { getUrlToPaperForm } from '../../types/ytelse';
import { Store } from '../../store/reducer';
import queryString from 'query-string';

export const BoxHeader = styled.div`
    background-color: #c1b5d0;
    padding: 5px 30px;
    svg:nth-of-type(1) {
    }
    svg:nth-of-type(2) {
        position: relative;
        right: 20px;
    }
    svg:nth-of-type(3) {
    }
`;

export const BoxContent = styled.div`
    padding: 40px 30px;
    .infoBox {
        max-width: 500px;
    }
    @media ${device.mobileS} {
        padding: 45px 0;
    }
`;

interface Props {
    query: queryString.ParsedQuery<string>;
}

const InngangInfoBox = (props: Props) => {
    const history = useHistory();

    const { chosenYtelse } = useSelector((state: Store) => state);

    const [mediumMobileMode, setMediumMobileMode] = useState<boolean>(matchMediaQueries.mobileM.matches);
    const [smallMobileMode, setSmallMobileMode] = useState<boolean>(matchMediaQueries.mobileS.matches);
    const [questionActive, setQuestionActive] = useState<boolean>(false);
    // const [popoverAnker, setPopoverAnker] = useState<HTMLElement | undefined>(undefined);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    matchMediaQueries.mobileM.addListener(width => {
        setMediumMobileMode(width.matches);
    });

    matchMediaQueries.mobileS.addListener(width => {
        setSmallMobileMode(width.matches);
    });

    const toggleQuestionActive = () => {
        // setPopoverAnker(questionActive ? undefined : anker);
        setQuestionActive(!questionActive);
    };

    const title = chosenYtelse !== '' ? `Klage - ${chosenYtelse}` : `Klage`;

    return (
        <div>
            <BoxHeader>
                <ViewDesklampBook />
            </BoxHeader>
            <BoxContent>
                <Systemtittel>{title}</Systemtittel>
                <MarginContainer>
                    <div className="infoBox">
                        <Normaltekst>
                            For å fullføre skjema for klage eller anke må du logge inn med elektronisk ID. Hvis du søker
                            på vegne av andre må du fylle inn personopplysninger manuelt.
                        </Normaltekst>
                        <MarginContainer>
                            <Normaltekst>
                                Les mer om{' '}
                                <Lenke
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter"
                                >
                                    dine klagerettigheter på våre tema-sider
                                </Lenke>
                                .
                            </Normaltekst>
                        </MarginContainer>
                    </div>

                    <MarginContainer>
                        <ButtonFlexContainer>
                            <Hovedknapp
                                kompakt={mediumMobileMode}
                                mini={smallMobileMode}
                                onClick={() =>
                                    // Keep query when moving to form
                                    history.push(
                                        'klage' + (props.query ? '?' + queryString.stringify(props.query) : '')
                                    )
                                }
                            >
                                Fortsett til innlogget skjema
                            </Hovedknapp>

                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={getUrlToPaperForm('FOR')}
                                className={`knapp
                                    ${mediumMobileMode ? 'knapp--kompakt' : ''} ${
                                    smallMobileMode ? 'knapp--mini' : ''
                                }`}
                            >
                                Jeg klager på vegne av andre
                            </a>
                        </ButtonFlexContainer>
                    </MarginContainer>
                    <MarginContainer>
                        <FlexWithSpacingContainer>
                            <div>
                                <Normaltekst>
                                    <Lenke
                                        className="no-background-style"
                                        href="#"
                                        onClick={() => setModalIsOpen(true)}
                                    >
                                        Jeg har ikke elektronisk ID
                                    </Lenke>
                                </Normaltekst>
                                <ModalWrapper
                                    isOpen={modalIsOpen}
                                    onRequestClose={() => setModalIsOpen(false)}
                                    closeButton={true}
                                    contentLabel="Min modalrute"
                                >
                                    <ModalElektroniskId query={props.query} />
                                </ModalWrapper>
                            </div>
                            <span id="withPopover" onClick={() => toggleQuestionActive()} style={{ cursor: 'pointer' }}>
                                {questionActive ? <QuestionActive /> : <QuestionInactive />}
                            </span>
                            {questionActive && (
                                <span>
                                    For å søke på nett må du ha BankID fra banken din eller en annen elektronisk ID.
                                </span>
                            )}
                            {/* <Popover ankerEl={popoverAnker} onRequestClose={() => {}} autoFokus={false}>
                                <p style={{ padding: '1rem' }}>
                                    For å søke på nett må du ha BankID fra banken din eller en annen elektronisk ID.
                                </p>
                            </Popover> */}
                        </FlexWithSpacingContainer>
                    </MarginContainer>
                </MarginContainer>
            </BoxContent>
        </div>
    );
};

export default InngangInfoBox;
