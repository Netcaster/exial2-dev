import React, { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { NeuralWidget } from "./NeuralWidget";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Globe2,
  LandPlot,
  Menu,
  Moon,
  Phone,
  RadioTower,
  ShieldCheck,
  Sun,
  Wallet,
  X,
  BadgeDollarSign,
  Network,
  Home,
  Users,
  LineChart,
  CheckCircle2,
  Landmark,
  BriefcaseBusiness,
} from "lucide-react";

// ─── Theme tokens ─────────────────────────────────────────────────────────────

const COMMON = {
  blue:       "#2B6CFF",
  blueDim:    "rgba(43,108,255,0.15)",
  blueBorder: "rgba(43,108,255,0.22)",
  purple:     "#7B2FBE",
  cyan:       "#22D3EE",
};

const darkTheme = {
  ...COMMON,
  bg:             "#060A12",
  navBg:          "rgba(6,10,18,0.82)",
  cardBg:         "rgba(43,108,255,0.06)",
  cardSolid:      "rgba(10,18,35,0.75)",
  inputBg:        "rgba(6,10,18,0.70)",
  closerBg:       "linear-gradient(135deg, rgba(43,108,255,0.08) 0%, rgba(6,10,18,0.88) 100%)",
  text:           "#F1F5F9",
  muted:          "#94A3B8",
  subtle:         "#CBD5E1",
  dotColor:       "rgba(43,108,255,0.55)",
  aurora1:        "rgba(43,108,255,0.17)",
  aurora2:        "rgba(123,47,190,0.14)",
  aurora3:        "rgba(34,211,238,0.07)",
  baseBg:         "linear-gradient(180deg,#060A12 0%,#08111E 60%,#060A12 100%)",
  eyebrowText:    "#93C5FD",
  eyebrowBg:      "rgba(43,108,255,0.15)",
  eyebrowBorder:  "rgba(43,108,255,0.28)",
  isDark:         true,
};

const lightTheme = {
  ...COMMON,
  bg:             "#EEF3FF",
  navBg:          "rgba(238,243,255,0.90)",
  cardBg:         "rgba(255,255,255,0.70)",
  cardSolid:      "rgba(255,255,255,0.92)",
  inputBg:        "rgba(255,255,255,0.85)",
  closerBg:       "linear-gradient(135deg, rgba(43,108,255,0.06) 0%, rgba(238,243,255,0.95) 100%)",
  text:           "#0F172A",
  muted:          "#475569",
  subtle:         "#334155",
  dotColor:       "rgba(43,108,255,0.25)",
  aurora1:        "rgba(43,108,255,0.10)",
  aurora2:        "rgba(123,47,190,0.08)",
  aurora3:        "rgba(34,211,238,0.05)",
  baseBg:         "linear-gradient(180deg,#EEF3FF 0%,#E8F0FF 60%,#EEF3FF 100%)",
  eyebrowText:    "#1E40AF",
  eyebrowBg:      "rgba(43,108,255,0.10)",
  eyebrowBorder:  "rgba(43,108,255,0.45)",
  isDark:         false,
};

type Tokens = typeof darkTheme;
const ThemeCtx = createContext<{ T: Tokens; toggle: () => void }>(null!);
const useT = () => useContext(ThemeCtx).T;
const useToggle = () => useContext(ThemeCtx).toggle;

// ─── Data ─────────────────────────────────────────────────────────────────────

const nav = [
  { label: "Platform",   href: "/platform/explained", route: true },
  { label: "Model",      href: "#model",              route: false },
  { label: "Leadership", href: "#leadership",         route: false },
  { label: "Partners",   href: "/platform/partners",  route: true },
  { label: "Capital",    href: "/platform/capital",   route: true },
  { label: "Contact",    href: "#contact",            route: false },
];

const pillars = [
  {
    icon: LandPlot,
    title: "Real Asset Backing",
    body: "Governance-driven subdivision, assemblage, and housing-oriented real estate strategies designed to acquire at embedded equity positions and monetize through disciplined exits.",
    accent: COMMON.blue,
  },
  {
    icon: RadioTower,
    title: "Telecom Distribution",
    body: "MVNO, MVNA, and MVNE infrastructure aligned to device distribution, recurring subscriber revenue, and scaled digital onboarding across multiple user cohorts.",
    accent: COMMON.purple,
  },
  {
    icon: Wallet,
    title: "Blockchain Settlement",
    body: "EXIAL functions as the programmable economic rail for incentives, payments, escrow, wallet activity, and future treasury-managed settlement workflows.",
    accent: COMMON.cyan,
  },
];

const lifecycle = [
  { step: "01", title: "Onboard",   text: "Device issuance, wallet activation, identity capture, and R.I.S.E. program entry establish the user inside the ecosystem.", icon: Phone },
  { step: "02", title: "Activate",  text: "Users begin transacting through EXIAL across food, services, mobility, hospitality, and community commerce pathways.", icon: Network },
  { step: "03", title: "Stabilize", text: "Savings, escrow, and participation metrics create a measurable readiness pathway tied to housing placement and financial inclusion.", icon: ShieldCheck },
  { step: "04", title: "Convert",   text: "Participants graduate into rental, interim, or ownership pathways while developments benefit from improved absorption visibility.", icon: Home },
];

const useCases = [
  { title: "R.I.S.E. Housing",          copy: "Structured onboarding, services access, and housing progression driven by measurable participation and financial tooling.", icon: Building2 },
  { title: "MVNO Growth",               copy: "Subscriber acquisition through device-led onboarding and recurring revenue generation that supports treasury strength over time.", icon: RadioTower },
  { title: "Hospitality & Room Blocks", copy: "Official Housing Agreement strategies, room inventory economics, and direct-to-consumer activation through embedded digital experiences.", icon: BriefcaseBusiness },
  { title: "Tokenized Commerce",        copy: "Loyalty, access, digital redemption, and programmable settlement across a controlled ecosystem with scalable partner participation.", icon: BadgeDollarSign },
];

const stats = [
  { label: "Integrated rails",       value: "3" },
  { label: "Core verticals",         value: "4" },
  { label: "Target subscriber path", value: "1M" },
  { label: "Execution posture",      value: "Institutional" },
];

const leadership = [
  {
    name: "Milton Bledsoe",
    role: "Strategic Architect",
    summary: "Business development leadership across housing, hospitality, token economics, room-block strategies, and integrated commercialization models.",
  },
  {
    name: "Carl Maybin",
    role: "CTO / Infrastructure Architect",
    summary: "Telecom, payments, and blockchain operator with global market experience spanning carrier infrastructure, mobile payments, and token launches.",
    bullets: [
      "FCC telecom infrastructure background and international carrier leadership",
      "$64M liquidity event execution experience in blockchain launch environments",
      "Cross-border relationships spanning telecom, payments, and enterprise partnerships",
    ],
  },
];

const partnerTracks = [
  {
    title: "Investors",
    body: "Structured access to an integrated model spanning real assets, subscriber economics, treasury mechanics, and closed-loop digital settlement.",
  },
  {
    title: "Municipal & Community Partners",
    body: "A pathway to stabilize participation, expand housing access, and align technology-enabled service delivery with measurable social and economic outcomes.",
  },
  {
    title: "Enterprise Licensees",
    body: "Deploy EXIAL rails across events, hospitality, travel, telecom, and community-based ecosystems with tailored revenue and participation logic.",
  },
];

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  const T = useT();
  return (
    <div
      className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
      style={{ border: `1px solid ${T.eyebrowBorder}`, background: T.eyebrowBg, color: T.eyebrowText }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.blue }} />
      {children}
    </div>
  );
}

function PrimaryBtn({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-6 text-sm font-semibold text-white transition-all hover:opacity-90 ${className}`}
      style={{ background: `linear-gradient(135deg, ${COMMON.blue} 0%, #4F8EFF 100%)` }}
      {...props}
    >
      {children}
    </button>
  );
}

function GhostBtn({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  const T = useT();
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-6 text-sm font-medium transition-all hover:opacity-80 ${className}`}
      style={{ border: `1px solid ${T.blueBorder}`, background: T.blueDim, color: T.text }}
      {...props}
    >
      {children}
    </button>
  );
}

function GlassCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const T = useT();
  return (
    <div
      className={`rounded-[24px] ${className}`}
      style={{ background: T.cardBg, border: `1px solid ${T.blueBorder}`, backdropFilter: "blur(14px)", ...style }}
    >
      {children}
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function TopNav({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  const T = useT();
  const toggle = useToggle();
  const navigate = useNavigate();
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{ borderBottom: `1px solid ${T.blueBorder}`, background: T.navBg }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/exial-logo.png" alt="EXIAL" className="h-10 w-auto drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
        </a>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            item.route
              ? <button key={item.label} onClick={() => navigate(item.href)} className="text-sm transition hover:opacity-100" style={{ color: T.muted, background:"none", border:"none", cursor:"pointer" }}>{item.label}</button>
              : <a key={item.label} href={item.href} className="text-sm transition hover:opacity-100" style={{ color: T.muted }}>{item.label}</a>
          ))}
        </nav>

        {/* Desktop right buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Day / Night toggle */}
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:opacity-80"
            style={{ border: `1px solid ${T.blueBorder}`, background: T.blueDim }}
            aria-label="Toggle theme"
          >
            {T.isDark
              ? <Sun className="h-4 w-4" style={{ color: "#FCD34D" }} />
              : <Moon className="h-4 w-4" style={{ color: T.blue }} />
            }
          </button>
          <GhostBtn className="h-9">Request Access</GhostBtn>
          <PrimaryBtn className="h-9">Partner With EXIAL</PrimaryBtn>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ border: `1px solid ${T.blueBorder}`, background: T.blueDim }}
            aria-label="Toggle theme"
          >
            {T.isDark
              ? <Sun className="h-4 w-4" style={{ color: "#FCD34D" }} />
              : <Moon className="h-4 w-4" style={{ color: T.blue }} />
            }
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ border: `1px solid ${T.blueBorder}`, background: T.blueDim, color: T.text }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: `1px solid ${T.blueBorder}`, background: T.navBg }} className="md:hidden backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6">
            {nav.map((item) => (
              item.route
                ? <button key={item.label} onClick={() => { navigate(item.href); setMobileOpen(false); }} className="text-sm text-left" style={{ color: T.text, background:"none", border:"none", cursor:"pointer" }}>{item.label}</button>
                : <a key={item.label} href={item.href} className="text-sm" style={{ color: T.text }} onClick={() => setMobileOpen(false)}>{item.label}</a>
            ))}
            <div className="mt-2 grid gap-2">
              <GhostBtn className="h-10 w-full">Request Access</GhostBtn>
              <PrimaryBtn className="h-10 w-full">Partner With EXIAL</PrimaryBtn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const T = useT();
  return (
    <section className="relative overflow-hidden" style={{ borderBottom: `1px solid ${T.blueBorder}` }}>
      {/* Section-level aurora blobs */}
      <div className="pointer-events-none absolute -left-60 -top-60 h-[700px] w-[700px] rounded-full"
        style={{ background: `radial-gradient(circle, ${T.aurora1} 0%, transparent 65%)`, filter: "blur(100px)" }} />
      <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full"
        style={{ background: `radial-gradient(circle, ${T.aurora2} 0%, transparent 65%)`, filter: "blur(100px)" }} />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
        {/* Left copy */}
        <div className="relative z-10 lg:col-span-7">
          <SectionEyebrow>Financial Infrastructure for Real-World Participation</SectionEyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.5rem]"
            style={{ color: T.text }}
          >
            A new economic rail for{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${T.blue} 0%, ${T.cyan} 100%)` }}
            >
              housing, connectivity,
            </span>{" "}
            and controlled digital settlement.
          </motion.h1>

          <p className="mt-6 max-w-2xl text-base leading-7 sm:text-lg" style={{ color: T.muted }}>
            EXIAL combines governance-driven real asset strategies, telecom distribution, and blockchain-powered settlement to create a scalable platform for economic participation, housing conversion, and long-term treasury value creation.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryBtn className="h-12">
              Request Investor Brief <ArrowRight className="ml-2 h-4 w-4" />
            </PrimaryBtn>
            <GhostBtn className="h-12">Explore Platform</GhostBtn>
          </div>

          {/* Stats row */}
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl p-4"
                style={{ background: T.cardBg, border: `1px solid ${T.blueBorder}`, backdropFilter: "blur(12px)" }}
              >
                <div className="text-2xl font-bold" style={{ color: T.text }}>{s.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel card */}
        <div className="relative z-10 lg:col-span-5">
          <div
            className="overflow-hidden rounded-[28px] shadow-[0_20px_80px_rgba(43,108,255,0.15)]"
            style={{ border: `1px solid ${T.blueBorder}`, background: T.cardSolid, backdropFilter: "blur(20px)" }}
          >
            <div className="p-6" style={{ borderBottom: `1px solid ${T.blueBorder}` }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: T.muted }}>Platform Snapshot</div>
                  <div className="mt-2 text-xl font-semibold" style={{ color: T.text }}>EXIAL Control Layer</div>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: T.eyebrowBg, border: `1px solid ${T.eyebrowBorder}`, color: T.eyebrowText }}>
                  Production Model
                </span>
              </div>
            </div>
            <div className="space-y-3 p-6">
              {[
                [Landmark, "Governed asset acquisitions",   "Subdivision, assemblage, and project-level embedded equity discipline", T.blue],
                [Phone,    "Device-led onboarding",         "Phones, wallets, and activation flows tied to ecosystem participation",  T.purple],
                [Globe2,   "Telecom distribution",          "MVNO and global network commercialization pathways",                    T.cyan],
                [Wallet,   "Programmable settlement",       "Escrow, token utility, and managed treasury mechanics",                 T.blue],
              ].map(([Icon, title, text, accent]) => {
                const Ico = Icon as React.ElementType;
                const ac = accent as string;
                return (
                  <div key={title as string} className="flex gap-4 rounded-2xl p-4"
                    style={{ background: T.blueDim.replace("0.15", "0.05"), border: `1px solid ${T.blueBorder}` }}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${ac}18`, border: `1px solid ${ac}30` }}>
                      <Ico className="h-4 w-4" style={{ color: ac }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: T.text }}>{title as string}</div>
                      <div className="mt-1 text-xs leading-5" style={{ color: T.muted }}>{text as string}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Platform ─────────────────────────────────────────────────────────────────

function PlatformSection() {
  const T = useT();
  return (
    <section id="platform" className="relative py-20" style={{ borderBottom: `1px solid ${T.blueBorder}` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>Three Core Pillars</SectionEyebrow>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: T.text }}>
            Designed like infrastructure. Presented like a platform.
          </h2>
          <p className="mt-4 text-base leading-7 sm:text-lg" style={{ color: T.muted }}>
            EXIAL is built to coordinate demand, participation, and monetization across physical and digital environments through disciplined governance, distribution rails, and programmable settlement.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.title} className="p-6 transition-all hover:shadow-[0_8px_40px_rgba(43,108,255,0.12)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}30` }}>
                  <Icon className="h-5 w-5" style={{ color: item.accent }} />
                </div>
                <h3 className="mt-5 text-xl font-semibold" style={{ color: T.text }}>{item.title}</h3>
                <p className="mt-3 text-sm leading-7" style={{ color: T.muted }}>{item.body}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Model ────────────────────────────────────────────────────────────────────

function ModelSection() {
  const T = useT();
  return (
    <section id="model" className="py-20" style={{ borderBottom: `1px solid ${T.blueBorder}` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionEyebrow>Demand + Conversion Model</SectionEyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: T.text }}>
              Built to originate participation, not just describe it.
            </h2>
            <p className="mt-4 text-base leading-7 sm:text-lg" style={{ color: T.muted }}>
              The platform coordinates onboarding, economic activation, stabilization, and housing conversion in a sequence that improves visibility into demand and strengthens asset absorption logic over time.
            </p>
            <GlassCard className="mt-8 p-5">
              <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: T.muted }}>System Flow</div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                {["R.I.S.E.", "MVNO", "EXIAL Wallet", "Savings / Escrow", "Housing Placement", "Treasury"].map((item, idx) => (
                  <React.Fragment key={item}>
                    <div className="rounded-xl px-3 py-2 text-xs font-semibold"
                      style={{ background: T.eyebrowBg, border: `1px solid ${T.eyebrowBorder}`, color: T.eyebrowText }}>
                      {item}
                    </div>
                    {idx < 5 && <ChevronRight className="h-3 w-3 shrink-0" style={{ color: T.blue }} />}
                  </React.Fragment>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {lifecycle.map((item) => {
                const Icon = item.icon;
                return (
                  <GlassCard key={item.step} className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full px-3 py-1 text-xs font-bold tracking-wider"
                        style={{ background: T.eyebrowBg, border: `1px solid ${T.eyebrowBorder}`, color: T.eyebrowText }}>
                        {item.step}
                      </span>
                      <Icon className="h-5 w-5" style={{ color: T.blue }} />
                    </div>
                    <div className="mt-5 text-xl font-semibold" style={{ color: T.text }}>{item.title}</div>
                    <p className="mt-3 text-sm leading-7" style={{ color: T.muted }}>{item.text}</p>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Use Cases ────────────────────────────────────────────────────────────────

function UseCasesSection() {
  const T = useT();
  const iconColors = [T.blue, T.purple, T.cyan, T.blue];
  return (
    <section className="py-20" style={{ borderBottom: `1px solid ${T.blueBorder}` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>Commercial Use Cases</SectionEyebrow>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: T.text }}>
            One platform. Multiple monetization environments.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((u, i) => {
            const Icon = u.icon;
            const ac = iconColors[i];
            return (
              <GlassCard key={u.title} className="p-6 transition-all hover:shadow-[0_8px_40px_rgba(43,108,255,0.10)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `${ac}18`, border: `1px solid ${ac}30` }}>
                  <Icon className="h-5 w-5" style={{ color: ac }} />
                </div>
                <div className="mt-5 text-xl font-semibold" style={{ color: T.text }}>{u.title}</div>
                <p className="mt-3 text-sm leading-7" style={{ color: T.muted }}>{u.copy}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Leadership ───────────────────────────────────────────────────────────────

function LeadershipSection() {
  const T = useT();
  return (
    <section id="leadership" className="py-20" style={{ borderBottom: `1px solid ${T.blueBorder}` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionEyebrow>Leadership</SectionEyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: T.text }}>
              Credibility across strategy, telecom, and blockchain execution.
            </h2>
            <p className="mt-4 text-base leading-7" style={{ color: T.muted }}>
              The EXIAL platform is guided by leadership spanning business development, digital transformation, telecom infrastructure, payments, and token launch execution.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-5 md:grid-cols-2">
              {leadership.map((person) => (
                <GlassCard key={person.name} className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ background: T.blueDim, border: `1px solid ${T.blueBorder}` }}>
                      <Users className="h-5 w-5" style={{ color: T.blue }} />
                    </div>
                    <div>
                      <div className="text-lg font-semibold" style={{ color: T.text }}>{person.name}</div>
                      <div className="text-sm" style={{ color: T.muted }}>{person.role}</div>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7" style={{ color: T.muted }}>{person.summary}</p>
                  {person.bullets && (
                    <div className="mt-5 space-y-3">
                      {person.bullets.map((b) => (
                        <div key={b} className="flex gap-3 text-sm" style={{ color: T.subtle }}>
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: T.blue }} />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Partners ─────────────────────────────────────────────────────────────────

function PartnersSection() {
  const T = useT();
  return (
    <section id="partners" className="py-20" style={{ borderBottom: `1px solid ${T.blueBorder}` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>Partner Tracks</SectionEyebrow>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: T.text }}>
            Built for investors, municipalities, and enterprise operators.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {partnerTracks.map((p) => (
            <GlassCard key={p.title} className="p-6 transition-all hover:shadow-[0_8px_40px_rgba(43,108,255,0.10)]">
              <div className="text-lg font-semibold" style={{ color: T.text }}>{p.title}</div>
              <p className="mt-3 text-sm leading-7" style={{ color: T.muted }}>{p.body}</p>
              <button className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-70"
                style={{ color: T.blue }}>
                Learn more <ArrowRight className="h-4 w-4" />
              </button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Microsite Closer ─────────────────────────────────────────────────────────

function MicrositeCloser() {
  const T = useT();
  const closerCards = useMemo(() => [
    { title: "Distribution", body: "Device-led onboarding, subscriber economics, and telecom-scale acquisition pathways.",                     icon: Phone },
    { title: "Demand",       body: "R.I.S.E. progression creates measurable housing readiness and internal absorption visibility.",             icon: Users },
    { title: "Settlement",   body: "EXIAL supports wallet activity, escrow logic, incentives, and programmable economic participation.",         icon: Wallet },
    { title: "Treasury",     body: "Governance-driven asset strategy and operating cash flows reinforce long-term institutional posture.",       icon: LineChart },
  ], []);
  const cardColors = [T.blue, T.purple, T.cyan, T.blue];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] p-6 sm:p-8 lg:p-10"
          style={{ border: `1px solid ${T.blueBorder}`, background: T.closerBg, backdropFilter: "blur(20px)", boxShadow: "0 30px 100px rgba(43,108,255,0.10)" }}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionEyebrow>TPG–EXIAL Micro-Site</SectionEyebrow>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: T.text }}>
                We control onboarding, participation, demand, and settlement.
              </h2>
              <p className="mt-4 text-base leading-7 sm:text-lg" style={{ color: T.muted }}>
                This closer view is designed for institutional conversations where the objective is not awareness, but alignment around the integrated financial engine and operating logic.
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  "Governance-driven real asset strategy",
                  "MVNO subscriber economics and device distribution",
                  "EXIAL as controlled economic rail",
                  "Housing demand origination through progression",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl p-4 text-sm"
                    style={{ background: T.blueDim, border: `1px solid ${T.blueBorder}`, color: T.subtle }}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: T.blue }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {closerCards.map((card, i) => {
                  const Icon = card.icon;
                  const ac = cardColors[i];
                  return (
                    <GlassCard key={card.title} className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ background: `${ac}18`, border: `1px solid ${ac}30` }}>
                        <Icon className="h-5 w-5" style={{ color: ac }} />
                      </div>
                      <div className="mt-5 text-xl font-semibold" style={{ color: T.text }}>{card.title}</div>
                      <p className="mt-3 text-sm leading-7" style={{ color: T.muted }}>{card.body}</p>
                    </GlassCard>
                  );
                })}
              </div>

              <GlassCard className="mt-5 p-6">
                <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Institutional Positioning</div>
                <p className="mt-3 text-base leading-7" style={{ color: T.subtle }}>
                  EXIAL is presented as a telecom-driven, asset-informed economic infrastructure platform that connects onboarding, revenue generation, housing progression, and treasury-managed participation within a unified commercial system.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <PrimaryBtn className="h-10">Investor Access</PrimaryBtn>
                  <GhostBtn className="h-10">Municipal Partnership</GhostBtn>
                  <GhostBtn className="h-10">Enterprise License</GhostBtn>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const T = useT();
  return (
    <section id="contact" className="py-20" style={{ borderTop: `1px solid ${T.blueBorder}` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionEyebrow>Connect</SectionEyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: T.text }}>
              Open a commercial, municipal, or investor conversation.
            </h2>
            <p className="mt-4 text-base leading-7" style={{ color: T.muted }}>
              Use this section as the front-end entry point for interest capture, partner routing, and gated follow-up workflows.
            </p>
          </div>
          <div className="lg:col-span-7">
            <GlassCard className="p-6 sm:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                {["Full name", "Company", "Email", "Partnership type"].map((ph) => (
                  <input
                    key={ph}
                    placeholder={ph}
                    className="h-12 w-full rounded-xl px-4 text-sm outline-none transition"
                    style={{
                      background: T.inputBg,
                      border: `1px solid ${T.blueBorder}`,
                      color: T.text,
                      caretColor: T.blue,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 rounded-2xl p-4 text-sm leading-7"
                style={{ background: T.inputBg, border: `1px solid ${T.blueBorder}`, color: T.muted }}>
                Configure this form to route submissions into your CRM, investor intake system, or partner onboarding flow.
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <PrimaryBtn className="h-12">Submit Inquiry</PrimaryBtn>
                <GhostBtn className="h-12">Download Overview</GhostBtn>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const T = useT();
  return (
    <footer className="py-8" style={{ borderTop: `1px solid ${T.blueBorder}` }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"
        style={{ color: T.muted }}>
        <div className="flex items-center gap-3">
          <img src="/exial-logo.png" alt="EXIAL" className="h-6 w-auto drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]" />
          <span>© 2026 EXIAL / TPG. All rights reserved.</span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a key={l} href="#" className="transition hover:opacity-100" style={{ color: T.muted }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ExialProductionSite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mode, setMode] = useState("landing");
  const [isDark, setIsDark] = useState(true);

  const T = isDark ? darkTheme : lightTheme;
  const ctx = useMemo(() => ({ T, toggle: () => setIsDark((d) => !d) }), [T]);

  return (
    <ThemeCtx.Provider value={ctx}>
      <div className="min-h-screen" style={{ background: T.bg, fontFamily: "'Inter', system-ui, sans-serif", color: T.text }}>

        {/* Global aurora + dot-grid background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0" style={{ background: T.baseBg }} />
          <div className="absolute -left-80 -top-80 h-[900px] w-[900px] rounded-full"
            style={{ background: `radial-gradient(circle, ${T.aurora1} 0%, transparent 60%)`, filter: "blur(120px)" }} />
          <div className="absolute -right-60 -top-20 h-[800px] w-[800px] rounded-full"
            style={{ background: `radial-gradient(circle, ${T.aurora2} 0%, transparent 60%)`, filter: "blur(120px)" }} />
          <div className="absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
            style={{ background: `radial-gradient(circle, ${T.aurora3} 0%, transparent 60%)`, filter: "blur(100px)" }} />
          {/* Dot-grid network overlay */}
          <div className="absolute inset-0 opacity-[0.12]"
            style={{ backgroundImage: `radial-gradient(circle, ${T.dotColor} 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
        </div>

        <TopNav mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <main>
          {/* Tab switcher */}
          <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
            <div className="inline-flex rounded-2xl p-1"
              style={{ background: T.cardBg, border: `1px solid ${T.blueBorder}` }}>
              {[
                { value: "landing", label: "EXIAL Landing Page" },
                { value: "closer",  label: "TPG–EXIAL Micro-Site" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setMode(tab.value)}
                  className="rounded-xl px-4 py-2 text-sm font-medium transition-all"
                  style={
                    mode === tab.value
                      ? { background: T.blue, color: "#fff" }
                      : { color: T.muted, background: "transparent" }
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {mode === "landing" && (
            <>
              <Hero />
              <PlatformSection />
              <ModelSection />
              <UseCasesSection />
              <LeadershipSection />
              <PartnersSection />
              <ContactSection />
            </>
          )}

          {mode === "closer" && (
            <>
              <MicrositeCloser />
              <ContactSection />
            </>
          )}
        </main>

        <Footer />
        <NeuralWidget />
      </div>
    </ThemeCtx.Provider>
  );
}
