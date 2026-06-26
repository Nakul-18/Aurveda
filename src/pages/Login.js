import { useState } from 'react';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Poppins', sans-serif; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

  .login-page {
    min-height: 100vh;
    background: #0A0A0A;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .login-left {
    background: linear-gradient(135deg, #0F1F23 0%, #1A3C2E 60%, #0F2E23 100%);
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }
  .login-left::before { content: '🌿'; position: absolute; right: -20px; bottom: -20px; font-size: 300px; opacity: 0.05; animation: float 8s ease-in-out infinite; }

  .left-logo { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: #FDF6EC; }
  .left-logo span { color: #C9973A; }

  .left-content { position: relative; z-index: 1; }
  .left-tag { display: inline-block; background: rgba(201,151,58,0.15); border: 1px solid rgba(201,151,58,0.25); color: #C9973A; padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
  .left-title { font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 900; color: #FDF6EC; line-height: 1.1; margin-bottom: 20px; }
  .left-title span { color: #C9973A; display: block; }
  .left-desc { color: rgba(253,246,236,0.5); font-size: 16px; line-height: 1.8; font-weight: 300; margin-bottom: 48px; }

  .features-list { display: flex; flex-direction: column; gap: 16px; }
  .feature-item { display: flex; align-items: center; gap: 14px; }
  .feature-icon { width: 40px; height: 40px; background: rgba(201,151,58,0.15); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .feature-text { color: rgba(253,246,236,0.7); font-size: 14px; font-weight: 500; }

  .left-footer { color: rgba(253,246,236,0.25); font-size: 12px; }

  .login-right {
    background: #0A0A0A;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 80px;
  }

  .login-form-wrap { width: 100%; max-width: 400px; animation: slideUp 0.7s ease-out; }
  .form-title { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; color: #FDF6EC; margin-bottom: 8px; }
  .form-sub { color: rgba(255,255,255,0.4); font-size: 15px; margin-bottom: 40px; }

  .tabs { display: flex; background: #111; border-radius: 12px; padding: 4px; margin-bottom: 32px; border: 1px solid rgba(255,255,255,0.06); }
  .tab { flex: 1; padding: 12px; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .tab.active { background: #E8650A; color: white; }
  .tab:not(.active) { background: transparent; color: rgba(255,255,255,0.4); }

  .form-group { margin-bottom: 20px; }
  .form-label { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.5); display: block; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
  .form-input { width: 100%; padding: 14px 16px; background: #111; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; font-size: 15px; color: #FDF6EC; outline: none; font-family: 'Poppins', sans-serif; transition: border-color 0.2s; }
  .form-input:focus { border-color: #E8650A; }
  .form-input::placeholder { color: rgba(255,255,255,0.2); }

  .phone-row { display: flex; gap: 10px; }
  .phone-code { padding: 14px 16px; background: #111; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; font-size: 15px; color: #FDF6EC; font-weight: 600; white-space: nowrap; }

  .submit-btn { width: 100%; padding: 16px; background: #E8650A; color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s; font-family: 'Poppins', sans-serif; margin-top: 8px; }
  .submit-btn:hover { background: #D05508; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(232,101,10,0.3); }

  .divider { display: flex; align-items: center; gap: 16px; margin: 24px 0; }
  .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
  .divider-text { color: rgba(255,255,255,0.25); font-size: 12px; }

  .social-btns { display: flex; gap: 12px; }
  .social-btn { flex: 1; padding: 13px; background: #111; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .social-btn:hover { border-color: rgba(255,255,255,0.2); color: white; }

  .form-footer { text-align: center; margin-top: 24px; color: rgba(255,255,255,0.25); font-size: 12px; }

  @media (max-width: 768px) {
    .login-page { grid-template-columns: 1fr; }
    .login-left { display: none; }
    .login-right { padding: 40px 24px; }
  }
`;

function Login() {
  const [tab, setTab] = useState('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="login-page">
      <style>{CSS}</style>

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="left-logo">Ārogya<span>Med</span></div>
        <div className="left-content">
          <div className="left-tag">🌿 Wellness Platform</div>
          <div className="left-title">Your Journey to<span>Healing</span>Starts Here</div>
          <p className="left-desc">Join thousands of patients who found balance and wellness through the ancient wisdom of Ayurveda.</p>
          <div className="features-list">
            {[
              { icon: "🩺", text: "Consult certified Vaidyas online" },
              { icon: "🌿", text: "Discover your Prakriti body type" },
              { icon: "🧘", text: "Access yoga & wellness programs" },
              { icon: "💊", text: "Get digital Ayurvedic prescriptions" },
            ].map((f, i) => (
              <div key={i} className="feature-item">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-text">{f.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="left-footer">© 2026 ĀrogyaMed. All rights reserved.</div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-form-wrap">
          <div className="form-title">Welcome Back</div>
          <div className="form-sub">Sign in to your ĀrogyaMed account</div>

          <div className="tabs">
            <button className={`tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Login</button>
            <button className={`tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>Sign Up</button>
          </div>

          {tab === 'login' && (
            <div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="phone-row">
                  <div className="phone-code">🇮🇳 +91</div>
                  <input className="form-input" type="tel" placeholder="Enter your phone number" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>
              {otpSent && (
                <div className="form-group">
                  <label className="form-label">OTP</label>
                  <input className="form-input" type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} style={{ letterSpacing: '6px', textAlign: 'center', fontSize: '20px' }} />
                </div>
              )}
              <button className="submit-btn" onClick={() => setOtpSent(true)}>
                {otpSent ? '✓ Verify & Login' : 'Send OTP →'}
              </button>
              <div className="divider">
                <div className="divider-line" />
                <div className="divider-text">or continue with</div>
                <div className="divider-line" />
              </div>
              <div className="social-btns">
                <button className="social-btn">🔵 Google</button>
                <button className="social-btn">⚫ Apple</button>
              </div>
            </div>
          )}

          {tab === 'signup' && (
            <div>
              {[
                { label: 'Full Name', placeholder: 'Enter your full name', value: name, setter: setName, type: 'text' },
                { label: 'Email Address', placeholder: 'Enter your email', value: email, setter: setEmail, type: 'email' },
                { label: 'Phone Number', placeholder: 'Enter your phone number', value: phone, setter: setPhone, type: 'tel' },
              ].map((field, i) => (
                <div key={i} className="form-group">
                  <label className="form-label">{field.label}</label>
                  <input className="form-input" type={field.type} placeholder={field.placeholder} value={field.value} onChange={e => field.setter(e.target.value)} />
                </div>
              ))}
              <button className="submit-btn">Create Account →</button>
            </div>
          )}

          <div className="form-footer">By continuing you agree to our Terms & Privacy Policy</div>
        </div>
      </div>
    </div>
  );
}

export default Login;