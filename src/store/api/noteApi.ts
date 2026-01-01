// import { NotesResponse, Note } from "@/types/notes";
import { Note, NotesResponse } from "@/types/notes/note";
import { apiSlice } from "./apiSlice";
import { DEFAULT_NOTE_QUERY } from "@/lib/constants/note-query";

export const noteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<NotesResponse, Partial<typeof DEFAULT_NOTE_QUERY>>({
      query: (args) => {
        const params = new URLSearchParams(
          Object.entries(args)
            .filter(
              ([_, value]) =>
                value !== undefined && value !== null && value !== ""
            ) // only truthy values are added to url
            .map(([key, value]) => [key, String(value)])
        );
        return `/notes?${params.toString()}`;
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { page, ...rest } = queryArgs ?? {};
        return `${endpointName}-${JSON.stringify(rest)}`;
      },

      merge: (currentCache, newResponse, { arg }) => {
        if (arg?.page === 1) {
          currentCache.data = newResponse.data;
        } else {
          currentCache.data.push(...newResponse.data);
        }
        currentCache.meta = newResponse.meta;
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!currentArg || !previousArg) return true;

        // allow pagination fetch
        if (currentArg.page !== previousArg.page) {
          return true;
        }

        const { page: _, ...curr } = currentArg;
        const { page: __, ...prev } = previousArg;

        // refetch when filters change
        return JSON.stringify(curr) !== JSON.stringify(prev);
      },
    }),

    getNoteById: builder.query<Note, string>({
      query: (id) => `/notes/${id}`,
    }),

    getRecentNotes: builder.query<{ data: Note[] }, {limit:string}>({
      query: ({limit}) => `/notes/recent?limit=${limit}`,
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
            DEFAULT_NOTE_QUERY,
            (draft) => {
              draft.data.unshift({
                ...body,
                _id: "temp-id",
                isFavorite: false,
                isPinned: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              } as Note);
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            noteApi.util.updateQueryData(
              "getNotes",
              DEFAULT_NOTE_QUERY,
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

    updateNote: builder.mutation<Note, Partial<Note>>({
      query: ({ _id, ...body }) => ({
        url: `/notes/${_id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({ _id, ...body }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          noteApi.util.updateQueryData(
            "getNotes",
            DEFAULT_NOTE_QUERY,
            (draft) => {
              const note = draft.data.find((n) => n._id === _id);
              if (note) Object.assign(note, body);
            }
          )
        );
        const patchSingle = dispatch(
          noteApi.util.updateQueryData(
            "getNoteById",
            _id as string,
            (draft) => {
              Object.assign(draft, body);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchList.undo();
          patchSingle.undo();
        }
      },
    }),

    deleteNote: builder.mutation<
      { success: boolean },
      { id: string; filters: typeof DEFAULT_NOTE_QUERY }
    >({
      query: ({ id }) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ id, filters }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          noteApi.util.updateQueryData("getNotes", filters, (draft) => {
            draft.data = draft.data.filter((n) => n._id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    toggleFavorite: builder.mutation<
      Note,
      { id: string; isFavorite: boolean; filters: typeof DEFAULT_NOTE_QUERY }
    >({
      query: ({ id, isFavorite }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: { isFavorite },
      }),
      async onQueryStarted(
        { id, isFavorite, filters },
        { dispatch, queryFulfilled }
      ) {
        const patch = dispatch(
          noteApi.util.updateQueryData("getNotes", filters, (draft) => {
            const note = draft.data.find(
              (n) => n._id.toString() === id.toString()
            );
            if (note) note.isFavorite = isFavorite;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    togglePinned: builder.mutation<
      Note,
      { id: string; isPinned: boolean; filters: typeof DEFAULT_NOTE_QUERY }
    >({
      query: ({ id, isPinned }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: { isPinned },
      }),
      async onQueryStarted(
        { id, isPinned, filters },
        { dispatch, queryFulfilled }
      ) {
        const patch = dispatch(
          noteApi.util.updateQueryData("getNotes", filters, (draft) => {
            const note = draft.data.find((n) => n._id === id);
            if (note) note.isPinned = isPinned;
          })
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

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useGetRecentNotesQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useToggleFavoriteMutation,
  useTogglePinnedMutation,
} = noteApi;
