import { createApi } from '@reduxjs/toolkit/query/react';
import { API_BASE_QUERY, API_PATH } from '../../common';
import { ServerSentEventManager, ServerSentEventType } from '../../server-sent-events';
import { Attachment, Case, CaseStatus, DeleteAttachmentParams, FinalizedCase, UploadAttachmentParams } from '../types';
import { Klage, KlageUpdate, NewKlage, ResumeKlage } from './types';

type BaseUpdateResponse = Pick<Case, 'modifiedByUser'>;

export const klageApi = createApi({
  reducerPath: 'klageApi',
  baseQuery: API_BASE_QUERY,
  endpoints: (builder) => ({
    getKlage: builder.query<Klage, string>({
      query: (klageId) => `/klager/${klageId}`,
      onCacheEntryAdded: async (klageId, { updateCachedData, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }) => {
        try {
          await cacheDataLoaded;

          const { data } = getCacheEntry();

          if (typeof data?.journalpostId === 'string') {
            return;
          }

          const events = new ServerSentEventManager(`${API_PATH}/klager/${klageId}/events`);

          events.addEventListener(ServerSentEventType.JOURNALPOSTID, (event) => {
            if (event.data.length !== 0) {
              updateCachedData((draft) => ({ ...draft, journalpostId: event.data }));
              events.close();
            }
          });

          await cacheEntryRemoved;

          events.close();
        } catch (err) {
          console.error(err);
        }
      },
    }),
    resumeOrCreateKlage: builder.mutation<Klage, ResumeKlage>({
      query: (body) => ({
        method: 'PUT',
        url: '/klager',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(klageApi.util.updateQueryData('getKlage', data.id, () => data));
      },
    }),
    createKlage: builder.mutation<Klage, NewKlage>({
      query: (body) => ({
        method: 'POST',
        url: '/klager',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(klageApi.util.updateQueryData('getKlage', data.id, () => data));
      },
    }),
    updateKlage: builder.mutation<BaseUpdateResponse, KlageUpdate>({
      query: ({ id, key, value }) => ({
        method: 'PUT',
        url: `/klager/${id}/${key.toLowerCase()}`,
        body: { value },
      }),
      onQueryStarted: async ({ id, key, value }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          klageApi.util.updateQueryData('getKlage', id, (draft) => ({ ...draft, [key]: value })),
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(klageApi.util.updateQueryData('getKlage', id, (draft) => ({ ...draft, ...data })));
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteKlage: builder.mutation<void, string>({
      query: (klageId) => ({
        method: 'DELETE',
        url: `/klager/${klageId}`,
      }),
      onQueryStarted: async (klageId, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(klageApi.util.updateQueryData('getKlage', klageId, () => undefined));
      },
    }),
    finalizeKlage: builder.mutation<FinalizedCase, string>({
      query: (klageId) => ({
        method: 'POST',
        url: `/klager/${klageId}/finalize`,
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(
          klageApi.util.updateQueryData('getKlage', id, (draft) => ({
            ...draft,
            ...data,
            status: CaseStatus.DONE,
          })),
        );
      },
    }),
    uploadAttachment: builder.mutation<Attachment, UploadAttachmentParams>({
      query: ({ caseId, file }) => {
        const formData = new FormData();
        formData.append('vedlegg', file, file.name);

        return { method: 'POST', url: `/klager/${caseId}/vedlegg`, body: formData };
      },
      onQueryStarted: async ({ caseId }, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        dispatch(
          klageApi.util.updateQueryData('getKlage', caseId, (draft) => ({
            ...draft,
            vedlegg: [...draft.vedlegg, data],
          })),
        );
      },
    }),
    deleteAttachment: builder.mutation<void, DeleteAttachmentParams>({
      query: ({ caseId, attachmentId }) => ({
        url: `/klager/${caseId}/vedlegg/${attachmentId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async ({ caseId, attachmentId }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          klageApi.util.updateQueryData('getKlage', caseId, (draft) => ({
            ...draft,
            vedlegg: draft.vedlegg.filter((attachment) => attachment.id !== attachmentId),
          })),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useCreateKlageMutation,
  useDeleteAttachmentMutation,
  useFinalizeKlageMutation,
  useGetKlageQuery,
  useResumeOrCreateKlageMutation,
  useUpdateKlageMutation,
  useUploadAttachmentMutation,
  useDeleteKlageMutation,
} = klageApi;
