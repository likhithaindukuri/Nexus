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
      <div className="min-h-full bg-neutral-100 p-6">
  
        {/* ========================================================= */}
        {/* MAIN WHITE PANEL */}
        {/* ========================================================= */}
  
        <div className="w-full rounded-2xl bg-white px-8 py-8">
  
          {/* ======================================================= */}
          {/* HEADER */}
          {/* ======================================================= */}
  
          <div className="mb-8 flex items-start justify-between gap-6">
  
            <div>
              <p className="mb-1 text-sm font-medium text-neutral-400">
                Workspace
              </p>
  
              <h1 className="text-4xl font-bold tracking-tight text-neutral-950">
                Settings
              </h1>
  
              <p className="mt-2 max-w-2xl text-base text-neutral-500">
                Manage your organization and workspace information.
              </p>
            </div>
  
            {/* Status */}
            <div className="hidden items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 md:flex">
  
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
  
              <span className="text-sm font-medium text-neutral-700">
                Workspace Active
              </span>
  
            </div>
  
          </div>
  
  
          {/* ======================================================= */}
          {/* ORGANIZATION */}
          {/* ======================================================= */}
  
          <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
  
            {/* Section Header */}
  
            <div className="border-b border-neutral-100 px-6 py-6">
  
              <div className="flex items-center gap-4">
  
                {/* Organization Avatar */}
  
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-lg font-semibold text-white">
                  {organization.name.charAt(0).toUpperCase()}
                </div>
  
                <div>
  
                  <h2 className="text-lg font-semibold text-neutral-950">
                    {organization.name}
                  </h2>
  
                  <p className="mt-1 text-sm text-neutral-500">
                    Organization workspace
                  </p>
  
                </div>
  
              </div>
  
            </div>
  
  
            {/* Organization Fields */}
  
            <div className="grid grid-cols-1 md:grid-cols-2">
  
              {fields.map((field, index) => {
  
                const Icon = field.icon;
  
                const isLast =
                  index === fields.length - 1;
  
                return (
                  <div
                    key={field.label}
                    className={`px-6 py-6 ${
                      index % 2 === 0
                        ? "md:border-r border-neutral-100"
                        : ""
                    } ${
                      !isLast
                        ? "border-b border-neutral-100"
                        : ""
                    }`}
                  >
  
                    <div className="mb-3 flex items-center gap-2.5">
  
                      <Icon
                        size={16}
                        className="text-neutral-400"
                      />
  
                      <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                        {field.label}
                      </p>
  
                    </div>
  
                    <p
                      className={`text-sm text-neutral-900 ${
                        field.mono
                          ? "break-all font-mono"
                          : "font-medium"
                      }`}
                    >
                      {field.value}
                    </p>
  
                  </div>
                );
  
              })}
  
            </div>
  
          </section>
  
  
          {/* ======================================================= */}
          {/* WORKSPACE INFORMATION */}
          {/* ======================================================= */}
  
          <section className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
  
            {/* Section Header */}
  
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-6">
  
              <div>
  
                <h2 className="text-lg font-semibold text-neutral-950">
                  Workspace
                </h2>
  
                <p className="mt-1 text-sm text-neutral-500">
                  Services available in your Nexus workspace.
                </p>
  
              </div>
  
              <div className="hidden items-center gap-2 sm:flex">
  
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
  
                <span className="text-sm font-medium text-neutral-600">
                  Active
                </span>
  
              </div>
  
            </div>
  
  
            {/* Workspace Features */}
  
            <div className="grid grid-cols-1 md:grid-cols-3">
  
              {/* AI Chatbot */}
  
              <div className="border-b border-neutral-100 p-6 md:border-b-0 md:border-r">
  
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
  
                  <Bot
                    size={19}
                    className="text-neutral-900"
                  />
  
                </div>
  
                <h3 className="text-sm font-semibold text-neutral-950">
                  AI Chatbot
                </h3>
  
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Personalized chatbot powered by your uploaded documents.
                </p>
  
                <div className="mt-5 flex items-center gap-2">
  
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
  
                  <span className="text-xs font-medium text-neutral-600">
                    Available
                  </span>
  
                </div>
  
              </div>
  
  
              {/* Knowledge Base */}
  
              <div className="border-b border-neutral-100 p-6 md:border-b-0 md:border-r">
  
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
  
                  <Database
                    size={19}
                    className="text-neutral-900"
                  />
  
                </div>
  
                <h3 className="text-sm font-semibold text-neutral-950">
                  Knowledge Base
                </h3>
  
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  PDFs are processed and indexed for semantic search.
                </p>
  
                <div className="mt-5 flex items-center gap-2">
  
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
  
                  <span className="text-xs font-medium text-neutral-600">
                    Connected
                  </span>
  
                </div>
  
              </div>
  
  
              {/* Analytics */}
  
              <div className="p-6">
  
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
  
                  <BarChart3
                    size={19}
                    className="text-neutral-900"
                  />
  
                </div>
  
                <h3 className="text-sm font-semibold text-neutral-950">
                  Analytics
                </h3>
  
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Monitor conversations and AI confidence scores.
                </p>
  
                <div className="mt-5 flex items-center gap-2">
  
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
  
                  <span className="text-xs font-medium text-neutral-600">
                    Available
                  </span>
  
                </div>
  
              </div>
  
            </div>
  
          </section>
  
  
          {/* ======================================================= */}
          {/* SYSTEM INFORMATION */}
          {/* ======================================================= */}
  
          <section className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-5">
  
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  
              <div>
  
                <p className="text-sm font-medium text-neutral-900">
                  Nexus workspace
                </p>
  
                <p className="mt-1 text-xs text-neutral-500">
                  Your organization information is managed by your workspace administrator.
                </p>
  
              </div>
  
              <div className="flex items-center gap-2 text-xs text-neutral-500">
  
                <ShieldCheck size={15} />
  
                Workspace verified
  
              </div>
  
            </div>
  
          </section>
  
        </div>
  
      </div>
    </DashboardLayout>
  );
}