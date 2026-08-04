
const weekData = [
  { day: 'Mon', minutes: 45, done: true },
  { day: 'Tue', minutes: 30, done: true },
  { day: 'Wed', minutes: 60, done: true },
  { day: 'Thu', minutes: 0, done: false },
  { day: 'Fri', minutes: 45, done: true },
  { day: 'Sat', minutes: 75, done: true },
  { day: 'Sun', minutes: 30, done: true },
];

const achievements = [
  { name: "First Session", emoji: "🌟", desc: "Completed your first yoga session", earned: true },
  { name: "7 Day Streak", emoji: "🔥", desc: "Practiced 7 days in a row", earned: true },
  { name: "Early Bird", emoji: "🌅", desc: "Joined 5 morning sessions", earned: true },
  { name: "Flexibility Master", emoji: "🧘", desc: "Completed 20 sessions", earned: false },
  { name: "Zen Master", emoji: "☯️", desc: "Completed 50 meditation sessions", earned: false },
  { name: "Yoga Warrior", emoji: "⚔️", desc: "Practiced for 30 days straight", earned: false },
];

const recentSessions = [
  { name: "Morning Flow", instructor: "Yogi Priya", date: "Today", duration: "45 min", emoji: "🌅" },
  { name: "Pranayama", instructor: "Yogi Arjun", date: "Yesterday", duration: "30 min", emoji: "🌬️" },
  { name: "Hatha Yoga", instructor: "Yogi Meera", date: "2 days ago", duration: "60 min", emoji: "🧘" },
  { name: "Vinyasa Flow", instructor: "Yogi Vikram", date: "4 days ago", duration: "60 min", emoji: "🌊" },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

  .progress-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; }

  .progress-hero { background: linear-gradient(135deg, #0F1F23 0%, #1A3C2E 60%, #0F2E23 100%); padding: 80px 60px 100px; position: relative; overflow: hidden; }
  .progress-hero::before { content: '📊'; position: absolute; right: 40px; top: 0; font-size: 280px; opacity: 0.04; animation: float 8s ease-in-out infinite; }
  .progress-hero::after { content: ''; position: absolute; bottom: -60px; left: 0; right: 0; height: 120px; background: #0A0A0A; clip-path: ellipse(55% 100% at 50% 100%); }

  .hero-tag { display: inline-flex; gap: 8px; background: rgba(201,151,58,0.15); border: 1px solid rgba(201,151,58,0.3); color: #C9973A; padding: 8px 18px; border-radius: 30px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 900; color: #FDF6EC; line-height: 1.1; margin-bottom: 20px; }
  .hero-title span { color: #C9973A; display: block; }
  .hero-sub { color: rgba(253,246,236,0.5); font-size: 18px; max-width: 520px; font-weight: 300; }

  .progress-main { padding: 60px; }

  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
  .stat-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; padding: 24px; text-align: center; animation: slideUp 0.6s ease-out; transition: all 0.3s; }
  .stat-card:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-3px); }
  .stat-icon { font-size: 28px; margin-bottom: 12px; }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; margin-bottom: 4px; }
  .stat-label { color: rgba(255,255,255,0.25); font-size: 12px; }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .dash-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 28px; animation: slideUp 0.6s ease-out; }
  .card-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #FDF6EC; margin-bottom: 24px; }

  .week-chart { display: flex; align-items: flex-end; gap: 10px; height: 140px; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
  .bar { width: 100%; border-radius: 4px 4px 0 0; min-height: 4px; transition: height 1s ease-out; }
  .bar-day { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.25); }
  .bar-min { font-size: 10px; color: rgba(255,255,255,0.2); }

  .sessions-list { display: flex; flex-direction: column; gap: 10px; }
  .session-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.04); transition: all 0.2s; }
  .session-item:hover { background: rgba(255,255,255,0.05); }
  .session-emoji { font-size: 28px; }
  .session-name { color: #FDF6EC; font-size: 14px; font-weight: 600; margin-bottom: 2px; }
  .session-meta { color: rgba(255,255,255,0.25); font-size: 12px; }
  .session-dur { background: rgba(232,101,10,0.1); color: #E8650A; border: 1px solid rgba(232,101,10,0.2); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-left: auto; }

  .achievements-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 28px; animation: slideUp 0.6s ease-out; }
  .achievements-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 20px; }
  .achievement { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 18px; text-align: center; transition: all 0.3s; }
  .achievement.earned { background: rgba(201,151,58,0.06); border-color: rgba(201,151,58,0.2); }
  .achievement:hover { transform: translateY(-3px); }
  .achievement-emoji { font-size: 32px; margin-bottom: 8px; display: block; }
  .achievement.locked .achievement-emoji { filter: grayscale(1); opacity: 0.3; }
  .achievement-name { font-weight: 700; font-size: 13px; margin-bottom: 4px; }
  .achievement.earned .achievement-name { color: #C9973A; }
  .achievement:not(.earned) .achievement-name { color: rgba(255,255,255,0.3); }
  .achievement-desc { color: rgba(255,255,255,0.2); font-size: 11px; line-height: 1.4; }

  @media (max-width: 768px) {
    .progress-hero { padding: 50px 24px 80px; }
    .hero-title { font-size: 36px; }
    .progress-main { padding: 40px 24px; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
    .two-col { grid-template-columns: 1fr; }
    .achievements-grid { grid-template-columns: 1fr 1fr; }
  }
`;

function YogaProgress() {
  const maxMin = Math.max(...weekData.map(d => d.minutes));

  return (
    <div className="progress-page">
      <style>{CSS}</style>

      <div className="progress-hero">
        <div className="hero-tag">📊 My Progress</div>
        <h1 className="hero-title">Your Yoga<span>Journey</span></h1>
        <p className="hero-sub">Track your progress, celebrate achievements and stay motivated on your wellness journey</p>
      </div>

      <div className="progress-main">
        <div className="stats-grid">
          {[
            { icon: "🧘", value: "24", label: "Sessions Done", color: "#E8650A" },
            { icon: "⏱️", value: "18h", label: "Total Time", color: "#C9973A" },
            { icon: "🔥", value: "6", label: "Day Streak", color: "#F7931E" },
            { icon: "⭐", value: "3", label: "Achievements", color: "#2D6A4F" },
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="two-col">
          <div className="dash-card">
            <div className="card-title">📅 This Week</div>
            <div className="week-chart">
              {weekData.map((day, i) => (
                <div key={i} className="bar-col">
                  <div className="bar-min">{day.minutes > 0 ? `${day.minutes}m` : ''}</div>
                  <div className="bar" style={{ height: day.minutes > 0 ? `${(day.minutes / maxMin) * 100}px` : '4px', background: day.done ? '#E8650A' : 'rgba(255,255,255,0.06)' }} />
                  <div className="bar-day" style={{ color: day.done ? '#E8650A' : 'rgba(255,255,255,0.2)' }}>{day.day}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-card">
            <div className="card-title">🕒 Recent Sessions</div>
            <div className="sessions-list">
              {recentSessions.map((session, i) => (
                <div key={i} className="session-item">
                  <div className="session-emoji">{session.emoji}</div>
                  <div>
                    <div className="session-name">{session.name}</div>
                    <div className="session-meta">{session.instructor} • {session.date}</div>
                  </div>
                  <div className="session-dur">{session.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="achievements-card">
          <div className="card-title">🏆 Achievements</div>
          <div className="achievements-grid">
            {achievements.map((a, i) => (
              <div key={i} className={`achievement ${a.earned ? 'earned' : 'locked'}`}>
                <span className="achievement-emoji">{a.emoji}</span>
                <div className="achievement-name">{a.name}</div>
                <div className="achievement-desc">{a.earned ? a.desc : '🔒 ' + a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YogaProgress;