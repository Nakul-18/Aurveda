import { useState } from 'react';

const hospitals = [
  { id: 1, name: "KIMS Ayurveda Hospital", city: "Kerala", emoji: "🏥", rating: 4.9, reviews: 512, specialty: "Panchakarma", cost: "₹50,000 - ₹2,00,000", beds: 200, accredited: true },
  { id: 2, name: "Patanjali Wellness Center", city: "Rishikesh", emoji: "🌿", rating: 4.8, reviews: 389, specialty: "Yoga & Detox", cost: "₹30,000 - ₹1,50,000", beds: 150, accredited: true },
  { id: 3, name: "Arya Vaidya Sala", city: "Kottakkal", emoji: "🏛️", rating: 5.0, reviews: 678, specialty: "Classical Ayurveda", cost: "₹40,000 - ₹1,80,000", beds: 300, accredited: true },
  { id: 4, name: "Soukya Holistic Center", city: "Bangalore", emoji: "🌸", rating: 4.9, reviews: 445, specialty: "Integrative Medicine", cost: "₹60,000 - ₹2,50,000", beds: 100, accredited: true },
  { id: 5, name: "Indus Valley Ayurveda", city: "Mysore", emoji: "🌺", rating: 4.7, reviews: 298, specialty: "Rejuvenation", cost: "₹35,000 - ₹1,20,000", beds: 80, accredited: false },
  { id: 6, name: "CGH Earth Ayurveda", city: "Kerala", emoji: "🌴", rating: 4.8, reviews: 367, specialty: "Luxury Wellness", cost: "₹80,000 - ₹3,00,000", beds: 60, accredited: true },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  .page{min-height:100vh;background:#0A0A0A;font-family:'Poppins',sans-serif}
  .hero{background:linear-gradient(135deg,#0F1F23,#1A3C2E 60%,#0F2E23);padding:80px 60px 100px;position:relative;overflow:hidden}
  .hero::before{content:'✈️';position:absolute;right:40px;top:0;font-size:280px;opacity:.04;animation:float 8s ease-in-out infinite}
  .hero::after{content:'';position:absolute;bottom:-60px;left:0;right:0;height:120px;background:#0A0A0A;clip-path:ellipse(55% 100% at 50% 100%)}
  .hero-tag{display:inline-flex;gap:8px;background:rgba(201,151,58,.15);border:1px solid rgba(201,151,58,.3);color:#C9973A;padding:8px 18px;border-radius:30px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:24px}
  .hero-title{font-family:'Playfair Display',serif;font-size:60px;font-weight:900;color:#FDF6EC;line-height:1.1;margin-bottom:20px}
  .hero-title span{color:#C9973A;display:block}
  .hero-sub{color:rgba(253,246,236,.5);font-size:17px;max-width:520px;font-weight:300;margin-bottom:40px}
  .hero-stats{display:flex;gap:48px;flex-wrap:wrap}
  .stat-num{font-family:'Playfair Display',serif;font-size:36px;font-weight:900;color:#C9973A}
  .stat-label{color:rgba(255,255,255,.3);font-size:12px;margin-top:4px}
  .main{padding:60px}
  .section-tag{color:#E8650A;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px}
  .section-title{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#FDF6EC;margin-bottom:8px}
  .section-sub{color:rgba(255,255,255,.25);font-size:14px;margin-bottom:32px}
  .search-row{display:flex;gap:12px;max-width:600px;margin-bottom:32px}
  .search-input{flex:1;padding:14px 18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;font-size:14px;color:#FDF6EC;outline:none;font-family:'Poppins',sans-serif}
  .search-input::placeholder{color:rgba(255,255,255,.25)}
  .search-input:focus{border-color:#E8650A}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px}
  .card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:20px;overflow:hidden;transition:all .35s;animation:slideUp .6s ease-out}
  .card:hover{transform:translateY(-6px);border-color:rgba(255,255,255,.12);box-shadow:0 24px 60px rgba(0,0,0,.5)}
  .card-top{background:linear-gradient(135deg,#1A3C2E,#2D6A4F);padding:28px;display:flex;gap:16px;align-items:flex-start}
  .hospital-emoji{font-size:52px}
  .hospital-info{flex:1}
  .hospital-name{font-family:'Playfair Display',serif;font-size:18px;color:#FDF6EC;font-weight:700;margin-bottom:4px}
  .hospital-city{color:#C9973A;font-size:13px;font-weight:500;margin-bottom:8px}
  .hospital-badge{display:inline-block;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(34,197,94,.15);color:#22c55e}
  .card-body{padding:20px}
  .details-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
  .detail-box{background:#0A0A0A;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.04)}
  .detail-label{font-size:10px;font-weight:700;color:rgba(255,255,255,.2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px}
  .detail-value{font-size:13px;font-weight:600;color:rgba(255,255,255,.7)}
  .inquire-btn{width:100%;padding:13px;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;background:#E8650A;color:#fff;transition:all .2s}
  .inquire-btn:hover{background:#D05508;transform:translateY(-2px)}
  .cost-estimator{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:36px;margin-top:48px}
  .estimator-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#FDF6EC;margin-bottom:24px}
  .estimator-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:24px}
  .est-input{padding:12px 14px;background:#0A0A0A;border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:14px;color:#FDF6EC;outline:none;font-family:'Poppins',sans-serif;width:100%}
  .est-input:focus{border-color:#E8650A}
  .est-btn{padding:14px 28px;background:#E8650A;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .2s}
  .est-btn:hover{background:#D05508;transform:translateY(-2px)}
  .est-result{background:rgba(232,101,10,.08);border:1px solid rgba(232,101,10,.2);border-radius:14px;padding:20px;margin-top:20px}
  .est-result-title{color:#E8650A;font-size:13px;font-weight:700;margin-bottom:8px}
  .est-result-amount{font-family:'Playfair Display',serif;font-size:36px;font-weight:900;color:#FDF6EC;margin-bottom:4px}
  .est-result-sub{color:rgba(255,255,255,.3);font-size:12px}
  @media(max-width:768px){.hero{padding:50px 24px 80px}.hero-title{font-size:36px}.main{padding:32px 24px}.grid{grid-template-columns:1fr}.estimator-grid{grid-template-columns:1fr}}
`;

function MedTourism() {
  const [search, setSearch] = useState('');
  const [days, setDays] = useState('');
  const [treatment, setTreatment] = useState('');
  const [people, setPeople] = useState('');
  const [estimate, setEstimate] = useState(null);

  const searchLower = search.toLowerCase();
  const filtered = hospitals.filter(h =>
    h.name.toLowerCase().includes(searchLower) ||
    h.city.toLowerCase().includes(searchLower)
  );

  const calculateCost = () => {
    if (!days || !people) return;
    const base = 3000 * parseInt(days) * parseInt(people);
    setEstimate(base);
  };

  return (
    <div className="page">
      <style>{CSS}</style>
      <div className="hero">
        <div className="hero-tag">✈️ Medical Tourism</div>
        <h1 className="hero-title">Wellness Travel<span>Across India</span></h1>
        <p className="hero-sub">Find the best Ayurvedic hospitals and wellness centers across India for your treatment journey</p>
        <div className="hero-stats">
          {[["500+","Hospitals"],["30+","Cities"],["50K+","Patients"],["4.9⭐","Rating"]].map(([n,l],i)=>(
            <div key={i}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
          ))}
        </div>
      </div>
      <div className="main">
        <div className="section-tag">Find Hospitals</div>
        <div className="section-title">Top Wellness Centers</div>
        <div className="section-sub">Accredited Ayurvedic hospitals across India</div>
        <div className="search-row">
          <input className="search-input" type="text" placeholder="🔍 Search by hospital name or city..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="grid">
          {filtered.map(h => (
            <div key={h.id} className="card">
              <div className="card-top">
                <div className="hospital-emoji">{h.emoji}</div>
                <div className="hospital-info">
                  <div className="hospital-name">{h.name}</div>
                  <div className="hospital-city">📍 {h.city}</div>
                  {h.accredited && <span className="hospital-badge">✓ Accredited</span>}
                </div>
              </div>
              <div className="card-body">
                <div className="details-grid">
                  {[
                    {label:"Specialty",value:h.specialty},
                    {label:"Rating",value:`⭐ ${h.rating} (${h.reviews})`},
                    {label:"Cost Range",value:h.cost},
                    {label:"Beds",value:`🛏️ ${h.beds} beds`},
                  ].map((d,i)=>(
                    <div key={i} className="detail-box">
                      <div className="detail-label">{d.label}</div>
                      <div className="detail-value">{d.value}</div>
                    </div>
                  ))}
                </div>
                <button className="inquire-btn">📋 Enquire Now</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cost-estimator">
          <div className="estimator-title">💰 Cost Estimator</div>
          <div className="estimator-grid">
            <input className="est-input" type="number" placeholder="Number of days" value={days} onChange={e=>setDays(e.target.value)} />
            <input className="est-input" type="text" placeholder="Treatment type" value={treatment} onChange={e=>setTreatment(e.target.value)} />
            <input className="est-input" type="number" placeholder="Number of people" value={people} onChange={e=>setPeople(e.target.value)} />
          </div>
          <button className="est-btn" onClick={calculateCost}>Calculate Estimate</button>
          {estimate && (
            <div className="est-result">
              <div className="est-result-title">Estimated Cost</div>
              <div className="est-result-amount">₹{estimate.toLocaleString()}</div>
              <div className="est-result-sub">Approximate cost for {days} days · {people} person(s) · Excludes travel & accommodation</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MedTourism;