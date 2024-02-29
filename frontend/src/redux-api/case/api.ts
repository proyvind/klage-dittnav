import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateCaseParams,
  DeleteAttachmentParams,
  ResumeCaseParams,
  UpdateCaseParams,
  UploadAttachmentParams,
} from '@app/redux-api/case/params';
import { Attachment, BaseCase, Case, CaseStatus, FinalizedCase } from '@app/redux-api/case/types';
import { API_BASE_QUERY, API_PATH } from '@app/redux-api/common';
import { ServerSentEventManager, ServerSentEventType } from '@app/redux-api/server-sent-events';

type BaseUpdateResponse = Pick<BaseCase, 'modifiedByUser'>;

export const caseApi = createApi({
  reducerPath: 'caseApi',
  baseQuery: API_BASE_QUERY,
  endpoints: (builder) => ({
    getCase: builder.query<Case, string>({
      query: (id) => `/klanker/${id}`,
      onCacheEntryAdded: async (id, { updateCachedData, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }) => {
        try {
          await cacheDataLoaded;

          const { data } = getCacheEntry();

          if (typeof data?.journalpostId === 'string') {
            return;
          }

          const events = new ServerSentEventManager(`${API_PATH}/klanker/${id}/events`);

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
    resumeOrCreateCase: builder.mutation<Case, ResumeCaseParams>({
      query: (body) => ({
        method: 'PUT',
        url: '/klanker',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(caseApi.util.updateQueryData('getCase', data.id, () => data));
      },
    }),
    createCase: builder.mutation<Case, CreateCaseParams>({
      query: (body) => ({
        method: 'POST',
        url: '/klanker',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(caseApi.util.updateQueryData('getCase', data.id, () => data));
      },
    }),
    updateCase: builder.mutation<BaseUpdateResponse, UpdateCaseParams>({
      query: ({ id, key, value }) => ({
        method: 'PUT',
        url: `/klanker/${id}/${key.toLowerCase()}`,
        body: { value },
      }),
      onQueryStarted: async ({ id, key, value }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          caseApi.util.updateQueryData('getCase', id, (draft) => ({ ...draft, [key]: value })),
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(caseApi.util.updateQueryData('getCase', id, (draft) => ({ ...draft, ...data })));
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteCase: builder.mutation<void, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `/klanker/${id}`,
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(caseApi.util.updateQueryData('getCase', id, () => undefined));
      },
    }),
    finalizeCase: builder.mutation<FinalizedCase, string>({
      query: (id) => ({
        method: 'POST',
        url: `/klanker/${id}/finalize`,
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(
          caseApi.util.updateQueryData('getCase', id, (draft) => ({
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

        return { method: 'POST', url: `/klanker/${caseId}/vedlegg`, body: formData };
      },
      onQueryStarted: async ({ caseId }, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        dispatch(
          caseApi.util.updateQueryData('getCase', caseId, (draft) => ({
            ...draft,
            vedlegg: [...draft.vedlegg, data],
          })),
        );
      },
    }),
    deleteAttachment: builder.mutation<void, DeleteAttachmentParams>({
      query: ({ caseId, attachmentId }) => ({
        url: `/klanker/${caseId}/vedlegg/${attachmentId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async ({ caseId, attachmentId }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          caseApi.util.updateQueryData('getCase', caseId, (draft) => ({
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
  useGetCaseQuery,
  useResumeOrCreateCaseMutation,
  useCreateCaseMutation,
  useUpdateCaseMutation,
  useDeleteCaseMutation,
  useFinalizeCaseMutation,
  useUploadAttachmentMutation,
  useDeleteAttachmentMutation,
} = caseApi;
