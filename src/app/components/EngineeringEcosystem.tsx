import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { useState, useEffect } from "react";
import {
  Cpu,
  Database,
  Activity,
  Zap,
  CheckCircle,
  Network,
  Server,
  CloudLightning,
  Sparkles
} from "lucide-react";
import DecryptText from "./ui/DecryptText";

interface CaseStudyCard {
  title: string;
  metric: string;
  metricLabel: string;
  tech: string[];
  description: string;
  details: string[];
}

const CARDS: CaseStudyCard[] = [
  {
    title: "High-Throughput API Gateway",
    metric: "12ms",
    metricLabel: "Avg. Latency",
    tech: ["FastAPI", "Redis", "GCP", "Docker"],
    description:
      "Engineered an enterprise-grade backend infrastructure handling over 10M monthly requests. Designed distributed rate-limiting and intelligent caching layers.",
    details: [
      "Implemented Token Bucket rate-limiting using Redis Lua scripts.",
      "Achieved 99.99% system uptime through multi-zone GCP deployment.",
      "Optimized query compilation times, reducing responses to sub-15ms."
    ]
  },
  {
    title: "Intelligent RAG Pipeline",
    metric: "95%",
    metricLabel: "Retrieval Relevance",
    tech: ["LangChain", "Pinecone", "GPT-4", "Python"],
    description:
      "Architected a context-aware Retrieval-Augmented Generation system. Incorporates semantic vector searches, hybrid reranking, and citation generation.",
    details: [
      "Optimized document chunking with metadata-filtering for Pinecone query scoping.",
      "Integrated Cohere Rerank to boost precision of top retrieved documents.",
      "Reduced hallucination rates to less than 2% via rigorous prompt engineering."
    ]
  },
  {
    title: "Real-time Notification Engine",
    metric: "50k/s",
    metricLabel: "Event Throughput",
    tech: ["Node.js", "Redis Pub/Sub", "FCM", "WebSockets"],
    description:
      "Created a high-frequency real-time alerts broker. Broadcasts cross-platform notifications, transactional SMS, and system triggers instantly.",
    details: [
      "Engineered memory-backed queues to survive network/API outages.",
      "Implemented auto-scaling WebSocket clusters with Redis synchronization.",
      "Connected Firebase Cloud Messaging (FCM) & WhatsApp Business API gateway."
    ]
  },
  {
    title: "Self-Healing Cloud Infrastructure",
    metric: "40%",
    metricLabel: "Cost Reduction",
    tech: ["GCP", "Terraform", "GitHub Actions", "Kubernetes"],
    description:
      "Deployed automated infrastructure-as-code models. Incorporates active load balancing, horizontal autoscaling, and secure CI/CD pipelines.",
    details: [
      "Declared infrastructure templates via modular Terraform states.",
      "Constructed isolated staging/production environments with secret auditing.",
      "Configured CPU/Memory auto-scale policies on cloud application nodes."
    ]
  }
];

const TECH_TAGS_1 = [
  "FASTAPI",
  "POSTGRESQL",
  "REDIS",
  "LANGCHAIN",
  "PINECONE",
  "AZURE AI",
  "VERTEX AI",
  "DOCKER"
];

const TECH_TAGS_2 = [
  "REACT",
  "TYPESCRIPT",
  "NEXT.JS",
  "TAILWIND CSS",
  "FRAMER MOTION",
  "NODE.JS",
  "EXPRESS.JS",
  "MONGODB"
];

// Sub-component for individual cards to isolate mouse-tracking state
function EcosystemCard({
  card,
  idx,
  cardVariants
}: {
  card: CaseStudyCard;
  idx: number;
  cardVariants: any;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px 0px -50px 0px" }}
      onMouseMove={handleMouseMove}
      className="bg-zinc-900/70 hover:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-800/80 hover:border-zinc-800 transition-all duration-300 group shadow-lg flex flex-col gap-6 relative overflow-hidden cursor-default"
    >
      {/* Spotlight Radial Glow overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(212, 241, 56, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Card number indicator */}
      <span className="absolute right-6 top-6 text-zinc-800 font-mono font-black text-xl select-none group-hover:text-primary/20 transition-colors">
        0{idx + 1}
      </span>

      <div className="space-y-4 relative z-10">
        {/* Meta details */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 flex items-baseline gap-1.5">
            <span className="text-lg font-black font-mono tracking-tight text-white group-hover:text-primary transition-colors">
              {card.metric}
            </span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase font-mono">
              {card.metricLabel}
            </span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {card.tech.map((t, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-zinc-950 border border-zinc-800/60 rounded-md text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
          <DecryptText text={card.title} scrambleDuration={2.5} />
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed font-semibold">
          {card.description}
        </p>
      </div>

      {/* Custom micro-bullets inside the card */}
      <div className="space-y-2 border-t border-zinc-800/60 pt-4 flex-1 relative z-10">
        {card.details.map((detail, dIdx) => (
          <div key={dIdx} className="flex items-start gap-2.5 text-xs text-zinc-400 font-semibold font-mono">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{detail}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function EngineeringEcosystem() {
  const [latency, setLatency] = useState(12);
  const [cpuUsage, setCpuUsage] = useState(42);
  const [activeConnections, setActiveConnections] = useState(148);

  // Simulate live metrics changes for a highly premium interactive feel
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => Math.max(9, Math.min(16, prev + (Math.random() > 0.5 ? 1 : -1))));
      setCpuUsage((prev) => Math.max(30, Math.min(58, prev + Math.floor(Math.random() * 5 - 2))));
      setActiveConnections((prev) =>
        Math.max(120, Math.min(180, prev + Math.floor(Math.random() * 7 - 3)))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Custom easeOutExpo for smooth feel
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const titleText = "High-Performance Systems & Engineering Architecture";
  const titleWords = titleText.split(" ");

  return (
    <section
      id="ecosystem"
      className="scroll-mt-20 w-full bg-zinc-950 text-zinc-100 rounded-3xl border border-zinc-800 overflow-hidden py-16 sm:py-24 px-6 lg:px-12 flex flex-col gap-16 lg:gap-20 shadow-2xl relative"
    >
      {/* Background ambient glowing shapes */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-3xl space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] sm:text-xs font-black uppercase tracking-wider text-primary">
          <Sparkles className="w-3.5 h-3.5" /> Case Studies
        </div>

        {/* Word Slide-Up Reveal */}
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] uppercase tracking-tighter"
        >
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] py-0.5">
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-medium leading-relaxed font-sans">
          Deep dive into the core technical stack, custom scaling patterns, and real-time backend
          ecosystems designed to sustain high demand and secure zero data loss.
        </p>
      </div>

      {/* Sticky Scrollytelling Setup (Split Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Left Column (Sticky Visual Console) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="bg-zinc-900/90 backdrop-blur-md rounded-2xl p-6 border border-zinc-800 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-emerald-500 to-transparent" />

              {/* Console Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
                    System Health Panel
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                  ONLINE
                </div>
              </div>

              {/* Status Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950/80 rounded-xl p-4 border border-zinc-800/80 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">
                      Latency
                    </span>
                    <Zap className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black font-mono tracking-tight text-white">
                      {latency}
                    </span>
                    <span className="text-xs text-zinc-400 font-bold font-mono">ms</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden mt-3">
                    <motion.div
                      className="bg-primary h-full"
                      animate={{ width: `${(latency / 20) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="bg-zinc-950/80 rounded-xl p-4 border border-zinc-800/80 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">
                      CPU Engine
                    </span>
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black font-mono tracking-tight text-white">
                      {cpuUsage}
                    </span>
                    <span className="text-xs text-zinc-400 font-bold font-mono">%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden mt-3">
                    <motion.div
                      className="bg-emerald-400 h-full"
                      animate={{ width: `${cpuUsage}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="bg-zinc-950/80 rounded-xl p-4 border border-zinc-800/80 flex flex-col justify-between col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">
                      DB Pool Connections
                    </span>
                    <span className="text-xs font-bold font-mono text-zinc-400">
                      {activeConnections}/500
                    </span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-emerald-400 h-full"
                      animate={{ width: `${(activeConnections / 500) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Graphic Simulator: Dynamic Wave */}
              <div className="bg-zinc-950/80 rounded-xl p-4 border border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold tracking-wide font-mono">
                  <span>REAL-TIME PACKET FLOW</span>
                  <Network className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <div className="h-16 flex items-end justify-between gap-1 pt-2 border-b border-zinc-800">
                  {Array.from({ length: 24 }).map((_, idx) => {
                    const h = 10 + Math.sin(idx * 0.5 + Date.now() * 0.001) * 30 + Math.random() * 20;
                    return (
                      <div key={idx} className="flex-1 bg-zinc-900 rounded-t-sm h-full relative">
                        <motion.div
                          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary/30 to-primary rounded-t-sm"
                          animate={{ height: `${Math.max(10, Math.min(100, h))}%` }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status List */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-zinc-400 py-1 border-b border-zinc-800/40">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Server className="w-3.5 h-3.5 text-primary" /> Gateway Node
                  </span>
                  <span className="text-zinc-500 font-bold">172.24.120.1</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 py-1 border-b border-zinc-800/40">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Database className="w-3.5 h-3.5 text-emerald-400" /> Pinecone Vector Shard
                  </span>
                  <span className="text-zinc-500 font-bold">replica-us-east-1</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 py-1">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <CloudLightning className="w-3.5 h-3.5 text-cyan-400" /> Redis Cache Node
                  </span>
                  <span className="text-emerald-400 font-bold">HIT (98.4%)</span>
                </div>
              </div>
            </div>

            {/* Sidebar Context Card */}
            <div className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-900 space-y-4">
              <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2 font-mono">
                <CheckCircle className="w-4 h-4 text-primary" /> Engineering Standards
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Every component is built under rigorous performance thresholds. Automated testing
                includes latency simulation, vector search recall assessments, and cloud resource
                consumption tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (Scrollable Cards) */}
        <div className="lg:col-span-7 space-y-8">
          {CARDS.map((card, idx) => (
            <EcosystemCard
              key={idx}
              card={card}
              idx={idx}
              cardVariants={cardVariants}
            />
          ))}
        </div>
      </div>

      {/* Bottom Full-Width Infinite Marquee loops (Opposite Directions) */}
      <div className="w-full flex flex-col gap-3 relative z-10 pt-10 border-t border-zinc-800/80">
        <span className="text-[9px] font-black tracking-widest text-zinc-500 uppercase font-mono block text-center mb-2">
          ENGINEERING ARCHITECTURE STACK
        </span>

        {/* Lane 1: Forward Marquee */}
        <div className="relative flex overflow-x-hidden border-y border-zinc-800/80 bg-zinc-950 py-3 font-mono">
          <div className="flex animate-marquee whitespace-nowrap gap-10 pr-10">
            {[...TECH_TAGS_1, ...TECH_TAGS_1].map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-black text-zinc-400 tracking-widest flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-primary" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Lane 2: Reverse Marquee */}
        <div className="relative flex overflow-x-hidden border-b border-zinc-800/80 bg-zinc-950 py-3 font-mono">
          <div className="flex animate-marquee-reverse whitespace-nowrap gap-10 pr-10">
            {[...TECH_TAGS_2, ...TECH_TAGS_2].map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-black text-zinc-400 tracking-widest flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
