import { useState } from 'react';

const initialMedicines = [
  { id: 1, name: "Ashwagandha", dosage: "500mg", time: "8:00 AM", frequency: "Daily", taken: true, emoji: "🌿", color: "#E8650A", instructions: "Take with warm water after breakfast" },
  { id: 2, name: "Triphala Churna", dosage: "1 tsp", time: "9:00 PM", frequency: "Daily", taken: false, emoji: "🍃", color: "#2D6A4F", instructions: "Take with warm water before bed" },
  { id: 3, name: "Brahmi Capsules", dosage: "250mg", time: "2:00 PM", frequency: "Twice Daily", taken: false, emoji: "🧠", color: "#C9973A", instructions: "Take after lunch" },
  { id: 4, name: "Chyawanprash", dosage: "1 tbsp", time: "7:00 AM", frequency: "Daily", taken: true, emoji: "🫙", color: "#F7931E", instructions: "Take with warm milk" },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes checkPop { 0% { transform: scale(0); } 60% { transform: scale(1.3); } 100% { transform: scale(1); } }

  .reminder-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; }

  .reminder-hero { background: linear-gradient(135deg, #0F1F23 0%, #1A3C2E 60%, #0F2E23 100%); padding: 80px 60px 100px; position: relative; overflow: hidden; }
  .reminder-hero::before { content: '💊'; position: absolute; right: 40px; top: 0; font-size: 280px; opacity: 0.05; animation: float 8s ease-in-out infinite; }
  .reminder-hero::after { content: ''; position: absolute; bottom: -60px; left: 0; right: 0; height: 120px; background: #0A0A0A; clip-path: ellipse(55% 100% at 50% 100%); }

  .hero-tag { display: inline-flex; gap: 8px; background: rgba(201,151,58,0.15); border: 1px solid rgba(201,151,58,0.3); color: #C9973A; padding: 8px 18px; border-radius: 30px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 900; color: #FDF6EC; line-height: 1.1; margin-bottom: 20px; }
  .hero-title span { color: #C9973A; display: block; }
  .hero-sub { color: rgba(253,246,236,0.5); font-size: 18px; max-width: 520px; font-weight: 300; margin-bottom: 40px; }

  .hero-stats { display: flex; gap: 48px; flex-wrap: wrap; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; color: #C9973A; }
  .stat-label { color: rgba(255,255,255,0.3); font-size: 12px; margin-top: 4px; }

  .reminder-main { padding: 60px; }
  .main-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; }

  .section-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #FDF6EC; margin-bottom: 4px; }
  .section-sub { color: rgba(255,255,255,0.25); font-size: 14px; margin-bottom: 28px; }

  .med-list { display: flex; flex-direction: column; gap: 14px; }
  .med-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 22px; display: flex; gap: 16px; align-items: center; transition: all 0.3s; animation: slideUp 0.6s ease-out; }
  .med-card:hover { border-color: rgba(255,255,255,0.12); transform: translateX(4px); }
  .med-card.taken { opacity: 0.5; }

  .med-emoji-box { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 28px; flex-shrink: 0; }
  .med-info { flex: 1; }
  .med-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #FDF6EC; margin-bottom: 4px; }
  .med-name.strike { text-decoration: line-through; }
  .med-dosage { color: rgba(255,255,255,0.35); font-size: 13px; margin-bottom: 6px; }
  .med-instructions { color: rgba(255,255,255,0.25); font-size: 12px; }

  .med-time-box { text-align: center; padding: 0 16px; border-left: 1px solid rgba(255,255,255,0.06); border-right: 1px solid rgba(255,255,255,0.06); }
  .med-time { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #C9973A; }
  .med-freq { color: rgba(255,255,255,0.25); font-size: 11px; margin-top: 2px; }

  .check-btn { width: 44px; height: 44px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.15); background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 20px; transition: all 0.2s; flex-shrink: 0; }
  .check-btn.checked { background: #22c55e; border-color: #22c55e; animation: checkPop 0.3s ease-out; }
  .check-btn:hover:not(.checked) { border-color: #E8650A; }

  .add-med-btn { width: 100%; padding: 16px; background: rgba(232,101,10,0.08); border: 1.5px dashed rgba(232,101,10,0.3); border-radius: 16px; color: #E8650A; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; margin-top: 14px; }
  .add-med-btn:hover { background: rgba(232,101,10,0.15); }

  .side-panel { display: flex; flex-direction: column; gap: 20px; }
  .side-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 24px; animation: slideUp 0.6s ease-out; }
  .side-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #FDF6EC; margin-bottom: 16px; }

  .progress-circle-wrap { display: flex; flex-direction: column; align-items: center; }
  .progress-ring { position: relative; width: 140px; height: 140px; margin-bottom: 16px; }
  .progress-text { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .progress-num { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 900; color: #FDF6EC; }
  .progress-label { color: rgba(255,255,255,0.25); font-size: 11px; }

  .next-med { display: flex; align-items: center; gap: 12px; padding: 14px; background: rgba(232,101,10,0.08); border: 1px solid rgba(232,101,10,0.2); border-radius: 14px; }
  .next-med-emoji { font-size: 28px; }
  .next-med-name { color: #FDF6EC; font-size: 14px; font-weight: 700; }
  .next-med-time { color: #E8650A; font-size: 12px; font-weight: 600; margin-top: 2px; }

  .tip-item { display: flex; gap: 10px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .tip-item:last-child { border-bottom: none; }
  .tip-icon { font-size: 16px; }
  .tip-text { color: rgba(255,255,255,0.4); font-size: 13px; line-height: 1.6; }

  @media (max-width: 1024px) {
    .main-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .reminder-hero { padding: 50px 24px 80px; }
    .hero-title { font-size: 36px; }
    .reminder-main { padding: 32px 24px; }
    .med-card { flex-wrap: wrap; }
    .med-time-box { border: none; padding: 0; }
  }
`;

function MedicineReminder() {
  const [medicines, setMedicines] = useState(initialMedicines);

  const toggleTaken = (id) => {
    setMedicines(medicines.map(med => med.id === id ? { ...med, taken: !med.taken } : med));
  };

  const takenCount = medicines.filter(m => m.taken).length;
  const totalCount = medicines.length;
  const percent = Math.round((takenCount / totalCount) * 100);
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (percent / 100) * circumference;

  const nextMed = medicines.find(m => !m.taken);

  return (
    <div className="reminder-page">
      <style>{CSS}</style>

      <div className="reminder-hero">
        <div className="hero-tag">💊 Medicine Reminder</div>
        <h1 className="hero-title">Never Miss<span>Your Dose</span></h1>
        <p className="hero-sub">Track your Ayurvedic medicines and get timely reminders for better health outcomes</p>
        <div className="hero-stats">
          <div><div className="stat-num">{takenCount}/{totalCount}</div><div className="stat-label">Taken Today</div></div>
          <div><div className="stat-num">7</div><div className="stat-label">Day Streak</div></div>
          <div><div className="stat-num">{percent}%</div><div className="stat-label">Adherence</div></div>
        </div>
      </div>

      <div className="reminder-main">
        <div className="main-grid">
          <div>
            <div className="section-title">Today's Medicines</div>
            <div className="section-sub">{takenCount} of {totalCount} medicines taken today</div>

            <div className="med-list">
              {medicines.map(med => (
                <div key={med.id} className={`med-card ${med.taken ? 'taken' : ''}`}>
                  <div className="med-emoji-box" style={{ background: `${med.color}18` }}>{med.emoji}</div>
                  <div className="med-info">
                    <div className={`med-name ${med.taken ? 'strike' : ''}`}>{med.name}</div>
                    <div className="med-dosage">{med.dosage} • {med.frequency}</div>
                    <div className="med-instructions">💡 {med.instructions}</div>
                  </div>
                  <div className="med-time-box">
                    <div className="med-time">{med.time}</div>
                    <div className="med-freq">{med.frequency}</div>
                  </div>
                  <button className={`check-btn ${med.taken ? 'checked' : ''}`} onClick={() => toggleTaken(med.id)}>
                    {med.taken ? '✓' : ''}
                  </button>
                </div>
              ))}
            </div>

            <button className="add-med-btn">+ Add New Medicine</button>
          </div>

          <div className="side-panel">
            <div className="side-card">
              <div className="side-title">Today's Progress</div>
              <div className="progress-circle-wrap">
                <div className="progress-ring">
                  <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                    <circle cx="70" cy="70" r="60" fill="none" stroke="#E8650A" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
                  </svg>
                  <div className="progress-text">
                    <div className="progress-num">{percent}%</div>
                    <div className="progress-label">Complete</div>
                  </div>
                </div>
              </div>
            </div>

            {nextMed && (
              <div className="side-card">
                <div className="side-title">⏰ Next Reminder</div>
                <div className="next-med">
                  <div className="next-med-emoji">{nextMed.emoji}</div>
                  <div>
                    <div className="next-med-name">{nextMed.name}</div>
                    <div className="next-med-time">{nextMed.time} • {nextMed.dosage}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="side-card">
              <div className="side-title">💡 Tips</div>
              {[
                "Take medicines at the same time daily for best results",
                "Always take Ayurvedic medicines with warm water",
                "Don't skip doses even if you feel better",
              ].map((tip, i) => (
                <div key={i} className="tip-item">
                  <span className="tip-icon">🌿</span>
                  <span className="tip-text">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicineReminder;