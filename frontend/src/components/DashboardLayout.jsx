import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { clearAuth } from "../utils/auth";

export default function DashboardLayout({
  organization,
  title,
  children,
}) {
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-neutral-100">

      {/* Sidebar */}

      <Sidebar
        slug={organization.slug}
        orgName={organization.name}
        onLogout={logout}
      />

      {/* Main Content */}

      <div className="ml-64 min-h-screen flex flex-col">

        {/* Top Navigation */}

        <Topbar
          organization={organization}
          title={title}
        />

        {/* Page Content */}

        <main className="flex-1 p-6 lg:p-8">

          <div className="max-w-7xl mx-auto">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}