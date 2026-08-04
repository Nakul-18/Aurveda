import { useState } from 'react';
import Navbar from '../components/Navbar';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#0A0A0A}
@keyframes up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes breathe{0%,100%{opacity:.1;transform:scale(1)}50%{opacity:.2;transform:scale(1.1)}}
.pres{min-height:100vh;background:#0A0A0A;color:#FDF6EC;font-family:'Inter',sans-serif}
.pres-hero{background:linear-gradient(135deg,#0F1F23,#1A3C2E 60%,#0F2E23);padding:120px 60px 80px;text-align:center;position:relative;overflow:hidden}
.pres-hero::before{content:'';position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(201,151,58,.08),transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);animation:breathe 8s ease-in-out infinite;pointer-events:none}
.pres-badge{display:inline-flex;gap:8px;background:rgba(201,151,58,.12);border:1px solid rgba(201,151,58,.25);color:#C9973A;padding:7px 18px;border-radius:30px;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:24px;animation:up .6s ease-out;position:relative;z-index:1}
.pres-title{font-family:'Playfair Display',serif;font-size:72px;font-weight:900;color:#FDF6EC;line-height:1;margin-bottom:16px;animation:up .6s ease-out .1s backwards;position:relative;z-index:1}
.pres-title span{color:#C9973A;font-style:italic;display:block}
.pres-sub{color:rgba(255,255,255,.4);font-size:17px;max-width:560px;margin:0 auto 48px;line-height:1.7;font-weight:300;animation:up .6s ease-out .2s backwards;position:relative;z-index:1}
.pres-hero-stats{display:flex;justify-content:center;gap:60px;flex-wrap:wrap;animation:up .6s ease-out .3s backwards;position:relative;z-index:1}
.phs-num{font-family:'Playfair Display',serif;font-size:44px;font-weight:900;color:#C9973A}
.phs-label{color:rgba(255,255,255,.3);font-size:12px;margin-top:4px;letter-spacing:.5px}

.tabs{background:#111;display:flex;border-bottom:1px solid rgba(255,255,255,.06);overflow-x:auto;position:sticky;top:60px;z-index:100}
.tab{padding:16px 28px;color:rgba(255,255,255,.35);font-size:13px;font-weight:600;cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;white-space:nowrap;background:none;border-top:none;border-left:none;border-right:none;font-family:'Inter',sans-serif}
.tab.active{color:#E8650A;border-bottom-color:#E8650A}
.tab:hover:not(.active){color:rgba(255,255,255,.6)}

.section{padding:72px 60px}
.section-alt{background:#0D0D0D}
.s-eyebrow{color:#E8650A;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px}
.s-title{font-family:'Playfair Display',serif;font-size:44px;font-weight:900;color:#FDF6EC;margin-bottom:12px;line-height:1.1}
.s-title em{font-style:italic;color:#C9973A}
.s-sub{color:rgba(255,255,255,.3);font-size:15px;max-width:500px;line-height:1.7;margin-bottom:48px;font-weight:300}

.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px}
.info-card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:18px;padding:28px}
.ic-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#FDF6EC;margin-bottom:20px}
.ic-list{display:flex;flex-direction:column;gap:10px}
.ic-item{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;background:rgba(255,255,255,.03);border-radius:10px}
.ic-arrow{color:#E8650A;font-weight:700;flex-shrink:0;margin-top:1px}
.ic-text{color:rgba(255,255,255,.5);font-size:14px;line-height:1.5}

.progress-items{display:flex;flex-direction:column;gap:20px;margin-top:32px}
.prog-item{}
.prog-header{display:flex;justify-content:space-between;margin-bottom:8px}
.prog-label{color:rgba(255,255,255,.6);font-size:14px;font-weight:600}
.prog-pct{color:#C9973A;font-size:14px;font-weight:700}
.prog-track{height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden}
.prog-fill{height:100%;border-radius:4px}

.modules-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.mod-card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:16px;overflow:hidden;transition:all .3s;animation:up .6s ease-out}
.mod-card:hover{transform:translateY(-4px);border-color:rgba(255,255,255,.12)}
.mod-header{padding:20px 20px 0;display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}
.mod-icon{font-size:36px}
.mod-badge{padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700}
.badge-done{background:rgba(34,197,94,.1);color:#22c55e;border:1px solid rgba(34,197,94,.2)}
.badge-next{background:rgba(232,101,10,.1);color:#E8650A;border:1px solid rgba(232,101,10,.2)}
.badge-later{background:rgba(255,255,255,.05);color:rgba(255,255,255,.3);border:1px solid rgba(255,255,255,.08)}
.mod-body{padding:0 20px 20px}
.mod-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#FDF6EC;margin-bottom:6px}
.mod-desc{color:rgba(255,255,255,.28);font-size:12px;line-height:1.6;margin-bottom:12px}
.mod-pages{display:flex;flex-direction:column;gap:5px}
.mod-page{display:flex;gap:8px;align-items:center;padding:6px 10px;background:rgba(255,255,255,.03);border-radius:7px;font-size:12px;color:rgba(255,255,255,.45)}

.tech-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;margin-top:16px}
.tech-card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:20px;text-align:center;transition:all .3s}
.tech-card:hover{transform:translateY(-3px);border-color:rgba(255,255,255,.12)}
.tech-icon{font-size:32px;margin-bottom:10px;display:block}
.tech-name{color:#FDF6EC;font-size:13px;font-weight:700;margin-bottom:3px}
.tech-desc{color:rgba(255,255,255,.25);font-size:11px}

.timeline{position:relative;padding-left:36px;margin-top:16px}
.timeline::before{content:'';position:absolute;left:10px;top:0;bottom:0;width:1px;background:rgba(255,255,255,.07)}
.tl-item{position:relative;margin-bottom:40px}
.tl-dot{position:absolute;left:-30px;top:4px;width:10px;height:10px;border-radius:50%;border:2px solid}
.dot-done{background:#22c55e;border-color:#22c55e}
.dot-now{background:#E8650A;border-color:#E8650A;box-shadow:0 0 10px rgba(232,101,10,.5)}
.dot-future{background:transparent;border-color:rgba(255,255,255,.15)}
.tl-period{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px}
.period-done{color:#22c55e}
.period-now{color:#E8650A}
.period-future{color:rgba(255,255,255,.2)}
.tl-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#FDF6EC;margin-bottom:6px}
.tl-desc{color:rgba(255,255,255,.3);font-size:13px;line-height:1.6;margin-bottom:12px}
.tl-chips{display:flex;flex-wrap:wrap;gap:7px}
.chip{padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;border:1px solid}
.chip-done{background:rgba(34,197,94,.07);color:#22c55e;border-color:rgba(34,197,94,.15)}
.chip-now{background:rgba(232,101,10,.07);color:#E8650A;border-color:rgba(232,101,10,.15)}
.chip-future{background:rgba(255,255,255,.03);color:rgba(255,255,255,.25);border-color:rgba(255,255,255,.07)}

.next-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
.next-card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:24px;transition:all .3s}
.next-card:hover{transform:translateY(-4px);border-color:rgba(232,101,10,.2)}
.next-num{font-family:'Playfair Display',serif;font-size:52px;font-weight:900;color:rgba(201,151,58,.08);line-height:1;margin-bottom:10px}
.next-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#FDF6EC;margin-bottom:6px}
.next-desc{color:rgba(255,255,255,.28);font-size:13px;line-height:1.6;margin-bottom:12px}
.next-time{color:#E8650A;font-size:11px;font-weight:700;letter-spacing:.5px}

.pres-footer{background:linear-gradient(135deg,#1A3C2E,#0D2018);padding:80px 60px;text-align:center;position:relative;overflow:hidden;border-top:1px solid rgba(255,255,255,.05)}
.pres-footer::before{content:'🌿';position:absolute;font-size:400px;opacity:.03;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
.pf-title{font-family:'Playfair Display',serif;font-size:52px;font-weight:900;color:#FDF6EC;margin-bottom:12px;position:relative;z-index:1}
.pf-sub{color:rgba(255,255,255,.35);font-size:17px;margin-bottom:32px;position:relative;z-index:1}
.pf-logo{font-family:'Playfair Display',serif;font-size:28px;font-weight:900;color:#FDF6EC;position:relative;z-index:1}
.pf-logo span{color:#C9973A}
.pf-tagline{color:rgba(255,255,255,.2);font-size:12px;margin-top:10px;letter-spacing:1px;position:relative;z-index:1}

@media(max-width:768px){
  .pres-hero{padding:100px 24px 60px}
  .pres-title{font-size:44px}
  .pres-hero-stats{gap:32px}
  .section{padding:60px 24px}
  .two-col{grid-template-columns:1fr}
  .pres-footer{padding:60px 24px}
  .pf-title{font-size:36px}
}
`;

const doneModules = [
  {icon:"🏥",name:"Telemedicine",desc:"Complete online doctor consultation platform.",pages:["Home Page","Login/Signup","Doctor Listing","Book Appointment","Patient Dashboard"],status:"done"},
  {icon:"🌿",name:"Ayurveda",desc:"Full Ayurvedic wellness platform with quiz and marketplace.",pages:["Prakriti Quiz","Quiz Result","Herbal Marketplace","Vaidya Listing","Panchakarma"],status:"done"},
  {icon:"🧘",name:"Yoga & Naturopathy",desc:"Complete yoga platform with live sessions.",pages:["Yoga Home","Live Session Booking","Progress Tracker"],status:"done"},
  {icon:"❤️",name:"Health & Wellness",desc:"Holistic wellness programs and retreats.",pages:["Wellness Programs","Retreat Booking"],status:"done"},
  {icon:"✈️",name:"Medical Tourism",desc:"Hospital search and cost estimator.",pages:["Hospital Search","Cost Estimator"],status:"done"},
  {icon:"🎭",name:"Recreation",desc:"Spa, resort and nature therapy destinations.",pages:["Spa & Resorts","Nature Therapy"],status:"done"},
  {icon:"🔍",name:"Health Tools",desc:"AI-powered health assessment tools.",pages:["Symptom Checker","Diet Plan","BMI Calculator"],status:"done"},
  {icon:"💊",name:"Medicine Reminder",desc:"Daily medicine tracking and reminders.",pages:["Medicine Reminder"],status:"done"},
];

const upcomingModules = [
  {icon:"⚙️",name:"Backend APIs",desc:"Node.js + PostgreSQL for all data storage.",pages:["User Auth API","Booking API","Prescription API","Payment API"],status:"next"},
  {icon:"🌐",name:"22 Languages",desc:"BHASHINI integration for Indian languages.",pages:["Hindi","Marathi","Tamil","Telugu","+ 18 more"],status:"next"},
  {icon:"📹",name:"Video Calls",desc:"WebRTC video consultation feature.",pages:["Video Consultation","Screen Share","Recording"],status:"next"},
  {icon:"📱",name:"Mobile App",desc:"React Native Android & iOS app.",pages:["Android App","iOS App","Push Notifications"],status:"later"},
  {icon:"☁️",name:"Deployment",desc:"AWS cloud deployment with Docker.",pages:["AWS Server","Domain Name","SSL Certificate"],status:"later"},
];

const techStack = [
  {icon:"⚛️",name:"React.js",desc:"Frontend UI"},
  {icon:"🔀",name:"React Router",desc:"Navigation"},
  {icon:"🎨",name:"CSS3",desc:"Animations"},
  {icon:"🟢",name:"Node.js",desc:"Backend (soon)"},
  {icon:"🐘",name:"PostgreSQL",desc:"Database (soon)"},
  {icon:"💳",name:"Razorpay",desc:"Payments (soon)"},
  {icon:"🗣️",name:"BHASHINI",desc:"22 Languages"},
  {icon:"☁️",name:"AWS",desc:"Deployment (soon)"},
];

export default function Presentation() {
  const [tab, setTab] = useState('overview');

  const tabs = [
    {id:'overview',label:'📊 Overview'},
    {id:'built',label:'✅ What We Built'},
    {id:'tech',label:'⚙️ Tech Stack'},
    {id:'next',label:'🚀 What\'s Next'},
    {id:'timeline',label:'📅 Timeline'},
  ];

  return (
    <div className="pres">
      <style>{css}</style>
      <Navbar />

      <div className="pres-hero">
        <div className="pres-badge">🌿 Project Presentation — July 2026</div>
        <h1 className="pres-title">Ārogya<span>Med Platform</span></h1>
        <p className="pres-sub">A comprehensive Ayurvedic wellness platform combining telemedicine, yoga, herbal marketplace, medical tourism and more — built with React.js</p>
        <div className="pres-hero-stats">
          {[["19","Pages Built"],["8","Modules Done"],["12","Total Features"],["90%","Frontend Done"]].map(([n,l],i)=>(
            <div key={i}><div className="phs-num">{n}</div><div className="phs-label">{l}</div></div>
          ))}
        </div>
      </div>

      <div className="tabs">
        {tabs.map(t=>(
          <button key={t.id} className={`tab ${tab===t.id?'active':''}`} onClick={()=>setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {tab==='overview' && (
        <div className="section">
          <div className="s-eyebrow">Project Summary</div>
          <div className="s-title">What is <em>ĀrogyaMed?</em></div>
          <div className="s-sub">A one-stop platform for all Ayurvedic and wellness needs — like Practo + Cure.fit + Incredible India, built for traditional Indian healthcare.</div>
          <div className="two-col">
            {[
              {title:"❌ Problem We're Solving",items:["No single platform for Ayurvedic consultations","Language barriers in healthcare","Hard to find certified Vaidyas online","No digital Ayurvedic prescriptions"]},
              {title:"✅ Our Solution",items:["One app — 8 wellness modules built","22 Indian languages via BHASHINI (upcoming)","Certified Vaidyas with video consultation","Digital e-prescriptions and health tracking"]},
            ].map((item,i)=>(
              <div key={i} className="info-card">
                <div className="ic-title">{item.title}</div>
                <div className="ic-list">
                  {item.items.map((it,j)=>(
                    <div key={j} className="ic-item">
                      <span className="ic-arrow">→</span>
                      <span className="ic-text">{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="progress-items">
            {[
              {label:"Frontend Development",pct:90,color:"#22c55e"},
              {label:"Backend Development",pct:0,color:"#E8650A"},
              {label:"Database Setup",pct:0,color:"#C9973A"},
              {label:"Language Integration (BHASHINI)",pct:0,color:"#F7931E"},
              {label:"Payments (Razorpay)",pct:0,color:"#2D6A4F"},
              {label:"Mobile App (React Native)",pct:0,color:"#FF6B35"},
              {label:"Overall Project",pct:25,color:"#C9973A"},
            ].map((p,i)=>(
              <div key={i} className="prog-item">
                <div className="prog-header"><span className="prog-label">{p.label}</span><span className="prog-pct">{p.pct}%</span></div>
                <div className="prog-track"><div className="prog-fill" style={{width:`${p.pct}%`,background:p.color}}/></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='built' && (
        <div className="section">
          <div className="s-eyebrow">Completed Work</div>
          <div className="s-title">What We <em>Built</em></div>
          <div className="s-sub">8 complete frontend modules with 19 fully designed pages built using React.js</div>
          <div style={{color:'rgba(255,255,255,.3)',fontSize:'12px',marginBottom:'20px',fontWeight:'600',letterSpacing:'1px',textTransform:'uppercase'}}>✅ Completed Modules</div>
          <div className="modules-grid" style={{marginBottom:'40px'}}>
            {doneModules.map((m,i)=>(
              <div key={i} className="mod-card">
                <div className="mod-header"><div className="mod-icon">{m.icon}</div><span className="mod-badge badge-done">✅ Done</span></div>
                <div className="mod-body">
                  <div className="mod-name">{m.name}</div>
                  <div className="mod-desc">{m.desc}</div>
                  <div className="mod-pages">
                    {m.pages.map((p,j)=>(
                      <div key={j} className="mod-page"><span style={{color:'#22c55e',fontWeight:'700'}}>✓</span>{p}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{color:'rgba(255,255,255,.3)',fontSize:'12px',marginBottom:'20px',fontWeight:'600',letterSpacing:'1px',textTransform:'uppercase'}}>⏳ Upcoming Modules</div>
          <div className="modules-grid">
            {upcomingModules.map((m,i)=>(
              <div key={i} className="mod-card">
                <div className="mod-header"><div className="mod-icon">{m.icon}</div><span className={`mod-badge ${m.status==='next'?'badge-next':'badge-later'}`}>{m.status==='next'?'🔜 Next':'⏳ Later'}</span></div>
                <div className="mod-body">
                  <div className="mod-name">{m.name}</div>
                  <div className="mod-desc">{m.desc}</div>
                  <div className="mod-pages">
                    {m.pages.map((p,j)=>(
                      <div key={j} className="mod-page"><span style={{color:'rgba(255,255,255,.2)'}}>○</span><span style={{color:'rgba(255,255,255,.3)'}}>{p}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='tech' && (
        <div className="section">
          <div className="s-eyebrow">Technology</div>
          <div className="s-title">Our <em>Tech Stack</em></div>
          <div className="s-sub">Modern technologies chosen for scalability, performance and developer productivity.</div>
          <div className="tech-grid">
            {techStack.map((t,i)=>(
              <div key={i} className="tech-card">
                <span className="tech-icon">{t.icon}</span>
                <div className="tech-name">{t.name}</div>
                <div className="tech-desc">{t.desc}</div>
              </div>
            ))}
          </div>
          <div className="two-col" style={{marginTop:'32px'}}>
            {[
              {title:"✅ Built (Frontend)",color:"#22c55e",items:["React.js 18 — UI framework","React Router — navigation","Custom CSS3 — styling & animations","Google Fonts — typography","Bootstrap — utility classes"]},
              {title:"🔜 Coming (Backend)",color:"#E8650A",items:["Node.js + Express.js — APIs","PostgreSQL — database","JWT — authentication","Razorpay — payments","AWS EKS — deployment"]},
            ].map((item,i)=>(
              <div key={i} className="info-card" style={{borderColor:`${item.color}18`}}>
                <div className="ic-title" style={{color:item.color}}>{item.title}</div>
                <div className="ic-list">
                  {item.items.map((it,j)=>(
                    <div key={j} className="ic-item">
                      <span className="ic-arrow" style={{color:item.color}}>→</span>
                      <span className="ic-text">{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='next' && (
        <div className="section">
          <div className="s-eyebrow">Roadmap</div>
          <div className="s-title">What's <em>Next</em></div>
          <div className="s-sub">The complete plan to finish the platform from today till final deployment.</div>
          <div className="next-grid">
            {[
              {n:"01",t:"Finish Frontend",d:"Fix small UI issues, add navbar to all pages, loading screen.",time:"~2 days"},
              {n:"02",t:"Backend Setup",d:"Node.js + Express + PostgreSQL database setup.",time:"~1 week"},
              {n:"03",t:"Auth + Login APIs",d:"Phone OTP login, JWT tokens, user profiles.",time:"~3 days"},
              {n:"04",t:"All APIs",d:"Doctor booking, prescriptions, health records.",time:"~2 weeks"},
              {n:"05",t:"BHASHINI Integration",d:"22 Indian languages — voice input and output.",time:"~1 week"},
              {n:"06",t:"Razorpay Payments",d:"Accept payments for consultations and products.",time:"~3 days"},
              {n:"07",t:"Video Consultation",d:"WebRTC real-time video calls between patient and doctor.",time:"~1 week"},
              {n:"08",t:"Mobile App",d:"React Native Android + iOS app from same codebase.",time:"~2 weeks"},
              {n:"09",t:"Testing",d:"Unit tests, integration tests, user acceptance testing.",time:"~1 week"},
              {n:"10",t:"AWS Deployment",d:"Deploy on AWS with Docker, CI/CD pipeline, domain.",time:"~3 days"},
            ].map((s,i)=>(
              <div key={i} className="next-card">
                <div className="next-num">{s.n}</div>
                <div className="next-title">{s.t}</div>
                <div className="next-desc">{s.d}</div>
                <div className="next-time">⏱️ {s.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='timeline' && (
        <div className="section">
          <div className="s-eyebrow">Schedule</div>
          <div className="s-title">Project <em>Timeline</em></div>
          <div className="s-sub">Month by month plan from start to final deployment.</div>
          <div className="timeline">
            {[
              {type:'done',period:'Week 1-2 — Completed ✅',title:'Project Setup + Telemedicine Module',desc:'Set up React project, built the complete Telemedicine module with 5 pages and connected all navigation.',chips:['Project Setup','Home Page','Login/Signup','Doctor Listing','Booking','Dashboard'],chipType:'done'},
              {type:'done',period:'Week 3-4 — Completed ✅',title:'Ayurveda + Yoga + Wellness Modules',desc:'Built Ayurveda (Prakriti Quiz, Herbal Market, Vaidya, Panchakarma), full Yoga module and Wellness programs.',chips:['Prakriti Quiz','Herbal Market','Vaidya','Panchakarma','Yoga','Live Sessions','Wellness'],chipType:'done'},
              {type:'done',period:'Week 5-6 — Completed ✅',title:'Tourism + Recreation + Health Tools',desc:'Built Medical Tourism, Recreation, Symptom Checker, Diet Plan, BMI Calculator and Medicine Reminder.',chips:['Medical Tourism','Recreation','Symptom Checker','Diet Plan','BMI Calculator','Medicine Reminder'],chipType:'done'},
              {type:'now',period:'This Week — Current 🔥',title:'Polish + Navbar + Presentation',desc:'Adding navbar to all pages, splash screen, 404 page and Monday presentation page.',chips:['Navbar','Splash Screen','404 Page','Presentation Page'],chipType:'now'},
              {type:'future',period:'Month 2 — Upcoming',title:'Backend Development',desc:'Node.js APIs, PostgreSQL database, JWT authentication and OTP login.',chips:['Node.js','PostgreSQL','JWT Auth','OTP Login','All APIs'],chipType:'future'},
              {type:'future',period:'Month 3 — Upcoming',title:'Integration + Extra Features',desc:'BHASHINI languages, Razorpay payments, video consultation and admin panel.',chips:['BHASHINI','Razorpay','WebRTC Video','Admin Panel','Testing'],chipType:'future'},
              {type:'future',period:'Month 4 — Upcoming',title:'Mobile App + Deployment',desc:'React Native mobile app and AWS deployment.',chips:['React Native','Android App','iOS App','AWS Deploy','Go Live 🚀'],chipType:'future'},
            ].map((item,i)=>(
              <div key={i} className="tl-item">
                <div className={`tl-dot dot-${item.type}`}/>
                <div className={`tl-period period-${item.type}`}>{item.period}</div>
                <div className="tl-title">{item.title}</div>
                <div className="tl-desc">{item.desc}</div>
                <div className="tl-chips">
                  {item.chips.map((c,j)=>(
                    <span key={j} className={`chip chip-${item.chipType}`}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pres-footer">
        <div className="pf-title">Thank You! 🙏</div>
        <p className="pf-sub">Questions? Let's discuss the project roadmap and next steps.</p>
        <div className="pf-logo">Ārogya<span>Med</span></div>
        <div className="pf-tagline">Ancient Wisdom · Modern Technology · Built with React.js</div>
      </div>
    </div>
  );
}