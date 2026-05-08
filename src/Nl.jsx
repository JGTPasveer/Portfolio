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
export default function Nl() {
  const navigate = useNavigate();
  const [menu, setMenu]       = useState(false);
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
            <li><button className="nav-pill" onClick={() => scrollTo("about")}>Over mij</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("skills")}>Vaardigheden</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("projects")}>Projecten</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("research")}>Onderzoek</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("summaries")}>Samenvattingen</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("experience")}>Ervaring</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("contact")}>Contact</button></li>
          </ul>
          <button className="lang-btn" onClick={() => navigate("/en")}>
            <span className="lang-flag">🇬🇧</span> EN
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
            <button className="mobile-pill" onClick={() => scrollTo("about")}>Over mij</button>
            <button className="mobile-pill" onClick={() => scrollTo("skills")}>Vaardigheden</button>
            <button className="mobile-pill" onClick={() => scrollTo("projects")}>Projecten</button>
            <button className="mobile-pill" onClick={() => scrollTo("research")}>Onderzoek</button>
            <button className="mobile-pill" onClick={() => scrollTo("summaries")}>Samenvattingen</button>
            <button className="mobile-pill" onClick={() => scrollTo("experience")}>Ervaring</button>
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
              Software Engineer &amp; <strong>Gedistribueerde Systemen</strong> Onderzoeker
            </motion.p>
            <motion.p className="hero-desc"
              initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.44,duration:0.55}}>
              Gespecialiseerd in <strong>fouttolerante infrastructuur</strong> en <strong>consensusprotocollen</strong>. Gefocust op adaptieve quorumsystemen en het verschil tussen theoretische garanties en de praktijk.
            </motion.p>
            <motion.div className="hero-cta"
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.56,duration:0.5}}>
              <Mag className="btn-p" onClick={() => scrollTo("about")}>Over mij</Mag>
              <Mag className="btn-g" onClick={() => scrollTo("research")}>Onderzoeksartikelen</Mag>
              <Mag className="btn-g" onClick={() => scrollTo("summaries")}>Samenvattingen</Mag>
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
              <span>Scroll om meer te zien</span>
              <div className="scroll-arrow"/>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── OVER MIJ ── */}
      <div className="s-divider"/>
      <section className="section" id="about">
        <div className="section-inner">
          <R><p className="s-label">01 / Over mij</p></R>
          <Words text="Wie ik ben" className="s-heading" delay={0.05}/>
          <R delay={0.1}>
            <div className="about-layout">
              <div className="about-text">
                <p>
                  Ik ben Julian Vandermeer, een postdoctorale student Informatica aan de <strong>Universiteit van Edinburgh</strong>, gespecialiseerd in software engineering en gedistribueerde systemen.
                </p>
                <p>
                  Mijn onderzoek richt zich op <strong>consensusprotocollen</strong> — de mechanismen waarmee gedistribueerde systemen overeenstemming bereiken bij netwerkpartities en knooppuntfouten.
                </p>
                <p>
                  Voor Edinburgh behaalde ik een BSc met onderscheiding aan de <strong>Universiteit van Amsterdam</strong> en werkte ik bij <strong>Cloudflare</strong> en <strong>Catawiki</strong>.
                </p>
              </div>
              <div className="about-stats">
                <R delay={0.00}><div className="stat-b"><div className="stat-n">4+</div><div className="stat-l">Jaar ervaring</div></div></R>
                <R delay={0.08}><div className="stat-b"><div className="stat-n">12</div><div className="stat-l">Projecten opgeleverd</div></div></R>
                <R delay={0.16}><div className="stat-b"><div className="stat-n">3</div><div className="stat-l">Industrierollen</div></div></R>
                <R delay={0.24}><div className="stat-b"><div className="stat-n">2</div><div className="stat-l">Publicaties in voorbereiding</div></div></R>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ── VAARDIGHEDEN ── */}
      <div className="s-divider"/>
      <section className="section" id="skills">
        <div className="section-inner">
          <R><p className="s-label">02 / Vaardigheden</p></R>
          <Words text="Technische Expertise" className="s-heading" delay={0.05}/>
          <div className="skills-grid">
            <R delay={0.00}><div className="skill-card"><div className="skill-top"><div className="skill-name">Programmeertalen</div><span className="skill-cat">Kern</span></div><div className="skill-tags"><span className="skill-tag">Go</span><span className="skill-tag">Rust</span><span className="skill-tag">TypeScript</span><span className="skill-tag">Python</span><span className="skill-tag">C++</span></div></div></R>
            <R delay={0.06}><div className="skill-card"><div className="skill-top"><div className="skill-name">Gedistribueerde Systemen</div><span className="skill-cat">Specialisatie</span></div><div className="skill-tags"><span className="skill-tag">Raft</span><span className="skill-tag">Kafka</span><span className="skill-tag">gRPC</span><span className="skill-tag">etcd</span><span className="skill-tag">ZooKeeper</span></div></div></R>
            <R delay={0.12}><div className="skill-card"><div className="skill-top"><div className="skill-name">Cloud &amp; Infra</div><span className="skill-cat">Operaties</span></div><div className="skill-tags"><span className="skill-tag">Kubernetes</span><span className="skill-tag">Docker</span><span className="skill-tag">AWS</span><span className="skill-tag">Terraform</span></div></div></R>
            <R delay={0.18}><div className="skill-card"><div className="skill-top"><div className="skill-name">Databases</div><span className="skill-cat">Opslag</span></div><div className="skill-tags"><span className="skill-tag">PostgreSQL</span><span className="skill-tag">CockroachDB</span><span className="skill-tag">Cassandra</span><span className="skill-tag">ClickHouse</span></div></div></R>
            <R delay={0.24}><div className="skill-card"><div className="skill-top"><div className="skill-name">Backend Engineering</div><span className="skill-cat">Architectuur</span></div><div className="skill-tags"><span className="skill-tag">REST</span><span className="skill-tag">GraphQL</span><span className="skill-tag">WebSockets</span><span className="skill-tag">Microservices</span></div></div></R>
            <R delay={0.30}><div className="skill-card"><div className="skill-top"><div className="skill-name">Onderzoek</div><span className="skill-cat">Academisch</span></div><div className="skill-tags"><span className="skill-tag">Consensus Algorithms</span><span className="skill-tag">CAP Theorem</span><span className="skill-tag">CRDTs</span><span className="skill-tag">TLA+</span></div></div></R>
          </div>
          {/* ── YOUTUBE ── */}
            <R delay={0.4}>
            <div className="yt-card">
                <div className="yt-left">
                <div className="yt-header">
                    <div className="yt-icon">▶</div>
                    <div className="yt-title-block">
                    <div className="yt-title">YouTube Contentmaker</div>
                    <div className="yt-sub-label">Sinds 2019 · Technologie & Engineering</div>
                    </div>
                </div>
                <p className="yt-desc">
                    Naast mijn academisch werk beheer ik een YouTube-kanaal gericht op software engineering, gedistribueerde systemen en informaticaconcepten. Het maken van content heeft mijn vermogen aangescherpt om complexe technische onderwerpen te destilleren naar heldere, gestructureerde uitleg — een vaardigheid die direct doorwerkt in hoe ik onderzoekssamenvattingen schrijf en bevindingen presenteer.
                </p>
                <div className="yt-tags">
                    <span className="yt-tag">Videobewerking</span>
                    <span className="yt-tag">Premiere Pro</span>
                    <span className="yt-tag">After Effects</span>
                    <span className="yt-tag">Scripting</span>
                    <span className="yt-tag">Thumbnail Design</span>
                    <span className="yt-tag">SEO & Analytics</span>
                    <span className="yt-tag">Kijkersbehoud</span>
                </div>
                </div>
                <div className="yt-stats">
                <div className="yt-stat"><div className="yt-stat-n">43K</div><div className="yt-stat-l">Abonnees</div></div>
                <div className="yt-stat"><div className="yt-stat-n">150+</div><div className="yt-stat-l">Video's</div></div>
                <div className="yt-stat"><div className="yt-stat-n">2+</div><div className="yt-stat-l">Jaar actief</div></div>
                <div className="yt-stat"><div className="yt-stat-n">10M+</div><div className="yt-stat-l">Totale weergaven</div></div>
                </div>
            </div>
            </R>
            {/* ── LESGEVEN ── */}
            <R delay={0.5}>
            <div className="teach-card">
                <div className="teach-left">
                <div className="teach-header">
                    <div className="teach-icon">✏</div>
                    <div>
                    <div className="teach-title">Docent & Tutor</div>
                    <div className="teach-sub-label">Huiswerkbegeleiding · 4,5 Jaar</div>
                    </div>
                </div>
                <p className="teach-desc">
                    Gedurende vier en een half jaar werkte ik als docent en tutor bij een huiswerkbegeleiding instituut, waarbij ik middelbare scholieren begeleidde in vakken als wiskunde, natuurkunde en informatica. De rol ontwikkelde mijn vermogen om individuele leerachterstanden te herkennen, uitleg vlot aan te passen aan de leerling, en geduldig en helder te blijven onder druk — competenties die direct doorwerken in onderzoekscommunicatie en technische begeleiding.
                </p>
                <div className="teach-tags">
                    <span className="teach-tag">Wiskunde</span>
                    <span className="teach-tag">Natuurkunde</span>
                    <span className="teach-tag">Informatica</span>
                    <span className="teach-tag">Lesplanning</span>
                    <span className="teach-tag">1-op-1 Begeleiding</span>
                    <span className="teach-tag">Groepslessen</span>
                    <span className="teach-tag">Voortgangsmonitoring</span>
                </div>
                </div>
                <div className="teach-stats">
                <div className="teach-stat"><div className="teach-stat-n">4,5</div><div className="teach-stat-l">Jaar</div></div>
                <div className="teach-stat"><div className="teach-stat-n">100+</div><div className="teach-stat-l">Leerlingen</div></div>
                <div className="teach-stat"><div className="teach-stat-n">3</div><div className="teach-stat-l">Vakken</div></div>
                <div className="teach-stat"><div className="teach-stat-n">VO</div><div className="teach-stat-l">Onderwijsniveau</div></div>
                </div>
            </div>
            </R>
        </div>
      </section>

      {/* ── PROJECTEN ── */}
      <div className="s-divider"/>
      <section className="section" id="projects">
        <div className="section-inner">
          <R><p className="s-label">03 / Projecten</p></R>
          <Words text="Geselecteerd Werk" className="s-heading" delay={0.05}/>
          <div className="projects-grid">

            <R delay={0.00}>
              <div className="proj-card feat">
                <div className="proj-head">
                  <span className="proj-name">DistributeDB</span>
                  <div className="proj-links"><a href="#" className="proj-link">GitHub ↗</a><a href="#" className="proj-link">Demo ↗</a></div>
                </div>
                <p className="proj-desc">Een gedistribueerde sleutel-waardeopslag gebouwd vanuit basisprincipes met het Raft-consensusalgoritme, met ondersteuning voor lineariseerbare leesbewerkingen, leiderverkiezing en logcompactie.</p>
                <div className="proj-tags"><span className="proj-tag">Go</span><span className="proj-tag">Raft</span><span className="proj-tag">gRPC</span><span className="proj-tag">etcd</span></div>
              </div>
            </R>

            <R delay={0.07}>
              <div className="proj-card">
                <div className="proj-head">
                  <span className="proj-name">StreamMesh</span>
                  <div className="proj-links"><a href="#" className="proj-link">GitHub ↗</a><a href="#" className="proj-link">Demo ↗</a></div>
                </div>
                <p className="proj-desc">Gebeurtenisgestuurde microservices-orchestratielaag met Kafka-berichtroutering, dead-letter queues en automatische hertrypogingen.</p>
                <div className="proj-tags"><span className="proj-tag">Rust</span><span className="proj-tag">Kafka</span><span className="proj-tag">Docker</span><span className="proj-tag">Kubernetes</span></div>
              </div>
            </R>

            <R delay={0.14}>
              <div className="proj-card">
                <div className="proj-head">
                  <span className="proj-name">CloudTrace</span>
                  <div className="proj-links"><a href="#" className="proj-link">GitHub ↗</a><a href="#" className="proj-link">Demo ↗</a></div>
                </div>
                <p className="proj-desc">Gedistribueerd traceringstool voor gecontaineriseerde omgevingen met OpenTelemetry-integratie en een realtime analytisch dashboard.</p>
                <div className="proj-tags"><span className="proj-tag">TypeScript</span><span className="proj-tag">OpenTelemetry</span><span className="proj-tag">React</span><span className="proj-tag">ClickHouse</span></div>
              </div>
            </R>

            <R delay={0.21}>
              <div className="proj-card">
                <div className="proj-head">
                  <span className="proj-name">SchedSim</span>
                  <div className="proj-links"><a href="#" className="proj-link">GitHub ↗</a><a href="#" className="proj-link">Demo ↗</a></div>
                </div>
                <p className="proj-desc">Discrete-gebeurtenissimulator voor het evalueren van taakplanningsalgoritmen in heterogene gedistribueerde rekenclusterconfiguraties.</p>
                <div className="proj-tags"><span className="proj-tag">Python</span><span className="proj-tag">SimPy</span><span className="proj-tag">NumPy</span><span className="proj-tag">Matplotlib</span></div>
              </div>
            </R>

          </div>
        </div>
      </section>

      {/* ── ONDERZOEK ── */}
      <div className="s-divider"/>
      <section className="section" id="research">
        <div className="section-inner">
          <R><p className="s-label">04 / Onderzoek</p></R>
          <Words text="Academische Artikelen" className="s-heading" delay={0.05}/>
          <div className="papers-list">

            <R delay={0.00}>
              <div className="paper-card">
                <div>
                  <div className="pmeta"><span className="pyear">2025</span><span className="pvenue">EuroSys '25</span><span className="pstatus">Onder beoordeling</span></div>
                  <div className="ptitle">Adaptieve quorumgrootte in geo-gedistribueerde Raft-clusters bij partiële uitval</div>
                  <div className="pauthors"><span className="me">Julian V.</span>, A. Harrington, P. Müller</div>
                  <p className="pabstract">We stellen een dynamisch quorumherconfiguratiemechanisme voor Raft-systemen voor dat de quorumgrootte tijdens gebruik aanpast op basis van geobserveerde netwerkpartitiepatronen, waardoor de staartlatentie met maximaal 34% wordt verminderd.</p>
                </div>
                <div className="plinks"><a href="#" className="plink">Preprint ↗</a><a href="#" className="plink">Slides ↗</a></div>
              </div>
            </R>

            <R delay={0.09}>
              <div className="paper-card">
                <div>
                  <div className="pmeta"><span className="pyear">2024</span><span className="pvenue">MSc Thesis</span></div>
                  <div className="ptitle">Fouttolerante toestandsmachinereplicatie: Een vergelijkende analyse van Raft, Multi-Paxos en EPaxos</div>
                  <div className="pauthors"><span className="me">Julian V.</span></div>
                  <p className="pabstract">Een grondige empirische vergelijking van drie consensusprotocollen onder diverse foutinjectiescenario's, geëvalueerd in homogene en heterogene clusterconfiguraties.</p>
                </div>
                <div className="plinks"><a href="#" className="plink">PDF ↗</a><a href="#" className="plink">Code ↗</a></div>
              </div>
            </R>

            <R delay={0.18}>
              <div className="paper-card">
                <div>
                  <div className="pmeta"><span className="pyear">2023</span><span className="pvenue">ICDE '23</span></div>
                  <div className="ptitle">Naar voorspellende belastingsverdeling in heterogene cloudopslagsystemen</div>
                  <div className="pauthors">A. Harrington, <span className="me">Julian V.</span>, S. de Vries</div>
                  <p className="pabstract">Een machine-learning-ondersteunde load balancer die historische toegangspatroonembeddings gebruikt om hotspots te anticiperen en statische basislijnen met 21% overtreft in doorvoer.</p>
                </div>
                <div className="plinks"><a href="#" className="plink">PDF ↗</a><a href="#" className="plink">Poster ↗</a></div>
              </div>
            </R>

          </div>
        </div>
      </section>

      {/* ── SAMENVATTINGEN ── */}
      <div className="s-divider"/>
      <section className="section" id="summaries">
        <div className="section-inner">
          <R><p className="s-label">05 / Samenvattingen</p></R>
          <Words text="Onderzoekssamenvattingen" className="s-heading" delay={0.05}/>
          <R delay={0.1}><p className="sum-intro">Toegankelijke beschrijvingen van mijn onderzoeksresultaten voor technisch onderlegde maar niet-specialistische lezers.</p></R>
          <div className="sum-grid">

            <R delay={0.00}>
              <div className="sum-card">
                <div className="sum-head"><div className="sum-title">Adaptieve quorumgrootte in geo-gedistribueerde Raft-clusters</div><span className="sum-tag">Consensus</span></div>
                <div className="sum-origin">EuroSys '25</div>
                <p className="sum-body">In plaats van de quorumgrootte bij initialisatie vast te leggen, stemmen knooppunten om dynamisch te herconfigureren op basis van realtime partitiemeldingen — veiligheid bewaren terwijl staartlatentie wordt verminderd.</p>
                <a href="#" className="sum-read">Lees volledig →</a>
              </div>
            </R>

            <R delay={0.08}>
              <div className="sum-card">
                <div className="sum-head"><div className="sum-title">Vergelijking van Raft, Multi-Paxos en EPaxos bij foutinjectie</div><span className="sum-tag">Fouttolerantie</span></div>
                <div className="sum-origin">MSc Thesis — 2024</div>
                <p className="sum-body">EPaxos toont superieure doorvoer in brede netwerken, maar de implementatievereenvoudiging van Raft levert betere correctheid tijdens herstel op — een onderscheid dat theoretische analyse neigt te verdoezelen.</p>
                <a href="#" className="sum-read">Lees volledig →</a>
              </div>
            </R>

            <R delay={0.16}>
              <div className="sum-card">
                <div className="sum-head"><div className="sum-title">Voorspellende belastingsverdeling via toegangspatroonembeddings</div><span className="sum-tag">Cloudopslag</span></div>
                <div className="sum-origin">ICDE '23 Workshop</div>
                <p className="sum-body">Lichte ML-embeddings anticiperen toegangsskew 10–30 seconden van tevoren, zodat de planner tijd heeft voor proactieve herbalancering in plaats van reactieve correctie.</p>
                <a href="#" className="sum-read">Lees volledig →</a>
              </div>
            </R>

            <R delay={0.24}>
              <div className="sum-card">
                <div className="sum-head"><div className="sum-title">Waarom Raft-leiderverkiezingen moeilijker zijn dan ze lijken</div><span className="sum-tag">Engineering</span></div>
                <div className="sum-origin">Technisch Essay — 2025</div>
                <p className="sum-body">Gerandomiseerde verkiezingstijdlimieten interageren slecht met realistische jitter, asymmetrische vertraging en GC-pauzes — zaken die het Raft-artikel slechts kort behandelt, maar die in productie cruciaal blijken.</p>
                <a href="#" className="sum-read">Lees volledig →</a>
              </div>
            </R>

          </div>
        </div>
      </section>

      {/* ── ERVARING ── */}
      <div className="s-divider"/>
      <section className="section" id="experience">
        <div className="section-inner">
          <R><p className="s-label">06 / Achtergrond</p></R>
          <Words text="Opleiding & Ervaring" className="s-heading" delay={0.05}/>
          <div className="tl-cols">

            <R>
              <div className="tl-head">Opleiding</div>
              <div className="tl-item">
                <div className="tl-date">2023 – heden</div>
                <div className="tl-body">
                  <div className="tl-title">MSc Informatica</div>
                  <div className="tl-place">Universiteit van Edinburgh</div>
                  <p className="tl-desc">Gespecialiseerd in Software Engineering &amp; Gedistribueerde Systemen. Onderzoek naar consensusprotocollen en fouttolerante systeemontwerp. Verwacht in 2025.</p>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-date">2019 – 2023</div>
                <div className="tl-body">
                  <div className="tl-title">BSc Informatica</div>
                  <div className="tl-place">Universiteit van Amsterdam</div>
                  <p className="tl-desc">Cum laude. Scriptie over belastingsverdeling in heterogene cloudomgevingen. Decaanlijst 2022 &amp; 2023.</p>
                </div>
              </div>
            </R>

            <R>
              <div className="tl-head">Werkervaring</div>
              <div className="tl-item">
                <div className="tl-date">Zomer 2024</div>
                <div className="tl-body">
                  <div className="tl-title">Software Engineering Stagiair</div>
                  <div className="tl-place">Cloudflare · Londen</div>
                  <p className="tl-desc">Bijgedragen aan de Workers KV gedistribueerde opslaglaag en cachevalidatievertraging met 18% verbeterd door optimalisaties van replicatieprotocollen.</p>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-date">2022 – 2023</div>
                <div className="tl-body">
                  <div className="tl-title">Backend Engineer (deeltijd)</div>
                  <div className="tl-place">Catawiki · Amsterdam</div>
                  <p className="tl-desc">Gebeurtenisgestuurde veilingpijplijnen ontworpen die 40k+ transacties per dag verwerken met sub-100ms p99 latentie in Kafka en Go.</p>
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
          <Words text="Neem contact op" className="s-heading" delay={0.05}/>
          <div className="contact-layout">
            <R delay={0.1}>
              <p className="contact-intro">
                Ik verwelkom vragen over <strong>onderzoekssamenwerking</strong>, <strong>stagekansen</strong>, of algemene correspondentie. Neem gerust contact op via een van de onderstaande kanalen.
              </p>
              <div className="contact-rows">
                <a href="mailto:julian@example.com" className="c-row"><span className="c-lbl">E-mail</span><span className="c-val">julian@example.com</span></a>
                <a href="https://github.com/julian" className="c-row"><span className="c-lbl">GitHub</span><span className="c-val">github.com/julian</span></a>
                <a href="https://linkedin.com/in/julian" className="c-row"><span className="c-lbl">LinkedIn</span><span className="c-val">linkedin.com/in/julian</span></a>
                <a href="#" className="c-row"><span className="c-lbl">Scholar</span><span className="c-val">Google Scholar</span></a>
              </div>
            </R>
            <R delay={0.18}>
              <div>
                <div className="form-g"><label className="form-lbl">Volledige naam</label><input className="form-in" type="text" placeholder="Uw naam"/></div>
                <div className="form-g"><label className="form-lbl">E-mailadres</label><input className="form-in" type="email" placeholder="uw@email.com"/></div>
                <div className="form-g"><label className="form-lbl">Bericht</label><textarea className="form-ta" placeholder="Uw bericht…"/></div>
                <Mag className="btn-p">Verstuur bericht</Mag>
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="fstatus"><div className="fdot"/><span>Open voor kansen</span></div>
        <span>Julian Vandermeer</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}