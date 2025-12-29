import type { CampaignStreamData } from "../schema/global";


export function startCampaignStream(
  campaignId: string,
  onMessage: (data: CampaignStreamData) => void,
  onError?: (err: any) => void
) {
  const baseUrl = import.meta.env.VITE_BASE_URL || "";
  const source = new EventSource(`${baseUrl}/campaigns/${campaignId}/insights/stream`);

  source.onmessage = (event) => {
    const parsed: CampaignStreamData = JSON.parse(event.data);
    onMessage(parsed);
  };

  source.onerror = (err) => {
    console.error("Campaign stream error:", err);
    onError?.(err);
  };

  return () => source.close();
}
