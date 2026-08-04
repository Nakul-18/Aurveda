import React from 'react';

function ProfileTab({ user, handleLogout }) {
  return (
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
  );
}

export default ProfileTab;
