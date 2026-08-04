import { useState, useEffect } from 'react';

const API = 'http://localhost:5000/api';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

  .doctors-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; }

  .doctors-hero { background: linear-gradient(135deg, #0F1F23 0%, #1A3C2E 60%, #0F2E23 100%); padding: 80px 60px 100px; position: relative; overflow: hidden; }
  .doctors-hero::before { content: '🩺'; position: absolute; right: 40px; top: 0; font-size: 280px; opacity: 0.05; animation: float 8s ease-in-out infinite; }
  .doctors-hero::after { content: ''; position: absolute; bottom: -60px; left: 0; right: 0; height: 120px; background: #0A0A0A; clip-path: ellipse(55% 100% at 50% 100%); }

  .hero-tag { display: inline-flex; gap: 8px; background: rgba(201,151,58,.15); border: 1px solid rgba(201,151,58,.3); color: #C9973A; padding: 8px 18px; border-radius: 30px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: 64px; font-weight: 900; color: #FDF6EC; line-height: 1.1; margin-bottom: 20px; }
  .hero-title span { color: #C9973A; display: block; }
  .hero-subtitle { color: rgba(253,246,236,.55); font-size: 18px; line-height: 1.7; max-width: 520px; font-weight: 300; margin-bottom: 40px; }

  .search-row { display: flex; gap: 12px; max-width: 600px; }
  .search-input { flex: 1; padding: 16px 20px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 12px; font-size: 15px; color: #FDF6EC; outline: none; font-family: 'Poppins', sans-serif; transition: border-color .2s; }
  .search-input:focus { border-color: #E8650A; }
  .search-input::placeholder { color: rgba(255,255,255,.25); }
  .avail-toggle { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); padding: 0 20px; border-radius: 12px; color: rgba(255,255,255,.6); font-size: 14px; cursor: pointer; white-space: nowrap; }

  .filters-bar { background: #111; padding: 20px 60px; border-bottom: 1px solid rgba(255,255,255,.06); display: flex; gap: 10px; flex-wrap: wrap; }
  .filter-pill { padding: 9px 20px; border-radius: 30px; border: 1px solid rgba(255,255,255,.08); background: transparent; color: rgba(255,255,255,.4); font-size: 13px; font-weight: 500; cursor: pointer; transition: all .2s; font-family: 'Poppins', sans-serif; }
  .filter-pill.active { background: #E8650A; color: white; border-color: #E8650A; }
  .filter-pill:hover:not(.active) { border-color: rgba(255,255,255,.2); color: rgba(255,255,255,.8); }

  .doctors-main { padding: 60px; }
  .doctors-count { color: rgba(255,255,255,.3); font-size: 14px; margin-bottom: 32px; display: flex; align-items: center; gap: 12px; }
  .live-badge { background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.2); color: #22c55e; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 6px; }
  .live-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; animation: pulse 1.5s ease-in-out infinite; }
  .doctors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }

  .doctor-card { background: #111; border: 1px solid rgba(255,255,255,.06); border-radius: 24px; overflow: hidden; transition: all .35s; animation: slideUp .6s ease-out; }
  .doctor-card:hover { transform: translateY(-8px); border-color: rgba(255,255,255,.12); box-shadow: 0 30px 60px rgba(0,0,0,.5); }

  .card-top { background: linear-gradient(135deg, #1A3C2E, #2D6A4F); padding: 32px; display: flex; gap: 16px; align-items: flex-start; position: relative; }
  .doc-emoji { font-size: 56px; }
  .doc-info { flex: 1; }
  .doc-tag { position: absolute; top: 16px; right: 16px; background: rgba(201,151,58,.2); color: #C9973A; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .doc-name { font-family: 'Playfair Display', serif; font-size: 18px; color: #FDF6EC; font-weight: 700; margin-bottom: 4px; }
  .doc-spec { color: #C9973A; font-size: 13px; font-weight: 500; margin-bottom: 8px; }
  .doc-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .status-on { background: rgba(34,197,94,.15); color: #22c55e; }
  .status-off { background: rgba(239,68,68,.15); color: #ef4444; }

  .card-body { padding: 24px; }
  .doc-details { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .detail-box { background: #0A0A0A; padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,.04); }
  .detail-label { font-size: 10px; font-weight: 700; color: rgba(255,255,255,.25); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
  .detail-value { font-size: 13px; font-weight: 600; color: rgba(255,255,255,.8); }

  .book-btn { width: 100%; padding: 14px; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all .2s; font-family: 'Poppins', sans-serif; }
  .book-btn.avail { background: #E8650A; color: white; }
  .book-btn.avail:hover { background: #D05508; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(232,101,10,.3); }
  .book-btn.unavail { background: rgba(255,255,255,.05); color: rgba(255,255,255,.2); cursor: not-allowed; border: 1px solid rgba(255,255,255,.06); }

  .loading-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px; gap: 20px; }
  .loading-spinner { width: 48px; height: 48px; border: 3px solid rgba(232,101,10,.2); border-top-color: #E8650A; border-radius: 50%; animation: spin 1s linear infinite; }
  .loading-text { color: rgba(255,255,255,.3); font-size: 14px; }

  .error-wrap { text-align: center; padding: 80px; }
  .error-emoji { font-size: 64px; margin-bottom: 20px; display: block; }
  .error-title { font-family: 'Playfair Display', serif; font-size: 24px; color: #FDF6EC; margin-bottom: 8px; }
  .error-sub { color: rgba(255,255,255,.3); font-size: 14px; margin-bottom: 24px; }
  .retry-btn { background: #E8650A; color: white; border: none; padding: 12px 28px; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; }

  .empty-wrap { text-align: center; padding: 80px; }
  .empty-emoji { font-size: 64px; margin-bottom: 20px; display: block; }
  .empty-title { font-family: 'Playfair Display', serif; font-size: 24px; color: #FDF6EC; margin-bottom: 8px; }
  .empty-sub { color: rgba(255,255,255,.3); font-size: 14px; }

  @media (max-width: 768px) {
    .doctors-hero { padding: 50px 24px 80px; }
    .hero-title { font-size: 40px; }
    .filters-bar { padding: 16px 24px; }
    .doctors-main { padding: 32px 24px; }
    .doctors-grid { grid-template-columns: 1fr; }
  }
`;

const specializations = ["All", "Panchakarma Specialist", "Ayurvedic Physician", "Yoga & Naturopathy", "Herbal Medicine", "Dosha Balancing", "Rasayana Therapy"];
const emojis = ["👩‍⚕️", "👨‍⚕️", "👩‍⚕️", "👨‍⚕️", "👩‍⚕️", "👨‍⚕️"];

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [availableOnly, setAvailableOnly] = useState(false);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API}/doctors?`;
      if (selectedSpec !== 'All') url += `specialization=${selectedSpec}&`;
      if (availableOnly) url += `available=true&`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        setError('Failed to load doctors');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running on port 5000!');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSpec, availableOnly]);

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

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
        {loading ? (
          <div className="loading-wrap">
            <div className="loading-spinner" />
            <div className="loading-text">Loading doctors from database...</div>
          </div>
        ) : error ? (
          <div className="error-wrap">
            <span className="error-emoji">⚠️</span>
            <div className="error-title">Could not load doctors</div>
            <div className="error-sub">{error}</div>
            <button className="retry-btn" onClick={fetchDoctors}>Try Again</button>
          </div>
        ) : (
          <>
            <div className="doctors-count">
              Showing {filtered.length} doctors
              <span className="live-badge"><span className="live-dot"/>Live from Database</span>
            </div>
            {filtered.length === 0 ? (
              <div className="empty-wrap">
                <span className="empty-emoji">🔍</span>
                <div className="empty-title">No doctors found</div>
                <div className="empty-sub">Try changing your search or filters</div>
              </div>
            ) : (
              <div className="doctors-grid">
                {filtered.map((doctor, index) => (
                  <div key={doctor.id} className="doctor-card">
                    <div className="card-top">
                      <div className="doc-emoji">{emojis[index % emojis.length]}</div>
                      <div className="doc-info">
                        <div className="doc-name">{doctor.name}</div>
                        <div className="doc-spec">{doctor.specialization}</div>
                        <span className={`doc-status ${doctor.available ? 'status-on' : 'status-off'}`}>
                          {doctor.available ? '🟢 Available' : '🔴 Unavailable'}
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="doc-details">
                        {[
                          { label: 'Experience', value: doctor.experience },
                          { label: 'Languages', value: doctor.language },
                          { label: 'Rating', value: `⭐ ${doctor.rating}` },
                          { label: 'Fee', value: `₹${doctor.fee}` },
                        ].map((item, i) => (
                          <div key={i} className="detail-box">
                            <div className="detail-label">{item.label}</div>
                            <div className="detail-value">{item.value}</div>
                          </div>
                        ))}
                      </div>
                      <button
                        className={`book-btn ${doctor.available ? 'avail' : 'unavail'}`}
                        onClick={() => doctor.available && (window.location.href = `/booking?doctor=${doctor.id}&name=${encodeURIComponent(doctor.name)}&fee=${doctor.fee}`)}
                      >
                        {doctor.available ? '📅 Book Consultation' : 'Not Available'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Doctors;