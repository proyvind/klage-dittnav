import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { Languages } from '@app/language/types';
import { CaseType } from '@app/redux-api/case/types';

interface Base {
  type: CaseType;
  innsendingsytelse: Innsendingsytelse;
}

export interface SessionCaseLoad extends Base {
  data: { language: Languages; innsendingsytelse: Innsendingsytelse; internalSaksnummer: string | null };
}

export interface SessionCaseCreate extends Base {
  data: { language: Languages; innsendingsytelse: Innsendingsytelse; internalSaksnummer: string | null };
}

export interface SessionCasePayload extends Base {
  data: ISessionCase;
}

export interface SessionCaseUpdate extends Base {
  data: Partial<ISessionCase>;
}

export type SessionCaseRemove = Base;
