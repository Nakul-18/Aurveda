import { useState } from 'react';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Poppins', sans-serif; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
  @keyframes spin { to { transform: rotate(360deg); } }

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

  .left-logo { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: #FDF6EC; cursor: pointer; }
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

  .submit-btn { width: 100%; padding: 16px; background: #E8650A; color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s; font-family: 'Poppins', sans-serif; margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 10px; }
  .submit-btn:hover { background: #D05508; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(232,101,10,0.3); }
  .submit-btn:disabled { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.3); cursor: not-allowed; transform: none; box-shadow: none; }

  .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }

  .alert { padding: 14px 16px; border-radius: 10px; font-size: 13px; font-weight: 500; margin-bottom: 20px; }
  .alert-success { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.2); color: #22c55e; }
  .alert-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: #ef4444; }

  .divider { display: flex; align-items: center; gap: 16px; margin: 24px 0; }
  .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
  .divider-text { color: rgba(255,255,255,0.25); font-size: 12px; }

  .social-btns { display: flex; gap: 12px; }
  .social-btn { flex: 1; padding: 13px; background: #111; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .social-btn:hover { border-color: rgba(255,255,255,0.2); color: white; }

  .form-footer { text-align: center; margin-top: 24px; color: rgba(255,255,255,0.25); font-size: 12px; }

  .user-info { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.15); border-radius: 14px; padding: 20px; margin-bottom: 20px; }
  .user-welcome { color: #22c55e; font-size: 16px; font-weight: 700; margin-bottom: 4px; }
  .user-email { color: rgba(255,255,255,0.4); font-size: 13px; }
  .logout-btn { width: 100%; padding: 12px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: #ef4444; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Poppins', sans-serif; margin-top: 12px; transition: all 0.2s; }
  .logout-btn:hover { background: rgba(239,68,68,0.2); }
  .go-home-btn { width: 100%; padding: 14px; background: #E8650A; color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; margin-top: 8px; transition: all 0.2s; }
  .go-home-btn:hover { background: #D05508; transform: translateY(-2px); }

  @media (max-width: 768px) {
    .login-page { grid-template-columns: 1fr; }
    .login-left { display: none; }
    .login-right { padding: 40px 24px; }
  }
`;

const API = 'http://localhost:5000/api';

function Login() {
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('arogyamed_token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('arogyamed_user') || 'null'));

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      showAlert('error', 'Please fill all fields!');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('arogyamed_token', data.token);
        localStorage.setItem('arogyamed_user', JSON.stringify(data.user));
        setUser(data.user);
        setLoggedIn(true);
        showAlert('success', `Welcome back, ${data.user.name}! 🌿`);
      } else {
        showAlert('error', data.message);
      }
    } catch (err) {
      showAlert('error', 'Cannot connect to server. Make sure backend is running!');
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!regName || !regEmail || !regPhone || !regPassword) {
      showAlert('error', 'Please fill all fields!');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email: regEmail, phone: regPhone, password: regPassword }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('arogyamed_token', data.token);
        localStorage.setItem('arogyamed_user', JSON.stringify(data.user));
        setUser(data.user);
        setLoggedIn(true);
        showAlert('success', `Welcome to ĀrogyaMed, ${data.user.name}! 🌿`);
      } else {
        showAlert('error', data.message);
      }
    } catch (err) {
      showAlert('error', 'Cannot connect to server. Make sure backend is running!');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('arogyamed_token');
    localStorage.removeItem('arogyamed_user');
    setLoggedIn(false);
    setUser(null);
    showAlert('success', 'Logged out successfully!');
  };

  return (
    <div className="login-page">
      <style>{CSS}</style>

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="left-logo" onClick={() => window.location.href = '/'}>Ārogya<span>Med</span></div>
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
          {loggedIn && user ? (
            <>
              <div className="form-title">Welcome Back! 👋</div>
              <div className="form-sub">You are logged in</div>
              {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
              <div className="user-info">
                <div className="user-welcome">🌿 {user.name}</div>
                <div className="user-email">{user.email}</div>
                <div className="user-email" style={{ marginTop: '4px' }}>📱 {user.phone}</div>
              </div>
              <button className="go-home-btn" onClick={() => window.location.href = '/'}>🏠 Go to Home</button>
              <button className="go-home-btn" style={{ background: '#1A3C2E', marginTop: '8px' }} onClick={() => window.location.href = '/dashboard'}>📊 Go to Dashboard</button>
              <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
            </>
          ) : (
            <>
              <div className="form-title">{tab === 'login' ? 'Welcome Back' : 'Create Account'}</div>
              <div className="form-sub">{tab === 'login' ? 'Sign in to your ĀrogyaMed account' : 'Join ĀrogyaMed today'}</div>

              {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}

              <div className="tabs">
                <button className={`tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Login</button>
                <button className={`tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>Sign Up</button>
              </div>

              {tab === 'login' && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" placeholder="Enter your email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input className="form-input" type="password" placeholder="Enter your password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                  </div>
                  <button className="submit-btn" onClick={handleLogin} disabled={loading}>
                    {loading ? <><div className="spinner" /> Logging in...</> : 'Login →'}
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
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" type="text" placeholder="Enter your full name" value={regName} onChange={e => setRegName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" placeholder="Enter your email" value={regEmail} onChange={e => setRegEmail(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" type="tel" placeholder="Enter phone number" value={regPhone} onChange={e => setRegPhone(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input className="form-input" type="password" placeholder="Create a password" value={regPassword} onChange={e => setRegPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleRegister()} />
                  </div>
                  <button className="submit-btn" onClick={handleRegister} disabled={loading}>
                    {loading ? <><div className="spinner" /> Creating account...</> : 'Create Account →'}
                  </button>
                </div>
              )}

              <div className="form-footer">By continuing you agree to our Terms & Privacy Policy</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;