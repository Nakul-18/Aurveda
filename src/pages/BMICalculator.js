import { useState } from 'react';

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
  .hero-title{font-family:'Playfair Display',serif;font-size:56px;font-weight:900;color:#FDF6EC;line-height:1.1;margin-bottom:20px}
  .hero-title span{color:#C9973A;display:block}
  .hero-sub{color:rgba(253,246,236,.5);font-size:17px;max-width:520px;font-weight:300;margin:0 auto}
  .main{padding:60px;max-width:800px;margin:0 auto}
  .calc-card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:24px;padding:40px;margin-bottom:24px;animation:slideUp .6s ease-out}
  .calc-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#FDF6EC;margin-bottom:28px;text-align:center}
  .inputs-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:24px}
  .input-group{display:flex;flex-direction:column;gap:6px}
  .input-label{font-size:11px;font-weight:700;color:rgba(255,255,255,.25);text-transform:uppercase;letter-spacing:1px}
  .input-field{padding:14px 16px;background:#0A0A0A;border:1px solid rgba(255,255,255,.08);border-radius:12px;font-size:15px;color:#FDF6EC;outline:none;font-family:'Poppins',sans-serif;transition:border-color .2s}
  .input-field:focus{border-color:#E8650A}
  .input-field::placeholder{color:rgba(255,255,255,.2)}
  .calc-btn{width:100%;padding:16px;background:#E8650A;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .2s}
  .calc-btn:hover{background:#D05508;transform:translateY(-2px)}
  .calc-btn:disabled{background:rgba(255,255,255,.06);color:rgba(255,255,255,.2);cursor:not-allowed;transform:none}
  .result-card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:24px;padding:40px;animation:fadeIn .6s ease-out}
  .bmi-display{text-align:center;margin-bottom:32px}
  .bmi-number{font-family:'Playfair Display',serif;font-size:80px;font-weight:900;line-height:1;margin-bottom:8px}
  .bmi-category{font-size:20px;font-weight:700;margin-bottom:8px}
  .bmi-sub{color:rgba(255,255,255,.3);font-size:14px}
  .bmi-scale{margin-bottom:32px}
  .scale-bar{height:12px;border-radius:6px;background:linear-gradient(90deg,#3b82f6,#22c55e,#f59e0b,#ef4444);margin-bottom:8px;position:relative;overflow:hidden}
  .scale-indicator{position:absolute;top:-4px;width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid #0A0A0A;transition:left .8s ease-out}
  .scale-labels{display:flex;justify-content:space-between}
  .scale-label{color:rgba(255,255,255,.25);font-size:10px}
  .ayurveda-card{background:rgba(45,106,79,.08);border:1px solid rgba(45,106,79,.2);border-radius:14px;padding:20px;margin-bottom:16px}
  .ayurveda-title{color:#2D6A4F;font-size:13px;font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:1px}
  .ayurveda-text{color:rgba(255,255,255,.45);font-size:14px;line-height:1.7}
  .advice-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .advice-item{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:14px;display:flex;gap:10px}
  .advice-icon{font-size:20px;flex-shrink:0}
  .advice-text{color:rgba(255,255,255,.45);font-size:13px;line-height:1.6}
  @media(max-width:768px){.hero{padding:50px 24px 80px}.hero-title{font-size:36px}.main{padding:32px 24px}.inputs-grid{grid-template-columns:1fr}.advice-grid{grid-template-columns:1fr}}
`;

const getBMIInfo = (bmi) => {
  if (bmi < 18.5) return { category: "Underweight", color: "#3b82f6", position: 8, dosha: "Vata imbalance likely", advice: "Focus on nourishing, warm foods. Take Ashwagandha and Shatavari.", tips: ["Eat more warm, heavy foods", "Take Chyawanprash daily", "Practice gentle yoga", "Sleep 8+ hours"] };
  if (bmi < 25) return { category: "Normal Weight", color: "#22c55e", position: 35, dosha: "Doshas are balanced", advice: "Maintain your current lifestyle. Continue Ayurvedic practices.", tips: ["Maintain current diet", "Stay active with yoga", "Seasonal Panchakarma", "Regular Prakriti checkup"] };
  if (bmi < 30) return { category: "Overweight", color: "#f59e0b", position: 62, dosha: "Kapha imbalance likely", advice: "Reduce heavy foods. Take Triphala and Guggul. Increase activity.", tips: ["Eat light, warm foods", "Take Triphala at night", "Daily brisk walking", "Avoid dairy and sweets"] };
  return { category: "Obese", color: "#ef4444", position: 88, dosha: "Severe Kapha imbalance", advice: "Consult a Vaidya immediately. Follow strict Kapha-reducing diet.", tips: ["Strict Kapha diet", "Take Guggul supplement", "Daily exercise mandatory", "Consult Vaidya now"] };
};

function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const bmi = (w / (h * h)).toFixed(1);
    setResult({ bmi, ...getBMIInfo(parseFloat(bmi)) });
  };

  return (
    <div className="page">
      <style>{CSS}</style>
      <div className="hero">
        <div className="hero-tag">⚖️ BMI Calculator</div>
        <h1 className="hero-title">Know Your<span>Health Score</span></h1>
        <p className="hero-sub">Calculate your BMI and get personalized Ayurvedic recommendations based on your body type</p>
      </div>
      <div className="main">
        <div className="calc-card">
          <div className="calc-title">Enter Your Details</div>
          <div className="inputs-grid">
            <div className="input-group">
              <label className="input-label">Height (cm)</label>
              <input className="input-field" type="number" placeholder="e.g. 170" value={height} onChange={e=>setHeight(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Weight (kg)</label>
              <input className="input-field" type="number" placeholder="e.g. 65" value={weight} onChange={e=>setWeight(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Age (years)</label>
              <input className="input-field" type="number" placeholder="e.g. 25" value={age} onChange={e=>setAge(e.target.value)} />
            </div>
          </div>
          <button className="calc-btn" onClick={calculate} disabled={!height||!weight||!age}>Calculate BMI →</button>
        </div>

        {result && (
          <div className="result-card">
            <div className="bmi-display">
              <div className="bmi-number" style={{color:result.color}}>{result.bmi}</div>
              <div className="bmi-category" style={{color:result.color}}>{result.category}</div>
              <div className="bmi-sub">Your Body Mass Index</div>
            </div>
            <div className="bmi-scale">
              <div className="scale-bar">
                <div className="scale-indicator" style={{left:`calc(${result.position}% - 10px)`}}/>
              </div>
              <div className="scale-labels">
                <span className="scale-label">Underweight</span>
                <span className="scale-label">Normal</span>
                <span className="scale-label">Overweight</span>
                <span className="scale-label">Obese</span>
              </div>
            </div>
            <div className="ayurveda-card">
              <div className="ayurveda-title">🌿 Ayurvedic Insight</div>
              <div className="ayurveda-text"><strong style={{color:'#C9973A'}}>{result.dosha}</strong> — {result.advice}</div>
            </div>
            <div className="advice-grid">
              {result.tips.map((tip,i)=>(
                <div key={i} className="advice-item">
                  <span className="advice-icon">💡</span>
                  <span className="advice-text">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BMICalculator;