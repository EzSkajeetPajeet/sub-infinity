'use client';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* BACKGROUND GRID MATRIX */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 border-b border-slate-900 bg-[#070a12]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/logo-icon-new-big.png" alt="Sub-Infinity Icon" className="h-15 w-auto" />
            <img src="/logo-text.png" alt="Sub-Infinity Text" className="h-6 w-auto hidden md:block" />
          </div>
          
          <div className="hidden md:flex space-x-8 text-xs tracking-widest uppercase text-slate-400">
            <a href="#problem" className="hover:text-amber-400 transition-colors">Problem</a>
            <a href="#solution" className="hover:text-amber-400 transition-colors">Workspace</a>
            <a href="#architecture" className="hover:text-amber-400 transition-colors">Disciplines</a>
            <a href="#vision" className="hover:text-amber-400 transition-colors">Vision</a>
          </div>

          <div className="hidden md:block">
            <a href="#cta" className="border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/20 text-amber-400 px-5 py-2 rounded text-xs font-semibold tracking-widest uppercase transition-all">
              Join Early Access
            </a>
          </div>

          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-900 bg-[#070a12] px-6 py-6 space-y-4 tracking-widest uppercase text-xs">
            <a href="#problem" onClick={() => setMobileMenuOpen(false)} className="block text-slate-400 hover:text-white">Problem</a>
            <a href="#solution" onClick={() => setMobileMenuOpen(false)} className="block text-slate-400 hover:text-white">Workspace</a>
            <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="block text-slate-400 hover:text-white">Disciplines</a>
            <a href="#vision" onClick={() => setMobileMenuOpen(false)} className="block text-slate-400 hover:text-white">Vision</a>
            <a href="#cta" onClick={() => setMobileMenuOpen(false)} className="block text-center border border-amber-500/30 text-amber-400 py-2 rounded">Join Early Access</a>
          </div>
        )}
      </nav>

      {/* [1] HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] tracking-[0.3em] uppercase border border-amber-500/20 rounded-full bg-amber-500/5 text-amber-400">
            <span>SCIENTIFIC INFRASTRUCTURE</span>
          </div>
          <div className="flex flex-col items-center mb-10">
            {/* The Big Infinity Icon */}
            <img src="/logo-icon-new-big.png" alt="Sub-Infinity" className="w-32 md:w-48 h-auto mb-6 opacity-90" />
  
            {/* The Pi Typography Wordmark */}
            <img src="/logo-text.png" alt="Sub-Infinity Title" className="w-64 md:w-[450px] h-auto" />
          </div>
          <p className="text-lg md:text-xl font-medium tracking-wide text-slate-200 mb-6 max-w-3xl mx-auto">
            Physics infrastructure for the next generation of discovery.
          </p>
          <p className="text-sm md:text-base text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            A research workspace for physicists to organize complex datasets, visualize signals and systems, track experiments, manage analysis workflows, and move from raw data to real insight.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#cta" className="bg-amber-400 text-slate-950 px-8 py-3.5 rounded text-sm font-bold tracking-wider uppercase hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/10">
              Join Early Access
            </a>
            <a href="#vision" className="border border-slate-800 text-slate-300 px-8 py-3.5 rounded text-sm font-medium tracking-wider uppercase hover:bg-slate-900 transition-colors">
              View the Vision
            </a>
          </div>
        </div>
      </section>

      {/* [2] THE PROBLEM */}
      <section id="problem" className="py-24 px-6 border-t border-slate-900 bg-slate-950/20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] tracking-[0.3em] text-amber-400 uppercase block mb-3">// The Current State</span>
            <h2 className="text-2xl md:text-4xl font-light tracking-wide text-white mb-6">
              Physics research is powerful, but the workflow is fragmented.
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Modern physics depends on complex data, simulations, instruments, notebooks, scripts, and collaboration. But many researchers still work across scattered folders, disconnected tools, outdated visualization systems, and messy project structures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Data is scattered across files, folders, scripts, notebooks, and lab systems.",
              "Visualization tools are often outdated, field-specific, or difficult to customize.",
              "Collaboration becomes messy when projects involve many datasets, methods, and people.",
              "Researchers spend too much time managing workflows instead of focusing on discovery."
            ].map((problem, idx) => (
              <div key={idx} className="p-6 rounded border border-slate-900 bg-slate-950/40 hover:border-slate-800 transition-colors relative">
                <div className="text-amber-400/40 text-xs font-mono mb-4">0{idx + 1}.</div>
                <p className="text-slate-300 text-sm leading-relaxed">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [3] THE SOLUTION */}
      <section id="solution" className="py-24 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] tracking-[0.3em] text-amber-400 uppercase block mb-3">// The Environment</span>
            <h2 className="text-2xl md:text-4xl font-light tracking-wide text-white mb-6">
              One workspace for physics research.
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Sub-Infinity helps physicists manage, visualize, analyze, and organize scientific work inside one clean research environment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Dataset organization", "Scientific visualization", "Analysis workflows", "Metadata extraction",
              "Research logs", "Collaboration tools", "Exportable notes and summaries", "Future AI-assisted workflow support"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded border border-slate-900 bg-slate-900/10">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-slate-200 text-sm tracking-wide font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [4] WHO IT IS FOR (DIAGRAM SECTION) */}
      <section id="architecture" className="py-24 px-6 border-t border-slate-900 bg-slate-950/20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] tracking-[0.3em] text-amber-400 uppercase block mb-3">// Disciplinary Scope</span>
            <h2 className="text-2xl md:text-4xl font-light tracking-wide text-white mb-6">Built for physics research.</h2>
            <p className="text-slate-400 text-sm">
              Sub-Infinity is designed for physicists working across theory, experiment, simulation, and data-intensive science.
            </p>
          </div>

          {/* SYSTEM ARCHITECTURE INTERACTIVE DIAGRAM */}
          <div className="border border-slate-900 bg-[#0a0f1d] p-8 rounded font-mono text-xs text-slate-400 mb-12 overflow-x-auto">
            <div className="min-w-[600px] text-center">
              <div className="inline-block border border-amber-500/40 bg-amber-500/5 text-amber-400 px-6 py-2 rounded text-sm font-semibold tracking-widest">
                SUB-INFINITY CORE
              </div>
              
              <div className="my-4 text-slate-600">│</div>
              <div className="text-slate-600">┌───────────────────────────────┼───────────────────────────────┐</div>
              <div className="text-slate-600">│                               │                               │</div>
              
              <div className="grid grid-cols-3 text-center">
                <div>
                  <span className="text-white font-bold block mb-1">Experimental Physics</span>
                  <span className="text-slate-500 block text-[11px]">Instruments</span>
                  <span className="text-slate-500 block text-[11px]">Detectors</span>
                  <span className="text-slate-500 block text-[11px]">Signals</span>
                </div>
                <div>
                  <span className="text-white font-bold block mb-1">Computational Physics</span>
                  <span className="text-slate-500 block text-[11px]">Simulations</span>
                  <span className="text-slate-500 block text-[11px]">Data Pipelines</span>
                  <span className="text-slate-500 block text-[11px]">Visualization</span>
                </div>
                <div>
                  <span className="text-white font-bold block mb-1">Theoretical Physics</span>
                  <span className="text-slate-500 block text-[11px]">Models + Equations</span>
                  <span className="text-slate-500 block text-[11px]">Literature + Notes</span>
                  <span className="text-slate-500 block text-[11px]">Derivations</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l border-amber-500/30 pl-6 max-w-3xl">
            <p className="text-xs tracking-widest text-slate-500 uppercase mb-3">Cross-Disciplinary Application</p>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Applicable across astrophysics, particle physics, plasma physics, condensed matter, quantum physics, nuclear physics, biophysics, materials science, cosmology, optics, and other data-driven areas of physics.
            </p>
            <p className="text-slate-300 text-sm font-medium leading-relaxed italic">
              "The platform is not limited to one subfield. It is built around how physicists actually work: collecting data, modeling systems, analyzing results, visualizing patterns, and communicating findings."
            </p>
          </div>
        </div>
      </section>

      {/* [5] FIRST PROOF OF CONCEPT */}
      <section className="py-24 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <span className="text-[10px] tracking-[0.3em] text-amber-400 uppercase block mb-3">// Initial Focus</span>
            <h2 className="text-2xl md:text-4xl font-light tracking-wide text-white mb-6">
              Initial focus: astrophysical signal workflows.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Sub-Infinity begins with radio astronomy because it provides a real, demanding test case: large scientific files, time-frequency data, weak signal detection, complex visualization, and collaborative analysis.
            </p>
            <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded">
              <p className="text-amber-400 text-xs font-mono leading-relaxed">
                <span className="font-bold">Key Directive:</span> This is not the limit of Sub-Infinity. It is the first proof that the platform can handle real, ultra-dense physics research workflows.
              </p>
            </div>
          </div>
          
          <div className="md:col-span-5 bg-slate-950 p-6 rounded border border-slate-900 font-mono text-xs">
            <span className="text-slate-500 block mb-3 text-[10px] uppercase tracking-wider">// Active Core Framework Modules</span>
            <ul className="space-y-2 text-slate-300">
              <li className="flex justify-between border-b border-slate-900 pb-1"><span>• HDF5 scientific files</span><span className="text-amber-400/60">Ready</span></li>
              <li className="flex justify-between border-b border-slate-900 pb-1"><span>• Waterfall plots</span><span className="text-amber-400/60">Ready</span></li>
              <li className="flex justify-between border-b border-slate-900 pb-1"><span>• Time-frequency rendering</span><span className="text-amber-400/60">Ready</span></li>
              <li className="flex justify-between border-b border-slate-900 pb-1"><span>• Signal annotation mapping</span><span className="text-amber-400/60">Testing</span></li>
              <li className="flex justify-between border-b border-slate-900 pb-1"><span>• Burst-search processing</span><span className="text-amber-400/60">Testing</span></li>
              <li className="flex justify-between border-b border-slate-900 pb-1"><span>• Metadata parsing logic</span><span className="text-slate-600">Pending</span></li>
              <li className="flex justify-between"><span>• Research log formatting</span><span className="text-slate-600">Pending</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* [6] PRODUCT PREVIEW (WORKFLOW PIPELINE) */}
      <section className="py-24 px-6 border-t border-slate-900 bg-slate-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] tracking-[0.3em] text-amber-400 uppercase block mb-3">// Functional Mechanics</span>
            <h2 className="text-2xl md:text-4xl font-light tracking-wide text-white mb-4">From raw data to research insight.</h2>
          </div>

          {/* Pipeline UI Component */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center text-xs font-mono mb-16">
            {["Upload Dataset", "Auto-organize Files", "Extract Metadata", "Visualize Data", "Detect/Annotate", "Export Notes"].map((step, idx) => (
              <div key={idx} className="p-4 border border-slate-900 bg-[#070a12] rounded relative group hover:border-amber-500/30 transition-colors">
                <div className="text-[10px] text-amber-400/50 mb-2">STAGE 0{idx + 1}</div>
                <div className="text-slate-200 font-medium tracking-wide">{step}</div>
                {idx < 5 && <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-slate-700 z-10">→</div>}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-3 text-slate-400">
              <p>• Upload massive heterogeneous scientific datasets directly via terminal or interface.</p>
              <p>• Automatically catalog files by project, instrument, timestamps, field, or unique metrics.</p>
              <p>• Generate hardware-accelerated visual transforms instantly in-browser.</p>
            </div>
            <div className="space-y-3 text-slate-400">
              <p>• Graphically isolate, flag, and annotate persistent mathematical anomalies or signals.</p>
              <p>• Archive underlying execution telemetry seamlessly via immutable research logging.</p>
              <p>• Render figures, logs, and summaries instantly to publishable Markdown/LaTeX assets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* [7] WHY SUB-INFINITY IS DIFFERENT */}
      <section className="py-24 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] tracking-[0.3em] text-amber-400 uppercase block mb-3">// Core Architecture Principles</span>
            <h2 className="text-2xl md:text-4xl font-light tracking-wide text-white mb-6">
              Designed from inside physics, not just software.
            </h2>
            <p className="text-slate-400 text-sm">
              Most software tools are either too general, too corporate, or too specific to one field. Sub-Infinity is built around the actual structural workflows of empirical and mathematical physics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Physics-native", desc: "Explicitly architected for raw datasets, wave vectors, multi-dimensional simulation arrays, and rigorous mathematical indexing." },
              { title: "Research-first", desc: "Engineered specifically around raw physical discovery mechanics, totally avoiding bloated, non-essential corporate dashboards." },
              { title: "Expandable Core", desc: "Launching with deep astrophysical signal parsing tools, but explicitly modularized to transition into any domain of physics." },
              { title: "Workflow-centered", desc: "Optimized to streamline data ingestion pipelines directly into clean, actionable, fully auditable scientific context." },
              { title: "Empirically Validated", desc: "Developed iteratively by active practitioners wrestling directly with real data arrays, not designed from an outside software vacuum." }
            ].map((card, idx) => (
              <div key={idx} className="p-6 border border-slate-900 bg-slate-950/40 rounded">
                <h3 className="text-white font-medium tracking-wide mb-2 text-sm">{card.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [8] LONG-TERM VISION */}
      <section id="vision" className="py-24 px-6 border-t border-slate-900 bg-slate-950/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.3em] text-amber-400 uppercase block mb-3">// Macroscopic Mission</span>
            <h2 className="text-3xl font-light tracking-wide text-white mb-4">Tools now. Frontier physics later.</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Sub-Infinity begins by building practical tools for researchers. Over time, the goal is to grow into a broader scientific company supporting advanced research, global simulation modeling, and frontier engineering ventures.
            </p>
          </div>

          {/* Phase Roadmap Component */}
          <div className="space-y-6 max-w-xl mx-auto font-mono text-xs">
            {[
              { phase: "PHASE 01", name: "Research Data Infrastructure Tools" },
              { phase: "PHASE 02", name: "Distributed Scientific Collaboration Platform" },
              { phase: "PHASE 03", name: "The Sub-Infinity Unified Research Network" },
              { phase: "PHASE 04", name: "Frontier Physics, Simulation, Aerospace & Advanced Spaceflight Ventures" }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-full border border-slate-900 bg-[#070a12] p-4 rounded text-center hover:border-amber-400/20 transition-colors">
                  <span className="text-amber-400 text-[10px] tracking-widest block mb-1">{step.phase}</span>
                  <span className="text-slate-200 font-medium tracking-wide">{step.name}</span>
                </div>
                {idx < 3 && <div className="text-slate-700 my-2 text-center text-sm">↓</div>}
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500 font-medium mt-12 italic">
            "The mission is to build tools that help scientists now, then use that foundation to support deeper scientific exploration later."
          </p>
        </div>
      </section>

      {/* [9] FOUNDER STORY */}
      <section className="py-24 px-6 border-t border-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="border border-slate-900 bg-[#080d1a]/50 p-8 md:p-12 rounded relative">
            <span className="text-[10px] tracking-[0.3em] text-amber-400 uppercase block mb-4">// Genesis Statement</span>
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-white mb-6">Built from real research frustration.</h2>
            <div className="space-y-4 text-slate-400 text-xs md:text-sm leading-relaxed">
              <p>
                Sub-Infinity started from a simple realization: scientific data is profoundly powerful, but the baseline infrastructure wrapping around it remains unorganized and unnecessarily painful to navigate.
              </p>
              <p>
                While working iteratively with complex radio astronomy data, FRB processing pipelines, HDF5 extractions, waterfall canvas renderings, wavelet calculations, and raw signal tracking loops, a distinct truth surfaced: physicists require infinitely cleaner interfaces to index experiments, trace computational chains, and distill massive datasets down into actual research output.
              </p>
              <p>
                Sub-Infinity is forged directly out of that pragmatic friction—conceived to give scientists the elegant, high-throughput workbench they deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* [10] CALL TO ACTION */}
      <section id="cta" className="py-32 px-6 border-t border-slate-900 bg-gradient-to-b from-transparent to-slate-950/70 text-center relative">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] tracking-[0.3em] text-amber-400 uppercase block mb-4">// Join the Framework</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-wide text-white mb-6">
            Help shape the future of physics research tools.
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            Sub-Infinity is starting with a focused prototype and expanding toward a broader platform for physics research. Researchers, students, and collaborators are invited to join early and help shape the direction.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto bg-amber-400 text-slate-950 px-8 py-3 rounded text-xs font-bold tracking-widest uppercase hover:bg-amber-300 transition-colors">
              Join the Waitlist
            </button>
            <button className="w-full sm:w-auto border border-slate-800 text-slate-300 px-8 py-3 rounded text-xs font-medium tracking-widest uppercase hover:bg-slate-900 transition-colors">
              Contact Sub-Infinity
            </button>
            <button className="w-full sm:w-auto text-amber-400/80 px-4 py-3 rounded text-xs font-mono hover:text-amber-300 transition-colors">
              [ View Prototype ]
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-slate-950 bg-[#04060b] text-center text-[11px] font-mono tracking-widest text-slate-600">
        <div>© 2026 SUB-INFINITY. ALL SYSTEMS OPERATIONAL.</div>
        <div className="text-[9px] mt-2 text-slate-700 uppercase">Scientific Infrastructure Across Disciplines.</div>
      </footer>

    </div>
  );
}
