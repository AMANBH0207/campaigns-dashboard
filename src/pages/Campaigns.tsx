"use client";

import { useMemo, useState } from "react";
import CampaignsTable from "@/components/CampaignsTable";
import { useGetCampaignsQuery } from "@/services/apiSlice";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CampaignsPage() {
  const { data, isLoading, isError } = useGetCampaignsQuery();
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [platform, setPlatform] = useState<string>("all");

  const filteredCampaigns = useMemo(() => {
    if (!data?.campaigns) return [];

    return data.campaigns.filter((c: any) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" ? true : c.status === status;

      const matchesPlatform =
        platform === "all" ? true : c.platforms.includes(platform);

      return matchesSearch && matchesStatus && matchesPlatform;
    });
  }, [data, search, status, platform]);

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Campaigns
          </h1>
          <p className="text-sm text-gray-600">
            Manage and analyze all active campaigns
          </p>
        </div>

        {/* <Button>Create Campaign</Button> */}
      </div>

     <div className="flex flex-col sm:flex-row gap-3">
  <Input
    placeholder="Search campaign..."
    className="w-full sm:w-64"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <Select value={status} onValueChange={setStatus}>
    <SelectTrigger className="w-full sm:w-40">
      <SelectValue placeholder="Status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="active">Active</SelectItem>
      <SelectItem value="paused">Paused</SelectItem>
      <SelectItem value="completed">Completed</SelectItem>
    </SelectContent>
  </Select>

  <Select value={platform} onValueChange={setPlatform}>
    <SelectTrigger className="w-full sm:w-40">
      <SelectValue placeholder="Platform" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="meta">Meta</SelectItem>
      <SelectItem value="google">Google</SelectItem>
      <SelectItem value="linkedin">LinkedIn</SelectItem>
      <SelectItem value="other">Other</SelectItem>
    </SelectContent>
  </Select>
</div>

      <CampaignsTable
        data={{ campaigns: filteredCampaigns }}
        isLoading={isLoading}
        isError={isError}
      />
    </main>
  );
}
