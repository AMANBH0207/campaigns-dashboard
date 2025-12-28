import { Card } from "@/components/ui/card"

export default function MetricsCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4 md:p-6 hover:shadow-md transition-shadow">
      <p className="text-gray-600 text-xs md:text-sm mb-2">{label}</p>
      <p className="text-xl md:text-2xl font-bold text-gray-900 break-words">{value}</p>
    </Card>
  )
}
