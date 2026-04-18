"use client"

import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight, Play, ChevronRight, Zap, Film,
  Layers, Share2, Rocket, BarChart2, Wand2,
  Camera, MessageCircle, Youtube, Globe, Check, Menu, X, MoveRight
} from "lucide-react";

const T = {
  black:  "#080808",
  coal:   "#111111",
  iron:   "#1a1a1a",
  steel:  "#242424",
  muted:  "#555555",
  line:   "rgba(255,255,255,0.07)",
  warm:   "#F5F0E8",
  orange: "#FF4D00",
  amber:  "#FF8C00",
  cyan:   "#00E5FF",
  gold:   "#FFB800",
  purple: "#9B5DE5",
};

const CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Epilogue:wght@300;400;500;700;900&display=swap');",
  "*{box-sizing:border-box;margin:0;padding:0;}",
  "html{scroll-behavior:smooth;}",
  "body{background:#080808;color:#F5F0E8;font-family:'Epilogue',sans-serif;overflow-x:hidden;}",
  ".bebas{font-family:'Bebas Neue',sans-serif;letter-spacing:0.04em;}",
  "@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}",
  "@keyframes glitchA{0%,100%{clip-path:inset(0 0 95% 0)}20%{clip-path:inset(30% 0 50% 0)}60%{clip-path:inset(10% 0 80% 0)}}",
  "@keyframes glitchB{0%,100%{clip-path:inset(0 0 90% 0);transform:translate(-3px,0)}30%{clip-path:inset(20% 0 60% 0);transform:translate(3px,0)}}",
  "@keyframes blink{0%,100%{opacity:1}50%{opacity:0.4}}",
  "@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}",
  "@keyframes scanDown{0%{transform:translateY(-100%);opacity:0}10%{opacity:0.6}90%{opacity:0.6}100%{transform:translateY(600%);opacity:0}}",
  "@keyframes chaseGrad{0%{background-position:0% 0%}100%{background-position:200% 0%}}",
  "@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}",
  ".fade-up{animation:fadeUp 0.8s cubic-bezier(.22,1,.36,1) both;}",
  ".fade-up-2{animation:fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.15s both;}",
  ".fade-up-3{animation:fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.3s both;}",
  ".fade-up-4{animation:fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.45s both;}",
  ".floating{animation:floatY 5s ease-in-out infinite;}",
  ".blink{animation:blink 2s ease-in-out infinite;}",
  ".glitch{position:relative;}",
  ".glitch::before,.glitch::after{content:attr(data-text);position:absolute;inset:0;}",
  ".glitch::before{color:#00E5FF;animation:glitchA 4s steps(1) infinite;clip-path:inset(0 0 95% 0);}",
  ".glitch::after{color:#FF4D00;animation:glitchB 4s steps(1) infinite 0.5s;clip-path:inset(0 0 90% 0);}",
  ".card{background:#1a1a1a;border:1px solid rgba(255,255,255,0.07);border-radius:2px;transition:all 0.4s cubic-bezier(.22,1,.36,1);cursor:pointer;overflow:hidden;}",
  ".card:hover{border-color:rgba(255,77,0,0.3);transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,0.5);}",
  ".card:hover .reveal{opacity:1;transform:translateY(0);}",
  ".reveal{opacity:0;transform:translateY(12px);transition:all 0.4s ease;}",
  ".chase{position:relative;}",
  ".chase::after{content:'';position:absolute;inset:-2px;border-radius:4px;background:linear-gradient(90deg,#FF4D00,#00E5FF,#FFB800,#FF4D00);background-size:200% 100%;animation:chaseGrad 3s linear infinite;z-index:-1;opacity:0;transition:opacity 0.3s;}",
  ".chase:hover::after{opacity:1;}",
  ".run{display:inline-flex;animation:ticker 22s linear infinite;}",
  ".run:hover{animation-play-state:paused;}",
  "::-webkit-scrollbar{width:4px;}",
  "::-webkit-scrollbar-track{background:#080808;}",
  "::-webkit-scrollbar-thumb{background:#FF4D00;border-radius:2px;}",
  ".fire{background:#FF4D00;color:#080808;font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:0.1em;border:none;cursor:pointer;transition:all 0.25s;position:relative;overflow:hidden;}",
  ".fire::after{content:'';position:absolute;inset:0;background:#FF8C00;transform:scaleX(0);transform-origin:left;transition:transform 0.3s ease;}",
  ".fire:hover::after{transform:scaleX(1);}",
  ".fire > *{position:relative;z-index:1;}",
  ".ghost{border:1.5px solid rgba(255,255,255,0.15);color:#F5F0E8;font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:0.1em;background:transparent;cursor:pointer;transition:all 0.25s;}",
  ".ghost:hover{border-color:#FF4D00;color:#FF4D00;}",
  ".scan{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00E5FF,transparent);animation:scanDown 3s ease-in-out infinite;}",
  ".badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border:1px solid rgba(255,255,255,0.1);font-size:0.72rem;letter-spacing:0.1em;font-weight:500;color:rgba(245,240,232,0.5);}",
  ".badge-fire{border-color:rgba(255,77,0,0.4);color:#FF4D00;background:rgba(255,77,0,0.06);}",
  ".badge-cyan{border-color:rgba(0,229,255,0.4);color:#00E5FF;background:rgba(0,229,255,0.05);}",
  ".num{font-size:0.7rem;color:#555;letter-spacing:0.2em;font-weight:500;margin-bottom:12px;}",
  ".nl{font-size:0.82rem;font-weight:500;color:rgba(245,240,232,0.55);cursor:pointer;transition:color 0.2s;letter-spacing:0.03em;}",
  ".nl:hover{color:#F5F0E8;}",
  ".sbox{width:48px;height:48px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.07);background:#242424;flex-shrink:0;}",
  ".bignum{font-family:'Bebas Neue',sans-serif;letter-spacing:0.04em;line-height:1;}",
  "@media(max-width:768px){.hide{display:none!important;}}",
].join("\n");

const WORKS = [
  { cat: "Brand Identity", title: "Abuja Fintech Co.", sub: "Full brand system + pitch deck", color: "#FF4D00", tag: "Brand" },
  { cat: "Video Ad", title: "Lagos Fashion Week", sub: "30s hero spot - AI generated", color: "#00E5FF", tag: "Video" },
  { cat: "Social Campaign", title: "FoodTech Launch", sub: "3-channel 6-week campaign", color: "#FFB800", tag: "Social" },
  { cat: "Product Launch", title: "AgriTech Startup", sub: "Zero to first 1000 users", color: "#9B5DE5", tag: "Launch" },
  { cat: "Brand Identity", title: "Pan-African NGO", sub: "Identity + motion graphics", color: "#FF4D00", tag: "Brand" },
  { cat: "Video Ad", title: "E-commerce Brand", sub: "Product demo + testimonial cut", color: "#00E5FF", tag: "Video" },
];

const SERVICES = [
  { icon: Layers,   title: "Brand Identity and Design",  desc: "Logo systems, visual language, packaging, pitch decks - built for African businesses competing on a global stage.", badge: null,       price: "From N150k" },
  { icon: Film,     title: "AI Video Ads",                desc: "Scroll-stopping video ads produced with Higgsfield AI. Product demos, testimonials, launch films in 72 hours.",    badge: "AI",        price: "From N200k" },
  { icon: Share2,   title: "Social Media Campaigns",     desc: "Full-service campaign strategy across Instagram, TikTok, X and LinkedIn. Content calendars included.",               badge: null,       price: "From N120k/mo" },
  { icon: Rocket,   title: "Product Launch Strategy",    desc: "Pre-launch buzz, launch day coordination, post-launch nurture. We have done this for fintech, fashion and agri.",    badge: "Popular",   price: "From N350k" },
  { icon: Wand2,    title: "Claude AI Content Engine",   desc: "Your brand voice trained into an AI content engine. Weekly posts, ad copy, email sequences - automated.",            badge: "AI",        price: "From N80k/mo" },
  { icon: BarChart2,title: "Analytics and Growth",       desc: "ROI dashboards, A/B testing, paid media management. Know exactly what is working and why.",                          badge: null,       price: "From N100k/mo" },
];

const STATS = [
  { n: "47+",   label: "Brands Launched" },
  { n: "2.1B",  label: "Client Revenue Generated" },
  { n: "3.8M",  label: "Campaign Impressions" },
  { n: "72h",   label: "Avg Video Turnaround" },
];

const CLIENTS = ["TechStart NG", "Lagos Food Co.", "Abuja Realty", "PanCraft Studios", "Agri Direct", "HealthPulse NG", "StyleHaus", "NovaTech Africa"];

function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dot.current)  { dot.current.style.left  = (e.clientX - 6)  + "px"; dot.current.style.top  = (e.clientY - 6)  + "px"; }
      if (ring.current) { ring.current.style.left = (e.clientX - 20) + "px"; ring.current.style.top = (e.clientY - 20) + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={dot}  style={{ position:"fixed", width:12, height:12, borderRadius:"50%", background:"#FF4D00", pointerEvents:"none", zIndex:10000, mixBlendMode:"exclusion" }} />
      <div ref={ring} style={{ position:"fixed", width:40, height:40, borderRadius:"50%", border:"1.5px solid rgba(255,77,0,0.5)", pointerEvents:"none", zIndex:9999, transition:"left 0.2s,top 0.2s" }} />
    </>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const line = "1px solid rgba(255,255,255,0.07)";
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, borderBottom:line, background:"rgba(8,8,8,0.92)", backdropFilter:"blur(20px)" }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 32px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:36, height:36, background:"#FF4D00", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
            <span className="bebas" style={{ fontSize:"1.1rem", color:"#080808" }}>CW</span>
            <div style={{ position:"absolute", bottom:-3, right:-3, width:8, height:8, background:"#00E5FF" }} />
          </div>
          <div>
            <div className="bebas" style={{ fontSize:"1.15rem", color:"#F5F0E8", lineHeight:1 }}>ClawHub</div>
            <div style={{ fontSize:"0.55rem", color:"#555", letterSpacing:"0.2em", marginTop:1 }}>ABUJA - CREATIVE STUDIO</div>
          </div>
        </div>
        <div className="hide" style={{ display:"flex", gap:36 }}>
          {["Work","Services","Process","Pricing","About"].map(l => <span key={l} className="nl">{l}</span>)}
        </div>
        <div className="hide" style={{ display:"flex", gap:12, alignItems:"center" }}>
          <span className="nl">Sign In</span>
          <button className="fire" style={{ padding:"9px 22px", display:"flex", alignItems:"center", gap:8 }}>
            <span>Start Project</span><ArrowUpRight size={15} />
          </button>
        </div>
        <button onClick={() => setOpen(!open)} style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}>
          {open ? <X color="#F5F0E8" size={22} /> : <Menu color="#F5F0E8" size={22} />}
        </button>
      </div>
    </nav>
  );
}

function Ticker() {
  const words = ["BRAND IDENTITY", "AI VIDEO ADS", "PRODUCT LAUNCHES", "SOCIAL CAMPAIGNS", "ABUJA-BORN GLOBALLY BUILT", "HIGGSFIELD x CLAUDE"];
  const all = [...words, ...words];
  return (
    <div style={{ background:"#FF4D00", padding:"10px 0", overflow:"hidden" }}>
      <div className="run">
        {all.map((t, i) => (
          <span key={i} className="bebas" style={{ fontSize:"0.85rem", color:"#080808", letterSpacing:"0.15em", padding:"0 32px", whiteSpace:"nowrap" }}>
            {t} <span style={{ opacity:0.4, margin:"0 8px" }}>+</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % 3), 3000);
    return () => clearInterval(t);
  }, []);
  const lines = ["Launch Your Brand.", "Run Your Campaign.", "Ship Your Product."];
  const line  = "1px solid rgba(255,255,255,0.07)";

  return (
    <section style={{ paddingTop:64, minHeight:"100vh", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize:"80px 80px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"20%", right:"-5%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,77,0,0.12),transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", left:"5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,229,255,0.07),transparent 70%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"80px 32px 60px", flex:1, display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", zIndex:1 }}>
        <div className="fade-up" style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
          <div className="blink" style={{ width:8, height:8, borderRadius:"50%", background:"#FF4D00" }} />
          <span className="badge badge-fire">ABUJA FIRST AI-POWERED LAUNCH STUDIO</span>
          <span className="badge badge-cyan hide">HIGGSFIELD x CLAUDE AUTOMATION</span>
        </div>

        <div className="fade-up-2" style={{ marginBottom:32 }}>
          <h1 className="bebas glitch" data-text="WE MAKE BRANDS" style={{ fontSize:"clamp(4rem,11vw,9rem)", lineHeight:0.92, color:"#F5F0E8", display:"block" }}>
            WE MAKE BRANDS
          </h1>
          <h1 className="bebas" style={{ fontSize:"clamp(4rem,11vw,9rem)", lineHeight:0.92, color:"#FF4D00" }}>
            {lines[idx]}
          </h1>
          <h1 className="bebas" style={{ fontSize:"clamp(4rem,11vw,9rem)", lineHeight:0.92, WebkitTextStroke:"1px rgba(245,240,232,0.15)", WebkitTextFillColor:"transparent" }}>
            ACTUALLY SELL.
          </h1>
        </div>

        <p className="fade-up-3" style={{ fontSize:"clamp(0.95rem,1.5vw,1.15rem)", color:"rgba(245,240,232,0.55)", maxWidth:560, lineHeight:1.75, marginBottom:40 }}>
          Full-service creative studio for Abuja SMEs and startups. We combine human strategy with Claude and Higgsfield AI to deliver brand identities, video ads, and product launches faster and sharper than any traditional agency.
        </p>

        <div className="fade-up-4" style={{ display:"flex", gap:14, alignItems:"center", flexWrap:"wrap" }}>
          <button className="fire chase" style={{ padding:"14px 32px", fontSize:"1rem", display:"flex", alignItems:"center", gap:10 }}>
            <span>Launch Your Project</span><ArrowUpRight size={16} />
          </button>
          <button className="ghost" style={{ padding:"13px 28px", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", border:"1.5px solid rgba(255,77,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Play size={10} color="#FF4D00" style={{ marginLeft:2 }} />
            </div>
            <span>Watch Our Reel</span>
          </button>
        </div>

        <div style={{ display:"flex", gap:0, marginTop:64, borderTop:line, flexWrap:"wrap" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ flex:1, minWidth:140, padding:"28px 0", paddingRight:32, borderRight: i < STATS.length - 1 ? line : "none", paddingLeft: i > 0 ? 32 : 0 }}>
              <div className="bignum" style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:"#F5F0E8" }}>{s.n}</div>
              <div style={{ fontSize:"0.75rem", color:"#555", letterSpacing:"0.08em", marginTop:4, textTransform:"uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <Ticker />
    </section>
  );
}

function WorkGrid() {
  const line = "1px solid rgba(255,255,255,0.07)";
  return (
    <section style={{ padding:"80px 32px" }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:36, flexWrap:"wrap", gap:16 }}>
          <div>
            <p className="num">01 - SELECTED WORK</p>
            <h2 className="bebas" style={{ fontSize:"clamp(2rem,5vw,3.8rem)", color:"#F5F0E8", lineHeight:1 }}>
              BRANDS WE HAVE<br /><span style={{ color:"#FF4D00" }}>BUILT AND LAUNCHED</span>
            </h2>
          </div>
          <button className="ghost" style={{ padding:"10px 24px", display:"flex", alignItems:"center", gap:8 }}>
            <span>All Work</span><MoveRight size={14} />
          </button>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"5fr 3fr", gap:3 }}>
          <div className="card" style={{ gridRow:"span 2", minHeight:480, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#111,#1a0800)" }} />
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:200, height:200 }}>
              <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"conic-gradient(#FF4D00,#FF8C00,#FFB800,#FF4D00)", opacity:0.15 }} />
              <div style={{ position:"absolute", inset:24, borderRadius:"50%", background:"#111", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span className="bebas" style={{ fontSize:"1.6rem", color:"#FF4D00" }}>BRAND</span>
              </div>
            </div>
            <div className="floating" style={{ position:"absolute", right:40, top:"50%", transform:"translateY(-50%)", width:120, height:200, border:"2px solid rgba(255,77,0,0.3)", borderRadius:16, background:"rgba(255,77,0,0.04)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
              <div style={{ width:60, height:8, background:"#FF4D00", borderRadius:4, opacity:0.7 }} />
              <div style={{ width:80, height:5, background:"rgba(245,240,232,0.2)", borderRadius:4 }} />
              <div style={{ width:70, height:5, background:"rgba(245,240,232,0.15)", borderRadius:4 }} />
              <div style={{ width:50, height:30, background:"#FF4D00", borderRadius:6, marginTop:8, opacity:0.3 }} />
            </div>
            <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:28, background:"linear-gradient(to top,rgba(8,8,8,0.95),transparent)" }}>
              <div className="badge" style={{ marginBottom:10 }}>Brand Identity</div>
              <div className="bebas" style={{ fontSize:"1.6rem", color:"#F5F0E8" }}>Abuja Fintech Co.</div>
              <div className="reveal" style={{ color:"#555", fontSize:"0.85rem", marginTop:6 }}>Full brand system - Visual identity - Pitch deck - Motion graphics</div>
            </div>
          </div>

          {WORKS.slice(1, 3).map((w, i) => (
            <div key={i} className="card" style={{ minHeight:230, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#111,rgba(0,0,0,0.9))" }} />
              <div style={{ position:"absolute", top:20, right:20, width:60, height:60, border:`1px solid ${w.color}30`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {i === 0 ? <Film size={22} color={w.color} opacity={0.6} /> : <Share2 size={22} color={w.color} opacity={0.6} />}
              </div>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"20px 24px", background:"linear-gradient(to top,rgba(8,8,8,0.95),transparent)" }}>
                <span className="badge" style={{ marginBottom:8, borderColor:`${w.color}40`, color:w.color }}>{w.tag}</span>
                <div className="bebas" style={{ fontSize:"1.2rem", color:"#F5F0E8", marginTop:6 }}>{w.title}</div>
                <div className="reveal" style={{ color:"#555", fontSize:"0.78rem", marginTop:4 }}>{w.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:3, marginTop:3 }}>
          {WORKS.slice(3).map((w, i) => (
            <div key={i} className="card" style={{ minHeight:200, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#111,rgba(0,0,0,0.9))" }} />
              <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%", background:w.color, opacity:0.4 }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"18px 22px", background:"linear-gradient(to top,rgba(8,8,8,0.95),transparent)" }}>
                <span style={{ fontSize:"0.7rem", color:w.color, letterSpacing:"0.15em", fontWeight:600 }}>{w.cat.toUpperCase()}</span>
                <div className="bebas" style={{ fontSize:"1.1rem", color:"#F5F0E8", marginTop:4 }}>{w.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(null);
  const line = "1px solid rgba(255,255,255,0.07)";
  return (
    <section style={{ padding:"80px 32px", borderTop:line }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:80, alignItems:"start" }}>
          <div style={{ position:"sticky", top:80 }}>
            <p className="num">02 - SERVICES</p>
            <h2 className="bebas" style={{ fontSize:"clamp(2rem,4vw,3.2rem)", color:"#F5F0E8", lineHeight:1, marginBottom:20 }}>
              EVERYTHING<br />YOU NEED TO<br /><span style={{ color:"#FF4D00" }}>GO LOUD.</span>
            </h2>
            <p style={{ fontSize:"0.9rem", color:"rgba(245,240,232,0.5)", lineHeight:1.75, marginBottom:28 }}>
              Whether you are launching your first product or scaling an established brand - our AI-augmented studio handles it all.
            </p>
            <button className="fire" style={{ padding:"12px 28px", display:"flex", alignItems:"center", gap:8 }}>
              <span>View All Services</span><ChevronRight size={14} />
            </button>
            <div style={{ marginTop:48, padding:24, border:line, background:"#111" }}>
              <div style={{ fontSize:"0.7rem", color:"#555", letterSpacing:"0.12em", marginBottom:16 }}>THE AI STACK</div>
              {[
                { name:"Claude AI",  desc:"Strategy and Copy",  color:"#FF4D00" },
                { name:"Higgsfield", desc:"Video Generation",   color:"#00E5FF" },
                { name:"ClawHub",    desc:"Distribution",       color:"#FFB800" },
              ].map((s, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom: i < 2 ? line : "none" }}>
                  <div style={{ width:32, height:32, background:`${s.color}15`, border:`1px solid ${s.color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.65rem", color:s.color, fontWeight:700 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize:"0.82rem", color:"#F5F0E8", fontWeight:600 }}>{s.name}</div>
                    <div style={{ fontSize:"0.72rem", color:"#555" }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {SERVICES.map((s, i) => (
              <div key={i} onClick={() => setActive(active === i ? null : i)}
                style={{ padding:"28px 32px", border:`1px solid ${active === i ? "rgba(255,77,0,0.25)" : "rgba(255,255,255,0.07)"}`, background: active === i ? "rgba(255,77,0,0.04)" : "#111", cursor:"pointer", transition:"all 0.3s" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:20 }}>
                    <div className="sbox" style={{ borderColor: active === i ? "rgba(255,77,0,0.3)" : "rgba(255,255,255,0.07)" }}>
                      <s.icon size={20} color={active === i ? "#FF4D00" : "rgba(245,240,232,0.4)"} />
                    </div>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span className="bebas" style={{ fontSize:"1.15rem", color: active === i ? "#FF4D00" : "#F5F0E8", letterSpacing:"0.06em" }}>{s.title}</span>
                        {s.badge && (
                          <span style={{ fontSize:"0.62rem", padding:"2px 8px", background: s.badge === "AI" ? "rgba(0,229,255,0.1)" : "rgba(255,184,0,0.1)", color: s.badge === "AI" ? "#00E5FF" : "#FFB800", border:`1px solid ${s.badge === "AI" ? "rgba(0,229,255,0.25)" : "rgba(255,184,0,0.25)"}`, letterSpacing:"0.1em", fontWeight:600 }}>{s.badge}</span>
                        )}
                      </div>
                      <div style={{ fontSize:"0.78rem", color:"#555", marginTop:2 }}>{s.price}</div>
                    </div>
                  </div>
                  <div style={{ transform: active === i ? "rotate(45deg)" : "none", transition:"transform 0.3s", color:"#FF4D00" }}>
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                {active === i && (
                  <div style={{ marginTop:20, marginLeft:68, paddingTop:20, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
                    <p style={{ fontSize:"0.88rem", color:"rgba(245,240,232,0.6)", lineHeight:1.75, marginBottom:16 }}>{s.desc}</p>
                    <button className="fire" style={{ padding:"9px 20px", fontSize:"0.85rem", display:"inline-flex", alignItems:"center", gap:8 }}>
                      <span>Get Quote</span><ChevronRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AIDemo() {
  const [tab, setTab] = useState("video");
  const tabs = [
    { id:"video",  label:"Video Ad Generation", icon:Film },
    { id:"copy",   label:"Campaign Copy",        icon:Wand2 },
    { id:"social", label:"Social Content",       icon:Share2 },
  ];
  const outputs = {
    video:  { title:"AI Video Ad - 30 sec",          lines:["Scene 1: Product hero shot, warm lighting, Lagos skyline","Scene 2: Testimonial cut - real customer, subtitle burn","Scene 3: Offer close - animated text + CTA overlay","Afrobeats underscore, brand palette, logo end frame"], badge:"Higgsfield Generated", color:"#00E5FF" },
    copy:   { title:"Campaign Headlines - 5 options", lines:["The Brand Abuja Was Waiting For","Built Here. Scaling Everywhere.","Your Product Deserves a Loud Launch","When Strategy Meets Creativity, Sales Follow"],         badge:"Claude Generated",    color:"#FF4D00" },
    social: { title:"30-Day Content Calendar",        lines:["Week 1: Brand Awareness - 4 posts, 2 reels","Week 2: Product Education - carousel series + story polls","Week 3: Social Proof - UGC reposts + testimonial graphics","Week 4: Conversion Push - offer posts + countdown stories"], badge:"Auto-scheduled", color:"#FFB800" },
  };
  const out  = outputs[tab];
  const line = "1px solid rgba(255,255,255,0.07)";

  return (
    <section style={{ padding:"80px 32px", background:"#111", borderTop:line, borderBottom:line }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <p className="num" style={{ textAlign:"center" }}>03 - HOW IT WORKS</p>
          <h2 className="bebas" style={{ fontSize:"clamp(2rem,5vw,3.8rem)", color:"#F5F0E8", lineHeight:1 }}>
            THE AI ENGINE <span style={{ color:"#FF4D00" }}>BEHIND</span><br />EVERY CAMPAIGN
          </h2>
          <p style={{ color:"rgba(245,240,232,0.45)", marginTop:12, maxWidth:500, margin:"12px auto 0", fontSize:"0.9rem", lineHeight:1.7 }}>
            We pair human creative direction with Claude AI and Higgsfield video generation to produce in 72 hours what used to take 3 weeks.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center" }}>
          <div style={{ background:"#080808", border:line, borderRadius:2, overflow:"hidden" }}>
            <div style={{ padding:"12px 18px", borderBottom:line, display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f57" }} />
              <div style={{ width:10, height:10, borderRadius:"50%", background:"#febc2e" }} />
              <div style={{ width:10, height:10, borderRadius:"50%", background:"#28c840" }} />
              <span style={{ fontSize:"0.72rem", color:"#555", marginLeft:12, letterSpacing:"0.1em" }}>clawhub-ai-engine.sh</span>
            </div>
            <div style={{ display:"flex", borderBottom:line }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{ flex:1, padding:"10px 8px", background: tab === t.id ? "rgba(255,77,0,0.06)" : "transparent", border:"none", borderBottom: tab === t.id ? "2px solid #FF4D00" : "2px solid transparent", cursor:"pointer", color: tab === t.id ? "#FF4D00" : "#555", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.06em", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                  <t.icon size={12} />
                  <span className="hide">{t.label}</span>
                </button>
              ))}
            </div>
            <div style={{ padding:24, minHeight:240, position:"relative" }}>
              <div className="scan" />
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                <span style={{ fontSize:"0.7rem", padding:"3px 10px", background:`${out.color}15`, color:out.color, border:`1px solid ${out.color}30`, letterSpacing:"0.1em" }}>{out.badge}</span>
                <span style={{ fontSize:"0.7rem", color:"#555" }}>Generated in 4.2s</span>
              </div>
              <div className="bebas" style={{ fontSize:"1rem", color:out.color, marginBottom:16, letterSpacing:"0.06em" }}>{out.title}</div>
              {out.lines.map((l, i) => (
                <div key={i} style={{ fontSize:"0.85rem", color:"rgba(245,240,232,0.65)", padding:"8px 0", borderBottom:line, lineHeight:1.5 }}>{l}</div>
              ))}
              <div style={{ marginTop:20, display:"flex", gap:10 }}>
                <button className="fire" style={{ padding:"8px 18px", fontSize:"0.8rem", display:"flex", alignItems:"center", gap:6 }}>
                  <span>Use This</span><ChevronRight size={12} />
                </button>
                <button className="ghost" style={{ padding:"7px 18px", fontSize:"0.8rem" }}>Regenerate</button>
              </div>
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {[
              { n:"01", title:"Brief Us",                desc:"Tell us your product, audience, and goals. Our intake form takes 8 minutes.",                                       color:"#FF4D00" },
              { n:"02", title:"AI Strategy Draft",       desc:"Claude generates positioning, messaging framework, and campaign strategy within the hour.",                         color:"#00E5FF" },
              { n:"03", title:"Visual and Video",        desc:"Our team plus Higgsfield AI produce visuals, video ads, and creative assets.",                                      color:"#FFB800" },
              { n:"04", title:"Launch and Manage",       desc:"We deploy across your channels and manage performance. You focus on the business.",                                 color:"#9B5DE5" },
            ].map((step, i) => (
              <div key={i} style={{ display:"flex", gap:20, padding:"24px 0", borderBottom: i < 3 ? line : "none" }}>
                <div className="bebas" style={{ fontSize:"2.5rem", color:`${step.color}25`, lineHeight:1, minWidth:48, paddingTop:4 }}>{step.n}</div>
                <div>
                  <div className="bebas" style={{ fontSize:"1.1rem", color:"#F5F0E8", letterSpacing:"0.06em", marginBottom:6 }}>{step.title}</div>
                  <p style={{ fontSize:"0.85rem", color:"rgba(245,240,232,0.5)", lineHeight:1.65 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const line = "1px solid rgba(255,255,255,0.07)";
  return (
    <section style={{ padding:"48px 0", overflow:"hidden", borderBottom:line }}>
      <div style={{ fontSize:"0.65rem", color:"#555", letterSpacing:"0.2em", textAlign:"center", marginBottom:20 }}>TRUSTED BY NIGERIAN BUSINESSES</div>
      <div style={{ overflow:"hidden" }}>
        <div style={{ display:"inline-flex", animation:"ticker 18s linear infinite", gap:0 }}>
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <div key={i} style={{ padding:"0 40px", whiteSpace:"nowrap", fontSize:"0.9rem", color:"rgba(245,240,232,0.25)", fontWeight:500, borderRight:line }}>{c}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const line = "1px solid rgba(255,255,255,0.07)";
  const plans = [
    { name:"Starter Sprint",   price:"N150k", period:"one-time",   desc:"Perfect for small businesses launching their first campaign.",                  features:["Brand identity kit","3 social media templates","1 AI video ad (30s)","15-day campaign strategy"],                                                                           accent:"#F5F0E8", popular:false },
    { name:"Launch Package",   price:"N450k", period:"per launch", desc:"Full product launch support from strategy to first 1000 customers.",           features:["Full brand system","30-day campaign management","3 AI video ads","Claude content engine setup","Meta and Instagram ad management","Weekly performance reports"],   accent:"#FF4D00", popular:true  },
    { name:"Studio Retainer",  price:"N180k", period:"/month",     desc:"Ongoing creative partnership for established businesses.",                      features:["Monthly content calendar","8 posts + 4 stories/week","2 video ads/month","Brand growth strategy","Analytics dashboard","Dedicated account lead"],              accent:"#00E5FF", popular:false },
  ];
  return (
    <section style={{ padding:"80px 32px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <p className="num" style={{ textAlign:"center" }}>04 - PRICING</p>
          <h2 className="bebas" style={{ fontSize:"clamp(2rem,5vw,3.8rem)", color:"#F5F0E8", lineHeight:1 }}>
            AGENCY QUALITY.<br /><span style={{ color:"#FF4D00" }}>SME-FRIENDLY PRICE.</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:2 }}>
          {plans.map((p, i) => (
            <div key={i} style={{ padding:"36px 32px", border:`1px solid ${p.popular ? "rgba(255,77,0,0.3)" : "rgba(255,255,255,0.07)"}`, background: p.popular ? "rgba(255,77,0,0.04)" : "#111", position:"relative", overflow:"hidden" }}>
              {p.popular && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,#FF4D00,#FF8C00)" }} />}
              {p.popular && <div style={{ position:"absolute", top:16, right:16 }}><span className="bebas" style={{ fontSize:"0.7rem", color:"#080808", background:"#FF4D00", padding:"3px 10px", letterSpacing:"0.1em" }}>POPULAR</span></div>}
              <div className="bebas" style={{ fontSize:"1.1rem", color:p.accent, letterSpacing:"0.08em", marginBottom:6 }}>{p.name}</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:8 }}>
                <span className="bebas" style={{ fontSize:"2.4rem", color:"#F5F0E8" }}>{p.price}</span>
                <span style={{ fontSize:"0.82rem", color:"#555" }}>{p.period}</span>
              </div>
              <p style={{ fontSize:"0.82rem", color:"#555", lineHeight:1.6, marginBottom:24 }}>{p.desc}</p>
              <div style={{ height:1, background:"rgba(255,255,255,0.07)", marginBottom:24 }} />
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                    <Check size={13} color={p.accent} style={{ marginTop:2, flexShrink:0 }} />
                    <span style={{ fontSize:"0.84rem", color:"rgba(245,240,232,0.7)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className={p.popular ? "fire" : "ghost"} style={{ width:"100%", padding:"13px", fontSize:"0.9rem", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                <span>Get Started</span><ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding:"80px 32px", background:"#FF4D00", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(0,0,0,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.08) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
      <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:28, position:"relative", zIndex:1 }}>
        <div>
          <h2 className="bebas" style={{ fontSize:"clamp(2rem,5vw,3.5rem)", color:"#080808", lineHeight:1 }}>
            YOUR BRAND DESERVES<br />A LOUD LAUNCH.
          </h2>
          <p style={{ fontSize:"0.95rem", color:"rgba(0,0,0,0.65)", marginTop:8 }}>First strategy session is free.</p>
        </div>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <button style={{ padding:"14px 32px", background:"#080808", color:"#F5F0E8", border:"none", cursor:"pointer", fontFamily:"Bebas Neue,sans-serif", fontSize:"1rem", letterSpacing:"0.1em", display:"flex", alignItems:"center", gap:10 }}>
            <span>Book Free Strategy Call</span><ArrowUpRight size={16} />
          </button>
          <button style={{ padding:"14px 28px", background:"transparent", color:"#080808", border:"2px solid rgba(0,0,0,0.35)", cursor:"pointer", fontFamily:"Bebas Neue,sans-serif", fontSize:"1rem", letterSpacing:"0.1em" }}>
            See Packages
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const line = "1px solid rgba(255,255,255,0.07)";
  return (
    <footer style={{ background:"#111", borderTop:line, padding:"48px 32px 32px" }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:32, paddingBottom:40, borderBottom:line }}>
          <div style={{ maxWidth:280 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <div style={{ width:32, height:32, background:"#FF4D00", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span className="bebas" style={{ fontSize:"0.9rem", color:"#080808" }}>CW</span>
              </div>
              <span className="bebas" style={{ fontSize:"1rem", color:"#F5F0E8" }}>ClawHub</span>
            </div>
            <p style={{ fontSize:"0.82rem", color:"#555", lineHeight:1.7 }}>Abuja AI-powered creative studio. Building brands that sell.</p>
            <div style={{ display:"flex", gap:10, marginTop:16 }}>
              {[Camera, MessageCircle, Youtube, Globe].map((Icon, i) => (
                <div key={i} style={{ width:34, height:34, border:line, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                  <Icon size={14} color="#555" />
                </div>
              ))}
            </div>
          </div>
          {[
            { title:"Services", items:["Brand Identity","AI Video Ads","Social Campaigns","Product Launches","Content Engine"] },
            { title:"Company",  items:["About Us","Our Work","Process","Careers","Contact"] },
            { title:"Contact",  items:["Abuja, Nigeria","hello@clawhub.ng","+234 800 CLAWHUB","Mon-Fri 9am-6pm WAT"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontSize:"0.72rem", color:"#555", letterSpacing:"0.15em", marginBottom:16, fontWeight:600 }}>{col.title}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {col.items.map((item, j) => <span key={j} style={{ fontSize:"0.85rem", color:"rgba(245,240,232,0.45)", cursor:"pointer" }}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:24, flexWrap:"wrap", gap:12 }}>
          <span style={{ fontSize:"0.75rem", color:"#555" }}>2026 ClawHub - A Renovate Africa Studio - Abuja, Nigeria</span>
          <span style={{ fontSize:"0.75rem", color:"#555" }}>hello@renovateafrica.com</span>
        </div>
      </div>
    </footer>
  );
}

export default function ClawHub() {
  return (
    <>
      <style>{CSS}</style>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <WorkGrid />
        <Services />
        <AIDemo />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
