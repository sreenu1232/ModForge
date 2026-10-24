import { COMPANY_PROFILE } from "../data/brochureData";

interface NavbarProps {
  onOpenPilotModal: () => void;
  onOpenBrochureModal: () => void;
}

export function Navbar({ onOpenPilotModal, onOpenBrochureModal }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Brand logo and title */}
        <a
          href="/"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 group transition-opacity hover:opacity-95"
        >
          <div className="bg-white px-2.5 py-1 rounded-md border border-slate-700/60 shadow-sm flex items-center h-8 sm:h-9">
            <img
              src={COMPANY_PROFILE.logoPath}
              alt="MOD FORGE PRIVATE LIMITED"
              className="h-5 sm:h-5.5 w-auto object-contain"
            />
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-cyan-400 border-l border-slate-800 pl-3">
            Enterprise Browser
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#browser-security"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Browser Security
          </a>
          <a
            href="#activity-tracking"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Activity Tracking
          </a>
          <a
            href="#interactive-sandbox"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Interactive Sandbox
          </a>
          <a
            href="#company-heritage"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Company Heritage
          </a>
          <button
            type="button"
            onClick={onOpenBrochureModal}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            Company Brochure
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenPilotModal}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Pilot
          </button>
        </div>
      </div>
    </header>
  );
}
