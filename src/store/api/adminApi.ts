import { apiSlice } from "./apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      // query: () => "/admin/users",
      query: (args) => {
        const params = new URLSearchParams(
          Object.entries(args)
            .filter(
              ([_, value]) =>
                value !== undefined && value !== null && value !== ""
            ) // only truthy values are added to url
            .map(([key, value]) => [key, String(value)])
        );
        return `/admin/users?${params.toString()}`;
      },

      // serializeQueryArgs: ({ endpointName, queryArgs }) => {
      //   const { page, ...rest } = queryArgs ?? {};
      //   return `${endpointName}-${JSON.stringify(rest)}`;
      // },

      // merge: (currentCache, newResponse, { arg }) => {
      //   if (arg?.page === 1) {
      //     currentCache.data = newResponse.data;
      //   } else {
      //     currentCache.data.push(...newResponse.data);
      //   }
      //   currentCache.meta = newResponse.meta;
      // },

      // forceRefetch({ currentArg, previousArg }) {
      //   if (!currentArg || !previousArg) return true;

      //   // allow pagination fetch
      //   if (currentArg.page !== previousArg.page) {
      //     return true;
      //   }

      //   const { page: _, ...curr } = currentArg;
      //   const { page: __, ...prev } = previousArg;

      //   // refetch when filters change
      //   return JSON.stringify(curr) !== JSON.stringify(prev);
      // },
    }),
  }),
});

export const { useGetUsersQuery } = adminApi;
