import React from 'react';
import KvitteringPage from './kvittering/kvittering-page';
import Oppsummering from './summary/summary';
import Begrunnelse from './begrunnelse/begrunnelse';
import Steps from './steps';
import LogoutWarning from '../../logout-warning/logout-warning';
import { FormMainContainer } from '../../styled-components/main-container';
import { ContentContainer } from '../../styled-components/content-container';
import { usePageInit } from '../../page-init/page-init';
import { useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { useTranslation } from '../../language/use-translation';
import { Anke } from '../../store/anke/types/anke';
import FormTitle from './form-title';

interface Props {
    activeStep: number;
    anke: Anke;
    render: typeof Begrunnelse | typeof Oppsummering | typeof KvitteringPage;
}

const FormContainer = (props: Props) => {
    const { ankeskjema } = useTranslation();
    const { steps } = ankeskjema.common;
    usePageInit(`${steps[props.activeStep]} \u2013 ${ankeskjema.common.title_fragment}`);
    useBreadcrumbs(null, null);

    return (
        <FormMainContainer>
            <FormTitle anke={props.anke} />
            <ContentContainer>
                <LogoutWarning />
                <Steps ankeStatus={props.anke.status} activeStep={props.activeStep} />
                <props.render anke={props.anke} />
            </ContentContainer>
        </FormMainContainer>
    );
};

export default FormContainer;
