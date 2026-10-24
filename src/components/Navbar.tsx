interface NavbarProps {
  onOpenPilotModal: () => void;
  onOpenBrochureModal: () => void;
}

export function Navbar({ onOpenPilotModal, onOpenBrochureModal }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-black text-slate-950">
            MF
          </span>
          <span>MOD FORGE</span>
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
