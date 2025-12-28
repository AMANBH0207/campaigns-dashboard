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
import { Button } from "@/components/ui/button";

export default function CampaignsPage() {
  const { data, isLoading, isError } = useGetCampaignsQuery();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);

  const filteredCampaigns = useMemo(() => {
    if (!data?.campaigns) return [];

    return data.campaigns.filter((c: any) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !status || c.status === status;
      const matchesPlatform = !platform || c.platforms.includes(platform);

      return matchesSearch && matchesStatus && matchesPlatform;
    });
  }, [data, search, status, platform]);

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
      {/* Page Header */}
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search campaign..."
          className="sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select onValueChange={setStatus}>
          <SelectTrigger className="sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setPlatform}>
          <SelectTrigger className="sm:w-40">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meta">Meta</SelectItem>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <CampaignsTable
        data={{ campaigns: filteredCampaigns }}
        isLoading={isLoading}
        isError={isError}
      />
    </main>
  );
}
