import { GuidePanel } from '@navikt/ds-react';
import React from 'react';
import { useIsAuthenticated } from '@app/hooks/use-user';
import { useTranslation } from '@app/language/use-translation';

export const InngangGuidePanel = () => {
  const { data } = useIsAuthenticated();
  const { inngang } = useTranslation();

  const guideText =
    data === true
      ? inngang.guide_panel.general_info
      : inngang.guide_panel.general_info.concat(inngang.guide_panel.login_info);

  return <GuidePanel>{guideText}</GuidePanel>;
};
