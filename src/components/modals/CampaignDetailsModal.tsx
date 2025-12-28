"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  useGetSingleCampaignsDetailsQuery,
  useGetSingleCampaignsInsightsQuery,
} from "../../services/apiSlice";

export default function CampaignDetailsModal({
  campaignId,
  onClose,
}: {
  campaignId: string;
  onClose: () => void;
}) {
  const { data, isLoading } = useGetSingleCampaignsDetailsQuery(campaignId);
  const { data: insightsData, isLoading: insightsLoading } =
    useGetSingleCampaignsInsightsQuery(campaignId);

  if (!campaignId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3"
          onClick={onClose}
        >
          <X size={18} />
        </Button>

        {isLoading || insightsLoading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading campaign...</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">
              {data?.campaign?.name}
            </h2>

            {/* Campaign Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Info label="Status" value={data?.campaign?.status} />
              <Info label="Budget" value={`₹${data?.campaign?.budget}`} />
              <Info
                label="Daily Budget"
                value={`₹${data?.campaign?.daily_budget}`}
              />
              <Info
                label="Platforms"
                value={data?.campaign?.platforms.join(", ")}
              />
              <Info
                label="Created"
                value={new Date(
                  data?.campaign?.created_at
                ).toLocaleDateString()}
              />
            </div>

            {/* Insights */}
            <div className="mt-6 border-t pt-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Performance Insights
              </h3>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <Insight
                  label="Impressions"
                  value={insightsData?.insights?.impressions}
                />
                <Insight label="Clicks" value={insightsData?.insights?.clicks} />
                <Insight
                  label="Conversions"
                  value={insightsData?.insights?.conversions}
                />
                <Insight
                  label="Spend"
                  value={`₹${insightsData.insights.spend}`}
                />
                <Insight label="CTR" value={`${insightsData?.insights?.ctr}%`} />
                <Insight label="CPC" value={`₹${insightsData?.insights?.cpc}`} />
                <Insight
                  label="Conv. Rate"
                  value={`${insightsData?.insights?.conversion_rate}%`}
                />
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Insight({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}
