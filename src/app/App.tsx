import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Code2,
  Rocket,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Phone,
  MapPin,
  ArrowRight,
  Terminal,
  Brain,
  Cloud,
  MessageCircle,
  X,
  Send,
  ChevronDown,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Database,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Card } from "./components/ui/card";
import { toast, Toaster } from "sonner";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import profileBlueCoat from "@/imports/blue_coat-dp.jpg";
import profileWhiteJacket from "@/imports/IMG-20240501-WA0086.jpg";
import profileCasual1 from "@/imports/IMG-20240420-WA0104__2_.jpg";
import profileCasual2 from "@/imports/IMG-20240430-WA0230.jpg";
import developerMascot from "@/imports/developer_mascot.png";

const SKILLS = [
  {
    icon: Terminal,
    title: "Backend & Frameworks",
    skills: ["Python", "FastAPI", "Node.js", "Express.js", "Django", "LangChain", "RAG"],
  },
  {
    icon: Code2,
    title: "Frontend & Databases",
    skills: ["React", "PostgreSQL", "MongoDB", "Redis", "Firebase"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    skills: ["Google Cloud (GCP)", "Azure AI Services", "Pinecone", "n8n", "Git / GitHub", "CI/CD"],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    skills: ["LLMs", "Generative AI", "NLP", "Deep Learning", "Vertex AI", "GitHub Copilot"],
  },
];

const PROJECTS = [
  {
    title: "Resto Pulse",
    description:
      "AI-powered restaurant management system with WhatsApp automation, FCM notifications, and Vertex AI integration deployed on Google Cloud.",
    tech: ["React", "FastAPI", "PostgreSQL", "Redis", "GCP", "Vertex AI"],
    gradient: "from-[#FF4E50] to-[#F9D423]",
    icon: Sparkles,
  },
  {
    title: "Edu Stack LMS",
    description:
      "Scalable backend for a Learning Management System leveraging Node.js, Express, and MongoDB for reliability and seamless learning experiences.",
    tech: ["Node.js", "Express.js", "MongoDB", "REST API"],
    gradient: "from-[#00c6ff] to-[#0072ff]",
    icon: Database,
  },
  {
    title: "AI Medical Chatbot",
    description:
      "Medical Chatbot using Python, FastAPI, LangChain, GPT, and Pinecone vector database with CI/CD pipelines for automated deployment.",
    tech: ["Python", "FastAPI", "LangChain", "GPT", "Pinecone", "CI/CD"],
    gradient: "from-[#11998e] to-[#38ef7d]",
    icon: Brain,
  },
];

const EXPERIENCE = [
  {
    icon: Briefcase,
    title: "Software Engineer",
    organization: "RestoPulse",
    period: "Dec 2025 – Feb 2026",
    description:
      "Built an AI-powered restaurant management system using React, FastAPI, PostgreSQL, and Redis on Google Cloud with real-time notifications and automation features.",
  },
  {
    icon: Briefcase,
    title: "Backend & AI Developer",
    organization: "Wonder Creative Studio",
    period: "Jun 2025 – Nov 2025",
    description:
      "Built backend systems using Node.js, Express.js, FastAPI, and MongoDB, designing robust APIs for automation and real-time intelligence.",
  },
  {
    icon: Briefcase,
    title: "AI/ML Intern",
    organization: "Labmentix",
    period: "Jan 2025 – Apr 2025",
    description:
      "Worked on core AI/ML projects, building strong hands-on experience using Python, FastAPI, and Django.",
  },
  {
    icon: Briefcase,
    title: "AI/ML Trainee",
    organization: "Revature",
    period: "Jul 2024 – Dec 2024",
    description:
      "Developed and deployed real-time AI solutions using deep learning, Generative AI (RAG, LangChain), and Azure AI Services with integrated NLP and image classification.",
  },
  {
    icon: GraduationCap,
    title: "B.Tech Computer Science",
    organization: "Vimal Jyothi Engineering College",
    period: "Jan 2020 – Jun 2024",
    description: "CGPA: 7.22. Strong foundation in software engineering, algorithms, and computer science fundamentals.",
  },
  {
    icon: Award,
    title: "Azure AI Engineer Associate (AI-102)",
    organization: "Microsoft Certification",
    period: "2024",
    description: "Industry certification in Azure AI Services, demonstrating expertise in building AI-powered solutions on the Microsoft cloud platform.",
  },
];

const galleryPhotos = [profileBlueCoat, profileWhiteJacket, profileCasual1, profileCasual2];

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "bot",
      message:
        "Hi! I'm Joseph's portfolio assistant. Ask me about his skills, experience, projects, or how to get in touch!",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [activePhoto, setActivePhoto] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhoto((p) => (p + 1) % galleryPhotos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: "user", message: chatInput }]);
    const response = getBotResponse(chatInput.toLowerCase());
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: "bot", message: response }]);
    }, 500);
    setChatInput("");
  };

  const getBotResponse = (input: string) => {
    if (input.includes("skill") || input.includes("tech") || input.includes("stack")) {
      return "Joseph specializes in Python, FastAPI, React, Node.js, and AI/ML technologies including LangChain, RAG, and Azure AI Services. He's certified as an Azure AI Engineer (AI-102)!";
    } else if (input.includes("experience") || input.includes("work") || input.includes("job")) {
      return "Joseph has worked at RestoPulse (Software Engineer), Wonder Creative Studio (Backend & AI Developer), Labmentix (AI/ML Intern), and Revature (AI/ML Trainee). Check the Experience section for full details!";
    } else if (input.includes("project")) {
      return "Joseph's key projects include Resto Pulse (AI restaurant management on GCP), Edu Stack LMS (Node.js backend), and an AI Medical Chatbot using LangChain and Pinecone. Scroll to Projects to see more!";
    } else if (input.includes("contact") || input.includes("hire") || input.includes("email")) {
      return "You can reach Joseph at josephvarghese98128@gmail.com or call/WhatsApp +91 9656082409. LinkedIn: linkedin.com/in/joseph-varghese-ai";
    } else if (input.includes("education") || input.includes("college") || input.includes("degree")) {
      return "Joseph holds a B.Tech in Computer Science from Vimal Jyothi Engineering College (2020–2024) with a CGPA of 7.22.";
    } else if (input.includes("ai") || input.includes("machine learning") || input.includes("ml")) {
      return "Joseph is passionate about AI/ML! He works with LLMs, LangChain, RAG pipelines, Azure AI Services, Vertex AI, NLP, and deep learning. He's an Azure AI Engineer Associate (AI-102) certified.";
    } else if (input.includes("location") || input.includes("where")) {
      return "Joseph is based in Kannur, Kerala, India. He's open to remote and on-site opportunities!";
    } else if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! Great to meet you! I can tell you about Joseph's skills, projects, work experience, or help you get in touch. What would you like to know?";
    } else {
      return "That's a great question! Feel free to explore the portfolio or ask me about Joseph's skills, AI/ML projects, work experience, or contact details.";
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-foreground selection:text-background font-sans">
      <Toaster position="top-right" />

      {/* ─── MAIN RESPONSIVE CONTAINER ─── */}
      <div className="flex flex-col lg:flex-row min-h-screen w-full relative">

        {/* ─── LEFT SIDEBAR (Desktop navigation, sticky) ─── */}
        <aside className="hidden lg:flex fixed top-0 left-0 w-[22%] h-screen flex-col justify-between p-10 border-r-2 border-border bg-background z-40">
          {/* Top: Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection("home")}>
            <svg width="38" height="38" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground shrink-0 group-hover:scale-105 transition-transform duration-300">
              <rect x="2" y="2" width="32" height="32" rx="4" fill="currentColor" />
              <rect x="8" y="10" width="6" height="6" fill="var(--background)" />
              <rect x="22" y="10" width="6" height="6" fill="var(--background)" />
              <path d="M8 22H28V26H8V22Z" fill="var(--background)" />
            </svg>
            <span className="font-extrabold text-base leading-tight uppercase tracking-tight text-foreground">
              Joseph<br />Varghese
            </span>
          </div>

          {/* Middle: Menu links */}
          <nav className="flex flex-col gap-4 my-8">
            {["home", "about", "skills", "projects", "experience", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`flex items-center gap-3 text-left font-black uppercase text-xs tracking-widest transition-all group cursor-pointer ${
                  activeSection === item ? "text-foreground" : "text-foreground/50 hover:text-foreground"
                }`}
              >
                <span className={`w-2 h-2 rounded-full bg-foreground transition-all duration-200 ${
                  activeSection === item ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-75"
                }`} />
                {item}
              </button>
            ))}
          </nav>

          {/* Bottom: Stamp badge */}
          <div className="relative w-28 h-28 flex items-center justify-center select-none group">
            <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <defs>
                <path id="stampPath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
              </defs>
              <text className="text-[7.5px] font-black uppercase fill-foreground tracking-[2px]">
                <textPath href="#stampPath" startOffset="0%">
                  • JOSEPH VARGHESE • AI ENGINEER • KANNUR •
                </textPath>
              </text>
            </svg>
            <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background border-2 border-border shadow-brutalist-sm group-hover:scale-110 transition-transform cursor-pointer">
              <Rocket className="w-5 h-5" />
            </div>
          </div>
        </aside>

        {/* ─── MOBILE HEADER (Visible on mobile/tablet) ─── */}
        <header className="lg:hidden sticky top-0 w-full bg-background border-b-2 border-border px-5 py-4 flex items-center justify-between z-50">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("home")}>
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
              <rect x="2" y="2" width="32" height="32" rx="4" fill="currentColor" />
              <rect x="8" y="10" width="6" height="6" fill="var(--background)" />
              <rect x="22" y="10" width="6" height="6" fill="var(--background)" />
              <path d="M8 22H28V26H8V22Z" fill="var(--background)" />
            </svg>
            <span className="font-extrabold text-sm uppercase tracking-tight text-foreground">J. Varghese</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setChatOpen(true)}
              className="w-9 h-9 rounded-lg bg-card border-2 border-border flex items-center justify-center text-foreground shadow-brutalist-sm cursor-pointer"
            >
              <MessageCircle className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-lg bg-card border-2 border-border flex items-center justify-center text-foreground shadow-brutalist-sm font-black text-sm uppercase cursor-pointer"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Collapsible Mobile Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-[100%] left-0 right-0 bg-background border-b-2 border-border flex flex-col p-6 gap-3 z-50 shadow-xl">
              {["home", "about", "skills", "projects", "experience", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`font-black uppercase text-left text-sm py-2.5 border-b border-border/20 flex items-center justify-between cursor-pointer ${
                    activeSection === item ? "text-foreground font-extrabold" : "text-foreground/60"
                  }`}
                >
                  {item}
                  {activeSection === item && <span className="w-2 h-2 rounded-full bg-foreground" />}
                </button>
              ))}
              <button
                onClick={() => {
                  scrollToSection("contact");
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-primary text-primary-foreground border-2 border-border font-black rounded-xl py-3 text-center text-xs uppercase shadow-brutalist mt-2 hover-brutalist active-brutalist cursor-pointer"
              >
                Hire Joseph
              </button>
            </div>
          )}
        </header>

        {/* ─── CENTER COLUMN (Scrollable page content) ─── */}
        <main className="w-full lg:ml-[22%] lg:mr-[12%] lg:w-[66%] min-h-screen flex flex-col p-6 lg:p-14 gap-20">
          
          {/* ─── HERO SECTION ─── */}
          <section id="home" className="min-h-[80vh] flex flex-col justify-center pt-8 lg:pt-14 relative">
            <motion.div style={{ y: heroY }} className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-[64px] font-black leading-[1.05] tracking-tighter uppercase text-foreground">
                Joseph Varghese is <br />
                building AI & Web <br />
                systems. <span className="bg-foreground text-background px-3.5 py-1 rounded-xl inline-block mt-2 font-black border-2 border-foreground select-none">Is this fine?</span>
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-black uppercase tracking-wider text-foreground/60 bg-white/40 border border-border px-3 py-1 rounded-md">
                  June 2026
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-foreground/60 bg-white/40 border border-border px-3 py-1 rounded-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                  Available for Hire
                </span>
              </div>

              {/* Centered illustration mascot */}
              <div className="py-6 flex justify-center items-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-white border-2 border-border shadow-brutalist rounded-2xl overflow-hidden group">
                  <img
                    src={developerMascot}
                    alt="Joseph Varghese AI Mascot"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="bg-primary text-primary-foreground border-2 border-border font-black text-xs uppercase py-3.5 px-6 rounded-xl hover-brutalist active-brutalist shadow-brutalist flex items-center gap-2 cursor-pointer"
                >
                  View My Work <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="bg-white text-foreground border-2 border-border font-black text-xs uppercase py-3.5 px-6 rounded-xl hover-brutalist active-brutalist shadow-brutalist cursor-pointer"
                >
                  Get In Touch
                </button>
              </div>
            </motion.div>

            <button
              onClick={() => scrollToSection("about")}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground/50 hover:text-foreground transition-colors cursor-pointer hidden lg:block"
            >
              <ChevronDown className="w-8 h-8 animate-bounce" />
            </button>
          </section>

          {/* ─── ABOUT SECTION ─── */}
          <section id="about" className="scroll-mt-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b-2 border-border pb-3 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" /> About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Photo Frame (Brutalist Slideshow) */}
              <div className="relative w-full max-w-[340px] mx-auto">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border-2 border-border shadow-brutalist-lg bg-white">
                  {galleryPhotos.map((photo, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activePhoto === i ? 1 : 0 }}
                      transition={{ duration: 1 }}
                    >
                      <ImageWithFallback
                        src={photo}
                        alt={`Joseph Varghese photo ${i + 1}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </motion.div>
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating brutalist detail badges */}
                <div className="absolute -right-4 top-8 bg-card border-2 border-border rounded-xl px-4 py-2 shadow-brutalist-sm hover-brutalist">
                  <p className="text-xl font-black text-primary leading-none">4+</p>
                  <p className="text-[10px] uppercase font-bold text-foreground/60">Experiences</p>
                </div>
                <div className="absolute -left-4 bottom-12 bg-card border-2 border-border rounded-xl px-4 py-2 shadow-brutalist-sm hover-brutalist">
                  <p className="text-xl font-black text-primary leading-none">AI-102</p>
                  <p className="text-[10px] uppercase font-bold text-foreground/60">Certified</p>
                </div>
              </div>

              {/* Text Description */}
              <div className="space-y-4">
                <p className="text-lg font-bold leading-relaxed">
                  I'm a Full Stack Developer and AI Engineer based in{" "}
                  <span className="underline decoration-wavy decoration-2 decoration-foreground">Kannur, Kerala, India</span>, specializing in intelligent, scalable software.
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed font-semibold">
                  With hands-on experience across the stack — from high-fidelity React interfaces to high-performance FastAPI backends — I specialize in deploying AI features into production systems. I build automated pipelines using tools like LangChain, Pinecone, and Azure/Vertex AI Services.
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed font-semibold">
                  I hold a B.Tech in Computer Science and an industry-recognized Azure AI Engineer Associate certification. I enjoy tackling challenging architectural problems where frontend speed meets intelligent backend logic.
                </p>
                
                <div className="flex gap-2.5 flex-wrap pt-4">
                  {[
                    { icon: Rocket, label: "Fast Learner" },
                    { icon: Brain, label: "AI Focused" },
                    { icon: Terminal, label: "Clean Code" },
                    { icon: Cloud, label: "Cloud Native" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-border text-xs font-black uppercase shadow-brutalist-sm"
                    >
                      <Icon className="w-3.5 h-3.5 text-primary" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─── SKILLS SECTION ─── */}
          <section id="skills" className="scroll-mt-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b-2 border-border pb-3 flex items-center gap-3">
              <Code2 className="w-8 h-8 text-primary" /> Skills & Expertise
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILLS.map((category, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-border rounded-xl p-5 shadow-brutalist hover-brutalist cursor-default flex flex-col"
                >
                  <div className="w-10 h-10 rounded-lg bg-background border-2 border-border flex items-center justify-center mb-4 text-foreground">
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-wider mb-4 border-b border-border/20 pb-2">
                    {category.title}
                  </h3>
                  <div className="space-y-2 flex-1">
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                        <div className="w-1.5 h-1.5 bg-foreground rounded-full" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── PROJECTS SECTION ─── */}
          <section id="projects" className="scroll-mt-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b-2 border-border pb-3 flex items-center gap-3">
              <Rocket className="w-8 h-8 text-primary" /> Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROJECTS.map((project, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-border rounded-xl overflow-hidden shadow-brutalist hover-brutalist flex flex-col h-full"
                >
                  {/* Card Header Illustration */}
                  <div className={`h-36 bg-gradient-to-br ${project.gradient} border-b-2 border-border flex items-center justify-center relative overflow-hidden`}>
                    <project.icon className="w-12 h-12 text-white/30 absolute" />
                    <div className="absolute bottom-3 left-4">
                      <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-wider rounded-md border border-white/20">
                        {project.title}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1 gap-4">
                    <p className="text-xs text-foreground/80 leading-relaxed font-semibold flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-background border border-border rounded-md text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-primary text-primary-foreground border-2 border-border font-black text-xs uppercase py-2.5 rounded-lg hover-brutalist active-brutalist shadow-brutalist cursor-pointer flex items-center justify-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5" /> View Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── EXPERIENCE SECTION ─── */}
          <section id="experience" className="scroll-mt-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b-2 border-border pb-3 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-primary" /> Experience & Education
            </h2>

            <div className="relative pl-6 sm:pl-10 border-l-2 border-border space-y-8 py-2">
              {EXPERIENCE.map((item, i) => (
                <div key={i} className="relative">
                  {/* Timeline icon dot */}
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-border flex items-center justify-center text-foreground shadow-brutalist-sm">
                    <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>

                  {/* Card */}
                  <div className="bg-white border-2 border-border rounded-xl p-5 shadow-brutalist hover-brutalist">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-wide text-foreground">{item.title}</h3>
                        <p className="text-[10px] font-extrabold text-foreground/60 uppercase">{item.organization}</p>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest bg-background border-2 border-border px-3 py-1 rounded-full w-fit">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/80 leading-relaxed font-semibold">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── CONTACT SECTION ─── */}
          <section id="contact" className="scroll-mt-20 pb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b-2 border-border pb-3 flex items-center gap-3">
              <Mail className="w-8 h-8 text-primary" /> Contact Me
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Contact Information */}
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "josephvarghese98128@gmail.com", href: "mailto:josephvarghese98128@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 9656082409", href: "tel:+919656082409" },
                  { icon: Linkedin, label: "LinkedIn", value: "joseph-varghese-ai", href: "https://www.linkedin.com/in/joseph-varghese-ai/" },
                  { icon: MapPin, label: "Location", value: "Kannur, Kerala, India", href: "#" }
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white border-2 border-border p-4 rounded-xl shadow-brutalist hover-brutalist group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-background border-2 border-border flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-foreground/60">{label}</p>
                      <p className="text-xs font-black uppercase tracking-wide group-hover:underline text-foreground leading-snug">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Contact Form */}
              <div className="bg-white border-2 border-border rounded-xl p-6 shadow-brutalist">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Message sent! Joseph will get back to you soon.");
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider mb-2">Name</label>
                      <Input placeholder="Your Name" className="bg-white border-2 border-border text-sm font-semibold rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider mb-2">Email</label>
                      <Input type="email" placeholder="your@email.com" className="bg-white border-2 border-border text-sm font-semibold rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider mb-2">Subject</label>
                    <Input placeholder="What's this about?" className="bg-white border-2 border-border text-sm font-semibold rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider mb-2">Message</label>
                    <Textarea placeholder="Tell me about your project..." rows={4} className="bg-white border-2 border-border text-sm font-semibold rounded-xl resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-primary text-primary-foreground border-2 border-border font-black text-xs uppercase py-3.5 rounded-xl hover-brutalist active-brutalist shadow-brutalist cursor-pointer flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* ─── RIGHT SIDEBAR (Desktop CTA & utilities, sticky) ─── */}
        <aside className="hidden lg:flex fixed top-0 right-0 w-[12%] h-screen flex-col justify-between items-end p-10 border-l-2 border-border bg-background z-40">
          {/* Top: CTA */}
          <button
            onClick={() => scrollToSection("contact")}
            className="w-full bg-primary text-primary-foreground border-2 border-border font-black rounded-xl py-3 px-4 text-[10px] uppercase tracking-widest hover-brutalist active-brutalist shadow-brutalist cursor-pointer"
          >
            Hire Joseph
          </button>

          {/* Middle: Utilities (Chat and Socials) */}
          <div className="flex flex-col gap-6 items-center my-auto">
            {/* AI Chat trigger */}
            <button
              onClick={() => setChatOpen(true)}
              title="Open AI Assistant"
              className="w-11 h-11 rounded-xl bg-card border-2 border-border flex items-center justify-center hover-brutalist active-brutalist shadow-brutalist cursor-pointer text-foreground group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-115 transition-transform" />
            </button>

            <div className="h-10 w-0.5 bg-border/20 my-2" />

            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/joseph-varghese-ai/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:josephvarghese98128@gmail.com", label: "Email" }
            ].map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                title={soc.label}
                className="w-11 h-11 rounded-xl bg-card border-2 border-border flex items-center justify-center hover-brutalist active-brutalist shadow-brutalist text-foreground group"
              >
                <soc.icon className="w-4 h-4 group-hover:scale-115 group-hover:rotate-6 transition-transform" />
              </a>
            ))}
          </div>

          {/* Bottom spacer */}
          <div className="h-12 w-full" />
        </aside>

        {/* ─── MOBILE FOOTER (Visible on mobile/tablet) ─── */}
        <footer className="lg:hidden w-full bg-background border-t-2 border-border py-12 px-6 flex flex-col items-center gap-6">
          {/* Stamp Badge */}
          <div className="relative w-28 h-28 flex items-center justify-center select-none">
            <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <defs>
                <path id="mobileStampPath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
              </defs>
              <text className="text-[7.5px] font-black uppercase fill-foreground tracking-[2px]">
                <textPath href="#mobileStampPath" startOffset="0%">
                  • JOSEPH VARGHESE • AI ENGINEER • KANNUR •
                </textPath>
              </text>
            </svg>
            <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background">
              <Rocket className="w-5 h-5" />
            </div>
          </div>
          
          <div className="flex gap-4">
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/joseph-varghese-ai/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:josephvarghese98128@gmail.com", label: "Email" }
            ].map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-card border-2 border-border flex items-center justify-center text-foreground shadow-brutalist-sm"
              >
                <soc.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <p className="text-foreground/60 text-xs text-center leading-relaxed">
            © 2026 Joseph Varghese · AI & Web Engineer · Kannur, Kerala
          </p>
        </footer>

      </div>

      {/* ─── SLIDE-OUT CHAT DRAWER (Framer Motion) ─── */}
      <AnimatePresence>
        {chatOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity cursor-pointer"
              onClick={() => setChatOpen(false)}
            />
            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 w-full sm:w-[400px] h-screen bg-card border-l-4 border-border flex flex-col z-50 shadow-2xl"
            >
              {/* Header */}
              <div className="bg-primary text-primary-foreground p-5 border-b-2 border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border bg-background flex items-center justify-center text-foreground font-black text-sm select-none">
                    JV
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm tracking-wide uppercase">Joseph's AI Agent</h3>
                    <p className="text-xs opacity-80 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-primary-foreground/80 hover:text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg p-1.5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat history */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted/20">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-xl border-2 border-border font-medium text-sm leading-relaxed shadow-brutalist-sm ${
                        msg.role === "user"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-white text-foreground"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleChatSubmit} className="p-4 border-t-2 border-border bg-background">
                <div className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me about Joseph..."
                    className="bg-white border-2 border-border text-sm font-semibold rounded-xl"
                  />
                  <Button type="submit" className="bg-primary text-primary-foreground border-2 border-border hover:bg-primary/95 font-black uppercase text-xs tracking-wider px-4 rounded-xl cursor-pointer">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
