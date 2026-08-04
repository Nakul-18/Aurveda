import React from 'react';

function AppointmentsTab({ bookings, loadingBookings }) {
  return (
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
  );
}

export default AppointmentsTab;
