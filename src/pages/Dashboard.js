import { useState, useEffect } from 'react';
import OverviewTab from '../components/dashboard/OverviewTab';
import AppointmentsTab from '../components/dashboard/AppointmentsTab';
import PrakritiTab from '../components/dashboard/PrakritiTab';
import ProfileTab from '../components/dashboard/ProfileTab';

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
          <OverviewTab user={user} bookings={bookings} loadingBookings={loadingBookings} prakriti={prakriti} />
        )}
        {activeTab === 'appointments' && (
          <AppointmentsTab bookings={bookings} loadingBookings={loadingBookings} />
        )}
        {activeTab === 'prakriti' && (
          <PrakritiTab prakriti={prakriti} loadingPrakriti={loadingPrakriti} />
        )}
        {activeTab === 'profile' && (
          <ProfileTab user={user} handleLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;