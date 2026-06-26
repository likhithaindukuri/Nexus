import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Code2,
  BarChart3,
  Settings,
  LogOut,
  Bot,
  ChevronRight,
} from "lucide-react";

const menu = [
  {
    label: "Overview",
    path: "dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Documents",
    path: "documents",
    icon: FileText,
  },
  {
    label: "Widget",
    path: "widget",
    icon: Code2,
  },
  {
    label: "Analytics",
    path: "analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "settings",
    icon: Settings,
  },
];

export default function Sidebar({
  slug,
  orgName,
  onLogout,
}) {
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-black text-white flex flex-col z-50">

      {/* LOGO */}

      <div className="px-6 py-5 border-b border-neutral-800">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
            <Bot size={18} />
          </div>

          <div>

            <h2 className="text-base font-bold">
              Nexus
            </h2>

            <p className="text-[11px] text-neutral-400">
              Document Intelligence Platform
            </p>

          </div>

        </div>

      </div>

      {/* WORKSPACE */}

      <div className="px-5 py-4">

        <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          Workspace
        </p>

        <div className="mt-2 bg-neutral-900 border border-neutral-800 rounded-xl p-3">

          <div className="flex items-center justify-between">

            <div className="min-w-0">

              <p className="text-[11px] text-neutral-500">
                Organization
              </p>

              <h3 className="font-semibold text-sm truncate mt-1">
                {orgName}
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 px-3 space-y-1.5">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={`/org/${slug}/${item.path}`}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black shadow-lg"
                    : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                }`
              }
            >

              <div className="flex items-center gap-3">

                <Icon size={17} />

                <span className="text-sm font-medium">
                  {item.label}
                </span>

              </div>

              <ChevronRight
                size={14}
                className="opacity-40 group-hover:opacity-100 transition"
              />

            </NavLink>
          );
        })}

      </nav>

      {/* FOOTER */}

      <div className="border-t border-neutral-800 p-4">

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-700 rounded-xl py-2.5 text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-300"
        >

          <LogOut size={16} />

          <span>Sign Out</span>

        </button>

      </div>

    </aside>
  );
}