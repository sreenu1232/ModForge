import { useState } from "react";
import { Sliders, Shield, Terminal, ArrowRight, Check, HardDrive, Cpu, Laptop } from "lucide-react";

interface PolicyConfiguratorProps {
  onConfigurePilot: (configSummary: {
    seats: number;
    profile: string;
    deployment: string;
  }) => void;
}

export function PolicyConfigurator({ onConfigurePilot }: PolicyConfiguratorProps) {
  const [seats, setSeats] = useState<number>(150);
  const [profile, setProfile] = useState<"standard" | "engineering" | "airgap">("engineering");
  const [platform, setPlatform] = useState<"windows" | "mac" | "linux" | "hybrid">("windows");

  // Calculated estimates
  const bandwidthSaved = Math.round(seats * 1.8); // GB/month saved via local policy edge caching
  const dlpCoverage = profile === "airgap" ? "100% Strict Air-Gapped" : profile === "engineering" ? "Full CAD + Clipboard DLP" : "Standard Web DLP";
  const auditHoursSaved = Math.round(seats * 0.4);

  const handleApplyConfig = () => {
    onConfigurePilot({
      seats,
      profile: profile === "airgap" ? "Air-Gapped Intranet" : profile === "engineering" ? "Engineering & CAD Vault" : "Standard Compliance",
      deployment: platform.toUpperCase(),
    });
  };

  return (
    <section className="py-20 bg-slate-900/60 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            Interactive Deployment Estimator
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Configure Your Plant & Office Fleet Policy
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Estimate resource efficiency, security isolation level, and MDM packaging parameters for your enterprise rollout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6">
            {/* Seat Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-white">Workstation Seat Count</label>
                <span className="text-base font-bold font-mono text-cyan-400 tabular-nums">
                  {seats.toLocaleString()} Endpoints
                </span>
              </div>
              <input
                type="range"
                min="25"
                max="2500"
                step="25"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>25 (Single Plant)</span>
                <span>500 (Regional)</span>
                <span>2,500+ (Multi-Plant Enterprise)</span>
              </div>
            </div>

            {/* Security Profile Selection */}
            <div>
              <label className="text-sm font-semibold text-white block mb-2">
                Security & Isolation Profile
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setProfile("standard")}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    profile === "standard"
                      ? "border-cyan-500 bg-cyan-950/20 text-white"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold">Standard Office</div>
                  <div className="text-[11px] text-slate-400 mt-1">URL filter, session sandboxing, activity tracking.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setProfile("engineering")}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    profile === "engineering"
                      ? "border-cyan-500 bg-cyan-950/20 text-white"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold">Engineering & CAD</div>
                  <div className="text-[11px] text-slate-400 mt-1">Clipboard guard, watermarking, STEP/DWG protection.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setProfile("airgap")}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    profile === "airgap"
                      ? "border-cyan-500 bg-cyan-950/20 text-white"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold">Strict Air-Gap</div>
                  <div className="text-[11px] text-slate-400 mt-1">No external web, USB locked, SCADA plant intranet.</div>
                </button>
              </div>
            </div>

            {/* Operating Environment */}
            <div>
              <label className="text-sm font-semibold text-white block mb-2">
                Fleet Operating System
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {[
                  { id: "windows", label: "Windows MSI" },
                  { id: "mac", label: "macOS PKG" },
                  { id: "linux", label: "Ubuntu DEB" },
                  { id: "hybrid", label: "Hybrid / VDI" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPlatform(item.id as any)}
                    className={`py-2 px-3 rounded border text-center cursor-pointer transition-colors ${
                      platform === item.id
                        ? "border-cyan-400 bg-cyan-400 text-slate-950 font-bold"
                        : "border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Automated MDM Silent Install Command Preview */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  Active Directory / Intune Deployment String
                </span>
                <span>Silent Rollout</span>
              </div>
              <div className="rounded bg-slate-900 p-3 font-mono text-xs text-cyan-300 border border-slate-800 overflow-x-auto select-all">
                msiexec /i ModForge-Browser-x64.msi /qn POLICY_PROFILE="{profile.toUpperCase()}" GATEWAY="192.168.1.10" SEATS={seats}
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-cyan-400">ESTIMATED OPERATIONAL BENEFIT</span>
              <h3 className="text-xl font-bold text-white mt-1">Fleet Impact Summary</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400">Security Enforcement Tier</span>
                <span className="text-xs font-mono font-semibold text-emerald-400">{dlpCoverage}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400">Monthly Edge Caching Saving</span>
                <span className="text-xs font-mono font-semibold text-white tabular-nums">
                  ~{bandwidthSaved.toLocaleString()} GB / month
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400">Audit Compliance Time Saved</span>
                <span className="text-xs font-mono font-semibold text-cyan-400 tabular-nums">
                  ~{auditHoursSaved} hours / audit cycle
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400">Rollout SLA Guarantee</span>
                <span className="text-xs font-mono font-semibold text-white">48 Hours Ready</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleApplyConfig}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors cursor-pointer"
              >
                <span>Request Pilot for {seats} Seats</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="mt-2 text-center text-[11px] text-slate-500">
                Includes full 30-day proof of concept with Chennai HQ support engineers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
