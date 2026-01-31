import { apiSlice } from "@/store/api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams(
          Object.entries(args)
            .filter(
              ([_, value]) =>
                value !== undefined && value !== null && value !== "",
            ) // only truthy values are added to url
            .map(([key, value]) => [key, String(value)]),
        );
        return `/admin/users?${params.toString()}`;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetUsersQuery } = adminApi;
