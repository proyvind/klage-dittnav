import { BodyLong, Button, Checkbox, GuidePanel } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSessionAnkeErrors } from '@app/hooks/use-errors';
import { useSessionAnkeUpdate } from '@app/hooks/use-session-anke-update';
import { useSupportsDigitalAnke } from '@app/hooks/use-supports-digital';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { useLogPageView } from '@app/logging/use-log-page-view';
import { useAppDispatch } from '@app/redux/configure-store';
import { deleteSessionAnke } from '@app/redux/session/session';
import { CenteredContainer } from '@app/styled-components/common';
import { Errors } from '../../../case/common/errors';
import { FormFieldsIds } from '../../../case/common/form-fields-ids';
import { PostFormContainer } from '../../../case/common/post/post-form-container';
import { VedtakDatePost } from '../../../case/common/post/vedtak-date';
import { BegrunnelseText } from '../../../case/uinnlogget/begrunnelse/begrunnelse-text';
import { UserInfo } from '../../../case/uinnlogget/begrunnelse/user-info';
import { Saksnummer } from '../../../case/uinnlogget/saksnummer';
import { DeleteCaseButton } from '../../../delete-case-button/delete-case-button';
import { AnkeSessionLoader } from '../anke-session-loader';
import { ISessionAnke } from '../types';
import { KaEnhet } from './ka-enhet';

interface IProps {
  innsendingsytelse: Innsendingsytelse;
}

export const SessionAnkebegrunnelsePage = (props: IProps) => (
  <AnkeSessionLoader Component={RenderAnkebegrunnelsePage} {...props} />
);

interface Props {
  anke: ISessionAnke;
}

const RenderAnkebegrunnelsePage = ({ anke }: Props) => {
  const updateAnke = useSessionAnkeUpdate(anke.innsendingsytelse);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const language = useLanguage();

  useLogPageView(PageIdentifier.ANKESKJEMA_BEGRUNNElSE);

  const { ankeskjema, ankeskjema_post } = useTranslation();

  const supportsDigital = useSupportsDigitalAnke(anke.innsendingsytelse);

  const { errors, isValid, isEverythingValid, setError } = useSessionAnkeErrors(anke);

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
    dispatch(deleteSessionAnke(anke.innsendingsytelse));
    navigate(`/${language}`, { replace: true });
  };

  const { steps, page_title, title_fragment } = ankeskjema_post.common;

  return (
    <PostFormContainer
      activeStep={1}
      isValid={isValid}
      page_title={page_title}
      steps={steps}
      innsendingsytelse={anke.innsendingsytelse}
      title_fragment={title_fragment}
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

      <Saksnummer
        internalSaksnummer={anke.internalSaksnummer}
        userSaksnummer={anke.userSaksnummer}
        onChange={(userSaksnummer) => updateAnke({ userSaksnummer, internalSaksnummer: null })}
        translations={ankeskjema}
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
