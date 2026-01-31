import { apiSlice } from "@/store/api/apiSlice";

export const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  overrideExisting: true,
});

export const { useGetMetricsQuery, useGetChartsAnalyticsQuery } = api;
