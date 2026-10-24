import { useState } from "react";
import { X, CheckCircle2, ShieldCheck, Mail, Building, Phone, Send, Clock } from "lucide-react";
import { COMPANY_PROFILE } from "../data/brochureData";

interface PilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillConfig?: {
    seats: number;
    profile: string;
    deployment: string;
  };
}

export function PilotModal({ isOpen, onClose, prefillConfig }: PilotModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    seats: prefillConfig ? prefillConfig.seats : 150,
    profile: prefillConfig ? prefillConfig.profile : "Engineering & CAD Vault",
    notes: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [pilotCode, setPilotCode] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.company.trim()) errs.company = "Company name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Valid corporate email is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const generatedCode = `MF-PILOT-${Math.floor(1000 + Math.random() * 9000)}`;
    setPilotCode(generatedCode);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-xl rounded-xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pilot-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="bg-white px-2 py-1 rounded border border-slate-700/60 shadow-sm flex items-center h-8">
              <img
                src={COMPANY_PROFILE.logoPath}
                alt="MOD FORGE PRIVATE LIMITED"
                className="h-5 w-auto object-contain"
              />
            </div>
            <div>
              <h3 id="pilot-modal-title" className="text-base font-bold text-white">
                Request 30-Day Enterprise Pilot
              </h3>
              <p className="text-xs text-slate-400">
                MOD FORGE PRIVATE LTD · Engineering Security Division
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">Pilot Application Received</h4>
              <p className="text-xs font-mono text-cyan-400 mt-1">
                Pilot Ticket Reference: {pilotCode}
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              Thank you, <strong className="text-white">{formData.name}</strong> from{" "}
              <strong className="text-white">{formData.company}</strong>. Our Chennai technical engineering team will review your fleet profile ({formData.seats} seats · {formData.profile}) and contact you with MSI deployment packages within 24 hours.
            </p>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-left text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Service SLA:</span>
                <span className="text-white font-medium">Any Enquiry Quoted within 1 Week (Brochure Guarantee)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Facility:</span>
                <span className="text-white font-medium">Ambattur Industrial Estate, Chennai - 58</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Support Desk:</span>
                <span className="text-cyan-400 font-mono">+91-44-26253236 / chennai@mod-forge.com</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors cursor-pointer"
            >
              Close Confirmation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sreenivasan Raman"
                  className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
                />
                {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Corporate Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
                />
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Company / Organization <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Precision Auto Components Ltd"
                  className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
                />
                {errors.company && <p className="text-[11px] text-rose-400 mt-1">{errors.company}</p>}
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 / International"
                  className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Estimated Workstation Seats
                </label>
                <select
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value={50}>50 Workstations (Single Department / Plant)</option>
                  <option value={150}>150 Workstations (Mid-Scale Facility)</option>
                  <option value={500}>500 Workstations (Multi-Plant Division)</option>
                  <option value={2000}>2,000+ Workstations (Full Enterprise)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Security Profile
                </label>
                <select
                  value={formData.profile}
                  onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="Engineering & CAD Vault">Engineering & CAD Vault (DLP + Watermark)</option>
                  <option value="Standard Compliance">Standard Compliance (Activity Telemetry + Sandboxing)</option>
                  <option value="Air-Gapped Intranet">Air-Gapped Intranet (Plant SCADA / Zero Outbound)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Specific Plant or Compliance Requirements
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention any custom ERP/PLM systems, SCADA requirements, or ISO/TS 16949 audit schedules..."
                className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Response SLA: Within 24-48 hours</span>
              </div>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors cursor-pointer whitespace-nowrap"
              >
                Submit Pilot Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
