import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GITHUB_REPOS } from '../../data/mockData.js';
import { Card, Btn, Input, Badge } from '../../ui/primitives.jsx';
import { TOKENS as T } from '../../theme/tokens.js';

export default function ConnectRepoPage() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [phase, setPhase] = useState('select');
  const [scanStep, setScanStep] = useState(-1);
  const navigate = useNavigate();

  const scanSteps = [
    { label: 'Cloning repository (shallow clone)…' },
    { label: 'Detecting framework & language…' },
    { label: 'Scanning dependencies (npm/pip)…' },
    { label: 'Running security scan (OSV + CVE)…' },
    { label: 'Indexing codebase into RAG (Qdrant)…' },
    { label: 'Calculating initial health score…' },
  ];

  const filtered = GITHUB_REPOS.filter(
    (r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase())
  );

  const langColors = {
    TypeScript: { bg: T.bl, color: '#60A5FA' },
    Python: { bg: T.gl, color: '#34D399' },
    JavaScript: { bg: T.al, color: '#FCD34D' },
    HCL: { bg: '#1A1033', color: '#A78BFA' },
  };

  const startScan = () => {
    if (!selected) return;
    setPhase('scanning');
    let i = 0;
    const iv = setInterval(() => {
      setScanStep(i);
      i += 1;
      if (i >= scanSteps.length) {
        clearInterval(iv);
        setTimeout(() => setPhase('done'), 500);
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    }, 900);
  };

  const steps = [
    { n: 1, label: 'GitHub OAuth', done: true },
    { n: 2, label: 'Select repo', active: phase === 'select' },
    { n: 3, label: 'Initial scan', active: phase === 'scanning' || phase === 'done' },
    { n: 4, label: 'Dashboard', pending: phase !== 'done' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 700, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 700, color: T.tx1, margin: '0 0 6px', letterSpacing: '-0.02em' }}>Connect a GitHub repository</h1>
      <p style={{ color: T.tx3, fontSize: 14, marginBottom: 28 }}>Select a repo and your AI engineer will start maintaining it automatically.</p>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 8 }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 0, minWidth: 140 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: s.done ? T.g : s.active ? T.p : T.bg3, border: `2px solid ${s.done ? T.g : s.active ? T.p : T.brd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: s.done || s.active ? '#fff' : T.tx4, flexShrink: 0 }}>
                {s.done ? '✓' : s.n}
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: s.done ? T.g : s.active ? T.pm : T.tx4, whiteSpace: 'nowrap' }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: s.done ? T.g : T.bg3, margin: '0 12px', borderRadius: 1, minWidth: 24 }} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === 'select' && (
          <motion.div key="select" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <Input
              placeholder="Search repositories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>}
              style={{ marginBottom: 12 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 360, overflowY: 'auto' }}>
              {filtered.map((r) => {
                const lc = langColors[r.lang] || { bg: T.bg3, color: T.tx2 };
                const isSel = selected?.id === r.id;
                return (
                  <motion.div key={r.id} whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.997 }}>
                    <div onClick={() => setSelected(r)} style={{ padding: '12px 16px', borderRadius: 12, background: isSel ? T.pl : T.bg2, border: `1px solid ${isSel ? T.p : T.brd}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all .15s' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontWeight: 600, fontSize: 14, color: isSel ? T.pm : T.tx1 }}>{r.name}</span>
                          {r.priv && <Badge variant="red" size="xs">Private</Badge>}
                          {!r.priv && r.stars > 0 && <span style={{ fontSize: 11, color: T.tx4 }}>★ {r.stars}</span>}
                        </div>
                        <div style={{ fontSize: 12, color: T.tx3, marginTop: 3 }}>{r.desc} · Updated {r.updated}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 5, fontWeight: 500, background: lc.bg, color: lc.color }}>{r.lang}</span>
                        {isSel && <span style={{ color: T.pm, fontSize: 16 }}>✓</span>}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <Btn onClick={startScan} disabled={!selected} style={{ marginTop: 20, gap: 8 }}>
              {selected ? `Connect "${selected.name}"` : 'Select a repository first'}
            </Btn>
          </motion.div>
        )}

        {(phase === 'scanning' || phase === 'done') && (
          <motion.div key="scan" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card style={{ background: phase === 'done' ? T.gl : T.pl, borderColor: phase === 'done' ? T.g : T.p }}>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: phase === 'done' ? '#34D399' : T.pm }}>
                  {phase === 'done' ? '✓ AI engineer is ready!' : `Setting up for "${selected?.name}"…`}
                </span>
              </div>
              <p style={{ fontSize: 13, color: T.tx2, marginBottom: 20 }}>
                {phase === 'done' ? 'Redirecting to your dashboard…' : 'Cloning, scanning, and indexing your codebase. This takes about 30 seconds.'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {scanSteps.map((s, i) => {
                  const done = i < scanStep;
                  const running = i === scanStep;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, background: done ? T.g : running ? T.p : T.bg3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, animation: running ? 'spin .9s linear infinite' : 'none' }}>
                        {done ? '✓' : running ? '↻' : '·'}
                      </div>
                      <span style={{ fontSize: 13, color: done ? T.tx2 : running ? T.pm : T.tx4, fontWeight: running ? 500 : 400 }}>{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
