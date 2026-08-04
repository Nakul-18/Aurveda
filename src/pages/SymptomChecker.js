import { useState } from 'react';

const symptoms = ["Headache","Fatigue","Bloating","Anxiety","Insomnia","Joint Pain","Skin Issues","Digestive Issues","Low Immunity","Stress","Back Pain","Poor Memory","Weight Gain","Hair Loss","Cold & Cough"];

const remedies = {
  Headache: { dosha: "Pitta", emoji: "🤕", remedy: "Apply coconut oil on forehead. Drink brahmi tea. Avoid spicy food.", herbs: ["Brahmi", "Shankhpushpi", "Peppermint Oil"] },
  Fatigue: { dosha: "Vata", emoji: "😴", remedy: "Take Ashwagandha daily. Sleep by 10pm. Eat warm, nourishing foods.", herbs: ["Ashwagandha", "Shatavari", "Chyawanprash"] },
  Bloating: { dosha: "Vata", emoji: "🤢", remedy: "Drink warm water with ginger. Avoid cold foods. Take Triphala before bed.", herbs: ["Ginger", "Triphala", "Fennel Seeds"] },
  Anxiety: { dosha: "Vata", emoji: "😰", remedy: "Practice Pranayama daily. Take Brahmi and Ashwagandha. Reduce screen time.", herbs: ["Brahmi", "Ashwagandha", "Jatamansi"] },
  Insomnia: { dosha: "Vata", emoji: "🌙", remedy: "Drink warm milk with nutmeg. Practice yoga nidra. Oil head massage before bed.", herbs: ["Ashwagandha", "Nutmeg", "Tagara"] },
  "Joint Pain": { dosha: "Vata", emoji: "🦴", remedy: "Apply warm sesame oil. Take Shallaki supplement. Avoid cold damp weather.", herbs: ["Shallaki", "Guggul", "Turmeric"] },
  "Skin Issues": { dosha: "Pitta", emoji: "🌡️", remedy: "Take Neem and Manjistha. Avoid spicy and oily food. Stay hydrated.", herbs: ["Neem", "Manjistha", "Aloe Vera"] },
  "Digestive Issues": { dosha: "All", emoji: "🫃", remedy: "Take Triphala. Eat at fixed times. Avoid overeating. Drink warm water.", herbs: ["Triphala", "Hingvastak", "Ginger"] },
  "Low Immunity": { dosha: "Kapha", emoji: "🛡️", remedy: "Take Chyawanprash daily. Exercise regularly. Eat seasonal fruits and vegetables.", herbs: ["Chyawanprash", "Giloy", "Turmeric"] },
  Stress: { dosha: "Vata", emoji: "😓", remedy: "Practice meditation daily. Take Ashwagandha. Spend time in nature.", herbs: ["Ashwagandha", "Brahmi", "Holy Basil"] },
  "Back Pain": { dosha: "Vata", emoji: "🔙", remedy: "Do gentle yoga stretches. Apply warm castor oil. Take Mahanarayana oil massage.", herbs: ["Mahanarayana Oil", "Shallaki", "Guggul"] },
  "Poor Memory": { dosha: "Vata", emoji: "🧠", remedy: "Take Brahmi daily. Practice meditation. Eat almonds soaked overnight.", herbs: ["Brahmi", "Shankhpushpi", "Almonds"] },
  "Weight Gain": { dosha: "Kapha", emoji: "⚖️", remedy: "Take Triphala and Guggul. Exercise daily. Eat light warm foods. Avoid dairy.", herbs: ["Triphala", "Guggul", "Garcinia"] },
  "Hair Loss": { dosha: "Pitta", emoji: "💇", remedy: "Apply Bhringraj oil weekly. Take Amla daily. Avoid excessive heat styling.", herbs: ["Bhringraj", "Amla", "Brahmi Oil"] },
  "Cold & Cough": { dosha: "Kapha", emoji: "🤧", remedy: "Take Tulsi and ginger tea. Use Sitopaladi churna. Stay warm and dry.", herbs: ["Tulsi", "Ginger", "Sitopaladi"] },
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .page{min-height:100vh;background:#0A0A0A;font-family:'Poppins',sans-serif}
  .hero{background:linear-gradient(135deg,#0F1F23,#1A3C2E 60%,#0F2E23);padding:80px 60px 100px;position:relative;overflow:hidden;text-align:center}
  .hero::after{content:'';position:absolute;bottom:-60px;left:0;right:0;height:120px;background:#0A0A0A;clip-path:ellipse(55% 100% at 50% 100%)}
  .hero-tag{display:inline-flex;gap:8px;background:rgba(201,151,58,.15);border:1px solid rgba(201,151,58,.3);color:#C9973A;padding:8px 18px;border-radius:30px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:24px}
  .hero-title{font-family:'Playfair Display',serif;font-size:60px;font-weight:900;color:#FDF6EC;line-height:1.1;margin-bottom:20px}
  .hero-title span{color:#C9973A;display:block}
  .hero-sub{color:rgba(253,246,236,.5);font-size:17px;max-width:520px;font-weight:300;margin:0 auto}
  .main{padding:60px;max-width:900px;margin:0 auto}
  .section-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#FDF6EC;margin-bottom:8px;text-align:center}
  .section-sub{color:rgba(255,255,255,.25);font-size:14px;margin-bottom:32px;text-align:center}
  .symptoms-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:40px}
  .symptom-btn{padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:transparent;color:rgba(255,255,255,.5);font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;font-family:'Poppins',sans-serif;text-align:left}
  .symptom-btn:hover{border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.8);background:rgba(255,255,255,.04)}
  .symptom-btn.selected{border-color:#E8650A;background:rgba(232,101,10,.1);color:#E8650A}
  .check-btn{width:100%;padding:16px;background:#E8650A;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .2s;margin-bottom:40px}
  .check-btn:hover{background:#D05508;transform:translateY(-2px)}
  .check-btn:disabled{background:rgba(255,255,255,.08);color:rgba(255,255,255,.2);cursor:not-allowed;transform:none}
  .results{animation:fadeIn .5s ease-out}
  .result-card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:28px;margin-bottom:16px;animation:slideUp .5s ease-out}
  .result-header{display:flex;align-items:center;gap:14px;margin-bottom:16px}
  .result-emoji{font-size:40px}
  .result-symptom{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#FDF6EC;margin-bottom:4px}
  .result-dosha{color:#C9973A;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
  .result-remedy{color:rgba(255,255,255,.45);font-size:14px;line-height:1.7;margin-bottom:16px;padding:14px;background:rgba(255,255,255,.03);border-radius:10px;border-left:3px solid #E8650A}
  .herbs-wrap{display:flex;flex-wrap:wrap;gap:8px}
  .herb{background:rgba(45,106,79,.15);color:rgba(45,106,79,.9);border:1px solid rgba(45,106,79,.2);padding:6px 12px;border-radius:20px;font-size:12px;font-weight:600}
  .disclaimer{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:16px;margin-top:24px;color:rgba(255,255,255,.3);font-size:12px;line-height:1.6;text-align:center}
  @media(max-width:768px){.hero{padding:50px 24px 80px}.hero-title{font-size:36px}.main{padding:32px 24px}.symptoms-grid{grid-template-columns:1fr 1fr}}
`;

function SymptomChecker() {
  const [selected, setSelected] = useState(new Set());
  const [results, setResults] = useState(null);

  const toggle = (s) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(s)) {
        next.delete(s);
      } else {
        next.add(s);
      }
      return next;
    });
    setResults(null);
  };

  const check = () => {
    setResults(Array.from(selected).map(s => ({ symptom: s, ...remedies[s] })));
  };

  return (
    <div className="page">
      <style>{CSS}</style>
      <div className="hero">
        <div className="hero-tag">🔍 Symptom Checker</div>
        <h1 className="hero-title">Find Your<span>Ayurvedic Remedy</span></h1>
        <p className="hero-sub">Select your symptoms and get personalized Ayurvedic remedies and herbal recommendations</p>
      </div>
      <div className="main">
        <div className="section-title">Select Your Symptoms</div>
        <div className="section-sub">Choose one or more symptoms you are experiencing</div>
        <div className="symptoms-grid">
          {symptoms.map(s => (
            <button key={s} className={`symptom-btn ${selected.has(s) ? 'selected' : ''}`} onClick={() => toggle(s)}>
              {selected.has(s) ? '✓ ' : ''}{s}
            </button>
          ))}
        </div>
        <button className="check-btn" onClick={check} disabled={selected.size === 0}>
          {selected.size === 0 ? 'Select at least one symptom' : `Check Remedies for ${selected.size} symptom${selected.size > 1 ? 's' : ''} →`}
        </button>
        {results && (
          <div className="results">
            {results.map((r, i) => (
              <div key={i} className="result-card">
                <div className="result-header">
                  <span className="result-emoji">{r.emoji}</span>
                  <div>
                    <div className="result-symptom">{r.symptom}</div>
                    <div className="result-dosha">Dosha: {r.dosha}</div>
                  </div>
                </div>
                <div className="result-remedy">💡 {r.remedy}</div>
                <div className="herbs-wrap">
                  {r.herbs.map((h, j) => <span key={j} className="herb">🌿 {h}</span>)}
                </div>
              </div>
            ))}
            <div className="disclaimer">⚠️ This is for informational purposes only. Please consult a certified Vaidya for proper diagnosis and treatment.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SymptomChecker;