import { useState } from "react";
import { X, Download, FileText, ExternalLink, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { COMPANY_PROFILE, BROCHURE_PAGES } from "../data/brochureData";
import { downloadBrochurePdf } from "../utils/downloadPdf";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const [activeView, setActiveView] = useState<"summary" | "embedded">("summary");
  const [downloadStatus, setDownloadStatus] = useState<{
    state: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ state: "idle", message: "" });

  if (!isOpen) return null;

  const handleDownload = async () => {
    setDownloadStatus({ state: "loading", message: "Fetching brochure binary (936 KB)..." });
    await downloadBrochurePdf((status, msg) => {
      setDownloadStatus({
        state: status,
        message: msg || (status === "success" ? "Downloaded 936 KB PDF successfully!" : "Error downloading file"),
      });
      if (status === "success") {
        setTimeout(() => setDownloadStatus({ state: "idle", message: "" }), 5000);
      }
    });
  };

  const handleOpenInNewTab = async () => {
    try {
      const res = await fetch("/assets/aistudio/MF-Brochure_-_mod_forge_profile_bfde509e.pdf");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch {
      window.open("/assets/aistudio/MF-Brochure_-_mod_forge_profile_bfde509e.pdf", "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-5xl rounded-xl border border-slate-800 bg-slate-900 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-brochure-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-black text-slate-950">
              MF
            </span>
            <div>
              <h3 id="modal-brochure-title" className="text-base font-bold text-white">
                MOD FORGE PRIVATE LTD · Corporate Profile Brochure
              </h3>
              <p className="text-xs text-slate-400">
                12-Page Manufacturing Specification & Facilities Catalog (936 KB PDF)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloadStatus.state === "loading"}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              title="Download 936 KB PDF directly to your device"
            >
              {downloadStatus.state === "loading" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{downloadStatus.state === "loading" ? "Saving..." : "Save PDF (936 KB)"}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenInNewTab}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors whitespace-nowrap cursor-pointer"
              title="Open full PDF in a clean browser window"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Open in Tab</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Download Status Toast Banner */}
        {downloadStatus.state !== "idle" && (
          <div
            className={`px-6 py-2 text-xs flex items-center justify-between border-b ${
              downloadStatus.state === "loading"
                ? "bg-cyan-950/60 border-cyan-800/60 text-cyan-200"
                : downloadStatus.state === "success"
                ? "bg-emerald-950/60 border-emerald-800/60 text-emerald-200"
                : "bg-rose-950/60 border-rose-800/60 text-rose-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {downloadStatus.state === "loading" && <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />}
              {downloadStatus.state === "success" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              {downloadStatus.state === "error" && <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
              <span>{downloadStatus.message}</span>
            </div>
            {downloadStatus.state !== "loading" && (
              <button
                type="button"
                onClick={() => setDownloadStatus({ state: "idle", message: "" })}
                className="text-[11px] underline opacity-80 hover:opacity-100 cursor-pointer"
              >
                Dismiss
              </button>
            )}
          </div>
        )}

        {/* View Toggle Bar */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveView("summary")}
              className={`px-3 py-1 rounded cursor-pointer ${
                activeView === "summary"
                  ? "bg-slate-800 text-cyan-400 font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Document Overview & Extracted Specs
            </button>
            <button
              type="button"
              onClick={() => setActiveView("embedded")}
              className={`px-3 py-1 rounded cursor-pointer ${
                activeView === "embedded"
                  ? "bg-slate-800 text-cyan-400 font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Raw PDF Frame
            </button>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-slate-500">
            TS 16949 & ISO 9001-2000 Certified Quality System
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeView === "embedded" ? (
            <div className="space-y-3">
              <div className="h-[560px] w-full rounded border border-slate-800 overflow-hidden bg-slate-950 relative">
                <object
                  data="/assets/aistudio/MF-Brochure_-_mod_forge_profile_bfde509e.pdf"
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <div className="p-8 text-center flex flex-col items-center justify-center h-full space-y-4 text-slate-300">
                    <FileText className="w-12 h-12 text-cyan-400 opacity-60" />
                    <div>
                      <h4 className="text-base font-semibold text-white">Browser Sandboxing Active</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-md">
                        Your browser or preview container blocks inline PDF rendering plugins. You can save the actual 936 KB PDF file or open it in a direct tab.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleDownload}
                        className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded cursor-pointer"
                      >
                        Download PDF to Disk (936 KB)
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenInNewTab}
                        className="px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 cursor-pointer"
                      >
                        Open in New Window
                      </button>
                    </div>
                  </div>
                </object>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Company Leadership & Vision Box */}
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-mono text-cyan-400">FOUNDED 1988 · CHENNAI, INDIA</span>
                  <h4 className="text-lg font-bold text-white mt-1">
                    Leadership & Corporate Vision
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    "{COMPANY_PROFILE.vision}"
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Started in a modest scale in 1988 under founder Mr. Om Prakash Modi (Chairman). Since then, MFPL has grown into a multi-plant, multi-product manufacturing concern under Managing Director Abhishek Modi.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block font-mono">Registered Office</span>
                    <span className="text-white font-medium">{COMPANY_PROFILE.address}</span>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 grid grid-cols-2 gap-2 font-mono">
                    <div>
                      <span className="text-slate-500 block">Phone</span>
                      <span className="text-slate-200">{COMPANY_PROFILE.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Email</span>
                      <span className="text-cyan-400">{COMPANY_PROFILE.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 12-Page Index Grid */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">
                  12-Page Document Structure (Complete Brochure Breakdown)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {BROCHURE_PAGES.map((p) => (
                    <div
                      key={p.page}
                      className="p-3 rounded-lg border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-cyan-400">Page {p.page < 10 ? `0${p.page}` : p.page}</span>
                        <span className="text-slate-500">{p.title}</span>
                      </div>
                      <div className="text-xs text-slate-300 leading-snug">{p.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantitative Metrics Box */}
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
                <h4 className="text-sm font-semibold text-white mb-3">
                  Audited Production Capacities
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="p-3 rounded bg-slate-900 border border-slate-800">
                    <div className="text-slate-500">Bright Steel Bars</div>
                    <div className="text-base font-bold text-white mt-1">6mm to 80mm</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Tolerance ±0.1mm</div>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800">
                    <div className="text-slate-500">Forging Press</div>
                    <div className="text-base font-bold text-white mt-1">2,500 Tons</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Parts up to 40 kgs</div>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800">
                    <div className="text-slate-500">CNC & VMC Centers</div>
                    <div className="text-base font-bold text-white mt-1">50+ Units</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Automats & SPM</div>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800">
                    <div className="text-slate-500">U-Bolt Output</div>
                    <div className="text-base font-bold text-white mt-1">1.2 Million / Yr</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">South India's Largest</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 px-6 py-3 bg-slate-950 text-xs text-slate-400">
          <div>Verified Document: MF-Brochure_-_mod_forge_profile_bfde509e.pdf (936 KB)</div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              Direct Download
            </button>
            <span className="text-slate-600">·</span>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
