import { useState } from "react";
import { ScrollProgress } from "./components/ScrollProgress";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CapabilitiesBento } from "./components/CapabilitiesBento";
import { BrowserSimulator } from "./components/BrowserSimulator";
import { BrochureShowcase } from "./components/BrochureShowcase";
import { PolicyConfigurator } from "./components/PolicyConfigurator";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { PilotModal } from "./components/PilotModal";
import { BrochureModal } from "./components/BrochureModal";

export default function App() {
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [pilotPrefill, setPilotPrefill] = useState<{
    seats: number;
    profile: string;
    deployment: string;
  } | undefined>(undefined);

  const handleScrollToSandbox = () => {
    const el = document.getElementById("interactive-sandbox");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleConfigurePilot = (config: {
    seats: number;
    profile: string;
    deployment: string;
  }) => {
    setPilotPrefill(config);
    setIsPilotModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Scroll depth tracking indicator */}
      <ScrollProgress />

      {/* Top Bar Contract Compliant Navigation */}
      <Navbar
        onOpenPilotModal={() => {
          setPilotPrefill(undefined);
          setIsPilotModalOpen(true);
        }}
        onOpenBrochureModal={() => setIsBrochureModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenPilotModal={() => {
            setPilotPrefill(undefined);
            setIsPilotModalOpen(true);
          }}
          onOpenBrochureModal={() => setIsBrochureModalOpen(true)}
          onScrollToSandbox={handleScrollToSandbox}
        />

        {/* Core Architecture Bento Grid */}
        <CapabilitiesBento />

        {/* Live Interactive Browser Simulator & IT Admin Console */}
        <BrowserSimulator />

        {/* MOD FORGE PRIVATE LTD 35-Year Heritage & Brochure Showcase */}
        <BrochureShowcase
          onOpenBrochureModal={() => setIsBrochureModalOpen(true)}
          onOpenPilotModal={() => {
            setPilotPrefill(undefined);
            setIsPilotModalOpen(true);
          }}
        />

        {/* Fleet Deployment & Policy Configurator */}
        <PolicyConfigurator onConfigurePilot={handleConfigurePilot} />

        {/* Enterprise Security FAQ Section */}
        <FAQSection />

        {/* Contact Coordinates & Lead Inquiry Section */}
        <ContactSection />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenBrochureModal={() => setIsBrochureModalOpen(true)}
        onOpenPilotModal={() => {
          setPilotPrefill(undefined);
          setIsPilotModalOpen(true);
        }}
      />

      {/* Interactive Modals */}
      <PilotModal
        isOpen={isPilotModalOpen}
        onClose={() => setIsPilotModalOpen(false)}
        prefillConfig={pilotPrefill}
      />

      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
      />
    </div>
  );
}
