// ABOUTME: Personal portfolio/resume single-page application for Hector Luis Alamo.
// ABOUTME: React 19 SPA with emerald green palette, Lucide icons, scroll animations, and semantic HTML.

import { useState, useEffect, useRef } from "react";
import {
  Dumbbell, UtensilsCrossed, Globe, FileText, Newspaper,
  Bot, Target, Rocket, GraduationCap, Github, Linkedin,
  Building2, ChevronDown, ExternalLink,
} from "lucide-react";

const A = "#059669";
const AG = "#34D399";
const D = "#0A0F1A";
const DC = "#111827";
const DB = "#1E293B";
const T = "#E2E8F0";
const TM = "#94A3B8";
const TD = "#64748B";

const skills = {
  "Languages": ["TypeScript", "Python", "JavaScript", "SQL", "Dart", "HTML/CSS"],
  "Frontend / Mobile": ["React Native", "Expo", "Next.js", "React", "Tailwind CSS", "Framer Motion", "Flutter", "Streamlit", "Jotai"],
  "Backend / API": ["FastAPI", "Node.js", "Express", "Flask", "Pydantic", "SQLAlchemy"],
  "AI / ML / NLP": ["OpenAI API", "Claude API", "sentence-transformers", "Hugging Face", "PyTorch", "scikit-learn", "pgvector", "RAG Pipelines", "TF-IDF", "DistilBERT", "Helsinki-NLP", "NLTK"],
  "Data / Infra": ["PostgreSQL", "SQLite", "Firebase", "Redis", "Docker", "Supabase"],
  "DevOps / Quality": ["GitHub Actions", "EAS Build", "Vercel", "Render", "Prometheus", "Sentry", "Jest", "Vitest", "Playwright", "Maestro", "pytest"],
};

const projects = [
  {
    title: "ChicaFit",
    subtitle: "Personalized Fitness App for Latinas",
    tech: "React Native · Expo · TypeScript · Firebase",
    url: "https://github.com/hectorluisalamo/chicafit-showcase",
    stats: ["380 files", "71 screens", "1,913 tests", "App Store Submitted"],
    bullets: [
      "Architected offline-first mobile app with deterministic weekly plan generation, serving 400+ exercises and personalized meal plans",
      "Built platform-adaptive health data pipeline integrating Apple HealthKit and Google HealthConnect with encrypted storage",
      "Implemented trilingual support (EN/ES/PT) with 3,919 translations across 3 extraction layers using Lingui v5",
      "1,913 passing tests across 125 suites with CI/CD via GitHub Actions and EAS Build",
    ],
    icon: Dumbbell, highlight: true,
  },
  {
    title: "Latino RAG",
    subtitle: "Bilingual RAG Chatbot",
    tech: "FastAPI · pgvector · OpenAI · Redis · Docker",
    url: "https://github.com/hectorluisalamo/bilingual-rag",
    stats: ["R@1: 0.74", "R@5: 0.80", "Cross-encoder"],
    bullets: [
      "Smart routing: FAQ short-circuit → vector retrieval → cross-encoder reranking, achieving R@1 of 0.74 on 50-item gold set",
      "Chunking ablation framework testing 4 chunk/overlap variants for optimal R@1/R@5/latency trade-offs",
      "Freshness-aware retrieval with document versioning, language-filtered pgvector search, and Redis session memory",
    ],
    icon: Globe, highlight: true,
  },
  {
    title: "News Summarizer",
    subtitle: "NLP Article Analysis Pipeline",
    tech: "FastAPI · GPT · Fine-Tuned DistilBERT · PostgreSQL",
    url: "https://github.com/hectorluisalamo/summ-senter",
    stats: ["ROUGE-L", "BERTScore", "Macro-F1"],
    bullets: [
      "End-to-end NLP pipeline: extraction → language detection → translation (ES→EN) → summarization (GPT) → sentiment (fine-tuned DistilBERT)",
      "PostgreSQL caching (72h TTL) with per-request cost tracking and Prometheus observability",
      "Evaluation framework with ROUGE-L, BERTScore, and Macro-F1 on 50-article bilingual gold set",
    ],
    icon: FileText,
  },
    {
    title: "AI Recipe Recommender",
    subtitle: "Bilingual ML Recommendation System",
    tech: "FastAPI · PostgreSQL · pgvector · Docker",
    url: "https://github.com/hectorluisalamo",
    stats: ["MRR: 1.00", "p95: 32ms", "4 models"],
    bullets: [
      "Deployed 4-model ranking system (popularity → keyword → TF-IDF → semantic embeddings) with evaluation on bilingual gold set",
      "Multilingual semantic search using sentence-transformers + pgvector ANN indexing at p95 latency of 32ms",
      "Comprehensive evaluation framework with Precision@5, MRR, and latency benchmarks across all variants",
    ],
    icon: UtensilsCrossed, highlight: true,
  },
  {
    title: "Newsroom",
    subtitle: "Governed AI Publishing Pipeline",
    tech: "Python · Claude API · scikit-learn · Pydantic",
    url: "https://github.com/hectorluisalamo/newsroom",
    stats: ["116+ tests", "11 ADRs", "8-phase pipeline", "TDD"],
    bullets: [
      "Deterministic 8-phase pipeline separating algorithmic pitch generation (no LLM) from LLM-powered drafting with editorial gates",
      "Constitution-driven development with formal authority hierarchy, PRD-gated implementation, and 11 ADRs",
      "More test LOC than source LOC. Strict no-network testing policy",
    ],
    icon: Newspaper,
  },
  {
    title: "Palamo Dev Studio",
    subtitle: "Production Studio Website",
    tech: "Next.js 16 · TypeScript · Tailwind · Vercel",
    url: "https://www.palamostudio.com",
    stats: ["Lighthouse 98", "484 tests", "32 E2E", "Trilingual"],
    bullets: [
      "Production trilingual marketing site: Lighthouse 98/100/100/100 with deferred JS, code splitting, dynamic OG images",
      "484 unit/integration tests (Vitest) + 32 E2E tests (Playwright). n8n chat integration saving ~960KB initial payload",
    ],
    icon: Rocket,
  },
];

const experience = [
  {
    title: "Co-Founder & Lead Developer", company: "Palamo Dev Studio", period: "2025 – Present",
    bullets: [
      "Co-founded studio shipping AI-enabled, design-led mobile apps and web products",
      "Architect systems integrating LLM APIs, bilingual RAG, recommendation engines, and health data platforms",
      "Build mobile apps with 1,900+ tests, CI/CD via GitHub Actions, and App Store submissions",
      "Use AI tools (ChatGPT, Copilot, Cursor, Claude Code) within structured coding standards",
    ],
  },
  {
    title: "Writer, Editor & Digital Producer", company: "Various Media Organizations", period: "12+ Years",
    bullets: [
      "Led editorial strategy and content production at independent Latino media companies",
      "Managed cross-functional teams coordinating technical and creative workflows",
      "Applied analytical thinking to complex product initiatives. Strong documentation skills",
    ],
  },
];

const education = [
  { title: "B.A. History", inst: "University of Illinois at Chicago", topics: "Research, Critical Analysis, Academic Writing" },
  { title: "CS50: Data Science and Machine Learning", inst: "HarvardX (Certificate Earned)", topics: "Linear Regression, Logistic Regression, k-NN, Decision Trees, Random Forests, Data Wrangling, Pandas, scikit-learn, Model Evaluation" },
  { title: "CS50 AI: Computer Science for Artificial Intelligence", inst: "HarvardX (Certificate Earned)", topics: "Algorithms, Data Structures, SQL, Web Development, Search, Knowledge Representation, Optimization, Neural Networks, NLP, Reinforcement Learning" },
];

function useInView(th = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: th }); o.observe(el); return () => o.disconnect(); }, [th]);
  return [ref, v];
}

function FadeIn({ children, delay = 0, style = {}, from = "bottom" }) {
  const [ref, v] = useInView();
  const transforms = { bottom: "translateY(28px)", left: "translateX(-20px)" };
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : transforms[from], transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`, ...style }}>{children}</div>;
}

function WordFade({ text, style = {}, baseDelay = 0 }) {
  const [ref, visible] = useInView(0.1);
  const words = text.split(" ");
  return (
    <p ref={ref} style={style}>
      {words.map((word, i) => (
        <span key={i} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${baseDelay + i * 0.08}s` }}>{word} </span>
      ))}
    </p>
  );
}

function CountUp({ target, active, duration = 800 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active || target === 0) return;
    const start = performance.now();
    let frame;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);
  return val.toLocaleString();
}

function Pill({ name, visible = true, delay = 0 }) {
  const [h, setH] = useState(false);
  return <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
    display: "inline-block", padding: "5px 14px", margin: "3px", borderRadius: "999px", fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace", border: `1px solid ${h ? AG : DB}`, background: h ? `${A}22` : DC,
    color: h ? AG : TM, cursor: "default", transition: "all 0.3s",
    transform: h ? "translateY(-2px) scale(1.05)" : visible ? "none" : "translateY(8px)",
    opacity: visible ? 1 : 0, boxShadow: h ? `0 4px 12px ${A}33` : "none",
    transitionDelay: visible ? `${delay}s` : "0s",
  }}>{name}</span>;
}

function SkillCategory({ cat, items, delay }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{ marginBottom: "22px", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s` }}>
      <h3 style={{ fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", color: T, fontWeight: 600, marginBottom: "8px", letterSpacing: "0.04em" }}>{cat}</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{items.map((s, i) => <Pill key={s} name={s} visible={visible} delay={i * 0.04} />)}</div>
    </div>
  );
}

function StatBadge({ text }) {
  const [ref, visible] = useInView(0.5);
  const match = text.match(/^([\d,]+)(.*)/);
  const base = { display: "inline-block", padding: "3px 10px", margin: "2px", borderRadius: "6px", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", background: `${A}18`, color: AG, border: `1px solid ${A}33` };
  if (match) {
    const target = parseInt(match[1].replace(/,/g, ""), 10);
    return <span ref={ref} style={{ ...base, fontVariantNumeric: "tabular-nums" }}><CountUp target={target} active={visible} />{match[2]}</span>;
  }
  return <span ref={ref} style={base}>{text}</span>;
}

function ProjectCard({ project, index }) {
  const [h, setH] = useState(false);
  const [ex, setEx] = useState(false);
  const Icon = project.icon;
  return (
    <FadeIn delay={index * 0.08} style={{ flex: "1 1 300px", maxWidth: "100%" }}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
        background: DC, border: `1px solid ${h ? A : DB}`, borderRadius: "14px", padding: "24px",
        transition: "all 0.3s", transform: h ? "translateY(-3px)" : "none",
        boxShadow: h ? `0 10px 36px ${A}20, 0 0 20px ${A}10, inset 0 1px 0 ${A}15` : `0 2px 6px rgba(0,0,0,0.3)`,
        borderLeft: project.highlight ? `3px solid ${A}` : undefined, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-20px", right: "-10px", pointerEvents: "none" }}>
          <Icon size={120} strokeWidth={0.5} style={{ color: AG, opacity: 0.04 }} />
        </div>
        <div style={{ marginBottom: "6px", transition: "transform 0.3s ease", transform: h ? "rotate(-12deg) scale(1.15)" : "none", display: "inline-block" }}>
          <Icon size={28} strokeWidth={1.75} color={AG} />
        </div>
        <h3 style={{ fontSize: "17px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: T, margin: "0 0 2px" }}>{project.title}</h3>
        <p style={{ fontSize: "12px", color: TM, margin: "0 0 6px", fontStyle: "italic" }}>{project.subtitle}</p>
        <p style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: TD, margin: "0 0 10px" }}>{project.tech}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", marginBottom: "10px" }}>
          {project.stats.map((s, i) => <StatBadge key={i} text={s} />)}
        </div>
        <div style={{ maxHeight: ex ? "600px" : "0", overflow: "hidden", transition: "max-height 0.5s ease, opacity 0.3s ease", opacity: ex ? 1 : 0 }}>
          {project.bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "flex-start" }}>
              <span style={{ color: A, marginTop: "2px", fontSize: "7px", flexShrink: 0 }}>●</span>
              <span style={{ fontSize: "13px", color: TM, lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
          <a href={project.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "8px", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: AG, textDecoration: "none", borderBottom: `1px solid ${A}44` }}>
            View {project.url.includes("github") ? "GitHub" : "Live"} <ExternalLink size={12} />
          </a>
        </div>
        <button onClick={() => setEx(!ex)} aria-expanded={ex} style={{
          display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", padding: "4px 0", marginTop: "8px",
          cursor: "pointer", fontSize: "11px", color: TD, fontStyle: "italic", fontFamily: "'JetBrains Mono', monospace",
        }}>
          {ex ? "Collapse" : "Expand"}
          <ChevronDown size={14} style={{ transition: "transform 0.3s ease", transform: ex ? "rotate(180deg)" : "none" }} />
        </button>
      </div>
    </FadeIn>
  );
}

function NavDot({ label, id, active }) {
  const [h, setH] = useState(false);
  return (
    <a href={`#${id}`} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      onClick={e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}
      aria-label={`Navigate to ${label}`} aria-current={active ? "true" : undefined}
      style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", padding: "5px 0", cursor: "pointer" }}>
      <div style={{ width: active ? "12px" : "7px", height: active ? "12px" : "7px", borderRadius: "50%", background: active ? AG : (h ? A : TD), transition: "all 0.3s", boxShadow: active ? `0 0 10px ${AG}` : "none", animation: active ? "glowPulse 2s ease-in-out infinite" : "none" }} />
      <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: active ? AG : (h ? T : TD), opacity: h || active ? 1 : 0, transition: "all 0.3s", whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
    </a>
  );
}

function SL({ text }) { return <p style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: AG, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>{text}</p>; }
function ST({ text }) { return <h2 style={{ fontSize: "clamp(26px, 5vw, 38px)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, margin: "0 0 40px", color: T }}>{text}</h2>; }

const secs = [{ id: "hero", label: "Top" }, { id: "skills", label: "Skills" }, { id: "projects", label: "Projects" }, { id: "experience", label: "Experience" }, { id: "education", label: "Education" }, { id: "contact", label: "Contact" }];

export default function Resume() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const h = () => {
      const os = secs.map(s => { const el = document.getElementById(s.id); return el ? { id: s.id, top: el.offsetTop - 200 } : null; }).filter(Boolean);
      const c = os.filter(o => window.scrollY >= o.top);
      if (c.length) setActive(c[c.length - 1].id);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: D, color: T, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <nav aria-label="Section navigation" style={{ position: "fixed", right: "20px", top: "50%", transform: "translateY(-50%)", zIndex: 100, display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
        {secs.map(s => <NavDot key={s.id} label={s.label} id={s.id} active={active === s.id} />)}
      </nav>

      <main id="main-content">
        {/* HERO */}
        <section id="hero" aria-label="Introduction" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, ${A}12 0%, transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%, -50%)", animation: "float 8s ease-in-out infinite", pointerEvents: "none" }} />
          <FadeIn delay={0.1}><div style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: AG, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>Full Stack Engineer · AI/ML · Bilingual NLP</div></FadeIn>
          <FadeIn delay={0.2}><h1 style={{ fontSize: "clamp(40px, 8vw, 76px)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, margin: "0 0 12px", lineHeight: 1.05, letterSpacing: "-0.03em", background: `linear-gradient(135deg, ${T} 0%, ${AG} 50%, ${T} 100%)`, backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientShift 6s ease infinite" , whiteSpace: "nowrap" }}>Hector Luis Alamo</h1></FadeIn>
          <WordFade
            text="Building production-grade AI applications with measured outcomes. 8 deployed projects. 1,913 tests on flagship app. Bilingual RAG, ML recommendation systems, and fine-tuned NLP pipelines."
            style={{ fontSize: "17px", color: TM, maxWidth: "580px", lineHeight: 1.7, margin: "0 0 8px" }}
            baseDelay={0.4}
          />
          <FadeIn delay={0.5}>
            <p style={{ fontSize: "13px", color: TD, fontFamily: "'JetBrains Mono', monospace", margin: "0 0 32px" }}>Harvard CS50x + CS50 AI · Co-founder, Palamo Dev Studio</p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
              {[{ l: "GitHub", u: "https://github.com/hectorluisalamo", icon: Github }, { l: "LinkedIn", u: "https://www.linkedin.com/in/hector-luis-alamo-90432941/", icon: Linkedin }, { l: "Studio", u: "https://www.palamostudio.com", icon: Building2 }].map((x, i) => (
                <a key={i} href={x.u} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 22px", borderRadius: "999px", border: `1px solid ${A}`, color: AG, textDecoration: "none", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", transition: "all 0.3s", background: "transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${A}22`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "none"; }}>
                  <x.icon size={14} /> {x.l} <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </FadeIn>
          <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", opacity: 0.35, textAlign: "center" }}>
            <div style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: TD, letterSpacing: "0.15em", marginBottom: "6px" }}>SCROLL</div>
            <ChevronDown size={20} color={TD} style={{ animation: "bounce 2s ease-in-out infinite" }} />
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" aria-label="Technical Skills" style={{ padding: "90px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn><SL text="Technical Skills" /><ST text="What I Work With" /></FadeIn>
          {Object.entries(skills).map(([cat, items], ci) => (
            <SkillCategory key={cat} cat={cat} items={items} delay={ci * 0.06} />
          ))}
        </section>

        {/* PROJECTS */}
        <section id="projects" aria-label="Selected Projects" style={{ padding: "90px 24px", maxWidth: "1060px", margin: "0 auto" }}>
          <FadeIn><SL text="Selected Projects" /><ST text="What I've Built" /></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" aria-label="Professional Experience" style={{ padding: "90px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn><SL text="Professional Experience" /><ST text="Where I've Worked" /></FadeIn>
          {experience.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.12} from="left">
              <div style={{ position: "relative", paddingLeft: "24px", marginBottom: "40px", borderLeft: `2px solid ${i === 0 ? A : DB}` }}>
                <div style={{ position: "absolute", left: "-6px", top: "4px", width: "10px", height: "10px", borderRadius: "50%", background: i === 0 ? AG : DB, border: `2px solid ${D}`, boxShadow: i === 0 ? `0 0 10px ${A}66` : "none", animation: i === 0 ? "glowPulse 2s ease-in-out infinite" : "none" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px", marginBottom: "3px" }}>
                  <h3 style={{ fontSize: "17px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: T, margin: 0 }}>{exp.title}</h3>
                  <span style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: TD, fontStyle: "italic" }}>{exp.period}</span>
                </div>
                <p style={{ fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", color: TM, margin: "0 0 12px" }}>{exp.company}</p>
                {exp.bullets.map((b, bi) => (
                  <div key={bi} style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "flex-start" }}>
                    <span style={{ color: A, marginTop: "3px", fontSize: "7px", flexShrink: 0 }}>●</span>
                    <span style={{ fontSize: "14px", color: TM, lineHeight: 1.55 }}>{b}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </section>

        {/* EDUCATION */}
        <section id="education" aria-label="Education" style={{ padding: "70px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn><SL text="Education" /></FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "20px" }}>
            {education.map((ed, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: DC, border: `1px solid ${DB}`, borderRadius: "14px", padding: "22px", borderLeft: `3px solid ${A}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <GraduationCap size={20} color={A} />
                    <h3 style={{ fontSize: "16px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: T, margin: 0 }}>{ed.title}</h3>
                  </div>
                  <p style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: TM, margin: "0 0 8px" }}>{ed.inst}</p>
                  <p style={{ fontSize: "13px", color: TM, margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>{ed.topics}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-label="Contact" style={{ padding: "90px 24px 110px", textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${A}0C 0%, transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%, -50%)", animation: "float 9s ease-in-out infinite", pointerEvents: "none" }} />
          <FadeIn>
            <SL text="Let's Connect" />
            <h2 style={{ fontSize: "clamp(26px, 5vw, 42px)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, margin: "0 0 20px", color: T }}>Ready to Build Together?</h2>
            <p style={{ fontSize: "15px", color: TM, maxWidth: "480px", margin: "0 auto 32px", lineHeight: 1.7 }}>Open to full-stack engineering, AI/ML, and editorial or communications roles. Interested in agent systems, bilingual AI, and content strategy.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              {[{ l: "GitHub", u: "https://github.com/hectorluisalamo", primary: true, icon: Github }, { l: "LinkedIn", u: "https://www.linkedin.com/in/hector-luis-alamo-90432941/", icon: Linkedin }, { l: "Palamo Studio", u: "https://www.palamostudio.com", icon: Building2 }].map((x, i) => (
                <a key={i} href={x.u} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px", padding: "12px 28px", borderRadius: "999px",
                  background: x.primary ? `linear-gradient(135deg, ${A}, ${AG})` : "transparent",
                  border: `1px solid ${x.primary ? "transparent" : A}`, color: x.primary ? D : AG,
                  textDecoration: "none", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; if (x.primary) e.currentTarget.style.boxShadow = `0 6px 20px ${A}44`; else e.currentTarget.style.background = `${A}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; if (!x.primary) e.currentTarget.style.background = "transparent"; }}>
                  <x.icon size={14} /> {x.l} <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </FadeIn>
        </section>
      </main>

      <footer style={{ padding: "20px", textAlign: "center", borderTop: `1px solid ${DB}`, fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: TD }}>
        <address style={{ fontStyle: "normal", display: "inline" }}>Las Vegas, NV</address> · Hector Luis Alamo · {new Date().getFullYear()}
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${A}44; }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translate(0px, 0px); }
          33% { transform: translate(-50%, -50%) translate(12px, -8px); }
          66% { transform: translate(-50%, -50%) translate(-8px, 12px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 6px ${AG}66; }
          50% { box-shadow: 0 0 14px ${AG}AA; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }

        @media (max-width: 768px) { nav { display: none !important; } }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        a:focus-visible, button:focus-visible {
          outline: 2px solid ${AG};
          outline-offset: 2px;
        }

        .skip-link {
          position: absolute;
          top: -100%;
          left: 16px;
          padding: 8px 16px;
          background: ${A};
          color: ${T};
          border-radius: 0 0 8px 8px;
          z-index: 200;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          text-decoration: none;
          transition: top 0.2s;
        }
        .skip-link:focus { top: 0; }
      `}</style>
    </div>
  );
}
