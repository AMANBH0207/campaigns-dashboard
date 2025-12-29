import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { CampaignInsightsResponse, CampaignsResponse, SingleCampaignInsightsResponse, SingleCampaignResponse } from "../schema/global"

export const mixoApi = createApi({
  reducerPath: "mixoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getCampaigns: builder.query<CampaignsResponse, void>({
      query: () => "/campaigns",
    }),
    getCampaignsInsights: builder.query<CampaignInsightsResponse, void>({
      query: () => "/campaigns/insights",
    }),
     getSingleCampaignsDetails: builder.query<SingleCampaignResponse, string>({
      query: (id:string) => `/campaigns/${id}`,
    }),

    getSingleCampaignsInsights: builder.query<SingleCampaignInsightsResponse, string>({
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
