import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { login, register, saveToken } from '../../services/authService.js';
import { Btn, Input } from '../../ui/primitives.jsx';
import { TOKENS as T } from '../../theme/tokens.js';

export default function LoginPage({ setUser, setGlobalError }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'At least 6 characters';
    if (mode === 'signup' && !name.trim()) e.name = 'Name is required';
    return e;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    setGlobalError('');

    try {
      if (mode === 'login') {
        const response = await login({ email, password });
        saveToken(response.token);
        setUser(response.user);
        navigate('/connect');
      } else {
        await register({ name, email, password });
        const response = await login({ email, password });
        saveToken(response.token);
        setUser(response.user);
        navigate('/connect');
      }
    } catch (err) {
      setGlobalError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Autonomous bug detection & auto-fix pull requests',
    'Dependency upgrade PRs raised automatically',
    'Security vulnerability scanning — CVE, OSV, npm audit',
    'Repo health score (0–100), tracked over time',
    'Human approval layer — nothing merges without you',
    'JWT-secured authentication with your backend',
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ background: `radial-gradient(ellipse at 20% 80%, ${T.pl} 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${T.pl} 0%, transparent 60%), ${T.bg1}`, padding: '4rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: `1px solid ${T.brd}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${T.brd} 1px, transparent 1px)`, backgroundSize: '32px 32px', opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill={T.p} />
              <path d="M7 14L11.5 18.5L21 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: T.tx1 }}>TeslaLab AI</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: T.tx1, lineHeight: 1.15, margin: '0 0 16px', letterSpacing: '-0.03em' }}>
            Your AI<br />
            <span style={{ color: T.pm }}>Senior Software</span>
            <br />
            Engineer.
          </h1>
          <p style={{ color: T.tx2, fontSize: 14, lineHeight: 1.7, marginBottom: '2rem', maxWidth: 340 }}>
            TeslaLab maintains your GitHub repo 24/7 — fixing bugs, upgrading dependencies, scanning vulnerabilities, and raising PRs.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {features.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 18, height: 18, borderRadius: 6, background: T.pl, border: '1px solid #4C1D95', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L4 7.5L8.5 2.5" stroke={T.pm} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontSize: 13, color: T.tx2, lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: 16, marginTop: '2rem' }}>
            {[['1,000+', 'Developers'], ['50+', 'Paying customers'], ['3,200+', 'PRs raised']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 600, color: T.tx1 }}>{v}</div>
                <div style={{ fontSize: 11, color: T.tx3, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', background: T.bg0 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <AnimatePresence mode="wait">
            <motion.div key={mode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 700, color: T.tx1, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h2>
              <p style={{ color: T.tx3, fontSize: 14, marginBottom: 28 }}>
                {mode === 'login' ? 'Sign in to your TeslaLab dashboard' : 'Create an account — connects to your auth API'}
              </p>

              <form onSubmit={handleSubmit}>
                {mode === 'signup' && (
                  <Input label="Full name" placeholder="Rahul Gupta" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>} />
                )}
                <Input label="Email address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>} />
                <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>} />

                <Btn type="submit" loading={loading} style={{ width: '100%', justifyContent: 'center', padding: '11px 18px', fontSize: 14 }}>
                  {!loading && (mode === 'login' ? 'Sign in to dashboard' : 'Create account & continue')}
                </Btn>
              </form>

              <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: T.tx3 }}>
                {mode === 'login' ? (
                  <>Don&apos;t have an account?{' '}<button type="button" onClick={() => setMode('signup')} style={{ color: T.pm, cursor: 'pointer', fontWeight: 500, background: 'none', border: 'none', fontSize: 13 }}>Sign up free</button></>
                ) : (
                  <>Already have an account?{' '}<button type="button" onClick={() => setMode('login')} style={{ color: T.pm, cursor: 'pointer', fontWeight: 500, background: 'none', border: 'none', fontSize: 13 }}>Sign in</button></>
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
