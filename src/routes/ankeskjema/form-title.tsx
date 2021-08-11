import React from 'react';
import { useTitleOrYtelse } from '../../language/titles';
import { useTranslation } from '../../language/use-translation';
import { Anke } from '../../store/anke/types/anke';
import FormTitleContainer from '../form-title-container';

interface Props {
    anke: Anke;
}

const FormTitle = ({ anke }: Props) => {
    const { ankeskjema } = useTranslation();
    const undertittel = useTitleOrYtelse(anke.tema);
    return <FormTitleContainer tittel={ankeskjema.common.page_title} undertittel={undertittel} />;
};
export default FormTitle;
