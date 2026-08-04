import React from 'react';

function PrakritiTab({ prakriti, loadingPrakriti }) {
  return (
    <>
      <div className="dash-greeting">My Prakriti</div>
      <div className="dash-date">Your Ayurvedic body type analysis</div>
      {loadingPrakriti ? (
        <div className="loading-wrap" style={{ marginTop: '24px' }}><div className="spinner"/>Loading prakriti data...</div>
      ) : !prakriti ? (
        <div className="dash-card" style={{ marginTop: '24px', textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🌿</div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#FDF6EC', marginBottom: '12px' }}>No Prakriti Result Yet</div>
          <div style={{ color: 'rgba(255,255,255,.3)', marginBottom: '24px' }}>Take the Prakriti quiz to discover your Ayurvedic body type</div>
          <button className="book-now-btn" onClick={() => window.location.href = '/prakriti-quiz'}>Take Prakriti Quiz →</button>
        </div>
      ) : (
        <div className="prakriti-card">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '80px', marginBottom: '16px' }}>
              {prakriti.result === 'vata' ? '🌬️' : prakriti.result === 'pitta' ? '🔥' : '💧'}
            </div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: '900', color: '#E8650A', marginBottom: '8px', textTransform: 'capitalize' }}>
              {prakriti.result} Prakriti
            </div>
          </div>
          <div className="prakriti-grid">
            {[
              { emoji: '🌬️', name: 'Vata', score: prakriti.vata_score, color: '#E8650A' },
              { emoji: '🔥', name: 'Pitta', score: prakriti.pitta_score, color: '#C9973A' },
              { emoji: '💧', name: 'Kapha', score: prakriti.kapha_score, color: '#2D6A4F' },
            ].map((dosha, i) => {
              const total = prakriti.vata_score + prakriti.pitta_score + prakriti.kapha_score;
              const percent = Math.round((dosha.score / total) * 100);
              return (
                <div key={i} className="dosha-card">
                  <div className="dosha-emoji">{dosha.emoji}</div>
                  <div className="dosha-name" style={{ color: dosha.color }}>{dosha.name}</div>
                  <div className="dosha-bar">
                    <div className="dosha-fill" style={{ width: `${percent}%`, background: dosha.color }} />
                  </div>
                  <div className="dosha-percent" style={{ color: dosha.color }}>{percent}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default PrakritiTab;
