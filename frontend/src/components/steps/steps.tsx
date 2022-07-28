import { Stepper } from '@navikt/ds-react';
import { StepperStepProps } from '@navikt/ds-react/esm/stepper/Step';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  activeStep: number;
  steps: StepProps[];
}

export const Steps = ({ activeStep, steps }: Props) => (
  <Stepper activeStep={activeStep} orientation="horizontal">
    {steps.map((props, index) => (
      <Step key={index} {...props} />
    ))}
  </Stepper>
);

export interface StepProps extends Omit<StepperStepProps, 'children'> {
  to: string;
  disabled?: boolean;
  label?: string;
}

const Step = ({ label = '', disabled = false, to, ...props }: StepProps) => {
  if (disabled) {
    return (
      <Stepper.Step as={DisabledStep} disabled {...props}>
        {label}
      </Stepper.Step>
    );
  }

  return (
    <Stepper.Step to={to} as={Link} {...props}>
      {label}
    </Stepper.Step>
  );
};

const DisabledStep = styled.button`
  opacity: 0.3;
  cursor: not-allowed;
`;
