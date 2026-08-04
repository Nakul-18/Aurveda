import Navbar from '../components/Navbar';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#0A0A0A}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes breathe{0%,100%{opacity:.1;transform:scale(1)}50%{opacity:.25;transform:scale(1.1)}}
.nf-page{min-height:100vh;background:#0A0A0A;display:flex;align-items:center;justify-content:center;padding:100px 24px;position:relative;overflow:hidden}
.nf-glow{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(232,101,10,.08) 0%,transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);animation:breathe 6s ease-in-out infinite;pointer-events:none}
.nf-wrap{text-align:center;position:relative;z-index:1;animation:up .8s ease-out}
.nf-emoji{font-size:100px;display:block;margin-bottom:24px;animation:float 4s ease-in-out infinite}
.nf-code{font-family:'Playfair Display',serif;font-size:120px;font-weight:900;color:rgba(201,151,58,.15);line-height:1;margin-bottom:8px}
.nf-title{font-family:'Playfair Display',serif;font-size:40px;font-weight:900;color:#FDF6EC;margin-bottom:16px}
.nf-sub{color:rgba(255,255,255,.35);font-size:16px;max-width:420px;margin:0 auto 48px;line-height:1.7;font-weight:300}
.nf-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.nf-btn-p{background:#E8650A;color:#fff;border:none;padding:14px 32px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.nf-btn-p:hover{background:#D05508;transform:translateY(-2px)}
.nf-btn-o{background:transparent;color:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.1);padding:14px 32px;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.nf-btn-o:hover{border-color:rgba(255,255,255,.3);color:#fff}
.nf-links{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:48px}
.nf-link{padding:8px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:20px;color:rgba(255,255,255,.35);font-size:12px;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif}
.nf-link:hover{background:rgba(232,101,10,.1);color:#E8650A;border-color:rgba(232,101,10,.3)}
`;

export default function NotFound() {
  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="nf-page">
        <div className="nf-glow"/>
        <div className="nf-wrap">
          <span className="nf-emoji">🌿</span>
          <div className="nf-code">404</div>
          <div className="nf-title">Page Not Found</div>
          <p className="nf-sub">The page you're looking for doesn't exist or has been moved. Let's get you back on your wellness journey.</p>
          <div className="nf-btns">
            <button className="nf-btn-p" onClick={() => window.location.href = '/'}>🏠 Go Home</button>
            <button className="nf-btn-o" onClick={() => window.history.back()}>← Go Back</button>
          </div>
          <div className="nf-links">
            {[
              {label:'🩺 Doctors',url:'/doctors'},
              {label:'🌿 Ayurveda',url:'/prakriti-quiz'},
              {label:'🧘 Yoga',url:'/yoga'},
              {label:'🔍 Symptoms',url:'/symptom-checker'},
              {label:'🛒 Shop',url:'/herbal-market'},
              {label:'📊 Dashboard',url:'/dashboard'},
            ].map((l,i)=>(
              <button key={i} className="nf-link" onClick={()=>window.location.href=l.url}>{l.label}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}