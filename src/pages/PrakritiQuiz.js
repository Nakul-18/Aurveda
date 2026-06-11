import { useState } from 'react';

const quizQuestions = [
  { q: "What is your body frame?", options: [{ text: "Thin & Light", dosha: "vata" }, { text: "Medium & Muscular", dosha: "pitta" }, { text: "Heavy & Sturdy", dosha: "kapha" }] },
  { q: "How is your skin texture?", options: [{ text: "Dry & Rough", dosha: "vata" }, { text: "Oily & Sensitive", dosha: "pitta" }, { text: "Smooth & Cool", dosha: "kapha" }] },
  { q: "What is your hair type?", options: [{ text: "Thin & Dry", dosha: "vata" }, { text: "Fine & Premature Grey", dosha: "pitta" }, { text: "Thick & Oily", dosha: "kapha" }] },
  { q: "How is your appetite?", options: [{ text: "Variable & Irregular", dosha: "vata" }, { text: "Strong & Intense", dosha: "pitta" }, { text: "Slow & Steady", dosha: "kapha" }] },
  { q: "Your digestion is?", options: [{ text: "Irregular & Bloating", dosha: "vata" }, { text: "Fast & Strong", dosha: "pitta" }, { text: "Slow & Heavy", dosha: "kapha" }] },
  { q: "How do you sleep?", options: [{ text: "Light & Easily Disturbed", dosha: "vata" }, { text: "Moderate & Sound", dosha: "pitta" }, { text: "Deep & Heavy", dosha: "kapha" }] },
  { q: "Your personality is?", options: [{ text: "Creative & Anxious", dosha: "vata" }, { text: "Ambitious & Confident", dosha: "pitta" }, { text: "Calm & Stable", dosha: "kapha" }] },
  { q: "How is your memory?", options: [{ text: "Quick but Forgetful", dosha: "vata" }, { text: "Sharp & Focused", dosha: "pitta" }, { text: "Slow but Long-term", dosha: "kapha" }] },
  { q: "Your body temperature?", options: [{ text: "Cold Hands & Feet", dosha: "vata" }, { text: "Always Warm", dosha: "pitta" }, { text: "Cool & Balanced", dosha: "kapha" }] },
  { q: "Preferred climate?", options: [{ text: "Warm & Humid", dosha: "vata" }, { text: "Cool & Dry", dosha: "pitta" }, { text: "Warm & Dry", dosha: "kapha" }] },
];

const doshaInfo = {
  vata: { name: "Vata", emoji: "🌬️", element: "Air & Space", color: "#FF6B35", lightColor: "#FFF5F0", bgGradient: "linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)", desc: "You are creative, energetic, and naturally gifted with movement and change. Your mind is quick, your movement is fluid, and your enthusiasm is infectious.", traits: ["Creative", "Quick Learner", "Adaptable", "Social", "Energetic"], recommendations: ["Warm foods", "Oil massage", "Consistent routine", "Grounding practices"] },
  pitta: { name: "Pitta", emoji: "🔥", element: "Fire & Water", color: "#F7931E", lightColor: "#FFF8F0", bgGradient: "linear-gradient(135deg, #F7931E 0%, #FFC54D 100%)", desc: "You are intelligent, ambitious, and naturally gifted with transformation. Your mind is sharp, your will is strong, and your determination is unmatched.", traits: ["Intelligent", "Ambitious", "Confident", "Sharp Memory", "Leader"], recommendations: ["Cool foods", "Coconut oil", "Meditation", "Cooling exercises"] },
  kapha: { name: "Kapha", emoji: "💧", element: "Water & Earth", color: "#2E7D32", lightColor: "#F1F8F5", bgGradient: "linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)", desc: "You are calm, steady, and naturally gifted with grounding and stability. Your presence is soothing, your loyalty is unwavering, and your strength is enduring.", traits: ["Calm", "Loyal", "Strong", "Stamina", "Peaceful"], recommendations: ["Warm & dry foods", "Regular exercise", "Stimulating activities", "Active lifestyle"] }
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Poppins', sans-serif; }
  
  @keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
  @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.3); } 50% { box-shadow: 0 0 40px rgba(255, 107, 53, 0.6); } }
  @keyframes fadeInScale { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
  
  /* Quiz page */
  .quiz-container { min-height: 100vh; background: linear-gradient(135deg, #0F1F23 0%, #1A3C2E 50%, #0F2E23 100%); display: flex; align-items: center; justify-content: center; padding: 20px; }
  .quiz-card { background: white; border-radius: 28px; padding: 50px 40px; max-width: 700px; width: 100%; box-shadow: 0 50px 100px rgba(0,0,0,0.3); animation: slideUp 0.7s ease-out; }
  .progress-bar { height: 12px; background: linear-gradient(90deg, #F0F0F0, #E0E0E0); border-radius: 10px; overflow: hidden; margin-bottom: 24px; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, #FF6B35, #F7931E, #2E7D32); transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); border-radius: 10px; }
  .question-text { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #1A1A1A; margin: 32px 0; line-height: 1.3; }
  .answer-btn { width: 100%; padding: 18px 20px; border: 2.5px solid #E5E7EB; border-radius: 14px; background: white; font-size: 15px; color: #374151; font-weight: 500; cursor: pointer; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); margin-bottom: 12px; }
  .answer-btn:hover:not(.selected) { border-color: #1A3C2E; background: #F5F5F5; transform: translateX(8px); }
  .answer-btn.selected { background: #1A3C2E; color: white; border-color: #1A3C2E; animation: glow 1.5s ease-in-out; }
  .header-text { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 900; background: linear-gradient(135deg, #FF6B35, #F7931E, #2E7D32); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 12px; }
  .subheader-text { color: #666; font-size: 16px; margin-bottom: 40px; }
  
  /* RESULT PAGE */
  .result-page { min-height: 100vh; background: linear-gradient(135deg, #0F1F23 0%, #1A3C2E 50%, #0F2E23 100%); padding: 40px 20px; overflow-x: hidden; }
  .result-wrapper { max-width: 800px; margin: 0 auto; }
  
  .result-hero { background: var(--gradient); border-radius: 32px; padding: 60px 40px; text-align: center; color: white; margin-bottom: 40px; animation: slideUp 0.8s ease-out; box-shadow: 0 50px 100px rgba(0,0,0,0.4); position: relative; overflow: hidden; }
  .result-hero::before { content: ''; position: absolute; top: -50%; right: -50%; width: 400px; height: 400px; background: rgba(255,255,255,0.1); border-radius: 50%; animation: float 6s ease-in-out infinite; }
  .result-hero::after { content: ''; position: absolute; bottom: -30%; left: -30%; width: 300px; height: 300px; background: rgba(255,255,255,0.1); border-radius: 50%; animation: float 8s ease-in-out infinite reverse; }
  .result-emoji-large { font-size: 140px; margin-bottom: 20px; animation: pulse 2.5s ease-in-out infinite; display: block; position: relative; z-index: 1; }
  .result-name { font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 900; margin-bottom: 8px; position: relative; z-index: 1; }
  .result-element { font-size: 15px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; opacity: 0.95; position: relative; z-index: 1; }
  
  .description-card { background: white; border-radius: 24px; padding: 36px; margin-bottom: 24px; animation: slideUp 0.8s ease-out 0.1s backwards; box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
  .card-heading { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; margin-bottom: 16px; color: #1A1A1A; }
  .card-text { color: #555; line-height: 1.9; font-size: 16px; }
  
  .breakdown-section { background: white; border-radius: 24px; padding: 36px; margin-bottom: 24px; animation: slideUp 0.8s ease-out 0.2s backwards; box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
  .breakdown-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; margin-bottom: 24px; color: #1A1A1A; }
  .breakdown-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .breakdown-card { background: linear-gradient(135deg, #F8F8F8, #FFFFFF); padding: 24px 16px; border-radius: 16px; text-align: center; border: 2px solid #E5E7EB; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: default; }
  .breakdown-card.active { border-color: var(--color); background: var(--light-color); transform: scale(1.08); box-shadow: 0 20px 50px rgba(0,0,0,0.12); }
  .breakdown-emoji { font-size: 48px; margin-bottom: 12px; }
  .breakdown-label { font-size: 13px; font-weight: 700; color: var(--color); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
  .breakdown-percent { font-size: 32px; font-weight: 900; color: var(--color); }
  
  .traits-section { background: white; border-radius: 24px; padding: 36px; margin-bottom: 24px; animation: slideUp 0.8s ease-out 0.3s backwards; box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
  .traits-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; margin-bottom: 24px; color: #1A1A1A; }
  .traits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .trait-badge { background: var(--light-color); border-left: 4px solid var(--color); padding: 16px 18px; border-radius: 12px; animation: fadeInScale 0.6s ease-out; }
  .trait-text { color: var(--color); font-weight: 700; font-size: 15px; }
  
  .recommendations-section { background: white; border-radius: 24px; padding: 36px; margin-bottom: 24px; animation: slideUp 0.8s ease-out 0.4s backwards; box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
  .rec-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; margin-bottom: 24px; color: #1A1A1A; }
  .rec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .rec-item { background: linear-gradient(135deg, var(--light-color), var(--light-color)ee); border-left: 4px solid var(--color); padding: 18px 16px; border-radius: 12px; animation: fadeInScale 0.6s ease-out; }
  .rec-text { color: #333; font-weight: 500; font-size: 14px; display: flex; align-items: center; gap: 10px; }
  .rec-icon { color: var(--color); font-weight: 700; font-size: 16px; }
  
  .action-section { display: flex; gap: 16px; margin-bottom: 40px; animation: slideUp 0.8s ease-out 0.5s backwards; }
  .btn-action { flex: 1; padding: 18px 24px; border: none; border-radius: 14px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s; }
  .btn-primary { background: var(--color); color: white; }
  .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(0,0,0,0.2); }
  .btn-secondary { background: #F3F4F6; color: #1A1A1A; }
  .btn-secondary:hover { background: #E5E7EB; transform: translateY(-3px); }
  
  @media (max-width: 600px) {
    .quiz-card { padding: 30px 20px; }
    .question-text { font-size: 24px; }
    .result-hero { padding: 40px 20px; }
    .result-name { font-size: 40px; }
    .result-emoji-large { font-size: 100px; }
    .breakdown-grid { grid-template-columns: 1fr; }
    .traits-grid { grid-template-columns: 1fr; }
    .rec-grid { grid-template-columns: 1fr; }
    .action-section { flex-direction: column; }
  }
`;

function PrakritiQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (dosha) => {
    setSelectedAnswer(dosha);
    setTimeout(() => {
      setScores({ ...scores, [dosha]: scores[dosha] + 1 });
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
      } else {
        setFinished(true);
      }
    }, 400);
  };

  const getPrakriti = () => {
    if (scores.vata >= scores.pitta && scores.vata >= scores.kapha) return 'vata';
    if (scores.pitta >= scores.vata && scores.pitta >= scores.kapha) return 'pitta';
    return 'kapha';
  };

  if (finished) {
    const prakriti = getPrakriti();
    const info = doshaInfo[prakriti];
    const vataPercent = Math.round((scores.vata / quizQuestions.length) * 100);
    const pittaPercent = Math.round((scores.pitta / quizQuestions.length) * 100);
    const kaphaPercent = Math.round((scores.kapha / quizQuestions.length) * 100);

    return (
      <div className="result-page">
        <style>{CSS}</style>
        <div className="result-wrapper">
          <div className="result-hero" style={{ '--gradient': info.bgGradient }}>
            <div className="result-emoji-large">{info.emoji}</div>
            <div className="result-name">{info.name} Prakriti</div>
            <div className="result-element">{info.element}</div>
          </div>

          <div className="description-card" style={{ '--color': info.color }}>
            <h2 className="card-heading" style={{ color: info.color }}>✨ About Your Prakriti</h2>
            <p className="card-text">{info.desc}</p>
          </div>

          <div className="breakdown-section" style={{ '--color': info.color, '--light-color': info.lightColor }}>
            <h2 className="breakdown-title">📊 Your Dosha Breakdown</h2>
            <div className="breakdown-grid">
              <div className="breakdown-card" style={{ '--color': doshaInfo.vata.color, '--light-color': doshaInfo.vata.lightColor, borderColor: prakriti === 'vata' ? doshaInfo.vata.color : '#E5E7EB', background: prakriti === 'vata' ? doshaInfo.vata.lightColor : 'linear-gradient(135deg, #F8F8F8, #FFFFFF)' }}>
                <div className="breakdown-emoji">{doshaInfo.vata.emoji}</div>
                <div className="breakdown-label">Vata</div>
                <div className="breakdown-percent">{vataPercent}%</div>
              </div>
              <div className="breakdown-card" style={{ '--color': doshaInfo.pitta.color, '--light-color': doshaInfo.pitta.lightColor, borderColor: prakriti === 'pitta' ? doshaInfo.pitta.color : '#E5E7EB', background: prakriti === 'pitta' ? doshaInfo.pitta.lightColor : 'linear-gradient(135deg, #F8F8F8, #FFFFFF)' }}>
                <div className="breakdown-emoji">{doshaInfo.pitta.emoji}</div>
                <div className="breakdown-label">Pitta</div>
                <div className="breakdown-percent">{pittaPercent}%</div>
              </div>
              <div className="breakdown-card" style={{ '--color': doshaInfo.kapha.color, '--light-color': doshaInfo.kapha.lightColor, borderColor: prakriti === 'kapha' ? doshaInfo.kapha.color : '#E5E7EB', background: prakriti === 'kapha' ? doshaInfo.kapha.lightColor : 'linear-gradient(135deg, #F8F8F8, #FFFFFF)' }}>
                <div className="breakdown-emoji">{doshaInfo.kapha.emoji}</div>
                <div className="breakdown-label">Kapha</div>
                <div className="breakdown-percent">{kaphaPercent}%</div>
              </div>
            </div>
          </div>

          <div className="traits-section" style={{ '--color': info.color, '--light-color': info.lightColor }}>
            <h2 className="traits-title">🌟 Your Core Traits</h2>
            <div className="traits-grid">
              {info.traits.map((trait, i) => (
                <div key={i} className="trait-badge" style={{ '--color': info.color, '--light-color': info.lightColor }}>
                  <div className="trait-text">✓ {trait}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="recommendations-section" style={{ '--color': info.color, '--light-color': info.lightColor }}>
            <h2 className="rec-title">💡 Lifestyle Recommendations</h2>
            <div className="rec-grid">
              {info.recommendations.map((rec, i) => (
                <div key={i} className="rec-item" style={{ '--color': info.color, '--light-color': info.lightColor }}>
                  <div className="rec-text">
                    <span className="rec-icon">→</span>
                    <span>{rec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="action-section" style={{ '--color': info.color }}>
            <button className="btn-action btn-primary" style={{ background: info.color }} onClick={() => { setCurrentQ(0); setScores({ vata: 0, pitta: 0, kapha: 0 }); setFinished(false); setSelectedAnswer(null); }}>🔄 Retake Quiz</button>
            <button className="btn-action btn-secondary">📅 Book Vaidya</button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQ + 1) / quizQuestions.length) * 100;

  return (
    <div className="quiz-container">
      <style>{CSS}</style>
      <div className="quiz-card">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="header-text">🌿 Prakriti Quiz</div>
          <p className="subheader-text">Discover your Ayurvedic constitution in 10 simple questions</p>
        </div>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
            <span style={{ fontWeight: '600', color: '#666' }}>Question {currentQ + 1}/10</span>
            <span style={{ fontWeight: '700', color: '#FF6B35' }}>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <h2 className="question-text">{quizQuestions[currentQ].q}</h2>
        <div>
          {quizQuestions[currentQ].options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt.dosha)} className={`answer-btn ${selectedAnswer === opt.dosha ? 'selected' : ''}`} style={{ animationDelay: `${i * 50}ms` }}>
              <span style={{ fontWeight: '500' }}>→</span> {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrakritiQuiz;