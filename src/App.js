import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Doctors from './pages/Doctors';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import PrakritiQuiz from './pages/PrakritiQuiz';
import HerbalMarket from './pages/HerbalMarket';
import Vaidya from './pages/Vaidya';
import Panchakarma from './pages/Panchakarma';
import Yoga from './pages/Yoga';
import YogaSession from './pages/YogaSession';
import YogaProgress from './pages/YogaProgress';
import MedicineReminder from './pages/MedicineReminder';

const G = {
  dark: '#0A0A0A', card: '#111', border: 'rgba(255,255,255,0.06)',
  green: '#1A3C2E', greenLight: '#2D6A4F', gold: '#C9973A',
  orange: '#E8650A', text: '#FDF6EC', muted: 'rgba(253,246,236,0.4)',
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:${G.dark};color:${G.text};overflow-x:hidden}
@keyframes up{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
@keyframes floatR{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-22px) rotate(8deg)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes breathe{0%,100%{opacity:.15;transform:scale(1)}50%{opacity:.35;transform:scale(1.12)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(232,101,10,.3)}50%{box-shadow:0 0 50px rgba(232,101,10,.7)}}
@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:999;display:flex;justify-content:space-between;align-items:center;padding:18px 60px;background:rgba(10,10,10,.88);backdrop-filter:blur(20px);border-bottom:1px solid ${G.border}}
.nav-logo{font-family:'Playfair Display',serif;font-size:24px;font-weight:900;color:${G.text};cursor:pointer;letter-spacing:-.5px}
.nav-logo span{color:${G.gold}}
.nav-links{display:flex;align-items:center;gap:32px}
.nav-a{color:rgba(255,255,255,.4);text-decoration:none;font-size:13px;transition:color .2s}
.nav-a:hover{color:#fff}
.nav-cta{background:${G.orange};color:#fff;border:none;padding:10px 24px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.nav-cta:hover{background:#D05508;transform:translateY(-2px)}

/* HERO */
.hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:120px 60px 80px;gap:60px;position:relative;overflow:hidden}
.hero-glow1{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(45,106,79,.14) 0%,transparent 65%);top:-150px;right:-150px;animation:breathe 9s ease-in-out infinite;pointer-events:none}
.hero-glow2{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(232,101,10,.07) 0%,transparent 65%);bottom:-80px;left:-80px;animation:breathe 11s ease-in-out infinite reverse;pointer-events:none}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:70px 70px;pointer-events:none}
.hero-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(201,151,58,.1);border:1px solid rgba(201,151,58,.2);color:${G.gold};padding:7px 16px;border-radius:30px;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:24px;animation:up .8s ease-out}
.hero-h1{font-family:'Playfair Display',serif;font-size:72px;font-weight:900;line-height:1;letter-spacing:-2px;margin-bottom:22px}
.hero-h1 .l1{display:block;animation:up .8s ease-out .1s backwards}
.hero-h1 .l2{display:block;color:${G.gold};font-style:italic;animation:up .8s ease-out .2s backwards}
.hero-h1 .l3{display:block;animation:up .8s ease-out .3s backwards}
.hero-sub{color:${G.muted};font-size:16px;line-height:1.85;max-width:440px;margin-bottom:40px;font-weight:300;animation:up .8s ease-out .4s backwards}
.hero-btns{display:flex;gap:14px;margin-bottom:52px;animation:up .8s ease-out .5s backwards}
.btn-p{background:${G.orange};color:#fff;border:none;padding:15px 34px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;animation:glow 3s ease-in-out infinite;transition:all .2s}
.btn-p:hover{background:#D05508;transform:translateY(-3px)}
.btn-o{background:transparent;color:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.12);padding:15px 34px;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.btn-o:hover{border-color:rgba(255,255,255,.4);color:#fff;transform:translateY(-3px)}
.hero-numbers{display:flex;gap:36px;animation:up .8s ease-out .6s backwards}
.hn-num{font-family:'Playfair Display',serif;font-size:30px;font-weight:900;color:${G.gold}}
.hn-label{color:rgba(255,255,255,.2);font-size:11px;margin-top:2px}

/* HERO VISUAL */
.hero-right{display:flex;align-items:center;justify-content:center;animation:up .8s ease-out .3s backwards}
.hv-wrap{width:400px;height:400px;position:relative}
.hv-ring1{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(201,151,58,.1);animation:spin 35s linear infinite}
.hv-ring2{position:absolute;inset:28px;border-radius:50%;border:1px dashed rgba(45,106,79,.12);animation:spin 25s linear infinite reverse}
.hv-ring3{position:absolute;inset:56px;border-radius:50%;border:1px solid rgba(232,101,10,.06);animation:spin 45s linear infinite}
.hv-center{position:absolute;inset:78px;border-radius:50%;background:linear-gradient(135deg,${G.green},${G.greenLight});display:flex;align-items:center;justify-content:center;box-shadow:0 0 80px rgba(45,106,79,.35)}
.hv-emoji{font-size:90px;animation:float 4s ease-in-out infinite}
.hv-card{position:absolute;background:${G.card};border:1px solid ${G.border};border-radius:14px;padding:12px 16px;box-shadow:0 20px 40px rgba(0,0,0,.5)}
.hvc1{top:10px;right:-10px;animation:float 5s ease-in-out infinite}
.hvc2{bottom:40px;left:-20px;animation:floatR 7s ease-in-out infinite}
.hvc3{top:45%;right:-30px;animation:float 6s ease-in-out infinite reverse}
.hvc-e{font-size:18px;margin-bottom:3px}
.hvc-t{color:${G.text};font-size:12px;font-weight:700}
.hvc-s{color:rgba(255,255,255,.3);font-size:10px;margin-top:1px}

/* FLOAT ICONS */
.fi{position:absolute;opacity:.05;pointer-events:none;font-size:28px}
.fi1{top:12%;left:8%;animation:floatR 8s ease-in-out infinite}
.fi2{bottom:18%;right:6%;animation:float 6s ease-in-out infinite}

/* TICKER */
.ticker{background:${G.card};padding:16px 0;overflow:hidden;border-top:1px solid ${G.border};border-bottom:1px solid ${G.border}}
.ticker-track{display:inline-flex;animation:ticker 22s linear infinite}
.ticker-item{display:inline-flex;align-items:center;gap:10px;padding:0 28px;color:rgba(255,255,255,.22);font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase}
.ticker-dot{width:3px;height:3px;border-radius:50%;background:${G.gold};flex-shrink:0}

/* STATS */
.stats{display:grid;grid-template-columns:repeat(5,1fr);background:#0D0D0D;border-bottom:1px solid ${G.border}}
.stat{text-align:center;padding:44px 20px;border-right:1px solid ${G.border}}
.stat:last-child{border-right:none}
.stat-n{font-family:'Playfair Display',serif;font-size:38px;font-weight:900;color:${G.gold}}
.stat-l{color:rgba(255,255,255,.22);font-size:11px;margin-top:6px;letter-spacing:.5px}

/* SERVICES */
.services{padding:120px 60px;background:${G.dark}}
.s-head{margin-bottom:60px}
.s-tag{color:${G.orange};font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px}
.s-title{font-family:'Playfair Display',serif;font-size:50px;font-weight:900;color:${G.text};line-height:1.1;margin-bottom:10px}
.s-title em{font-style:italic;color:${G.gold}}
.s-sub{color:${G.muted};font-size:15px;max-width:460px;line-height:1.7;font-weight:300}
.s-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:rgba(255,255,255,.04);border-radius:20px;overflow:hidden}
.s-item{background:#0D0D0D;padding:44px 32px;cursor:pointer;position:relative;overflow:hidden;transition:background .3s}
.s-item::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,${G.orange},${G.gold});transform:scaleX(0);transition:transform .35s;transform-origin:left}
.s-item:hover{background:#131313}
.s-item:hover::after{transform:scaleX(1)}
.s-num{font-family:'Playfair Display',serif;font-size:44px;font-weight:900;color:rgba(201,151,58,.08);line-height:1;margin-bottom:14px}
.s-icon{font-size:32px;display:block;margin-bottom:14px;transition:transform .3s}
.s-item:hover .s-icon{transform:scale(1.12) translateY(-4px)}
.s-name{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:${G.text};margin-bottom:8px}
.s-desc{color:rgba(255,255,255,.28);font-size:13px;line-height:1.7;margin-bottom:16px}
.s-arrow{color:${G.orange};font-size:13px;opacity:0;transform:translateX(-8px);transition:all .3s;display:inline-block}
.s-item:hover .s-arrow{opacity:1;transform:translateX(0)}

/* WHY */
.why{padding:100px 60px;background:#0D0D0D;border-top:1px solid ${G.border}}
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:60px}
.why-card{background:${G.card};border:1px solid ${G.border};border-radius:18px;padding:28px;transition:all .3s}
.why-card:hover{border-color:rgba(255,255,255,.1);transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.4)}
.why-icon{font-size:32px;margin-bottom:16px;display:block}
.why-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:${G.text};margin-bottom:8px}
.why-desc{color:rgba(255,255,255,.28);font-size:13px;line-height:1.7}

/* PROCESS */
.process{padding:120px 60px;background:${G.dark}}
.p-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:48px;margin-top:70px}
.p-step{position:relative}
.p-step:not(:last-child)::after{content:'→';position:absolute;right:-30px;top:20px;color:rgba(255,255,255,.07);font-size:22px}
.p-num{font-family:'Playfair Display',serif;font-size:70px;font-weight:900;color:rgba(201,151,58,.07);line-height:1;margin-bottom:14px}
.p-icon{font-size:28px;margin-bottom:12px;display:block}
.p-title{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:${G.text};margin-bottom:6px}
.p-desc{color:rgba(255,255,255,.28);font-size:13px;line-height:1.7}

/* TESTIMONIALS */
.testi{padding:120px 60px;background:#0D0D0D;border-top:1px solid ${G.border}}
.t-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:60px}
.t-card{background:${G.card};border:1px solid ${G.border};border-radius:18px;padding:28px;transition:all .3s}
.t-card:hover{border-color:rgba(255,255,255,.1);transform:translateY(-4px)}
.t-stars{color:${G.gold};font-size:13px;letter-spacing:3px;margin-bottom:14px}
.t-text{color:rgba(255,255,255,.45);font-size:14px;line-height:1.85;margin-bottom:22px;font-style:italic;font-weight:300}
.t-author{display:flex;align-items:center;gap:12px}
.t-av{width:38px;height:38px;border-radius:50%;background:${G.orange};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:15px;flex-shrink:0}
.t-name{color:${G.text};font-size:13px;font-weight:600}
.t-role{color:rgba(255,255,255,.25);font-size:11px;margin-top:2px}

/* DOCTORS */
.doctors{padding:120px 60px;background:${G.dark}}
.d-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:60px}
.d-card{background:${G.card};border:1px solid ${G.border};border-radius:18px;overflow:hidden;transition:all .3s}
.d-card:hover{transform:translateY(-6px);border-color:rgba(255,255,255,.1);box-shadow:0 24px 60px rgba(0,0,0,.5)}
.d-top{height:150px;background:linear-gradient(135deg,${G.green},${G.greenLight});display:flex;align-items:center;justify-content:center;font-size:60px;position:relative;overflow:hidden}
.d-top::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 30%,rgba(201,151,58,.15) 0%,transparent 60%)}
.d-body{padding:18px}
.d-name{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:${G.text};margin-bottom:3px}
.d-spec{color:${G.gold};font-size:11px;font-weight:600;letter-spacing:.5px;margin-bottom:8px}
.d-rating{color:rgba(255,255,255,.3);font-size:11px;margin-bottom:14px}
.d-btn{width:100%;padding:10px;background:rgba(232,101,10,.08);border:1px solid rgba(232,101,10,.2);color:${G.orange};border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.d-btn:hover{background:${G.orange};color:#fff}

/* CTA */
.cta{padding:140px 60px;background:linear-gradient(135deg,${G.green},#0D2018);text-align:center;position:relative;overflow:hidden;border-top:1px solid rgba(255,255,255,.05)}
.cta::before{content:'🌿';position:absolute;font-size:500px;opacity:.03;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
.cta-eyebrow{color:rgba(201,151,58,.7);font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:18px;position:relative;z-index:1}
.cta-title{font-family:'Playfair Display',serif;font-size:62px;font-weight:900;color:${G.text};margin-bottom:16px;line-height:1.05;position:relative;z-index:1}
.cta-title em{font-style:italic;color:${G.gold}}
.cta-sub{color:rgba(253,246,236,.4);font-size:17px;margin-bottom:44px;font-weight:300;position:relative;z-index:1}
.cta-btn{background:${G.orange};color:#fff;border:none;padding:18px 52px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all .3s;position:relative;z-index:1;animation:glow 3s ease-in-out infinite}
.cta-btn:hover{transform:translateY(-3px);box-shadow:0 20px 50px rgba(232,101,10,.4)}

/* FOOTER */
.footer{background:#050505;padding:44px 60px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,.04);flex-wrap:wrap;gap:14px}
.f-logo{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:${G.text}}
.f-logo span{color:${G.gold}}
.f-text{color:rgba(255,255,255,.18);font-size:12px}

@media(max-width:768px){
  .nav{padding:16px 24px}.nav-links{display:none}
  .hero{grid-template-columns:1fr;padding:110px 24px 60px;gap:40px}.hero-h1{font-size:48px}.hero-right{display:none}
  .stats{grid-template-columns:1fr 1fr}.stat:nth-child(5){display:none}
  .services,.why,.process,.testi,.doctors,.cta{padding:80px 24px}
  .s-grid,.why-grid,.p-grid,.t-grid,.d-grid{grid-template-columns:1fr}
  .cta-title{font-size:40px}.footer{padding:32px 24px;flex-direction:column;text-align:center}
}
`;

const doctors = [
  {name:"Dr. Priya Sharma",spec:"Panchakarma Specialist",rating:"⭐ 4.9 · 320 sessions",emoji:"👩‍⚕️"},
  {name:"Dr. Arjun Nair",spec:"Ayurvedic Physician",rating:"⭐ 4.8 · 210 sessions",emoji:"👨‍⚕️"},
  {name:"Dr. Meera Iyer",spec:"Yoga & Naturopathy",rating:"⭐ 4.9 · 180 sessions",emoji:"👩‍⚕️"},
  {name:"Dr. Vikram Joshi",spec:"Herbal Medicine",rating:"⭐ 4.7 · 290 sessions",emoji:"👨‍⚕️"},
];

const testimonials = [
  {text:"The Prakriti quiz was eye-opening. My Vaidya gave me a personalized plan that actually worked within weeks.",name:"Ananya S.",role:"Mumbai · Vata",i:"A"},
  {text:"I consulted a Vaidya from Rishikesh without leaving home. The e-prescription was ready in minutes. Incredible!",name:"Rajesh M.",role:"Bangalore · Pitta",i:"R"},
  {text:"The herbal medicines combined with daily yoga sessions have transformed my health completely. Highly recommend!",name:"Priti D.",role:"Pune · Kapha",i:"P"},
];

const ticker = ["Ayurveda","Telemedicine","Yoga","Herbal Wellness","Panchakarma","Medical Tourism","22 Languages","Prakriti Quiz"];

function Home() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const h = () => setScroll(window.scrollY);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return <>
    <style>{css}</style>

    {/* NAV */}
    <nav className="nav" style={{boxShadow: scroll > 40 ? '0 4px 30px rgba(0,0,0,.4)' : 'none'}}>
      <div className="nav-logo" onClick={()=>window.location.href='/'}>Ārogya<span>Med</span></div>
      <div className="nav-links">
        <a className="nav-a" href="/doctors">Doctors</a>
        <a className="nav-a" href="/prakriti-quiz">Ayurveda</a>
        <a className="nav-a" href="/yoga">Yoga</a>
        <a className="nav-a" href="/herbal-market">Shop</a>
        <a className="nav-a" href="/dashboard">Dashboard</a>
        <button className="nav-cta" onClick={()=>window.location.href='/login'}>Get Started</button>
      </div>
    </nav>

    {/* HERO */}
    <section className="hero">
      <div className="hero-glow1"/><div className="hero-glow2"/><div className="hero-grid"/>
      <div className="fi fi1">🌿</div><div className="fi fi2">🍃</div>

      <div className="hero-left">
        <div className="hero-tag">🌿 Ancient Wisdom · Modern Care</div>
        <h1 className="hero-h1">
          <span className="l1">Heal with</span>
          <span className="l2">Ayurveda</span>
          <span className="l3">& Wellness</span>
        </h1>
        <p className="hero-sub">Connect with certified Vaidyas, discover your Prakriti body type, and begin your journey to complete mind-body-soul wellness — from home.</p>
        <div className="hero-btns">
          <button className="btn-p" onClick={()=>window.location.href='/doctors'}>Book a Consultation</button>
          <button className="btn-o" onClick={()=>window.location.href='/prakriti-quiz'}>Take Prakriti Quiz →</button>
        </div>
        <div className="hero-numbers">
          {[["12K+","Patients"],["850+","Vaidyas"],["22","Languages"],["4.9★","Rating"]].map(([n,l],i)=>(
            <div key={i}><div className="hn-num">{n}</div><div className="hn-label">{l}</div></div>
          ))}
        </div>
      </div>

      <div className="hero-right">
        <div className="hv-wrap">
          <div className="hv-ring1"/><div className="hv-ring2"/><div className="hv-ring3"/>
          <div className="hv-center"><div className="hv-emoji">🌿</div></div>
          <div className="hv-card hvc1"><div className="hvc-e">🩺</div><div className="hvc-t">Live Consultation</div><div className="hvc-s">Available Now</div></div>
          <div className="hv-card hvc2"><div className="hvc-e">🌿</div><div className="hvc-t">Prakriti Result</div><div className="hvc-s">Vata · 65%</div></div>
          <div className="hv-card hvc3"><div className="hvc-e">⭐</div><div className="hvc-t">4.9 Rating</div><div className="hvc-s">320 reviews</div></div>
        </div>
      </div>
    </section>

    {/* TICKER */}
    <div className="ticker">
      <div className="ticker-track">
        {[...ticker,...ticker].map((t,i)=>(
          <span key={i} className="ticker-item">{t}<span className="ticker-dot"/></span>
        ))}
      </div>
    </div>

    {/* STATS */}
    <div className="stats">
      {[["12,000+","Patients Healed"],["850+","Certified Vaidyas"],["22","Indian Languages"],["6","Wellness Modules"],["4.9 ★","Avg Rating"]].map(([n,l],i)=>(
        <div key={i} className="stat"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
      ))}
    </div>

    {/* SERVICES */}
    <section className="services">
      <div className="s-head">
        <div className="s-tag">What We Offer</div>
        <div className="s-title">Complete <em>Wellness,</em><br/>One Platform</div>
        <div className="s-sub">From Ayurvedic consultations to yoga, herbal products and medical tourism — everything in one app.</div>
      </div>
      <div className="s-grid">
        {[
          {n:"01",i:"🩺",name:"Telemedicine",desc:"Video consultations with certified Ayurvedic doctors from anywhere.",url:"/doctors"},
          {n:"02",i:"🌿",name:"Prakriti Assessment",desc:"Discover your Vata, Pitta or Kapha body type with our guided quiz.",url:"/prakriti-quiz"},
          {n:"03",i:"🧘",name:"Yoga & Naturopathy",desc:"Live and on-demand yoga classes with personalized wellness plans.",url:"/yoga"},
          {n:"04",i:"💊",name:"Medicine Reminder",desc:"Never miss your Ayurvedic medicines with smart daily reminders.",url:"/medicine-reminder"},
          {n:"05",i:"✈️",name:"Medical Tourism",desc:"Plan your wellness retreat or treatment trip across India.",url:"/"},
          {n:"06",i:"🛒",name:"Herbal Marketplace",desc:"100% natural certified Ayurvedic products delivered to your door.",url:"/herbal-market"},
        ].map((s,i)=>(
          <div key={i} className="s-item" onClick={()=>window.location.href=s.url}>
            <div className="s-num">{s.n}</div>
            <span className="s-icon">{s.i}</span>
            <div className="s-name">{s.name}</div>
            <div className="s-desc">{s.desc}</div>
            <span className="s-arrow">Explore →</span>
          </div>
        ))}
      </div>
    </section>

    {/* WHY US */}
    <section className="why">
      <div className="s-tag">Why ĀrogyaMed</div>
      <div className="s-title">Built for <em>India's</em> Wellness</div>
      <div className="why-grid">
        {[
          {i:"🗣️",t:"22 Indian Languages",d:"Consult in Hindi, Marathi, Tamil, Telugu and 18 more regional languages via BHASHINI."},
          {i:"🔒",t:"HIPAA Compliant",d:"Your health data is encrypted and secure with AES-256 encryption and TLS 1.3."},
          {i:"⚡",t:"Instant Prescriptions",d:"Receive digital Ayurvedic e-prescriptions immediately after your consultation."},
          {i:"🌍",t:"Medical Tourism",d:"Connect with top wellness centers and hospitals across India for holistic treatment."},
        ].map((w,i)=>(
          <div key={i} className="why-card">
            <span className="why-icon">{w.i}</span>
            <div className="why-title">{w.t}</div>
            <div className="why-desc">{w.d}</div>
          </div>
        ))}
      </div>
    </section>

    {/* PROCESS */}
    <section className="process">
      <div className="s-tag">How It Works</div>
      <div className="s-title">Start in <em>4 Simple</em> Steps</div>
      <div className="p-grid">
        {[
          {n:"01",i:"📱",t:"Create Account",d:"Sign up with your phone number and complete your health profile in minutes."},
          {n:"02",i:"🌿",t:"Take Prakriti Quiz",d:"Answer 10 questions to discover your unique Ayurvedic body type."},
          {n:"03",i:"🩺",t:"Choose a Vaidya",d:"Browse certified doctors by specialization, language and availability."},
          {n:"04",i:"✨",t:"Begin Healing",d:"Attend your consultation and receive your personalized treatment plan."},
        ].map((s,i)=>(
          <div key={i} className="p-step">
            <div className="p-num">{s.n}</div>
            <span className="p-icon">{s.i}</span>
            <div className="p-title">{s.t}</div>
            <div className="p-desc">{s.d}</div>
          </div>
        ))}
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="testi">
      <div className="s-tag">Patient Stories</div>
      <div className="s-title">Words from Our <em>Patients</em></div>
      <div className="t-grid">
        {testimonials.map((t,i)=>(
          <div key={i} className="t-card">
            <div className="t-stars">★★★★★</div>
            <p className="t-text">"{t.text}"</p>
            <div className="t-author">
              <div className="t-av">{t.i}</div>
              <div><div className="t-name">{t.name}</div><div className="t-role">{t.role}</div></div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* DOCTORS */}
    <section className="doctors">
      <div className="s-tag">Our Experts</div>
      <div className="s-title">Meet Our <em>Vaidyas</em></div>
      <div className="d-grid">
        {doctors.map((d,i)=>(
          <div key={i} className="d-card">
            <div className="d-top">{d.emoji}</div>
            <div className="d-body">
              <div className="d-name">{d.name}</div>
              <div className="d-spec">{d.spec}</div>
              <div className="d-rating">{d.rating}</div>
              <button className="d-btn" onClick={()=>window.location.href='/booking'}>Book Consultation</button>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="cta">
      <div className="cta-eyebrow">Begin Today</div>
      <h2 className="cta-title">Your Path to <em>Wellness</em><br/>Starts Here</h2>
      <p className="cta-sub">Join 12,000+ patients who found balance through Ayurveda</p>
      <button className="cta-btn" onClick={()=>window.location.href='/login'}>Begin Your Journey — It's Free</button>
    </section>

    {/* FOOTER */}
    <footer className="footer">
      <div className="f-logo">Ārogya<span>Med</span></div>
      <div className="f-text">© 2026 ĀrogyaMed · Ancient Wisdom, Modern Care</div>
      <div className="f-text">Made with 🌿 for India's wellness</div>
    </footer>
  </>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/doctors" element={<Doctors/>}/>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/prakriti-quiz" element={<PrakritiQuiz/>}/>
      <Route path="/herbal-market" element={<HerbalMarket/>}/>
      <Route path="/vaidya" element={<Vaidya/>}/>
      <Route path="/panchakarma" element={<Panchakarma/>}/>
      <Route path="/yoga" element={<Yoga/>}/>
      <Route path="/yoga-session" element={<YogaSession/>}/>
      <Route path="/yoga-progress" element={<YogaProgress/>}/>
      <Route path="/medicine-reminder" element={<MedicineReminder/>}/>
    </Routes>
  );
}

export default App;