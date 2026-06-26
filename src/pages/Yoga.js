import { useState } from 'react';

const classes = [
  { id: 1, name: "Surya Namaskar", emoji: "🌅", level: "Beginner", duration: "30 min", instructor: "Yogi Priya", rating: 4.9, students: 1240, category: "Morning", color: "#E8650A", desc: "Start your day with the classic 12-pose sun salutation for full body activation." },
  { id: 2, name: "Pranayama", emoji: "🌬️", level: "All Levels", duration: "20 min", instructor: "Yogi Arjun", rating: 4.8, students: 980, category: "Breathing", color: "#C9973A", desc: "Master the ancient art of breath control to boost energy and reduce stress." },
  { id: 3, name: "Hatha Yoga", emoji: "🧘", level: "Beginner", duration: "45 min", instructor: "Yogi Meera", rating: 4.9, students: 1560, category: "Classic", color: "#2D6A4F", desc: "Traditional Hatha yoga combining asanas and breathing for balance." },
  { id: 4, name: "Vinyasa Flow", emoji: "🌊", level: "Intermediate", duration: "60 min", instructor: "Yogi Vikram", rating: 4.7, students: 870, category: "Flow", color: "#1A3C2E", desc: "Dynamic flowing sequences synchronizing breath with movement." },
  { id: 5, name: "Yin Yoga", emoji: "🌙", level: "All Levels", duration: "45 min", instructor: "Yogi Lakshmi", rating: 4.8, students: 720, category: "Restorative", color: "#FF6B35", desc: "Slow-paced practice holding poses longer to target deep connective tissues." },
  { id: 6, name: "Kundalini Yoga", emoji: "🔥", level: "Advanced", duration: "75 min", instructor: "Yogi Suresh", rating: 4.9, students: 640, category: "Spiritual", color: "#F7931E", desc: "Powerful combination of postures, breathing, meditation and mantras." },
];

const categories = ["All", "Morning", "Breathing", "Classic", "Flow", "Restorative", "Spiritual"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

  .yoga-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; }

  .yoga-hero { background: linear-gradient(135deg, #0F1F23 0%, #1A3C2E 60%, #0F2E23 100%); padding: 80px 60px 100px; position: relative; overflow: hidden; }
  .yoga-hero::before { content: '🧘'; position: absolute; right: 40px; top: 0; font-size: 280px; opacity: 0.05; animation: float 8s ease-in-out infinite; }
  .yoga-hero::after { content: ''; position: absolute; bottom: -60px; left: 0; right: 0; height: 120px; background: #0A0A0A; clip-path: ellipse(55% 100% at 50% 100%); }

  .hero-tag { display: inline-flex; gap: 8px; background: rgba(201,151,58,0.15); border: 1px solid rgba(201,151,58,0.3); color: #C9973A; padding: 8px 18px; border-radius: 30px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: 64px; font-weight: 900; color: #FDF6EC; line-height: 1.1; margin-bottom: 20px; }
  .hero-title span { color: #C9973A; display: block; }
  .hero-sub { color: rgba(253,246,236,0.5); font-size: 18px; max-width: 520px; font-weight: 300; margin-bottom: 40px; }

  .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-primary { background: #E8650A; color: white; border: none; padding: 15px 32px; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
  .btn-primary:hover { background: #D05508; transform: translateY(-2px); }
  .btn-outline { background: transparent; color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.15); padding: 15px 32px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
  .btn-outline:hover { border-color: rgba(255,255,255,0.4); color: white; }

  .stats-row { display: flex; gap: 48px; flex-wrap: wrap; margin-top: 48px; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; color: #C9973A; }
  .stat-label { color: rgba(255,255,255,0.3); font-size: 12px; margin-top: 4px; }

  .yoga-main { padding: 60px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: #FDF6EC; margin-bottom: 8px; }
  .section-sub { color: rgba(255,255,255,0.25); font-size: 15px; margin-bottom: 32px; }

  .filters-wrap { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
  .filter-pill { padding: 8px 18px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: rgba(255,255,255,0.35); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .filter-pill.active { background: #E8650A; color: white; border-color: #E8650A; }
  .filter-pill:hover:not(.active) { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); }

  .classes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-top: 28px; }
  .class-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; overflow: hidden; transition: all 0.35s; animation: slideUp 0.6s ease-out; }
  .class-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.12); box-shadow: 0 24px 60px rgba(0,0,0,0.5); }

  .class-top { height: 150px; display: flex; align-items: center; justify-content: center; position: relative; }
  .class-emoji { font-size: 64px; animation: float 4s ease-in-out infinite; }
  .class-level-badge { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.5); color: rgba(255,255,255,0.7); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
  .class-duration-badge { position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.5); color: rgba(255,255,255,0.6); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }

  .class-body { padding: 20px; }
  .class-cat { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 4px; }
  .class-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #FDF6EC; margin-bottom: 8px; }
  .class-desc { color: rgba(255,255,255,0.3); font-size: 13px; line-height: 1.6; margin-bottom: 14px; }

  .instructor-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .instructor-avatar { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; color: white; font-weight: 700; }
  .instructor-name { color: rgba(255,255,255,0.6); font-size: 13px; font-weight: 500; }
  .instructor-students { color: rgba(255,255,255,0.25); font-size: 11px; }

  .class-footer { display: flex; justify-content: space-between; align-items: center; }
  .class-rating { color: rgba(255,255,255,0.4); font-size: 13px; }
  .join-btn { padding: 9px 20px; border: none; border-radius: 10px; font-size: 12px; font-weight: 700; cursor: pointer; color: white; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
  .join-btn:hover { transform: translateY(-2px); opacity: 0.9; }

  @media (max-width: 768px) {
    .yoga-hero { padding: 50px 24px 80px; }
    .hero-title { font-size: 40px; }
    .yoga-main { padding: 40px 24px; }
    .classes-grid { grid-template-columns: 1fr; }
  }
`;

function Yoga() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  const filtered = classes.filter(c => {
    const matchCat = selectedCat === 'All' || c.category === selectedCat;
    const matchLevel = selectedLevel === 'All Levels' || c.level === selectedLevel;
    return matchCat && matchLevel;
  });

  return (
    <div className="yoga-page">
      <style>{CSS}</style>

      <div className="yoga-hero">
        <div className="hero-tag">🧘 Yoga & Naturopathy</div>
        <h1 className="hero-title">Find Your<span>Inner Balance</span></h1>
        <p className="hero-sub">Join live and on-demand yoga classes with certified instructors for complete mind-body wellness</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => window.location.href='/yoga-session'}>📅 Book Live Session</button>
          <button className="btn-outline" onClick={() => window.location.href='/yoga-progress'}>📊 My Progress</button>
        </div>
        <div className="stats-row">
          {[{ n: "50+", l: "Classes" }, { n: "25", l: "Instructors" }, { n: "8000+", l: "Students" }, { n: "4.9⭐", l: "Rating" }].map((s, i) => (
            <div key={i}><div className="stat-num">{s.n}</div><div className="stat-label">{s.l}</div></div>
          ))}
        </div>
      </div>

      <div className="yoga-main">
        <div className="section-title">Yoga Classes</div>
        <div className="section-sub">Choose from {filtered.length} classes</div>

        <div className="filters-wrap">
          {categories.map(cat => (
            <button key={cat} className={`filter-pill ${selectedCat === cat ? 'active' : ''}`} onClick={() => setSelectedCat(cat)}>{cat}</button>
          ))}
        </div>
        <div className="filters-wrap">
          {levels.map(level => (
            <button key={level} className={`filter-pill ${selectedLevel === level ? 'active' : ''}`} onClick={() => setSelectedLevel(level)}>{level}</button>
          ))}
        </div>

        <div className="classes-grid">
          {filtered.map(cls => (
            <div key={cls.id} className="class-card">
              <div className="class-top" style={{ background: `${cls.color}18` }}>
                <span className="class-emoji">{cls.emoji}</span>
                <span className="class-level-badge">{cls.level}</span>
                <span className="class-duration-badge">⏱️ {cls.duration}</span>
              </div>
              <div className="class-body">
                <div className="class-cat" style={{ color: cls.color }}>{cls.category}</div>
                <div className="class-name">{cls.name}</div>
                <div className="class-desc">{cls.desc}</div>
                <div className="instructor-row">
                  <div className="instructor-avatar" style={{ background: cls.color }}>{cls.instructor.split(' ')[1][0]}</div>
                  <div>
                    <div className="instructor-name">{cls.instructor}</div>
                    <div className="instructor-students">{cls.students.toLocaleString()} students</div>
                  </div>
                </div>
                <div className="class-footer">
                  <span className="class-rating">⭐ {cls.rating}</span>
                  <button className="join-btn" style={{ background: cls.color }} onClick={() => window.location.href='/yoga-session'}>Join Class →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Yoga;