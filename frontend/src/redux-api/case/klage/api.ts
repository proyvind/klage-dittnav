import { createApi } from '@reduxjs/toolkit/query/react';
import { API_BASE_QUERY, API_PATH } from '../../common';
import { ServerSentEventManager, ServerSentEventType } from '../../server-sent-events';
import { Case, CaseStatus, DeleteAttachmentParams, FinalizedCase, UploadAttachmentParams } from '../types';
import { Klage, KlageAttachment, NewKlage, Updatable } from './types';

interface Update<T extends keyof Updatable> {
  readonly id: Klage['id'];
  readonly key: T;
  readonly value: Updatable[T];
}

type BaseUpdateResponse = Pick<Case, 'modifiedByUser'>;

export const klageApi = createApi({
  reducerPath: 'klageApi',
  baseQuery: API_BASE_QUERY,
  endpoints: (builder) => ({
    getKlager: builder.query<Klage[], void>({
      query: () => '/klager',
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        for (const klage of data) {
          dispatch(klageApi.util.updateQueryData('getKlage', klage.id, () => klage));
        }
      },
    }),
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
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(klageApi.util.updateQueryData('getKlager', undefined, (klager) => [data, ...klager]));
      },
    }),
    createKlage: builder.mutation<Klage, NewKlage>({
      query: (body) => ({
        method: 'PUT',
        url: '/klager',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(klageApi.util.updateQueryData('getKlage', data.id, () => data));
        dispatch(klageApi.util.updateQueryData('getKlager', undefined, (klager) => [data, ...klager]));
      },
    }),
    updateKlage: builder.mutation<BaseUpdateResponse, Update<keyof Updatable>>({
      query: ({ id, key, value }) => ({
        method: 'PUT',
        url: `/klager/${id}/${key.toLowerCase()}`,
        body: { value },
      }),
      onQueryStarted: async ({ id, key, value }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          klageApi.util.updateQueryData('getKlage', id, (draft) => ({ ...draft, [key]: value }))
        );
        const klagerPatchResult = dispatch(
          klageApi.util.updateQueryData('getKlager', undefined, (klager) =>
            klager.map((klage) => (klage.id === id ? { ...klage, [key]: value } : klage))
          )
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(klageApi.util.updateQueryData('getKlage', id, (draft) => ({ ...draft, ...data })));
          dispatch(
            klageApi.util.updateQueryData('getKlager', undefined, (klager) =>
              klager.map((klage) => (klage.id === id ? { ...klage, ...data } : klage))
            )
          );
        } catch {
          patchResult.undo();
          klagerPatchResult.undo();
        }
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
          }))
        );
        dispatch(
          klageApi.util.updateQueryData('getKlager', undefined, (klager) => {
            const updatedKlager = klager.map((klage) => {
              if (klage.id === id) {
                return {
                  ...klage,
                  ...data,
                  status: CaseStatus.DONE,
                };
              }

              return klage;
            });

            return updatedKlager;
          })
        );
      },
    }),
    uploadAttachment: builder.mutation<KlageAttachment, UploadAttachmentParams>({
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
          }))
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
          }))
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
  useLazyGetKlageQuery,
  useUploadAttachmentMutation,
  useUpdateKlageMutation,
} = klageApi;
