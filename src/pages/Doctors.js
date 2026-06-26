import { useState } from 'react';

const doctors = [
  { id: 1, name: "Dr. Priya Sharma", spec: "Panchakarma Specialist", exp: "12 years", lang: "Hindi, English", fee: 500, rating: 4.9, reviews: 320, emoji: "👩‍⚕️", available: true, tag: "Top Rated" },
  { id: 2, name: "Dr. Arjun Nair", spec: "Ayurvedic Physician", exp: "8 years", lang: "Malayalam, English", fee: 400, rating: 4.8, reviews: 210, emoji: "👨‍⚕️", available: true, tag: "Popular" },
  { id: 3, name: "Dr. Meera Iyer", spec: "Yoga & Naturopathy", exp: "10 years", lang: "Tamil, Hindi", fee: 450, rating: 4.9, reviews: 180, emoji: "👩‍⚕️", available: false, tag: null },
  { id: 4, name: "Dr. Vikram Joshi", spec: "Herbal Medicine", exp: "15 years", lang: "Marathi, Hindi", fee: 600, rating: 4.7, reviews: 290, emoji: "👨‍⚕️", available: true, tag: "Expert" },
  { id: 5, name: "Dr. Anjali Singh", spec: "Dosha Balancing", exp: "6 years", lang: "Hindi, English", fee: 350, rating: 4.6, reviews: 150, emoji: "👩‍⚕️", available: true, tag: null },
  { id: 6, name: "Dr. Ravi Kumar", spec: "Rasayana Therapy", exp: "20 years", lang: "Telugu, English", fee: 700, rating: 5.0, reviews: 410, emoji: "👨‍⚕️", available: false, tag: "Senior" },
];

const specializations = ["All", "Panchakarma Specialist", "Ayurvedic Physician", "Yoga & Naturopathy", "Herbal Medicine", "Dosha Balancing", "Rasayana Therapy"];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

  .doctors-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; }

  .doctors-hero { background: linear-gradient(135deg, #0F1F23 0%, #1A3C2E 60%, #0F2E23 100%); padding: 80px 60px 100px; position: relative; overflow: hidden; }
  .doctors-hero::before { content: '🩺'; position: absolute; right: 40px; top: 0; font-size: 280px; opacity: 0.05; animation: float 8s ease-in-out infinite; }
  .doctors-hero::after { content: ''; position: absolute; bottom: -60px; left: 0; right: 0; height: 120px; background: #0A0A0A; clip-path: ellipse(55% 100% at 50% 100%); }

  .hero-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(201,151,58,0.15); border: 1px solid rgba(201,151,58,0.3); color: #C9973A; padding: 8px 18px; border-radius: 30px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: 64px; font-weight: 900; color: #FDF6EC; line-height: 1.1; margin-bottom: 20px; }
  .hero-title span { color: #C9973A; display: block; }
  .hero-subtitle { color: rgba(253,246,236,0.55); font-size: 18px; line-height: 1.7; max-width: 520px; font-weight: 300; margin-bottom: 40px; }

  .search-row { display: flex; gap: 12px; max-width: 600px; }
  .search-input { flex: 1; padding: 16px 20px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; font-size: 15px; color: #FDF6EC; outline: none; font-family: 'Poppins', sans-serif; transition: border-color 0.2s; }
  .search-input:focus { border-color: #E8650A; }
  .search-input::placeholder { color: rgba(255,255,255,0.25); }
  .avail-toggle { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 0 20px; border-radius: 12px; color: rgba(255,255,255,0.6); font-size: 14px; cursor: pointer; white-space: nowrap; }

  .filters-bar { background: #111; padding: 20px 60px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; gap: 10px; flex-wrap: wrap; }
  .filter-pill { padding: 9px 20px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: rgba(255,255,255,0.4); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .filter-pill.active { background: #E8650A; color: white; border-color: #E8650A; }
  .filter-pill:hover:not(.active) { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); }

  .doctors-main { padding: 60px; }
  .doctors-count { color: rgba(255,255,255,0.3); font-size: 14px; margin-bottom: 32px; }
  .doctors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }

  .doctor-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; overflow: hidden; transition: all 0.35s; animation: slideUp 0.6s ease-out; }
  .doctor-card:hover { transform: translateY(-8px); border-color: rgba(255,255,255,0.12); box-shadow: 0 30px 60px rgba(0,0,0,0.5); }

  .card-top { background: linear-gradient(135deg, #1A3C2E, #2D6A4F); padding: 32px; display: flex; gap: 16px; align-items: flex-start; position: relative; }
  .doc-emoji { font-size: 56px; }
  .doc-info { flex: 1; }
  .doc-tag { position: absolute; top: 16px; right: 16px; background: rgba(201,151,58,0.2); color: #C9973A; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .doc-name { font-family: 'Playfair Display', serif; font-size: 18px; color: #FDF6EC; font-weight: 700; margin-bottom: 4px; }
  .doc-spec { color: #C9973A; font-size: 13px; font-weight: 500; margin-bottom: 8px; }
  .doc-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .status-on { background: rgba(34,197,94,0.15); color: #22c55e; }
  .status-off { background: rgba(239,68,68,0.15); color: #ef4444; }

  .card-body { padding: 24px; }
  .doc-details { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .detail-box { background: #0A0A0A; padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.04); }
  .detail-label { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .detail-value { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); }

  .book-btn { width: 100%; padding: 14px; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .book-btn.avail { background: #E8650A; color: white; }
  .book-btn.avail:hover { background: #D05508; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(232,101,10,0.3); }
  .book-btn.unavail { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.2); cursor: not-allowed; border: 1px solid rgba(255,255,255,0.06); }

  @media (max-width: 768px) {
    .doctors-hero { padding: 50px 24px 80px; }
    .hero-title { font-size: 40px; }
    .filters-bar { padding: 16px 24px; }
    .doctors-main { padding: 32px 24px; }
    .doctors-grid { grid-template-columns: 1fr; }
  }
`;

function Doctors() {
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = doctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.spec.toLowerCase().includes(search.toLowerCase());
    const matchSpec = selectedSpec === 'All' || d.spec === selectedSpec;
    const matchAvail = availableOnly ? d.available : true;
    return matchSearch && matchSpec && matchAvail;
  });

  return (
    <div className="doctors-page">
      <style>{CSS}</style>

      <div className="doctors-hero">
        <div className="hero-tag">🩺 Certified Experts</div>
        <h1 className="hero-title">Find Your<span>Vaidya</span></h1>
        <p className="hero-subtitle">Connect with India's best Ayurvedic doctors for personalized consultations</p>
        <div className="search-row">
          <input className="search-input" type="text" placeholder="🔍 Search by name or specialization..." value={search} onChange={e => setSearch(e.target.value)} />
          <div className="avail-toggle" onClick={() => setAvailableOnly(!availableOnly)}>
            <input type="checkbox" checked={availableOnly} onChange={() => {}} />
            Available Today
          </div>
        </div>
      </div>

      <div className="filters-bar">
        {specializations.map(spec => (
          <button key={spec} className={`filter-pill ${selectedSpec === spec ? 'active' : ''}`} onClick={() => setSelectedSpec(spec)}>{spec}</button>
        ))}
      </div>

      <div className="doctors-main">
        <div className="doctors-count">Showing {filtered.length} doctors</div>
        <div className="doctors-grid">
          {filtered.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="card-top">
                <div className="doc-emoji">{doctor.emoji}</div>
                <div className="doc-info">
                  <div className="doc-name">{doctor.name}</div>
                  <div className="doc-spec">{doctor.spec}</div>
                  <span className={`doc-status ${doctor.available ? 'status-on' : 'status-off'}`}>
                    {doctor.available ? '🟢 Available' : '🔴 Unavailable'}
                  </span>
                </div>
                {doctor.tag && <div className="doc-tag">{doctor.tag}</div>}
              </div>
              <div className="card-body">
                <div className="doc-details">
                  {[
                    { label: 'Experience', value: doctor.exp },
                    { label: 'Languages', value: doctor.lang },
                    { label: 'Rating', value: `⭐ ${doctor.rating} (${doctor.reviews})` },
                    { label: 'Fee', value: `₹${doctor.fee}` },
                  ].map((item, i) => (
                    <div key={i} className="detail-box">
                      <div className="detail-label">{item.label}</div>
                      <div className="detail-value">{item.value}</div>
                    </div>
                  ))}
                </div>
                <button className={`book-btn ${doctor.available ? 'avail' : 'unavail'}`} onClick={() => doctor.available && (window.location.href = '/booking')}>
                  {doctor.available ? '📅 Book Consultation' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;