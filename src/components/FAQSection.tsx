import { useState } from "react";
import { ChevronDown, ShieldCheck, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  category: "dlp" | "privacy" | "deployment" | "heritage";
  question: string;
  answer: string;
}

export function FAQSection() {
  const [openIds, setOpenIds] = useState<string[]>(["faq-1", "faq-2"]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      category: "dlp",
      question: "How does MOD FORGE Company Browser prevent CAD blueprints and proprietary engineering specs from leaking?",
      answer:
        "The browser enforces real-time Data Loss Prevention (DLP) directly at the rendering engine level. Proprietary formats (AutoCAD DWG, DXF, STEP, IGES, and SolidWorks models) are rendered in isolated WebGL enclaves where outbound copy/paste, screen scraping, and unapproved cloud storage uploads are blocked. Any clipboard action is sanitized, and screen renders can be dynamically watermarked with the operator's employee ID and cryptographic timestamp.",
    },
    {
      id: "faq-2",
      category: "privacy",
      question: "Does the activity tracking invade employee privacy or record keystrokes?",
      answer:
        "No. MOD FORGE enforces a strict privacy-first architecture with zero keystroke logging, no screen recording, and no personal credential snooping. Activity tracking records high-level operational metrics: active dwell time on authorized domain categories (ERP, PLM, CAD Viewer vs. untrusted web), shift presence timestamps, and security DLP boundary violations. It satisfies both management auditing needs and worker privacy regulations including GDPR and the Indian DPDP Act 2023.",
    },
    {
      id: "faq-3",
      category: "deployment",
      question: "Can the browser run in completely air-gapped manufacturing plants and SCADA networks?",
      answer:
        "Yes. Unlike standard commercial browsers that require continuous outbound connections to vendor cloud servers for telemetry and sync, MOD FORGE provides an on-premises Edge Gateway appliance. All policy updates, telemetry logs, and certificate distribution run inside your local plant network, perfectly matching the zero-trust requirements of defense contractors and automotive OEM facilities.",
    },
    {
      id: "faq-4",
      category: "heritage",
      question: "Why did MOD FORGE PRIVATE LTD—an industrial manufacturing company—develop an enterprise browser?",
      answer:
        "Founded in 1988, MOD FORGE PRIVATE LTD operates high-precision manufacturing plants in Chennai supplying bright steel bars, 2500T forgings, and machined components to global Tier-1 OEMs. In managing multi-million-dollar proprietary customer drawings, metallurgy recipes, and CNC tooling programs, MFPL faced severe cyber risks from unhardened commercial browsers. Our in-house engineering team architected ForgeBrowser to defend our own facilities—and later productized it for engineering and industrial enterprises facing identical challenges.",
    },
    {
      id: "faq-5",
      category: "deployment",
      question: "How is the browser deployed and managed across thousands of employee workstations?",
      answer:
        "MOD FORGE Company Browser ships as standardized silent installers for Windows (MSI), macOS (PKG), and Linux (DEB). It integrates seamlessly with Microsoft Intune, Active Directory Group Policy (GPO), and enterprise MDM systems. Security administrators can push policy changes (such as USB download locks or AI prompt guards) across thousands of nodes in seconds via the Central Workspace Manager.",
    },
    {
      id: "faq-6",
      category: "dlp",
      question: "Does it block employees from pasting confidential blueprints into public AI tools?",
      answer:
        "Yes. Our built-in AI Prompt DLP inspects text and attachments routed to public generative AI tools (such as ChatGPT, Claude, and public search engines). It detects and sanitizes engineering tolerances, chemical compositions, customer part numbers, and pricing quotes before outbound packets leave the workstation boundary.",
    },
    {
      id: "faq-7",
      category: "deployment",
      question: "What compliance standards and certifications does the platform support?",
      answer:
        "The browser and gateway architecture align directly with TS 16949 automotive supplier quality requirements, ISO 27001 Information Security Management, SOC 2 Type II audit logging guidelines, and NIST 800-171 CMMC supply chain standards.",
    },
  ];

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter((faq) => {
    if (activeCategory === "all") return true;
    return faq.category === activeCategory;
  });

  return (
    <section id="security-faq" className="py-20 bg-slate-950 border-b border-slate-800/80">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            Enterprise Security & Compliance
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Essential answers on zero-trust tab isolation, CAD data loss prevention (DLP), employee privacy boundaries, and air-gapped on-premises rollout.
          </p>

          {/* Interactive Category Filter (Functional segmented buttons) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg max-w-xl mx-auto">
            {[
              { id: "all", label: "All Questions" },
              { id: "dlp", label: "CAD & DLP Security" },
              { id: "privacy", label: "Privacy & Telemetry" },
              { id: "deployment", label: "Air-Gap & Rollout" },
              { id: "heritage", label: "MOD FORGE Heritage" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-cyan-500 text-slate-950 font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="rounded-lg border border-slate-800 bg-slate-900/80 transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-cyan-400 mt-0.5">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}.
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-cyan-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50 pl-11">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Have an air-gap architecture or custom SCADA requirement? Reach our Chennai engineering office directly at{" "}
          <a
            href="mailto:chennai@mod-forge.com"
            className="text-cyan-400 hover:underline font-mono"
          >
            chennai@mod-forge.com
          </a>
          .
        </div>
      </div>
    </section>
  );
}
