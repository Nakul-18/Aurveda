import { useState } from 'react';

const vaidyas = [
  { id: 1, name: "Vaidya Rajesh Sharma", spec: "Panchakarma Expert", exp: "20 years", lang: ["Hindi", "English"], dosha: "Vata", fee: 600, rating: 4.9, reviews: 445, emoji: "👨‍⚕️", available: true, desc: "Specialist in traditional Panchakarma therapies and Vata disorders" },
  { id: 2, name: "Vaidya Priya Nair", spec: "Ayurvedic Physician", exp: "12 years", lang: ["Malayalam", "English"], dosha: "Pitta", fee: 500, rating: 4.8, reviews: 312, emoji: "👩‍⚕️", available: true, desc: "Expert in Pitta disorders, skin diseases and digestive health" },
  { id: 3, name: "Vaidya Meera Iyer", spec: "Rasayana Therapy", exp: "15 years", lang: ["Tamil", "Hindi"], dosha: "Kapha", fee: 550, rating: 4.9, reviews: 389, emoji: "👩‍⚕️", available: false, desc: "Specializes in Rasayana rejuvenation and Kapha disorders" },
  { id: 4, name: "Vaidya Arjun Joshi", spec: "Herbal Medicine", exp: "18 years", lang: ["Marathi", "Hindi"], dosha: "Vata", fee: 700, rating: 4.7, reviews: 278, emoji: "👨‍⚕️", available: true, desc: "Expert in classical Ayurvedic formulations and herbal treatments" },
  { id: 5, name: "Vaidya Lakshmi Devi", spec: "Women's Health", exp: "10 years", lang: ["Telugu", "English"], dosha: "Pitta", fee: 450, rating: 4.8, reviews: 234, emoji: "👩‍⚕️", available: true, desc: "Specialist in women's health, fertility and hormonal balance" },
  { id: 6, name: "Vaidya Suresh Kumar", spec: "Nadi Pariksha", exp: "25 years", lang: ["Kannada", "Hindi"], dosha: "Kapha", fee: 800, rating: 5.0, reviews: 512, emoji: "👨‍⚕️", available: false, desc: "Master of Nadi Pariksha pulse diagnosis and holistic healing" },
];

const specs = ["All", "Panchakarma Expert", "Ayurvedic Physician", "Rasayana Therapy", "Herbal Medicine", "Women's Health", "Nadi Pariksha"];
const doshas = ["All Doshas", "Vata", "Pitta", "Kapha"];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

  .vaidya-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; }

  .vaidya-hero { background: linear-gradient(135deg, #0F1F23 0%, #1A3C2E 60%, #0F2E23 100%); padding: 80px 60px 100px; position: relative; overflow: hidden; }
  .vaidya-hero::before { content: '🕉️'; position: absolute; right: 40px; top: 0; font-size: 280px; opacity: 0.04; animation: float 8s ease-in-out infinite; }
  .vaidya-hero::after { content: ''; position: absolute; bottom: -60px; left: 0; right: 0; height: 120px; background: #0A0A0A; clip-path: ellipse(55% 100% at 50% 100%); }

  .hero-tag { display: inline-flex; gap: 8px; background: rgba(201,151,58,0.15); border: 1px solid rgba(201,151,58,0.3); color: #C9973A; padding: 8px 18px; border-radius: 30px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: 64px; font-weight: 900; color: #FDF6EC; line-height: 1.1; margin-bottom: 20px; }
  .hero-title span { color: #C9973A; display: block; }
  .hero-sub { color: rgba(253,246,236,0.5); font-size: 18px; line-height: 1.7; max-width: 520px; font-weight: 300; margin-bottom: 40px; }

  .search-row { display: flex; gap: 12px; max-width: 600px; }
  .search-input { flex: 1; padding: 16px 20px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; font-size: 15px; color: #FDF6EC; outline: none; font-family: 'Poppins', sans-serif; }
  .search-input::placeholder { color: rgba(255,255,255,0.25); }
  .search-input:focus { border-color: #E8650A; }

  .filters-section { background: #111; padding: 24px 60px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .filter-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; align-items: center; }
  .filter-label { color: rgba(255,255,255,0.25); font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-right: 4px; }
  .filter-pill { padding: 7px 16px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: rgba(255,255,255,0.35); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .filter-pill.active { background: #E8650A; color: white; border-color: #E8650A; }
  .filter-pill:hover:not(.active) { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); }
  .avail-check { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.4); font-size: 13px; cursor: pointer; margin-left: auto; }

  .vaidyas-main { padding: 48px 60px; }
  .vaidyas-count { color: rgba(255,255,255,0.25); font-size: 14px; margin-bottom: 28px; }
  .vaidyas-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }

  .vaidya-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; overflow: hidden; transition: all 0.35s; animation: slideUp 0.6s ease-out; }
  .vaidya-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.12); box-shadow: 0 30px 60px rgba(0,0,0,0.5); }

  .card-top { background: linear-gradient(135deg, #1A3C2E, #2D6A4F); padding: 28px; display: flex; gap: 16px; }
  .v-emoji { font-size: 52px; }
  .v-info { flex: 1; }
  .v-name { font-family: 'Playfair Display', serif; font-size: 18px; color: #FDF6EC; font-weight: 700; margin-bottom: 4px; }
  .v-spec { color: #C9973A; font-size: 13px; font-weight: 500; margin-bottom: 8px; }
  .v-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .s-on { background: rgba(34,197,94,0.15); color: #22c55e; }
  .s-off { background: rgba(239,68,68,0.15); color: #ef4444; }

  .card-body { padding: 22px; }
  .v-desc { color: rgba(255,255,255,0.3); font-size: 13px; line-height: 1.6; margin-bottom: 16px; }
  .v-details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .detail-box { background: #0A0A0A; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.04); }
  .d-label { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
  .d-value { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7); }

  .lang-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .lang-tag { background: rgba(45,106,79,0.15); color: rgba(45,106,79,0.9); padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; border: 1px solid rgba(45,106,79,0.2); }

  .book-btn { width: 100%; padding: 13px; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .btn-avail { background: #E8650A; color: white; }
  .btn-avail:hover { background: #D05508; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(232,101,10,0.3); }
  .btn-unavail { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.2); cursor: not-allowed; border: 1px solid rgba(255,255,255,0.06); }

  @media (max-width: 768px) {
    .vaidya-hero { padding: 50px 24px 80px; }
    .hero-title { font-size: 40px; }
    .filters-section { padding: 20px 24px; }
    .vaidyas-main { padding: 32px 24px; }
    .vaidyas-grid { grid-template-columns: 1fr; }
  }
`;

function Vaidya() {
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [selectedDosha, setSelectedDosha] = useState('All Doshas');
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = vaidyas.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.spec.toLowerCase().includes(search.toLowerCase());
    const matchSpec = selectedSpec === 'All' || v.spec === selectedSpec;
    const matchDosha = selectedDosha === 'All Doshas' || v.dosha === selectedDosha;
    const matchAvail = availableOnly ? v.available : true;
    return matchSearch && matchSpec && matchDosha && matchAvail;
  });

  return (
    <div className="vaidya-page">
      <style>{CSS}</style>

      <div className="vaidya-hero">
        <div className="hero-tag">🕉️ Ayurvedic Experts</div>
        <h1 className="hero-title">Find Your<span>Vaidya</span></h1>
        <p className="hero-sub">Connect with certified Ayurvedic practitioners for holistic healing</p>
        <div className="search-row">
          <input className="search-input" type="text" placeholder="🔍 Search by name or specialization..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-row">
          <span className="filter-label">Specialization:</span>
          {specs.map(spec => (
            <button key={spec} className={`filter-pill ${selectedSpec === spec ? 'active' : ''}`} onClick={() => setSelectedSpec(spec)}>{spec}</button>
          ))}
        </div>
        <div className="filter-row">
          <span className="filter-label">Dosha:</span>
          {doshas.map(d => (
            <button key={d} className={`filter-pill ${selectedDosha === d ? 'active' : ''}`} onClick={() => setSelectedDosha(d)}>{d}</button>
          ))}
          <label className="avail-check">
            <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} />
            Available Only
          </label>
        </div>
      </div>

      <div className="vaidyas-main">
        <div className="vaidyas-count">Showing {filtered.length} Vaidyas</div>
        <div className="vaidyas-grid">
          {filtered.map(v => (
            <div key={v.id} className="vaidya-card">
              <div className="card-top">
                <div className="v-emoji">{v.emoji}</div>
                <div className="v-info">
                  <div className="v-name">{v.name}</div>
                  <div className="v-spec">{v.spec}</div>
                  <span className={`v-status ${v.available ? 's-on' : 's-off'}`}>{v.available ? '🟢 Available' : '🔴 Unavailable'}</span>
                </div>
              </div>
              <div className="card-body">
                <p className="v-desc">{v.desc}</p>
                <div className="v-details">
                  {[
                    { label: 'Experience', value: v.exp },
                    { label: 'Fee', value: `₹${v.fee}` },
                    { label: 'Rating', value: `⭐ ${v.rating} (${v.reviews})` },
                    { label: 'Dosha', value: v.dosha },
                  ].map((item, i) => (
                    <div key={i} className="detail-box">
                      <div className="d-label">{item.label}</div>
                      <div className="d-value">{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className="lang-tags">
                  {v.lang.map((l, i) => <span key={i} className="lang-tag">🗣️ {l}</span>)}
                </div>
                <button className={`book-btn ${v.available ? 'btn-avail' : 'btn-unavail'}`} onClick={() => v.available && (window.location.href='/booking')}>
                  {v.available ? '📅 Book Consultation' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vaidya;