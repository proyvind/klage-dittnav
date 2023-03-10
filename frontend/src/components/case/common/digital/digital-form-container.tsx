import React from 'react';
import { useBreadcrumbs } from '../../../../breadcrumbs/use-breadcrumbs';
import { useInnsendingsytelseName } from '../../../../hooks/use-innsendingsytelser';
import { usePageInit } from '../../../../hooks/use-page-init';
import { useIsAuthenticated } from '../../../../hooks/use-user';
import { Innsendingsytelse } from '../../../../innsendingsytelser/innsendingsytelser';
import { Anke } from '../../../../redux-api/case/anke/types';
import { Klage } from '../../../../redux-api/case/klage/types';
import { CaseStatus } from '../../../../redux-api/case/types';
import { FormTitleContainer } from '../../../../routes/form-title-container';
import { ContentContainer } from '../../../../styled-components/content-container';
import { FormMainContainer } from '../../../../styled-components/main-container';
import { LogoutWarning } from '../../../logout-warning/logout-warning';
import { StepProps, Steps } from '../../../steps/steps';

interface Props {
  innsendingsytelse: Innsendingsytelse;
  activeStep: number;
  isValid: boolean;
  children: React.ReactNode;
  klageOrAnke: Klage | Anke;
  steps: string[];
  title_fragment: string;
  page_title: string;
}

export const DigitalFormContainer = ({
  innsendingsytelse,
  activeStep,
  isValid,
  klageOrAnke,
  children,
  steps,
  title_fragment,
  page_title,
}: Props) => {
  const [undertittel] = useInnsendingsytelseName(innsendingsytelse);
  const { data: isAuthenticated } = useIsAuthenticated();

  usePageInit(`${steps[activeStep - 1] ?? ''} \u2013 ${title_fragment}`);
  useBreadcrumbs(null, null);

  const [label1, label2, label3] = steps;

  const stepperSteps: StepProps[] = [
    {
      disabled: isAuthenticated === false || klageOrAnke.status === CaseStatus.DONE,
      to: '../begrunnelse',
      label: label1,
    },
    {
      disabled: isAuthenticated === false || (!isValid && klageOrAnke.status !== CaseStatus.DONE),
      to: '../oppsummering',
      label: label2,
    },
    {
      disabled: isAuthenticated === false || klageOrAnke.status !== CaseStatus.DONE,
      to: '../kvittering',
      label: label3,
    },
  ];

  return (
    <FormMainContainer>
      <FormTitleContainer tittel={page_title} undertittel={undertittel} />
      <ContentContainer>
        <LogoutWarning />
        <Steps activeStep={activeStep} steps={stepperSteps} />
        {children}
      </ContentContainer>
    </FormMainContainer>
  );
};
