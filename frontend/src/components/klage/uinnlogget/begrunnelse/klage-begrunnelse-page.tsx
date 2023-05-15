import { BodyLong, Button, Checkbox, GuidePanel } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSessionKlageErrors } from '@app/hooks/use-errors';
import { useSessionKlageUpdate } from '@app/hooks/use-session-klage-update';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { useLogPageView } from '@app/logging/use-log-page-view';
import { useAppDispatch } from '@app/redux/configure-store';
import { deleteSessionKlage } from '@app/redux/session/session';
import { CenteredContainer } from '@app/styled-components/common';
import { Reasons } from '../../../begrunnelse/klage/reasons';
import { Errors } from '../../../case/common/errors';
import { FormFieldsIds } from '../../../case/common/form-fields-ids';
import { PostFormContainer } from '../../../case/common/post/post-form-container';
import { VedtakDatePost } from '../../../case/common/post/vedtak-date';
import { BegrunnelseText } from '../../../case/uinnlogget/begrunnelse/begrunnelse-text';
import { UserInfo } from '../../../case/uinnlogget/begrunnelse/user-info';
import { Saksnummer } from '../../../case/uinnlogget/saksnummer';
import { DeleteCaseButton } from '../../../delete-case-button/delete-case-button';
import { KlageSessionLoader } from '../klage-session-loader';
import { ISessionKlage } from '../types';

interface IProps {
  innsendingsytelse: Innsendingsytelse;
}

export const SessionKlagebegrunnelsePage = (props: IProps) => (
  <KlageSessionLoader Component={RenderKlagebegrunnelsePage} {...props} />
);

interface Props {
  klage: ISessionKlage;
}

const RenderKlagebegrunnelsePage = ({ klage }: Props) => {
  const updateKlage = useSessionKlageUpdate(klage.innsendingsytelse);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const language = useLanguage();

  useLogPageView(PageIdentifier.KLAGESKJEMA_BEGRUNNElSE);

  const { klageskjema, klageskjema_post } = useTranslation();

  const { errors, isValid, isEverythingValid, setError } = useSessionKlageErrors(klage);

  const submitKlage = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    addAppEvent(AppEventEnum.SUBMIT);

    if (!isEverythingValid()) {
      addAppEvent(AppEventEnum.INVALID);

      return;
    }

    navigate('../oppsummering');
  };

  const deleteAndReturn = () => {
    dispatch(deleteSessionKlage(klage.innsendingsytelse));
    navigate(`/${language}`, { replace: true });
  };

  const { steps, page_title, title_fragment } = klageskjema_post.common;

  return (
    <PostFormContainer
      activeStep={1}
      isValid={isValid}
      page_title={page_title}
      steps={steps}
      innsendingsytelse={klage.innsendingsytelse}
      title_fragment={title_fragment}
    >
      <GuidePanel>
        <BodyLong>{klageskjema_post.should_log_in_digital}</BodyLong>
      </GuidePanel>

      <UserInfo klageOrAnke={klage} update={updateKlage} onError={setError} errors={errors} />

      <Reasons
        checkedReasons={klage.checkboxesSelected}
        onChange={(checkboxesSelected) => updateKlage({ checkboxesSelected })}
      />

      <VedtakDatePost
        value={klage.vedtakDate}
        onChange={(vedtakDate) => updateKlage({ vedtakDate })}
        title={klageskjema.begrunnelse.vedtak_date.title}
        onError={setError}
        error={errors[FormFieldsIds.VEDTAK_DATE]}
      />

      <Saksnummer
        internalSaksnummer={klage.internalSaksnummer}
        userSaksnummer={klage.userSaksnummer}
        onChange={(userSaksnummer) => updateKlage({ userSaksnummer, internalSaksnummer: null })}
        translations={klageskjema}
      />

      <BegrunnelseText
        value={klage.fritekst}
        placeholder={klageskjema.begrunnelse.begrunnelse_text.placeholder}
        description={klageskjema.begrunnelse.begrunnelse_text.description}
        translations={klageskjema}
        onChange={({ target }) => updateKlage({ fritekst: target.value })}
        onError={setError}
        error={errors[FormFieldsIds.FRITEKST]}
      />

      <Checkbox checked={klage.hasVedlegg} onChange={(e) => updateKlage({ hasVedlegg: e.target.checked })}>
        {klageskjema_post.has_attachments_label}
      </Checkbox>

      <Errors {...errors} />

      <CenteredContainer>
        <DeleteCaseButton isLoading={false} onDelete={deleteAndReturn} title={klageskjema.begrunnelse.delete_title} />

        <Button as={Link} variant="primary" onClick={submitKlage} to="../oppsummering" relative="path">
          {klageskjema.begrunnelse.next_button}
        </Button>
      </CenteredContainer>
    </PostFormContainer>
  );
};
