import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImg from "./assets/prof.jpg";
import STYLES from "./styles";


/* ─── HELPERS ───────────────────────────────────────────────────── */
function R({ children, className, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22,1,0.36,1] }}>
      {children}
    </motion.div>
  );
}

function Words({ text, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <motion.span key={i} style={{ display:"inline-block", marginRight:"0.28em" }}
          initial={{ opacity:0, y:18, filter:"blur(5px)" }}
          animate={inView ? { opacity:1, y:0, filter:"blur(0px)" } : {}}
          transition={{ duration:0.48, delay:delay+i*0.055, ease:[0.22,1,0.36,1] }}>
          {w}
        </motion.span>
      ))}
    </div>
  );
}

function Mag({ children, className, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x,{stiffness:220,damping:18});
  const sy = useSpring(y,{stiffness:220,damping:18});
  const move  = e => { const r=ref.current.getBoundingClientRect(); x.set((e.clientX-r.left-r.width/2)*0.3); y.set((e.clientY-r.top-r.height/2)*0.3); };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.button ref={ref} className={className} style={{ x:sx, y:sy, border:"none" }}
      onMouseMove={move} onMouseLeave={leave} onClick={onClick}>
      {children}
    </motion.button>
  );
}

/* ─── COMPONENT ─────────────────────────────────────────────────── */
export default function En() {
  const navigate = useNavigate();
  const [menu, setMenu]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => { if (window.scrollY > 80) setScrolled(true); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  return (
    <>
      <style>{STYLES}</style>

      {/* ── NAV ── */}
      <motion.nav className="nav"
        initial={{ y:-60, opacity:0 }} animate={{ y:0, opacity:1 }}
        transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>
        <div className="nav-logo">Julian<span>.</span>dev</div>
        <div className="nav-right">
          <ul className="nav-links">
            <li><button className="nav-pill" onClick={() => scrollTo("about")}>About</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("skills")}>Skills</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("projects")}>Projects</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("research")}>Research</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("summaries")}>Summaries</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("experience")}>Experience</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("contact")}>Contact</button></li>
          </ul>
          <button className="lang-btn" onClick={() => navigate("/")}>
            <span className="lang-flag">🇳🇱</span> NL
          </button>
          <button className={`hamburger${menu ? " open" : ""}`} onClick={() => setMenu(m => !m)}>
            <span/><span/><span/>
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menu && (
          <motion.div className="mobile-menu"
            initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-12 }} transition={{ duration:0.25, ease:[0.22,1,0.36,1] }}>
            <button className="mobile-pill" onClick={() => scrollTo("about")}>About</button>
            <button className="mobile-pill" onClick={() => scrollTo("skills")}>Skills</button>
            <button className="mobile-pill" onClick={() => scrollTo("projects")}>Projects</button>
            <button className="mobile-pill" onClick={() => scrollTo("research")}>Research</button>
            <button className="mobile-pill" onClick={() => scrollTo("summaries")}>Summaries</button>
            <button className="mobile-pill" onClick={() => scrollTo("experience")}>Experience</button>
            <button className="mobile-pill" onClick={() => scrollTo("contact")}>Contact</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg"/>
        <div className="hero-inner">

          <div className="hero-text">
            <motion.div className="hero-badge"
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}}>
              <span className="bdot"/> MSc Computing Science · Rijksuniversiteit Groningen
            </motion.div>
            <Words text="Julian" className="hero-name" delay={0.15}/>
            <motion.p className="hero-sub"
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.35,duration:0.55}}>
              Software Engineer &amp; <strong>Distributed Systems</strong> Researcher
            </motion.p>
            <motion.p className="hero-desc"
              initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.44,duration:0.55}}>
              Specialising in <strong>fault-tolerant infrastructure</strong> and <strong>consensus protocols</strong>. Focused on adaptive quorum systems and the gap between theoretical guarantees and production reality.
            </motion.p>
            <motion.div className="hero-cta"
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.56,duration:0.5}}>
              <Mag className="btn-p" onClick={() => scrollTo("about")}>About Me</Mag>
              <Mag className="btn-g" onClick={() => scrollTo("research")}>Research Papers</Mag>
              <Mag className="btn-g" onClick={() => scrollTo("summaries")}>Summaries</Mag>
            </motion.div>
          </div>

          <motion.div className="hero-photo"
            initial={{opacity:0,x:28}} animate={{opacity:1,x:0}}
            transition={{delay:0.28,duration:0.8,ease:[0.22,1,0.36,1]}}>
            <div className="hero-photo-in">
              <img src={heroImg} alt="Julian"/>
            </div>
          </motion.div>

        </div>
        <AnimatePresence>
          {!scrolled && (
            <motion.div className="scroll-hint"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              transition={{delay:1.2,duration:0.6}}>
              <span>Scroll to explore</span>
              <div className="scroll-arrow"/>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── ABOUT ── */}
      <div className="s-divider"/>
      <section className="section" id="about">
        <div className="section-inner">
          <R><p className="s-label">01 / About</p></R>
          <Words text="Who I Am" className="s-heading" delay={0.05}/>
          <R delay={0.1}>
            <div className="about-layout">
              <div className="about-text">
                <p>
                  I am Julian Vandermeer, a postgraduate student in Computing Science at the <strong>University of Edinburgh</strong>, specialising in software engineering and distributed systems.
                </p>
                <p>
                  My research centres on <strong>consensus protocols</strong> — the mechanisms by which distributed systems reach agreement under network partitions and node failures.
                </p>
                <p>
                  Prior to Edinburgh, I completed a First Class BSc at the <strong>University of Amsterdam</strong> and held engineering roles at <strong>Cloudflare</strong> and <strong>Catawiki</strong>.
                </p>
              </div>
              <div className="about-stats">
                <R delay={0.00}><div className="stat-b"><div className="stat-n">4+</div><div className="stat-l">Years of Engineering</div></div></R>
                <R delay={0.08}><div className="stat-b"><div className="stat-n">12</div><div className="stat-l">Projects Shipped</div></div></R>
                <R delay={0.16}><div className="stat-b"><div className="stat-n">3</div><div className="stat-l">Industry Roles</div></div></R>
                <R delay={0.24}><div className="stat-b"><div className="stat-n">2</div><div className="stat-l">Pending Publications</div></div></R>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <div className="s-divider"/>
      <section className="section" id="skills">
        <div className="section-inner">
          <R><p className="s-label">02 / Skills</p></R>
          <Words text="Technical Expertise" className="s-heading" delay={0.05}/>
          <div className="skills-grid">
            <R delay={0.00}><div className="skill-card"><div className="skill-top"><div className="skill-name">Languages</div><span className="skill-cat">Core</span></div><div className="skill-tags"><span className="skill-tag">Go</span><span className="skill-tag">Rust</span><span className="skill-tag">TypeScript</span><span className="skill-tag">Python</span><span className="skill-tag">C++</span></div></div></R>
            <R delay={0.06}><div className="skill-card"><div className="skill-top"><div className="skill-name">Distributed Systems</div><span className="skill-cat">Specialisation</span></div><div className="skill-tags"><span className="skill-tag">Raft</span><span className="skill-tag">Kafka</span><span className="skill-tag">gRPC</span><span className="skill-tag">etcd</span><span className="skill-tag">ZooKeeper</span></div></div></R>
            <R delay={0.12}><div className="skill-card"><div className="skill-top"><div className="skill-name">Cloud &amp; Infra</div><span className="skill-cat">Operations</span></div><div className="skill-tags"><span className="skill-tag">Kubernetes</span><span className="skill-tag">Docker</span><span className="skill-tag">AWS</span><span className="skill-tag">Terraform</span></div></div></R>
            <R delay={0.18}><div className="skill-card"><div className="skill-top"><div className="skill-name">Databases</div><span className="skill-cat">Storage</span></div><div className="skill-tags"><span className="skill-tag">PostgreSQL</span><span className="skill-tag">CockroachDB</span><span className="skill-tag">Cassandra</span><span className="skill-tag">ClickHouse</span></div></div></R>
            <R delay={0.24}><div className="skill-card"><div className="skill-top"><div className="skill-name">Backend Engineering</div><span className="skill-cat">Architecture</span></div><div className="skill-tags"><span className="skill-tag">REST</span><span className="skill-tag">GraphQL</span><span className="skill-tag">WebSockets</span><span className="skill-tag">Microservices</span></div></div></R>
            <R delay={0.30}><div className="skill-card"><div className="skill-top"><div className="skill-name">Research</div><span className="skill-cat">Academia</span></div><div className="skill-tags"><span className="skill-tag">Consensus Algorithms</span><span className="skill-tag">CAP Theorem</span><span className="skill-tag">CRDTs</span><span className="skill-tag">TLA+</span></div></div></R>
          </div>
          {/* ── YOUTUBE ── */}
            <R delay={0.4}>
            <div className="yt-card">
                <div className="yt-left">
                <div className="yt-header">
                    <div className="yt-icon">▶</div>
                    <div className="yt-title-block">
                    <div className="yt-title">YouTube Content Creator</div>
                    <div className="yt-sub-label">Since 2019 · Technology & Engineering</div>
                    </div>
                </div>
                <p className="yt-desc">
                    Alongside my academic work I run a YouTube channel focused on software engineering, distributed systems, and computer science concepts. Creating content has sharpened my ability to distil complex technical topics into clear, structured explanations — a skill that directly informs how I write research summaries and present findings.
                </p>
                <div className="yt-tags">
                    <span className="yt-tag">Video Editing</span>
                    <span className="yt-tag">Premiere Pro</span>
                    <span className="yt-tag">After Effects</span>
                    <span className="yt-tag">Scripting</span>
                    <span className="yt-tag">Thumbnail Design</span>
                    <span className="yt-tag">SEO & Analytics</span>
                    <span className="yt-tag">Audience Retention</span>
                </div>
                </div>
                <div className="yt-stats">
                <div className="yt-stat"><div className="yt-stat-n">43K</div><div className="yt-stat-l">Subscribers</div></div>
                <div className="yt-stat"><div className="yt-stat-n">150+</div><div className="yt-stat-l">Videos</div></div>
                <div className="yt-stat"><div className="yt-stat-n">2+</div><div className="yt-stat-l">Years Active</div></div>
                <div className="yt-stat"><div className="yt-stat-n">10M+</div><div className="yt-stat-l">Total Views</div></div>
                </div>
            </div>
            </R>
            {/* ── TEACHING ── */}
            <R delay={0.5}>
            <div className="teach-card">
                <div className="teach-left">
                <div className="teach-header">
                    <div className="teach-icon">✏</div>
                    <div>
                    <div className="teach-title">Teacher & Tutor</div>
                    <div className="teach-sub-label">Homework Guidance Institute · 4.5 Years</div>
                    </div>
                </div>
                <p className="teach-desc">
                    For four and a half years I worked as a teacher and tutor at a homework guidance institute, supporting secondary school students across a range of subjects including mathematics, physics, and computer science. The role developed my ability to identify individual learning gaps, adapt explanations on the fly, and maintain patience and clarity under pressure — competencies that translate directly into research communication and technical mentorship.
                </p>
                <div className="teach-tags">
                    <span className="teach-tag">Mathematics</span>
                    <span className="teach-tag">Physics</span>
                    <span className="teach-tag">Computer Science</span>
                    <span className="teach-tag">Curriculum Planning</span>
                    <span className="teach-tag">1-on-1 Coaching</span>
                    <span className="teach-tag">Group Sessions</span>
                    <span className="teach-tag">Progress Tracking</span>
                </div>
                </div>
                <div className="teach-stats">
                <div className="teach-stat"><div className="teach-stat-n">4.5</div><div className="teach-stat-l">Years</div></div>
                <div className="teach-stat"><div className="teach-stat-n">100+</div><div className="teach-stat-l">Students</div></div>
                <div className="teach-stat"><div className="teach-stat-n">3</div><div className="teach-stat-l">Subjects</div></div>
                <div className="teach-stat"><div className="teach-stat-n">VO</div><div className="teach-stat-l">Education Level</div></div>
                </div>
            </div>
            </R>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <div className="s-divider"/>
      <section className="section" id="projects">
        <div className="section-inner">
          <R><p className="s-label">03 / Projects</p></R>
          <Words text="Selected Work" className="s-heading" delay={0.05}/>
          <div className="projects-grid">

            <R delay={0.00}>
              <div className="proj-card feat">
                <div className="proj-head">
                  <span className="proj-name">DistributeDB</span>
                  <div className="proj-links"><a href="#" className="proj-link">GitHub ↗</a><a href="#" className="proj-link">Demo ↗</a></div>
                </div>
                <p className="proj-desc">A distributed key-value store built from first principles using the Raft consensus algorithm, supporting linearizable reads, leader election, and log compaction across multi-node clusters.</p>
                <div className="proj-tags"><span className="proj-tag">Go</span><span className="proj-tag">Raft</span><span className="proj-tag">gRPC</span><span className="proj-tag">etcd</span></div>
              </div>
            </R>

            <R delay={0.07}>
              <div className="proj-card">
                <div className="proj-head">
                  <span className="proj-name">StreamMesh</span>
                  <div className="proj-links"><a href="#" className="proj-link">GitHub ↗</a><a href="#" className="proj-link">Demo ↗</a></div>
                </div>
                <p className="proj-desc">Event-driven microservices orchestration layer with Kafka-backed message routing, dead-letter queues, and automatic retry semantics.</p>
                <div className="proj-tags"><span className="proj-tag">Rust</span><span className="proj-tag">Kafka</span><span className="proj-tag">Docker</span><span className="proj-tag">Kubernetes</span></div>
              </div>
            </R>

            <R delay={0.14}>
              <div className="proj-card">
                <div className="proj-head">
                  <span className="proj-name">CloudTrace</span>
                  <div className="proj-links"><a href="#" className="proj-link">GitHub ↗</a><a href="#" className="proj-link">Demo ↗</a></div>
                </div>
                <p className="proj-desc">Distributed tracing tool for containerised environments with OpenTelemetry integration and a real-time analytical dashboard.</p>
                <div className="proj-tags"><span className="proj-tag">TypeScript</span><span className="proj-tag">OpenTelemetry</span><span className="proj-tag">React</span><span className="proj-tag">ClickHouse</span></div>
              </div>
            </R>

            <R delay={0.21}>
              <div className="proj-card">
                <div className="proj-head">
                  <span className="proj-name">SchedSim</span>
                  <div className="proj-links"><a href="#" className="proj-link">GitHub ↗</a><a href="#" className="proj-link">Demo ↗</a></div>
                </div>
                <p className="proj-desc">Discrete-event simulator for evaluating job scheduling algorithms across heterogeneous distributed compute cluster topologies.</p>
                <div className="proj-tags"><span className="proj-tag">Python</span><span className="proj-tag">SimPy</span><span className="proj-tag">NumPy</span><span className="proj-tag">Matplotlib</span></div>
              </div>
            </R>

          </div>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <div className="s-divider"/>
      <section className="section" id="research">
        <div className="section-inner">
          <R><p className="s-label">04 / Research</p></R>
          <Words text="Academic Papers" className="s-heading" delay={0.05}/>
          <div className="papers-list">

            <R delay={0.00}>
              <div className="paper-card">
                <div>
                  <div className="pmeta"><span className="pyear">2025</span><span className="pvenue">EuroSys '25</span><span className="pstatus">Under Review</span></div>
                  <div className="ptitle">Adaptive Quorum Sizing in Geo-Distributed Raft Clusters Under Partial Failure</div>
                  <div className="pauthors"><span className="me">Julian V.</span>, A. Harrington, P. Müller</div>
                  <p className="pabstract">We propose a dynamic quorum reconfiguration mechanism for Raft-based systems that adapts quorum size at runtime based on observed network partition patterns, reducing tail latency by up to 34% without sacrificing linearizability guarantees.</p>
                </div>
                <div className="plinks"><a href="#" className="plink">Preprint ↗</a><a href="#" className="plink">Slides ↗</a></div>
              </div>
            </R>

            <R delay={0.09}>
              <div className="paper-card">
                <div>
                  <div className="pmeta"><span className="pyear">2024</span><span className="pvenue">MSc Thesis</span></div>
                  <div className="ptitle">Fault-Tolerant State Machine Replication: A Comparative Analysis of Raft, Multi-Paxos, and EPaxos</div>
                  <div className="pauthors"><span className="me">Julian V.</span></div>
                  <p className="pabstract">A rigorous empirical comparison of three consensus protocols under diverse failure injection scenarios — evaluated across homogeneous and heterogeneous cluster configurations.</p>
                </div>
                <div className="plinks"><a href="#" className="plink">PDF ↗</a><a href="#" className="plink">Code ↗</a></div>
              </div>
            </R>

            <R delay={0.18}>
              <div className="paper-card">
                <div>
                  <div className="pmeta"><span className="pyear">2023</span><span className="pvenue">ICDE '23</span></div>
                  <div className="ptitle">Towards Predictive Load Balancing in Heterogeneous Cloud Storage Systems</div>
                  <div className="pauthors">A. Harrington, <span className="me">Julian V.</span>, S. de Vries</div>
                  <p className="pabstract">A machine-learning-assisted load balancer leveraging historical access pattern embeddings to anticipate hotspot formation, outperforming static baselines by 21% on throughput.</p>
                </div>
                <div className="plinks"><a href="#" className="plink">PDF ↗</a><a href="#" className="plink">Poster ↗</a></div>
              </div>
            </R>

          </div>
        </div>
      </section>

      {/* ── SUMMARIES ── */}
      <div className="s-divider"/>
      <section className="section" id="summaries">
        <div className="section-inner">
          <R><p className="s-label">05 / Summaries</p></R>
          <Words text="Research Summaries" className="s-heading" delay={0.05}/>
          <R delay={0.1}><p className="sum-intro">Accessible accounts of my research outputs for a technically informed but non-specialist readership.</p></R>
          <div className="sum-grid">

            <R delay={0.00}>
              <div className="sum-card">
                <div className="sum-head"><div className="sum-title">Adaptive Quorum Sizing in Geo-Distributed Raft Clusters</div><span className="sum-tag">Consensus</span></div>
                <div className="sum-origin">EuroSys '25</div>
                <p className="sum-body">Rather than fixing quorum size at initialisation, nodes vote to reconfigure dynamically based on real-time partition telemetry — preserving safety while reducing tail latency.</p>
                <a href="#" className="sum-read">Read in full →</a>
              </div>
            </R>

            <R delay={0.08}>
              <div className="sum-card">
                <div className="sum-head"><div className="sum-title">Comparing Raft, Multi-Paxos and EPaxos Under Failure Injection</div><span className="sum-tag">Fault Tolerance</span></div>
                <div className="sum-origin">MSc Thesis — 2024</div>
                <p className="sum-body">EPaxos shows superior throughput in wide-area networks, but Raft's implementation simplicity yields better correctness during recovery.</p>
                <a href="#" className="sum-read">Read in full →</a>
              </div>
            </R>

            <R delay={0.16}>
              <div className="sum-card">
                <div className="sum-head"><div className="sum-title">Predictive Load Balancing via Access Pattern Embeddings</div><span className="sum-tag">Cloud Storage</span></div>
                <div className="sum-origin">ICDE '23 Workshop</div>
                <p className="sum-body">Lightweight ML embeddings anticipate access skew 10–30 seconds in advance, giving the scheduler time for proactive rebalancing.</p>
                <a href="#" className="sum-read">Read in full →</a>
              </div>
            </R>

            <R delay={0.24}>
              <div className="sum-card">
                <div className="sum-head"><div className="sum-title">Why Raft Leader Elections Are Harder Than They Appear</div><span className="sum-tag">Engineering</span></div>
                <div className="sum-origin">Technical Essay — 2025</div>
                <p className="sum-body">Randomised election timeouts interact poorly with real-world jitter, asymmetric delay, and GC pauses — concerns critical in production.</p>
                <a href="#" className="sum-read">Read in full →</a>
              </div>
            </R>

          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <div className="s-divider"/>
      <section className="section" id="experience">
        <div className="section-inner">
          <R><p className="s-label">06 / Background</p></R>
          <Words text="Education & Experience" className="s-heading" delay={0.05}/>
          <div className="tl-cols">

            <R>
              <div className="tl-head">Education</div>
              <div className="tl-item">
                <div className="tl-date">2023 – Present</div>
                <div className="tl-body">
                  <div className="tl-title">MSc Computing Science</div>
                  <div className="tl-place">University of Edinburgh</div>
                  <p className="tl-desc">Specialising in Software Engineering &amp; Distributed Systems. Research on consensus protocols and fault-tolerant system design. Expected 2025.</p>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-date">2019 – 2023</div>
                <div className="tl-body">
                  <div className="tl-title">BSc Computer Science</div>
                  <div className="tl-place">University of Amsterdam</div>
                  <p className="tl-desc">First Class Honours. Dissertation on load balancing in heterogeneous cloud environments. Dean's List 2022 &amp; 2023.</p>
                </div>
              </div>
            </R>

            <R>
              <div className="tl-head">Professional Experience</div>
              <div className="tl-item">
                <div className="tl-date">Summer 2024</div>
                <div className="tl-body">
                  <div className="tl-title">Software Engineering Intern</div>
                  <div className="tl-place">Cloudflare · London</div>
                  <p className="tl-desc">Contributed to the Workers KV distributed storage layer, improving cache invalidation latency by 18%.</p>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-date">2022 – 2023</div>
                <div className="tl-body">
                  <div className="tl-title">Backend Engineer (Part-time)</div>
                  <div className="tl-place">Catawiki · Amsterdam</div>
                  <p className="tl-desc">Designed event-driven auction pipelines handling 40k+ transactions/day at sub-100ms p99 using Kafka and Go.</p>
                </div>
              </div>
            </R>

          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <div className="s-divider"/>
      <section className="section" id="contact">
        <div className="section-inner">
          <R><p className="s-label">07 / Contact</p></R>
          <Words text="Get in Touch" className="s-heading" delay={0.05}/>
          <div className="contact-layout">
            <R delay={0.1}>
              <p className="contact-intro">
                I welcome enquiries relating to <strong>research collaboration</strong>, <strong>internship opportunities</strong>, or general correspondence.
              </p>
              <div className="contact-rows">
                <a href="mailto:julian@example.com" className="c-row"><span className="c-lbl">Email</span><span className="c-val">julian@example.com</span></a>
                <a href="https://github.com/julian" className="c-row"><span className="c-lbl">GitHub</span><span className="c-val">github.com/julian</span></a>
                <a href="https://linkedin.com/in/julian" className="c-row"><span className="c-lbl">LinkedIn</span><span className="c-val">linkedin.com/in/julian</span></a>
                <a href="#" className="c-row"><span className="c-lbl">Scholar</span><span className="c-val">Google Scholar</span></a>
              </div>
            </R>
            <R delay={0.18}>
              <div>
                <div className="form-g"><label className="form-lbl">Full Name</label><input className="form-in" type="text" placeholder="Your name"/></div>
                <div className="form-g"><label className="form-lbl">Email Address</label><input className="form-in" type="email" placeholder="your@email.com"/></div>
                <div className="form-g"><label className="form-lbl">Message</label><textarea className="form-ta" placeholder="Your message…"/></div>
                <Mag className="btn-p">Send Message</Mag>
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="fstatus"><div className="fdot"/><span>Open to opportunities</span></div>
        <span>Julian Vandermeer</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}