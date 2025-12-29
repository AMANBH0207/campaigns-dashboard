import { useState } from "react";
import MetricsCard from "@/components/MetricsCard";
import PerformanceChart from "@/components/PerformanceChart";
import CampaignsTable from "@/components/CampaignsTable";
import {
  useGetCampaignsInsightsQuery,
  useGetCampaignsQuery,
} from "../services/apiSlice";
import type { Campaign } from "@/schema/global";

export default function Dashboard() {
  const [userSelectedCampaign, setUserSelectedCampaign] = useState<
    string | null
  >(null);

  const { data: insightData } = useGetCampaignsInsightsQuery();
  const { data, isLoading, isError } = useGetCampaignsQuery();

  const selectedCampaign =
    userSelectedCampaign ?? data?.campaigns?.[0]?.id ?? null;

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Campaign Overview
        </h1>
        <p className="text-sm text-gray-600">
          Monitor performance and manage active campaigns
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          label="Total Spend"
          value={`₹${insightData?.insights?.total_spend ?? 0}`}
        />
        <MetricsCard
          label="Impressions"
          value={insightData?.insights?.total_impressions ?? 0}
        />
        <MetricsCard
          label="Clicks"
          value={insightData?.insights?.total_clicks ?? 0}
        />
        <MetricsCard
          label="Conversions"
          value={insightData?.insights?.total_conversions ?? 0}
        />
      </div>

      {/* Chart Header + Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <h2 className="text-base font-semibold text-gray-800">
          Live Campaign Performance
        </h2>

        <select
          value={selectedCampaign || ""}
          onChange={(e) => setUserSelectedCampaign(e.target.value)}
          className="w-full sm:w-auto border rounded-md px-3 py-2 text-sm bg-white mt-2 sm:mt-0"
        >
          {data?.campaigns?.map((c: Campaign) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Performance Chart */}
      <PerformanceChart campaignId={selectedCampaign} />

      {/* Campaigns Table */}
      <CampaignsTable data={data} isLoading={isLoading} isError={isError} />
    </main>
  );
}
