"use client";

import type React from "react";
import { LayoutDashboard, Zap, BarChart3, Settings, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({
  isOpen = true,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  return (
    <aside
      className={`fixed lg:static w-56 h-screen bg-slate-800 text-white p-4 flex flex-col z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Close button for mobile */}
      <button
        className="lg:hidden absolute top-4 right-4 text-white hover:bg-slate-700 p-1 rounded"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
          <span className="text-sm font-bold">M</span>
        </div>
        <span className="font-bold text-sm">Mixo Ads</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        <NavItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          to="/"
        />
        <NavItem icon={<Zap size={20} />} label="Campaigns" to="/campaigns" />
        <NavItem icon={<BarChart3 size={20} />} label="Reports" to="/reports" />
        <NavItem
          icon={<Settings size={20} />}
          label="Settings"
          to="/settings"
        />
      </nav>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  to,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-slate-700"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
