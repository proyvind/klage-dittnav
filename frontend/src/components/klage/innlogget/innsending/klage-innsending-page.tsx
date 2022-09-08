import React from 'react';
import { Klage } from '../../../../redux-api/case/klage/types';
import { RenderCaseinnsendingPage } from '../../../case/common/post/innsending-page';
import { KlageLoader } from '../klage-loader';

export const KlageinnsendingPage = () => <KlageLoader Component={KlageWrapper} />;

const KlageWrapper = ({ klage }: { klage: Klage }) => <RenderCaseinnsendingPage caseData={klage} type="klage" />;
