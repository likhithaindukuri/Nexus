import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  deleteWidgetLogo,
  fetchWidgetSettings,
  updateWidgetSettings,
  uploadWidgetLogo,
} from "../utils/api";
import { API_BASE } from "../utils/auth";

import { FaRobot } from "react-icons/fa";
import { BsChatDots, BsQuestionCircle } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";
import {
  Copy,
  ImagePlus,
  Trash2,
  Check,
  ChevronDown,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const defaultSettings = {
  title: "Chat with us",
  welcome_message: "Hello! How can I help you today?",
  primary_color: "#000000",
  position: "bottom-right",
  button_size: "medium",
  widget_style: "chat",
  logo_url: null,
};

const stylePresets = [
  { id: "chat", label: "Chat", icon: BsChatDots },
  { id: "robot", label: "Robot", icon: FaRobot },
  { id: "assistant", label: "Assistant", icon: HiOutlineSparkles },
  { id: "help", label: "Help", icon: BsQuestionCircle },
];

function getTextColor(hex) {
  if (!hex) return "#fff";
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#111" : "#fff";
}

export default function WidgetPage({ organization }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [openSection, setOpenSection] = useState("content");

  const iconColor = getTextColor(settings.primary_color);
  const widgetToken = organization.widget_token;

  const embedCode = useMemo(
    () =>
      `<!-- Nexus Widget -->\n<script src="${API_BASE}/widget.js" data-token="${widgetToken}" defer></script>`,
    [widgetToken]
  );

  const btnSize =
    settings.button_size === "small" ? 44 : settings.button_size === "large" ? 60 : 52;

  const activeStyle =
    stylePresets.find((s) => s.id === settings.widget_style) || stylePresets[0];
  const ActiveIcon = activeStyle.icon;

  const previewConfig = useMemo(
    () =>
      JSON.stringify({
        title: settings.title,
        welcome_message: settings.welcome_message,
        primary_color: settings.primary_color,
        position: settings.position,
        button_size: settings.button_size,
        widget_style: settings.widget_style,
        logo_url: settings.logo_url || null,
      }),
    [settings]
  );

  useEffect(() => {
    fetchWidgetSettings()
      .then((data) => setSettings((prev) => ({ ...prev, ...data })))
      .catch(() => setError("Could not load widget settings"));
  }, []);

  const reloadWidget = () => {
    document.getElementById("nx-widget-root")?.remove();
    document.getElementById("nx-live-widget")?.remove();

    const script = document.createElement("script");
    script.id = "nx-live-widget";
    script.src = `${API_BASE}/widget.js?t=${Date.now()}`;
    script.dataset.token = widgetToken;
    script.dataset.config = previewConfig;
    script.defer = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    reloadWidget();
    return () => document.getElementById("nx-widget-root")?.remove();
  }, [widgetToken, previewConfig]);

  const handleSave = async () => {
    setError("");
    setSaved(false);

    try {
      const updated = await updateWidgetSettings(settings);
      setSettings((prev) => ({ ...prev, ...updated }));
      setSaved(true);
      reloadWidget();
    } catch {
      setError("Failed to save settings");
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    setError("");

    try {
      const updated = await uploadWidgetLogo(file);
      setSettings((prev) => ({ ...prev, ...updated }));
      reloadWidget();
    } catch {
      setError("Logo upload failed");
    } finally {
      setLogoUploading(false);
      event.target.value = "";
    }
  };

  const handleLogoRemove = async () => {
    setError("");
    try {
      const updated = await deleteWidgetLogo();
      setSettings((prev) => ({ ...prev, ...updated, logo_url: null }));
      reloadWidget();
    } catch {
      setError("Could not remove logo");
    }
  };

  const copyEmbed = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout organization={organization} title="Widget">
      {/* Page background */}
      <div className="min-h-full bg-neutral-100 p-6">
  
        {/* Main white panel */}
        <div className="w-full rounded-2xl bg-white px-8 py-8">
  
          {/* ========================================================= */}
          {/* HEADER */}
          {/* ========================================================= */}
  
          <div className="mb-8 flex items-start justify-between gap-6">
            <div>
              <p className="mb-1 text-sm font-medium text-neutral-400">
                Dashboard
              </p>
  
              <h1 className="text-4xl font-bold tracking-tight text-neutral-950">
                Widget
              </h1>
  
              <p className="mt-2 text-base text-neutral-500">
                Customize your AI widget and add it to your website.
              </p>
            </div>
  
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Save Changes
            </button>
          </div>
  
  
          {/* ========================================================= */}
          {/* MAIN TWO COLUMN LAYOUT */}
          {/* ========================================================= */}
  
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(480px,0.95fr)]">
  
            {/* ======================================================= */}
            {/* LEFT SIDE — SETTINGS */}
            {/* ======================================================= */}
  
            <div className="space-y-4">
  
              {/* ===================================================== */}
              {/* 1. CONTENT */}
              {/* ===================================================== */}
  
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
  
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection(
                      openSection === "content" ? "" : "content"
                    )
                  }
                  className="flex w-full items-center justify-between px-6 py-6 text-left transition hover:bg-neutral-50"
                >
  
                  <div className="flex items-center gap-4">
  
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                      1
                    </span>
  
                    <div>
                      <p className="text-base font-semibold text-neutral-950">
                        Content
                      </p>
  
                      <p className="mt-0.5 text-xs text-neutral-400">
                        Configure your widget title and welcome message
                      </p>
                    </div>
  
                  </div>
  
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-neutral-500 transition-transform ${
                      openSection === "content" ? "rotate-180" : ""
                    }`}
                  />
  
                </button>
  
  
                {openSection === "content" && (
                  <div className="border-t border-neutral-100 px-6 pb-7 pt-6">
  
                    <div className="space-y-6">
  
                      {/* Widget Title */}
                      <div>
  
                        <label className="mb-2 block text-sm font-medium text-neutral-700">
                          Widget Title
                        </label>
  
                        <input
                          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                          value={settings.title}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              title: e.target.value,
                            })
                          }
                          placeholder="Chat with us"
                        />
  
                      </div>
  
  
                      {/* Welcome Message */}
                      <div>
  
                        <div className="mb-2 flex items-center justify-between">
  
                          <label className="block text-sm font-medium text-neutral-700">
                            Welcome Message
                          </label>
  
                          <span className="text-xs text-neutral-400">
                            {settings.welcome_message.length}/120
                          </span>
  
                        </div>
  
                        <textarea
                          rows={4}
                          maxLength={120}
                          className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                          value={settings.welcome_message}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              welcome_message: e.target.value,
                            })
                          }
                          placeholder="Hello! How can I help you today?"
                        />
  
                      </div>
  
                    </div>
  
                  </div>
                )}
  
              </section>
  
  
              {/* ===================================================== */}
              {/* 2. BRAND */}
              {/* ===================================================== */}
  
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
  
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection(
                      openSection === "brand" ? "" : "brand"
                    )
                  }
                  className="flex w-full items-center justify-between px-6 py-6 text-left transition hover:bg-neutral-50"
                >
  
                  <div className="flex items-center gap-4">
  
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                      2
                    </span>
  
                    <div>
                      <p className="text-base font-semibold text-neutral-950">
                        Brand
                      </p>
  
                      <p className="mt-0.5 text-xs text-neutral-400">
                        Set your widget color and logo
                      </p>
                    </div>
  
                  </div>
  
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-neutral-500 transition-transform ${
                      openSection === "brand" ? "rotate-180" : ""
                    }`}
                  />
  
                </button>
  
  
                {openSection === "brand" && (
                  <div className="border-t border-neutral-100 px-6 pb-7 pt-6">
  
                    <div className="space-y-7">
  
                      {/* Primary Color */}
                      <div>
  
                        <label className="mb-3 block text-sm font-medium text-neutral-700">
                          Primary Color
                        </label>
  
                        <div className="flex items-center gap-3">
  
                          <input
                            type="color"
                            className="h-11 w-14 cursor-pointer rounded-xl border border-neutral-200 bg-white p-1"
                            value={settings.primary_color}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                primary_color: e.target.value,
                              })
                            }
                          />
  
                          <div className="rounded-xl border border-neutral-200 px-4 py-2.5 font-mono text-sm text-neutral-700">
                            {settings.primary_color}
                          </div>
  
                        </div>
  
                      </div>
  
  
                      {/* Logo */}
                      <div>
  
                        <label className="mb-3 block text-sm font-medium text-neutral-700">
                          Logo
                        </label>
  
                        <div className="flex flex-wrap items-center gap-3">
  
                          {settings.logo_url && (
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white">
  
                              <img
                                src={settings.logo_url}
                                alt="Widget logo"
                                className="h-8 w-8 object-contain"
                              />
  
                            </div>
                          )}
  
  
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50">
  
                            <ImagePlus size={17} />
  
                            {logoUploading
                              ? "Uploading..."
                              : "Upload Logo"}
  
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp,image/svg+xml"
                              className="hidden"
                              onChange={handleLogoUpload}
                              disabled={logoUploading}
                            />
  
                          </label>
  
  
                          {settings.logo_url && (
                            <button
                              type="button"
                              onClick={handleLogoRemove}
                              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-600 transition hover:bg-neutral-50"
                            >
                              <Trash2 size={16} />
                              Remove
                            </button>
                          )}
  
                        </div>
  
  
                        {settings.logo_url && (
                          <p className="mt-2 text-xs text-neutral-400">
                            Your logo replaces the default launcher icon.
                          </p>
                        )}
  
                      </div>
  
                    </div>
  
                  </div>
                )}
  
              </section>
  
  
              {/* ===================================================== */}
              {/* 3. LAUNCHER STYLE */}
              {/* ===================================================== */}
  
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
  
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection(
                      openSection === "launcher" ? "" : "launcher"
                    )
                  }
                  className="flex w-full items-center justify-between px-6 py-6 text-left transition hover:bg-neutral-50"
                >
  
                  <div className="flex items-center gap-4">
  
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                      3
                    </span>
  
                    <div>
                      <p className="text-base font-semibold text-neutral-950">
                        Launcher Style
                      </p>
  
                      <p className="mt-0.5 text-xs text-neutral-400">
                        Choose the icon for your chat launcher
                      </p>
                    </div>
  
                  </div>
  
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-neutral-500 transition-transform ${
                      openSection === "launcher" ? "rotate-180" : ""
                    }`}
                  />
  
                </button>
  
  
                {openSection === "launcher" && (
                  <div className="border-t border-neutral-100 px-6 pb-7 pt-6">
  
                    <div className="grid grid-cols-2 gap-4">
  
                      {stylePresets.map((preset) => {
  
                        const Icon = preset.icon;
  
                        const active =
                          settings.widget_style === preset.id;
  
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() =>
                              setSettings({
                                ...settings,
                                widget_style: preset.id,
                              })
                            }
                            className={`rounded-xl border px-4 py-6 transition ${
                              active
                                ? "border-black bg-neutral-50 ring-1 ring-black"
                                : "border-neutral-200 bg-white hover:border-neutral-400 hover:bg-neutral-50"
                            }`}
                          >
  
                            <div
                              className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full ${
                                active
                                  ? "bg-black text-white"
                                  : "bg-neutral-100 text-neutral-800"
                              }`}
                            >
                              <Icon size={19} />
                            </div>
  
                            <div className="text-center text-sm font-medium text-neutral-800">
                              {preset.label}
                            </div>
  
                          </button>
                        );
  
                      })}
  
                    </div>
  
                  </div>
                )}
              </section>
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection(
                      openSection === "layout" ? "" : "layout"
                    )
                  }
                  className="flex w-full items-center justify-between px-6 py-6 text-left transition hover:bg-neutral-50"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                      4
                    </span>
                    <div>
                      <p className="text-base font-semibold text-neutral-950">
                        Layout & Position
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-400">
                        Control widget position and button size
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-neutral-500 transition-transform ${
                      openSection === "layout" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSection === "layout" && (
                  <div className="border-t border-neutral-100 px-6 pb-7 pt-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Position */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">
                          Position
                        </label>
                        <select
                          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                          value={settings.position}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              position: e.target.value,
                            })
                          }
                        >
                          <option value="bottom-right">
                            Bottom Right
                          </option>
                          <option value="bottom-left">
                            Bottom Left
                          </option>
                        </select>
                      </div>
                      {/* Size */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">
                          Size
                        </label>
                        <select
                          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                          value={settings.button_size}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              button_size: e.target.value,
                            })
                          }
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </section>
              {/* STATUS MESSAGES */}
              {saved && (
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm text-neutral-700">
                  Settings saved. Preview widget updated.
                </div>
              )}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>
            <div className="space-y-6">
              <section className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="mb-5">
                  <h2 className="text-xl font-semibold text-neutral-950">
                    Live Preview
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    This is how your widget will appear on your website.
                  </p>
                </div>
                {/* Website Preview */}
                <div className="relative h-[430px] overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                  {/* Fake website */}
                  <div className="absolute inset-0 bg-white">
                    {/* Fake heading */}
                    <div className="mx-auto max-w-md px-8 pt-12">
                      <div className="h-3 w-32 rounded-full bg-neutral-100" />
                      <div className="mt-6 h-2.5 w-64 rounded-full bg-neutral-100" />
                      <div className="mt-3 h-2.5 w-52 rounded-full bg-neutral-100" />
                    </div>
                    {/* Fake content */}
                    <div className="mx-auto mt-12 max-w-md px-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 rounded-xl bg-neutral-50" />
                        <div className="h-24 rounded-xl bg-neutral-50" />
                      </div>
                    </div>
                  </div>
                  {/* Welcome message */}
                  <div
                    className={`absolute bottom-24 ${
                      settings.position === "bottom-left"
                        ? "left-6"
                        : "right-6"
                    }`}
                  >
                    <div className="relative max-w-[220px] rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm leading-5 text-neutral-800 shadow-lg">
                      {settings.welcome_message}
                      {/* Bubble tail */}
                      <div
                        className={`absolute bottom-[-7px] h-3 w-3 rotate-45 border-b border-r border-neutral-200 bg-white ${
                          settings.position === "bottom-left"
                            ? "left-5"
                            : "right-5"
                        }`}
                      />
                    </div>
                  </div>
                  {/* Launcher */}
                  <div
                    className={`absolute bottom-6 ${
                      settings.position === "bottom-left"
                        ? "left-6"
                        : "right-6"
                    } flex items-center justify-center rounded-full shadow-xl`}
                    style={{
                      backgroundColor: settings.primary_color,
                      width: btnSize,
                      height: btnSize,
                    }}
                  >
  
                    {settings.logo_url ? (
                      <img
                        src={settings.logo_url}
                        alt=""
                        className="h-[70%] w-[70%] object-contain"
                      />
                    ) : (
                      <span
                        style={{ color: iconColor }}
                        className="text-xl"
                      >
                        <ActiveIcon />
                      </span>
                    )}
  
                  </div>
  
                </div>
  
  
                {/* Preview information */}
                <div className="mt-5 flex flex-wrap gap-2">
  
                  <div className="rounded-lg border border-black bg-white px-3 py-2 text-xs font-medium text-neutral-900">
                    {settings.position === "bottom-left"
                      ? "Bottom Left"
                      : "Bottom Right"}
                  </div>
  
                  <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-600">
                    {activeStyle.label}
                  </div>
  
                  <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-600">
                    {settings.button_size.charAt(0).toUpperCase() +
                      settings.button_size.slice(1)}
                  </div>
  
                  <button
                    type="button"
                    onClick={reloadWidget}
                    className="ml-auto inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50"
                  >
                    <RefreshCw size={14} />
                    Refresh
                  </button>
  
                </div>
  
              </section>
  
  
              {/* ===================================================== */}
              {/* EMBED CODE */}
              {/* ===================================================== */}
  
              <section className="rounded-2xl border border-neutral-200 bg-white p-6">
  
                <div className="mb-5 flex items-start justify-between gap-4">
  
                  <div>
  
                    <h2 className="text-xl font-semibold text-neutral-950">
                      Embed Code
                    </h2>
  
                    <p className="mt-1 text-sm leading-5 text-neutral-500">
                      Add this script to your website before the closing{" "}
                      <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-700">
                        &lt;/body&gt;
                      </code>{" "}
                      tag.
                    </p>
  
                  </div>
  
  
                  <button
                    type="button"
                    onClick={copyEmbed}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
                  >
  
                    {copied ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
  
                    {copied ? "Copied" : "Copy Code"}
  
                  </button>
  
                </div>
  
  
                {/* Code box */}
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
  
                  <pre className="max-h-40 overflow-auto p-4 text-xs leading-6 text-neutral-700">
                    {embedCode}
                  </pre>
  
                </div>
  
  
                {/* Documentation */}
                <div className="mt-4 flex items-center justify-between">
  
                  <p className="text-xs text-neutral-400">
                    Paste the code into your website to enable the Nexus widget.
                  </p>
  
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-800 transition hover:text-black"
                  >
                    View Documentation
                    <ArrowRight size={15} />
                  </button>
  
                </div>
  
              </section>
  
            </div>
  
          </div>
  
        </div>
      </div>
    </DashboardLayout>
  );
}
