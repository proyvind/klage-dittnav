import { ISODate, ISODateTime } from '../../date/date';

export interface UploadAttachmentParams {
  file: File;
  caseId: string;
}

export interface DeleteAttachmentParams {
  caseId: string;
  attachmentId: number;
}

export enum CaseStatus {
  DRAFT = 'DRAFT',
  DONE = 'DONE',
  DELETED = 'DELETED',
}

export interface FinalizedCase {
  readonly finalizedDate: ISODate;
  readonly modifiedByUser: ISODateTime;
}

export interface Case {
  readonly finalizedDate: ISODate | null;
  readonly modifiedByUser: ISODateTime;
  readonly status: CaseStatus;
  readonly journalpostId: string | null;
}

export interface Attachment {
  readonly content: string;
  readonly contentType: string; // Default value is "Ukjent" in backend.
  readonly id: number;
  readonly ref: string;
  readonly sizeInBytes: number;
  readonly tittel: string;
}
