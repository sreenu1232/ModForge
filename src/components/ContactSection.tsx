import { useState } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send, FileCheck } from "lucide-react";
import { COMPANY_PROFILE } from "../data/brochureData";

export function ContactSection() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact-sales" className="py-20 bg-slate-950 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Office Details & Brochure Guarantees */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                Central Marketing & Engineering Office
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-wrap:balance]">
                Contact MOD FORGE PRIVATE LTD
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                Connect directly with our Chennai headquarters to discuss enterprise browser licensing, on-premises gateway hardware appliances, or technical proof of concept for your manufacturing facilities.
              </p>
            </div>

            {/* Direct Coordinates from Brochure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Registered Office
                </div>
                <div className="text-white font-sans text-xs font-medium leading-relaxed">
                  #103 Sidco Aiema Towers, No.1, 1st Main Road, Ambattur Industrial Estate, Chennai - 58
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-slate-500 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  Landlines & Direct Desk
                </div>
                <div className="text-white text-xs font-mono">
                  +91-44-26253236 / 4618
                </div>
                <div className="text-cyan-400 text-xs font-mono">
                  Email: chennai@mod-forge.com
                </div>
              </div>
            </div>

            {/* Why Mod Forge Service Guarantees (Page 10 of brochure) */}
            <div className="p-5 rounded-lg border border-slate-800 bg-slate-900/60 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                Brochure Service Level Guarantees (Why Mod Forge)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                  <span className="text-cyan-400 font-semibold block mb-0.5">Quick Response</span>
                  Any enquiry received is quoted within 1 week.
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                  <span className="text-emerald-400 font-semibold block mb-0.5">Captive Power</span>
                  Self captive power generation for uninterrupted production & uptime.
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                  <span className="text-indigo-400 font-semibold block mb-0.5">Timeliness</span>
                  In-house CAD/CAM system for tooling & prompt delivery.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Consultation Form */}
          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white">Direct Enterprise Inquiry</h3>
            <p className="text-xs text-slate-400">
              Submit your corporate details to receive the deployment specification sheet and pricing schedule.
            </p>

            {submitted ? (
              <div className="p-6 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <div className="font-bold text-sm text-white">Inquiry Forwarded to Chennai HQ</div>
                <p>
                  We have queued your inquiry for <strong>{company || "your enterprise"}</strong> ({email}). An assigned solutions engineer will reach out within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Bharat Dynamics / OEM Supplier"
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ciso@enterprise.com"
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors cursor-pointer text-center"
                  >
                    Request Technical Callback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
