import { useState } from 'react';

const therapies = [
  { id: 1, name: "Abhyanga", emoji: "💆", duration: "60 min", price: 1500, category: "Relaxation", color: "#E8650A", desc: "Full body warm oil massage to nourish skin, relax muscles and calm the nervous system.", benefits: ["Stress relief", "Better circulation", "Nourishes skin", "Deep sleep"] },
  { id: 2, name: "Shirodhara", emoji: "🫗", duration: "45 min", price: 2000, category: "Mental Wellness", color: "#C9973A", desc: "Continuous stream of warm oil poured on forehead to calm the mind and nervous system.", benefits: ["Mental clarity", "Reduces anxiety", "Improves focus", "Deep relaxation"] },
  { id: 3, name: "Vamana", emoji: "🌿", duration: "90 min", price: 2500, category: "Detox", color: "#2D6A4F", desc: "Therapeutic emesis to eliminate Kapha toxins from the body for deep cleansing.", benefits: ["Deep detox", "Clears airways", "Boosts immunity", "Weight balance"] },
  { id: 4, name: "Virechana", emoji: "🍃", duration: "120 min", price: 3000, category: "Detox", color: "#1A3C2E", desc: "Controlled purgation therapy to eliminate Pitta toxins from the body.", benefits: ["Liver cleanse", "Skin glow", "Digestive health", "Pitta balance"] },
  { id: 5, name: "Basti", emoji: "🌊", duration: "60 min", price: 1800, category: "Vata Balance", color: "#FF6B35", desc: "Medicated enema therapy — the most powerful Panchakarma treatment for Vata disorders.", benefits: ["Vata balance", "Joint health", "Constipation relief", "Nervous system"] },
  { id: 6, name: "Nasya", emoji: "🌸", duration: "30 min", price: 1200, category: "Head & Neck", color: "#F7931E", desc: "Nasal administration of medicated oils to cleanse head, neck and sinus region.", benefits: ["Sinus relief", "Headache cure", "Mental clarity", "Better voice"] },
];

const categories = ["All", "Relaxation", "Mental Wellness", "Detox", "Vata Balance", "Head & Neck"];
const centers = [
  { id: 1, name: "ArogyaMed Wellness Center", city: "Mumbai", rating: 4.9, emoji: "🏥", beds: 12 },
  { id: 2, name: "Kerala Ayurveda Center", city: "Kerala", rating: 4.8, emoji: "🌴", beds: 20 },
  { id: 3, name: "Himalayan Healing Center", city: "Rishikesh", rating: 4.9, emoji: "🏔️", beds: 8 },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }

  .pancha-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; }

  .pancha-hero { background: linear-gradient(135deg, #0F1F23 0%, #1A3C2E 60%, #0F2E23 100%); padding: 80px 60px 100px; position: relative; overflow: hidden; }
  .pancha-hero::before { content: '🌺'; position: absolute; right: 40px; top: 0; font-size: 280px; opacity: 0.04; animation: float 8s ease-in-out infinite; }
  .pancha-hero::after { content: ''; position: absolute; bottom: -60px; left: 0; right: 0; height: 120px; background: #0A0A0A; clip-path: ellipse(55% 100% at 50% 100%); }

  .hero-tag { display: inline-flex; gap: 8px; background: rgba(201,151,58,0.15); border: 1px solid rgba(201,151,58,0.3); color: #C9973A; padding: 8px 18px; border-radius: 30px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: 64px; font-weight: 900; color: #FDF6EC; line-height: 1.1; margin-bottom: 20px; }
  .hero-title span { color: #C9973A; display: block; }
  .hero-sub { color: rgba(253,246,236,0.5); font-size: 18px; max-width: 520px; font-weight: 300; }
  .stats-row { display: flex; gap: 48px; margin-top: 40px; flex-wrap: wrap; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; color: #C9973A; }
  .stat-label { color: rgba(253,246,236,0.3); font-size: 12px; margin-top: 4px; }

  .filters-bar { background: #111; padding: 20px 60px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; gap: 10px; flex-wrap: wrap; }
  .filter-pill { padding: 8px 18px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: rgba(255,255,255,0.35); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .filter-pill.active { background: #E8650A; color: white; border-color: #E8650A; }
  .filter-pill:hover:not(.active) { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); }

  .main-content { padding: 48px 60px; display: grid; grid-template-columns: 1fr 380px; gap: 32px; }

  .therapies-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .therapy-card { background: #111; border: 2px solid rgba(255,255,255,0.06); border-radius: 20px; overflow: hidden; transition: all 0.35s; cursor: pointer; animation: slideUp 0.6s ease-out; }
  .therapy-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.5); }
  .therapy-card.selected { border-color: #E8650A; box-shadow: 0 0 0 4px rgba(232,101,10,0.1); }

  .therapy-top { height: 120px; display: flex; align-items: center; justify-content: center; position: relative; }
  .therapy-emoji { font-size: 52px; animation: float 4s ease-in-out infinite; }
  .therapy-duration { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); color: rgba(255,255,255,0.7); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }

  .therapy-body { padding: 18px; }
  .therapy-cat { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 4px; }
  .therapy-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #FDF6EC; margin-bottom: 6px; }
  .therapy-desc { color: rgba(255,255,255,0.3); font-size: 12px; line-height: 1.6; margin-bottom: 12px; }
  .benefits-wrap { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 12px; }
  .benefit-chip { padding: 3px 8px; border-radius: 20px; font-size: 10px; font-weight: 600; }
  .therapy-footer { display: flex; justify-content: space-between; align-items: center; }
  .therapy-price { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 900; }
  .select-btn { padding: 7px 14px; border: none; border-radius: 8px; font-size: 11px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; transition: all 0.2s; }

  .booking-panel { position: sticky; top: 24px; }
  .booking-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; overflow: hidden; }
  .booking-header { background: linear-gradient(135deg, #1A3C2E, #2D6A4F); padding: 24px 28px; }
  .booking-header-title { font-family: 'Playfair Display', serif; font-size: 20px; color: #FDF6EC; font-weight: 700; margin-bottom: 4px; }
  .booking-header-sub { color: rgba(253,246,236,0.5); font-size: 13px; }
  .booking-body { padding: 24px; }

  .selected-box { background: rgba(232,101,10,0.08); border: 1px solid rgba(232,101,10,0.2); border-radius: 12px; padding: 14px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
  .selected-name { font-weight: 700; color: #FDF6EC; font-size: 14px; margin-bottom: 2px; }
  .selected-price { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: #E8650A; }
  .empty-box { background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center; color: rgba(255,255,255,0.2); font-size: 13px; }

  .form-section-label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; margin-top: 18px; }
  .center-option { border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px 14px; margin-bottom: 8px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 10px; }
  .center-option:hover { border-color: rgba(255,255,255,0.2); }
  .center-option.selected { border-color: #E8650A; background: rgba(232,101,10,0.06); }
  .center-name { font-weight: 600; color: rgba(255,255,255,0.8); font-size: 13px; }
  .center-meta { color: rgba(255,255,255,0.25); font-size: 11px; }
  .center-check { color: #E8650A; font-weight: 700; margin-left: auto; }

  .input-field { width: 100%; padding: 12px 14px; background: #0A0A0A; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; font-size: 14px; color: #FDF6EC; outline: none; font-family: 'Poppins', sans-serif; transition: border-color 0.2s; margin-bottom: 10px; }
  .input-field:focus { border-color: #E8650A; }
  .input-field::placeholder { color: rgba(255,255,255,0.2); }

  .book-now-btn { width: 100%; padding: 16px; background: #E8650A; color: white; border: none; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s; font-family: 'Poppins', sans-serif; margin-top: 8px; }
  .book-now-btn:hover:not(:disabled) { background: #D05508; transform: translateY(-2px); box-shadow: 0 15px 40px rgba(232,101,10,0.3); }
  .book-now-btn:disabled { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.2); cursor: not-allowed; }

  .success-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.3s; backdrop-filter: blur(10px); }
  .success-card { background: #111; border: 1px solid rgba(255,255,255,0.08); border-radius: 28px; padding: 60px 48px; text-align: center; max-width: 440px; width: 90%; animation: slideUp 0.5s ease-out; }
  .success-icon { font-size: 80px; margin-bottom: 24px; display: block; animation: pulse 2s ease-in-out infinite; }
  .success-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 900; color: #FDF6EC; margin-bottom: 12px; }
  .success-desc { color: rgba(255,255,255,0.4); font-size: 15px; line-height: 1.7; margin-bottom: 32px; }
  .success-close { background: #E8650A; color: white; border: none; padding: 16px 40px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; }

  @media (max-width: 1024px) { .main-content { grid-template-columns: 1fr; } .booking-panel { position: static; } }
  @media (max-width: 768px) { .pancha-hero { padding: 50px 24px 80px; } .hero-title { font-size: 40px; } .filters-bar { padding: 16px 24px; } .main-content { padding: 32px 24px; } .therapies-grid { grid-template-columns: 1fr; } }
`;

function Panchakarma() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);

  const filtered = therapies.filter(t => selectedCat === 'All' || t.category === selectedCat);

  return (
    <div className="pancha-page">
      <style>{CSS}</style>

      {booked && (
        <div className="success-overlay">
          <div className="success-card">
            <span className="success-icon">🎉</span>
            <div className="success-title">Booking Confirmed!</div>
            <p className="success-desc">Your <strong>{selectedTherapy?.name}</strong> session at <strong>{centers.find(c => c.id === selectedCenter)?.name}</strong> on <strong>{date}</strong> is confirmed!</p>
            <button className="success-close" onClick={() => { setBooked(false); setSelectedTherapy(null); setSelectedCenter(null); setDate(''); setName(''); setPhone(''); }}>Done ✓</button>
          </div>
        </div>
      )}

      <div className="pancha-hero">
        <div className="hero-tag">🌺 Traditional Healing</div>
        <h1 className="hero-title">Panchakarma<span>Therapies</span></h1>
        <p className="hero-sub">Ancient Ayurvedic detox and healing treatments for complete wellness</p>
        <div className="stats-row">
          {[{ n: "6", l: "Therapies" }, { n: "3", l: "Centers" }, { n: "5000+", l: "Sessions Done" }, { n: "4.9⭐", l: "Rating" }].map((s, i) => (
            <div key={i}><div className="stat-num">{s.n}</div><div className="stat-label">{s.l}</div></div>
          ))}
        </div>
      </div>

      <div className="filters-bar">
        {categories.map(cat => (
          <button key={cat} className={`filter-pill ${selectedCat === cat ? 'active' : ''}`} onClick={() => setSelectedCat(cat)}>{cat}</button>
        ))}
      </div>

      <div className="main-content">
        <div className="therapies-grid">
          {filtered.map(therapy => (
            <div key={therapy.id} className={`therapy-card ${selectedTherapy?.id === therapy.id ? 'selected' : ''}`} onClick={() => setSelectedTherapy(therapy)}>
              <div className="therapy-top" style={{ background: `${therapy.color}18` }}>
                <span className="therapy-emoji">{therapy.emoji}</span>
                <span className="therapy-duration">⏱️ {therapy.duration}</span>
              </div>
              <div className="therapy-body">
                <div className="therapy-cat" style={{ color: therapy.color }}>{therapy.category}</div>
                <div className="therapy-name">{therapy.name}</div>
                <div className="therapy-desc">{therapy.desc}</div>
                <div className="benefits-wrap">
                  {therapy.benefits.map((b, i) => (
                    <span key={i} className="benefit-chip" style={{ background: `${therapy.color}18`, color: therapy.color }}>✓ {b}</span>
                  ))}
                </div>
                <div className="therapy-footer">
                  <div className="therapy-price" style={{ color: therapy.color }}>₹{therapy.price}</div>
                  <button className="select-btn" style={{ background: selectedTherapy?.id === therapy.id ? therapy.color : 'rgba(255,255,255,0.06)', color: selectedTherapy?.id === therapy.id ? 'white' : 'rgba(255,255,255,0.5)' }}>
                    {selectedTherapy?.id === therapy.id ? '✓ Selected' : 'Select'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="booking-panel">
          <div className="booking-card">
            <div className="booking-header">
              <div className="booking-header-title">📅 Book Session</div>
              <div className="booking-header-sub">Fill details to confirm</div>
            </div>
            <div className="booking-body">
              {selectedTherapy ? (
                <div className="selected-box">
                  <div>
                    <div className="selected-name">{selectedTherapy.emoji} {selectedTherapy.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>⏱️ {selectedTherapy.duration}</div>
                  </div>
                  <div className="selected-price">₹{selectedTherapy.price}</div>
                </div>
              ) : (
                <div className="empty-box">👆 Select a therapy first</div>
              )}

              <div className="form-section-label">Choose Center</div>
              {centers.map(center => (
                <div key={center.id} className={`center-option ${selectedCenter === center.id ? 'selected' : ''}`} onClick={() => setSelectedCenter(center.id)}>
                  <span style={{ fontSize: '22px' }}>{center.emoji}</span>
                  <div>
                    <div className="center-name">{center.name}</div>
                    <div className="center-meta">📍 {center.city} • ⭐ {center.rating} • 🛏️ {center.beds} beds</div>
                  </div>
                  {selectedCenter === center.id && <div className="center-check">✓</div>}
                </div>
              ))}

              <div className="form-section-label">Your Details</div>
              <input className="input-field" type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
              <input className="input-field" type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} />
              <input className="input-field" type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />

              <button className="book-now-btn" onClick={() => { if (!selectedTherapy || !selectedCenter || !date || !name || !phone) { alert('Please fill all fields!'); return; } setBooked(true); }} disabled={!selectedTherapy || !selectedCenter || !date || !name || !phone}>
                {!selectedTherapy ? '👆 Select a Therapy First' : '🌺 Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panchakarma;