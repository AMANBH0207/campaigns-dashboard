"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto"
import { startCampaignStream } from "@/services/campaignStream"

type Point = {
  time: string
  impressions: number
  clicks: number
  spend: number
}

export default function PerformanceChart({ campaignId }: { campaignId: string }) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  const [points, setPoints] = useState<Point[]>([])

  // Create chart once
  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            type: "bar",
            label: "Impressions",
            data: [],
            backgroundColor: "#60a5fa",
            borderRadius: 4,
            order: 2,
          },
          {
            type: "line",
            label: "Spend",
            data: [],
            borderColor: "#3b82f6",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            order: 1,
          },
          {
            type: "line",
            label: "Clicks",
            data: [],
            borderColor: "#22c55e",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            order: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    })

    return () => chartInstance.current?.destroy()
  }, [])

  // Stream data
  useEffect(() => {
    if (!campaignId) return

    setPoints([])

    const stopStream = startCampaignStream(campaignId, (data) => {
      setPoints((prev) =>
        [...prev, {
          time: new Date(data.timestamp).toLocaleTimeString(),
          impressions: data.impressions,
          clicks: data.clicks,
          spend: data.spend,
        }].slice(-12)
      )
    })

    return () => stopStream()
  }, [campaignId])

  // Update chart when data changes
  useEffect(() => {
    if (!chartInstance.current) return

    chartInstance.current.data.labels = points.map(p => p.time)
    chartInstance.current.data.datasets[0].data = points.map(p => p.impressions)
    chartInstance.current.data.datasets[1].data = points.map(p => p.spend)
    chartInstance.current.data.datasets[2].data = points.map(p => p.clicks)

    chartInstance.current.update()
  }, [points])

  return (
    <Card className="p-4 md:p-6 mb-6">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
        Live Campaign Performance
      </h2>
      <div className="w-full h-[300px]">
        <canvas ref={chartRef} />
      </div>
    </Card>
  )
}
