import React, { useContext, useEffect, useState } from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederAdvarsel from '../assets/images/icons/VeilederAdvarsel';
import { AppContext } from '../app-context/app-context';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relative from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import nb from 'dayjs/locale/nb';
import { LoginButton } from '../styled-components/login-button';
import { Normaltekst } from 'nav-frontend-typografi';
import { login } from '../user/login';

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
            <Veilederpanel fargetema="advarsel" svg={<VeilederAdvarsel />}>
                <Normaltekst>Du har blitt logget ut. For å fortsette trenger du bare å logge inn igjen.</Normaltekst>
                <LoginButton onClick={login}>Logg inn</LoginButton>
            </Veilederpanel>
        );
    }
    if (expiresIn !== null) {
        return (
            <Veilederpanel fargetema="advarsel" svg={<VeilederAdvarsel />}>
                <Normaltekst>{`Du vil bli logget ut ${expiresIn}. For å fortsette trenger du bare logge inn igjen.`}</Normaltekst>
            </Veilederpanel>
        );
    }

    return null;
};

export default LogoutWarning;

const formatExpireTime = (tokenExpires: dayjs.Dayjs) => tokenExpires.locale(nb).fromNow();

const isNowOrBefore = (tokenExpires: dayjs.Dayjs) => tokenExpires.isSameOrBefore(dayjs.utc());
