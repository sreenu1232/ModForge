import { ShieldCheck, Eye, Lock, FileSpreadsheet, Download, ArrowUpRight } from "lucide-react";
import { COMPANY_PROFILE } from "../data/brochureData";

interface HeroProps {
  onOpenPilotModal: () => void;
  onOpenBrochureModal: () => void;
  onScrollToSandbox: () => void;
}

export function Hero({ onOpenPilotModal, onOpenBrochureModal, onScrollToSandbox }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background ambient grid */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(14, 165, 233, 0.25) 1px, transparent 1px)",
          backgroundSize: "36px 36px"
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Company Logo and Accreditation Header */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-700/60 shadow-md inline-flex items-center">
            <img
              src={COMPANY_PROFILE.logoPath}
              alt="MOD FORGE PRIVATE LIMITED"
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 font-mono">
            <span className="text-cyan-400 font-semibold">EST. 1988</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>TS 16949 & ISO 9001-2000 ACCREDITED</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>AMBATTUR, CHENNAI</span>
          </div>
        </div>

        {/* Hero Headline & Subtitle */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
            Hardened Enterprise Web Browsing with Integrated Activity Governance
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            Engineered by <strong className="text-white font-medium">MOD FORGE PRIVATE LTD</strong> for precision manufacturing and engineering enterprises. Prevent unauthorized exfiltration of proprietary CAD blueprints, ERP pricing, and customer specifications through zero-trust session isolation and real-time compliance tracking.
          </p>
        </div>

        {/* Primary and Secondary CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onScrollToSandbox}
            className="px-6 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            Launch Interactive Sandbox
          </button>
          <button
            type="button"
            onClick={onOpenPilotModal}
            className="px-6 py-3 text-sm font-medium text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            Request Enterprise Pilot
          </button>
          <button
            type="button"
            onClick={onOpenBrochureModal}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Read Company Brochure</span>
          </button>
        </div>

        {/* Quantified Industrial Metrics Bar (Proof-to-Claim Adjacency with Tabular Figures) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">35+ Years</div>
            <div className="mt-1 text-xs text-slate-400">Industrial Manufacturing Heritage</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono tabular-nums">0%</div>
            <div className="mt-1 text-xs text-slate-400">Blueprint & CAD Data Leakage</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">50+ CNC/VMC</div>
            <div className="mt-1 text-xs text-slate-400">Plant Workstation Integration</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono tabular-nums">&lt; 48 Hours</div>
            <div className="mt-1 text-xs text-slate-400">Enterprise Pilot Rollout SLA</div>
          </div>
        </div>

        {/* High-Fidelity Interactive Hero Browser Preview Card */}
        <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden">
          {/* Top Window Chrome */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs font-mono text-slate-400">forge-browser://plant-enclave.mod-forge.internal</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                Air-Gapped TLS 1.3
              </span>
              <span className="hidden sm:inline">DLP Level: TS-16949 Restrictive</span>
            </div>
          </div>

          {/* Interior Browser Viewport with Watermarked CAD and Telemetry Panels */}
          <div className="relative p-6 bg-slate-900 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Web Viewport */}
            <div className="lg:col-span-8 rounded-lg border border-slate-800 bg-slate-950 p-5 relative overflow-hidden">
              {/* Dynamic forensic watermark overlay */}
              <div 
                className="pointer-events-none absolute inset-0 select-none opacity-[0.04] text-[10px] font-mono leading-6 rotate-[-12deg] flex flex-wrap gap-8 text-cyan-300"
                aria-hidden="true"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <span key={i}>MFPL-CONFIDENTIAL-CHENNAI-IP-192.168.4.120-SESSION-9941</span>
                ))}
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <div className="text-xs font-mono text-cyan-400">MFPL PLM & DRAWING SYSTEM</div>
                  <div className="text-sm font-semibold text-white">AutoCAD Part Ref #MF-7491: Heavy Forged Shackle Pin</div>
                </div>
                <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Clipboard Guard Active
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <p>
                  <strong className="text-white">Material Standard:</strong> EN19 / 40CrMo4 hardened condition. Heat treatment via continuous pusher furnace with SCADA control (400kg/hr).
                </p>
                <div className="grid grid-cols-3 gap-3 p-3 rounded bg-slate-900 border border-slate-800/80 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Diameter</span>
                    <span className="text-white">Ø 48.00 ± 0.05 mm</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Hardness (HRC)</span>
                    <span className="text-white">58 - 62 Rockwell</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Surface Finish</span>
                    <span className="text-white">Dacromet 500B</span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-amber-950/30 border border-amber-800/40 text-amber-300 text-[11px] flex items-center justify-between">
                  <span>Policy Enforced: External copy/paste and screenshot tools are isolated on this workstation.</span>
                  <span className="font-mono text-amber-400">Node #CAD-04</span>
                </div>
              </div>
            </div>

            {/* Side Activity Telemetry Monitor */}
            <div className="lg:col-span-4 rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  Workstation Telemetry
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Shift Active</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Assigned Operator</span>
                  <span className="text-white font-mono">Senior Engineer (Shop-2)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Current Shift Duration</span>
                  <span className="text-white font-mono tabular-nums">4h 28m (Active 96%)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Authorized Domain</span>
                  <span className="text-cyan-400 font-mono">cad.mod-forge.internal</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>External Cloud Storage</span>
                  <span className="text-rose-400 font-mono">BLOCKED</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[11px] text-slate-400 mb-1.5 flex justify-between">
                  <span>Security Integrity Rating</span>
                  <span className="text-emerald-400 font-mono">100% Compliant</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-full rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
