import { BodyLong, Button, Checkbox, GuidePanel } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useErrors } from '../../../../hooks/use-errors';
import { useSessionAnkeUpdate } from '../../../../hooks/use-session-anke-update';
import { useSupportsDigitalAnke } from '../../../../hooks/use-supports-digital';
import { useLanguage } from '../../../../language/use-language';
import { useTranslation } from '../../../../language/use-translation';
import { PageIdentifier } from '../../../../logging/amplitude';
import { AppEventEnum } from '../../../../logging/error-report/action';
import { addAppEvent } from '../../../../logging/error-report/error-report';
import { useLogPageView } from '../../../../logging/use-log-page-view';
import { useAppDispatch } from '../../../../redux/configure-store';
import { deleteSessionAnke } from '../../../../redux/session/session';
import { CenteredContainer } from '../../../../styled-components/common';
import { Errors } from '../../../case/common/errors';
import { FormFieldsIds } from '../../../case/common/form-fields-ids';
import { PostFormContainer } from '../../../case/common/post/post-form-container';
import { VedtakDatePost } from '../../../case/common/post/vedtak-date';
import { UserSaksnummer } from '../../../case/common/saksnummer';
import { BegrunnelseText } from '../../../case/uinnlogget/begrunnelse/begrunnelse-text';
import { UserInfo } from '../../../case/uinnlogget/begrunnelse/user-info';
import { DeleteCaseButton } from '../../../delete-case-button/delete-case-button';
import { AnkeSessionLoader } from '../anke-session-loader';
import { ISessionAnke } from '../types';
import { KaEnhet } from './ka-enhet';

export const SessionAnkebegrunnelsePage = () => <AnkeSessionLoader Component={RenderAnkebegrunnelsePage} />;

interface Props {
  anke: ISessionAnke;
}

const RenderAnkebegrunnelsePage = ({ anke }: Props) => {
  const updateAnke = useSessionAnkeUpdate();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const language = useLanguage();

  useLogPageView(PageIdentifier.ANKESKJEMA_BEGRUNNElSE);

  const { ankeskjema, ankeskjema_post } = useTranslation();

  const supportsDigital = useSupportsDigitalAnke(anke.tema, anke.titleKey);

  const { errors, isValid, isEverythingValid, setError } = useErrors({
    type: 'session-anke',
    caseData: anke,
  });

  const submitKlage = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    addAppEvent(AppEventEnum.SUBMIT);

    if (!isEverythingValid() || !isValid) {
      addAppEvent(AppEventEnum.INVALID);

      return;
    }

    navigate(NEXT_PAGE_URL);
  };

  const deleteAndReturn = () => {
    dispatch(deleteSessionAnke({ temaKey: anke.tema, titleKey: anke.titleKey }));
    navigate(`/${language}`, { replace: true });
  };

  const { steps, page_title, title_fragment } = ankeskjema_post.common;

  return (
    <PostFormContainer
      activeStep={1}
      isValid={isValid}
      page_title={page_title}
      steps={steps}
      temaKey={anke.tema}
      title_fragment={title_fragment}
      titleKey={anke.titleKey}
    >
      <GuidePanel>
        <BodyLong>{supportsDigital ? ankeskjema_post.should_log_in_digital : ankeskjema_post.post_guidetext}</BodyLong>
      </GuidePanel>

      <UserInfo klageOrAnke={anke} update={updateAnke} onError={setError} errors={errors} />

      <VedtakDatePost
        value={anke.vedtakDate}
        onChange={(vedtakDate) => updateAnke({ vedtakDate })}
        title={ankeskjema.begrunnelse.vedtak_date.title}
        onError={setError}
        error={errors[FormFieldsIds.VEDTAK_DATE_REQUIRED]}
        required
      />

      <KaEnhet
        enhet={anke.enhetsnummer}
        onChange={(enhetsnummer) => updateAnke({ enhetsnummer })}
        onError={setError}
        error={errors[FormFieldsIds.KLAGEENHET_ANKE]}
      />

      <UserSaksnummer
        label={ankeskjema.begrunnelse.saksnummer.title}
        value={anke.userSaksnummer}
        onChange={(userSaksnummer) => updateAnke({ userSaksnummer })}
      />

      <BegrunnelseText
        value={anke.fritekst}
        placeholder={ankeskjema.begrunnelse.begrunnelse_text.placeholder}
        description={ankeskjema.begrunnelse.begrunnelse_text.description}
        translations={ankeskjema}
        onChange={({ target }) => updateAnke({ fritekst: target.value })}
        onError={setError}
        error={errors[FormFieldsIds.FRITEKST]}
      />

      <Checkbox checked={anke.hasVedlegg} onChange={(e) => updateAnke({ hasVedlegg: e.target.checked })}>
        {ankeskjema_post.has_attachments_label}
      </Checkbox>

      <Errors {...errors} />

      <CenteredContainer>
        <DeleteCaseButton isLoading={false} onDelete={deleteAndReturn} title={ankeskjema.begrunnelse.delete_title} />

        <Button variant="primary" onClick={submitKlage} as={Link} to={NEXT_PAGE_URL}>
          {ankeskjema.begrunnelse.next_button}
        </Button>
      </CenteredContainer>
    </PostFormContainer>
  );
};

const NEXT_PAGE_URL = '../oppsummering';
