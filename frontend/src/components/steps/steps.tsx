import { Stepper } from '@navikt/ds-react';
import { StepperStepProps } from '@navikt/ds-react/esm/stepper/Step';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Language } from '../../language/language';
import { CaseStatus } from '../../redux-api/case/types';

interface Props {
  activeStep: number;
  translations: Language['klageskjema' | 'ankeskjema'];
  status: CaseStatus;
  caseIsValid: boolean;
}

export const Steps = ({ activeStep, translations, status, caseIsValid }: Props) => {
  const [label1, label2, label3] = translations.common.steps;

  if (label1 === undefined || label2 === undefined || label3 === undefined) {
    return null;
  }

  return (
    <Stepper activeStep={activeStep} orientation="horizontal">
      <Step disabled={status === CaseStatus.DONE} to="../begrunnelse">
        {label1}
      </Step>
      <Step disabled={!caseIsValid && status !== CaseStatus.DONE} to="../oppsummering">
        {label2}
      </Step>
      <Step disabled={status !== CaseStatus.DONE} to="../kvittering">
        {label3}
      </Step>
    </Stepper>
  );
};

interface StepProps extends StepperStepProps {
  disabled: boolean;
  to: string;
}

const Step = ({ children, disabled, to, ...props }: StepProps) => {
  if (disabled) {
    return (
      <Stepper.Step as={DisabledStep} disabled {...props}>
        {children}
      </Stepper.Step>
    );
  }

  return (
    <Stepper.Step to={to} as={NavLink} {...props}>
      {children}
    </Stepper.Step>
  );
};

const DisabledStep = styled.button`
  opacity: 0.3;
  cursor: not-allowed;
`;
