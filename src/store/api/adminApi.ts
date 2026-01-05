import { apiSlice } from "./apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
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
    }),
    getMetrics: builder.query({
      query: () => {
        return `/admin/analytics/notes`;
      },
    }),
    getChartsAnalytics: builder.query({
      query: () => {
        return `/admin/analytics`;
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetMetricsQuery,
  useGetChartsAnalyticsQuery,
} = adminApi;
