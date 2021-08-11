import React from 'react';
import { Klage } from '../../store/klage/types/klage';
import { useTitleOrYtelse } from '../../language/titles';
import { useTranslation } from '../../language/use-translation';
import FormTitleContainer from '../form-title-container';

interface Props {
    klage: Klage;
}

const FormTitle = ({ klage }: Props) => {
    const { klageskjema } = useTranslation();
    const undertittel = useTitleOrYtelse(klage.tema, klage.titleKey, klage.ytelse);
    return <FormTitleContainer tittel={klageskjema.common.page_title} undertittel={undertittel} />;
};
export default FormTitle;
