import { useState } from 'react';

const questions = [
  { q: "What is your body frame?", options: [{ text: "Thin & Light", dosha: "vata" }, { text: "Medium & Muscular", dosha: "pitta" }, { text: "Heavy & Sturdy", dosha: "kapha" }] },
  { q: "How is your skin texture?", options: [{ text: "Dry & Rough", dosha: "vata" }, { text: "Oily & Sensitive", dosha: "pitta" }, { text: "Smooth & Cool", dosha: "kapha" }] },
  { q: "What is your hair type?", options: [{ text: "Thin & Dry", dosha: "vata" }, { text: "Fine & Oily", dosha: "pitta" }, { text: "Thick & Lustrous", dosha: "kapha" }] },
  { q: "How is your appetite?", options: [{ text: "Variable & Irregular", dosha: "vata" }, { text: "Strong & Intense", dosha: "pitta" }, { text: "Slow & Steady", dosha: "kapha" }] },
  { q: "Your digestion is?", options: [{ text: "Irregular & Gassy", dosha: "vata" }, { text: "Fast & Strong", dosha: "pitta" }, { text: "Slow & Heavy", dosha: "kapha" }] },
  { q: "How do you sleep?", options: [{ text: "Light & Interrupted", dosha: "vata" }, { text: "Moderate & Sound", dosha: "pitta" }, { text: "Deep & Long", dosha: "kapha" }] },
  { q: "Your personality is?", options: [{ text: "Creative & Anxious", dosha: "vata" }, { text: "Ambitious & Intense", dosha: "pitta" }, { text: "Calm & Steady", dosha: "kapha" }] },
  { q: "How is your memory?", options: [{ text: "Quick but Forgetful", dosha: "vata" }, { text: "Sharp & Precise", dosha: "pitta" }, { text: "Slow but Long-term", dosha: "kapha" }] },
  { q: "Your body temperature?", options: [{ text: "Cold Hands & Feet", dosha: "vata" }, { text: "Always Warm", dosha: "pitta" }, { text: "Cool & Comfortable", dosha: "kapha" }] },
  { q: "Preferred climate?", options: [{ text: "Warm & Humid", dosha: "vata" }, { text: "Cool & Airy", dosha: "pitta" }, { text: "Warm & Dry", dosha: "kapha" }] },
];

const doshas = {
  vata: { name: "Vata", emoji: "🌬️", element: "Air & Space", color: "#E8650A", desc: "You are creative, energetic, and naturally gifted with movement and change.", traits: ["Creative", "Quick Learner", "Adaptable", "Enthusiastic", "Versatile"], recs: ["Warm, nourishing foods", "Daily oil massage", "Consistent routine", "Grounding meditation", "Early bedtime"] },
  pitta: { name: "Pitta", emoji: "🔥", element: "Fire & Water", color: "#C9973A", desc: "You are intelligent, ambitious, and naturally gifted with transformation.", traits: ["Intelligent", "Ambitious", "Focused", "Confident", "Leader"], recs: ["Cool, refreshing foods", "Coconut oil massage", "Moon walks", "Cooling pranayama", "Avoid excess heat"] },
  kapha: { name: "Kapha", emoji: "💧", element: "Water & Earth", color: "#2D6A4F", desc: "You are calm, steady, and naturally gifted with grounding and stability.", traits: ["Calm", "Loyal", "Strong", "Patient", "Nurturing"], recs: ["Light, spiced foods", "Vigorous exercise", "Stimulating herbs", "Varied routine", "Early rising"] },
};

const API = 'http://localhost:5000/api';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(232,101,10,.2); } 50% { box-shadow: 0 0 50px rgba(232,101,10,.5); } }
  @keyframes spin { to { transform: rotate(360deg); } }

  .quiz-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
  .quiz-wrap { width: 100%; max-width: 680px; }

  .quiz-header { text-align: center; margin-bottom: 48px; animation: slideUp .6s ease-out; }
  .quiz-logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: #FDF6EC; margin-bottom: 32px; cursor: pointer; }
  .quiz-logo span { color: #C9973A; }
  .quiz-title { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 900; color: #FDF6EC; margin-bottom: 12px; line-height: 1.1; }
  .quiz-title span { color: #C9973A; display: block; }
  .quiz-sub { color: rgba(255,255,255,.35); font-size: 16px; }

  .progress-wrap { margin-bottom: 48px; }
  .progress-info { display: flex; justify-content: space-between; margin-bottom: 10px; }
  .progress-label { color: rgba(255,255,255,.3); font-size: 13px; }
  .progress-percent { color: #E8650A; font-size: 13px; font-weight: 700; }
  .progress-track { height: 4px; background: rgba(255,255,255,.06); border-radius: 2px; overflow: hidden; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, #E8650A, #C9973A); transition: width .5s ease-out; border-radius: 2px; }

  .question-card { background: #111; border: 1px solid rgba(255,255,255,.06); border-radius: 24px; padding: 48px 40px; animation: slideUp .6s ease-out .2s backwards; }
  .q-number { color: #E8650A; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; }
  .q-text { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #FDF6EC; margin-bottom: 36px; line-height: 1.3; }

  .options { display: flex; flex-direction: column; gap: 12px; }
  .option-btn { padding: 18px 24px; border: 1px solid rgba(255,255,255,.08); border-radius: 14px; background: transparent; color: rgba(255,255,255,.6); font-size: 15px; font-weight: 500; cursor: pointer; transition: all .3s; text-align: left; font-family: 'Poppins', sans-serif; display: flex; align-items: center; gap: 16px; }
  .option-btn:hover { border-color: #E8650A; color: white; background: rgba(232,101,10,.05); transform: translateX(6px); }
  .option-btn.selected { border-color: #E8650A; background: rgba(232,101,10,.1); color: #E8650A; animation: glow 1s ease-out; }

  .result-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; animation: fadeIn .6s ease-out; }
  .result-hero { padding: 80px 60px; position: relative; overflow: hidden; text-align: center; }
  .result-emoji-big { font-size: 120px; display: block; margin-bottom: 24px; animation: pulse 2.5s ease-in-out infinite; }
  .result-name { font-family: 'Playfair Display', serif; font-size: 72px; font-weight: 900; margin-bottom: 8px; }
  .result-element { font-size: 16px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; opacity: .6; margin-bottom: 24px; }
  .result-desc { color: rgba(255,255,255,.5); font-size: 18px; line-height: 1.8; max-width: 580px; margin: 0 auto 40px; font-weight: 300; }

  .save-status { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 40px; }
  .save-success { background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.2); color: #22c55e; }
  .save-error { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.2); color: #ef4444; }
  .save-loading { background: rgba(232,101,10,.1); border: 1px solid rgba(232,101,10,.2); color: #E8650A; }
  .mini-spinner { width: 14px; height: 14px; border: 2px solid rgba(232,101,10,.3); border-top-color: #E8650A; border-radius: 50%; animation: spin .8s linear infinite; }

  .result-content { padding: 0 60px 80px; max-width: 900px; margin: 0 auto; }
  .result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
  .result-card { background: #111; border: 1px solid rgba(255,255,255,.06); border-radius: 24px; padding: 32px; }
  .result-card-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #FDF6EC; margin-bottom: 24px; }

  .breakdown-items { display: flex; flex-direction: column; gap: 16px; }
  .breakdown-item { display: flex; align-items: center; gap: 14px; }
  .breakdown-emoji { font-size: 28px; }
  .breakdown-info { flex: 1; }
  .breakdown-name { font-size: 13px; font-weight: 700; margin-bottom: 6px; }
  .breakdown-track { height: 6px; background: rgba(255,255,255,.06); border-radius: 3px; overflow: hidden; }
  .breakdown-fill { height: 100%; border-radius: 3px; transition: width 1s ease-out; }
  .breakdown-percent { font-size: 16px; font-weight: 800; min-width: 40px; text-align: right; }

  .traits-wrap { display: flex; flex-direction: column; gap: 10px; }
  .trait-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: rgba(255,255,255,.03); border-radius: 10px; }
  .trait-text { color: rgba(255,255,255,.7); font-size: 14px; font-weight: 500; }

  .recs-card { background: #111; border: 1px solid rgba(255,255,255,.06); border-radius: 24px; padding: 32px; margin-bottom: 24px; }
  .recs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 20px; }
  .rec-item { background: rgba(255,255,255,.03); border-radius: 12px; padding: 16px; border-left: 3px solid; display: flex; align-items: center; gap: 12px; }
  .rec-text { color: rgba(255,255,255,.6); font-size: 14px; }

  .result-actions { display: flex; gap: 16px; }
  .action-btn { flex: 1; padding: 18px; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all .3s; font-family: 'Poppins', sans-serif; border: none; }
  .action-primary { background: #E8650A; color: white; }
  .action-primary:hover { background: #D05508; transform: translateY(-3px); }
  .action-secondary { background: rgba(255,255,255,.06); color: rgba(255,255,255,.6); border: 1px solid rgba(255,255,255,.08) !important; }
  .action-secondary:hover { background: rgba(255,255,255,.08); color: white; }

  @media(max-width:768px){
    .quiz-title{font-size:36px}.question-card{padding:32px 24px}.q-text{font-size:24px}
    .result-hero{padding:60px 24px}.result-name{font-size:48px}
    .result-content{padding:0 24px 60px}.result-grid{grid-template-columns:1fr}
    .recs-grid{grid-template-columns:1fr}.result-actions{flex-direction:column}
  }
`;

function PrakritiQuiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // null | 'loading' | 'success' | 'error' | 'noauth'

  const handleAnswer = (dosha) => {
    setSelected(dosha);
    setTimeout(() => {
      const newScores = { ...scores, [dosha]: scores[dosha] + 1 };
      setScores(newScores);
      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setFinished(true);
        saveResult(newScores);
      }
    }, 350);
  };

  const saveResult = async (finalScores) => {
    const token = localStorage.getItem('arogyamed_token');
    if (!token) {
      setSaveStatus('noauth');
      return;
    }
    setSaveStatus('loading');
    const prakriti = getPrakriti(finalScores);
    try {
      const res = await fetch(`${API}/prakriti/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          vata: finalScores.vata,
          pitta: finalScores.pitta,
          kapha: finalScores.kapha,
          result: prakriti,
        }),
      });
      const data = await res.json();
      setSaveStatus(data.success ? 'success' : 'error');
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const getPrakriti = (s = scores) => {
    if (s.vata >= s.pitta && s.vata >= s.kapha) return 'vata';
    if (s.pitta >= s.vata && s.pitta >= s.kapha) return 'pitta';
    return 'kapha';
  };

  const retake = () => {
    setCurrent(0);
    setScores({ vata: 0, pitta: 0, kapha: 0 });
    setSelected(null);
    setFinished(false);
    setSaveStatus(null);
  };

  if (finished) {
    const prakriti = getPrakriti();
    const info = doshas[prakriti];
    const total = questions.length;

    return (
      <div className="result-page">
        <style>{CSS}</style>
        <div className="result-hero">
          <span className="result-emoji-big">{info.emoji}</span>
          <div className="result-name" style={{ color: info.color }}>{info.name}</div>
          <div className="result-element" style={{ color: info.color }}>{info.element}</div>
          <p className="result-desc">{info.desc}</p>

          {/* SAVE STATUS */}
          {saveStatus === 'loading' && (
            <div className="save-status save-loading">
              <div className="mini-spinner"/> Saving to database...
            </div>
          )}
          {saveStatus === 'success' && (
            <div className="save-status save-success">
              ✅ Result saved to your profile!
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="save-status save-error">
              ❌ Could not save. Check backend connection.
            </div>
          )}
          {saveStatus === 'noauth' && (
            <div className="save-status save-error">
              🔐 Login to save your result! <span style={{cursor:'pointer',textDecoration:'underline',marginLeft:'8px'}} onClick={()=>window.location.href='/login'}>Login →</span>
            </div>
          )}
        </div>

        <div className="result-content">
          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-title">📊 Dosha Breakdown</div>
              <div className="breakdown-items">
                {['vata','pitta','kapha'].map(d => {
                  const percent = Math.round((scores[d] / total) * 100);
                  return (
                    <div key={d} className="breakdown-item">
                      <div className="breakdown-emoji">{doshas[d].emoji}</div>
                      <div className="breakdown-info">
                        <div className="breakdown-name" style={{ color: doshas[d].color }}>{doshas[d].name}</div>
                        <div className="breakdown-track">
                          <div className="breakdown-fill" style={{ width: `${percent}%`, background: doshas[d].color }} />
                        </div>
                      </div>
                      <div className="breakdown-percent" style={{ color: doshas[d].color }}>{percent}%</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="result-card">
              <div className="result-card-title">✨ Your Traits</div>
              <div className="traits-wrap">
                {info.traits.map((trait, i) => (
                  <div key={i} className="trait-item">
                    <span style={{ color: info.color, fontWeight: '700' }}>✓</span>
                    <span className="trait-text">{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recs-card">
            <div className="result-card-title">💡 Recommendations for {info.name}</div>
            <div className="recs-grid">
              {info.recs.map((rec, i) => (
                <div key={i} className="rec-item" style={{ borderColor: info.color }}>
                  <span style={{ color: info.color, fontWeight: '700' }}>→</span>
                  <span className="rec-text">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="result-actions">
            <button className="action-btn action-primary" onClick={() => window.location.href='/vaidya'}>📅 Book a Vaidya</button>
            <button className="action-btn action-primary" style={{background:'#1A3C2E'}} onClick={() => window.location.href='/dashboard'}>📊 View Dashboard</button>
            <button className="action-btn action-secondary" onClick={retake}>🔄 Retake Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="quiz-page">
      <style>{CSS}</style>
      <div className="quiz-wrap">
        <div className="quiz-header">
          <div className="quiz-logo" onClick={() => window.location.href='/'}>Ārogya<span>Med</span></div>
          <h1 className="quiz-title">Discover Your<span>Prakriti</span></h1>
          <p className="quiz-sub">10 questions to find your Ayurvedic constitution</p>
        </div>

        <div className="progress-wrap">
          <div className="progress-info">
            <span className="progress-label">Question {current + 1} of {questions.length}</span>
            <span className="progress-percent">{Math.round(progress)}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="question-card">
          <div className="q-number">Question {current + 1}</div>
          <h2 className="q-text">{questions[current].q}</h2>
          <div className="options">
            {questions[current].options.map((opt, i) => (
              <button key={i} className={`option-btn ${selected === opt.dosha ? 'selected' : ''}`} onClick={() => handleAnswer(opt.dosha)}>
                <span style={{ color: selected === opt.dosha ? '#E8650A' : 'rgba(255,255,255,.2)', fontWeight: '700' }}>→</span>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrakritiQuiz;