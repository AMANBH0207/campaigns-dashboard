import { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CampaignDetailsModal from "./modals/CampaignDetailsModal";
import type { Campaign } from "@/schema/global";

interface CampaignsTableProps {
  data?: { campaigns: Campaign[] };
  isLoading: boolean;
  isError: boolean;
}

export default function CampaignsTable({
  data,
  isLoading,
  isError,
}: CampaignsTableProps) {
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const campaigns: Campaign[] = data?.campaigns ?? [];
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return campaigns.slice(start, start + itemsPerPage);
  }, [campaigns, page, itemsPerPage]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-3">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading campaigns...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500 text-center">
        Failed to load campaigns
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border bg-background shadow-sm">
        {/* Table */}
        <div
          style={{
            minHeight:
              itemsPerPage === 5
                ? "240px"
                : itemsPerPage === 8
                ? "355px"
                : itemsPerPage === 10
                ? "430px"
                : itemsPerPage === 12
                ? "510px"
                : "625px",
          }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Platforms</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Daily Budget</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((c: Campaign) => (
                <TableRow key={c.id}>
                  <TableCell
                    className="font-medium text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setSelectedCampaign(c.id)}
                  >
                    {c.name}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        c.status === "active"
                          ? "default"
                          : c.status === "paused"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {c.status}
                    </Badge>
                  </TableCell>

                  <TableCell>{c.platforms.join(", ")}</TableCell>
                  <TableCell>₹{c.budget.toLocaleString()}</TableCell>
                  <TableCell>₹{c.daily_budget.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(c.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t text-sm">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <span>Rows:</span>
            <select
              value={itemsPerPage}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setItemsPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              {[5, 8, 10, 12, 15].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Range display */}
          <span className="text-xs sm:text-sm whitespace-nowrap">
            <span className="sm:hidden">
              {(page - 1) * itemsPerPage + 1}–
              {Math.min(page * itemsPerPage, campaigns.length)} /{" "}
              {campaigns.length}
            </span>

            <span className="hidden sm:inline">
              {(page - 1) * itemsPerPage + 1}–
              {Math.min(page * itemsPerPage, campaigns.length)} of{" "}
              {campaigns.length}
            </span>
          </span>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>

            <span className="text-xs sm:text-sm whitespace-nowrap">
              <span className="sm:hidden">
                {page} - {totalPages}
              </span>

              <span className="hidden sm:inline">
                Page {page} of {totalPages}
              </span>
            </span>

            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {selectedCampaign && (
        <CampaignDetailsModal
          campaignId={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </>
  );
}
