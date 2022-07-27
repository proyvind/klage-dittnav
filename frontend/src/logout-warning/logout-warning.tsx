import { BodyLong, GuidePanel } from '@navikt/ds-react';
import dayjs from 'dayjs';
import nb from 'dayjs/locale/nb';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import relative from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '../redux-api/user/api';
import { LoginButton } from '../styled-components/login-button';
import { login } from '../user/login';

dayjs.extend(utc);
dayjs.extend(relative);
dayjs.extend(isSameOrBefore);

const MINUTES_TO_WARN = 10;

export const LogoutWarning = () => {
  const { data: user, isLoading } = useGetUserQuery();
  const [expiresIn, setExpiresIn] = useState<string | null>(null);
  const [expired, setExpired] = useState<boolean>(false);

  useEffect(() => {
    if (expired || isLoading || typeof user === 'undefined') {
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
  }, [user, expired, expiresIn, isLoading]);

  if (expired || user === null) {
    return (
      <GuidePanel>
        <BodyLong>Du har blitt logget ut. For å fortsette trenger du bare å logge inn igjen.</BodyLong>
        <LoginButton onClick={login}>Logg inn</LoginButton>
      </GuidePanel>
    );
  }

  if (expiresIn !== null) {
    return (
      <GuidePanel>
        <BodyLong>{`Du vil bli logget ut ${expiresIn}. For å fortsette trenger du bare logge inn igjen.`}</BodyLong>
      </GuidePanel>
    );
  }

  return null;
};

const formatExpireTime = (tokenExpires: dayjs.Dayjs) => tokenExpires.locale(nb).fromNow();

const isNowOrBefore = (tokenExpires: dayjs.Dayjs) => tokenExpires.isSameOrBefore(dayjs.utc());
