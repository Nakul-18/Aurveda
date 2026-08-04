import React from 'react';

function OverviewTab({ user, bookings, loadingBookings, prakriti }) {
  const upcomingCount = bookings.filter(b => b.status === 'upcoming').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;

  return (
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
  );
}

export default OverviewTab;
