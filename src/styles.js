const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');
  :root {
    --bg:#0c0e12; --s1:#11141a; --s2:#171b23; --s3:#1e222c;
    --border:#252a35; --border2:#2f3545;
    --blue:#60a5fa; --blue-dim:#1e3a5f; --blue-glow:rgba(96,165,250,0.08);
    --steel:#94a3b8; --text:#e8eaf0; --text2:#8892a4; --text3:#4a5368;
    --sans:'Outfit',system-ui,sans-serif; --mono:'DM Mono',monospace;
    --max-w:1320px; --pad-x:clamp(20px,5vw,56px); --section-y:clamp(56px,8vw,112px);
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
//   body{background:var(--bg);color:var(--text);font-family:var(--sans);font-weight:300;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
  body {
  background: var(--bg); color: var(--text);
  font-family: var(--sans); font-weight: 300;
  overflow-x: hidden; -webkit-font-smoothing: antialiased;
}
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse 80% 50% at 20% 0%,   rgba(96,165,250,0.06) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 100%,  rgba(96,165,250,0.04) 0%, transparent 55%),
    radial-gradient(ellipse 50% 60% at 50% 50%,   rgba(30, 58, 95, 0.15) 0%, transparent 70%);
  pointer-events: none;
}
  ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:var(--bg);} ::-webkit-scrollbar-thumb{background:var(--blue-dim);border-radius:2px;}
  a{color:inherit;text-decoration:none;}

  /* ── YOUTUBE ── */
    .yt-card {
    margin-top: 40px;
    background: var(--s1);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: clamp(24px, 3vw, 40px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(24px, 4vw, 56px);
    align-items: start;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s;
    }
    .yt-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff4444, #ff8800);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s;
    }
    .yt-card:hover { border-color: var(--border2); }
    .yt-card:hover::after { transform: scaleX(1); }

    .yt-left { display: flex; flex-direction: column; gap: 16px; }
    .yt-header { display: flex; align-items: center; gap: 14px; }
    .yt-icon {
    width: 44px; height: 44px; border-radius: 8px;
    background: rgba(255,68,68,0.1);
    border: 1px solid rgba(255,68,68,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
    }
    .yt-title-block {}
    .yt-title {
    font-size: 16px; font-weight: 600;
    letter-spacing: -0.01em; color: var(--text);
    margin-bottom: 2px;
    }
    .yt-sub-label {
    font-family: var(--mono); font-size: 10px;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text3);
    }
    .yt-desc {
    font-size: 14px; line-height: 1.8;
    color: var(--text2); font-weight: 300;
    }
    .yt-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .yt-tag {
    font-family: var(--mono); font-size: 10px;
    color: var(--text2); background: var(--s3);
    border: 1px solid var(--border);
    border-radius: 2px; padding: 3px 8px;
    }

    .yt-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    align-self: start;
    }
    .yt-stat {
    background: var(--s2);
    padding: 20px;
    transition: background 0.25s;
    }
    .yt-stat:hover { background: var(--s3); }
    .yt-stat-n {
    font-size: clamp(22px, 2.5vw, 30px);
    font-weight: 700;
    color: #ff6644;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 5px;
    }
    .yt-stat-l {
    font-family: var(--mono);
    font-size: 10px; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--text3);
    }

    @media (max-width: 768px) {
    .yt-card { grid-template-columns: 1fr; gap: 24px; }
    }

    /* ── TEACHING ── */
    .teach-card {
    margin-top: 16px;
    background: var(--s1);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: clamp(24px, 3vw, 40px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(24px, 4vw, 56px);
    align-items: start;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s;
    }
    .teach-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #60a5fa, #34d399);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s;
    }
    .teach-card:hover { border-color: var(--border2); }
    .teach-card:hover::after { transform: scaleX(1); }

    .teach-left { display: flex; flex-direction: column; gap: 16px; }
    .teach-header { display: flex; align-items: center; gap: 14px; }
    .teach-icon {
    width: 44px; height: 44px; border-radius: 8px;
    background: rgba(96,165,250,0.08);
    border: 1px solid rgba(96,165,250,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
    }
    .teach-title {
    font-size: 16px; font-weight: 600;
    letter-spacing: -0.01em; color: var(--text);
    margin-bottom: 2px;
    }
    .teach-sub-label {
    font-family: var(--mono); font-size: 10px;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text3);
    }
    .teach-desc {
    font-size: 14px; line-height: 1.8;
    color: var(--text2); font-weight: 300;
    }
    .teach-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .teach-tag {
    font-family: var(--mono); font-size: 10px;
    color: var(--text2); background: var(--s3);
    border: 1px solid var(--border);
    border-radius: 2px; padding: 3px 8px;
    }

    .teach-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    align-self: start;
    }
    .teach-stat {
    background: var(--s2);
    padding: 20px;
    transition: background 0.25s;
    }
    .teach-stat:hover { background: var(--s3); }
    .teach-stat-n {
    font-size: clamp(22px, 2.5vw, 30px);
    font-weight: 700;
    color: var(--blue);
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 5px;
    }
    .teach-stat-l {
    font-family: var(--mono);
    font-size: 10px; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--text3);
    }

    @media (max-width: 768px) {
    .teach-card { grid-template-columns: 1fr; gap: 24px; }
    }

  .nav{position:fixed;top:0;left:0;right:0;z-index:500;height:60px;padding:0 var(--pad-x);display:flex;justify-content:space-between;align-items:center;background:rgba(12,14,18,0.88);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);}
  .nav-logo{font-size:15px;font-weight:600;letter-spacing:-0.02em;color:var(--text);flex-shrink:0;}
  .nav-logo span{color:var(--blue);}
  .nav-right{display:flex;align-items:center;gap:8px;}
  .nav-links{display:flex;gap:4px;list-style:none;}
  .nav-pill{font-family:var(--mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;padding:5px 11px;border-radius:100px;border:1px solid transparent;color:var(--text3);background:transparent;transition:all 0.25s;cursor:pointer;white-space:nowrap;}
  .nav-pill:hover{color:var(--blue);border-color:var(--blue-dim);}
  .lang-btn{font-family:var(--mono);font-size:10px;letter-spacing:0.12em;text-transform:uppercase;padding:5px 11px;border-radius:100px;border:1px solid var(--border2);color:var(--text2);background:transparent;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:5px;flex-shrink:0;}
  .lang-btn:hover{border-color:var(--blue);color:var(--blue);}
  .lang-flag{font-size:13px;line-height:1;}
  .hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px;-webkit-tap-highlight-color:transparent;}
  .hamburger span{display:block;width:22px;height:1px;background:var(--text2);transition:all 0.3s;}
  .hamburger.open span:nth-child(1){transform:translateY(6px) rotate(45deg);}
  .hamburger.open span:nth-child(2){opacity:0;}
  .hamburger.open span:nth-child(3){transform:translateY(-6px) rotate(-45deg);}
  .mobile-menu{position:fixed;top:60px;left:0;right:0;background:rgba(12,14,18,0.98);backdrop-filter:blur(24px);border-bottom:1px solid var(--border);z-index:499;padding:8px 16px 16px;display:grid;grid-template-columns:1fr 1fr;gap:6px;}
  .mobile-pill{font-family:var(--mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;padding:14px 16px;border-radius:6px;border:1px solid var(--border);color:var(--text2);background:var(--s1);cursor:pointer;text-align:left;transition:all 0.2s;-webkit-tap-highlight-color:transparent;}
  .mobile-pill:active{background:var(--s2);color:var(--blue);border-color:var(--blue-dim);}

  .hero{min-height:100vh;display:flex;align-items:center;padding:80px var(--pad-x);position:relative;overflow:hidden;}
  .hero-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 60% 60% at 70% 50%,rgba(96,165,250,0.04) 0%,transparent 70%);}
  .hero-inner{max-width:var(--max-w);margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 260px;gap:56px;align-items:center;}
  .hero-badge{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;letter-spacing:0.1em;color:var(--blue);background:var(--blue-glow);border:1px solid rgba(96,165,250,0.2);border-radius:100px;padding:6px 16px;margin-bottom:24px;}
  .bdot{width:6px;height:6px;border-radius:50%;background:var(--blue);animation:bp 2.5s ease-in-out infinite;}
  @keyframes bp{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.3;transform:scale(1.5)}}
  .hero-name{font-size:clamp(52px,7vw,88px);font-weight:700;letter-spacing:-0.04em;line-height:0.95;margin-bottom:12px;}
  .hero-sub{font-size:clamp(16px,2vw,22px);font-weight:300;color:var(--text3);margin-bottom:20px;}
  .hero-sub strong{color:var(--steel);font-weight:400;}
  .hero-desc{font-size:15px;line-height:1.8;color:var(--text2);max-width:500px;margin-bottom:36px;font-weight:300;}
  .hero-desc strong{color:var(--text);font-weight:500;}
  .hero-cta{display:flex;gap:10px;flex-wrap:wrap;}
  .btn-p{font-family:var(--mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;background:var(--blue);color:var(--bg);border:none;padding:12px 22px;border-radius:3px;cursor:pointer;font-weight:500;transition:all 0.25s;display:inline-block;-webkit-tap-highlight-color:transparent;}
  .btn-p:hover{background:#82b9fb;box-shadow:0 0 28px rgba(96,165,250,0.2);}
  .btn-g{font-family:var(--mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;background:transparent;color:var(--text2);border:1px solid var(--border2);padding:12px 22px;border-radius:3px;cursor:pointer;transition:all 0.25s;display:inline-block;-webkit-tap-highlight-color:transparent;}
  .btn-g:hover{border-color:var(--blue);color:var(--blue);}
  .hero-photo{width:240px;height:300px;border-radius:4px;background:var(--s1);border:1px solid var(--border);position:relative;overflow:hidden;justify-self:end;}
  .hero-photo::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--blue-glow) 0%,transparent 60%);}
  .hero-photo-in{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
  .hero-photo-in img{width:100%;height:100%;object-fit:cover;}
  .scroll-hint{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;font-family:var(--mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--text3);white-space:nowrap;}
  .scroll-arrow{width:18px;height:18px;border-right:1px solid var(--text3);border-bottom:1px solid var(--text3);transform:rotate(45deg);animation:bounce 2s ease-in-out infinite;}
  @keyframes bounce{0%,100%{transform:rotate(45deg) translateY(0)}50%{transform:rotate(45deg) translateY(5px)}}

  .s-divider{width:100%;height:1px;background:var(--border);}
  .section{padding:var(--section-y) var(--pad-x);}
  .section-inner{max-width:var(--max-w);margin:0 auto;}
  .s-label{font-family:var(--mono);font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--blue);margin-bottom:8px;display:flex;align-items:center;gap:10px;}
  .s-label::after{content:'';width:48px;height:1px;background:var(--blue-dim);}
  .s-heading{font-family:var(--sans);font-size:clamp(24px,3.5vw,44px);font-weight:700;letter-spacing:-0.03em;color:var(--text);margin-bottom:32px;line-height:1.05;}

  .about-layout{display:grid;grid-template-columns:3fr 2fr;gap:clamp(24px,4vw,64px);align-items:start;}
  .about-text{font-size:15px;line-height:1.85;color:var(--text2);font-weight:300;}
  .about-text p{margin-bottom:14px;}
  .about-text strong{color:var(--text);font-weight:500;}
  .about-img-wrap {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  align-self: start;
}
.about-img-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--blue-glow) 0%, transparent 60%);
  z-index: 1;
  pointer-events: none;
}
.about-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
  display: block;
  min-height: 320px;
  max-height: 380px;
}

@media (max-width: 768px) {
  .about-img { min-height: 240px; max-height: 300px; }
}
  .about-stats{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:4px;overflow:hidden;}
  .stat-b{background:var(--s1);padding:clamp(14px,2vw,24px);transition:background 0.25s;}
  .stat-b:hover{background:var(--s2);}
  .stat-n{font-size:clamp(26px,3vw,36px);font-weight:700;color:var(--blue);letter-spacing:-0.03em;line-height:1;margin-bottom:5px;}
  .stat-l{font-family:var(--mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text3);}

  .skills-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
  .skill-card{background:var(--s1);border:1px solid var(--border);border-radius:4px;padding:clamp(14px,2vw,24px);transition:border-color 0.25s,transform 0.25s,background 0.25s;}
  .skill-card:hover{border-color:var(--border2);background:var(--s2);transform:translateY(-3px);}
  .skill-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:12px;flex-wrap:wrap;}
  .skill-name{font-size:14px;font-weight:600;letter-spacing:-0.01em;}
  .skill-cat{font-family:var(--mono);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--blue);background:var(--blue-glow);border:1px solid rgba(96,165,250,0.15);padding:2px 7px;border-radius:2px;flex-shrink:0;}
  .skill-tags{display:flex;flex-wrap:wrap;gap:5px;}
  .skill-tag{font-family:var(--mono);font-size:10px;color:var(--text2);background:var(--s3);border:1px solid var(--border);border-radius:2px;padding:3px 8px;}

  .projects-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
  .proj-card{background:var(--s1);border:1px solid var(--border);border-radius:4px;padding:clamp(16px,2.5vw,28px);position:relative;overflow:hidden;transition:border-color 0.3s,transform 0.3s;}
  .proj-card::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--blue),var(--steel));transform:scaleX(0);transform-origin:left;transition:transform 0.35s;}
  .proj-card:hover{border-color:var(--border2);transform:translateY(-4px);}
  .proj-card:hover::after{transform:scaleX(1);}
  .proj-card.feat{grid-column:span 2;}
  .proj-head{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:10px;flex-wrap:wrap;}
  .proj-name{font-size:clamp(14px,1.8vw,17px);font-weight:600;letter-spacing:-0.02em;}
  .proj-links{display:flex;gap:10px;flex-shrink:0;}
  .proj-link{font-family:var(--mono);font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:0.06em;transition:color 0.2s;}
  .proj-link:hover{color:var(--blue);}
  .proj-desc{font-size:13px;line-height:1.75;color:var(--text2);margin-bottom:14px;font-weight:300;}
  .proj-tags{display:flex;flex-wrap:wrap;gap:5px;}
  .proj-tag{font-family:var(--mono);font-size:10px;color:var(--blue);background:var(--blue-glow);border:1px solid rgba(96,165,250,0.15);border-radius:2px;padding:2px 8px;}

  .papers-list{display:flex;flex-direction:column;gap:12px;}
  .paper-card{background:var(--s1);border:1px solid var(--border);border-radius:4px;padding:clamp(16px,2.5vw,28px);display:grid;grid-template-columns:1fr auto;gap:20px;align-items:start;position:relative;overflow:hidden;transition:border-color 0.25s;}
  .paper-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,var(--blue),var(--steel));transform:scaleY(0);transform-origin:top;transition:transform 0.35s;}
  .paper-card:hover{border-color:var(--border2);}
  .paper-card:hover::before{transform:scaleY(1);}
  .pmeta{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:7px;}
  .pyear{font-family:var(--mono);font-size:10px;color:var(--blue);background:var(--blue-glow);border:1px solid rgba(96,165,250,0.15);border-radius:2px;padding:2px 8px;}
  .pvenue{font-family:var(--mono);font-size:10px;color:var(--text3);}
  .pstatus{font-family:var(--mono);font-size:10px;color:var(--steel);background:rgba(148,163,184,0.07);border:1px solid rgba(148,163,184,0.2);border-radius:2px;padding:2px 8px;}
  .ptitle{font-size:clamp(13px,1.6vw,16px);font-weight:600;letter-spacing:-0.02em;margin-bottom:6px;line-height:1.3;}
  .pauthors{font-family:var(--mono);font-size:10px;color:var(--text3);margin-bottom:8px;letter-spacing:0.04em;}
  .pauthors .me{color:var(--text2);text-decoration:underline;text-underline-offset:3px;}
  .pabstract{font-size:13px;line-height:1.75;color:var(--text2);font-weight:300;}
  .plink {
    font-family:var(--mono);
    font-size:10px;
    letter-spacing:0.1em;
    text-transform:uppercase;
    color:var(--blue);
    background: var(--blue-glow);
    border:1px solid rgba(96,165,250,0.3);
    padding:5px 11px;
    border-radius:3px;
    transition:all 0.2s;
    white-space:nowrap;
  }
  .plink:hover {
    background: rgba(96,165,250,0.15);
    border-color:var(--blue);
    transform: translateY(-1px);
  }

  .sum-intro{font-size:14px;line-height:1.8;color:var(--text2);margin-bottom:28px;max-width:640px;font-weight:300;}
  .sum-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
  .sum-card{background:var(--s1);border:1px solid var(--border);border-radius:4px;padding:clamp(16px,2vw,24px);transition:border-color 0.25s,transform 0.25s;display:flex;flex-direction:column;}
  .sum-card:hover{border-color:var(--border2);transform:translateY(-3px);}
  .sum-head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:8px;}
  .sum-title{font-size:14px;font-weight:600;letter-spacing:-0.01em;line-height:1.35;}
  .sum-tag{font-family:var(--mono);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--steel);background:rgba(148,163,184,0.07);border:1px solid rgba(148,163,184,0.18);border-radius:2px;padding:2px 7px;white-space:nowrap;flex-shrink:0;}
  .sum-origin{font-family:var(--mono);font-size:10px;color:var(--text3);margin-bottom:10px;}
  .sum-body{font-size:13px;line-height:1.75;color:var(--text2);margin-bottom:14px;font-weight:300;flex:1;}
  .sum-read{font-family:var(--mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--blue);transition:opacity 0.2s;margin-top:auto;}
  .sum-read:hover{opacity:0.6;}

  .tl-cols{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,64px);}
  .tl-head{font-family:var(--mono);font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:var(--blue);margin-bottom:24px;padding-bottom:12px;border-bottom:1px solid var(--border);}
  .tl-item{display:grid;grid-template-columns:clamp(64px,8vw,96px) 1fr;margin-bottom:24px;}
  .tl-date{font-family:var(--mono);font-size:10px;color:var(--text3);padding-top:3px;padding-right:14px;text-align:right;line-height:1.5;}
  .tl-body{padding-left:18px;border-left:1px solid var(--border);position:relative;padding-bottom:24px;}
  .tl-body::before{content:'';position:absolute;left:-4px;top:6px;width:7px;height:7px;border-radius:50%;background:var(--bg);border:2px solid var(--blue);}
  .tl-title{font-size:clamp(13px,1.5vw,15px);font-weight:600;letter-spacing:-0.01em;margin-bottom:3px;}
  .tl-place{font-family:var(--mono);font-size:10px;letter-spacing:0.08em;color:var(--blue);text-transform:uppercase;margin-bottom:7px;}
  .tl-desc{font-size:13px;line-height:1.7;color:var(--text2);font-weight:300;}

.contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px,4vw,64px); align-items: start; }
  .contact-intro{font-size:15px;line-height:1.85;color:var(--text2);margin-bottom:24px;font-weight:300;}
  .contact-intro strong{color:var(--text);font-weight:500;}
.contact-rows { display:flex; flex-direction:column; border-top:1px solid var(--border); max-width: 600px; }
  .c-row{display:flex;align-items:center;gap:16px;padding:13px 0;border-bottom:1px solid var(--border);}
  .c-row:hover .c-val{color:var(--blue);}
  .c-lbl{font-family:var(--mono);font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--text3);width:68px;flex-shrink:0;}
  .c-val{font-size:14px;color:var(--text2);transition:color 0.25s;font-weight:300;}
  .form-g{display:flex;flex-direction:column;gap:5px;margin-bottom:12px;}
  .form-lbl{font-family:var(--mono);font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--text3);}
  .form-in,.form-ta{background:var(--s1);border:1px solid var(--border);border-radius:3px;padding:10px 13px;color:var(--text);font-family:var(--sans);font-size:14px;font-weight:300;outline:none;transition:border-color 0.25s;resize:none;width:100%;}
  .form-in:focus,.form-ta:focus{border-color:var(--blue);}
  .form-ta{min-height:100px;}
  .footer{border-top:1px solid var(--border);padding:clamp(20px,3vw,32px) var(--pad-x);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-family:var(--mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text3);}
  .fstatus{display:flex;align-items:center;gap:7px;}
  .fdot{width:5px;height:5px;border-radius:50%;background:var(--blue);animation:bp 2.5s ease-in-out infinite;}

  @media (min-width:769px) and (max-width:1024px){
    .skills-grid{grid-template-columns:repeat(2,1fr);}
    .about-layout{grid-template-columns:1fr 1fr;}
  }
  @media (max-width:768px){
    .hamburger{display:flex;} .nav-links{display:none;}
    .hero{min-height:100svh;padding:90px 20px 72px;align-items:flex-start;}
    .hero-inner{grid-template-columns:1fr;gap:0;align-items:start;}
    .hero-photo{order:-1;width:108px;height:108px;border-radius:50%;justify-self:start;margin-bottom:20px;}
    .hero-text{order:0;}
    .hero-badge{font-size:10px;padding:5px 12px;margin-bottom:16px;white-space:normal;line-height:1.5;}
    .hero-name{font-size:clamp(48px,14vw,64px);margin-bottom:10px;}
    .hero-sub{font-size:16px;margin-bottom:16px;}
    .hero-desc{font-size:14px;margin-bottom:28px;max-width:100%;}
    .hero-cta{gap:8px;}
    .btn-p,.btn-g{padding:13px 18px;font-size:10px;flex:1;text-align:center;min-width:0;}
    .section{padding:48px 20px;}
    .s-heading{font-size:clamp(22px,7vw,30px);margin-bottom:24px;}
    .about-layout{grid-template-columns:1fr;gap:28px;} .about-text{font-size:14px;}
    .about-img-wrap {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  align-self: start;
}
.about-img-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--blue-glow) 0%, transparent 60%);
  z-index: 1;
  pointer-events: none;
}
.about-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  min-height: 320px;
  max-height: 420px;
}
  

@media (max-width: 768px) {
  .about-img { min-height: 240px; max-height: 300px; }
}
    .about-stats{grid-template-columns:repeat(2,1fr);} .stat-n{font-size:28px;} .stat-l{font-size:9px;}
    .skills-grid{grid-template-columns:1fr;gap:8px;} .skill-card{padding:16px;} .skill-name{font-size:13px;}
    .projects-grid{grid-template-columns:1fr;gap:10px;} .proj-card.feat{grid-column:span 1;} .proj-card{padding:18px;}
    .papers-list{gap:10px;} .paper-card{grid-template-columns:1fr;gap:14px;padding:18px;}
    .plinks{flex-direction:row;align-items:center;flex-wrap:wrap;gap:6px;} .plink{padding:8px 12px;} .ptitle{font-size:14px;}
    .sum-grid{grid-template-columns:1fr;gap:10px;} .sum-card{padding:18px;} .sum-title{font-size:13px;}
    .tl-cols{grid-template-columns:1fr;gap:40px;} .tl-item{grid-template-columns:58px 1fr;} .tl-date{font-size:9px;padding-right:10px;}
.contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px,4vw,64px); align-items: start; }
.contact-rows { display:flex; flex-direction:column; border-top:1px solid var(--border); max-width: 600px; }

    .c-lbl{width:60px;font-size:9px;} .c-val{font-size:13px;}
    .form-in,.form-ta{font-size:16px;}
    .btn-p{width:100%;text-align:center;padding:14px;}
    .footer{justify-content:center;text-align:center;gap:8px;padding:20px;}
    .scroll-hint{bottom:20px;}
  }
`;

export default STYLES;