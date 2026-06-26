import { useState } from 'react';

const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }

  .booking-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; padding: 60px; }
  .booking-header { margin-bottom: 48px; animation: slideUp 0.6s ease-out; }
  .back-btn { color: rgba(255,255,255,0.4); font-size: 14px; cursor: pointer; margin-bottom: 24px; display: inline-flex; align-items: center; gap: 8px; transition: color 0.2s; background: none; border: none; font-family: 'Poppins', sans-serif; }
  .back-btn:hover { color: white; }
  .page-title { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 900; color: #FDF6EC; margin-bottom: 8px; }
  .page-sub { color: rgba(255,255,255,0.35); font-size: 16px; }

  .booking-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 1000px; }

  .booking-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 28px; margin-bottom: 20px; animation: slideUp 0.6s ease-out; }
  .card-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #FDF6EC; margin-bottom: 20px; }

  .doctor-preview { display: flex; gap: 16px; align-items: center; }
  .doc-avatar { font-size: 52px; }
  .doc-name { font-family: 'Playfair Display', serif; font-size: 18px; color: #FDF6EC; margin-bottom: 4px; }
  .doc-spec { color: #C9973A; font-size: 13px; margin-bottom: 4px; }
  .doc-rating { color: rgba(255,255,255,0.4); font-size: 13px; }

  .consult-types { display: flex; gap: 12px; }
  .consult-type { flex: 1; padding: 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: rgba(255,255,255,0.5); font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .consult-type.active { background: rgba(232,101,10,0.1); border-color: #E8650A; color: #E8650A; }

  .symptoms-input { width: 100%; padding: 14px; background: #0A0A0A; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; font-size: 14px; color: #FDF6EC; outline: none; resize: none; font-family: 'Poppins', sans-serif; line-height: 1.6; }
  .symptoms-input:focus { border-color: #E8650A; }
  .symptoms-input::placeholder { color: rgba(255,255,255,0.2); }

  .date-input { width: 100%; padding: 14px 16px; background: #0A0A0A; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; font-size: 15px; color: #FDF6EC; outline: none; font-family: 'Poppins', sans-serif; }
  .date-input:focus { border-color: #E8650A; }

  .time-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .time-slot { padding: 12px 8px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .time-slot.active { background: rgba(232,101,10,0.1); border-color: #E8650A; color: #E8650A; }
  .time-slot:hover:not(.active) { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); }

  .confirm-btn { width: 100%; padding: 18px; background: #E8650A; color: white; border: none; border-radius: 14px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s; font-family: 'Poppins', sans-serif; margin-top: 8px; }
  .confirm-btn:hover { background: #D05508; transform: translateY(-2px); box-shadow: 0 15px 40px rgba(232,101,10,0.3); }

  .success-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.3s; backdrop-filter: blur(10px); }
  .success-card { background: #111; border: 1px solid rgba(255,255,255,0.08); border-radius: 28px; padding: 60px 48px; text-align: center; max-width: 440px; width: 90%; animation: slideUp 0.5s ease-out; }
  .success-icon { font-size: 80px; margin-bottom: 24px; display: block; animation: pulse 2s ease-in-out infinite; }
  .success-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 900; color: #FDF6EC; margin-bottom: 12px; }
  .success-desc { color: rgba(255,255,255,0.4); font-size: 15px; line-height: 1.7; margin-bottom: 32px; }
  .success-details { background: #0A0A0A; border-radius: 14px; padding: 20px; margin-bottom: 28px; text-align: left; }
  .success-detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .success-detail-row:last-child { border-bottom: none; }
  .success-detail-label { color: rgba(255,255,255,0.3); font-size: 13px; }
  .success-detail-value { color: #FDF6EC; font-size: 13px; font-weight: 600; }
  .success-btn { width: 100%; padding: 16px; background: #E8650A; color: white; border: none; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; }

  @media (max-width: 768px) {
    .booking-page { padding: 32px 24px; }
    .page-title { font-size: 36px; }
    .booking-grid { grid-template-columns: 1fr; }
  }
`;

function Booking() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consultType, setConsultType] = useState('video');
  const [symptoms, setSymptoms] = useState('');
  const [booked, setBooked] = useState(false);

  return (
    <div className="booking-page">
      <style>{CSS}</style>

      {booked && (
        <div className="success-overlay">
          <div className="success-card">
            <span className="success-icon">✅</span>
            <div className="success-title">Booking Confirmed!</div>
            <p className="success-desc">Your appointment has been successfully booked.</p>
            <div className="success-details">
              {[
                { label: 'Doctor', value: 'Dr. Priya Sharma' },
                { label: 'Date', value: selectedDate || 'Not selected' },
                { label: 'Time', value: selectedSlot || 'Not selected' },
                { label: 'Type', value: consultType === 'video' ? '📹 Video Call' : '📞 Audio Call' },
                { label: 'Fee', value: '₹500' },
              ].map((item, i) => (
                <div key={i} className="success-detail-row">
                  <span className="success-detail-label">{item.label}</span>
                  <span className="success-detail-value">{item.value}</span>
                </div>
              ))}
            </div>
            <button className="success-btn" onClick={() => setBooked(false)}>Done</button>
          </div>
        </div>
      )}

      <div className="booking-header">
        <button className="back-btn" onClick={() => window.location.href='/doctors'}>← Back to Doctors</button>
        <div className="page-title">Book Appointment</div>
        <div className="page-sub">Schedule your consultation in minutes</div>
      </div>

      <div className="booking-grid">
        <div>
          <div className="booking-card">
            <div className="card-title">Your Doctor</div>
            <div className="doctor-preview">
              <div className="doc-avatar">👩‍⚕️</div>
              <div>
                <div className="doc-name">Dr. Priya Sharma</div>
                <div className="doc-spec">Panchakarma Specialist</div>
                <div className="doc-rating">⭐ 4.9 • ₹500 consultation fee</div>
              </div>
            </div>
          </div>

          <div className="booking-card">
            <div className="card-title">Consultation Type</div>
            <div className="consult-types">
              {[{ value: 'video', label: '📹 Video Call' }, { value: 'audio', label: '📞 Audio Call' }].map(type => (
                <button key={type.value} className={`consult-type ${consultType === type.value ? 'active' : ''}`} onClick={() => setConsultType(type.value)}>{type.label}</button>
              ))}
            </div>
          </div>

          <div className="booking-card">
            <div className="card-title">Describe Symptoms</div>
            <textarea className="symptoms-input" rows={5} placeholder="Tell the doctor about your health concerns, symptoms, and what you'd like to discuss..." value={symptoms} onChange={e => setSymptoms(e.target.value)} />
          </div>
        </div>

        <div>
          <div className="booking-card">
            <div className="card-title">Select Date</div>
            <input className="date-input" type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
          </div>

          <div className="booking-card">
            <div className="card-title">Select Time Slot</div>
            <div className="time-grid">
              {timeSlots.map(slot => (
                <button key={slot} className={`time-slot ${selectedSlot === slot ? 'active' : ''}`} onClick={() => setSelectedSlot(slot)}>{slot}</button>
              ))}
            </div>
          </div>

          <button className="confirm-btn" onClick={() => { if (!selectedDate || !selectedSlot) { alert('Please select date and time!'); return; } setBooked(true); }}>
            Confirm Booking — ₹500
          </button>
        </div>
      </div>
    </div>
  );
}

export default Booking;