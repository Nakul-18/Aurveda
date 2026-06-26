import { useState } from 'react';

const sessions = [
  { id: 1, name: "Morning Flow", instructor: "Yogi Priya", time: "6:00 AM", duration: "45 min", spots: 8, totalSpots: 20, emoji: "🌅", color: "#E8650A", level: "Beginner", date: "Daily" },
  { id: 2, name: "Power Vinyasa", instructor: "Yogi Vikram", time: "7:30 AM", duration: "60 min", spots: 3, totalSpots: 15, emoji: "💪", color: "#F7931E", level: "Intermediate", date: "Mon, Wed, Fri" },
  { id: 3, name: "Meditation & Pranayama", instructor: "Yogi Arjun", time: "8:00 AM", duration: "30 min", spots: 12, totalSpots: 25, emoji: "🧘", color: "#2D6A4F", level: "All Levels", date: "Daily" },
  { id: 4, name: "Yin & Restore", instructor: "Yogi Lakshmi", time: "6:00 PM", duration: "60 min", spots: 5, totalSpots: 20, emoji: "🌙", color: "#1A3C2E", level: "All Levels", date: "Tue, Thu, Sat" },
  { id: 5, name: "Kundalini Awakening", instructor: "Yogi Suresh", time: "7:00 PM", duration: "75 min", spots: 6, totalSpots: 12, emoji: "🔥", color: "#C9973A", level: "Advanced", date: "Mon, Wed, Fri" },
  { id: 6, name: "Kids Yoga", instructor: "Yogi Meera", time: "4:00 PM", duration: "30 min", spots: 10, totalSpots: 15, emoji: "🌈", color: "#FF6B35", level: "Beginner", date: "Sat, Sun" },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }

  .session-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; }

  .session-hero { background: linear-gradient(135deg, #0F1F23 0%, #1A3C2E 60%, #0F2E23 100%); padding: 80px 60px 100px; position: relative; overflow: hidden; }
  .session-hero::before { content: '🧘'; position: absolute; right: 40px; top: 0; font-size: 280px; opacity: 0.05; animation: float 8s ease-in-out infinite; }
  .session-hero::after { content: ''; position: absolute; bottom: -60px; left: 0; right: 0; height: 120px; background: #0A0A0A; clip-path: ellipse(55% 100% at 50% 100%); }

  .hero-tag { display: inline-flex; gap: 8px; background: rgba(201,151,58,0.15); border: 1px solid rgba(201,151,58,0.3); color: #C9973A; padding: 8px 18px; border-radius: 30px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 900; color: #FDF6EC; line-height: 1.1; margin-bottom: 20px; }
  .hero-title span { color: #C9973A; display: block; }
  .hero-sub { color: rgba(253,246,236,0.5); font-size: 18px; max-width: 520px; font-weight: 300; }

  .session-main { padding: 60px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: #FDF6EC; margin-bottom: 8px; }
  .section-sub { color: rgba(255,255,255,0.25); font-size: 15px; margin-bottom: 32px; }

  .sessions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }
  .session-card { background: #111; border: 2px solid rgba(255,255,255,0.06); border-radius: 20px; overflow: hidden; transition: all 0.35s; animation: slideUp 0.6s ease-out; cursor: pointer; }
  .session-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.12); box-shadow: 0 24px 60px rgba(0,0,0,0.5); }
  .session-card.selected { border-color: #E8650A; }

  .session-top { height: 130px; display: flex; align-items: center; justify-content: center; position: relative; }
  .session-emoji { font-size: 56px; animation: float 4s ease-in-out infinite; }
  .session-time-badge { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.6); color: rgba(255,255,255,0.8); padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; }
  .session-level-badge { position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.6); color: rgba(255,255,255,0.7); padding: 5px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }

  .session-body { padding: 20px; }
  .session-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #FDF6EC; margin-bottom: 4px; }
  .session-instructor { color: rgba(255,255,255,0.35); font-size: 13px; margin-bottom: 14px; }

  .session-details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
  .detail-box { background: #0A0A0A; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.04); }
  .d-label { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
  .d-value { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7); }

  .spots-wrap { margin-bottom: 14px; }
  .spots-row { display: flex; justify-content: space-between; margin-bottom: 6px; }
  .spots-label { color: rgba(255,255,255,0.25); font-size: 12px; }
  .spots-count { font-size: 12px; font-weight: 700; }
  .spots-track { height: 5px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; }
  .spots-fill { height: 100%; border-radius: 3px; transition: width 0.5s; }

  .book-session-btn { width: 100%; padding: 13px; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; color: white; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
  .book-session-btn:hover { transform: translateY(-2px); opacity: 0.9; }

  .success-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.3s; backdrop-filter: blur(10px); }
  .success-card { background: #111; border: 1px solid rgba(255,255,255,0.08); border-radius: 28px; padding: 60px 48px; text-align: center; max-width: 440px; width: 90%; animation: slideUp 0.5s ease-out; }
  .success-icon { font-size: 80px; margin-bottom: 24px; display: block; animation: pulse 2s ease-in-out infinite; }
  .success-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 900; color: #FDF6EC; margin-bottom: 12px; }
  .success-desc { color: rgba(255,255,255,0.4); font-size: 15px; line-height: 1.7; margin-bottom: 32px; }
  .success-close { background: #E8650A; color: white; border: none; padding: 16px 40px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; }

  @media (max-width: 768px) {
    .session-hero { padding: 50px 24px 80px; }
    .hero-title { font-size: 36px; }
    .session-main { padding: 40px 24px; }
    .sessions-grid { grid-template-columns: 1fr; }
  }
`;

function YogaSession() {
  const [selectedSession, setSelectedSession] = useState(null);
  const [booked, setBooked] = useState(false);

  return (
    <div className="session-page">
      <style>{CSS}</style>

      {booked && (
        <div className="success-overlay">
          <div className="success-card">
            <span className="success-icon">🎉</span>
            <div className="success-title">Session Booked!</div>
            <p className="success-desc">Your <strong>{selectedSession?.name}</strong> with <strong>{selectedSession?.instructor}</strong> at <strong>{selectedSession?.time}</strong> is confirmed!</p>
            <button className="success-close" onClick={() => { setBooked(false); setSelectedSession(null); }}>Done ✓</button>
          </div>
        </div>
      )}

      <div className="session-hero">
        <div className="hero-tag">🧘 Live Sessions</div>
        <h1 className="hero-title">Book Your<span>Live Session</span></h1>
        <p className="hero-sub">Join live yoga classes with certified instructors from the comfort of your home</p>
      </div>

      <div className="session-main">
        <div className="section-title">Available Sessions</div>
        <div className="section-sub">Choose and book your spot instantly</div>

        <div className="sessions-grid">
          {sessions.map(session => {
            const spotsPercent = ((session.totalSpots - session.spots) / session.totalSpots) * 100;
            const almostFull = session.spots <= 5;
            return (
              <div key={session.id} className={`session-card ${selectedSession?.id === session.id ? 'selected' : ''}`} onClick={() => setSelectedSession(session)}>
                <div className="session-top" style={{ background: `${session.color}18` }}>
                  <span className="session-emoji">{session.emoji}</span>
                  <span className="session-time-badge">🕐 {session.time}</span>
                  <span className="session-level-badge">{session.level}</span>
                </div>
                <div className="session-body">
                  <div className="session-name">{session.name}</div>
                  <div className="session-instructor">👤 {session.instructor}</div>
                  <div className="session-details">
                    <div className="detail-box">
                      <div className="d-label">Duration</div>
                      <div className="d-value">⏱️ {session.duration}</div>
                    </div>
                    <div className="detail-box">
                      <div className="d-label">Schedule</div>
                      <div className="d-value">📅 {session.date}</div>
                    </div>
                  </div>
                  <div className="spots-wrap">
                    <div className="spots-row">
                      <span className="spots-label">Spots Available</span>
                      <span className="spots-count" style={{ color: almostFull ? '#ef4444' : '#22c55e' }}>{session.spots} left {almostFull ? '🔥' : ''}</span>
                    </div>
                    <div className="spots-track">
                      <div className="spots-fill" style={{ width: `${spotsPercent}%`, background: almostFull ? '#ef4444' : session.color }} />
                    </div>
                  </div>
                  <button className="book-session-btn" style={{ background: session.color }} onClick={e => { e.stopPropagation(); setSelectedSession(session); setBooked(true); }}>
                    📅 Book This Session
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default YogaSession;