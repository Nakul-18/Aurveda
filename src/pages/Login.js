import { useState } from 'react';

function Login() {
  const [tab, setTab] = useState('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1A3C2E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1A3C2E',
            fontFamily: 'serif'
          }}>Ārogya<span style={{color: '#C9973A'}}>Med</span></div>
          <p style={{color: '#6B7280', fontSize: '14px', marginTop: '4px'}}>
            Your Wellness Journey Starts Here
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          background: '#F3F4F6',
          borderRadius: '10px',
          padding: '4px',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => setTab('login')}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              background: tab === 'login' ? 'white' : 'transparent',
              color: tab === 'login' ? '#1A3C2E' : '#6B7280',
              boxShadow: tab === 'login' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}>
            Login
          </button>
          <button
            onClick={() => setTab('signup')}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              background: tab === 'signup' ? 'white' : 'transparent',
              color: tab === 'signup' ? '#1A3C2E' : '#6B7280',
              boxShadow: tab === 'signup' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}>
            Sign Up
          </button>
        </div>

        {/* LOGIN FORM */}
        {tab === 'login' && (
          <div>
            <div style={{marginBottom: '16px'}}>
              <label style={{fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px'}}>
                Phone Number
              </label>
              <div style={{display: 'flex', gap: '8px'}}>
                <span style={{
                  padding: '12px 14px',
                  background: '#F3F4F6',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '600'
                }}>🇮🇳 +91</span>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    border: '1.5px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {otpSent && (
              <div style={{marginBottom: '16px'}}>
                <label style={{fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px'}}>
                  Enter OTP
                </label>
                <input
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1.5px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    letterSpacing: '4px'
                  }}
                />
              </div>
            )}

            <button
              onClick={() => setOtpSent(true)}
              style={{
                width: '100%',
                padding: '14px',
                background: '#E8650A',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '8px'
              }}>
              {otpSent ? 'Verify OTP & Login' : 'Send OTP'}
            </button>
          </div>
        )}

        {/* SIGNUP FORM */}
        {tab === 'signup' && (
          <div>
            {[
              { label: 'Full Name', placeholder: 'Enter your full name', value: name, setter: setName, type: 'text' },
              { label: 'Email Address', placeholder: 'Enter your email', value: email, setter: setEmail, type: 'email' },
              { label: 'Phone Number', placeholder: 'Enter your phone number', value: phone, setter: setPhone, type: 'tel' },
            ].map((field, i) => (
              <div key={i} style={{marginBottom: '16px'}}>
                <label style={{fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px'}}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={e => field.setter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1.5px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            ))}

            <button style={{
              width: '100%',
              padding: '14px',
              background: '#1A3C2E',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '8px'
            }}>
              Create Account
            </button>
          </div>
        )}

        <p style={{textAlign: 'center', fontSize: '12px', color: '#9CA3AF', marginTop: '24px'}}>
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default Login;