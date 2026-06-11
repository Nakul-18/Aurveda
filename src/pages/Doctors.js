import { useState } from 'react';

const doctors = [
  { id: 1, name: "Dr. Priya Sharma", spec: "Panchakarma Specialist", exp: "12 years", lang: "Hindi, English", fee: "₹500", rating: 4.9, reviews: 320, emoji: "👩‍⚕️", available: true },
  { id: 2, name: "Dr. Arjun Nair", spec: "Ayurvedic Physician", exp: "8 years", lang: "Malayalam, English", fee: "₹400", rating: 4.8, reviews: 210, emoji: "👨‍⚕️", available: true },
  { id: 3, name: "Dr. Meera Iyer", spec: "Yoga & Naturopathy", exp: "10 years", lang: "Tamil, Hindi", fee: "₹450", rating: 4.9, reviews: 180, emoji: "👩‍⚕️", available: false },
  { id: 4, name: "Dr. Vikram Joshi", spec: "Herbal Medicine", exp: "15 years", lang: "Marathi, Hindi", fee: "₹600", rating: 4.7, reviews: 290, emoji: "👨‍⚕️", available: true },
  { id: 5, name: "Dr. Anjali Singh", spec: "Dosha Balancing", exp: "6 years", lang: "Hindi, English", fee: "₹350", rating: 4.6, reviews: 150, emoji: "👩‍⚕️", available: true },
  { id: 6, name: "Dr. Ravi Kumar", spec: "Rasayana Therapy", exp: "20 years", lang: "Telugu, English", fee: "₹700", rating: 5.0, reviews: 410, emoji: "👨‍⚕️", available: false },
];

const specializations = ["All", "Panchakarma", "Ayurvedic Physician", "Yoga & Naturopathy", "Herbal Medicine", "Dosha Balancing", "Rasayana Therapy"];

function Doctors() {
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = doctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.spec.toLowerCase().includes(search.toLowerCase());
    const matchSpec = selectedSpec === 'All' || d.spec === selectedSpec;
    const matchAvail = availableOnly ? d.available : true;
    return matchSearch && matchSpec && matchAvail;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#FDF6EC', fontFamily: 'Inter, sans-serif' }}>

      {/* HEADER */}
      <div style={{ background: '#1A3C2E', padding: '40px 60px' }}>
        <h1 style={{ fontFamily: 'serif', color: '#FDF6EC', fontSize: '36px', marginBottom: '8px' }}>
          Find Your Vaidya
        </h1>
        <p style={{ color: 'rgba(253,246,236,0.6)', fontSize: '16px' }}>
          Connect with certified Ayurvedic doctors
        </p>

        {/* SEARCH */}
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔍 Search by name or specialization..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: '280px',
              padding: '14px 18px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '15px',
              outline: 'none'
            }}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FDF6EC', fontSize: '14px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={e => setAvailableOnly(e.target.checked)}
            />
            Available Today
          </label>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ background: 'white', padding: '16px 60px', display: 'flex', gap: '10px', flexWrap: 'wrap', borderBottom: '1px solid #E5E7EB' }}>
        {specializations.map(spec => (
          <button
            key={spec}
            onClick={() => setSelectedSpec(spec)}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: '1.5px solid',
              borderColor: selectedSpec === spec ? '#1A3C2E' : '#E5E7EB',
              background: selectedSpec === spec ? '#1A3C2E' : 'white',
              color: selectedSpec === spec ? 'white' : '#6B7280',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
            {spec}
          </button>
        ))}
      </div>

      {/* DOCTORS GRID */}
      <div style={{ padding: '40px 60px' }}>
        <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px' }}>
          Showing {filtered.length} doctors
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {filtered.map(doctor => (
            <div key={doctor.id} style={{
              background: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}>
              {/* Card Top */}
              <div style={{
                background: 'linear-gradient(135deg, #1A3C2E, #2D6A4F)',
                padding: '28px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ fontSize: '56px' }}>{doctor.emoji}</div>
                <div>
                  <h3 style={{ color: '#FDF6EC', fontSize: '18px', fontFamily: 'serif', marginBottom: '4px' }}>
                    {doctor.name}
                  </h3>
                  <p style={{ color: '#C9973A', fontSize: '13px', fontWeight: '500' }}>{doctor.spec}</p>
                  <span style={{
                    display: 'inline-block',
                    marginTop: '6px',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: doctor.available ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
                    color: doctor.available ? '#22c55e' : '#ef4444'
                  }}>
                    {doctor.available ? '🟢 Available Today' : '🔴 Not Available'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  {[
                    { label: 'Experience', value: doctor.exp },
                    { label: 'Languages', value: doctor.lang },
                    { label: 'Rating', value: `⭐ ${doctor.rating} (${doctor.reviews})` },
                    { label: 'Consultation Fee', value: doctor.fee },
                  ].map((item, i) => (
                    <div key={i}>
                      <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: '14px', color: '#1A1A1A', fontWeight: '500', marginTop: '2px' }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <button style={{
                  width: '100%',
                  padding: '12px',
                  background: doctor.available ? '#E8650A' : '#E5E7EB',
                  color: doctor.available ? 'white' : '#9CA3AF',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: doctor.available ? 'pointer' : 'not-allowed'
                }}>
                  {doctor.available ? 'Book Consultation' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;