import { useState } from 'react';

const programs = [
  { id: 1, name: "7-Day Detox Retreat", emoji: "🌿", duration: "7 days", price: 15000, category: "Detox", color: "#2D6A4F", desc: "Complete body detoxification with Ayurvedic diet, herbs and therapies.", includes: ["Daily Panchakarma", "Ayurvedic Meals", "Yoga Sessions", "Meditation"] },
  { id: 2, name: "Stress Relief Program", emoji: "🧘", duration: "3 days", price: 8000, category: "Mental Wellness", color: "#E8650A", desc: "Deep relaxation program combining Shirodhara, meditation and pranayama.", includes: ["Shirodhara Therapy", "Meditation Classes", "Pranayama", "Herbal Teas"] },
  { id: 3, name: "Weight Balance Program", emoji: "⚖️", duration: "14 days", price: 25000, category: "Weight", color: "#C9973A", desc: "Personalized Ayurvedic weight management with diet and lifestyle changes.", includes: ["Diet Planning", "Daily Yoga", "Herbal Medicines", "Weekly Checkups"] },
  { id: 4, name: "Mental Wellness Retreat", emoji: "🌸", duration: "5 days", price: 12000, category: "Mental Wellness", color: "#1A3C2E", desc: "Heal your mind with ancient Ayurvedic therapies for anxiety and depression.", includes: ["Brahmi Therapy", "Sound Healing", "Nature Walks", "Counseling"] },
  { id: 5, name: "Sleep Restoration", emoji: "🌙", duration: "3 days", price: 7000, category: "Sleep", color: "#FF6B35", desc: "Fix your sleep naturally with Ayurvedic treatments and lifestyle changes.", includes: ["Abhyanga Massage", "Sleep Herbs", "Evening Yoga", "Dietary Guide"] },
  { id: 6, name: "Immunity Booster", emoji: "🛡️", duration: "7 days", price: 10000, category: "Immunity", color: "#F7931E", desc: "Strengthen your immune system with powerful Ayurvedic herbs and treatments.", includes: ["Rasayana Therapy", "Herbal Supplements", "Yoga", "Diet Plan"] },
];

const categories = ["All", "Detox", "Mental Wellness", "Weight", "Sleep", "Immunity"];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
  .page{min-height:100vh;background:#0A0A0A;font-family:'Poppins',sans-serif}
  .hero{background:linear-gradient(135deg,#0F1F23,#1A3C2E 60%,#0F2E23);padding:80px 60px 100px;position:relative;overflow:hidden}
  .hero::before{content:'❤️';position:absolute;right:40px;top:0;font-size:280px;opacity:.04;animation:float 8s ease-in-out infinite}
  .hero::after{content:'';position:absolute;bottom:-60px;left:0;right:0;height:120px;background:#0A0A0A;clip-path:ellipse(55% 100% at 50% 100%)}
  .hero-tag{display:inline-flex;gap:8px;background:rgba(201,151,58,.15);border:1px solid rgba(201,151,58,.3);color:#C9973A;padding:8px 18px;border-radius:30px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:24px}
  .hero-title{font-family:'Playfair Display',serif;font-size:60px;font-weight:900;color:#FDF6EC;line-height:1.1;margin-bottom:20px}
  .hero-title span{color:#C9973A;display:block}
  .hero-sub{color:rgba(253,246,236,.5);font-size:17px;max-width:520px;font-weight:300;margin-bottom:40px}
  .hero-btns{display:flex;gap:14px}
  .btn-p{background:#E8650A;color:#fff;border:none;padding:15px 32px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .2s}
  .btn-p:hover{background:#D05508;transform:translateY(-2px)}
  .main{padding:60px}
  .section-tag{color:#E8650A;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px}
  .section-title{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#FDF6EC;margin-bottom:8px}
  .section-sub{color:rgba(255,255,255,.25);font-size:14px;margin-bottom:32px}
  .filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:32px}
  .filter{padding:8px 18px;border-radius:30px;border:1px solid rgba(255,255,255,.08);background:transparent;color:rgba(255,255,255,.35);font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Poppins',sans-serif}
  .filter.active{background:#E8650A;color:#fff;border-color:#E8650A}
  .filter:hover:not(.active){border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.7)}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px}
  .card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:20px;overflow:hidden;transition:all .35s;animation:slideUp .6s ease-out}
  .card:hover{transform:translateY(-6px);border-color:rgba(255,255,255,.12);box-shadow:0 24px 60px rgba(0,0,0,.5)}
  .card-top{height:140px;display:flex;align-items:center;justify-content:center;font-size:64px;position:relative}
  .card-emoji{animation:float 4s ease-in-out infinite;position:relative;z-index:1}
  .card-dur{position:absolute;top:12px;right:12px;background:rgba(0,0,0,.5);color:rgba(255,255,255,.7);padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600}
  .card-body{padding:22px}
  .card-cat{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px}
  .card-name{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#FDF6EC;margin-bottom:8px}
  .card-desc{color:rgba(255,255,255,.3);font-size:13px;line-height:1.6;margin-bottom:14px}
  .includes{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}
  .inc{padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600}
  .card-footer{display:flex;justify-content:space-between;align-items:center}
  .price{font-family:'Playfair Display',serif;font-size:22px;font-weight:900}
  .book-btn{padding:10px 20px;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .2s;color:#fff}
  .book-btn:hover{transform:translateY(-2px);opacity:.9}
  .success-overlay{position:fixed;inset:0;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;z-index:1000;animation:fadeIn .3s;backdrop-filter:blur(10px)}
  .success-card{background:#111;border:1px solid rgba(255,255,255,.08);border-radius:28px;padding:60px 48px;text-align:center;max-width:420px;width:90%;animation:slideUp .5s ease-out}
  .success-icon{font-size:80px;margin-bottom:24px;display:block;animation:pulse 2s ease-in-out infinite}
  .success-title{font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:#FDF6EC;margin-bottom:12px}
  .success-desc{color:rgba(255,255,255,.4);font-size:15px;line-height:1.7;margin-bottom:32px}
  .success-btn{background:#E8650A;color:#fff;border:none;padding:16px 40px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif}
  @media(max-width:768px){.hero{padding:50px 24px 80px}.hero-title{font-size:36px}.main{padding:32px 24px}.grid{grid-template-columns:1fr}}
`;

function Wellness() {
  const [cat, setCat] = useState('All');
  const [booked, setBooked] = useState(null);
  const filtered = programs.filter(p => cat === 'All' || p.category === cat);

  return (
    <div className="page">
      <style>{CSS}</style>
      {booked && (
        <div className="success-overlay">
          <div className="success-card">
            <span className="success-icon">🎉</span>
            <div className="success-title">Program Booked!</div>
            <p className="success-desc">Your <strong>{booked.name}</strong> program has been confirmed. Our team will contact you shortly!</p>
            <button className="success-btn" onClick={() => setBooked(null)}>Done ✓</button>
          </div>
        </div>
      )}
      <div className="hero">
        <div className="hero-tag">❤️ Wellness Programs</div>
        <h1 className="hero-title">Health &<span>Wellness</span></h1>
        <p className="hero-sub">Holistic wellness programs combining ancient Ayurvedic wisdom with modern therapeutic practices</p>
        <div className="hero-btns">
          <button className="btn-p">Browse Programs</button>
        </div>
      </div>
      <div className="main">
        <div className="section-tag">Programs</div>
        <div className="section-title">Choose Your Wellness Path</div>
        <div className="section-sub">Select a program that fits your health goals</div>
        <div className="filters">
          {categories.map(c => (
            <button key={c} className={`filter ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="grid">
          {filtered.map(p => (
            <div key={p.id} className="card">
              <div className="card-top" style={{ background: `${p.color}18` }}>
                <span className="card-emoji">{p.emoji}</span>
                <span className="card-dur">⏱️ {p.duration}</span>
              </div>
              <div className="card-body">
                <div className="card-cat" style={{ color: p.color }}>{p.category}</div>
                <div className="card-name">{p.name}</div>
                <div className="card-desc">{p.desc}</div>
                <div className="includes">
                  {p.includes.map((inc, i) => (
                    <span key={i} className="inc" style={{ background: `${p.color}15`, color: p.color }}>✓ {inc}</span>
                  ))}
                </div>
                <div className="card-footer">
                  <div className="price" style={{ color: p.color }}>₹{p.price.toLocaleString()}</div>
                  <button className="book-btn" style={{ background: p.color }} onClick={() => setBooked(p)}>Book Program</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wellness;