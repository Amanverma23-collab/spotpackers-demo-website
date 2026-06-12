import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Truck, Home, Building2, Car, Bike, Package, Forklift, Boxes,
  Shield, MapPin, Clock, Phone, Mail, MessageCircle, Star,
  CheckCircle2, ChevronDown, Sparkles, Globe2, ArrowRight,
} from "lucide-react";
import logoAsset from "@/assets/spot-wordmark.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SPOT PACKERS & MOVERS | House Shifting & Vehicle Transportation Services" },
      { name: "description", content: "SPOT PACKERS & MOVERS offers reliable house shifting, office relocation, car transportation, bike transportation and logistics services across India." },
    ],
  }),
  component: Landing,
});

/* ---------- shared bits ---------- */

function GlowCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const m = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(0,212,255,0.10), transparent 60%)`,
      }}
    />
  );
}

function Particles() {
  const dots = Array.from({ length: 28 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cyan-glow/40 blur-[1px] animate-float-y"
          style={{
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 9) * 0.6}s`,
            animationDuration: `${5 + (i % 6)}s`,
          }}
        />
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-cyan-glow">
        <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
      </span>
      <h2 className="mt-5 text-4xl font-bold text-white md:text-5xl">
        {title.split("|").map((part, i) =>
          i === 1 ? <span key={i} className="text-gradient">{part}</span> : <span key={i}>{part}</span>
        )}
      </h2>
      {sub && <p className="mt-4 text-base text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? "glass-strong" : "glass"}`}>
          <a href="#top" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="SPOT Packers & Movers"
              className="h-12 w-auto object-contain drop-shadow-[0_0_18px_rgba(0,212,255,0.35)] sm:h-14"
            />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-glow sm:inline-block">
              Packers &amp; Movers
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-white/80 lg:flex">
            {[
              ["Services", "#services"], ["Why Us", "#why"], ["Vehicles", "#vehicles"],
              ["Process", "#process"], ["Coverage", "#coverage"], ["Contact", "#contact"],
            ].map(([l, h]) => (
              <a key={l} href={h} className="relative transition hover:text-white">
                {l}<span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-glow transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a href="#quote" className="magnetic-btn text-sm">
            Get Free Quote <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        setMouse({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
      }}
      className="relative flex min-h-screen items-center overflow-hidden pt-32"
    >
      {/* Background route map */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 800 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="route" x1="0" x2="1">
              <stop offset="0%" stopColor="#1E88FF" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
          </defs>
          {[
            "M0,420 C200,360 320,500 520,380 S780,300 820,260",
            "M0,180 C160,260 360,120 520,220 S760,360 820,300",
            "M0,520 C200,500 360,560 540,500 S760,460 820,500",
          ].map((d, i) => (
            <path key={i} d={d} fill="none" stroke="url(#route)" strokeWidth="2" className="animate-route" />
          ))}
        </svg>
        {/* gradient blobs */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-electric/40 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-glow/25 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <Particles />
      </div>

      <motion.div style={{ y, opacity }} className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="mb-6 flex flex-col items-start gap-2"
            >
              <div className="relative">
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-electric/40 via-cyan-glow/30 to-electric/40 opacity-70 blur-2xl animate-pulse-glow" />
                <img
                  src={logoAsset.url}
                  alt="SPOT Packers & Movers Logo"
                  className="relative h-24 w-auto object-contain drop-shadow-[0_0_28px_rgba(0,212,255,0.45)] md:h-32 lg:h-36"
                />
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.42em] text-cyan-glow md:text-base">
                Packers &amp; Movers
              </span>
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cyan-glow"
            >
              <Globe2 className="h-3.5 w-3.5" /> Pan-India · Trusted Since Years
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-5xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl"
            >
              India's <span className="text-gradient">Trusted</span><br />
              Packers & Movers
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 max-w-xl text-lg text-white/70"
            >
              Safe. Fast. Reliable transportation solutions across India — house shifting, office relocation, and door-to-door car & bike transport.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a href="#quote" className="magnetic-btn">Get Free Quote <ArrowRight className="h-4 w-4" /></a>
              <a href="tel:+917259911430" className="magnetic-btn-ghost"><Phone className="h-4 w-4" /> Call Now</a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="mt-8 flex flex-wrap gap-6 text-sm text-white/80"
            >
              <a href="tel:+917259911430" className="flex items-center gap-2 hover:text-cyan-glow">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full glass"><Phone className="h-4 w-4" /></span>
                +91 72599 11430
              </a>
              <a href="tel:+919945814496" className="flex items-center gap-2 hover:text-cyan-glow">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full glass"><Phone className="h-4 w-4" /></span>
                +91 99458 14496
              </a>
            </motion.div>
          </div>

          {/* 3D-ish truck scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
            style={{ transform: `perspective(1200px) rotateY(${mouse.x * 8}deg) rotateX(${-mouse.y * 6}deg)` }}
            className="relative mx-auto aspect-square w-full max-w-lg"
          >
            <div className="absolute inset-0 rounded-[2rem] glass-strong overflow-hidden">
              {/* radar grid */}
              <div className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,212,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.15) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage: "radial-gradient(circle at center, black, transparent 75%)",
                }}
              />
              {/* glowing route */}
              <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="rg" x1="0" x2="1">
                    <stop offset="0" stopColor="#1E88FF" /><stop offset="1" stopColor="#00D4FF" />
                  </linearGradient>
                </defs>
                <path d="M40 320 Q 200 200 360 80" stroke="url(#rg)" strokeWidth="3" fill="none" className="animate-route" />
                <circle cx="40" cy="320" r="6" fill="#00D4FF" />
                <circle cx="360" cy="80" r="6" fill="#1E88FF" />
              </svg>

              {/* floating packages */}
              {[
                { s: 64, x: "15%", y: "20%", d: 0 },
                { s: 48, x: "70%", y: "30%", d: 1 },
                { s: 40, x: "75%", y: "70%", d: 2 },
                { s: 56, x: "20%", y: "72%", d: 1.5 },
              ].map((b, i) => (
                <div
                  key={i}
                  className="absolute rounded-xl glass animate-float-y flex items-center justify-center text-cyan-glow"
                  style={{ width: b.s, height: b.s, left: b.x, top: b.y, animationDelay: `${b.d}s` }}
                >
                  <Package className="h-1/2 w-1/2" />
                </div>
              ))}

              {/* truck */}
              <div className="absolute inset-x-0 bottom-12 flex items-center justify-center">
                <div className="relative w-[80%]">
                  <div className="h-1 w-full rounded-full bg-gradient-to-r from-transparent via-cyan-glow to-transparent opacity-70" />
                  <div className="absolute inset-0 flex animate-drive items-center">
                    <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-electric to-cyan-glow px-4 py-3 shadow-[0_0_40px_rgba(0,212,255,0.6)]">
                      <Truck className="h-7 w-7 text-navy" />
                      <span className="font-display text-sm font-bold text-navy">SPOT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* corner stat */}
              <div className="absolute right-4 top-4 rounded-xl glass px-3 py-2 text-xs text-white/90">
                <div className="text-[10px] uppercase tracking-widest text-cyan-glow">Live Fleet</div>
                <div className="font-display text-base">24 in transit</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50">
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </div>
    </section>
  );
}

/* ---------- SERVICES ---------- */
const SERVICES = [
  { icon: Home, title: "House Relocation", desc: "Door-to-door home shifting with expert packing." },
  { icon: Building2, title: "Office Relocation", desc: "Minimal downtime corporate moves." },
  { icon: Car, title: "Car Transportation", desc: "Enclosed & open carrier vehicle transport." },
  { icon: Bike, title: "Bike Transportation", desc: "Insured two-wheeler delivery anywhere." },
  { icon: Package, title: "Packing Services", desc: "Multi-layer, premium packing materials." },
  { icon: Forklift, title: "Loading & Unloading", desc: "Trained crew, modern equipment." },
  { icon: Boxes, title: "Warehousing", desc: "Secure, climate-controlled storage." },
  { icon: Building2, title: "Commercial Relocation", desc: "Industrial & retail relocation experts." },
];

function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="What We Do" title="Premium |Logistics| Services" sub="From single-room moves to full-fleet relocation — engineered for safety and speed." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
              className="group relative rounded-2xl glass p-6 transition-all hover:border-cyan-glow/50 hover:cyan-shadow"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-electric/30 to-cyan-glow/30 backdrop-blur transition-transform group-hover:scale-110">
                <s.icon className="h-7 w-7 text-cyan-glow" />
              </div>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-white/65">{s.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-cyan-glow opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <ArrowRight className="h-3 w-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY US + COUNTERS ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        const start = performance.now(); const dur = 1600;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

const FEATURES = [
  { icon: Package, t: "Professional Packing Team" },
  { icon: Shield, t: "Safe Transportation" },
  { icon: MapPin, t: "GPS Tracking" },
  { icon: Truck, t: "Door-to-Door Delivery" },
  { icon: CheckCircle2, t: "Affordable Pricing" },
  { icon: Globe2, t: "Pan India Service" },
  { icon: Shield, t: "Insurance Support" },
  { icon: Clock, t: "24x7 Customer Support" },
];

function WhyUs() {
  return (
    <section id="why" className="relative py-28">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Why Choose Us" title="Built for |Trust|, Engineered for Scale" />

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl glass p-4 hover:border-cyan-glow/40"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-cyan-glow text-navy">
                  <f.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-white">{f.t}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              { n: 5000, s: "+", l: "Successful Moves" },
              { n: 2500, s: "+", l: "Vehicle Transports" },
              { n: 100, s: "+", l: "Cities Covered" },
              { n: 98, s: "%", l: "Customer Satisfaction" },
            ].map((c) => (
              <div key={c.l} className="rounded-2xl glass-strong p-6 text-center">
                <div className="text-4xl font-bold text-gradient md:text-5xl">
                  <Counter to={c.n} suffix={c.s} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-white/70">{c.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- VEHICLE SHOWCASE ---------- */
function VehicleShowcase() {
  return (
    <section id="vehicles" className="relative py-28">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Vehicle Transport" title="Move Your |Wheels| Safely Anywhere" sub="Specialised carriers for cars, bikes, luxury and corporate fleets." />
        <div className="grid gap-8 md:grid-cols-2">
          {[
            { icon: Car, title: "Car Transportation", lines: ["Open & enclosed carriers", "Insured transit", "GPS-tracked"], bg: "from-electric/30 to-cyan-glow/10" },
            { icon: Bike, title: "Bike Transportation", lines: ["Padded crate packing", "Single-bike delivery", "Pan India"], bg: "from-cyan-glow/30 to-electric/10" },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ rotateX: 4, rotateY: -4, scale: 1.01 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative overflow-hidden rounded-3xl glass-strong p-8"
            >
              <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${c.bg} opacity-50 blur-2xl transition group-hover:opacity-80`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-cyan-glow">Premium</span>
                  <Sparkles className="h-5 w-5 text-cyan-glow animate-pulse-glow" />
                </div>
                <div className="my-10 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-cyan-glow/30 blur-3xl" />
                    <c.icon className="relative h-40 w-40 text-white drop-shadow-[0_0_30px_rgba(0,212,255,0.6)]" strokeWidth={1.2} />
                    {/* light streak */}
                    <span className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-glow to-transparent" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white">{c.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  {c.lines.map((l) => (
                    <li key={l} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-glow" /> {l}</li>
                  ))}
                </ul>
                <a href="#quote" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-glow hover:gap-3 transition-all">
                  Book transport <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
const STEPS = [
  { n: "01", t: "Request Quote", d: "Share your moving details." },
  { n: "02", t: "Inspection", d: "On-site or virtual survey." },
  { n: "03", t: "Packing", d: "Multi-layer secure packing." },
  { n: "04", t: "Transportation", d: "GPS-tracked dispatch." },
  { n: "05", t: "Delivery", d: "Unpacking at your door." },
];

function Process() {
  return (
    <section id="process" className="relative py-28">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="How It Works" title="A |Seamless| 5-Step Journey" />
        <div className="relative">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-cyan-glow/60 to-transparent md:block" />
          <div className="grid gap-6 md:grid-cols-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl glass p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-electric to-cyan-glow font-display text-sm font-bold text-navy">
                  {s.n}
                </div>
                <h4 className="font-semibold text-white">{s.t}</h4>
                <p className="mt-1 text-xs text-white/65">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- COVERAGE MAP ---------- */
// Equirectangular projection: x = (lon - 68) * 30, y = (37 - lat) * 30 → viewBox 0 0 900 900
const CITIES: { n: string; x: number; y: number; metro?: boolean }[] = [
  { n: "Bangalore", x: 288, y: 721, metro: true },
  { n: "Mumbai", x: 146, y: 538, metro: true },
  { n: "Delhi", x: 276, y: 252, metro: true },
  { n: "Hyderabad", x: 314, y: 589, metro: true },
  { n: "Chennai", x: 368, y: 718, metro: true },
  { n: "Pune", x: 176, y: 554, metro: true },
  { n: "Ahmedabad", x: 137, y: 419, metro: true },
  { n: "Kolkata", x: 611, y: 433, metro: true },
  { n: "Jaipur", x: 233, y: 303, metro: true },
  { n: "Lucknow", x: 388, y: 305, metro: true },
  { n: "Surat", x: 145, y: 475 },
  { n: "Kanpur", x: 370, y: 317 },
  { n: "Nagpur", x: 332, y: 476 },
  { n: "Indore", x: 236, y: 429 },
  { n: "Bhopal", x: 282, y: 413 },
  { n: "Patna", x: 514, y: 342 },
  { n: "Visakhapatnam", x: 456, y: 580 },
  { n: "Kochi", x: 248, y: 812 },
  { n: "Coimbatore", x: 269, y: 780 },
  { n: "Chandigarh", x: 263, y: 188 },
  { n: "Guwahati", x: 712, y: 326 },
  { n: "Bhubaneswar", x: 535, y: 501 },
  { n: "Goa", x: 184, y: 651 },
  { n: "Amritsar", x: 206, y: 161 },
  { n: "Srinagar", x: 204, y: 88 },
  { n: "Raipur", x: 409, y: 473 },
  { n: "Thiruvananthapuram", x: 268, y: 854 },
  { n: "Jammu", x: 206, y: 128 },
  { n: "Mangalore", x: 206, y: 723 },
  { n: "Ranchi", x: 519, y: 410 },
];

// Real India outline (simplified) — projected with the same formula
const INDIA_PATH =
  "M180,60 L300,45 L390,75 L540,120 L690,180 L870,240 L840,300 L780,390 L720,450 L630,465 L570,510 L450,600 L420,660 L360,720 L300,800 L285,870 L255,840 L240,810 L210,750 L195,720 L174,645 L150,585 L144,540 L135,480 L120,450 L60,420 L15,420 L30,390 L60,390 L60,330 L60,300 L90,255 L150,210 L165,180 L180,135 L180,60 Z";

function Coverage() {
  const [active, setActive] = useState<string | null>(null);
  const hub = CITIES[0]; // Bangalore HQ
  return (
    <section id="coverage" className="relative py-28">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Coverage" title="Across |100+| Cities in India" />
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-[4/5] rounded-3xl glass-strong p-6 overflow-hidden">
            {/* ambient backdrop */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-glow/20 blur-3xl animate-pulse-glow" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-electric/20 blur-3xl animate-pulse-glow" />
            <svg viewBox="0 0 900 900" className="relative h-full w-full">
              <defs>
                <linearGradient id="indiaFill" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="rgba(30,136,255,0.18)" />
                  <stop offset="1" stopColor="rgba(0,212,255,0.08)" />
                </linearGradient>
                <linearGradient id="routeGrad" x1="0" x2="1">
                  <stop offset="0" stopColor="#1E88FF" />
                  <stop offset="1" stopColor="#00D4FF" />
                </linearGradient>
                <radialGradient id="dotGlow">
                  <stop offset="0" stopColor="#00D4FF" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#00D4FF" stopOpacity="0" />
                </radialGradient>
                <filter id="softGlow"><feGaussianBlur stdDeviation="3" /></filter>
              </defs>

              {/* India outline */}
              <path d={INDIA_PATH} fill="url(#indiaFill)" stroke="rgba(0,212,255,0.55)" strokeWidth="2" strokeLinejoin="round" />
              <path d={INDIA_PATH} fill="none" stroke="rgba(0,212,255,0.25)" strokeWidth="6" filter="url(#softGlow)" />

              {/* animated routes from HQ */}
              {CITIES.slice(1).map((c, i) => {
                const dim = active && active !== c.n && active !== hub.n;
                return (
                  <g key={`r-${i}`} style={{ opacity: dim ? 0.15 : 0.75, transition: "opacity .35s ease" }}>
                    <line x1={hub.x} y1={hub.y} x2={c.x} y2={c.y}
                      stroke="url(#routeGrad)" strokeWidth="1.4" strokeDasharray="4 6" className="animate-route" />
                  </g>
                );
              })}

              {/* cities */}
              {CITIES.map((c) => {
                const isActive = active === c.n;
                const isHub = c.n === hub.n;
                const r = isHub ? 7 : c.metro ? 5 : 3.5;
                return (
                  <g key={c.n}
                    onMouseEnter={() => setActive(c.n)}
                    onMouseLeave={() => setActive(null)}
                    className="cursor-pointer"
                    style={{ transition: "transform .3s ease", transformOrigin: `${c.x}px ${c.y}px`, transform: isActive ? "scale(1.15)" : "scale(1)" }}>
                    <circle cx={c.x} cy={c.y} r={r * 4} fill="url(#dotGlow)" opacity={isActive ? 0.9 : 0.45} />
                    <circle cx={c.x} cy={c.y} r={r} fill={isHub ? "#FFD166" : "#00D4FF"} stroke="white" strokeWidth="1">
                      <animate attributeName="opacity" values="0.7;1;0.7" dur={isHub ? "1.6s" : "2.4s"} repeatCount="indefinite" />
                    </circle>
                    {(c.metro || isActive || isHub) && (
                      <text x={c.x + r + 4} y={c.y + 3}
                        fill={isActive ? "#00D4FF" : "white"}
                        fontSize={isHub ? 16 : c.metro ? 13 : 12}
                        fontWeight={isHub || isActive ? 700 : 500}
                        className="font-display"
                        style={{ paintOrder: "stroke", stroke: "rgba(15,23,42,0.85)", strokeWidth: 3, strokeLinejoin: "round" }}>
                        {c.n}{isHub ? " ★" : ""}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/60">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#FFD166]" /> HQ Bangalore</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-glow animate-pulse" /> Active service hubs</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 content-start max-h-[640px] overflow-y-auto pr-2">
            {CITIES.map((c) => (
              <button key={c.n}
                onMouseEnter={() => setActive(c.n)} onMouseLeave={() => setActive(null)}
                className={`text-left rounded-xl glass px-3 py-2.5 text-sm transition-all duration-300 ${active === c.n ? "border-cyan-glow/70 cyan-shadow scale-[1.03]" : "hover:scale-[1.02]"}`}>
                <div className="flex items-center gap-2 text-white"><MapPin className="h-3.5 w-3.5 text-cyan-glow" />{c.n}</div>
              </button>
            ))}
            <div className="col-span-2 mt-2 rounded-xl glass-strong p-4 text-sm text-white/75">
              + Pan India coverage including all metros and Tier 2 cities.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
const REVIEWS = [
  { n: "Rahul Sharma", c: "Bangalore → Mumbai", r: 5, t: "Flawless house shift. Team was punctual, packing was top-tier, nothing damaged. Highly recommend SPOT." },
  { n: "Anita Verma", c: "Delhi → Hyderabad", r: 5, t: "My car arrived spotless in 4 days. GPS updates were a huge relief. Premium service at fair pricing." },
  { n: "Karan Mehta", c: "Pune → Chennai", r: 5, t: "Office relocation completed over a weekend — zero downtime on Monday. Professional and well organised." },
  { n: "Sneha Iyer", c: "Bangalore → Kolkata", r: 5, t: "Bike transport handled with extreme care. Padded crating, insurance, and on-time delivery." },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative py-28">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Testimonials" title="Loved by |5,000+| Families & Businesses" />
        <div className="relative mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl glass-strong p-10 text-center"
            >
              <div className="mb-4 flex justify-center gap-1 text-cyan-glow">
                {Array.from({ length: REVIEWS[i].r }).map((_, k) => (
                  <Star key={k} className="h-5 w-5 fill-cyan-glow" />
                ))}
              </div>
              <p className="text-lg text-white/85 md:text-xl">"{REVIEWS[i].t}"</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-electric to-cyan-glow font-display font-bold text-navy">
                  {REVIEWS[i].n.split(" ").map((x) => x[0]).join("")}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">{REVIEWS[i].n}</div>
                  <div className="text-xs text-white/60">{REVIEWS[i].c}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-2">
            {REVIEWS.map((_, k) => (
              <button key={k} onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-cyan-glow" : "w-2 bg-white/30"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- GALLERY ---------- */
const GALLERY = [
  { c: "House Shifting", h: "h-72" },
  { c: "Vehicle Transport", h: "h-56" },
  { c: "Packing", h: "h-64" },
  { c: "Loading", h: "h-80" },
  { c: "Warehousing", h: "h-64" },
  { c: "Office Relocation", h: "h-56" },
];

function Gallery() {
  return (
    <section className="relative py-28">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Gallery" title="Operations |In Motion|" />
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {GALLERY.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className={`group relative mb-5 overflow-hidden rounded-2xl glass ${g.h} break-inside-avoid`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric/40 via-navy to-cyan-glow/30 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-end p-5">
                <div>
                  <div className="text-xs uppercase tracking-widest text-cyan-glow">Category</div>
                  <div className="font-display text-lg font-semibold text-white">{g.c}</div>
                </div>
              </div>
              <div className="absolute right-4 top-4 rounded-full glass p-2 opacity-0 transition group-hover:opacity-100">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- QUOTE FORM ---------- */
function QuoteForm() {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true); setTimeout(() => setDone(false), 4000); };
  return (
    <section id="quote" className="relative py-28">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Free Quote" title="Get Your |Personalised| Estimate" sub="Tell us about your move. We'll respond within minutes." />
        <form onSubmit={submit} className="mx-auto max-w-3xl rounded-3xl glass-strong p-8 md:p-10">
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { l: "Full Name", t: "text", p: "Ganesh Maindan" },
              { l: "Phone", t: "tel", p: "+91 ..." },
              { l: "Email", t: "email", p: "you@email.com" },
              { l: "Date", t: "date" },
              { l: "Moving From", t: "text", p: "Bangalore" },
              { l: "Moving To", t: "text", p: "Mumbai" },
            ].map((f) => (
              <label key={f.l} className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-widest text-white/60">{f.l}</span>
                <input required type={f.t} placeholder={f.p}
                  className="w-full rounded-xl glass px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-cyan-glow focus:cyan-shadow" />
              </label>
            ))}
            <label className="block md:col-span-2">
              <span className="mb-1.5 block text-xs uppercase tracking-widest text-white/60">Service Type</span>
              <select required className="w-full rounded-xl glass px-4 py-3 text-white outline-none focus:border-cyan-glow">
                {SERVICES.map((s) => <option key={s.title} className="bg-navy">{s.title}</option>)}
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="mb-1.5 block text-xs uppercase tracking-widest text-white/60">Message</span>
              <textarea rows={4} placeholder="Tell us about your move..."
                className="w-full rounded-xl glass px-4 py-3 text-white placeholder-white/30 outline-none focus:border-cyan-glow" />
            </label>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-white/55">By submitting you agree to be contacted by SPOT Packers & Movers.</p>
            <button type="submit" className="magnetic-btn">
              {done ? "Request Sent ✓" : <>Submit Request <ArrowRight className="h-4 w-4" /></>}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQS = [
  { q: "How much does shifting cost?", a: "Pricing depends on distance, volume, and services chosen. Share your details for a free, no-obligation estimate." },
  { q: "Do you provide insurance?", a: "Yes. Comprehensive transit insurance is available for all shipments, including vehicles." },
  { q: "How long does delivery take?", a: "Typical intercity deliveries take 2–6 days depending on distance and route." },
  { q: "Do you transport vehicles?", a: "Yes. We transport cars, bikes, and luxury vehicles via dedicated carriers across India." },
  { q: "Do you offer warehousing?", a: "Yes. Short and long-term, climate-controlled storage is available." },
];
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-28">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="FAQ" title="Frequently |Asked| Questions" />
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-2xl glass">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="font-display font-semibold text-white">{f.q}</span>
                <ChevronDown className={`h-5 w-5 text-cyan-glow transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <p className="px-6 pb-6 text-sm text-white/70">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <section id="contact" className="relative py-28">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Contact" title="Talk to |Our Team|" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl glass-strong p-8">
            <div className="space-y-5">
              <div>
                <div className="text-xs uppercase tracking-widest text-cyan-glow">Owner</div>
                <div className="font-display text-2xl font-semibold text-white">Ganesh Maindan</div>
              </div>
              <a href="tel:+917259911430" className="flex items-center gap-3 rounded-xl glass p-4 transition hover:cyan-shadow">
                <Phone className="h-5 w-5 text-cyan-glow" />
                <div><div className="text-xs text-white/60">Call</div><div className="font-semibold text-white">+91 72599 11430</div></div>
              </a>
              <a href="tel:+919945814496" className="flex items-center gap-3 rounded-xl glass p-4 transition hover:cyan-shadow">
                <Phone className="h-5 w-5 text-cyan-glow" />
                <div><div className="text-xs text-white/60">Call</div><div className="font-semibold text-white">+91 99458 14496</div></div>
              </a>
              <a href="mailto:spotpackers22@gmail.com" className="flex items-center gap-3 rounded-xl glass p-4 transition hover:cyan-shadow">
                <Mail className="h-5 w-5 text-cyan-glow" />
                <div><div className="text-xs text-white/60">Email</div><div className="font-semibold text-white">spotpackers22@gmail.com</div></div>
              </a>
              <a href="https://wa.me/917259911430" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl glass p-4 transition hover:cyan-shadow">
                <MessageCircle className="h-5 w-5 text-cyan-glow" />
                <div><div className="text-xs text-white/60">WhatsApp</div><div className="font-semibold text-white">Chat with us</div></div>
              </a>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="tel:+917259911430" className="magnetic-btn"><Phone className="h-4 w-4" /> Call Now</a>
                <a href="https://wa.me/917259911430" target="_blank" rel="noreferrer" className="magnetic-btn-ghost"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl glass-strong">
            <iframe
              title="SPOT Packers location"
              src="https://www.google.com/maps?q=Bangalore&output=embed"
              className="h-full min-h-[420px] w-full grayscale-[20%] invert-[5%]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/10">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="SPOT" className="h-12 w-auto rounded-md bg-white/95 p-1" />
              <div>
                <div className="font-display font-bold text-white">SPOT</div>
                <div className="text-[10px] uppercase tracking-widest text-cyan-glow">Packers & Movers</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/60">Premium relocation & vehicle transport services across India.</p>
          </div>
          <div>
            <div className="mb-3 text-xs uppercase tracking-widest text-cyan-glow">Quick Links</div>
            <ul className="space-y-2 text-sm text-white/70">
              {[["Services", "#services"], ["Why Us", "#why"], ["Vehicles", "#vehicles"], ["Coverage", "#coverage"], ["Contact", "#contact"]].map(([l, h]) => (
                <li key={l}><a href={h} className="hover:text-cyan-glow">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs uppercase tracking-widest text-cyan-glow">Services</div>
            <ul className="space-y-2 text-sm text-white/70">
              {SERVICES.slice(0, 5).map((s) => <li key={s.title}>{s.title}</li>)}
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs uppercase tracking-widest text-cyan-glow">Get in Touch</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="tel:+917259911430" className="hover:text-cyan-glow">+91 72599 11430</a></li>
              <li><a href="tel:+919945814496" className="hover:text-cyan-glow">+91 99458 14496</a></li>
              <li><a href="mailto:spotpackers22@gmail.com" className="hover:text-cyan-glow">spotpackers22@gmail.com</a></li>
              <li><a href="https://www.spotpackers.com" className="hover:text-cyan-glow">www.spotpackers.com</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <span>© {new Date().getFullYear()} SPOT PACKERS & MOVERS. All Rights Reserved.</span>
          <span>Crafted with premium care.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- PAGE ---------- */
function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <GlowCursor />
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <Services />
        <WhyUs />
        <VehicleShowcase />
        <Process />
        <Coverage />
        <Testimonials />
        <Gallery />
        <QuoteForm />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
