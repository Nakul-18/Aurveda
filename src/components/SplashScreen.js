import { useEffect, useState } from 'react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeOut{from{opacity:1}to{opacity:0}}
@keyframes scaleIn{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fillBar{from{width:0}to{width:100%}}
@keyframes breathe{0%,100%{opacity:.1;transform:scale(1)}50%{opacity:.2;transform:scale(1.15)}}
.splash{position:fixed;inset:0;background:#0A0A0A;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:'Inter',sans-serif;transition:opacity .6s ease-out}
.splash.hiding{opacity:0;pointer-events:none}
.splash-glow1{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(45,106,79,.15) 0%,transparent 65%);top:-100px;right:-100px;animation:breathe 6s ease-in-out infinite;pointer-events:none}
.splash-glow2{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(232,101,10,.08) 0%,transparent 65%);bottom:-80px;left:-80px;animation:breathe 8s ease-in-out infinite reverse;pointer-events:none}
.splash-wrap{text-align:center;position:relative;z-index:1}
.splash-ring{width:120px;height:120px;border-radius:50%;border:1px solid rgba(201,151,58,.15);display:flex;align-items:center;justify-content:center;margin:0 auto 32px;position:relative;animation:scaleIn .6s ease-out}
.splash-ring::before{content:'';position:absolute;inset:-8px;border-radius:50%;border:1px dashed rgba(45,106,79,.12);animation:spin 20s linear infinite}
.splash-ring::after{content:'';position:absolute;inset:-16px;border-radius:50%;border:1px solid rgba(232,101,10,.06);animation:spin 30s linear infinite reverse}
.splash-emoji{font-size:52px;animation:float 3s ease-in-out infinite}
.splash-logo{font-family:'Playfair Display',serif;font-size:36px;font-weight:900;color:#FDF6EC;margin-bottom:8px;animation:slideUp .6s ease-out .2s backwards}
.splash-logo span{color:#C9973A}
.splash-tagline{color:rgba(255,255,255,.3);font-size:13px;letter-spacing:2px;text-transform:uppercase;margin-bottom:48px;animation:slideUp .6s ease-out .3s backwards}
.splash-bar-wrap{width:240px;margin:0 auto 16px;animation:slideUp .6s ease-out .4s backwards}
.splash-bar-track{height:2px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden}
.splash-bar-fill{height:100%;background:linear-gradient(90deg,#E8650A,#C9973A);border-radius:2px;transition:width .1s linear}
.splash-percent{color:rgba(255,255,255,.2);font-size:11px;text-align:right;margin-top:8px;animation:slideUp .6s ease-out .4s backwards}
.splash-status{color:rgba(255,255,255,.2);font-size:12px;letter-spacing:1px;animation:slideUp .6s ease-out .5s backwards;margin-top:8px}
`;

const steps = [
  'Loading Ayurvedic wisdom...',
  'Connecting with Vaidyas...',
  'Preparing your wellness journey...',
  'Almost ready...',
];

export default function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1.2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHiding(true);
            setTimeout(onDone, 600);
          }, 400);
          return 100;
        }
        setStep(Math.floor((next / 100) * steps.length));
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <>
      <style>{css}</style>
      <div className={`splash ${hiding ? 'hiding' : ''}`}>
        <div className="splash-glow1"/>
        <div className="splash-glow2"/>
        <div className="splash-wrap">
          <div className="splash-ring">
            <span className="splash-emoji">🌿</span>
          </div>
          <div className="splash-logo">Ārogya<span>Med</span></div>
          <div className="splash-tagline">Ancient Wisdom · Modern Care</div>
          <div className="splash-bar-wrap">
            <div className="splash-bar-track">
              <div className="splash-bar-fill" style={{width:`${progress}%`}}/>
            </div>
            <div className="splash-percent">{Math.round(progress)}%</div>
          </div>
          <div className="splash-status">{steps[Math.min(step, steps.length - 1)]}</div>
        </div>
      </div>
    </>
  );
}