import { ShieldCheck, Activity, Cpu, FileLock2, Layers, Network } from "lucide-react";

export function CapabilitiesBento() {
  return (
    <section id="browser-security" className="py-20 bg-slate-900/60 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            Core Enterprise Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Engineered to Protect Industrial IP & Provide Accountable Workplace Telemetry
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Standard commercial browsers are designed for consumers, continuously leaking cookies, telemetry, and unencrypted clipboard data. MOD FORGE Company Browser creates an isolated, auditable workspace envelope around every work tab.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bento Item 1: Span 2 Columns - Zero-Trust Tab Isolation */}
          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="font-mono text-cyan-400">01. Session Sandboxing</span>
                <span>Hardware Memory Isolation</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Containerized Tab Sandboxing with Zero Cross-Site Contamination
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Every tab runs in an ephemeral, memory-segmented sandbox. Even if an employee accesses an untrusted external technical forum or third-party documentation link, drive-by malware and zero-day browser exploits cannot touch internal plant networks or steal authentication tokens.
              </p>
            </div>

            {/* Visual Architecture Mini-Diagram */}
            <div className="rounded-lg bg-slate-900 border border-slate-800/80 p-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <div className="text-cyan-400 font-semibold">CAD & PLM Enclave</div>
                  <div className="text-[11px] text-slate-400 mt-1">Read/Write Local Storage: BLOCKED</div>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <div className="text-emerald-400 font-semibold">SCADA / ERP Portal</div>
                  <div className="text-[11px] text-slate-400 mt-1">Intranet Direct Pipe</div>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <div className="text-amber-400 font-semibold">Public Internet</div>
                  <div className="text-[11px] text-slate-400 mt-1">Disposable Air-Gap Micro-VM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Span 1 Column - Industrial CAD & Drawing DLP */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="font-mono text-cyan-400">02. Engineering DLP</span>
                <span>AutoCAD & STEP Protection</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Manufacturing CAD & Drawing Shield
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Deep packet inspection specifically tuned for 2D/3D engineering assets, tool designs, and metallurgical formulas. Blocks copying coordinates, printing without watermarking, or uploading confidential DXF and STEP files.
              </p>
            </div>
            <div className="p-3 rounded bg-slate-900 border border-slate-800/80 text-xs text-slate-400 space-y-1">
              <div className="text-white font-medium">Supported Industrial Formats:</div>
              <div>DWG, DXF, STEP, IGES, SolidWorks, CATIA & SCADA telemetry configs.</div>
            </div>
          </div>

          {/* Bento Item 3: Span 1 Column - Activity Telemetry */}
          <div id="activity-tracking" className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="font-mono text-cyan-400">03. Activity Governance</span>
                <span>Privacy-First Auditing</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Transparent Shift Telemetry & Time Tracking
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Tracks active vs idle application dwell time without invasive keystroke recording or personal password snooping. Generates clear, auditable shift reports conforming to factory labor standards and ISO compliance.
              </p>
            </div>
            <div className="p-3 rounded bg-slate-900 border border-slate-800/80 text-xs text-slate-400">
              <span className="text-emerald-400 font-medium">Zero Keystroke Logging:</span> Focuses strictly on productive domain categories and audit-safe operational timestamps.
            </div>
          </div>

          {/* Bento Item 4: Span 2 Columns - On-Premises & Air-Gap Deployment */}
          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="font-mono text-cyan-400">04. Industrial Deployment</span>
                <span>SCADA & Defense Ready</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                On-Premises Gateway for Fully Air-Gapped Plants
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Can be deployed completely within on-premises industrial server racks, local edge appliances, or private corporate clouds. No mandatory external cloud telemetry or phone-home pings required, ensuring full compliance for defense suppliers and Tier-1 automotive manufacturers.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <div className="text-slate-500 text-[10px]">Active Directory</div>
                <div className="text-white font-semibold">Kerberos & SSO</div>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <div className="text-slate-500 text-[10px]">MDM Rollout</div>
                <div className="text-white font-semibold">MSI, PKG, DEB</div>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <div className="text-slate-500 text-[10px]">Log Export</div>
                <div className="text-white font-semibold">Syslog & SIEM</div>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <div className="text-slate-500 text-[10px]">Compliance</div>
                <div className="text-white font-semibold">TS 16949 / ISO 27001</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
