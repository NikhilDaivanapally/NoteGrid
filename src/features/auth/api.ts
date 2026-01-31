import { apiSlice } from "@/store/api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user",
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
