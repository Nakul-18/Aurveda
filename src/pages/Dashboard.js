import { useState } from 'react';

const appointments = [
  { id: 1, doctor: "Dr. Priya Sharma", spec: "Panchakarma Specialist", date: "June 20, 2026", time: "10:00 AM", type: "Video Call", status: "upcoming", emoji: "👩‍⚕️" },
  { id: 2, doctor: "Dr. Arjun Nair", spec: "Ayurvedic Physician", date: "June 5, 2026", time: "11:30 AM", type: "Audio Call", status: "completed", emoji: "👨‍⚕️" },
  { id: 3, doctor: "Dr. Vikram Joshi", spec: "Herbal Medicine", date: "May 28, 2026", time: "3:00 PM", type: "Video Call", status: "completed", emoji: "👨‍⚕️" },
];

const prescriptions = [
  { id: 1, doctor: "Dr. Arjun Nair", date: "June 5, 2026", medicines: ["Ashwagandha 500mg", "Triphala Churna", "Brahmi Ghee"] },
  { id: 2, doctor: "Dr. Vikram Joshi", date: "May 28, 2026", medicines: ["Chyawanprash", "Neem Capsules"] },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

  .dash-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; display: flex; }

  .sidebar { width: 240px; background: #111; border-right: 1px solid rgba(255,255,255,0.06); padding: 32px 16px; display: flex; flex-direction: column; position: fixed; height: 100vh; }
  .sidebar-logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: #FDF6EC; padding: 0 12px; margin-bottom: 48px; }
  .sidebar-logo span { color: #C9973A; }
  .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.4); font-size: 14px; font-weight: 500; border: none; background: transparent; font-family: 'Poppins', sans-serif; width: 100%; text-align: left; }
  .nav-item.active { background: rgba(232,101,10,0.1); color: #E8650A; }
  .nav-item:hover:not(.active) { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.7); }
  .nav-icon { font-size: 18px; }
  .sidebar-user { padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px; display: flex; align-items: center; gap: 12px; }
  .user-avatar { width: 38px; height: 38px; background: #E8650A; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 16px; }
  .user-name { color: #FDF6EC; font-size: 14px; font-weight: 600; }
  .user-role { color: rgba(255,255,255,0.3); font-size: 12px; }

  .dash-main { flex: 1; margin-left: 240px; padding: 48px; }
  .dash-greeting { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: #FDF6EC; margin-bottom: 8px; }
  .dash-date { color: rgba(255,255,255,0.3); font-size: 14px; margin-bottom: 40px; }

  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
  .stat-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; padding: 24px; animation: slideUp 0.6s ease-out; transition: all 0.3s; }
  .stat-card:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-3px); }
  .stat-icon { font-size: 28px; margin-bottom: 16px; }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; margin-bottom: 4px; }
  .stat-label { color: rgba(255,255,255,0.3); font-size: 13px; }

  .section-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: #FDF6EC; margin-bottom: 20px; }

  .next-appointment { background: linear-gradient(135deg, #1A3C2E, #2D6A4F); border-radius: 20px; padding: 28px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; animation: slideUp 0.6s ease-out; }
  .apt-left { display: flex; gap: 16px; align-items: center; }
  .apt-emoji { font-size: 52px; }
  .apt-doc-name { font-family: 'Playfair Display', serif; font-size: 20px; color: #FDF6EC; margin-bottom: 4px; }
  .apt-spec { color: #C9973A; font-size: 14px; margin-bottom: 8px; }
  .apt-meta { color: rgba(255,255,255,0.5); font-size: 13px; }
  .join-btn { background: #E8650A; color: white; border: none; padding: 14px 28px; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
  .join-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(232,101,10,0.3); }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .dash-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 28px; animation: slideUp 0.6s ease-out; }

  .apt-item { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .apt-item:last-child { border-bottom: none; }
  .apt-item-emoji { font-size: 36px; }
  .apt-item-name { color: #FDF6EC; font-size: 14px; font-weight: 600; margin-bottom: 2px; }
  .apt-item-meta { color: rgba(255,255,255,0.3); font-size: 12px; }
  .apt-status { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-left: auto; }
  .status-upcoming { background: rgba(34,197,94,0.1); color: #22c55e; }
  .status-completed { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.3); }

  .rx-item { padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px; margin-bottom: 12px; }
  .rx-doctor { color: #FDF6EC; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .rx-date { color: rgba(255,255,255,0.3); font-size: 12px; margin-bottom: 10px; }
  .rx-meds { display: flex; flex-wrap: wrap; gap: 6px; }
  .rx-med { background: rgba(45,106,79,0.2); color: #2D6A4F; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; }

  .prakriti-card { background: linear-gradient(135deg, #0F1F23, #1A3C2E); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 28px; margin-top: 24px; animation: slideUp 0.6s ease-out; }
  .prakriti-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 20px; }
  .dosha-card { background: rgba(255,255,255,0.04); border-radius: 14px; padding: 18px; text-align: center; }
  .dosha-emoji { font-size: 32px; margin-bottom: 8px; }
  .dosha-name { font-size: 14px; font-weight: 700; margin-bottom: 8px; }
  .dosha-bar { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; margin-bottom: 8px; overflow: hidden; }
  .dosha-fill { height: 100%; border-radius: 3px; }
  .dosha-percent { font-size: 20px; font-weight: 800; }

  @media (max-width: 768px) {
    .sidebar { display: none; }
    .dash-main { margin-left: 0; padding: 24px; }
    .stats-row { grid-template-columns: 1fr 1fr; }
    .two-col { grid-template-columns: 1fr; }
    .prakriti-grid { grid-template-columns: 1fr; }
  }
`;

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'appointments', icon: '📅', label: 'Appointments' },
    { id: 'prescriptions', icon: '💊', label: 'Prescriptions' },
    { id: 'prakriti', icon: '🌿', label: 'Prakriti' },
  ];

  return (
    <div className="dash-page">
      <style>{CSS}</style>

      <div className="sidebar">
        <div className="sidebar-logo">Ārogya<span>Med</span></div>
        <div className="sidebar-nav">
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="sidebar-user">
          <div className="user-avatar">S</div>
          <div>
            <div className="user-name">Shubham</div>
            <div className="user-role">Patient</div>
          </div>
        </div>
      </div>

      <div className="dash-main">
        {activeTab === 'overview' && (
          <>
            <div className="dash-greeting">Good Morning, Shubham 👋</div>
            <div className="dash-date">Monday, June 15, 2026</div>

            <div className="stats-row">
              {[
                { icon: "🩺", value: "3", label: "Total Consultations", color: "#E8650A" },
                { icon: "📅", value: "1", label: "Upcoming", color: "#22c55e" },
                { icon: "💊", value: "2", label: "Prescriptions", color: "#C9973A" },
                { icon: "🌿", value: "Vata", label: "Prakriti Type", color: "#2D6A4F" },
              ].map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="section-title">Next Appointment</div>
            <div className="next-appointment">
              <div className="apt-left">
                <div className="apt-emoji">👩‍⚕️</div>
                <div>
                  <div className="apt-doc-name">Dr. Priya Sharma</div>
                  <div className="apt-spec">Panchakarma Specialist</div>
                  <div className="apt-meta">📅 June 20, 2026 • 10:00 AM • 📹 Video Call</div>
                </div>
              </div>
              <button className="join-btn">Join Call →</button>
            </div>

            <div className="two-col">
              <div className="dash-card">
                <div className="section-title">Recent Appointments</div>
                {appointments.map(apt => (
                  <div key={apt.id} className="apt-item">
                    <div className="apt-item-emoji">{apt.emoji}</div>
                    <div>
                      <div className="apt-item-name">{apt.doctor}</div>
                      <div className="apt-item-meta">{apt.date} • {apt.time}</div>
                    </div>
                    <span className={`apt-status ${apt.status === 'upcoming' ? 'status-upcoming' : 'status-completed'}`}>
                      {apt.status === 'upcoming' ? '🟢 Upcoming' : '✅ Done'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="dash-card">
                <div className="section-title">Recent Prescriptions</div>
                {prescriptions.map(rx => (
                  <div key={rx.id} className="rx-item">
                    <div className="rx-doctor">{rx.doctor}</div>
                    <div className="rx-date">{rx.date}</div>
                    <div className="rx-meds">
                      {rx.medicines.map((med, i) => (
                        <span key={i} className="rx-med">🌿 {med}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'appointments' && (
          <>
            <div className="dash-greeting">Appointments</div>
            <div className="dash-date">All your consultations</div>
            <div className="dash-card" style={{ marginTop: '24px' }}>
              {appointments.map(apt => (
                <div key={apt.id} className="apt-item">
                  <div className="apt-item-emoji">{apt.emoji}</div>
                  <div>
                    <div className="apt-item-name">{apt.doctor}</div>
                    <div className="apt-item-meta">{apt.spec} • {apt.date} • {apt.time} • {apt.type}</div>
                  </div>
                  <span className={`apt-status ${apt.status === 'upcoming' ? 'status-upcoming' : 'status-completed'}`}>
                    {apt.status === 'upcoming' ? '🟢 Upcoming' : '✅ Done'}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'prescriptions' && (
          <>
            <div className="dash-greeting">Prescriptions</div>
            <div className="dash-date">Your Ayurvedic medicines</div>
            <div style={{ marginTop: '24px' }}>
              {prescriptions.map(rx => (
                <div key={rx.id} className="dash-card" style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <div className="rx-doctor">{rx.doctor}</div>
                      <div className="rx-date">{rx.date}</div>
                    </div>
                    <button style={{ background: 'rgba(232,101,10,0.1)', color: '#E8650A', border: '1px solid rgba(232,101,10,0.3)', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>Download PDF</button>
                  </div>
                  <div className="rx-meds">
                    {rx.medicines.map((med, i) => (
                      <span key={i} className="rx-med">🌿 {med}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'prakriti' && (
          <>
            <div className="dash-greeting">Your Prakriti</div>
            <div className="dash-date">Ayurvedic body type analysis</div>
            <div className="prakriti-card">
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '80px', marginBottom: '16px' }}>🌬️</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: '900', color: '#E8650A', marginBottom: '8px' }}>Vata Prakriti</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Air & Space Element</div>
              </div>
              <div className="prakriti-grid">
                {[
                  { emoji: '🌬️', name: 'Vata', percent: 65, color: '#E8650A' },
                  { emoji: '🔥', name: 'Pitta', percent: 25, color: '#C9973A' },
                  { emoji: '💧', name: 'Kapha', percent: 10, color: '#2D6A4F' },
                ].map((dosha, i) => (
                  <div key={i} className="dosha-card">
                    <div className="dosha-emoji">{dosha.emoji}</div>
                    <div className="dosha-name" style={{ color: dosha.color }}>{dosha.name}</div>
                    <div className="dosha-bar">
                      <div className="dosha-fill" style={{ width: `${dosha.percent}%`, background: dosha.color }} />
                    </div>
                    <div className="dosha-percent" style={{ color: dosha.color }}>{dosha.percent}%</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;