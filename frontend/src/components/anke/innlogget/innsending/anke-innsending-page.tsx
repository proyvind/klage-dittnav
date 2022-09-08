import React from 'react';
import { Anke } from '../../../../redux-api/case/anke/types';
import { RenderCaseinnsendingPage } from '../../../case/common/post/innsending-page';
import { AnkeLoader } from '../anke-loader';

export const AnkeinnsendingPage = () => <AnkeLoader Component={AnkeinnsendingPageWrapper} />;

interface Props {
  anke: Anke;
}

const AnkeinnsendingPageWrapper = ({ anke }: Props) => <RenderCaseinnsendingPage caseData={anke} type="anke" />;
