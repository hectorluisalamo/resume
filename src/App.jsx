import { useState, useEffect, useRef } from "react";

const A = "#2E6DA4";
const AG = "#4A9EE0";
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
    icon: "💪", highlight: true,
  },
  {
    title: "AI Recipe Recommender",
    subtitle: "Bilingual ML Recommendation System",
    tech: "FastAPI · PostgreSQL · pgvector · Docker",
    url: "https://github.com/hectorluisalamo",
    stats: ["MRR: 1.00", "p95: 32ms", "4 models", "Live on Render"],
    bullets: [
      "Deployed 4-model ranking system (popularity → keyword → TF-IDF → semantic embeddings) with evaluation on bilingual gold set",
      "Multilingual semantic search using sentence-transformers + pgvector ANN indexing at p95 latency of 32ms",
      "Comprehensive evaluation framework with Precision@5, MRR, and latency benchmarks across all variants",
    ],
    icon: "🍽️", highlight: true,
  },
  {
    title: "Latino RAG",
    subtitle: "Bilingual RAG Chatbot",
    tech: "FastAPI · pgvector · OpenAI · Redis · Docker",
    url: "https://github.com/hectorluisalamo/bilingual-rag",
    stats: ["R@1: 0.74", "R@5: 0.80", "Cross-encoder", "Live on Render"],
    bullets: [
      "Smart routing: FAQ short-circuit → vector retrieval → cross-encoder reranking, achieving R@1 of 0.74 on 50-item gold set",
      "Chunking ablation framework testing 4 chunk/overlap variants for optimal R@1/R@5/latency trade-offs",
      "Freshness-aware retrieval with document versioning, language-filtered pgvector search, and Redis session memory",
    ],
    icon: "🌎", highlight: true,
  },
  {
    title: "News Summarizer",
    subtitle: "NLP Article Analysis Pipeline",
    tech: "FastAPI · GPT · Fine-Tuned DistilBERT · PostgreSQL",
    url: "https://github.com/hectorluisalamo/summ-senter",
    stats: ["ROUGE-L", "BERTScore", "Macro-F1", "Live on Render"],
    bullets: [
      "End-to-end NLP pipeline: extraction → language detection → translation (ES→EN) → summarization (GPT) → sentiment (fine-tuned DistilBERT)",
      "PostgreSQL caching (72h TTL) with per-request cost tracking and Prometheus observability",
      "Evaluation framework with ROUGE-L, BERTScore, and Macro-F1 on 50-article bilingual gold set",
    ],
    icon: "📊",
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
    icon: "📰",
  },
  {
    title: "Awesome Claude Subagents",
    subtitle: "Open-Source Agent Catalog",
    tech: "YAML · Claude Code · 126+ Agents",
    url: "https://github.com/hectorluisalamo",
    stats: ["126+ agents", "10 categories", "Model routing", "Open source"],
    bullets: [
      "Curated catalog of 126+ specialized AI coding agents with model-tier routing and granular tool permissions",
      "Agent format enabling independent context windows, domain-specific intelligence, and automated model selection",
    ],
    icon: "🤖",
  },
  {
    title: "VisionFlow",
    subtitle: "Intentional Goal-Setting App",
    tech: "React Native · Expo · Supabase · PostHog",
    url: "https://github.com/hectorluisalamo",
    stats: ["MVP complete", "Jotai state", "Magic link auth", "70% coverage"],
    bullets: [
      "Mobile goal-setting app with Jotai atom persistence, Supabase passwordless auth, and PostHog analytics",
      "Enforced UX constraints (max 3 daily priorities, 1-3 weekly items) as code-level invariants",
    ],
    icon: "🎯",
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
    icon: "🚀",
  },
];

const experience = [
  {
    title: "Co-Founder & Lead Developer", company: "Palamo Dev Studio", period: "2024 – Present",
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
  { title: "CS50: Introduction to Computer Science", inst: "HarvardX (Certificate Earned)", topics: "Algorithms, Data Structures, Databases, SQL, Flask, Software Engineering" },
  { title: "CS50 AI: Artificial Intelligence with Python", inst: "HarvardX (Certificate Earned)", topics: "Minimax, Bayesian Networks, NLP, PageRank, Neural Networks, Attention Mechanisms" },
];

function useInView(th = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: th }); o.observe(el); return () => o.disconnect(); }, [th]);
  return [ref, v];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(28px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`, ...style }}>{children}</div>;
}

function Pill({ name }) {
  const [h, setH] = useState(false);
  return <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
    display: "inline-block", padding: "5px 14px", margin: "3px", borderRadius: "999px", fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace", border: `1px solid ${h ? AG : DB}`, background: h ? `${A}22` : DC,
    color: h ? AG : TM, cursor: "default", transition: "all 0.3s", transform: h ? "translateY(-1px)" : "none",
  }}>{name}</span>;
}

function StatBadge({ text }) {
  return <span style={{ display: "inline-block", padding: "3px 10px", margin: "2px", borderRadius: "6px", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", background: `${A}18`, color: AG, border: `1px solid ${A}33` }}>{text}</span>;
}

function ProjectCard({ project, index }) {
  const [h, setH] = useState(false);
  const [ex, setEx] = useState(false);
  return (
    <FadeIn delay={index * 0.08} style={{ flex: "1 1 300px", maxWidth: "100%" }}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={() => setEx(!ex)} style={{
        background: DC, border: `1px solid ${h ? A : DB}`, borderRadius: "14px", padding: "24px", cursor: "pointer",
        transition: "all 0.3s", transform: h ? "translateY(-3px)" : "none",
        boxShadow: h ? `0 10px 36px ${A}20` : `0 2px 6px rgba(0,0,0,0.3)`,
        borderLeft: project.highlight ? `3px solid ${AG}` : undefined, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-20px", right: "-10px", fontSize: "72px", opacity: 0.05, pointerEvents: "none" }}>{project.icon}</div>
        <div style={{ fontSize: "24px", marginBottom: "6px" }}>{project.icon}</div>
        <h3 style={{ fontSize: "17px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: T, margin: "0 0 2px" }}>{project.title}</h3>
        <p style={{ fontSize: "12px", color: TM, margin: "0 0 6px", fontStyle: "italic" }}>{project.subtitle}</p>
        <p style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: AG, margin: "0 0 10px" }}>{project.tech}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", marginBottom: "10px" }}>
          {project.stats.map((s, i) => <StatBadge key={i} text={s} />)}
        </div>
        <div style={{ maxHeight: ex ? "600px" : "0", overflow: "hidden", transition: "max-height 0.5s ease" }}>
          {project.bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "flex-start" }}>
              <span style={{ color: AG, marginTop: "2px", fontSize: "7px", flexShrink: 0 }}>●</span>
              <span style={{ fontSize: "13px", color: TM, lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
          <a href={project.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            style={{ display: "inline-block", marginTop: "8px", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: AG, textDecoration: "none", borderBottom: `1px solid ${A}44` }}>
            View {project.url.includes("github") ? "GitHub" : "Live"} ↗
          </a>
        </div>
        <div style={{ fontSize: "11px", color: TD, marginTop: "4px", fontStyle: "italic" }}>{ex ? "Click to collapse" : "Click to expand →"}</div>
      </div>
    </FadeIn>
  );
}

function NavDot({ label, id, active }) {
  const [h, setH] = useState(false);
  return (
    <a href={`#${id}`} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      onClick={e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}
      style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", padding: "5px 0", cursor: "pointer" }}>
      <div style={{ width: active ? "12px" : "7px", height: active ? "12px" : "7px", borderRadius: "50%", background: active ? AG : (h ? A : TD), transition: "all 0.3s", boxShadow: active ? `0 0 10px ${AG}` : "none" }} />
      <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: active ? AG : (h ? T : TD), opacity: h || active ? 1 : 0, transition: "all 0.3s", whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
    </a>
  );
}

function SL({ text }) { return <h2 style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: AG, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>{text}</h2>; }
function ST({ text }) { return <h3 style={{ fontSize: "clamp(26px, 5vw, 38px)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, margin: "0 0 40px", color: T }}>{text}</h3>; }

export default function Resume() {
  const [active, setActive] = useState("hero");
  const [sy, setSy] = useState(0);
  const secs = [{ id: "hero", label: "Top" }, { id: "skills", label: "Skills" }, { id: "projects", label: "Projects" }, { id: "experience", label: "Experience" }, { id: "education", label: "Education" }, { id: "contact", label: "Contact" }];

  useEffect(() => {
    const h = () => {
      setSy(window.scrollY);
      const os = secs.map(s => { const el = document.getElementById(s.id); return el ? { id: s.id, top: el.offsetTop - 200 } : null; }).filter(Boolean);
      const c = os.filter(o => window.scrollY >= o.top);
      if (c.length) setActive(c[c.length - 1].id);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: D, color: T, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <nav style={{ position: "fixed", right: "20px", top: "50%", transform: "translateY(-50%)", zIndex: 100, display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
        {secs.map(s => <NavDot key={s.id} label={s.label} id={s.id} active={active === s.id} />)}
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, ${A}12 0%, transparent 70%)`, top: "50%", left: "50%", transform: `translate(-50%, -50%) translate(${Math.sin(sy * 0.002) * 15}px, ${Math.cos(sy * 0.002) * 15}px)`, pointerEvents: "none" }} />
        <FadeIn delay={0.1}><div style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: AG, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>Full Stack Engineer · AI/ML · Bilingual NLP</div></FadeIn>
        <FadeIn delay={0.2}><h1 style={{ fontSize: "clamp(40px, 8vw, 76px)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, margin: "0 0 12px", lineHeight: 1.05, letterSpacing: "-0.03em", background: `linear-gradient(135deg, ${T} 0%, ${AG} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hector Luis<br />Alamo</h1></FadeIn>
        <FadeIn delay={0.35}>
          <p style={{ fontSize: "17px", color: TM, maxWidth: "580px", lineHeight: 1.7, margin: "0 0 8px" }}>Building production-grade AI applications with measured outcomes. 8 deployed projects. 1,913 tests on flagship app. Bilingual RAG, ML recommendation systems, and fine-tuned NLP pipelines.</p>
          <p style={{ fontSize: "13px", color: TD, fontFamily: "'JetBrains Mono', monospace", margin: "0 0 32px" }}>Harvard CS50x + CS50 AI · Co-founder, Palamo Dev Studio</p>
        </FadeIn>
        <FadeIn delay={0.5}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
            {[{ l: "GitHub", u: "https://github.com/hectorluisalamo" }, { l: "LinkedIn", u: "https://linkedin.com/in/hector-luis-alamo" }, { l: "Studio", u: "https://www.palamostudio.com" }].map((x, i) => (
              <a key={i} href={x.u} target="_blank" rel="noopener noreferrer" style={{ padding: "10px 22px", borderRadius: "999px", border: `1px solid ${A}`, color: AG, textDecoration: "none", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", transition: "all 0.3s", background: "transparent" }}
                onMouseEnter={e => { e.currentTarget.style.background = `${A}22`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "none"; }}>{x.l} ↗</a>
            ))}
          </div>
        </FadeIn>
        <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", opacity: 0.35 }}>
          <div style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: TD, letterSpacing: "0.15em", marginBottom: "6px", textAlign: "center" }}>SCROLL</div>
          <div style={{ width: "1px", height: "28px", margin: "0 auto", background: `linear-gradient(to bottom, ${TD}, transparent)`, animation: "pulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "90px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <FadeIn><SL text="Technical Skills" /><ST text="What I Work With" /></FadeIn>
        {Object.entries(skills).map(([cat, items], ci) => (
          <FadeIn key={cat} delay={ci * 0.06}>
            <div style={{ marginBottom: "22px" }}>
              <h4 style={{ fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", color: T, fontWeight: 600, marginBottom: "8px", letterSpacing: "0.04em" }}>{cat}</h4>
              <div style={{ display: "flex", flexWrap: "wrap" }}>{items.map(s => <Pill key={s} name={s} />)}</div>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "90px 24px", maxWidth: "1060px", margin: "0 auto" }}>
        <FadeIn><SL text="Selected Projects" /><ST text="What I've Built" /></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "90px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <FadeIn><SL text="Professional Experience" /><ST text="Where I've Worked" /></FadeIn>
        {experience.map((exp, i) => (
          <FadeIn key={i} delay={i * 0.12}>
            <div style={{ position: "relative", paddingLeft: "24px", marginBottom: "40px", borderLeft: `2px solid ${i === 0 ? A : DB}` }}>
              <div style={{ position: "absolute", left: "-6px", top: "4px", width: "10px", height: "10px", borderRadius: "50%", background: i === 0 ? AG : DB, border: `2px solid ${D}`, boxShadow: i === 0 ? `0 0 10px ${A}66` : "none" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px", marginBottom: "3px" }}>
                <h4 style={{ fontSize: "17px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: T, margin: 0 }}>{exp.title}</h4>
                <span style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: TD, fontStyle: "italic" }}>{exp.period}</span>
              </div>
              <p style={{ fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", color: AG, margin: "0 0 12px" }}>{exp.company}</p>
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
      <section id="education" style={{ padding: "70px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <FadeIn><SL text="Education" /></FadeIn>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "20px" }}>
          {education.map((ed, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: DC, border: `1px solid ${DB}`, borderRadius: "14px", padding: "22px", borderLeft: `3px solid ${AG}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "18px" }}>🎓</span>
                  <h4 style={{ fontSize: "16px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: T, margin: 0 }}>{ed.title}</h4>
                </div>
                <p style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: AG, margin: "0 0 8px" }}>{ed.inst}</p>
                <p style={{ fontSize: "13px", color: TM, margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>{ed.topics}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "90px 24px 110px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${A}0C 0%, transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
        <FadeIn>
          <SL text="Let's Connect" />
          <h3 style={{ fontSize: "clamp(26px, 5vw, 42px)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, margin: "0 0 20px", color: T }}>Ready to Build Together?</h3>
          <p style={{ fontSize: "15px", color: TM, maxWidth: "480px", margin: "0 auto 32px", lineHeight: 1.7 }}>Open to full-stack and AI engineering roles. Interested in agent systems, bilingual AI, recommendation engines, and production ML workflows.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {[{ l: "GitHub", u: "https://github.com/hectorluisalamo", primary: true }, { l: "LinkedIn", u: "https://linkedin.com/in/hector-luis-alamo" }, { l: "Palamo Studio", u: "https://www.palamostudio.com" }].map((x, i) => (
              <a key={i} href={x.u} target="_blank" rel="noopener noreferrer" style={{
                padding: "12px 28px", borderRadius: "999px", background: x.primary ? A : "transparent",
                border: `1px solid ${A}`, color: x.primary ? "#fff" : AG, textDecoration: "none", fontSize: "13px",
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; if (x.primary) e.currentTarget.style.background = AG; else e.currentTarget.style.background = `${A}22`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; if (x.primary) e.currentTarget.style.background = A; else e.currentTarget.style.background = "transparent"; }}>
                {x.l} ↗
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      <footer style={{ padding: "20px", textAlign: "center", borderTop: `1px solid ${DB}`, fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: TD }}>Las Vegas, NV · Hector Luis Alamo · 2025</footer>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } html { scroll-behavior: smooth; } @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } } ::selection { background: ${A}44; } @media (max-width: 768px) { nav { display: none !important; } }`}</style>
    </div>
  );
}
