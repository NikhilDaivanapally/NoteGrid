// import { NotesResponse, Note } from "@/types/notes";
import { Note, NotesResponse } from "@/types/notes/note";
import { apiSlice } from "./apiSlice";
import { DEFAULT_NOTE_QUERY } from "@/lib/constants/note-query";

export const noteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<NotesResponse, Partial<typeof DEFAULT_NOTE_QUERY>>({
      query: (DEFAULT_NOTE_QUERY) => {
        const params = new URLSearchParams(
          Object.entries(DEFAULT_NOTE_QUERY)
            .filter(
              ([_, value]) =>
                value !== undefined && value !== null && value !== ""
            ) // only truthy values are added to url
            .map(([key, value]) => [key, String(value)])
        );
        return `/notes?${params.toString()}`;
      },

      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newResponse) => {
        currentCache.data.push(...newResponse.data);
        currentCache.meta = newResponse.meta;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),

    getNote: builder.query<Note, string>({
      query: (id) => `/notes/${id}`,
    }),

    createNote: builder.mutation<Note, Partial<Note>>({
      query: (body) => ({
        url: "/notes",
        method: "POST",
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          noteApi.util.updateQueryData(
            "getNotes",
            { page: 1, limit: 20 },
            (draft) => {
              draft.data.unshift({
                ...body,
                _id: "temp-id",
                isFavorite: false,
                isPinned: false,
                createdAt: new Date().toISOString(),
              } as Note);
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            noteApi.util.updateQueryData(
              "getNotes",
              { page: 1, limit: 20 },
              (draft) => {
                const index = draft.data.findIndex((n) => n._id === "temp-id");
                if (index !== -1) draft.data[index] = data;
              }
            )
          );
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateNote: builder.mutation<Note, Partial<Note> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({ id, ...body }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          noteApi.util.updateQueryData(
            "getNotes",
            { page: 1, limit: 20 },
            (draft) => {
              const note = draft.data.find((n) => n._id === id);
              if (note) Object.assign(note, body);
            }
          )
        );
        const patchSingle = dispatch(
          noteApi.util.updateQueryData("getNote", id, (draft) => {
            Object.assign(draft, body);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchList.undo();
          patchSingle.undo();
        }
      },
    }),

    deleteNote: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          noteApi.util.updateQueryData(
            "getNotes",
            { page: 1, limit: 20 },
            (draft) => {
              draft.data = draft.data.filter((n) => n._id !== id);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    toggleFavorite: builder.mutation<Note, { id: string; isFavorite: boolean }>(
      {
        query: ({ id, isFavorite }) => ({
          url: `/notes/${id}`,
          method: "PUT",
          body: { isFavorite },
        }),
        async onQueryStarted({ id, isFavorite }, { dispatch, queryFulfilled }) {
          const patch = dispatch(
            noteApi.util.updateQueryData(
              "getNotes",
              { page: 1, limit: 20 },
              (draft) => {
                const note = draft.data.find((n) => n._id === id);
                if (note) note.isFavorite = isFavorite;
              }
            )
          );
          try {
            await queryFulfilled;
          } catch {
            patch.undo();
          }
        },
      }
    ),

    togglePinned: builder.mutation<Note, { id: string; isPinned: boolean }>({
      query: ({ id, isPinned }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: { isPinned },
      }),
      async onQueryStarted({ id, isPinned }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          noteApi.util.updateQueryData(
            "getNotes",
            { page: 1, limit: 20 },
            (draft) => {
              const note = draft.data.find((n) => n._id === id);
              if (note) note.isPinned = isPinned;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetNotesQuery } = noteApi;
