import { useState } from "react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Copy,
  Upload,
  Camera,
  RefreshCw,
  Search,
  ExternalLink,
  Users,
  Clock,
  HardDrive,
  FileText,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  XCircle,
  Laptop
} from "lucide-react";
import { PolicyState, AuditEvent, WorkstationSession } from "../types";

export function BrowserSimulator() {
  const [activeConsoleTab, setActiveConsoleTab] = useState<"browser" | "admin">("browser");
  const [currentBrowserTab, setCurrentBrowserTab] = useState<number>(0);
  const [urlInput, setUrlInput] = useState<string>("forge://plm.mod-forge.internal/drawings/cad-7491");
  const [dlpAlert, setDlpAlert] = useState<{
    type: "clipboard" | "upload" | "screenshot";
    message: string;
    timestamp: string;
  } | null>(null);

  // Dynamic policy toggles controlled from either view
  const [policies, setPolicies] = useState<PolicyState>({
    clipboardShield: true,
    watermarking: true,
    cloudStorageBlock: true,
    aiPromptInspection: true,
    airGapIntranetOnly: false,
    usbDownloadLock: true,
  });

  // Filter for admin audit stream
  const [auditFilter, setAuditFilter] = useState<string>("ALL");

  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>([
    {
      id: "LOG-8812",
      timestamp: "10:48:12",
      user: "r.kumar@mod-forge.com",
      department: "CNC Machining Shop 2",
      eventType: "DLP_BLOCK",
      details: "Prevented clipboard export of CAD tolerance parameters to external clipboard",
      severity: "high",
    },
    {
      id: "LOG-8811",
      timestamp: "10:45:04",
      user: "v.selvam@mod-forge.com",
      department: "Tool Room / Die Shop",
      eventType: "URL_VISIT",
      details: "Authorized navigation to internal forging press telemetry dashboard (Press #2500T)",
      severity: "low",
    },
    {
      id: "LOG-8810",
      timestamp: "10:41:20",
      user: "a.deshmukh@mod-forge.com",
      department: "Metallurgical Lab",
      eventType: "AUTH_SUCCESS",
      details: "Session verified with TS-16949 certificate on Spectrometer Terminal #04",
      severity: "low",
    },
    {
      id: "LOG-8809",
      timestamp: "10:39:55",
      user: "k.patel@mod-forge.com",
      department: "Quality Assurance",
      eventType: "CLIPBOARD_SHIELD",
      details: "Sanitized unapproved clipboard paste into external web browser tab",
      severity: "medium",
    },
    {
      id: "LOG-8808",
      timestamp: "10:32:10",
      user: "s.nathan@mod-forge.com",
      department: "Heat Treatment Line",
      eventType: "POLICY_UPDATE",
      details: "SCADA furnace remote telemetry console locked to read-only mode",
      severity: "medium",
    },
  ]);

  const workstations: WorkstationSession[] = [
    {
      id: "WS-CH-01",
      user: "r.kumar@mod-forge.com",
      department: "CNC Machining Shop",
      activeDomain: "cad.mod-forge.internal",
      activeTime: "4h 12m",
      status: "active",
      dlpIncidents: 1,
      os: "Windows 11 Enterprise",
      ip: "192.168.10.42",
    },
    {
      id: "WS-CH-02",
      user: "v.selvam@mod-forge.com",
      department: "Die & Tool Room",
      activeDomain: "forging-press.mod-forge.internal",
      activeTime: "3h 45m",
      status: "active",
      dlpIncidents: 0,
      os: "Windows 11 Enterprise",
      ip: "192.168.10.43",
    },
    {
      id: "WS-CH-03",
      user: "a.deshmukh@mod-forge.com",
      department: "Metallurgical Lab",
      activeDomain: "lab-spectro.mod-forge.internal",
      activeTime: "5h 10m",
      status: "active",
      dlpIncidents: 0,
      os: "Ubuntu 24.04 LTS",
      ip: "192.168.12.18",
    },
    {
      id: "WS-CH-04",
      user: "m.sharma@mod-forge.com",
      department: "Procurement / Raw Steel",
      activeDomain: "steel-mills.supplier-portal.com",
      activeTime: "1h 20m",
      status: "idle",
      dlpIncidents: 0,
      os: "Windows 11 Enterprise",
      ip: "192.168.10.89",
    },
  ];

  const browserTabs = [
    {
      title: "CAD Tooling & Spec Sheet",
      url: "forge://plm.mod-forge.internal/drawings/cad-7491",
      domain: "plm.mod-forge.internal",
      category: "Engineering & CAD (Restricted)",
      badge: "ISO 9001 Vault",
    },
    {
      title: "ERP Forging & Heat Treat Line",
      url: "forge://erp.mod-forge.internal/production/furnace-scada",
      domain: "erp.mod-forge.internal",
      category: "Manufacturing ERP",
      badge: "SCADA Gateway",
    },
    {
      title: "Supplier Steel Grades Portal",
      url: "https://vendor.mod-forge.com/raw-materials/bright-bars",
      domain: "vendor.mod-forge.com",
      category: "Vendor Extranet",
      badge: "Secured TLS 1.3",
    },
  ];

  const handleTabSwitch = (index: number) => {
    setCurrentBrowserTab(index);
    setUrlInput(browserTabs[index].url);
  };

  const handleSimulateCopy = () => {
    if (policies.clipboardShield) {
      const newAlert = {
        type: "clipboard" as const,
        message: "MOD FORGE DLP Policy #402: Clipboard export blocked! Sensitive drawing tolerances and steel composition cannot be copied outside authorized enterprise enclaves.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setDlpAlert(newAlert);
      addAuditEvent("DLP_BLOCK", "Simulated attempt to copy proprietary drawing specifications blocked by Clipboard Guard", "high");
    } else {
      setDlpAlert({
        type: "clipboard" as const,
        message: "Warning: Clipboard Shield is currently DISABLED in policy settings. Content was copied to local clipboard.",
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  const handleSimulateUpload = () => {
    if (policies.cloudStorageBlock) {
      const newAlert = {
        type: "upload" as const,
        message: "MOD FORGE Policy #803: Outbound file uploads to unapproved cloud repositories are restricted on this workstation.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setDlpAlert(newAlert);
      addAuditEvent("DLP_BLOCK", "Attempted upload of 3D CAD STEP file to external cloud storage blocked", "high");
    } else {
      setDlpAlert({
        type: "upload" as const,
        message: "Warning: Cloud upload blocker is disabled. File transfer allowed.",
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  const handleSimulateScreenshot = () => {
    setDlpAlert({
      type: "screenshot" as const,
      message: "MOD FORGE Forensic Watermark active: Screen capture is embedded with operator ID (r.kumar@mod-forge.com), terminal IP (192.168.10.42), and cryptographic timestamp.",
      timestamp: new Date().toLocaleTimeString(),
    });
    addAuditEvent("CLIPBOARD_SHIELD", "Forensic watermark verified during screen capture attempt", "medium");
  };

  const addAuditEvent = (eventType: AuditEvent["eventType"], details: string, severity: AuditEvent["severity"]) => {
    const newEvent: AuditEvent = {
      id: `LOG-${Math.floor(8813 + Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString(),
      user: "r.kumar@mod-forge.com",
      department: "CNC Machining Shop 2",
      eventType,
      details,
      severity,
    };
    setAuditLogs((prev) => [newEvent, ...prev.slice(0, 7)]);
  };

  const filteredLogs = auditLogs.filter((log) => {
    if (auditFilter === "ALL") return true;
    return log.eventType === auditFilter;
  });

  return (
    <section id="interactive-sandbox" className="py-20 bg-slate-950 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              Live Product Experience
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Test the Hardened Browser & Activity Console in Real-Time
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Experience both sides of MOD FORGE Company Browser: the tamper-resistant operator workstation browser and the centralized IT security console.
            </p>
          </div>

          {/* Interactive Mode Switcher (Functional Segmented Control) */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveConsoleTab("browser")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeConsoleTab === "browser"
                  ? "bg-cyan-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Operator Browser View</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveConsoleTab("admin")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeConsoleTab === "admin"
                  ? "bg-cyan-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>IT Admin & Activity Console</span>
            </button>
          </div>
        </div>

        {/* DLP Alert Floating Banner (Feedback toast) */}
        {dlpAlert && (
          <div className="mb-6 p-4 rounded-lg border border-amber-500/50 bg-amber-950/40 text-amber-200 flex items-start justify-between gap-4 animate-fade-in shadow-lg">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Security Event Triggered ({dlpAlert.timestamp})
                </div>
                <div className="text-sm mt-0.5">{dlpAlert.message}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDlpAlert(null)}
              className="text-xs font-medium text-amber-400 hover:text-white px-2 py-1 rounded bg-amber-900/50 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Interactive Container */}
        {activeConsoleTab === "browser" ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
            {/* Browser Window Chrome */}
            <div className="border-b border-slate-800 bg-slate-950 px-4 pt-3 pb-2">
              {/* Window Controls and Tabs */}
              <div className="flex items-center gap-2 mb-3">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />

                {/* Browser Tab Bar */}
                <div className="ml-4 flex items-center gap-1 overflow-x-auto max-w-3xl">
                  {browserTabs.map((tab, idx) => (
                    <button
                      key={tab.url}
                      type="button"
                      onClick={() => handleTabSwitch(idx)}
                      className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-t-md transition-colors cursor-pointer border-t border-x whitespace-nowrap ${
                        currentBrowserTab === idx
                          ? "bg-slate-900 text-white border-slate-700 font-medium"
                          : "text-slate-400 border-transparent hover:bg-slate-900/50 hover:text-slate-200"
                      }`}
                    >
                      <Lock className="w-3 h-3 text-emerald-400" />
                      <span className="truncate max-w-[160px]">{tab.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* URL Address Bar & Policy Controls */}
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">
                <div className="flex items-center gap-2 flex-1 rounded-md bg-slate-900 border border-slate-700/80 px-3 py-1.5 text-xs font-mono text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-400 select-none">forge://</span>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full bg-transparent text-white outline-none font-mono"
                  />
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded shrink-0">
                    {browserTabs[currentBrowserTab].badge}
                  </span>
                </div>

                {/* Live Policy Simulation Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleSimulateCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded border border-slate-700 transition-colors cursor-pointer"
                    title="Attempt copying drawing dimensions to trigger DLP guard"
                  >
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Test Copy/Paste DLP</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSimulateUpload}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded border border-slate-700 transition-colors cursor-pointer"
                    title="Attempt uploading CAD model to external cloud"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Test Cloud Upload</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSimulateScreenshot}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded border border-slate-700 transition-colors cursor-pointer"
                    title="Verify forensic employee watermark"
                  >
                    <Camera className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Test Watermark</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Browser Content Frame */}
            <div className="relative p-6 bg-slate-900/95 min-h-[480px]">
              {/* Dynamic Watermark Layer */}
              {policies.watermarking && (
                <div
                  className="pointer-events-none absolute inset-0 select-none opacity-[0.035] text-[11px] font-mono leading-7 rotate-[-12deg] flex flex-wrap gap-10 text-cyan-200 p-4 overflow-hidden"
                  aria-hidden="true"
                >
                  {Array.from({ length: 40 }).map((_, i) => (
                    <span key={i}>
                      MOD-FORGE-CHENNAI · R.KUMAR (WS-CH-01) · TS-16949-COMPLIANT · 192.168.10.42
                    </span>
                  ))}
                </div>
              )}

              {/* Tab 0 Content: CAD / PLM Spec Viewer */}
              {currentBrowserTab === 0 && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <div className="text-xs font-mono text-cyan-400">
                        MOD FORGE PRIVATE LTD · DIE & TOOL ROOM
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1">
                        Drawing #MF-7491-C: Closed Die Forged Shackle Pin (40kg Rating)
                      </h3>
                      <div className="text-xs text-slate-400 mt-1">
                        Associated Press: 2500T Forging Press · Plant: Ambattur Industrial Estate
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="text-xs px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 font-mono">
                        DLP Active: Screen & Copy Guarded
                      </span>
                    </div>
                  </div>

                  {/* CAD Specifications Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                      <div className="text-xs font-medium text-slate-400">Raw Steel Bar Diameter</div>
                      <div className="text-lg font-bold font-mono text-white mt-1">Ø 52.00 mm</div>
                      <div className="text-xs text-slate-500 mt-1">Tolerance: +0.00 / -0.10 mm (Peeled)</div>
                    </div>
                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                      <div className="text-xs font-medium text-slate-400">Forged Weight & Pressure</div>
                      <div className="text-lg font-bold font-mono text-white mt-1">3.45 kg @ 2,500 Tons</div>
                      <div className="text-xs text-slate-500 mt-1">Closed Die Forging with Trimming Press</div>
                    </div>
                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                      <div className="text-xs font-medium text-slate-400">Heat Treatment Specification</div>
                      <div className="text-lg font-bold font-mono text-white mt-1">SCADA Pusher Furnace</div>
                      <div className="text-xs text-slate-500 mt-1">Polymer Quenched · Hardness 58-62 HRC</div>
                    </div>
                  </div>

                  {/* CAD Schematic Simulation Display */}
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-3 mb-4">
                      <span className="font-mono text-cyan-400">VECTOR CAD BLUEPRINT OVERVIEW (MF-7491)</span>
                      <span>Rendered via Secure WebGL Isolated Canvas</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                      <div className="relative h-44 rounded border border-slate-800/80 bg-slate-900/50 flex items-center justify-center p-4">
                        <svg className="w-full h-full text-cyan-400/80" viewBox="0 0 300 120" fill="none">
                          <rect x="20" y="35" width="260" height="50" rx="4" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                          <circle cx="50" cy="60" r="14" stroke="#38bdf8" strokeWidth="2" />
                          <line x1="90" y1="20" x2="90" y2="100" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="210" y1="20" x2="210" y2="100" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                          <circle cx="250" cy="60" r="14" stroke="#38bdf8" strokeWidth="2" />
                          <text x="110" y="55" fill="#e2e8f0" fontSize="10" fontFamily="monospace">MFPL-SHACKLE-PIN</text>
                          <text x="115" y="72" fill="#38bdf8" fontSize="9" fontFamily="monospace">Ø 48.00 ± 0.05</text>
                        </svg>
                        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded">
                          Forensic Guard: ACTIVE
                        </div>
                      </div>

                      <div className="space-y-3 text-xs text-slate-300">
                        <div className="text-slate-400">
                          <strong className="text-white">DLP Governance In Effect:</strong> Attempts to copy coordinate matrices, take raw screenshots, or inspect DOM elements are actively intercepted by the MOD FORGE Web Engine.
                        </div>
                        <div className="p-3 rounded bg-slate-900 border border-slate-800 text-slate-300 space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Surface Treatment:</span>
                            <span className="font-mono text-white">Dacromet Coating / Zinc Phosphating</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Inspection Standard:</span>
                            <span className="font-mono text-white">MPI Crack Detection under UV Light</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">OEM Customer:</span>
                            <span className="font-mono text-cyan-400">Tier-1 Commercial Vehicle OEM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 1 Content: Manufacturing ERP */}
              {currentBrowserTab === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <div className="text-xs font-mono text-cyan-400">MOD FORGE ERP · CONTINUOUS PUSHER FURNACE</div>
                      <h3 className="text-xl font-bold text-white mt-1">SCADA Heat Treatment Telemetry</h3>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 font-mono">
                      400 Kgs / Hour Nominal
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
                    <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-xs text-slate-500">Zone 1 Temperature</div>
                      <div className="text-xl font-bold text-emerald-400 mt-1 tabular-nums">865 °C</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Austenitizing</div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-xs text-slate-500">Zone 2 Isothermal</div>
                      <div className="text-xl font-bold text-cyan-400 mt-1 tabular-nums">845 °C</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Holding Phase</div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-xs text-slate-500">Quench Medium</div>
                      <div className="text-xl font-bold text-amber-400 mt-1">Polymer 12%</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Agitated Bath</div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-xs text-slate-500">Shift Batch ID</div>
                      <div className="text-xl font-bold text-white mt-1">BATCH-908</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">U-Bolts M24</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <div className="flex items-center gap-2 font-semibold text-white mb-2">
                      <Lock className="w-4 h-4 text-cyan-400" />
                      Protected SCADA Operational Boundary
                    </div>
                    <p className="text-slate-400">
                      The MOD FORGE browser isolates this operational SCADA interface from external web connections. Even if an operator opens an external email link, cross-site script execution (XSS) and session token theft are blocked by hardware container isolation.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2 Content: Supplier Steel Grades */}
              {currentBrowserTab === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <div className="text-xs font-mono text-cyan-400">VENDOR EXTRANET · STEEL PROCUREMENT</div>
                      <h3 className="text-xl font-bold text-white mt-1">Raw Material Heat & Chemical Certification</h3>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                      Restricted Extranet
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-lg border border-slate-800">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-4 font-medium">Steel Grade</th>
                          <th className="py-2.5 px-4 font-medium">Heat Number</th>
                          <th className="py-2.5 px-4 font-medium">Carbon (C%)</th>
                          <th className="py-2.5 px-4 font-medium">Manganese (Mn%)</th>
                          <th className="py-2.5 px-4 font-medium">Certification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-200">
                        <tr>
                          <td className="py-3 px-4 font-semibold text-white">EN19 / 40CrMo4</td>
                          <td className="py-3 px-4">HT-88421-A</td>
                          <td className="py-3 px-4 tabular-nums">0.38 - 0.45%</td>
                          <td className="py-3 px-4 tabular-nums">0.60 - 0.90%</td>
                          <td className="py-3 px-4 text-emerald-400">TS 16949 Passed</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-semibold text-white">SAE 1018 Bright Bar</td>
                          <td className="py-3 px-4">HT-90142-C</td>
                          <td className="py-3 px-4 tabular-nums">0.15 - 0.20%</td>
                          <td className="py-3 px-4 tabular-nums">0.30 - 0.60%</td>
                          <td className="py-3 px-4 text-emerald-400">TS 16949 Passed</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-semibold text-white">20MnCr5 Gear Blank</td>
                          <td className="py-3 px-4">HT-77190-B</td>
                          <td className="py-3 px-4 tabular-nums">0.17 - 0.22%</td>
                          <td className="py-3 px-4 tabular-nums">1.10 - 1.40%</td>
                          <td className="py-3 px-4 text-emerald-400">TS 16949 Passed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-3 rounded bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-300 flex items-center justify-between">
                    <span>Exporting mill price indices and chemical formulas to unapproved USB/cloud is locked.</span>
                    <span className="font-mono">Security Rule: DLP-VEND-19</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* IT Admin & Security Management Console View */
          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl p-6 space-y-6">
            {/* Top Management Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="text-xs font-mono text-cyan-400">MOD FORGE CENTRAL WORKSPACE MANAGER</div>
                <h3 className="text-xl font-bold text-white mt-1">Fleet Telemetry & Policy Control</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  148 Workstations Online
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-xs text-slate-400 font-mono">Ambattur Central Controller</span>
              </div>
            </div>

            {/* Admin Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  Monitored Workstations
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">148</div>
                <div className="text-[11px] text-slate-500 mt-1">Plant 1, Plant 2 & Tool Room</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Average Active Worktime
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-2 tabular-nums">94.8%</div>
                <div className="text-[11px] text-slate-500 mt-1">Shift 1 Productivity Index</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  DLP Events Prevented
                </div>
                <div className="text-2xl font-bold font-mono text-amber-400 mt-2 tabular-nums">19</div>
                <div className="text-[11px] text-slate-500 mt-1">Clipboard & Upload Exfiltrations</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                  Air-Gap Enforcement
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-2">Active</div>
                <div className="text-[11px] text-slate-500 mt-1">Zero Unauthorized Outbound Traffic</div>
              </div>
            </div>

            {/* Policy Switchboard (Interactive Toggles) */}
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/80">
                <div>
                  <h4 className="text-sm font-semibold text-white">Live Central Group Policy Rules</h4>
                  <div className="text-xs text-slate-400">
                    Toggles take effect immediately across all plant browsers and operator endpoints
                  </div>
                </div>
                <span className="text-xs text-cyan-400 font-mono">MDM Live Sync</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-start gap-3 p-3 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={policies.clipboardShield}
                    onChange={(e) => {
                      setPolicies({ ...policies, clipboardShield: e.target.checked });
                      addAuditEvent("POLICY_UPDATE", `Clipboard Shield set to ${e.target.checked ? "ENABLED" : "DISABLED"}`, "medium");
                    }}
                    className="mt-1 h-4 w-4 rounded accent-cyan-400"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">Clipboard Guard</div>
                    <div className="text-[11px] text-slate-400">Blocks copying CAD coordinates and pricing to external apps.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={policies.watermarking}
                    onChange={(e) => {
                      setPolicies({ ...policies, watermarking: e.target.checked });
                      addAuditEvent("POLICY_UPDATE", `Forensic Watermarking set to ${e.target.checked ? "ENABLED" : "DISABLED"}`, "low");
                    }}
                    className="mt-1 h-4 w-4 rounded accent-cyan-400"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">Forensic Watermarking</div>
                    <div className="text-[11px] text-slate-400">Overlays user email, IP address, and timestamp on all pages.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={policies.cloudStorageBlock}
                    onChange={(e) => {
                      setPolicies({ ...policies, cloudStorageBlock: e.target.checked });
                      addAuditEvent("POLICY_UPDATE", `Cloud Storage Blocker set to ${e.target.checked ? "ENABLED" : "DISABLED"}`, "medium");
                    }}
                    className="mt-1 h-4 w-4 rounded accent-cyan-400"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">Cloud Upload Blocker</div>
                    <div className="text-[11px] text-slate-400">Restricts uploads to Google Drive, Dropbox, WeTransfer, etc.</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Real-time Workstations & Live Audit Logs Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Active Workstations List */}
              <div className="lg:col-span-5 rounded-lg border border-slate-800 bg-slate-950 p-4">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                  <span className="text-xs font-semibold text-white">Active Workstation Nodes</span>
                  <span className="text-[11px] font-mono text-slate-400">Chennai Fleet</span>
                </div>
                <div className="space-y-2.5">
                  {workstations.map((ws) => (
                    <div
                      key={ws.id}
                      className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-semibold text-white">{ws.id}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            ws.status === "active"
                              ? "bg-emerald-950/80 text-emerald-300"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {ws.status.toUpperCase()} ({ws.activeTime})
                        </span>
                      </div>
                      <div className="text-slate-400 flex justify-between">
                        <span>{ws.user}</span>
                        <span className="font-mono text-slate-500">{ws.ip}</span>
                      </div>
                      <div className="text-slate-500 text-[11px] flex justify-between pt-0.5">
                        <span>{ws.department}</span>
                        <span className="text-cyan-400 font-mono truncate max-w-[150px]">{ws.activeDomain}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-Time Audit Log Feed */}
              <div className="lg:col-span-7 rounded-lg border border-slate-800 bg-slate-950 p-4">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">Security Audit Stream</span>
                    <span className="text-[10px] text-slate-400 font-mono">Live</span>
                  </div>

                  {/* Filter buttons */}
                  <div className="flex items-center gap-1 text-[11px]">
                    {["ALL", "DLP_BLOCK", "CLIPBOARD_SHIELD", "POLICY_UPDATE"].map((flt) => (
                      <button
                        key={flt}
                        type="button"
                        onClick={() => setAuditFilter(flt)}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          auditFilter === flt
                            ? "bg-cyan-500 text-slate-950 font-semibold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {flt === "ALL" ? "All" : flt.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 overflow-y-auto max-h-[300px] pr-1 font-mono text-xs">
                  {filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded bg-slate-900/60 border border-slate-800/80 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-slate-400 tabular-nums">{log.timestamp}</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span
                            className={`font-semibold ${
                              log.severity === "high"
                                ? "text-rose-400"
                                : log.severity === "medium"
                                ? "text-amber-400"
                                : "text-emerald-400"
                            }`}
                          >
                            [{log.eventType}]
                          </span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="text-slate-300">{log.user}</span>
                        </div>
                        <div className="text-slate-300 text-xs font-sans">{log.details}</div>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0">{log.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
