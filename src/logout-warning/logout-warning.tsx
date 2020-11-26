import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import nb from 'dayjs/locale/nb';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import relative from 'dayjs/plugin/relativeTime';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Normaltekst } from 'nav-frontend-typografi';
import VeilederIcon from '../icons/VeilederIcon';
import { AppContext } from '../app-context/app-context';
import { LoginButton } from '../styled-components/login-button';
import { login } from '../user/login';
import { Row } from '../styled-components/row';

dayjs.extend(utc);
dayjs.extend(relative);
dayjs.extend(isSameOrBefore);

const MINUTES_TO_WARN = 10;

const LogoutWarning = () => {
    const { user } = useContext(AppContext);
    const [expiresIn, setExpiresIn] = useState<string | null>(null);
    const [expired, setExpired] = useState<boolean>(false);

    useEffect(() => {
        if (expired || user === null) {
            return;
        }

        const tokenExpires = dayjs.utc(user.tokenExpires);

        if (isNowOrBefore(tokenExpires)) {
            setExpired(true);
            return;
        }

        const tokenExpiresWarning = tokenExpires.subtract(MINUTES_TO_WARN, 'minute');

        if (isNowOrBefore(tokenExpiresWarning)) {
            const tokenExpiresIn = formatExpireTime(tokenExpires);
            setExpiresIn(tokenExpiresIn);
        }

        const checker = setInterval(() => {
            if (isNowOrBefore(tokenExpires)) {
                setExpired(true);
                clearInterval(checker);
            } else if (isNowOrBefore(tokenExpiresWarning)) {
                const tokenExpiresIn = formatExpireTime(tokenExpires);
                setExpiresIn(tokenExpiresIn);
            }
        }, 1000);
        return () => clearInterval(checker);
    }, [user, expired, expiresIn]);

    if (expired || user === null) {
        return (
            <Row>
                <Veilederpanel fargetema="advarsel" svg={<VeilederIcon />}>
                    <Normaltekst>
                        Du har blitt logget ut. For å fortsette trenger du bare å logge inn igjen.
                    </Normaltekst>
                    <LoginButton onClick={login}>Logg inn</LoginButton>
                </Veilederpanel>
            </Row>
        );
    }
    if (expiresIn !== null) {
        return (
            <Row>
                <Veilederpanel fargetema="advarsel" svg={<VeilederIcon />}>
                    <Normaltekst>{`Du vil bli logget ut ${expiresIn}. For å fortsette trenger du bare logge inn igjen.`}</Normaltekst>
                </Veilederpanel>
            </Row>
        );
    }

    return null;
};

export default LogoutWarning;

const formatExpireTime = (tokenExpires: dayjs.Dayjs) => tokenExpires.locale(nb).fromNow();

const isNowOrBefore = (tokenExpires: dayjs.Dayjs) => tokenExpires.isSameOrBefore(dayjs.utc());
