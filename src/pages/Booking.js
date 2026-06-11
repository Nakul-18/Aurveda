import { useState } from 'react';

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
];

const doctor = {
  name: "Dr. Priya Sharma",
  spec: "Panchakarma Specialist",
  fee: "₹500",
  rating: 4.9,
  emoji: "👩‍⚕️"
};

function Booking() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consultType, setConsultType] = useState('video');
  const [symptoms, setSymptoms] = useState('');
  const [booked, setBooked] = useState(false);

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) {
      alert('Please select a date and time slot!');
      return;
    }
    setBooked(true);
  };

  if (booked) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#1A3C2E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '60px 40px',
          textAlign: 'center',
          maxWidth: '420px',
          width: '100%'
        }}>
          <div style={{ fontSize: '72px', marginBottom: '24px' }}>✅</div>
          <h2 style={{ fontFamily: 'serif', fontSize: '28px', color: '#1A3C2E', marginBottom: '12px' }}>
            Booking Confirmed!
          </h2>
          <p style={{ color: '#6B7280', fontSize: '15px', marginBottom: '24px' }}>
            Your appointment with <strong>{doctor.name}</strong> is confirmed for <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>.
          </p>
          <div style={{
            background: '#FDF6EC',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '28px',
            textAlign: 'left'
          }}>
            {[
              { label: 'Doctor', value: doctor.name },
              { label: 'Date', value: selectedDate },
              { label: 'Time', value: selectedSlot },
              { label: 'Type', value: consultType === 'video' ? '📹 Video Call' : '📞 Audio Call' },
              { label: 'Fee', value: doctor.fee },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#9CA3AF', fontSize: '13px' }}>{item.label}</span>
                <span style={{ color: '#1A1A1A', fontSize: '13px', fontWeight: '600' }}>{item.value}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setBooked(false)}
            style={{
              width: '100%',
              padding: '14px',
              background: '#E8650A',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
            Back to Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FDF6EC', fontFamily: 'Inter, sans-serif' }}>

      {/* HEADER */}
      <div style={{ background: '#1A3C2E', padding: '40px 60px' }}>
        <h1 style={{ fontFamily: 'serif', color: '#FDF6EC', fontSize: '32px', marginBottom: '4px' }}>
          Book Appointment
        </h1>
        <p style={{ color: 'rgba(253,246,236,0.6)', fontSize: '15px' }}>
          Schedule your consultation in minutes
        </p>
      </div>

      <div style={{ padding: '40px 60px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* LEFT SIDE */}
          <div>
            {/* Doctor Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              border: '1px solid #E5E7EB',
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '52px' }}>{doctor.emoji}</div>
              <div>
                <h3 style={{ fontFamily: 'serif', fontSize: '18px', color: '#1A3C2E', marginBottom: '4px' }}>
                  {doctor.name}
                </h3>
                <p style={{ color: '#E8650A', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>
                  {doctor.spec}
                </p>
                <p style={{ color: '#6B7280', fontSize: '13px' }}>
                  ⭐ {doctor.rating} • Consultation Fee: {doctor.fee}
                </p>
              </div>
            </div>

            {/* Consultation Type */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid #E5E7EB' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1A1A1A', marginBottom: '16px' }}>
                Consultation Type
              </h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { value: 'video', label: '📹 Video Call' },
                  { value: 'audio', label: '📞 Audio Call' },
                ].map(type => (
                  <button
                    key={type.value}
                    onClick={() => setConsultType(type.value)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1.5px solid',
                      borderColor: consultType === type.value ? '#1A3C2E' : '#E5E7EB',
                      background: consultType === type.value ? '#1A3C2E' : 'white',
                      color: consultType === type.value ? 'white' : '#6B7280',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #E5E7EB' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1A1A1A', marginBottom: '12px' }}>
                Describe Your Symptoms
              </h4>
              <textarea
                placeholder="Tell the doctor about your health concerns..."
                value={symptoms}
                onChange={e => setSymptoms(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1.5px solid #E5E7EB',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            {/* Date Picker */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid #E5E7EB' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1A1A1A', marginBottom: '12px' }}>
                Select Date
              </h4>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1.5px solid #E5E7EB',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  color: '#1A1A1A'
                }}
              />
            </div>

            {/* Time Slots */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid #E5E7EB' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1A1A1A', marginBottom: '16px' }}>
                Select Time Slot
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    style={{
                      padding: '10px 6px',
                      borderRadius: '8px',
                      border: '1.5px solid',
                      borderColor: selectedSlot === slot ? '#E8650A' : '#E5E7EB',
                      background: selectedSlot === slot ? '#E8650A' : 'white',
                      color: selectedSlot === slot ? 'white' : '#374151',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleBooking}
              style={{
                width: '100%',
                padding: '16px',
                background: '#E8650A',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
              Confirm Booking — {doctor.fee}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;