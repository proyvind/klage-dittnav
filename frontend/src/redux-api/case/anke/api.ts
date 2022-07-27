import { createApi } from '@reduxjs/toolkit/query/react';
import { API_BASE_QUERY } from '../../common';
import { Case, DeleteAttachmentParams, FinalizedCase, UploadAttachmentParams } from '../types';
import { Anke, AnkeAttachment, NewAnke, Updatable } from './types';

interface Update<T extends keyof Updatable> {
  readonly id: Anke['ankeInternalSaksnummer'];
  readonly key: T;
  readonly value: Updatable[T];
}

type BaseUpdateResponse = Pick<Case, 'modifiedByUser'>;

export const ankeApi = createApi({
  reducerPath: 'ankeApi',
  baseQuery: API_BASE_QUERY,
  endpoints: (builder) => ({
    getAnke: builder.query<Anke, string>({
      query: (id) => `/anker/${id}`,
    }),
    createAnke: builder.mutation<Anke, NewAnke>({
      query: (body) => ({
        method: 'POST',
        url: '/anker',
        body,
      }),
    }),
    deleteAnke: builder.mutation<Anke, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `/anker/${id}`,
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(ankeApi.util.updateQueryData('getAnke', id, () => undefined));
      },
    }),
    updateAnke: builder.mutation<BaseUpdateResponse, Update<keyof Updatable>>({
      query: ({ id, key, value }) => ({
        method: 'PUT',
        url: `/klager/${id}/${key.toLowerCase()}`,
        body: { value },
      }),
      onQueryStarted: async ({ id, key, value }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          ankeApi.util.updateQueryData('getAnke', id, (draft) => ({ ...draft, [key]: value }))
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(ankeApi.util.updateQueryData('getAnke', id, (draft) => ({ ...draft, ...data })));
        } catch {
          patchResult.undo();
        }
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
          }))
        );
      },
    }),
    uploadAttachment: builder.mutation<AnkeAttachment, UploadAttachmentParams>({
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

export const {
  useCreateAnkeMutation,
  useDeleteAttachmentMutation,
  useFinalizeAnkeMutation,
  useGetAnkeQuery,
  useLazyGetAnkeQuery,
  useUploadAttachmentMutation,
  useUpdateAnkeMutation,
} = ankeApi;
