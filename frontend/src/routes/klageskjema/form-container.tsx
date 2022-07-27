import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { Steps } from '../../components/steps/steps';
import { useTitleOrYtelse } from '../../hooks/use-titles';
import { useTranslation } from '../../language/use-translation';
import { LogoutWarning } from '../../logout-warning/logout-warning';
import { usePageInit } from '../../page-init/page-init';
import { useGetKlageQuery } from '../../redux-api/case/klage/api';
import { Klage } from '../../redux-api/case/klage/types';
import { ContentContainer } from '../../styled-components/content-container';
import { FormMainContainer } from '../../styled-components/main-container';
import { FormTitleContainer } from '../form-title-container';

interface Props {
  activeStep: number;
  isValid: boolean;
  children: React.ReactNode;
}

export const KlageFormContainer = ({ activeStep, isValid, children }: Props) => {
  const { klageId } = useParams();
  const { data: klage } = useGetKlageQuery(klageId ?? skipToken);
  const { klageskjema } = useTranslation();
  const { steps } = klageskjema.common;

  usePageInit(`${steps[activeStep - 1] ?? ''} \u2013 ${klageskjema.common.title_fragment}`);
  useBreadcrumbs(null, null);

  if (typeof klage === 'undefined') {
    return null;
  }

  return (
    <FormMainContainer>
      <FormTitle klage={klage} />
      <ContentContainer>
        <LogoutWarning />
        <Steps activeStep={activeStep} translations={klageskjema} status={klage.status} caseIsValid={isValid} />
        {children}
      </ContentContainer>
    </FormMainContainer>
  );
};

interface FormTitleProps {
  klage: Klage;
}

const FormTitle = ({ klage }: FormTitleProps) => {
  const { klageskjema } = useTranslation();
  const undertittel = useTitleOrYtelse(klage.tema, klage.titleKey, klage.ytelse);

  return <FormTitleContainer tittel={klageskjema.common.page_title} undertittel={undertittel} />;
};
