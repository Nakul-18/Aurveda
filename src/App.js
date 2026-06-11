import PrakritiQuiz from './pages/PrakritiQuiz';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import Doctors from './pages/Doctors';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --saffron: #E8650A;
    --deep-green: #1A3C2E;
    --cream: #FDF6EC;
    --gold: #C9973A;
    --light-green: #2D6A4F;
    --text-dark: #1A1A1A;
    --text-muted: #6B7280;
  }

  body { font-family: 'Inter', sans-serif; background: var(--cream); }

  /* NAVBAR */
  .navbar {
    display: flex;<Route path="/prakriti-quiz" element={<PrakritiQuiz />} />
    justify-content: space-between;
    align-items: center;
    padding: 18px 60px;
    background: var(--deep-green);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    color: var(--cream);
    font-weight: 700;
    letter-spacing: 1px;
  }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-links a {
    color: rgba(253,246,236,0.75);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--cream); }
  .btn-nav {
    background: var(--saffron);
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-nav:hover { background: #cf5608; }

  /* HERO */
  .hero {
    min-height: 88vh;
    background: var(--deep-green);
    display: flex;
    align-items: center;
    padding: 80px 60px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    right: -100px;
    top: -100px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(201,151,58,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
  .hero::after {
    content: '🌿';
    position: absolute;
    right: 80px;
    bottom: 60px;
    font-size: 280px;
    opacity: 0.07;
  }
  .hero-content { max-width: 640px; position: relative; z-index: 1; }
  .hero-tag {
    display: inline-block;
    background: rgba(201,151,58,0.2);
    color: var(--gold);
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: 64px;
    font-weight: 900;
    color: var(--cream);
    line-height: 1.1;
    margin-bottom: 24px;
  }
  .hero h1 span { color: var(--gold); }
  .hero p {
    font-size: 18px;
    color: rgba(253,246,236,0.7);
    line-height: 1.7;
    margin-bottom: 40px;
    font-weight: 300;
  }
  .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-primary-hero {
    background: var(--saffron);
    color: white;
    border: none;
    padding: 16px 36px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.3px;
  }
  .btn-primary-hero:hover { background: #cf5608; transform: translateY(-2px); }
  .btn-outline-hero {
    background: transparent;
    color: var(--cream);
    border: 1.5px solid rgba(253,246,236,0.4);
    padding: 16px 36px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-outline-hero:hover { border-color: var(--cream); background: rgba(253,246,236,0.08); }

  /* STATS BAR */
  .stats-bar {
    background: var(--gold);
    padding: 24px 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
  .stat-item { text-align: center; }
  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 700;
    color: var(--deep-green);
  }
  .stat-label {
    font-size: 13px;
    color: var(--deep-green);
    opacity: 0.8;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  /* SERVICES */
  .services {
    padding: 100px 60px;
    background: var(--cream);
  }
  .section-tag {
    color: var(--saffron);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 700;
    color: var(--deep-green);
    margin-bottom: 16px;
    line-height: 1.2;
  }
  .section-subtitle {
    color: var(--text-muted);
    font-size: 16px;
    line-height: 1.7;
    max-width: 500px;
    margin-bottom: 60px;
  }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
  }
  .service-card {
    background: white;
    border-radius: 16px;
    padding: 36px 28px;
    border: 1px solid rgba(0,0,0,0.06);
    transition: all 0.3s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .service-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: var(--saffron);
    transform: scaleX(0);
    transition: transform 0.3s;
  }
  .service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
  .service-card:hover::before { transform: scaleX(1); }
  .service-icon {
    font-size: 36px;
    margin-bottom: 20px;
    display: block;
  }
  .service-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: var(--deep-green);
    margin-bottom: 10px;
    font-weight: 700;
  }
  .service-card p {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.7;
  }

  /* HOW IT WORKS */
  .how-it-works {
    background: var(--deep-green);
    padding: 100px 60px;
  }
  .how-it-works .section-title { color: var(--cream); }
  .how-it-works .section-subtitle { color: rgba(253,246,236,0.6); }
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 40px;
    margin-top: 60px;
  }
  .step {
    text-align: center;
    position: relative;
  }
  .step-number {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(201,151,58,0.2);
    border: 1.5px solid var(--gold);
    color: var(--gold);
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }
  .step h4 {
    font-family: 'Playfair Display', serif;
    color: var(--cream);
    font-size: 18px;
    margin-bottom: 10px;
  }
  .step p {
    color: rgba(253,246,236,0.55);
    font-size: 14px;
    line-height: 1.7;
  }

  /* DOCTORS */
  .doctors {
    padding: 100px 60px;
    background: white;
  }
  .doctors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    margin-top: 60px;
  }
  .doctor-card {
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.07);
    transition: all 0.3s;
    background: var(--cream);
  }
  .doctor-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.1); }
  .doctor-avatar {
    height: 180px;
    background: linear-gradient(135deg, var(--deep-green), var(--light-green));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 72px;
  }
  .doctor-info { padding: 20px; }
  .doctor-info h4 {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: var(--deep-green);
    margin-bottom: 4px;
  }
  .doctor-spec {
    color: var(--saffron);
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .doctor-rating { color: var(--gold); font-size: 13px; }
  .btn-book {
    width: 100%;
    margin-top: 14px;
    background: var(--deep-green);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-book:hover { background: var(--light-green); }

  /* CTA */
  .cta {
    background: linear-gradient(135deg, var(--saffron) 0%, #c9500a 100%);
    padding: 80px 60px;
    text-align: center;
  }
  .cta h2 {
    font-family: 'Playfair Display', serif;
    font-size: 44px;
    color: white;
    margin-bottom: 16px;
    font-weight: 700;
  }
  .cta p { color: rgba(255,255,255,0.8); font-size: 18px; margin-bottom: 36px; }
  .btn-cta {
    background: white;
    color: var(--saffron);
    border: none;
    padding: 16px 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }

  /* FOOTER */
  .footer {
    background: var(--text-dark);
    padding: 40px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
  .footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: var(--cream);
  }
  .footer-logo span { color: var(--gold); }
  .footer p { color: rgba(255,255,255,0.4); font-size: 13px; }

  @media (max-width: 768px) {
    .navbar { padding: 16px 24px; }
    .nav-links { display: none; }
    .hero { padding: 60px 24px; }
    .hero h1 { font-size: 40px; }
    .stats-bar { padding: 24px; }
    .services, .how-it-works, .doctors, .cta { padding: 60px 24px; }
    .footer { padding: 32px 24px; flex-direction: column; text-align: center; }
  }
`;

const doctors = [
  { name: "Dr. Priya Sharma", spec: "Panchakarma Specialist", rating: "⭐ 4.9 • 320 consultations", emoji: "👩‍⚕️" },
  { name: "Dr. Arjun Nair", spec: "Ayurvedic Physician", rating: "⭐ 4.8 • 210 consultations", emoji: "👨‍⚕️" },
  { name: "Dr. Meera Iyer", spec: "Yoga & Naturopathy", rating: "⭐ 4.9 • 180 consultations", emoji: "👩‍⚕️" },
  { name: "Dr. Vikram Joshi", spec: "Herbal Medicine", rating: "⭐ 4.7 • 290 consultations", emoji: "👨‍⚕️" },
];

function AppHome() {
  const [activeNav, setActiveNav] = useState('home');

  return (
    <>
      <style>{styles}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">Ārogya<span>Med</span></div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Doctors</a>
          <a href="#">Ayurveda</a>
          <a href="#">Yoga</a>
          <a href="#">Medical Tourism</a>
          <button className="btn-nav">Book Now</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">🌿 Ancient Wisdom · Modern Care</div>
          <h1>Heal with the<br />power of <span>Ayurveda</span></h1>
          <p>Connect with certified Vaidyas, discover your Prakriti, and begin your journey to complete wellness — from the comfort of your home.</p>
          <div className="hero-btns">
            <button className="btn-primary-hero">Book a Consultation</button>
            <button className="btn-outline-hero">Take Prakriti Quiz →</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">12,000+</div>
          <div className="stat-label">Patients Healed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">850+</div>
          <div className="stat-label">Certified Vaidyas</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">22</div>
          <div className="stat-label">Indian Languages</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">4.9★</div>
          <div className="stat-label">Average Rating</div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="services">
        <div className="section-tag">What We Offer</div>
        <div className="section-title">Complete Wellness,<br />One Platform</div>
        <div className="section-subtitle">From Ayurvedic consultations to yoga sessions and medical tourism — everything you need for holistic health.</div>
        <div className="services-grid">
          {[
            { icon: "🩺", title: "Telemedicine", desc: "Video consultations with certified Ayurvedic doctors from anywhere in India." },
            { icon: "🌿", title: "Prakriti Assessment", desc: "Discover your unique body type — Vata, Pitta, or Kapha — with our AI quiz." },
            { icon: "🧘", title: "Yoga & Naturopathy", desc: "Live and on-demand yoga classes with personalized wellness plans." },
            { icon: "💊", title: "E-Prescriptions", desc: "Receive digital Ayurvedic prescriptions instantly after your consultation." },
            { icon: "✈️", title: "Medical Tourism", desc: "Plan your wellness retreat or treatment trip across India with full support." },
            { icon: "🗣️", title: "22 Indian Languages", desc: "Consult in Hindi, Marathi, Tamil, Telugu and 18 more regional languages." },
          ].map((s, i) => (
            <div className="service-card" key={i}>
              <span className="service-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="section-tag">Simple Process</div>
        <div className="section-title">How It Works</div>
        <div className="section-subtitle">Start your Ayurvedic wellness journey in just 4 simple steps.</div>
        <div className="steps-grid">
          {[
            { n: "1", title: "Create Account", desc: "Sign up with your phone number and complete your health profile." },
            { n: "2", title: "Take Prakriti Quiz", desc: "Answer 20 questions to discover your Ayurvedic body type." },
            { n: "3", title: "Choose a Vaidya", desc: "Browse certified doctors by specialization, language, and availability." },
            { n: "4", title: "Begin Healing", desc: "Attend your video consultation and receive your personalized treatment plan." },
          ].map((s, i) => (
            <div className="step" key={i}>
              <div className="step-number">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTORS */}
      <section className="doctors">
        <div className="section-tag">Our Experts</div>
        <div className="section-title">Meet Our Vaidyas</div>
        <div className="section-subtitle">Certified Ayurvedic practitioners with years of experience in traditional and modern healing.</div>
        <div className="doctors-grid">
          {doctors.map((d, i) => (
            <div className="doctor-card" key={i}>
              <div className="doctor-avatar">{d.emoji}</div>
              <div className="doctor-info">
                <h4>{d.name}</h4>
                <div className="doctor-spec">{d.spec}</div>
                <div className="doctor-rating">{d.rating}</div>
                <button className="btn-book">Book Consultation</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Begin Your Healing Journey Today</h2>
        <p>Join 12,000+ patients who found balance through Ayurveda</p>
        <button className="btn-cta">Get Started — It's Free</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Ārogya<span>Med</span></div>
        <p>© 2026 ĀrogyaMed. All rights reserved.</p>
        <p style={{color: 'rgba(255,255,255,0.4)', fontSize: '13px'}}>Made with 🌿 for India's wellness</p>
      </footer>
    </>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/prakriti-quiz" element={<PrakritiQuiz />} /> /
    </Routes>
  );
}
export default App;