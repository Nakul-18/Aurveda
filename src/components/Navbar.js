import { useState } from 'react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
.navbar{position:fixed;top:0;left:0;right:0;z-index:9999;display:flex;justify-content:space-between;align-items:center;padding:16px 60px;background:rgba(10,10,10,.92);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.06);font-family:'Inter',sans-serif}
.nav-logo{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:#FDF6EC;cursor:pointer;text-decoration:none;letter-spacing:-.5px}
.nav-logo span{color:#C9973A}
.nav-links{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.nav-a{color:rgba(255,255,255,.4);text-decoration:none;font-size:12px;font-weight:500;transition:all .2s;padding:6px 10px;border-radius:6px}
.nav-a:hover{color:#fff;background:rgba(255,255,255,.05)}
.nav-cta{background:#E8650A;color:#fff;border:none;padding:9px 20px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s;margin-left:6px}
.nav-cta:hover{background:#D05508;transform:translateY(-1px)}
.ham{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:none;border:none}
.ham span{display:block;width:22px;height:2px;background:rgba(255,255,255,.6);border-radius:2px}
.mob-menu{display:none;position:fixed;top:58px;left:0;right:0;background:rgba(10,10,10,.98);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.06);padding:20px 24px;flex-direction:column;gap:4px;z-index:9998}
.mob-menu.open{display:flex}
.mob-a{color:rgba(255,255,255,.5);text-decoration:none;font-size:14px;font-weight:500;padding:12px 16px;border-radius:8px;transition:all .2s}
.mob-a:hover{background:rgba(255,255,255,.06);color:#fff}
.mob-cta{background:#E8650A;color:#fff;border:none;padding:12px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;margin-top:8px;width:100%}
@media(max-width:768px){.navbar{padding:14px 24px}.nav-links{display:none}.ham{display:flex}}
`;

const links = [
  {label:'Home',url:'/'},
  {label:'Doctors',url:'/doctors'},
  {label:'Ayurveda',url:'/prakriti-quiz'},
  {label:'Yoga',url:'/yoga'},
  {label:'Wellness',url:'/wellness'},
  {label:'Tourism',url:'/medical-tourism'},
  {label:'Shop',url:'/herbal-market'},
  {label:'Symptoms',url:'/symptom-checker'},
  {label:'Dashboard',url:'/dashboard'},
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const current = window.location.pathname;

  return (
    <>
      <style>{css}</style>
      <nav className="navbar">
        <a className="nav-logo" href="/">Ārogya<span>Med</span></a>
        <div className="nav-links">
          {links.map((l,i)=>(
            <a key={i} className="nav-a" href={l.url} style={current===l.url?{color:'#E8650A'}:{}}>{l.label}</a>
          ))}
          <button className="nav-cta" onClick={()=>window.location.href='/login'}>Get Started</button>
        </div>
        <button className="ham" onClick={()=>setOpen(!open)}>
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`mob-menu ${open?'open':''}`}>
        {links.map((l,i)=>(
          <a key={i} className="mob-a" href={l.url} onClick={()=>setOpen(false)}>{l.label}</a>
        ))}
        <button className="mob-cta" onClick={()=>window.location.href='/login'}>Get Started</button>
      </div>
    </>
  );
}