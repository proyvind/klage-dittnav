import { createApi } from '@reduxjs/toolkit/query/react';
import { API_BASE_QUERY, API_PATH } from '../../common';
import { ServerSentEventManager, ServerSentEventType } from '../../server-sent-events';
import { Attachment, Case, CaseStatus, DeleteAttachmentParams, FinalizedCase, UploadAttachmentParams } from '../types';
import { Anke, AnkeUpdate, AvailableAnke, NewAnke, ResumeAnke } from './types';

type BaseUpdateResponse = Pick<Case, 'modifiedByUser'>;

export const ankeApi = createApi({
  reducerPath: 'ankeApi',
  baseQuery: API_BASE_QUERY,
  endpoints: (builder) => ({
    getAnker: builder.query<Anke[], void>({
      query: () => '/anker',
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        for (const anke of data) {
          dispatch(ankeApi.util.updateQueryData('getAnke', anke.id, () => anke));
        }
      },
    }),
    getAvailableAnker: builder.query<AvailableAnke[], void>({
      query: () => `/anker/available`,
    }),
    getAnke: builder.query<Anke, string>({
      query: (ankeId) => `/anker/${ankeId}`,
      onCacheEntryAdded: async (ankeId, { updateCachedData, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }) => {
        try {
          await cacheDataLoaded;

          const { data } = getCacheEntry();

          if (typeof data?.journalpostId === 'string') {
            return;
          }

          const events = new ServerSentEventManager(`${API_PATH}/anker/${ankeId}/events`);

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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(ankeApi.util.updateQueryData('getAnker', undefined, (anker) => addAnke(anker, data)));
      },
    }),
    resumeOrCreateAnke: builder.mutation<Anke, ResumeAnke>({
      query: (body) => ({
        method: 'PUT',
        url: '/anker',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(ankeApi.util.updateQueryData('getAnke', data.id, () => data));
        dispatch(ankeApi.util.updateQueryData('getAnker', undefined, (anker) => addAnke(anker, data)));
      },
    }),
    createAnke: builder.mutation<Anke, NewAnke>({
      query: (body) => ({
        method: 'POST',
        url: '/anker',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(ankeApi.util.updateQueryData('getAnke', data.id, () => data));
        dispatch(ankeApi.util.updateQueryData('getAnker', undefined, (anker) => addAnke(anker, data)));
      },
    }),
    updateAnke: builder.mutation<BaseUpdateResponse, AnkeUpdate>({
      query: ({ id, key, value }) => ({
        method: 'PUT',
        url: `/anker/${id}/${key.toLowerCase()}`,
        body: { value },
      }),
      onQueryStarted: async ({ id, key, value }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          ankeApi.util.updateQueryData('getAnke', id, (draft) => ({ ...draft, [key]: value }))
        );
        const ankerPatchResult = dispatch(
          ankeApi.util.updateQueryData('getAnker', undefined, (anker) =>
            anker.map((anke) => (anke.id === id ? { ...anke, [key]: value } : anke))
          )
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(ankeApi.util.updateQueryData('getAnke', id, (draft) => ({ ...draft, ...data })));
          dispatch(
            ankeApi.util.updateQueryData('getAnker', undefined, (anker) =>
              anker.map((anke) => (anke.id === id ? { ...anke, ...data } : anke))
            )
          );
        } catch {
          patchResult.undo();
          ankerPatchResult.undo();
        }
      },
    }),
    deleteAnke: builder.mutation<void, string>({
      query: (ankeId) => ({
        method: 'DELETE',
        url: `/anker/${ankeId}`,
      }),
      onQueryStarted: async (ankeId, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(ankeApi.util.updateQueryData('getAnke', ankeId, () => undefined));
        dispatch(
          ankeApi.util.updateQueryData('getAnker', undefined, (anker) => anker.filter((anke) => anke.id !== ankeId))
        );
      },
    }),
    finalizeAnke: builder.mutation<FinalizedCase, string>({
      query: (id) => ({
        method: 'POST',
        url: `/anker/${id}/finalize`,
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(
          ankeApi.util.updateQueryData('getAnke', id, (draft) => ({
            ...draft,
            ...data,
            status: CaseStatus.DONE,
          }))
        );
        dispatch(
          ankeApi.util.updateQueryData('getAnker', undefined, (anker) => {
            const updatedAnker = anker.map((anke) => {
              if (anke.id === id) {
                return {
                  ...anke,
                  ...data,
                  status: CaseStatus.DONE,
                };
              }

              return anke;
            });

            return updatedAnker;
          })
        );
      },
    }),
    uploadAttachment: builder.mutation<Attachment, UploadAttachmentParams>({
      query: ({ caseId, file }) => {
        const formData = new FormData();
        formData.append('vedlegg', file, file.name);

        return { method: 'POST', url: `/anker/${caseId}/vedlegg`, body: formData };
      },
      onQueryStarted: async ({ caseId }, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(
          ankeApi.util.updateQueryData('getAnke', caseId, (draft) => ({
            ...draft,
            vedlegg: [...draft.vedlegg, data],
          }))
        );
      },
    }),
    deleteAttachment: builder.mutation<void, DeleteAttachmentParams>({
      query: ({ caseId, attachmentId }) => ({
        url: `/anker/${caseId}/vedlegg/${attachmentId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async ({ caseId, attachmentId }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          ankeApi.util.updateQueryData('getAnke', caseId, (draft) => ({
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

// eslint-disable-next-line import/no-unused-modules
export const {
  useCreateAnkeMutation,
  useDeleteAnkeMutation,
  useDeleteAttachmentMutation,
  useFinalizeAnkeMutation,
  useGetAnkeQuery,
  useGetAvailableAnkerQuery,
  useGetAnkerQuery,
  useResumeOrCreateAnkeMutation,
  useUpdateAnkeMutation,
  useUploadAttachmentMutation,
} = ankeApi;

const addAnke = (anker: Anke[], newAnke: Anke) => {
  if (anker.some(({ id }) => id === newAnke.id)) {
    return anker.map((klage) => (klage.id === newAnke.id ? newAnke : klage));
  }

  return [newAnke, ...anker];
};
