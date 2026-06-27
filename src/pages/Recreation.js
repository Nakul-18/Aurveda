import { useState } from 'react';

const places = [
  { id: 1, name: "Ananda Spa Retreat", emoji: "🏔️", location: "Rishikesh, Uttarakhand", category: "Spa & Resort", price: 8000, rating: 4.9, reviews: 312, desc: "Luxury Himalayan spa with Ayurvedic treatments, yoga and meditation.", amenities: ["Infinity Pool", "Spa", "Yoga Studio", "Restaurant"] },
  { id: 2, name: "Kumarakom Lake Resort", emoji: "🌴", location: "Kerala Backwaters", category: "Nature Retreat", price: 12000, rating: 4.8, reviews: 445, desc: "Breathtaking Kerala backwater resort with traditional Ayurvedic spa.", amenities: ["Boat Rides", "Ayurvedic Spa", "Yoga", "Local Cuisine"] },
  { id: 3, name: "Coorg Forest Retreat", emoji: "🌲", location: "Coorg, Karnataka", category: "Forest Therapy", price: 6000, rating: 4.7, reviews: 234, desc: "Immerse in nature therapy amidst coffee plantations and misty forests.", amenities: ["Nature Walks", "Bird Watching", "Herbal Garden", "Meditation"] },
  { id: 4, name: "Kovalam Beach Wellness", emoji: "🏖️", location: "Kovalam, Kerala", category: "Beach Wellness", price: 9000, rating: 4.8, reviews: 389, desc: "Beachside Ayurvedic wellness center with ocean views and therapies.", amenities: ["Beach Access", "Yoga at Sunrise", "Ayurvedic Spa", "Seafood"] },
  { id: 5, name: "Pushkar Desert Wellness", emoji: "🌅", location: "Pushkar, Rajasthan", category: "Desert Therapy", price: 5000, rating: 4.6, reviews: 178, desc: "Unique desert wellness experience with spiritual healing and stargazing.", amenities: ["Camel Safari", "Stargazing", "Meditation", "Rajasthani Cuisine"] },
  { id: 6, name: "Ooty Nilgiri Retreat", emoji: "⛰️", location: "Ooty, Tamil Nadu", category: "Mountain Therapy", price: 7000, rating: 4.7, reviews: 267, desc: "Rejuvenate amidst Nilgiri mountains with fresh mountain air and herbal treatments.", amenities: ["Tea Garden Walk", "Herbal Bath", "Yoga", "Mountain Views"] },
];

const categories = ["All", "Spa & Resort", "Nature Retreat", "Forest Therapy", "Beach Wellness", "Desert Therapy", "Mountain Therapy"];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
  .page{min-height:100vh;background:#0A0A0A;font-family:'Poppins',sans-serif}
  .hero{background:linear-gradient(135deg,#0F1F23,#1A3C2E 60%,#0F2E23);padding:80px 60px 100px;position:relative;overflow:hidden}
  .hero::before{content:'🎭';position:absolute;right:40px;top:0;font-size:280px;opacity:.04;animation:float 8s ease-in-out infinite}
  .hero::after{content:'';position:absolute;bottom:-60px;left:0;right:0;height:120px;background:#0A0A0A;clip-path:ellipse(55% 100% at 50% 100%)}
  .hero-tag{display:inline-flex;gap:8px;background:rgba(201,151,58,.15);border:1px solid rgba(201,151,58,.3);color:#C9973A;padding:8px 18px;border-radius:30px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:24px}
  .hero-title{font-family:'Playfair Display',serif;font-size:60px;font-weight:900;color:#FDF6EC;line-height:1.1;margin-bottom:20px}
  .hero-title span{color:#C9973A;display:block}
  .hero-sub{color:rgba(253,246,236,.5);font-size:17px;max-width:520px;font-weight:300;margin-bottom:40px}
  .main{padding:60px}
  .section-tag{color:#E8650A;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px}
  .section-title{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#FDF6EC;margin-bottom:8px}
  .section-sub{color:rgba(255,255,255,.25);font-size:14px;margin-bottom:32px}
  .filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:32px}
  .filter{padding:8px 18px;border-radius:30px;border:1px solid rgba(255,255,255,.08);background:transparent;color:rgba(255,255,255,.35);font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Poppins',sans-serif}
  .filter.active{background:#E8650A;color:#fff;border-color:#E8650A}
  .filter:hover:not(.active){border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.7)}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px}
  .card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:20px;overflow:hidden;transition:all .35s;animation:slideUp .6s ease-out}
  .card:hover{transform:translateY(-6px);border-color:rgba(255,255,255,.12);box-shadow:0 24px 60px rgba(0,0,0,.5)}
  .card-top{height:160px;display:flex;align-items:center;justify-content:center;font-size:72px;background:linear-gradient(135deg,#1A3C2E,#2D6A4F);position:relative}
  .card-price-badge{position:absolute;top:14px;right:14px;background:rgba(0,0,0,.6);color:#C9973A;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700}
  .card-body{padding:22px}
  .card-cat{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#C9973A;margin-bottom:6px}
  .card-name{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#FDF6EC;margin-bottom:4px}
  .card-location{color:rgba(255,255,255,.3);font-size:13px;margin-bottom:10px}
  .card-desc{color:rgba(255,255,255,.3);font-size:13px;line-height:1.6;margin-bottom:14px}
  .amenities{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}
  .amenity{background:rgba(45,106,79,.15);color:rgba(45,106,79,.9);border:1px solid rgba(45,106,79,.2);padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600}
  .card-footer{display:flex;justify-content:space-between;align-items:center}
  .card-rating{color:rgba(255,255,255,.35);font-size:12px}
  .book-btn{padding:10px 20px;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;background:#E8650A;color:#fff;transition:all .2s}
  .book-btn:hover{background:#D05508;transform:translateY(-2px)}
  .success-overlay{position:fixed;inset:0;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;z-index:1000;animation:fadeIn .3s;backdrop-filter:blur(10px)}
  .success-card{background:#111;border:1px solid rgba(255,255,255,.08);border-radius:28px;padding:60px 48px;text-align:center;max-width:420px;width:90%;animation:slideUp .5s ease-out}
  .success-icon{font-size:80px;margin-bottom:24px;display:block;animation:pulse 2s ease-in-out infinite}
  .success-title{font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:#FDF6EC;margin-bottom:12px}
  .success-desc{color:rgba(255,255,255,.4);font-size:15px;line-height:1.7;margin-bottom:32px}
  .success-btn{background:#E8650A;color:#fff;border:none;padding:16px 40px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif}
  @media(max-width:768px){.hero{padding:50px 24px 80px}.hero-title{font-size:36px}.main{padding:32px 24px}.grid{grid-template-columns:1fr}}
`;

function Recreation() {
  const [cat, setCat] = useState('All');
  const [booked, setBooked] = useState(null);
  const filtered = places.filter(p => cat === 'All' || p.category === cat);

  return (
    <div className="page">
      <style>{CSS}</style>
      {booked && (
        <div className="success-overlay">
          <div className="success-card">
            <span className="success-icon">🎉</span>
            <div className="success-title">Booking Confirmed!</div>
            <p className="success-desc">Your stay at <strong>{booked.name}</strong> in <strong>{booked.location}</strong> has been confirmed!</p>
            <button className="success-btn" onClick={() => setBooked(null)}>Done ✓</button>
          </div>
        </div>
      )}
      <div className="hero">
        <div className="hero-tag">🎭 Recreation & Leisure</div>
        <h1 className="hero-title">Wellness<span>Destinations</span></h1>
        <p className="hero-sub">Discover India's most beautiful wellness retreats, spas and nature therapy destinations for your perfect getaway</p>
      </div>
      <div className="main">
        <div className="section-tag">Destinations</div>
        <div className="section-title">Explore Wellness Retreats</div>
        <div className="section-sub">Handpicked destinations across India for rest, healing and rejuvenation</div>
        <div className="filters">
          {categories.map(c => (
            <button key={c} className={`filter ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="grid">
          {filtered.map(p => (
            <div key={p.id} className="card">
              <div className="card-top">
                <span style={{ fontSize: '72px', animation: 'float 4s ease-in-out infinite' }}>{p.emoji}</span>
                <div className="card-price-badge">₹{p.price.toLocaleString()}/night</div>
              </div>
              <div className="card-body">
                <div className="card-cat">{p.category}</div>
                <div className="card-name">{p.name}</div>
                <div className="card-location">📍 {p.location}</div>
                <div className="card-desc">{p.desc}</div>
                <div className="amenities">
                  {p.amenities.map((a, i) => <span key={i} className="amenity">✓ {a}</span>)}
                </div>
                <div className="card-footer">
                  <div className="card-rating">⭐ {p.rating} ({p.reviews} reviews)</div>
                  <button className="book-btn" onClick={() => setBooked(p)}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recreation;