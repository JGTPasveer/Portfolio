import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImg from "./assets/prof.jpg";
import aboutImg from "./assets/about.PNG";

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
        <div className="nav-logo">Julian Pasveer</div>
        <div className="nav-right">
          <ul className="nav-links">
            <li><button className="nav-pill" onClick={() => scrollTo("about")}>About Me</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("skills")}>Skills</button></li>
            <li><button className="nav-pill" onClick={() => scrollTo("research")}>Research Papers</button></li>
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
            <button className="mobile-pill" onClick={() => scrollTo("about")}>About Me</button>
            <button className="mobile-pill" onClick={() => scrollTo("skills")}>Skills</button>
            <button className="mobile-pill" onClick={() => scrollTo("research")}>Research Papers</button>
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
            <Words text="Julian Pasveer" className="hero-name" delay={0.15}/>
            <motion.p className="hero-sub"
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.35,duration:0.55}}>
              Software Engineer &amp; <strong>Tutor</strong>
            </motion.p>
            <motion.p className="hero-desc"
              initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.44,duration:0.55}}>
            </motion.p>
            <motion.div className="hero-cta"
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.56,duration:0.5}}>
              <Mag className="btn-p" onClick={() => scrollTo("about")}>About me</Mag>
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
              <span>Scroll to see more</span>
              <div className="scroll-arrow"/>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── OVER MIJ ── */}
      <div className="s-divider"/>
      <section className="section" id="about">
        <div className="section-inner">
          <R><p className="s-label">01 / About me</p></R>
          <Words text="Who am I" className="s-heading" delay={0.05}/>
          <R delay={0.1}>
            <div className="about-layout">
              <div className="about-text">
                <p>
                  Hi! My name is Julian Pasveer and I am 25 years old. I have both a Bachelor and Master in <strong>Computing Science</strong>.
                </p>
                <p>
                  In my free time I love going to the gym. Furthermore, I also practice fencing, which I also teach. 
                </p>
                <p>
                  For over four and a half years I have been tutoring secondary school students, and I enjoy it so much that I have decided to make education my career. Next year I will begin the <strong>educational master's programme</strong> at the University of Groningen, training to become a qualified first-degree computer science teacher. My BSc and Master's in Computing Science have only deepened my passion for mathematics and computing.
                </p>
              </div>
             <div className="about-img-wrap">
  <img src={aboutImg} alt="Julian Pasveer" className="about-img"/>
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
            <R delay={0.00}><div className="skill-card"><div className="skill-top"><div className="skill-name">Programmeertalen</div><span className="skill-cat">Kern</span></div><div className="skill-tags"><span className="skill-tag">Java</span><span className="skill-tag">C</span><span className="skill-tag">JavaScript</span><span className="skill-tag">Python</span><span className="skill-tag">C++</span><span className="skill-tag">C#</span></div></div></R>
            <R delay={0.12}><div className="skill-card"><div className="skill-top"><div className="skill-name">Cloud &amp; Infra</div><span className="skill-cat">Operaties</span></div><div className="skill-tags"><span className="skill-tag">Kubernetes</span><span className="skill-tag">Docker</span></div></div></R>
            <R delay={0.18}><div className="skill-card"><div className="skill-top"><div className="skill-name">Databases</div><span className="skill-cat">Opslag</span></div><div className="skill-tags"><span className="skill-tag">PostgreSQL</span><span className="skill-tag">MongoDB</span><span className="skill-tag">MySQL</span></div></div></R>
            <R delay={0.24}><div className="skill-card"><div className="skill-top"><div className="skill-name">Backend Engineering</div><span className="skill-cat">Architectuur</span></div><div className="skill-tags"><span className="skill-tag">REST</span><span className="skill-tag">WebSockets</span></div></div></R>
            <R delay={0.30}><div className="skill-card"><div className="skill-top"><div className="skill-name">Frontend Engineering</div><span className="skill-cat">Architectuur</span></div><div className="skill-tags"><span className="skill-tag">HTML</span><span className="skill-tag">CSS</span></div></div></R>

          </div>
          {/* ── YOUTUBE ── */}
            <R delay={0.4}>
            <div className="yt-card">
                <div className="yt-left">
                <div className="yt-header">
                    <div className="yt-icon">▶</div>
                    <div className="yt-title-block">
                    <div className="yt-title">YouTube Content Creator</div>
                    <div className="yt-sub-label">Sinds 2024</div>
                    </div>
                </div>
                <p className="yt-desc">
                    Ik heb sinds 2024 een YouTube kanaal, waarop ik cinematografische focus- en studiemuziek plaats. Ik heb inmiddels meer dan 43.000 subscribers bereikt. Het kanaal combineert cinematic storytelling met productiviteit en richt zich op studenten, programmeurs en professionals die zich beter willen concentreren tijdens het werken of studeren. Door het opbouwen van dit platform heb ik waardevolle ervaring opgedaan.
                </p>
                <div className="yt-tags">
                    <span className="yt-tag">Videobewerking</span>
                    <span className="yt-tag">Da Vinci Resolve</span>
                    <span className="yt-tag">GIMP</span>
                    <span className="yt-tag">Scripting</span>
                    <span className="yt-tag">Thumbnail Design</span>
                    <span className="yt-tag">SEO & Analytics</span>
                    <span className="yt-tag">Kijkersbehoud</span>
                </div>
                </div>
                <div className="yt-stats">
                <div className="yt-stat"><div className="yt-stat-n">43K</div><div className="yt-stat-l">Abonnees</div></div>
                <div className="yt-stat"><div className="yt-stat-n">25+</div><div className="yt-stat-l">Video's</div></div>
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
                    <div className="teach-title">Studiebegeleider</div>
                    <div className="teach-sub-label">Huiswerkbegeleiding · 4,5 Jaar</div>
                    </div>
                </div>
                <p className="teach-desc">
                    Gedurende vier en een half jaar werkte ik als studiebegeleider bij ASL Huiswerkbegeleiding in Emmen, waarbij ik middelbare scholieren begeleid in vakken als wiskunde, natuurkunde en informatica.
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
     

      {/* ── ONDERZOEK ── */}
      <div className="s-divider"/>
      <section className="section" id="research">
        <div className="section-inner">
          <R><p className="s-label">03 / Onderzoek</p></R>
          <Words text="Research Papers" className="s-heading" delay={0.05}/>
          <div className="papers-list">

            <R delay={0.00}>
              <div className="paper-card">
                <div>
                  <div className="pmeta"><span className="pyear">2026</span><span className="pvenue">MSc Thesis</span></div>
                  <div className="ptitle">A Comparative Study of Edge and
                  Cloud Inference for Mobile Healthcare
                  Applications: Security, Privacy and
                  Performance</div>
                  <div className="pauthors"><span className="me">J. Pasveer</span></div>
                  <p className="pabstract">Link en Abstract worden binnenkort gepubliceerd</p>
                </div>
                {/* <div className="plinks"><a href="#" className="plink">Preprint ↗</a></div> */}
              </div>
            </R>

            <R delay={0.09}>
              <div className="paper-card">
                <div>
                  <div className="pmeta"><span className="pyear">2023</span><span className="pvenue">BSc Thesis</span></div>
                  <div className="ptitle">Adapting MTO to Radio Astronomical Data: Reliability Measures</div>
                  <div className="pauthors"><span className="me">J. Pasveer</span></div>
                  <p className="pabstract">Optical telescopes have long been used to detect and study astronomical sources. These
                  sources are identified by certain methods that are able to filter out the noise from astronomical image data. However, radio telescopes have a great advantage over optical telescopes,
                  in that they use the HI emission line, which is a spectrum that lies outside of the visible
                  light spectrum. Consequently, radio telescopes obtain data that is different from optical telescopes. For radio data to be collected, large antennas are needed. The problem with radio
                  data, however, is adapting the data. This is due to the nature of the data because the noise
                  in the images is modelled differently than with data from optical telescopes.
                  In this project, we aimed to find a solution to this problem. We began by using Max
                  Tree Objects (MTO). We exploited MTO’s characteristics and created a min and a max tree,
                  which contain data for the negative signals and positive signals within the data, respectively.
                  These trees contain nodes and specific node attribute data was fed to a Kernel Density Estimation (KDE) function. A filtering formula was created in order to filter out the noise. This
                  was done by using a graphical user interface in which we could adjust the threshold as well
                  as by creating an accuracy graph and a precision-recall graph.
                  Through experimentation, we determined that a threshold value of 4400 gave the best results.
                  This threshold value resulted in the most effective noise reduction whilst still suppressing the
                  number of outliers.</p>
                </div>
                <div className="plinks"><a href="https://fse.studenttheses.ub.rug.nl/31346/" target="_blank" className="plink">PDF ↗</a></div>
              </div>
            </R>

            <R delay={0.18}>
              <div className="paper-card">
                <div>
                  <div className="pmeta"><span className="pyear">2023</span><span className="pvenue"></span></div>
                  <div className="ptitle">Deep Learning for Leakage Detection in Water Networks: A Comparative Study</div>
                  <div className="pauthors">C. van Riemsdijk and <span className="me">J. Pasveer</span></div>
                  <p className="pabstract">Water leaks in Water Distribution Networks (WDNs) are of paramount importance since water is a crucial resource for all
                  life on earth. As we are growing as a population as a whole, it is necessary to have efficient management of water resources. This
                  comparative study explores the state of the art regarding methods and algorithms used in order to detect water leaks in WDNs. All
                  methods discussed in this comparative study use deep learning, where we focus on approach and methodology. We analyze, discuss
                  and if needed discuss the methods for leakage detection. These methods consist of acoustic, pressure, and water flow sensor data.
                  This data is fed to deep learning algorithms. The algorithms analyzed are deep neural networks, convolutional neural networks, and
                  recurrent neural networks. We come to the conclusion that many of the aforementioned models have the capabilities to solve the
                  leakage detection task, but they are highly dependent on the form that the input data takes.</p>
                </div>
                <div className="plinks"><a href="https://pure.rug.nl/ws/portalfiles/portal/630834016/proceedings.pdf" target="_blank" className="plink">PDF ↗</a></div>
              </div>
            </R>

              <R delay={0.27}>
              <div className="paper-card">
                <div>
                  <div className="pmeta"><span className="pyear">2023</span><span className="pvenue"></span></div>
                  <div className="ptitle">Exploring the cosine similarity for automated relating of architectural issues and emails in mailing lists</div>
                  <div className="pauthors">B. Pijnacker, J. van der Zwaag and <span className="me">J. Pasveer</span></div>
                  <p className="pabstract">In software development, it is important to document architectural design decisions.
                    However, design decisions are often discussed in multiple places, such as in email lists
                    or in issue tracking systems. The problem that arises is the fact that some decisions
                    are hard to get a grasp on since a part of it could be explained in an email and part of
                    it in an issue. In this research, we have investigated the relationships between design
                    decisions documented in Jira issues and mailing lists for multiple Apache projects. Our
                    research applied the cosine similarity measure in order to find relations between the
                    issues and emails, followed by a qualitative and quantitative analysis that explored the
                    relationships.
                    In general, we found that relationships are mostly one-way. A discussion most often
                    starts with an issue and is followed up upon in an email. The most common relations
                    were emails that were asking for discussions regarding an issue or emails that were
                    referencing an issue. Moreover, emails were, in some cases, the cause of the creation of
                    an issue, which was the only issue-to-email relation we encountered.</p>
                </div>
                <div className="plinks"><a href="/research_papers/cosine.pdf" target="_blank" className="plink">PDF ↗</a></div>
              </div>
            </R>

              <R delay={0.36}>
              <div className="paper-card">
                <div>
                  <div className="pmeta"><span className="pyear">2022</span><span className="pvenue"></span></div>
                  <div className="ptitle">Tools for Measuring and Monitoring the Energy Efficiency of Software Systems: A Rapid Review</div>
                  <div className="pauthors">B. Pijnacker, J. van der Zwaag and <span className="me">J. Pasveer</span></div>
                  <p className="pabstract">The recent growth of the information and communication technology (ICT) industry has had a significant impact on the environment. This trend is concerning for both
                  the sustainability of the ICT industry and the global environment. One way to address
                  this issue is to focus on improving the power efficiency of software. For this purpose,
                  a software developer requires tools to investigate their software’s power usage.
                  This paper reviews the literature on available tools for measuring the power efficiency of software and discusses the limitations of these tools. We find that tools can be
                  categorized by target, granularity, and hardware requirements. One limitation of these
                  tools is the need for specialized hardware for some measurements. Another limitation
                  is the accuracy of tools that estimate power usage without specialized hardware.
                  </p>
                </div>
                <div className="plinks"><a href="/research_papers/Rapid_Review__Which_tools_can_I_use_to_measure_and_monitor_the_energy_efficiency_of_my_software_system_.pdf" target="_blank" className="plink">PDF ↗</a></div>
              </div>
            </R>

              <R delay={0.45}>
              <div className="paper-card">
                <div>
                  <div className="pmeta"><span className="pyear">2020</span><span className="pvenue"></span></div>
                  <div className="ptitle">Solutions to large scale DNA and RNA processing</div>
                  <div className="pauthors">Y. Molema, <span className="me">J. Pasveer</span>, D. Scheepstra, M. Kruijer, W. Haverkort, J. Klooster and R. Wuijster</div>
                  <p className="pabstract">Big data sets of DNA and RNA can be easily
                      acquired. However, processing these data-sets, which are in the
                      petabyte scale, comes with some complications. This report will
                      discuss how already existing computational solutions can help
                      with processing large-scale data sets. The best solution found in
                      this report is cloud computing: it improves the speed, flexibility
                      and costs of processing data. However, it can compromise privacy.
                      Map Reduce and Heterogeneous computing were the other
                      solutions taken into consideration. Life sciences are in need of a
                      solution, because if a solution is found, further research into the
                      human body can be carried out. Furthermore, the size of these
                      data sets will keep growing. This means when no solution can be
                      found, the problem will become harder to solve.
                  </p>
                </div>
            <div className="plinks">
              <a href="/research_papers/Research_Paper_SC.pdf" target="_blank" rel="noopener noreferrer" className="plink">PDF ↗</a>

            </div>              </div>
            </R>

          </div>
        </div>
      </section>

      {/* ── SAMENVATTINGEN ── */}
      <div className="s-divider"/>
      <section className="section" id="summaries">
        <div className="section-inner">
          <R><p className="s-label">04 / Samenvattingen</p></R>
          <Words text="Samenvattingen" className="s-heading" delay={0.05}/>
          <R delay={0.1}><p className="sum-intro">Tijdens mijn studies heb ik meerdere samenvattingen geschreven. Deze zal ik binnenkort publiceren</p></R>
          <div className="sum-grid">

            <R delay={0.00}>
              <div className="sum-card">
                <div className="sum-head"><div className="sum-title">Voorbeeld</div><span className="sum-tag"></span></div>
                <div className="sum-origin">Vak</div>
                <p className="sum-body">Samenvatting</p>
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
          <R><p className="s-label">05 / Achtergrond</p></R>
          <Words text="Opleiding & Ervaring" className="s-heading" delay={0.05}/>
          <div className="tl-cols">

            <R>
              <div className="tl-head">Opleiding</div>
              <div className="tl-item">
                <div className="tl-date">2022 – 2026</div>
                <div className="tl-body">
                  <div className="tl-title">MSc Computing Science</div>
                  <div className="tl-place">Rijksuniversiteit Groningen</div>
                  <p className="tl-desc">Gespecialiseerd in Software Engineering &amp; Distributed Systems.</p>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-date">2018 – 2023</div>
                <div className="tl-body">
                  <div className="tl-title">BSc Computing Science</div>
                  <div className="tl-place">Rijksuniversiteit Groningen</div>
                  {/* <p className="tl-desc">GPA 7</p> */}
                </div>
              </div>
               <div className="tl-item">
                <div className="tl-date">2012 – 2018</div>
                <div className="tl-body">
                  <div className="tl-title">Atheneum, Natuur & Techniek</div>
                  <div className="tl-place">Esdal College Oosterstraat</div>
                </div>
              </div>
            </R>

            <R>
              <div className="tl-head">Werkervaring</div>
              
              <div className="tl-item">
                <div className="tl-date">2021 - heden</div>
                <div className="tl-body">
                  <div className="tl-title">ASL Studiebegeleider</div>
                  <div className="tl-place">ASL Instituut voor Educatie en Begeleiding, Emmen</div>
                  <p className="tl-desc">Complexe stof uitleggen aan leerlingen met verschillende achtergronden en niveaus. Het zien van die groei bij leerlingen is wat mij uiteindelijk heeft aangezet tot het volgen van de educatieve master.</p>
                </div>
              </div>

              <div className="tl-item">
                <div className="tl-date">2023 – 2025</div>
                <div className="tl-body">
                  <div className="tl-title">Basic-Fit Gastheer</div>
                  <div className="tl-place">Basic-Fit Emmen</div>
                  <p className="tl-desc">Als gastheer bij Basic-Fit was ik het eerste aanspreekpunt voor leden en bezoekers. Hierdoor leerde ik snel schakelen, professioneel blijven onder druk en mensen op hun gemak stellen.</p>
                </div>
              </div>

              <div className="tl-item">
                <div className="tl-date">2019</div>
                <div className="tl-body">
                  <div className="tl-title">Jumbo Leidinggevende</div>
                  <div className="tl-place">Jumbo Emmen</div>
                  <p className="tl-desc">Vanuit mijn rol als vakkenvuller groeide ik door naar een leidinggevende positie, waarbij ik de verantwoordelijkheid droeg voor zowel het team als de winkelprocessen. Het leerde mij beslissingen nemen onder druk en verantwoordelijkheid dragen voor het werk van anderen.</p>
                </div>
              </div>

              <div className="tl-item">
                <div className="tl-date">2018-2019</div>
                <div className="tl-body">
                  <div className="tl-title">Vulploegmedewerker Kruidvat</div>
                  <div className="tl-place">Kruidvat Emmen</div>
                </div>
              </div>

              <div className="tl-item">
                <div className="tl-date">2016 - 2018</div>
                <div className="tl-body">
                  <div className="tl-title">Vulploegmedewerker Jumbo</div>
                  <div className="tl-place">Jumbo Emmen</div>
                  <p className="tl-desc">Mijn eerste stap in de arbeidsmarkt, waarbij ik leerde werken met deadlines, nauwkeurig te zijn en deel uit te maken van een team.</p>
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
          <R><p className="s-label">06 / Contact</p></R>
          <Words text="Neem contact op" className="s-heading" delay={0.05}/>
          <div className="contact-layout">

            <R delay={0.1}>
              <p className="contact-intro">
                Heb je een vraag? Neem dan contact op via een van de onderstaande kanalen.
              </p>
              <div className="contact-rows">
                <a href="https://github.com/JGTPasveer" target="_blank" rel="noopener noreferrer" className="c-row">
                  <span className="c-lbl">GitHub</span>
                  <span className="c-val">github.com/JGTPasveer</span>
                </a>
                <a href="https://www.linkedin.com/in/julian-pasveer-466ba125a/" target="_blank" rel="noopener noreferrer" className="c-row">
                  <span className="c-lbl">LinkedIn</span>
                  <span className="c-val">linkedin.com/in/julian</span>
                </a>
              </div>
            </R>

            <R delay={0.25}>
              <div className="quote-card">
                <div className="quote-text">
                  "If you can't explain it <strong>simply</strong>, you don't understand it well enough."
                </div>
                <div className="quote-divider"/>
                <div className="quote-author">
                  <span className="quote-author-name">Albert Einstein</span>
                  <span className="quote-author-title">Theoretical Physicist · 1879 – 1955</span>
                </div>
              </div>
            </R>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="fstatus"><div className="fdot"/><span>Laatste update: 11-05-2026</span></div>
        <span>Julian Pasveer</span>
      </footer>
    </>
  );
}