import React, { createContext, useContext, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Layers3, Moon, Sun, Menu, X, CheckCircle2, Zap,
  Wallet, Building2, Globe2, RadioTower, ShieldCheck, Users, Network,
  LineChart, LandPlot, BadgeDollarSign, BriefcaseBusiness, Landmark,
  LayoutDashboard, MapPin, Leaf, Cpu,
} from "lucide-react";

// ── Theme (mirrors ExialSite tokens) ────────────────────────────────────────
const COMMON = { blue:"#2B6CFF", blueDim:"rgba(43,108,255,0.15)", blueBorder:"rgba(43,108,255,0.22)", purple:"#7B2FBE", cyan:"#22D3EE" };
const dark = { ...COMMON, bg:"#060A12", navBg:"rgba(6,10,18,0.82)", cardBg:"rgba(43,108,255,0.06)", cardSolid:"rgba(10,18,35,0.75)", inputBg:"rgba(6,10,18,0.70)", text:"#F1F5F9", muted:"#94A3B8", subtle:"#CBD5E1", dotColor:"rgba(43,108,255,0.55)", aurora1:"rgba(43,108,255,0.17)", aurora2:"rgba(123,47,190,0.14)", aurora3:"rgba(34,211,238,0.07)", baseBg:"linear-gradient(180deg,#060A12 0%,#08111E 60%,#060A12 100%)", eyebrowText:"#93C5FD", eyebrowBg:"rgba(43,108,255,0.15)", eyebrowBorder:"rgba(43,108,255,0.28)", isDark:true };
const light = { ...COMMON, bg:"#EEF3FF", navBg:"rgba(238,243,255,0.90)", cardBg:"rgba(255,255,255,0.70)", cardSolid:"rgba(255,255,255,0.92)", inputBg:"rgba(255,255,255,0.85)", text:"#0F172A", muted:"#475569", subtle:"#334155", dotColor:"rgba(43,108,255,0.25)", aurora1:"rgba(43,108,255,0.10)", aurora2:"rgba(123,47,190,0.08)", aurora3:"rgba(34,211,238,0.05)", baseBg:"linear-gradient(180deg,#EEF3FF 0%,#E8F0FF 60%,#EEF3FF 100%)", eyebrowText:"#1E40AF", eyebrowBg:"rgba(43,108,255,0.10)", eyebrowBorder:"rgba(43,108,255,0.45)", isDark:false };
type Tokens = typeof dark;
const Ctx = createContext<{ T: Tokens; toggle: () => void }>(null!);
const useT = () => useContext(Ctx).T;
const useToggle = () => useContext(Ctx).toggle;

// ── Page config types ────────────────────────────────────────────────────────
interface CapCard   { icon: React.ElementType; title: string; body: string; accent?: string }
interface Step      { num: string; title: string; body: string; icon: React.ElementType }
interface UseCase   { tab: string; headline: string; body: string }
interface PageCfg {
  eyebrow: string; h1: string; lead: string; cta1: string; cta2: string;
  defHeadline: string; defLead: string; defBullets: string[];
  whyProblem: string; whyPoints: string[];
  steps: Step[]; caps: CapCard[]; useCases: UseCase[];
  proofStats: { value: string; label: string }[];
  footerH: string; footerLead: string;
}

// ── 11 page configs ──────────────────────────────────────────────────────────
const pages: Record<string, PageCfg> = {
  explained: {
    eyebrow:"Platform Architecture", h1:"Infrastructure for real-world participation.", lead:"EXIAL unifies payments, access, loyalty, booking, token utility, and distribution into one operating system for global commerce.", cta1:"Request Platform Briefing", cta2:"Explore Capabilities",
    defHeadline:"One operating system. Every layer of commerce.", defLead:"EXIAL is not a product category — it is an economic infrastructure layer that coordinates demand, participation, and monetization across physical and digital environments.", defBullets:["Governance-driven acquisition and real asset strategy","Token-enabled settlement and programmable payment rails","Distribution across telecom, hospitality, travel, and commerce"],
    whyProblem:"Legacy platforms handle one vertical at a time — payments here, bookings there, loyalty somewhere else. The result is fractured economics, margin loss, and no unified identity.", whyPoints:["EXIAL replaces five disconnected systems with one controlled rail","Vendors, users, and institutions operate on the same settlement layer","Every transaction strengthens treasury and participant data"],
    steps:[{num:"01",title:"Integration",body:"Connect inventory, identity, and payment systems through a single API layer.",icon:Cpu},{num:"02",title:"Activation",body:"Users onboard with wallet, identity, and access established in one flow.",icon:Network},{num:"03",title:"Distribution",body:"Demand is routed across hotels, events, travel, and commerce channels.",icon:Globe2},{num:"04",title:"Settlement",body:"Every transaction settles through the EXIAL rail — programmable, auditable, instant.",icon:ShieldCheck}],
    caps:[{icon:Wallet,title:"Unified Wallet",body:"Single balance across tokens, rewards, and cash equivalents.",accent:COMMON.blue},{icon:Building2,title:"Real Asset Layer",body:"Governance-driven acquisition with embedded equity discipline.",accent:COMMON.purple},{icon:RadioTower,title:"Telecom Rails",body:"MVNO and carrier infrastructure for subscriber-led demand.",accent:COMMON.cyan},{icon:BadgeDollarSign,title:"Token Settlement",body:"Programmable economic logic for incentives, escrow, and treasury.",accent:COMMON.blue},{icon:Globe2,title:"Global Distribution",body:"Cross-border participation with unified identity and access.",accent:COMMON.purple},{icon:ShieldCheck,title:"Institutional Grade",body:"Compliance-aware architecture designed for enterprise and municipal use.",accent:COMMON.cyan}],
    useCases:[{tab:"Enterprise",headline:"Enterprise infrastructure licensing",body:"Deploy EXIAL rails across events, hospitality, travel, and community ecosystems with tailored revenue logic and branded participation layers."},{tab:"Municipal",headline:"City-level service delivery",body:"Municipalities deploy EXIAL to power service access, benefit distribution, and transparent reporting tied to real participation outcomes."},{tab:"Consumer",headline:"Unified access for every user",body:"Participants join through device-led onboarding and access hotels, events, travel, and commerce through one wallet and identity."}],
    proofStats:[{value:"3",label:"Integrated rails"},{value:"4",label:"Core verticals"},{value:"1M+",label:"Target subscriber path"},{value:"Institutional",label:"Execution posture"}],
    footerH:"Ready to brief your team?", footerLead:"Schedule a platform walkthrough with the EXIAL infrastructure team. We move fast and come prepared.",
  },
  booking: {
    eyebrow:"Booking Engine", h1:"Direct inventory. Better margins. Smarter access.", lead:"EXIAL connects hotels, events, and experiences directly to the commerce layer — eliminating OTA fees, improving yield, and embedding token rewards into every reservation.", cta1:"Explore Live Inventory", cta2:"View Partner Model",
    defHeadline:"Inventory that performs.", defLead:"The EXIAL booking engine bypasses traditional distribution intermediaries and puts inventory control back in the hands of operators and platform participants.", defBullets:["Direct-to-consumer room blocks and event inventory","Dynamic pricing with token-linked discount triggers","Booking-integrated wallet redemption at checkout"],
    whyProblem:"OTAs charge 15–25% commissions and own the customer relationship. Hotel and event operators lose margin and visibility into who is actually booking and why.", whyPoints:["EXIAL eliminates the OTA layer with direct inventory APIs","Operators keep the relationship, the margin, and the data","Token incentives drive repeat bookings without discount dependency"],
    steps:[{num:"01",title:"Inventory Connect",body:"Hotels and event venues connect room blocks and ticket inventory via API.",icon:Building2},{num:"02",title:"Dynamic Pricing",body:"EXIAL applies real-time pricing logic with token-reward overlays.",icon:LineChart},{num:"03",title:"Wallet Checkout",body:"Users redeem tokens, apply loyalty credits, and settle in one flow.",icon:Wallet},{num:"04",title:"Settlement",body:"Revenue is split, distributed, and tracked on the EXIAL settlement layer.",icon:ShieldCheck}],
    caps:[{icon:Building2,title:"Room Block Management",body:"Allocate, release, and reprice inventory blocks in real time.",accent:COMMON.blue},{icon:BadgeDollarSign,title:"Token Discounts",body:"Loyalty-linked pricing triggers based on wallet balance and status.",accent:COMMON.purple},{icon:Globe2,title:"Multi-Inventory",body:"Hotels, events, experiences, and travel bundled in one checkout.",accent:COMMON.cyan},{icon:LineChart,title:"Yield Intelligence",body:"Demand signals inform pricing and inventory release timing.",accent:COMMON.blue},{icon:Network,title:"Partner APIs",body:"Connect Hotelbeds, SynXis, Amadeus, or direct PMS systems.",accent:COMMON.purple},{icon:ShieldCheck,title:"Audit Trail",body:"Every booking, refund, and modification recorded on-chain.",accent:COMMON.cyan}],
    useCases:[{tab:"Hotels",headline:"Hotel operators retain margin and customer",body:"Connect room inventory directly. EXIAL handles discovery, checkout, wallet rewards, and settlement without a middleman taking 20%."},{tab:"Events",headline:"Event bundling with hospitality",body:"Bundle tickets with hotel blocks, transportation, and on-site commerce into one seamless EXIAL-powered booking experience."},{tab:"Enterprise",headline:"Corporate travel and accommodation",body:"Enterprise accounts manage team travel, room blocks, and expense routing through a single EXIAL dashboard with full reporting."}],
    proofStats:[{value:"0%",label:"OTA commission layer"},{value:"Real-time",label:"Inventory pricing"},{value:"1-click",label:"Token checkout"},{value:"Direct",label:"Operator relationship"}],
    footerH:"Start with your inventory.", footerLead:"Connect your room blocks or event inventory to the EXIAL distribution engine and start converting demand without the middleman.",
  },
  wallet: {
    eyebrow:"EXIAL Wallet", h1:"Where access, value, and settlement come together.", lead:"The EXIAL wallet is the identity, payment, and loyalty engine that every participant carries — from first onboarding to every transaction across the platform.", cta1:"Activate Wallet Access", cta2:"See Token Utility",
    defHeadline:"Not a fintech app. An infrastructure wallet.", defLead:"The EXIAL wallet is the persistent identity and settlement layer that connects users to every module — hotels, events, travel, loyalty, and community commerce.", defBullets:["Token balance, rewards, and fiat rails in one account","Cross-border utility with unified identity verification","Programmable escrow and embedded payment permissions"],
    whyProblem:"Users carry 4–6 apps to manage rewards, payments, and bookings. None of them talk to each other. Merchants lose conversions. Platforms lose retention.", whyPoints:["EXIAL wallet consolidates all value into one persistent account","Merchants get conversion rates 2x higher at checkout","Platform data compounds — every transaction improves targeting and offers"],
    steps:[{num:"01",title:"Onboard",body:"Identity capture, KYC, and wallet provisioning in a single guided flow.",icon:Users},{num:"02",title:"Fund",body:"Deposit fiat, receive tokens, or earn rewards through platform activity.",icon:BadgeDollarSign},{num:"03",title:"Transact",body:"Use wallet balance across hotels, events, travel, and commerce.",icon:Globe2},{num:"04",title:"Compound",body:"Every transaction earns rewards that compound into status and access.",icon:LineChart}],
    caps:[{icon:Wallet,title:"Token Custody",body:"Secure storage of EXIAL tokens with programmable spending rules.",accent:COMMON.blue},{icon:Globe2,title:"Cross-Border Utility",body:"Spend and earn across jurisdictions with automatic currency handling.",accent:COMMON.purple},{icon:Users,title:"Identity Layer",body:"KYC-verified identity that travels with the wallet across every module.",accent:COMMON.cyan},{icon:BadgeDollarSign,title:"Rewards Balance",body:"Unified rewards from hotels, events, telecom, and commerce.",accent:COMMON.blue},{icon:ShieldCheck,title:"Embedded Payment Rails",body:"ACH, card, and crypto rails embedded behind one checkout interface.",accent:COMMON.purple},{icon:Network,title:"Programmable Permissions",body:"Account-level controls for spending limits, escrow, and business rules.",accent:COMMON.cyan}],
    useCases:[{tab:"Consumer",headline:"One wallet for every experience",body:"From booking a hotel to buying event tickets to earning telecom rewards — one balance, one identity, one checkout."},{tab:"Enterprise",headline:"Corporate wallet management",body:"Issue team wallets with spending rules, approve transactions, and get real-time reporting across every category."},{tab:"Municipal",headline:"Benefit distribution via wallet",body:"Cities distribute housing assistance, service credits, and program benefits directly into participant wallets with full audit."}],
    proofStats:[{value:"1",label:"Wallet for all verticals"},{value:"Real-time",label:"Settlement speed"},{value:"Unified",label:"Identity layer"},{value:"Programmable",label:"Spending logic"}],
    footerH:"Activate your wallet access.", footerLead:"Join the EXIAL network and put your identity, value, and access into one persistent infrastructure wallet.",
  },
  loyalty: {
    eyebrow:"Loyalty & Participation", h1:"From points to participation.", lead:"EXIAL replaces the broken points model with token-based ownership that accumulates value, unlocks access, and converts participation into real economic benefit.", cta1:"See Token Utility", cta2:"Explore Wallet",
    defHeadline:"Loyalty that compounds instead of expiring.", defLead:"Traditional loyalty programs create liability on the brand balance sheet and frustration for the user. EXIAL tokens are real assets that appreciate with platform growth.", defBullets:["Earn tokens on every hotel booking, event purchase, and commerce transaction","Redeem across every vertical — no category restrictions","Hold for status, access, and platform governance participation"],
    whyProblem:"Airline miles expire. Hotel points devalue. Credit card rewards disappear into a maze of blackout dates. Participants have been trained to distrust loyalty programs.", whyPoints:["EXIAL tokens are real — spendable, transferable, and appreciating","No expiration, no blackout dates, no redemption friction","Status tiers unlock access that money alone cannot purchase"],
    steps:[{num:"01",title:"Earn",body:"Every eligible transaction on the EXIAL platform earns token rewards automatically.",icon:BadgeDollarSign},{num:"02",title:"Accumulate",body:"Tokens compound in your wallet and increase status tier based on activity.",icon:LineChart},{num:"03",title:"Redeem",body:"Apply tokens at checkout across hotels, events, travel, and commerce.",icon:Wallet},{num:"04",title:"Hold",body:"Long-term holders access exclusive rates, early inventory, and governance rights.",icon:ShieldCheck}],
    caps:[{icon:BadgeDollarSign,title:"Earn Logic",body:"Configurable earn rates per category, partner, and transaction type.",accent:COMMON.blue},{icon:Wallet,title:"Redemption",body:"One-click redemption at checkout without conversion math.",accent:COMMON.purple},{icon:LineChart,title:"Status Tiers",body:"Participation-based status that unlocks access and pricing advantages.",accent:COMMON.cyan},{icon:ShieldCheck,title:"Governance Rights",body:"Token holders participate in platform decisions and fee structures.",accent:COMMON.blue},{icon:Users,title:"Partner Rewards",body:"Earn across the partner ecosystem — not just EXIAL-native transactions.",accent:COMMON.purple},{icon:Globe2,title:"Cross-Border",body:"Token value travels globally with unified redemption everywhere.",accent:COMMON.cyan}],
    useCases:[{tab:"Consumer",headline:"Earn on everything, redeem on anything",body:"Book a hotel Monday, earn tokens. Use them Friday for event tickets. No category fences."},{tab:"Enterprise",headline:"Corporate loyalty management",body:"Track team spending, distribute rewards, and redeem for business travel — all managed through one enterprise dashboard."},{tab:"Partner",headline:"Drive spend with token incentives",body:"Partners configure earn multipliers to increase engagement and drive repeat bookings without discounting margin."}],
    proofStats:[{value:"No",label:"Expiration dates"},{value:"All",label:"Verticals eligible"},{value:"Real",label:"Token value"},{value:"Compounding",label:"Status model"}],
    footerH:"Move beyond the points game.", footerLead:"EXIAL tokens are not rewards — they are ownership. Start earning and compounding your position in the platform.",
  },
  events: {
    eyebrow:"Event Infrastructure", h1:"A unified engine for the experience economy.", lead:"EXIAL powers every layer of the live experience — from ticket distribution and hospitality bundling to on-site commerce and post-event loyalty conversion.", cta1:"Launch an Event", cta2:"View Capabilities",
    defHeadline:"Events monetized at every touchpoint.", defLead:"The EXIAL event infrastructure layer treats each live experience as a multi-revenue environment — from pre-sale to post-event — with full visibility and control.", defBullets:["Ticket distribution with direct-to-fan wallet delivery","Hospitality bundles connected to hotel room blocks","On-site commerce settled through the EXIAL rail"],
    whyProblem:"Event organizers rely on 4–6 vendors for ticketing, hospitality, merchandise, and access control. Each takes a cut. None share data. The post-event relationship disappears.", whyPoints:["EXIAL consolidates ticketing, hospitality, merch, and commerce","Every fan becomes a wallet holder with future redemption potential","Post-event data drives repeat attendance and loyalty conversion"],
    steps:[{num:"01",title:"Configure",body:"Set up ticketing tiers, hospitality packages, and sponsor activations.",icon:LayoutDashboard},{num:"02",title:"Distribute",body:"Tickets deliver directly to fan wallets with embedded access credentials.",icon:Network},{num:"03",title:"Activate",body:"On-site commerce, food, merchandise, and access settle through EXIAL.",icon:BadgeDollarSign},{num:"04",title:"Convert",body:"Post-event loyalty triggers engage fans for future events and platform participation.",icon:Wallet}],
    caps:[{icon:BadgeDollarSign,title:"Ticket Distribution",body:"Direct-to-wallet ticket delivery with anti-scalping and resale logic.",accent:COMMON.blue},{icon:Building2,title:"Hospitality Bundles",body:"Package hotel rooms with event access for premium tier buyers.",accent:COMMON.purple},{icon:Network,title:"Sponsor Activations",body:"Branded sponsor modules with measurable engagement and token distribution.",accent:COMMON.cyan},{icon:ShieldCheck,title:"Access Control",body:"Credential-gated entry with real-time capacity and fraud detection.",accent:COMMON.blue},{icon:Globe2,title:"On-Site Commerce",body:"Merchandise, food, upgrades, and experiences settled through EXIAL.",accent:COMMON.purple},{icon:LineChart,title:"Post-Event Analytics",body:"Full attendee behavior, spend, and loyalty data in one dashboard.",accent:COMMON.cyan}],
    useCases:[{tab:"Concerts",headline:"Artist and venue monetization",body:"Sell tickets, VIP packages, hospitality, and merchandise through one EXIAL-powered experience with full post-event loyalty capture."},{tab:"Sports",headline:"Stadium and league integration",body:"EXIAL handles ticketing, seat upgrades, stadium commerce, and fan wallet activation across an entire game-day experience."},{tab:"Enterprise",headline:"Corporate event deployment",body:"Private conferences, incentive trips, and brand activations managed through EXIAL with attendee wallets, access control, and spend tracking."}],
    proofStats:[{value:"All",label:"Revenue layers covered"},{value:"Direct",label:"Fan wallet delivery"},{value:"Real-time",label:"On-site settlement"},{value:"Post-event",label:"Loyalty capture"}],
    footerH:"Monetize every moment.", footerLead:"Launch your next event on the EXIAL infrastructure and turn every touchpoint into a revenue and retention opportunity.",
  },
  travel: {
    eyebrow:"Travel Layer", h1:"Travel, rebuilt around control.", lead:"EXIAL creates a direct distribution model for travel — connecting airlines, hotels, experiences, and ground transport into one wallet-native booking environment.", cta1:"Book Through EXIAL", cta2:"View Inventory",
    defHeadline:"Distribution without the middleman.", defLead:"The EXIAL travel layer operates as a direct booking engine with token rewards, loyalty-linked pricing, and enterprise account management built in.", defBullets:["Direct hotel and flight inventory without OTA commissions","Route-based opportunity mapping for enterprise travel programs","Token-linked pricing with loyalty upgrade triggers"],
    whyProblem:"Corporate travel managers use five platforms to book, track, and report. Leisure travelers overpay OTAs. In both cases, the booking relationship — and the loyalty — belongs to someone else.", whyPoints:["EXIAL puts inventory, relationship, and data back with the operator","Travelers earn on every booking and redeem across the entire platform","Enterprise accounts get unified reporting, approval workflows, and rate management"],
    steps:[{num:"01",title:"Search",body:"Browse direct inventory from hotel and airline partners without OTA markups.",icon:Globe2},{num:"02",title:"Configure",body:"Apply wallet credits, loyalty status, and corporate rates in one step.",icon:Wallet},{num:"03",title:"Book",body:"Confirm and settle through the EXIAL wallet with instant confirmation.",icon:ShieldCheck},{num:"04",title:"Earn",body:"Every booking generates tokens that compound toward status and future travel.",icon:BadgeDollarSign}],
    caps:[{icon:Building2,title:"Direct Hotel Inventory",body:"Room blocks and real-time rates from partner properties worldwide.",accent:COMMON.blue},{icon:Globe2,title:"Route Mapping",body:"City-node distribution logic that surfaces relevant inventory by route.",accent:COMMON.purple},{icon:BadgeDollarSign,title:"Token Pricing",body:"Loyalty-triggered discounts and upgrade offers based on wallet status.",accent:COMMON.cyan},{icon:Wallet,title:"Loyalty Booking",body:"Apply token balance directly at checkout without conversion.",accent:COMMON.blue},{icon:BriefcaseBusiness,title:"Enterprise Travel",body:"Team accounts with approval flows, spending controls, and full reporting.",accent:COMMON.purple},{icon:LineChart,title:"Spend Analytics",body:"Real-time travel spend data by team, route, and category.",accent:COMMON.cyan}],
    useCases:[{tab:"Leisure",headline:"Travelers earn on every booking",body:"Book directly, earn tokens, and redeem for upgrades, events, and experiences — all from one wallet."},{tab:"Corporate",headline:"Enterprise travel management",body:"Issue team accounts, set approval rules, and get real-time reporting across all bookings without a dedicated TMC."},{tab:"Operators",headline:"Hotels and airlines own the relationship",body:"Connect inventory to EXIAL and reach direct-booking travelers without paying OTA commission."}],
    proofStats:[{value:"0%",label:"OTA commission"},{value:"Direct",label:"Inventory access"},{value:"Unified",label:"Loyalty + booking"},{value:"Enterprise",label:"Account management"}],
    footerH:"Book through EXIAL.", footerLead:"Connect your travel program — or your inventory — to a distribution layer that puts value, control, and data back where it belongs.",
  },
  access: {
    eyebrow:"Dashboard & Access", h1:"Your command layer for participation.", lead:"The EXIAL dashboard gives individuals, enterprises, and operators a unified view of their position — wallet, bookings, analytics, permissions, and deal access in one interface.", cta1:"Enter Dashboard", cta2:"Request Access",
    defHeadline:"One interface. Every layer of the platform.", defLead:"The EXIAL dashboard is not a portal — it is an operational command center that surfaces the right information and actions for every user type.", defBullets:["Real-time wallet balance, token position, and spending history","Booking management across hotels, events, and travel","Partner and enterprise admin views with team permissions"],
    whyProblem:"Enterprise users navigate five platforms to manage travel, rewards, payments, and reporting. There is no single source of truth — only data fragmentation and wasted time.", whyPoints:["EXIAL surfaces every relevant metric and action in one authenticated session","Role-based views surface the right data for operators, admins, and users","Permissions, limits, and approvals managed without third-party tools"],
    steps:[{num:"01",title:"Authenticate",body:"Single sign-on with wallet-native identity and role assignment.",icon:ShieldCheck},{num:"02",title:"View",body:"Real-time position across wallet, bookings, rewards, and analytics.",icon:LayoutDashboard},{num:"03",title:"Act",body:"Initiate bookings, approve transactions, and manage team access from one panel.",icon:Network},{num:"04",title:"Analyze",body:"Export reports, review spending patterns, and optimize participation strategy.",icon:LineChart}],
    caps:[{icon:LineChart,title:"Transaction History",body:"Complete ledger of spending, earnings, and settlement across all categories.",accent:COMMON.blue},{icon:LayoutDashboard,title:"Dashboard Intelligence",body:"Personalized analytics surface patterns and optimization opportunities.",accent:COMMON.purple},{icon:Building2,title:"Booking Records",body:"Full booking history with modification, cancellation, and resale options.",accent:COMMON.cyan},{icon:Wallet,title:"Wallet Management",body:"Fund, withdraw, allocate, and track token and fiat positions.",accent:COMMON.blue},{icon:Users,title:"Team Permissions",body:"Role-based access control for enterprise and partner organizations.",accent:COMMON.purple},{icon:ShieldCheck,title:"Audit & Compliance",body:"Full audit trail export for finance, compliance, and governance.",accent:COMMON.cyan}],
    useCases:[{tab:"Consumer",headline:"Personal participation dashboard",body:"See your token balance, upcoming bookings, loyalty status, and available rewards in one clean interface."},{tab:"Enterprise",headline:"Team and spend management",body:"Manage employee wallets, approve bookings, set spending rules, and export financial reports — all in one admin view."},{tab:"Operator",headline:"Partner and inventory management",body:"Track inventory performance, booking volume, revenue splits, and partner analytics from the operator dashboard."}],
    proofStats:[{value:"Real-time",label:"Data refresh"},{value:"Role-based",label:"Access control"},{value:"Unified",label:"View across verticals"},{value:"Full",label:"Audit trail"}],
    footerH:"Enter your command layer.", footerLead:"Request access to the EXIAL dashboard and get full visibility into your position across every platform vertical.",
  },
  partners: {
    eyebrow:"Partner Integration", h1:"Plug into distribution that does more than distribute.", lead:"EXIAL is an open integration layer for hotels, brands, operators, cities, and institutions — each receiving a purpose-built integration model with defined economics.", cta1:"Become a Partner", cta2:"View Integration Docs",
    defHeadline:"Every partner type. One ecosystem.", defLead:"EXIAL partners are not vendors. They are nodes in an integrated commerce network where every connection increases value for every other participant.", defBullets:["Hospitality partners connect inventory and receive direct-booking demand","Event operators access wallet-native ticketing and loyalty infrastructure","Municipal entities deploy service and benefit distribution rails"],
    whyProblem:"Hotels, brands, and cities all need distribution but receive it from platforms that extract value rather than create it. Every OTA, ticketing giant, and benefits portal takes margin and owns the customer.", whyPoints:["EXIAL partners keep the customer relationship and the data","Revenue splits are transparent, immediate, and on-chain","Each new partner strengthens the network for every existing partner"],
    steps:[{num:"01",title:"Evaluate",body:"Review the integration model, revenue structure, and technical requirements.",icon:BriefcaseBusiness},{num:"02",title:"Connect",body:"API integration with inventory, identity, or benefit systems.",icon:Network},{num:"03",title:"Activate",body:"Launch with demand from the EXIAL participant network.",icon:Globe2},{num:"04",title:"Optimize",body:"Real-time data and analytics to improve conversion and yield.",icon:LineChart}],
    caps:[{icon:Building2,title:"Hospitality Partners",body:"Hotels and resorts connect inventory for direct-booking demand and token rewards.",accent:COMMON.blue},{icon:BadgeDollarSign,title:"Event Operators",body:"Venues and promoters access wallet-native ticketing with loyalty conversion.",accent:COMMON.purple},{icon:Globe2,title:"Travel & Transport",body:"Airlines, ground transport, and experience providers join the distribution layer.",accent:COMMON.cyan},{icon:Landmark,title:"Municipal Entities",body:"Cities and agencies deploy benefit, service, and housing program integration.",accent:COMMON.blue},{icon:BriefcaseBusiness,title:"Enterprise Licensees",body:"Corporations license the EXIAL rail for private commerce ecosystems.",accent:COMMON.purple},{icon:Users,title:"Product Brands",body:"Consumer brands deploy loyalty programs on the EXIAL participation engine.",accent:COMMON.cyan}],
    useCases:[{tab:"Hotels",headline:"Hotels join as direct distribution nodes",body:"Connect room inventory, set token earn rates, and receive direct bookings with zero OTA commission and full customer data."},{tab:"Municipal",headline:"Cities deploy as service partners",body:"Municipal agencies integrate benefit distribution, housing program management, and service delivery through the EXIAL wallet infrastructure."},{tab:"Enterprise",headline:"Corporations license the rail",body:"Deploy a branded commerce layer for employees, customers, or communities using EXIAL infrastructure with custom economics."}],
    proofStats:[{value:"Open",label:"Integration API"},{value:"Direct",label:"Revenue split"},{value:"Transparent",label:"On-chain economics"},{value:"All types",label:"Partner categories"}],
    footerH:"Become an EXIAL partner.", footerLead:"Whether you are a hotel, operator, brand, city, or institution — there is an integration model built for your participation.",
  },
  capital: {
    eyebrow:"Capital & Investment", h1:"Infrastructure, structured for capital.", lead:"EXIAL is not a startup seeking attention — it is an integrated infrastructure platform with real asset backing, recurring economics, and a structured path to capital deployment.", cta1:"Enter Deal Room", cta2:"Request Investor Brief",
    defHeadline:"Where platform economics meet structured participation.", defLead:"EXIAL presents three coordinated revenue engines — real assets, telecom distribution, and token-enabled commerce — each reinforcing the other and each presenting a distinct capital opportunity.", defBullets:["Governance-driven real estate with embedded equity positioning","MVNO subscriber economics generating recurring revenue","Token treasury mechanics tied to platform activity and growth"],
    whyProblem:"Most digital platforms offer equity upside with no asset backing and no floor. Institutional capital increasingly requires infrastructure fundamentals — something to anchor valuation in the real world.", whyPoints:["EXIAL combines physical assets, recurring telecom revenue, and token appreciation","Each capital layer is separable for structured participation","Platform activity directly increases treasury value and asset absorption"],
    steps:[{num:"01",title:"Review",body:"Access the platform overview, deal structure, and financial architecture.",icon:BriefcaseBusiness},{num:"02",title:"Evaluate",body:"Examine the three revenue engines and the capital thesis for each.",icon:LineChart},{num:"03",title:"Structure",body:"Participate through equity, token allocation, or asset co-investment.",icon:Landmark},{num:"04",title:"Monitor",body:"Real-time visibility into platform metrics, treasury position, and deal progress.",icon:LayoutDashboard}],
    caps:[{icon:LandPlot,title:"Real Asset Backing",body:"Subdivision, assemblage, and housing-oriented acquisitions at embedded equity positions.",accent:COMMON.blue},{icon:RadioTower,title:"Telecom Revenue",body:"MVNO subscriber economics with recurring revenue and scalable distribution.",accent:COMMON.purple},{icon:BadgeDollarSign,title:"Token Participation",body:"Token allocation tied to platform treasury growth and commerce activity.",accent:COMMON.cyan},{icon:Landmark,title:"Deal Room Access",body:"Gated investor portal with term sheets, use of capital, and deal tracker.",accent:COMMON.blue},{icon:LineChart,title:"Revenue Architecture",body:"Three coordinated engines: assets, telecom, and commerce settlement.",accent:COMMON.purple},{icon:ShieldCheck,title:"Institutional Posture",body:"Governance, compliance, and reporting designed for institutional participation.",accent:COMMON.cyan}],
    useCases:[{tab:"Institutional",headline:"Institutional infrastructure investment",body:"Participate in a platform with real asset backing, recurring subscriber revenue, and token treasury mechanics — not pure speculative equity."},{tab:"Family Office",headline:"Diversified platform participation",body:"Three separable capital layers allow family offices to participate in the asset, telecom, or token component independently."},{tab:"Strategic",headline:"Strategic co-investment",body:"Hospitality, telecom, or technology companies co-invest to secure distribution access, licensing rights, and token allocation."}],
    proofStats:[{value:"3",label:"Capital layers"},{value:"Real",label:"Asset backing"},{value:"Recurring",label:"Telecom revenue"},{value:"Structured",label:"Deal access"}],
    footerH:"Enter the Deal Room.", footerLead:"EXIAL investor access is gated. Request a briefing and we will determine the right conversation from there.",
  },
  municipal: {
    eyebrow:"Municipal Deployment", h1:"Infrastructure for cities that need more than software.", lead:"EXIAL gives municipalities a deployable technology layer for service delivery, housing access, benefit distribution, and community participation — backed by institutional-grade rails.", cta1:"Schedule Municipal Briefing", cta2:"View Case Model",
    defHeadline:"Cities need infrastructure. Not another app.", defLead:"Municipal programs fail when they rely on disconnected software that cannot communicate across departments. EXIAL is a single rail for every service and benefit a city needs to deliver.", defBullets:["Housing program management with participant progression tracking","Benefit and service credit distribution via participant wallets","Transparent reporting and audit trails for public accountability"],
    whyProblem:"Cities operate 12+ disparate platforms for housing, benefits, services, and reporting. Data does not move between them. Participants fall through the gaps. Outcomes are unmeasurable.", whyPoints:["EXIAL connects housing, services, and benefits on one authenticated participant layer","Every interaction is tracked, auditable, and reportable in real time","Private sector participation generates revenue that offsets program cost"],
    steps:[{num:"01",title:"Configure",body:"Map housing programs, service categories, and benefit distribution rules.",icon:LayoutDashboard},{num:"02",title:"Onboard",body:"Participants enter through device-led onboarding with wallet and identity.",icon:Users},{num:"03",title:"Deliver",body:"Service credits, benefits, and housing progression tracked in real time.",icon:ShieldCheck},{num:"04",title:"Report",body:"Transparent dashboards for city administrators and public accountability.",icon:LineChart}],
    caps:[{icon:Building2,title:"Housing Integration",body:"R.I.S.E.-aligned progression tracking for housing readiness and placement.",accent:COMMON.blue},{icon:BadgeDollarSign,title:"Benefit Distribution",body:"Token-based benefit and service credit delivery direct to participant wallets.",accent:COMMON.purple},{icon:Leaf,title:"Service Delivery",body:"Connect city services to the participation layer for tracked engagement.",accent:COMMON.cyan},{icon:ShieldCheck,title:"Transparency",body:"Public-facing dashboards with program outcomes and spend reporting.",accent:COMMON.blue},{icon:MapPin,title:"Geographic Coverage",body:"Neighborhood-level deployment with local node management.",accent:COMMON.purple},{icon:Users,title:"Private Sector",body:"Enterprise participation generates revenue that reduces municipal cost.",accent:COMMON.cyan}],
    useCases:[{tab:"Housing",headline:"Housing access and progression",body:"Track participant progression from onboarding through savings, stabilization, and housing placement with full data visibility for administrators."},{tab:"Benefits",headline:"Benefit and service credit delivery",body:"Distribute food, transportation, healthcare, and housing assistance credits directly to participant wallets — replacing paper vouchers and card systems."},{tab:"Enterprise",headline:"Private sector participation",body:"Corporations partner with the municipality to fund program components in exchange for workforce access, branding, and tax participation benefits."}],
    proofStats:[{value:"Unified",label:"Program layer"},{value:"Real-time",label:"Outcome tracking"},{value:"Auditable",label:"Public reporting"},{value:"Scalable",label:"Deployment model"}],
    footerH:"Brief your city team.", footerLead:"Schedule a municipal briefing with the EXIAL infrastructure team and see how the platform maps to your program objectives.",
  },
  community: {
    eyebrow:"Community & Participation", h1:"Participation at the network edge.", lead:"EXIAL onboards communities — not just users — and gives every participant a wallet, an identity, and a pathway into the full platform economy.", cta1:"Join the Network", cta2:"Explore Wallet",
    defHeadline:"The network grows at the edge.", defLead:"The most powerful distribution advantage in commerce is organic community participation. EXIAL is designed so that every new participant strengthens the network for every existing participant.", defBullets:["Device-led onboarding with instant wallet activation and identity","Community marketplace for local commerce on the EXIAL rail","Participation loops that convert engagement into status and access"],
    whyProblem:"Most platforms onboard individuals but fail to activate communities. Without community-level engagement, churn is high, network effects are slow, and loyalty is shallow.", whyPoints:["EXIAL onboards at the community level with shared benefit design","Every participant earns, every transaction builds the ecosystem","Community leaders and advocates earn referral and participation rewards"],
    steps:[{num:"01",title:"Join",body:"Download, activate, and complete wallet onboarding in under three minutes.",icon:Users},{num:"02",title:"Earn",body:"Every community interaction — purchases, referrals, participation — earns tokens.",icon:BadgeDollarSign},{num:"03",title:"Access",body:"Use wallet to access hotels, events, travel, services, and marketplace.",icon:Globe2},{num:"04",title:"Advance",body:"Participation history drives status, access tiers, and housing readiness.",icon:LineChart}],
    caps:[{icon:Users,title:"Community Onboarding",body:"Group onboarding flows for housing programs, employers, and community organizations.",accent:COMMON.blue},{icon:Globe2,title:"Marketplace",body:"Local commerce on the EXIAL rail — buy, sell, and earn tokens in your community.",accent:COMMON.purple},{icon:BadgeDollarSign,title:"Reward Access",body:"Token-linked rewards for community engagement, referrals, and loyalty.",accent:COMMON.cyan},{icon:LineChart,title:"Participation Loops",body:"Engagement pathways that convert activity into status and economic opportunity.",accent:COMMON.blue},{icon:ShieldCheck,title:"Digital Inclusion",body:"Device-agnostic onboarding designed for underserved and unbanked participants.",accent:COMMON.purple},{icon:Network,title:"Network Effect",body:"Each new participant strengthens value for every existing participant.",accent:COMMON.cyan}],
    useCases:[{tab:"Residents",headline:"Community residents earn and access",body:"Onboard with your wallet, earn on every transaction, access housing programs, and participate in the community marketplace."},{tab:"Organizations",headline:"Community orgs deploy programs",body:"Nonprofit and civic organizations use EXIAL to distribute benefits, track engagement, and measure program outcomes."},{tab:"Employers",headline:"Workforce participation programs",body:"Employers onboard teams, distribute rewards, and connect workers to housing and service access through EXIAL."}],
    proofStats:[{value:"3 min",label:"Onboarding time"},{value:"All",label:"Community types"},{value:"Inclusive",label:"Design standard"},{value:"Network",label:"Compounding value"}],
    footerH:"Join the network.", footerLead:"Participation starts with a wallet. Activate yours and enter a commerce ecosystem built to reward engagement at every level.",
  },
};

// ── Shared primitives ────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  const T = useT();
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
      style={{ border:`1px solid ${T.eyebrowBorder}`, background:T.eyebrowBg, color:T.eyebrowText }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background:T.blue }} />{children}
    </div>
  );
}
function PBtn({ children, onClick, className="" }: { children:React.ReactNode; onClick?:()=>void; className?:string }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 ${className}`}
      style={{ background:`linear-gradient(135deg,${COMMON.blue} 0%,#4F8EFF 100%)` }}>{children}</button>
  );
}
function GBtn({ children, onClick, className="" }: { children:React.ReactNode; onClick?:()=>void; className?:string }) {
  const T = useT();
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition hover:opacity-80 ${className}`}
      style={{ border:`1px solid ${T.blueBorder}`, background:T.blueDim, color:T.text }}>{children}</button>
  );
}
function Card({ children, className="" }: { children:React.ReactNode; className?:string }) {
  const T = useT();
  return (
    <div className={`rounded-[22px] ${className}`}
      style={{ background:T.cardBg, border:`1px solid ${T.blueBorder}`, backdropFilter:"blur(14px)" }}>{children}</div>
  );
}

// ── Nav ──────────────────────────────────────────────────────────────────────
function PlatformNav() {
  const T = useT(); const toggle = useToggle();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const links = [
    { label:"Home",      to:"/" },
    { label:"Platform",  to:"/platform/explained" },
    { label:"Booking",   to:"/platform/booking" },
    { label:"Wallet",    to:"/platform/wallet" },
    { label:"Partners",  to:"/platform/partners" },
    { label:"Capital",   to:"/platform/capital" },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ borderBottom:`1px solid ${T.blueBorder}`, background:T.navBg }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background:T.blueDim, border:`1px solid ${T.blueBorder}` }}>
            <Layers3 className="h-5 w-5" style={{ color:T.blue }} />
          </div>
          <div>
            <div className="text-sm font-bold tracking-[0.22em]" style={{ color:T.text }}>EXIAL</div>
            <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color:T.muted }}>TPG Infrastructure</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(l => <Link key={l.label} to={l.to} className="text-sm transition hover:opacity-100" style={{ color:T.muted }}>{l.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button onClick={toggle} className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:opacity-80"
            style={{ border:`1px solid ${T.blueBorder}`, background:T.blueDim }} aria-label="Toggle theme">
            {T.isDark ? <Sun className="h-4 w-4" style={{ color:"#FCD34D" }} /> : <Moon className="h-4 w-4" style={{ color:T.blue }} />}
          </button>
          <GBtn onClick={() => navigate("/platform/access")}>Request Briefing</GBtn>
          <PBtn onClick={() => navigate("/platform/capital")}>Enter Deal Room</PBtn>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggle} className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ border:`1px solid ${T.blueBorder}`, background:T.blueDim }}>
            {T.isDark ? <Sun className="h-4 w-4" style={{ color:"#FCD34D" }} /> : <Moon className="h-4 w-4" style={{ color:T.blue }} />}
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ border:`1px solid ${T.blueBorder}`, background:T.blueDim, color:T.text }} onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div style={{ borderTop:`1px solid ${T.blueBorder}`, background:T.navBg }} className="md:hidden">
          <div className="flex flex-col gap-4 px-4 py-4">
            {links.map(l => <Link key={l.label} to={l.to} className="text-sm" style={{ color:T.text }} onClick={() => setOpen(false)}>{l.label}</Link>)}
          </div>
        </div>
      )}
    </header>
  );
}

// ── Hero visual (abstract CSS diagram) ───────────────────────────────────────
function HeroVisual({ cfg }: { cfg: PageCfg }) {
  const T = useT();
  return (
    <div className="overflow-hidden rounded-[28px] shadow-[0_20px_80px_rgba(43,108,255,0.12)]"
      style={{ border:`1px solid ${T.blueBorder}`, background:T.cardSolid, backdropFilter:"blur(20px)" }}>
      <div className="p-5" style={{ borderBottom:`1px solid ${T.blueBorder}` }}>
        <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color:T.muted }}>Platform Module</div>
        <div className="mt-1 text-lg font-semibold" style={{ color:T.text }}>{cfg.eyebrow}</div>
      </div>
      <div className="grid grid-cols-2 gap-3 p-5">
        {cfg.caps.slice(0,4).map((c,i) => {
          const Icon = c.icon; const ac = c.accent ?? COMMON.blue;
          return (
            <div key={i} className="rounded-2xl p-4" style={{ background:`${ac}0D`, border:`1px solid ${ac}22` }}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background:`${ac}18`, border:`1px solid ${ac}30` }}>
                <Icon className="h-4 w-4" style={{ color:ac }} />
              </div>
              <div className="mt-3 text-xs font-semibold" style={{ color:T.text }}>{c.title}</div>
              <div className="mt-1 text-[11px] leading-4" style={{ color:T.muted }}>{c.body.split('.')[0]}.</div>
            </div>
          );
        })}
      </div>
      <div className="mx-5 mb-5 rounded-2xl p-4" style={{ background:T.blueDim, border:`1px solid ${T.blueBorder}` }}>
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium" style={{ color:T.eyebrowText }}>EXIAL Infrastructure Layer</div>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background:T.eyebrowBg, color:T.eyebrowText }}>Active</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Settlement","Identity","Distribution","Access"].map(tag => (
            <span key={tag} className="rounded-full px-2 py-0.5 text-[10px]" style={{ background:T.cardBg, border:`1px solid ${T.blueBorder}`, color:T.muted }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page sections ────────────────────────────────────────────────────────────
function PageHero({ cfg }: { cfg: PageCfg }) {
  const T = useT();
  return (
    <section className="relative overflow-hidden" style={{ borderBottom:`1px solid ${T.blueBorder}` }}>
      <div className="pointer-events-none absolute -left-60 -top-60 h-[600px] w-[600px] rounded-full"
        style={{ background:`radial-gradient(circle,${T.aurora1} 0%,transparent 65%)`, filter:"blur(100px)" }} />
      <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full"
        style={{ background:`radial-gradient(circle,${T.aurora2} 0%,transparent 65%)`, filter:"blur(100px)" }} />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
        <div className="relative z-10 lg:col-span-7">
          <Eyebrow>{cfg.eyebrow}</Eyebrow>
          <motion.h1 initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]" style={{ color:T.text }}>
            {cfg.h1}
          </motion.h1>
          <p className="mt-6 max-w-2xl text-base leading-7 sm:text-lg" style={{ color:T.muted }}>{cfg.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PBtn>{cfg.cta1} <ArrowRight className="h-4 w-4" /></PBtn>
            <GBtn>{cfg.cta2}</GBtn>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {cfg.proofStats.map(s => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background:T.cardBg, border:`1px solid ${T.blueBorder}` }}>
                <div className="text-xl font-bold" style={{ color:T.text }}>{s.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.15em]" style={{ color:T.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 lg:col-span-5"><HeroVisual cfg={cfg} /></div>
      </div>
    </section>
  );
}

function DefinitionSection({ cfg }: { cfg: PageCfg }) {
  const T = useT();
  return (
    <section className="py-20" style={{ borderBottom:`1px solid ${T.blueBorder}` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>What Is This</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight" style={{ color:T.text }}>{cfg.defHeadline}</h2>
            <p className="mt-4 text-base leading-7" style={{ color:T.muted }}>{cfg.defLead}</p>
          </div>
          <div className="space-y-4">
            {cfg.defBullets.map(b => (
              <div key={b} className="flex gap-4 rounded-2xl p-5" style={{ background:T.cardBg, border:`1px solid ${T.blueBorder}` }}>
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color:T.blue }} />
                <span className="text-sm leading-7" style={{ color:T.subtle }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyItMatters({ cfg }: { cfg: PageCfg }) {
  const T = useT();
  return (
    <section className="py-20" style={{ borderBottom:`1px solid ${T.blueBorder}` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <Card className="p-8">
            <Eyebrow>The Problem</Eyebrow>
            <h3 className="mt-2 text-xl font-semibold" style={{ color:T.text }}>The legacy model</h3>
            <p className="mt-4 text-sm leading-7" style={{ color:T.muted }}>{cfg.whyProblem}</p>
          </Card>
          <div>
            <Eyebrow>Why EXIAL</Eyebrow>
            <h3 className="mt-2 text-xl font-semibold" style={{ color:T.text }}>A better architecture</h3>
            <div className="mt-6 space-y-4">
              {cfg.whyPoints.map(p => (
                <div key={p} className="flex gap-3 text-sm" style={{ color:T.subtle }}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color:T.blue }} /><span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ cfg }: { cfg: PageCfg }) {
  const T = useT();
  return (
    <section className="py-20" style={{ borderBottom:`1px solid ${T.blueBorder}` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight" style={{ color:T.text }}>From integration to outcome.</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cfg.steps.map(s => {
            const Icon = s.icon;
            return (
              <Card key={s.num} className="p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-xs font-bold tracking-wider"
                    style={{ background:T.eyebrowBg, border:`1px solid ${T.eyebrowBorder}`, color:T.eyebrowText }}>{s.num}</span>
                  <Icon className="h-5 w-5" style={{ color:T.blue }} />
                </div>
                <div className="mt-5 text-lg font-semibold" style={{ color:T.text }}>{s.title}</div>
                <p className="mt-3 text-sm leading-6" style={{ color:T.muted }}>{s.body}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesGrid({ cfg }: { cfg: PageCfg }) {
  const T = useT();
  return (
    <section className="py-20" style={{ borderBottom:`1px solid ${T.blueBorder}` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Eyebrow>Capabilities</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight" style={{ color:T.text }}>What it unlocks.</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cfg.caps.map(c => {
            const Icon = c.icon; const ac = c.accent ?? COMMON.blue;
            return (
              <Card key={c.title} className="p-6 transition-all hover:shadow-[0_8px_40px_rgba(43,108,255,0.10)] hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background:`${ac}18`, border:`1px solid ${ac}30` }}>
                  <Icon className="h-5 w-5" style={{ color:ac }} />
                </div>
                <div className="mt-5 text-lg font-semibold" style={{ color:T.text }}>{c.title}</div>
                <p className="mt-3 text-sm leading-6" style={{ color:T.muted }}>{c.body}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection({ cfg }: { cfg: PageCfg }) {
  const T = useT();
  const [active, setActive] = useState(0);
  const uc = cfg.useCases[active];
  return (
    <section className="py-20" style={{ borderBottom:`1px solid ${T.blueBorder}` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow>Use Cases</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight" style={{ color:T.text }}>Built for every participant type.</h2>
        <div className="mt-8 inline-flex rounded-2xl p-1" style={{ background:T.cardBg, border:`1px solid ${T.blueBorder}` }}>
          {cfg.useCases.map((u,i) => (
            <button key={u.tab} onClick={() => setActive(i)}
              className="rounded-xl px-4 py-2 text-sm font-medium transition-all"
              style={active===i ? { background:T.blue, color:"#fff" } : { color:T.muted, background:"transparent" }}>
              {u.tab}
            </button>
          ))}
        </div>
        <Card className="mt-6 max-w-3xl p-8">
          <h3 className="text-xl font-semibold" style={{ color:T.text }}>{uc.headline}</h3>
          <p className="mt-4 text-base leading-7" style={{ color:T.muted }}>{uc.body}</p>
        </Card>
      </div>
    </section>
  );
}

function CtaFooter({ cfg }: { cfg: PageCfg }) {
  const T = useT();
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="rounded-[32px] p-10 sm:p-16"
          style={{ border:`1px solid ${T.blueBorder}`, background:`linear-gradient(135deg,${T.aurora1} 0%,${T.cardSolid} 100%)`, backdropFilter:"blur(20px)", boxShadow:"0 30px 100px rgba(43,108,255,0.10)" }}>
          <Eyebrow>Next Step</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color:T.text }}>{cfg.footerH}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7" style={{ color:T.muted }}>{cfg.footerLead}</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <PBtn className="h-12 px-8">{cfg.cta1} <ArrowRight className="h-4 w-4" /></PBtn>
            <GBtn className="h-12 px-8">{cfg.cta2}</GBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

function PFooter() {
  const T = useT();
  return (
    <footer className="py-8" style={{ borderTop:`1px solid ${T.blueBorder}` }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8" style={{ color:T.muted }}>
        <div className="flex items-center gap-2"><Zap className="h-4 w-4" style={{ color:T.blue }} /><span>© 2026 EXIAL / TPG. All rights reserved.</span></div>
        <div className="flex flex-wrap gap-5">
          {["Privacy","Terms","Contact"].map(l => <Link key={l} to="/" className="transition hover:opacity-100" style={{ color:T.muted }}>{l}</Link>)}
        </div>
      </div>
    </footer>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────
export default function PlatformPage() {
  const { page = "explained" } = useParams<{ page: string }>();
  const [isDark, setIsDark] = useState(true);
  const T = isDark ? dark : light;
  const ctx = useMemo(() => ({ T, toggle: () => setIsDark(d => !d) }), [T]);
  const cfg = pages[page] ?? pages["explained"];

  return (
    <Ctx.Provider value={ctx}>
      <div className="min-h-screen" style={{ background:T.bg, fontFamily:"'Inter',system-ui,sans-serif", color:T.text }}>
        {/* Global background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0" style={{ background:T.baseBg }} />
          <div className="absolute -left-80 -top-80 h-[900px] w-[900px] rounded-full"
            style={{ background:`radial-gradient(circle,${T.aurora1} 0%,transparent 60%)`, filter:"blur(120px)" }} />
          <div className="absolute -right-60 -top-20 h-[800px] w-[800px] rounded-full"
            style={{ background:`radial-gradient(circle,${T.aurora2} 0%,transparent 60%)`, filter:"blur(120px)" }} />
          <div className="absolute inset-0 opacity-[0.12]"
            style={{ backgroundImage:`radial-gradient(circle,${T.dotColor} 1px,transparent 1px)`, backgroundSize:"30px 30px" }} />
        </div>

        <PlatformNav />

        {/* Back breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm transition hover:opacity-100" style={{ color:T.muted }}>
            <ArrowLeft className="h-4 w-4" /> Back to EXIAL
          </Link>
        </div>

        <main>
          <PageHero cfg={cfg} />
          <DefinitionSection cfg={cfg} />
          <WhyItMatters cfg={cfg} />
          <HowItWorks cfg={cfg} />
          <CapabilitiesGrid cfg={cfg} />
          <UseCasesSection cfg={cfg} />
          <CtaFooter cfg={cfg} />
        </main>

        <PFooter />
      </div>
    </Ctx.Provider>
  );
}
