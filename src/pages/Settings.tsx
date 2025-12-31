import { SettingsIcon, Palette, Bell, Shield, User } from "lucide-react";

function Settings() {
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Settings
        </h1>
        <p className="text-sm text-gray-600">
          Manage your application preferences
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "App Settings", icon: SettingsIcon },
          { label: "Theme Settings", icon: Palette },
          { label: "Notifications", icon: Bell },
          { label: "Privacy & Security", icon: Shield },
          { label: "Profile Settings", icon: User },
        ].map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center gap-3 rounded-xl border bg-white p-8 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <Icon size={26} className="text-gray-700" />
            <span className="text-base font-medium text-gray-900">{label}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Settings;
