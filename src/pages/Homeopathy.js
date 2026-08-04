import { useState } from 'react';

const doctors = [
  { id:1, name:"Dr. Anand Mehta", spec:"Classical Homeopathy", exp:"15 years", lang:"Hindi, English", fee:400, rating:4.9, reviews:312, emoji:"👨‍⚕️", available:true, desc:"Expert in constitutional homeopathy for chronic diseases and mental health." },
  { id:2, name:"Dr. Sunita Patil", spec:"Pediatric Homeopathy", exp:"10 years", lang:"Marathi, Hindi", fee:350, rating:4.8, reviews:245, emoji:"👩‍⚕️", available:true, desc:"Specialist in children's health using safe homeopathic remedies." },
  { id:3, name:"Dr. Rajan Shah", spec:"Skin & Allergy", exp:"12 years", lang:"Gujarati, English", fee:450, rating:4.7, reviews:198, emoji:"👨‍⚕️", available:false, desc:"Expert in skin disorders, allergies and autoimmune conditions." },
  { id:4, name:"Dr. Priya Desai", spec:"Mental Health", exp:"8 years", lang:"Hindi, English", fee:500, rating:4.9, reviews:167, emoji:"👩‍⚕️", available:true, desc:"Specialist in anxiety, depression and stress using homeopathic treatment." },
  { id:5, name:"Dr. Vikash Jain", spec:"Joint & Bone", exp:"18 years", lang:"Hindi, English", fee:550, rating:4.8, reviews:289, emoji:"👨‍⚕️", available:true, desc:"Expert in arthritis, joint pain and musculoskeletal disorders." },
  { id:6, name:"Dr. Kavita Rao", spec:"Women's Health", exp:"14 years", lang:"Kannada, English", fee:400, rating:4.9, reviews:334, emoji:"👩‍⚕️", available:false, desc:"Specialist in PCOS, hormonal issues and women's wellness." },
];

const remedies = [
  { name:"Arnica Montana", uses:"Bruises, trauma, muscle soreness", potency:"30C, 200C", emoji:"🌼" },
  { name:"Belladonna", uses:"Fever, inflammation, headache", potency:"30C", emoji:"🌺" },
  { name:"Nux Vomica", uses:"Digestive issues, stress, insomnia", potency:"30C, 200C", emoji:"🌿" },
  { name:"Pulsatilla", uses:"Women's health, sinusitis, mood swings", potency:"30C", emoji:"🌸" },
  { name:"Rhus Tox", uses:"Joint pain, skin rashes, stiffness", potency:"30C, 200C", emoji:"🍃" },
  { name:"Sulphur", uses:"Skin conditions, chronic diseases", potency:"30C, 200C", emoji:"⚗️" },
];

const specs = ["All","Classical Homeopathy","Pediatric Homeopathy","Skin & Allergy","Mental Health","Joint & Bone","Women's Health"];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
.page{min-height:100vh;background:#0A0A0A;font-family:'Poppins',sans-serif}
.hero{background:linear-gradient(135deg,#0F1F23,#1a2a3e 60%,#0F1F2E);padding:80px 60px 100px;position:relative;overflow:hidden}
.hero::before{content:'💊';position:absolute;right:40px;top:0;font-size:280px;opacity:.04;animation:float 8s ease-in-out infinite}
.hero::after{content:'';position:absolute;bottom:-60px;left:0;right:0;height:120px;background:#0A0A0A;clip-path:ellipse(55% 100% at 50% 100%)}
.hero-tag{display:inline-flex;gap:8px;background:rgba(100,149,237,.15);border:1px solid rgba(100,149,237,.3);color:#6495ED;padding:8px 18px;border-radius:30px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:24px}
.hero-title{font-family:'Playfair Display',serif;font-size:60px;font-weight:900;color:#FDF6EC;line-height:1.1;margin-bottom:20px}
.hero-title span{color:#6495ED;display:block}
.hero-sub{color:rgba(253,246,236,.5);font-size:17px;max-width:520px;font-weight:300;margin-bottom:40px}
.hero-stats{display:flex;gap:48px;flex-wrap:wrap}
.stat-num{font-family:'Playfair Display',serif;font-size:36px;font-weight:900;color:#6495ED}
.stat-label{color:rgba(255,255,255,.3);font-size:12px;margin-top:4px}
.main{padding:60px}
.section-tag{color:#6495ED;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px}
.section-title{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#FDF6EC;margin-bottom:8px}
.section-sub{color:rgba(255,255,255,.25);font-size:14px;margin-bottom:32px}
.filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:32px}
.filter{padding:8px 18px;border-radius:30px;border:1px solid rgba(255,255,255,.08);background:transparent;color:rgba(255,255,255,.35);font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Poppins',sans-serif}
.filter.active{background:#6495ED;color:#fff;border-color:#6495ED}
.filter:hover:not(.active){border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.7)}
.search-input{width:100%;max-width:500px;padding:14px 18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;font-size:14px;color:#FDF6EC;outline:none;font-family:'Poppins',sans-serif;margin-bottom:24px}
.search-input::placeholder{color:rgba(255,255,255,.25)}
.search-input:focus{border-color:#6495ED}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;margin-bottom:60px}
.card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:20px;overflow:hidden;transition:all .35s;animation:slideUp .6s ease-out}
.card:hover{transform:translateY(-6px);border-color:rgba(255,255,255,.12);box-shadow:0 24px 60px rgba(0,0,0,.5)}
.card-top{background:linear-gradient(135deg,#1a2a3e,#2a3a5e);padding:28px;display:flex;gap:16px}
.doc-emoji{font-size:52px}
.doc-info{flex:1}
.doc-name{font-family:'Playfair Display',serif;font-size:18px;color:#FDF6EC;font-weight:700;margin-bottom:4px}
.doc-spec{color:#6495ED;font-size:13px;font-weight:500;margin-bottom:8px}
.doc-status{display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700}
.s-on{background:rgba(34,197,94,.15);color:#22c55e}
.s-off{background:rgba(239,68,68,.15);color:#ef4444}
.card-body{padding:22px}
.doc-desc{color:rgba(255,255,255,.3);font-size:13px;line-height:1.6;margin-bottom:16px}
.details-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
.detail-box{background:#0A0A0A;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.04)}
.d-label{font-size:10px;font-weight:700;color:rgba(255,255,255,.2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px}
.d-value{font-size:13px;font-weight:600;color:rgba(255,255,255,.7)}
.book-btn{width:100%;padding:13px;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .2s}
.btn-avail{background:#6495ED;color:#fff}
.btn-avail:hover{background:#4a7bd4;transform:translateY(-2px)}
.btn-unavail{background:rgba(255,255,255,.04);color:rgba(255,255,255,.2);cursor:not-allowed}
.remedies-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:60px}
.remedy-card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:24px;transition:all .3s;animation:slideUp .6s ease-out}
.remedy-card:hover{transform:translateY(-4px);border-color:rgba(100,149,237,.3)}
.remedy-emoji{font-size:36px;margin-bottom:12px;display:block}
.remedy-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#FDF6EC;margin-bottom:6px}
.remedy-uses{color:rgba(255,255,255,.4);font-size:13px;line-height:1.6;margin-bottom:10px}
.remedy-potency{color:#6495ED;font-size:12px;font-weight:600}
.success-overlay{position:fixed;inset:0;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;z-index:1000;animation:fadeIn .3s;backdrop-filter:blur(10px)}
.success-card{background:#111;border:1px solid rgba(255,255,255,.08);border-radius:28px;padding:60px 48px;text-align:center;max-width:420px;width:90%;animation:slideUp .5s ease-out}
.success-icon{font-size:80px;margin-bottom:24px;display:block;animation:pulse 2s ease-in-out infinite}
.success-title{font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:#FDF6EC;margin-bottom:12px}
.success-desc{color:rgba(255,255,255,.4);font-size:15px;line-height:1.7;margin-bottom:32px}
.success-btn{background:#6495ED;color:#fff;border:none;padding:16px 40px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif}
@media(max-width:768px){.hero{padding:50px 24px 80px}.hero-title{font-size:36px}.main{padding:32px 24px}.grid{grid-template-columns:1fr}.remedies-grid{grid-template-columns:1fr}}
`;

export default function Homeopathy() {
  const [spec, setSpec] = useState('All');
  const [search, setSearch] = useState('');
  const [booked, setBooked] = useState(null);

  const filtered = doctors.filter(d => {
    const matchSpec = spec === 'All' || d.spec === spec;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.spec.toLowerCase().includes(search.toLowerCase());
    return matchSpec && matchSearch;
  });

  return (
    <div className="page">
      <style>{CSS}</style>
      {booked && (
        <div className="success-overlay">
          <div className="success-card">
            <span className="success-icon">💊</span>
            <div className="success-title">Consultation Booked!</div>
            <p className="success-desc">Your appointment with <strong>{booked.name}</strong> has been confirmed!</p>
            <button className="success-btn" onClick={() => setBooked(null)}>Done ✓</button>
          </div>
        </div>
      )}

      <div className="hero">
        <div className="hero-tag">💊 Homeopathy</div>
        <h1 className="hero-title">Heal with<span>Homeopathy</span></h1>
        <p className="hero-sub">Connect with certified Homeopathic doctors for safe, natural and holistic healing for all age groups</p>
        <div className="hero-stats">
          {[["200+","Homeopaths"],["50K+","Patients"],["500+","Remedies"],["4.8⭐","Rating"]].map(([n,l],i)=>(
            <div key={i}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
          ))}
        </div>
      </div>

      <div className="main">
        <div className="section-tag">Find Doctor</div>
        <div className="section-title">Our Homeopathic Doctors</div>
        <div className="section-sub">Certified homeopaths with expertise in classical and modern homeopathy</div>
        <input className="search-input" type="text" placeholder="🔍 Search by name or specialization..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className="filters">
          {specs.map(s => (
            <button key={s} className={`filter ${spec === s ? 'active' : ''}`} onClick={() => setSpec(s)}>{s}</button>
          ))}
        </div>
        <div className="grid">
          {filtered.map(doc => (
            <div key={doc.id} className="card">
              <div className="card-top">
                <div className="doc-emoji">{doc.emoji}</div>
                <div className="doc-info">
                  <div className="doc-name">{doc.name}</div>
                  <div className="doc-spec">{doc.spec}</div>
                  <span className={`doc-status ${doc.available ? 's-on' : 's-off'}`}>{doc.available ? '🟢 Available' : '🔴 Unavailable'}</span>
                </div>
              </div>
              <div className="card-body">
                <div className="doc-desc">{doc.desc}</div>
                <div className="details-grid">
                  {[{label:'Experience',value:doc.exp},{label:'Languages',value:doc.lang},{label:'Rating',value:`⭐ ${doc.rating} (${doc.reviews})`},{label:'Fee',value:`₹${doc.fee}`}].map((item,i)=>(
                    <div key={i} className="detail-box"><div className="d-label">{item.label}</div><div className="d-value">{item.value}</div></div>
                  ))}
                </div>
                <button className={`book-btn ${doc.available ? 'btn-avail' : 'btn-unavail'}`} onClick={() => doc.available && setBooked(doc)}>
                  {doc.available ? '📅 Book Consultation' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="section-tag">Common Remedies</div>
        <div className="section-title">Popular Homeopathic Remedies</div>
        <div className="section-sub">Most commonly prescribed remedies in homeopathy</div>
        <div className="remedies-grid">
          {remedies.map((r,i) => (
            <div key={i} className="remedy-card">
              <span className="remedy-emoji">{r.emoji}</span>
              <div className="remedy-name">{r.name}</div>
              <div className="remedy-uses">Uses: {r.uses}</div>
              <div className="remedy-potency">Potency: {r.potency}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}