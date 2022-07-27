import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { Steps } from '../../components/steps/steps';
import { useTitleOrYtelse } from '../../hooks/use-titles';
import { useTranslation } from '../../language/use-translation';
import { LogoutWarning } from '../../logout-warning/logout-warning';
import { usePageInit } from '../../page-init/page-init';
import { useGetAnkeQuery } from '../../redux-api/case/anke/api';
import { Anke } from '../../redux-api/case/anke/types';
import { ContentContainer } from '../../styled-components/content-container';
import { FormMainContainer } from '../../styled-components/main-container';
import { FormTitleContainer } from '../form-title-container';

interface Props {
  activeStep: number;
  children: React.ReactNode;
  isValid: boolean;
}

export const AnkeFormContainer = ({ activeStep, children, isValid }: Props) => {
  const { ankeId } = useParams();
  const { data: anke } = useGetAnkeQuery(ankeId ?? skipToken);
  const { ankeskjema } = useTranslation();
  const { steps } = ankeskjema.common;

  usePageInit(`${steps[activeStep] ?? activeStep} \u2013 ${ankeskjema.common.title_fragment}`);
  useBreadcrumbs(null, null);

  if (typeof anke === 'undefined') {
    return null;
  }

  return (
    <FormMainContainer>
      <FormTitle anke={anke} />
      <ContentContainer>
        <LogoutWarning />
        <Steps activeStep={activeStep} translations={ankeskjema} status={anke.status} caseIsValid={isValid} />
        {children}
      </ContentContainer>
    </FormMainContainer>
  );
};

interface FormTitleProps {
  anke: Anke;
}

const FormTitle = ({ anke }: FormTitleProps) => {
  const { ankeskjema } = useTranslation();
  const undertittel = useTitleOrYtelse(anke.tema);

  return <FormTitleContainer tittel={ankeskjema.common.page_title} undertittel={undertittel} />;
};
