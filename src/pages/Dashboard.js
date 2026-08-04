import { useState, useEffect } from 'react';

const API = 'http://localhost:5000/api';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

  .dash-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; display: flex; }

  .sidebar { width: 240px; background: #111; border-right: 1px solid rgba(255,255,255,.06); padding: 32px 16px; display: flex; flex-direction: column; position: fixed; height: 100vh; }
  .sidebar-logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: #FDF6EC; padding: 0 12px; margin-bottom: 48px; cursor: pointer; }
  .sidebar-logo span { color: #C9973A; }
  .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; cursor: pointer; transition: all .2s; color: rgba(255,255,255,.4); font-size: 14px; font-weight: 500; border: none; background: transparent; font-family: 'Poppins', sans-serif; width: 100%; text-align: left; }
  .nav-item.active { background: rgba(232,101,10,.1); color: #E8650A; }
  .nav-item:hover:not(.active) { background: rgba(255,255,255,.04); color: rgba(255,255,255,.7); }
  .nav-icon { font-size: 18px; }
  .sidebar-user { padding: 16px; background: rgba(255,255,255,.03); border-radius: 12px; }
  .user-avatar { width: 38px; height: 38px; background: #E8650A; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 16px; margin-bottom: 8px; }
  .user-name { color: #FDF6EC; font-size: 14px; font-weight: 600; }
  .user-role { color: rgba(255,255,255,.3); font-size: 12px; }
  .logout-sidebar { width: 100%; margin-top: 8px; padding: 8px; background: rgba(239,68,68,.08); border: 1px solid rgba(239,68,68,.15); color: #ef4444; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'Poppins', sans-serif; }

  .dash-main { flex: 1; margin-left: 240px; padding: 48px; }
  .dash-greeting { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: #FDF6EC; margin-bottom: 8px; }
  .dash-date { color: rgba(255,255,255,.3); font-size: 14px; margin-bottom: 40px; }

  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
  .stat-card { background: #111; border: 1px solid rgba(255,255,255,.06); border-radius: 18px; padding: 24px; animation: slideUp .6s ease-out; transition: all .3s; }
  .stat-card:hover { border-color: rgba(255,255,255,.12); transform: translateY(-3px); }
  .stat-icon { font-size: 28px; margin-bottom: 16px; }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; margin-bottom: 4px; }
  .stat-label { color: rgba(255,255,255,.3); font-size: 13px; }

  .section-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: #FDF6EC; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
  .live-badge { background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.2); color: #22c55e; padding: 3px 8px; border-radius: 20px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 4px; }
  .live-dot { width: 5px; height: 5px; border-radius: 50%; background: #22c55e; animation: pulse 1.5s ease-in-out infinite; }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .dash-card { background: #111; border: 1px solid rgba(255,255,255,.06); border-radius: 20px; padding: 28px; animation: slideUp .6s ease-out; }

  .apt-item { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.04); }
  .apt-item:last-child { border-bottom: none; }
  .apt-emoji { font-size: 36px; }
  .apt-name { color: #FDF6EC; font-size: 14px; font-weight: 600; margin-bottom: 2px; }
  .apt-meta { color: rgba(255,255,255,.3); font-size: 12px; }
  .apt-status { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-left: auto; white-space: nowrap; }
  .status-upcoming { background: rgba(34,197,94,.1); color: #22c55e; }
  .status-completed { background: rgba(255,255,255,.06); color: rgba(255,255,255,.3); }
  .status-cancelled { background: rgba(239,68,68,.1); color: #ef4444; }

  .empty-state { text-align: center; padding: 40px; color: rgba(255,255,255,.2); font-size: 14px; }
  .empty-emoji-s { font-size: 40px; display: block; margin-bottom: 10px; }

  .loading-wrap { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,.3); font-size: 14px; padding: 20px 0; }
  .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,.1); border-top-color: #E8650A; border-radius: 50%; animation: spin 1s linear infinite; }

  .prakriti-card { background: linear-gradient(135deg, #0F1F23, #1A3C2E); border: 1px solid rgba(255,255,255,.06); border-radius: 20px; padding: 28px; margin-top: 24px; animation: slideUp .6s ease-out; }
  .prakriti-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 20px; }
  .dosha-card { background: rgba(255,255,255,.04); border-radius: 14px; padding: 18px; text-align: center; }
  .dosha-emoji { font-size: 32px; margin-bottom: 8px; }
  .dosha-name { font-size: 14px; font-weight: 700; margin-bottom: 8px; }
  .dosha-bar { height: 6px; background: rgba(255,255,255,.08); border-radius: 3px; margin-bottom: 8px; overflow: hidden; }
  .dosha-fill { height: 100%; border-radius: 3px; }
  .dosha-percent { font-size: 20px; font-weight: 800; }

  .not-logged-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; }
  .nl-emoji { font-size: 80px; margin-bottom: 24px; }
  .nl-title { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: #FDF6EC; margin-bottom: 12px; }
  .nl-sub { color: rgba(255,255,255,.3); font-size: 16px; margin-bottom: 32px; }
  .nl-btn { background: #E8650A; color: white; border: none; padding: 16px 40px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; }

  .book-now-btn { background: #E8650A; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; transition: all .2s; }
  .book-now-btn:hover { background: #D05508; }

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
  const [bookings, setBookings] = useState([]);
  const [prakriti, setPrakriti] = useState(null);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingPrakriti, setLoadingPrakriti] = useState(true);

  const token = localStorage.getItem('arogyamed_token');
  const user = JSON.parse(localStorage.getItem('arogyamed_user') || 'null');

  const navItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'appointments', icon: '📅', label: 'Appointments' },
    { id: 'prakriti', icon: '🌿', label: 'Prakriti' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  useEffect(() => {
    if (token) {
      fetchBookings();
      fetchPrakriti();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch(`${API}/booking/my`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setBookings(data.bookings);
    } catch (err) {
      console.error('Failed to fetch bookings');
    }
    setLoadingBookings(false);
  };

  const fetchPrakriti = async () => {
    setLoadingPrakriti(true);
    try {
      const res = await fetch(`${API}/prakriti/my`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setPrakriti(data.prakriti);
    } catch (err) {
      console.error('Failed to fetch prakriti');
    }
    setLoadingPrakriti(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('arogyamed_token');
    localStorage.removeItem('arogyamed_user');
    window.location.href = '/login';
  };

  const upcomingCount = bookings.filter(b => b.status === 'upcoming').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;

  if (!token || !user) {
    return (
      <div className="dash-page">
        <style>{CSS}</style>
        <div className="dash-main">
          <div className="not-logged-wrap">
            <div className="nl-emoji">🔐</div>
            <div className="nl-title">Please Login First</div>
            <div className="nl-sub">You need to be logged in to view your dashboard</div>
            <button className="nl-btn" onClick={() => window.location.href = '/login'}>Login Now →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-page">
      <style>{CSS}</style>

      <div className="sidebar">
        <div className="sidebar-logo" onClick={() => window.location.href = '/'}>Ārogya<span>Med</span></div>
        <div className="sidebar-nav">
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="sidebar-user">
          <div className="user-avatar">{user.name ? user.name[0].toUpperCase() : 'U'}</div>
          <div className="user-name">{user.name}</div>
          <div className="user-role">Patient</div>
          <button className="logout-sidebar" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>

      <div className="dash-main">
        {activeTab === 'overview' && (
          <>
            <div className="dash-greeting">Good Morning, {user.name?.split(' ')[0]} 👋</div>
            <div className="dash-date">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>

            <div className="stats-row">
              {[
                { icon: "📅", value: bookings.length, label: "Total Consultations", color: "#E8650A" },
                { icon: "🟢", value: upcomingCount, label: "Upcoming", color: "#22c55e" },
                { icon: "✅", value: completedCount, label: "Completed", color: "#C9973A" },
                { icon: "🌿", value: prakriti ? prakriti.result : "N/A", label: "Prakriti Type", color: "#2D6A4F" },
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
                <div className="section-title">
                  Recent Appointments
                  <span className="live-badge"><span className="live-dot"/>Live</span>
                </div>
                {loadingBookings ? (
                  <div className="loading-wrap"><div className="spinner"/>Loading...</div>
                ) : bookings.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-emoji-s">📅</span>
                    No appointments yet
                    <br/>
                    <button className="book-now-btn" style={{ marginTop: '12px' }} onClick={() => window.location.href = '/doctors'}>Book Now →</button>
                  </div>
                ) : (
                  bookings.slice(0, 4).map((apt, i) => (
                    <div key={i} className="apt-item">
                      <div className="apt-emoji">👩‍⚕️</div>
                      <div>
                        <div className="apt-name">{apt.doctor_name}</div>
                        <div className="apt-meta">{apt.date} • {apt.time_slot} • {apt.consultation_type}</div>
                      </div>
                      <span className={`apt-status status-${apt.status}`}>
                        {apt.status === 'upcoming' ? '🟢 Upcoming' : apt.status === 'completed' ? '✅ Done' : '❌ Cancelled'}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="dash-card">
                <div className="section-title">Quick Actions</div>
                {[
                  { icon: '🩺', label: 'Book Consultation', url: '/doctors' },
                  { icon: '🌿', label: 'Take Prakriti Quiz', url: '/prakriti-quiz' },
                  { icon: '🧘', label: 'Join Yoga Session', url: '/yoga-session' },
                  { icon: '💊', label: 'Medicine Reminder', url: '/medicine-reminder' },
                  { icon: '🔍', label: 'Check Symptoms', url: '/symptom-checker' },
                  { icon: '🥗', label: 'View Diet Plan', url: '/diet-plan' },
                ].map((action, i) => (
                  <div key={i} className="apt-item" style={{ cursor: 'pointer' }} onClick={() => window.location.href = action.url}>
                    <div className="apt-emoji">{action.icon}</div>
                    <div className="apt-name">{action.label}</div>
                    <span style={{ color: '#E8650A', marginLeft: 'auto' }}>→</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'appointments' && (
          <>
            <div className="dash-greeting">My Appointments</div>
            <div className="dash-date">All your consultations from database</div>
            <div className="dash-card" style={{ marginTop: '24px' }}>
              {loadingBookings ? (
                <div className="loading-wrap"><div className="spinner"/>Loading from database...</div>
              ) : bookings.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-emoji-s">📅</span>
                  No appointments yet. Book your first consultation!
                  <br/>
                  <button className="book-now-btn" style={{ marginTop: '12px' }} onClick={() => window.location.href = '/doctors'}>Book Now →</button>
                </div>
              ) : (
                bookings.map((apt, i) => (
                  <div key={i} className="apt-item">
                    <div className="apt-emoji">👩‍⚕️</div>
                    <div>
                      <div className="apt-name">{apt.doctor_name}</div>
                      <div className="apt-meta">{apt.specialization} • {apt.date} • {apt.time_slot} • {apt.consultation_type}</div>
                    </div>
                    <span className={`apt-status status-${apt.status}`}>
                      {apt.status === 'upcoming' ? '🟢 Upcoming' : apt.status === 'completed' ? '✅ Done' : '❌ Cancelled'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'prakriti' && (
          <>
            <div className="dash-greeting">My Prakriti</div>
            <div className="dash-date">Your Ayurvedic body type analysis</div>
            {loadingPrakriti ? (
              <div className="loading-wrap" style={{ marginTop: '24px' }}><div className="spinner"/>Loading prakriti data...</div>
            ) : !prakriti ? (
              <div className="dash-card" style={{ marginTop: '24px', textAlign: 'center', padding: '60px' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🌿</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#FDF6EC', marginBottom: '12px' }}>No Prakriti Result Yet</div>
                <div style={{ color: 'rgba(255,255,255,.3)', marginBottom: '24px' }}>Take the Prakriti quiz to discover your Ayurvedic body type</div>
                <button className="book-now-btn" onClick={() => window.location.href = '/prakriti-quiz'}>Take Prakriti Quiz →</button>
              </div>
            ) : (
              <div className="prakriti-card">
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '80px', marginBottom: '16px' }}>
                    {prakriti.result === 'vata' ? '🌬️' : prakriti.result === 'pitta' ? '🔥' : '💧'}
                  </div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: '900', color: '#E8650A', marginBottom: '8px', textTransform: 'capitalize' }}>
                    {prakriti.result} Prakriti
                  </div>
                </div>
                <div className="prakriti-grid">
                  {[
                    { emoji: '🌬️', name: 'Vata', score: prakriti.vata_score, color: '#E8650A' },
                    { emoji: '🔥', name: 'Pitta', score: prakriti.pitta_score, color: '#C9973A' },
                    { emoji: '💧', name: 'Kapha', score: prakriti.kapha_score, color: '#2D6A4F' },
                  ].map((dosha, i) => {
                    const total = prakriti.vata_score + prakriti.pitta_score + prakriti.kapha_score;
                    const percent = Math.round((dosha.score / total) * 100);
                    return (
                      <div key={i} className="dosha-card">
                        <div className="dosha-emoji">{dosha.emoji}</div>
                        <div className="dosha-name" style={{ color: dosha.color }}>{dosha.name}</div>
                        <div className="dosha-bar">
                          <div className="dosha-fill" style={{ width: `${percent}%`, background: dosha.color }} />
                        </div>
                        <div className="dosha-percent" style={{ color: dosha.color }}>{percent}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'profile' && (
          <>
            <div className="dash-greeting">My Profile</div>
            <div className="dash-date">Your account information</div>
            <div className="dash-card" style={{ marginTop: '24px', maxWidth: '500px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ width: '80px', height: '80px', background: '#E8650A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: 'white', fontWeight: '700' }}>
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#FDF6EC', fontWeight: '700' }}>{user.name}</div>
                  <div style={{ color: '#22c55e', fontSize: '13px', marginTop: '4px' }}>✅ Verified Patient</div>
                </div>
              </div>
              {[
                { label: 'Full Name', value: user.name, icon: '👤' },
                { label: 'Email Address', value: user.email, icon: '📧' },
                { label: 'Phone Number', value: user.phone, icon: '📱' },
                { label: 'Member Since', value: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' }), icon: '📅' },
              ].map((field, i) => (
                <div key={i} className="apt-item">
                  <div style={{ fontSize: '20px' }}>{field.icon}</div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,.3)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>{field.label}</div>
                    <div style={{ color: '#FDF6EC', fontSize: '15px', fontWeight: '600' }}>{field.value}</div>
                  </div>
                </div>
              ))}
              <button onClick={handleLogout} style={{ width: '100%', marginTop: '20px', padding: '14px', background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.2)', color: '#ef4444', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
                🚪 Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;