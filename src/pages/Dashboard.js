import { useState } from 'react';

const appointments = [
  { id: 1, doctor: "Dr. Priya Sharma", spec: "Panchakarma Specialist", date: "June 12, 2026", time: "10:00 AM", type: "Video Call", status: "upcoming", emoji: "👩‍⚕️" },
  { id: 2, doctor: "Dr. Arjun Nair", spec: "Ayurvedic Physician", date: "June 5, 2026", time: "11:30 AM", type: "Audio Call", status: "completed", emoji: "👨‍⚕️" },
  { id: 3, doctor: "Dr. Vikram Joshi", spec: "Herbal Medicine", date: "May 28, 2026", time: "3:00 PM", type: "Video Call", status: "completed", emoji: "👨‍⚕️" },
];

const prescriptions = [
  { id: 1, doctor: "Dr. Arjun Nair", date: "June 5, 2026", medicines: ["Ashwagandha 500mg", "Triphala Churna", "Brahmi Ghee"] },
  { id: 2, doctor: "Dr. Vikram Joshi", date: "May 28, 2026", medicines: ["Chyawanprash", "Neem Capsules"] },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'appointments', label: '📅 Appointments' },
    { id: 'prescriptions', label: '💊 Prescriptions' },
    { id: 'prakriti', label: '🌿 Prakriti' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F3F4F6', fontFamily: 'Inter, sans-serif' }}>

      {/* TOP BAR */}
      <div style={{ background: '#1A3C2E', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'serif', fontSize: '22px', color: '#FDF6EC', fontWeight: '700' }}>
          Ārogya<span style={{ color: '#C9973A' }}>Med</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'rgba(253,246,236,0.7)', fontSize: '14px' }}>Welcome, Shubham 👋</span>
          <div style={{
            width: '38px', height: '38px',
            background: '#C9973A',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: '700', fontSize: '16px'
          }}>S</div>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 62px)' }}>

        {/* SIDEBAR */}
        <div style={{ width: '220px', background: 'white', padding: '24px 16px', borderRight: '1px solid #E5E7EB' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '10px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                marginBottom: '6px',
                background: activeTab === tab.id ? '#1A3C2E' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#6B7280',
                transition: 'all 0.2s'
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ fontFamily: 'serif', fontSize: '28px', color: '#1A3C2E', marginBottom: '24px' }}>
                Your Health Overview
              </h2>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                {[
                  { label: 'Total Consultations', value: '3', icon: '🩺', color: '#1A3C2E' },
                  { label: 'Upcoming', value: '1', icon: '📅', color: '#E8650A' },
                  { label: 'Prescriptions', value: '2', icon: '💊', color: '#C9973A' },
                  { label: 'Prakriti Type', value: 'Vata', icon: '🌿', color: '#2D6A4F' },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: 'white',
                    borderRadius: '14px',
                    padding: '20px',
                    border: '1px solid #E5E7EB'
                  }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: stat.color, fontFamily: 'serif' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Upcoming Appointment */}
              <h3 style={{ fontFamily: 'serif', fontSize: '20px', color: '#1A3C2E', marginBottom: '16px' }}>
                Next Appointment
              </h3>
              <div style={{
                background: 'linear-gradient(135deg, #1A3C2E, #2D6A4F)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ fontSize: '48px' }}>👩‍⚕️</div>
                  <div>
                    <h4 style={{ color: '#FDF6EC', fontSize: '18px', fontFamily: 'serif', marginBottom: '4px' }}>
                      Dr. Priya Sharma
                    </h4>
                    <p style={{ color: '#C9973A', fontSize: '13px', marginBottom: '4px' }}>Panchakarma Specialist</p>
                    <p style={{ color: 'rgba(253,246,236,0.7)', fontSize: '13px' }}>📅 June 12, 2026 • 10:00 AM • 📹 Video Call</p>
                  </div>
                </div>
                <button style={{
                  background: '#E8650A',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Join Call
                </button>
              </div>
            </div>
          )}

          {/* APPOINTMENTS TAB */}
          {activeTab === 'appointments' && (
            <div>
              <h2 style={{ fontFamily: 'serif', fontSize: '28px', color: '#1A3C2E', marginBottom: '24px' }}>
                Your Appointments
              </h2>
              {appointments.map(apt => (
                <div key={apt.id} style={{
                  background: 'white',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  marginBottom: '16px',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ fontSize: '40px' }}>{apt.emoji}</div>
                    <div>
                      <h4 style={{ fontFamily: 'serif', fontSize: '16px', color: '#1A3C2E', marginBottom: '2px' }}>{apt.doctor}</h4>
                      <p style={{ color: '#E8650A', fontSize: '13px', marginBottom: '4px' }}>{apt.spec}</p>
                      <p style={{ color: '#6B7280', fontSize: '13px' }}>📅 {apt.date} • {apt.time} • {apt.type}</p>
                    </div>
                  </div>
                  <span style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: apt.status === 'upcoming' ? 'rgba(34,197,94,0.1)' : 'rgba(107,114,128,0.1)',
                    color: apt.status === 'upcoming' ? '#16a34a' : '#6B7280'
                  }}>
                    {apt.status === 'upcoming' ? '🟢 Upcoming' : '✅ Completed'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* PRESCRIPTIONS TAB */}
          {activeTab === 'prescriptions' && (
            <div>
              <h2 style={{ fontFamily: 'serif', fontSize: '28px', color: '#1A3C2E', marginBottom: '24px' }}>
                Your Prescriptions
              </h2>
              {prescriptions.map(rx => (
                <div key={rx.id} style={{
                  background: 'white',
                  borderRadius: '14px',
                  padding: '24px',
                  marginBottom: '16px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ fontFamily: 'serif', fontSize: '16px', color: '#1A3C2E', marginBottom: '4px' }}>
                        Prescribed by {rx.doctor}
                      </h4>
                      <p style={{ color: '#6B7280', fontSize: '13px' }}>📅 {rx.date}</p>
                    </div>
                    <button style={{
                      background: '#1A3C2E',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>
                      Download PDF
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {rx.medicines.map((med, i) => (
                      <span key={i} style={{
                        background: '#FDF6EC',
                        border: '1px solid #C9973A',
                        color: '#1A3C2E',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}>
                        🌿 {med}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PRAKRITI TAB */}
          {activeTab === 'prakriti' && (
            <div>
              <h2 style={{ fontFamily: 'serif', fontSize: '28px', color: '#1A3C2E', marginBottom: '24px' }}>
                Your Prakriti Profile
              </h2>
              <div style={{
                background: 'linear-gradient(135deg, #1A3C2E, #2D6A4F)',
                borderRadius: '16px',
                padding: '32px',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🌬️</div>
                <h3 style={{ fontFamily: 'serif', fontSize: '32px', color: '#C9973A', marginBottom: '8px' }}>Vata Prakriti</h3>
                <p style={{ color: 'rgba(253,246,236,0.7)', fontSize: '15px' }}>
                  You are governed by the elements of Air and Space
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {[
                  { type: 'Vata', percent: 65, color: '#E8650A', icon: '🌬️' },
                  { type: 'Pitta', percent: 25, color: '#C9973A', icon: '🔥' },
                  { type: 'Kapha', percent: 10, color: '#2D6A4F', icon: '💧' },
                ].map((dosha, i) => (
                  <div key={i} style={{
                    background: 'white',
                    borderRadius: '14px',
                    padding: '20px',
                    border: '1px solid #E5E7EB',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>{dosha.icon}</div>
                    <h4 style={{ fontFamily: 'serif', fontSize: '18px', color: '#1A3C2E', marginBottom: '8px' }}>{dosha.type}</h4>
                    <div style={{
                      height: '8px',
                      background: '#F3F4F6',
                      borderRadius: '4px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${dosha.percent}%`,
                        background: dosha.color,
                        borderRadius: '4px'
                      }} />
                    </div>
                    <p style={{ fontSize: '18px', fontWeight: '700', color: dosha.color }}>{dosha.percent}%</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;