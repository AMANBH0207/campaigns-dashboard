"use client"

import { Menu } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Menu button for mobile */}
        <button className="lg:hidden text-gray-600 hover:text-gray-900" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <h1 className="text-lg md:text-2xl font-semibold text-gray-900">Campaign Monitoring Dashboard</h1>
      </div>
      <Avatar>
        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
    </header>
  )
}
