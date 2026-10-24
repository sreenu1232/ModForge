import { useState } from "react";
import { Download, FileText, CheckCircle, ExternalLink, Award, Factory, Shield, ArrowRight } from "lucide-react";
import { COMPANY_PROFILE, INDUSTRIAL_CAPABILITIES } from "../data/brochureData";
import { downloadBrochurePdf } from "../utils/downloadPdf";

interface BrochureShowcaseProps {
  onOpenBrochureModal: () => void;
  onOpenPilotModal: () => void;
}

export function BrochureShowcase({ onOpenBrochureModal, onOpenPilotModal }: BrochureShowcaseProps) {
  const [activeTab, setActiveTab] = useState<string>("bright-bars");

  const currentCap = INDUSTRIAL_CAPABILITIES.find((c) => c.id === activeTab) || INDUSTRIAL_CAPABILITIES[0];

  return (
    <section id="company-heritage" className="py-20 bg-slate-950 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              Authentic Industrial Pedigree
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Built on the 35-Year Heritage of MOD FORGE PRIVATE LTD
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Founded in 1988 under the leadership of Mr. Om Prakash Modi (Chairman) and Abhishek Modi (Managing Director). Certified with TS 16949 and ISO 9001-2000 quality systems, operating multi-plant manufacturing centers in Ambattur Industrial Estate, Chennai.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            <button
              type="button"
              onClick={onOpenBrochureModal}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Inspect Full Company Brochure</span>
            </button>
            <button
              type="button"
              onClick={() => downloadBrochurePdf()}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors cursor-pointer whitespace-nowrap shadow-sm"
              title="Save actual 936 KB PDF directly to your device"
            >
              <Download className="w-4 h-4" />
              <span>Save Brochure (936 KB PDF)</span>
            </button>
          </div>
        </div>

        {/* Industrial Foundation Story Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-6 lg:p-8 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white px-2.5 py-1 rounded border border-slate-700/60 shadow-sm inline-flex items-center">
                <img
                  src={COMPANY_PROFILE.logoPath}
                  alt="MOD FORGE PRIVATE LIMITED"
                  className="h-5 sm:h-5.5 w-auto object-contain"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="text-cyan-400 font-semibold">1988 - 2026</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>CHENNAI MANUFACTURING HUB</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Why an Industrial Giant Built an Enterprise Hardened Browser
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              As a major OEM Tier-1 supplier manufacturing Bright Steel Bars, 2500T Forgings, CNC Machined Components, and 1.2 Million U-Bolts annually, MOD FORGE continuously manages proprietary CAD tooling drawings, metallurgical chemical recipes, and sensitive OEM contracts.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed">
              When commercial browsers proved vulnerable to supply chain phishing, unauthorized drawing downloads, and unmonitored employee session risks, MOD FORGE engineered its own enterprise browser architecture—now made available to fellow manufacturing, defense, and high-precision enterprises worldwide.
            </p>

            {/* Leadership & Credentials */}
            <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded bg-slate-950 border border-slate-800/80">
                <div className="text-slate-400">Founder & Chairman</div>
                <div className="text-white font-semibold text-sm mt-0.5">Mr. Om Prakash Modi</div>
                <div className="text-slate-500 mt-1">Visionary leader since 1988 establishment.</div>
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800/80">
                <div className="text-slate-400">Managing Director</div>
                <div className="text-white font-semibold text-sm mt-0.5">Mr. Abhishek Modi</div>
                <div className="text-slate-500 mt-1">Directing modern infrastructure & digital evolution.</div>
              </div>
            </div>
          </div>

          {/* Quick Manufacturing Highlights Box */}
          <div className="lg:col-span-5 rounded-lg border border-slate-800 bg-slate-950 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                Accredited Quality Standards
              </span>
              <span className="text-xs text-emerald-400 font-mono">Verified</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">TS 16949 Certified:</strong> Stringent automotive supplier quality standard covering defect prevention and process consistency.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">ISO 9001-2000 QMS:</strong> Streamlined procedures to prevent defects, with dedicated customer-perspective Q-Gate inspection.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Continuous SCADA Furnaces:</strong> 400kg/hr pusher furnace with polymer, oil, and water quenching controls.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Spectrometer & UV MPI Lab:</strong> In-house chemical, tensile (UTM), and crack detection metallurgical apparatus.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenPilotModal}
                className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors cursor-pointer text-center"
              >
                Schedule Architecture Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Capability Explorer (Directly from Brochure pages 3-9) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Manufacturing Capabilities from the Official Profile</h3>
              <p className="text-xs text-slate-400 mt-0.5">Explore each division detailed in the company brochure</p>
            </div>
            <span className="hidden sm:inline text-xs font-mono text-slate-500">6 Core Divisions</span>
          </div>

          {/* Tab Selector (Segmented control) */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-6">
            {INDUSTRIAL_CAPABILITIES.map((cap) => (
              <button
                key={cap.id}
                type="button"
                onClick={() => setActiveTab(cap.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === cap.id
                    ? "bg-cyan-500 text-slate-950 font-semibold shadow-sm"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cap.title}
              </button>
            ))}
          </div>

          {/* Active Capability Spec Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono text-cyan-400">{currentCap.subtitle}</span>
                <h4 className="text-xl font-bold text-white mt-1">{currentCap.title}</h4>
              </div>
              <div className="text-xs font-mono px-3 py-1.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 self-start md:self-auto">
                {currentCap.highlight}
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {currentCap.details}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentCap.specs.map((spec, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs">
                  <div className="text-cyan-400 font-mono font-semibold mb-1">Specification 0{i + 1}</div>
                  <div className="text-slate-200">{spec}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
