import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const mixoApi = createApi({
  reducerPath: "mixoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: () => "/campaigns",
    }),
    getCampaignsInsights: builder.query({
      query: () => "/campaigns/insights",
    }),
     getSingleCampaignsDetails: builder.query({
      query: (id:string) => `/campaigns/${id}`,
    }),

    getSingleCampaignsInsights: builder.query({
      query: (id:string) => `/campaigns/${id}/insights`,
    }),

  }),
})

export const {
  useGetCampaignsQuery,
  useGetCampaignsInsightsQuery,
  useGetSingleCampaignsDetailsQuery,
  useGetSingleCampaignsInsightsQuery
} = mixoApi
