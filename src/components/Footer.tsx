import { COMPANY_PROFILE } from "../data/brochureData";
import { downloadBrochurePdf } from "../utils/downloadPdf";

interface FooterProps {
  onOpenBrochureModal: () => void;
  onOpenPilotModal: () => void;
}

export function Footer({ onOpenBrochureModal, onOpenPilotModal }: FooterProps) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-white px-2.5 py-1 rounded border border-slate-700/60 shadow-sm flex items-center h-8">
                <img
                  src={COMPANY_PROFILE.logoPath}
                  alt="MOD FORGE PRIVATE LIMITED"
                  className="h-5 w-auto object-contain"
                />
              </div>
              <span className="text-cyan-400 font-semibold text-xs uppercase tracking-wider">
                Enterprise Browser
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              Industrial-grade enterprise web browsing and activity governance platform. Protecting proprietary CAD designs, metallurgy data, and corporate networks since 1988.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Accredited with TS 16949 & ISO 9001-2000 Quality Management System
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-white font-semibold text-xs tracking-wider uppercase mb-2">
              Platform & Features
            </div>
            <div>
              <a href="#browser-security" className="hover:text-cyan-400 transition-colors">
                Session Sandboxing
              </a>
            </div>
            <div>
              <a href="#activity-tracking" className="hover:text-cyan-400 transition-colors">
                Activity Governance
              </a>
            </div>
            <div>
              <a href="#interactive-sandbox" className="hover:text-cyan-400 transition-colors">
                Interactive Simulator
              </a>
            </div>
            <div>
              <a href="#security-faq" className="hover:text-cyan-400 transition-colors">
                Security FAQ & Compliance
              </a>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenPilotModal}
                className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
              >
                Request Enterprise Pilot
              </button>
            </div>
          </div>

          {/* Corporate Profile & Brochure */}
          <div className="space-y-2">
            <div className="text-white font-semibold text-xs tracking-wider uppercase mb-2">
              Company Profile
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenBrochureModal}
                className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
              >
                Inspect Official Brochure (PDF)
              </button>
            </div>
            <div>
              <a href="#company-heritage" className="hover:text-cyan-400 transition-colors">
                Founder Heritage (1988)
              </a>
            </div>
            <div>
              <button
                type="button"
                onClick={() => downloadBrochurePdf()}
                className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
              >
                Download PDF Brochure (936 KB)
              </button>
            </div>
            <div>
              <a
                href="https://www.mod-forge.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
              >
                Official Website (mod-forge.com)
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} MOD FORGE PRIVATE LTD. All rights reserved. Sidco Aiema Towers, Ambattur, Chennai - 58.
          </div>
          <div className="flex items-center gap-4">
            <span>Landline: +91-44-26253236</span>
            <span aria-hidden="true">·</span>
            <span>chennai@mod-forge.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
