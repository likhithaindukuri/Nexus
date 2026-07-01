import DashboardLayout from "../components/DashboardLayout";

import {
  Building2,
  Mail,
  Hash,
  Fingerprint,
  Globe,
  Bot,
  Database,
  BarChart3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Settings({ organization }) {
  const fields = [
    {
      label: "Organization Name",
      value: organization.name,
      icon: Building2,
    },
    {
      label: "Email Address",
      value: organization.email,
      icon: Mail,
    },
    {
      label: "Workspace Slug",
      value: organization.slug,
      mono: true,
      icon: Hash,
    },
    {
      label: "Organization ID",
      value: organization.id,
      mono: true,
      icon: Fingerprint,
    },
    {
      label: "Dashboard URL",
      value: `/org/${organization.slug}/dashboard`,
      mono: true,
      icon: Globe,
    },
  ];

  return (
    <DashboardLayout
      organization={organization}
      title="Settings"
    >
      {/* Header */}

    <div className="flex items-center justify-between mb-10">

      <div>

        <h1 className="text-3xl font-bold text-neutral-900">
          Organization Settings
        </h1>

        <p className="mt-2 text-neutral-500 max-w-2xl">
          Manage your workspace details and view important organization
          information.
        </p>

      </div>

      <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full">

        <ShieldCheck size={18} className="text-emerald-600" />

        <span className="text-sm font-medium text-emerald-700">
          Workspace Active
        </span>

      </div>

      </div>

      {/* Profile Card */}

      <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm p-8">

        <div className="flex items-center gap-5 mb-8">

          <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-bold">

            {organization.name.charAt(0).toUpperCase()}

          </div>

        <div>

        <h3 className="text-2xl font-semibold">
          {organization.name}
        </h3>

        <p className="text-neutral-500 mt-1">
          AI Knowledge Platform Workspace
        </p>

      </div>

    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {fields.map((field) => {
      const Icon = field.icon;

  return (
    <div
      key={field.label}
      className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 hover:bg-white hover:shadow-md transition"
    >
      <div className="flex items-center gap-3 mb-3">

        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">

          <Icon size={18} />

        </div>

        <div>

          <p className="text-xs uppercase tracking-wide text-neutral-500">
            {field.label}
          </p>

        </div>

      </div>

      <p
        className={`text-sm ${
          field.mono
            ? "font-mono break-all"
            : "font-medium"
        }`}
      >
        {field.value}
      </p>

    </div>
  );
})}

        </div>

      </div>

      {/* Workspace Info */}

      <div className="bg-white border rounded-3xl shadow-sm p-8 mt-8">

  <div className="flex items-center gap-3 mb-6">

    <Sparkles />

    <h2 className="text-xl font-semibold">
      Workspace Features
    </h2>

  </div>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="rounded-2xl border p-6 hover:shadow-md transition">

      <Bot size={34} />

      <h3 className="font-semibold mt-4">
        AI Chatbot
      </h3>

      <p className="text-sm text-neutral-500 mt-2">
        Personalized chatbot powered by your uploaded documents.
      </p>

    </div>

    <div className="rounded-2xl border p-6 hover:shadow-md transition">

      <Database size={34} />

      <h3 className="font-semibold mt-4">
        Knowledge Base
      </h3>

      <p className="text-sm text-neutral-500 mt-2">
        PDFs are processed and indexed for semantic search.
      </p>

    </div>

    <div className="rounded-2xl border p-6 hover:shadow-md transition">

      <BarChart3 size={34} />

      <h3 className="font-semibold mt-4">
        Analytics
      </h3>

      <p className="text-sm text-neutral-500 mt-2">
        Monitor conversations and AI confidence scores.
      </p>

    </div>

  </div>

</div>

    </DashboardLayout>
  );
}