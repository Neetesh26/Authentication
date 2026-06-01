import { useState } from 'react';
import { Card, Btn, Badge } from '../../../ui/primitives.jsx';
import { TOKENS as T } from '../../../theme/tokens.js';

export default function SettingsSection({ showToast, profile }) {
  const [scanSchedule, setScanSchedule] = useState('daily');
  const [autoPR, setAutoPR] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [threshold, setThreshold] = useState('high');

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: T.tx1, margin: '0 0 6px', letterSpacing: '-0.02em' }}>Settings</h1>
        <p style={{ color: T.tx3, fontSize: 14 }}>Configure your AI engineer&apos;s behavior, notifications, and account.</p>
      </div>

      <div style={{ maxWidth: 600 }}>
        {profile && (
          <Card style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.tx1, marginBottom: 8 }}>Account</div>
            <div style={{ fontSize: 13, color: T.tx2 }}>{profile.name}</div>
            <div style={{ fontSize: 12, color: T.tx3, marginTop: 4 }}>{profile.email}</div>
          </Card>
        )}

        <Card style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.tx1 }}>Scan schedule</div>
              <div style={{ fontSize: 12, color: T.tx3, marginTop: 3 }}>How often your AI engineer scans each repo for issues</div>
            </div>
            <select value={scanSchedule} onChange={(e) => setScanSchedule(e.target.value)} style={{ padding: '7px 12px', background: T.bg3, border: `1px solid ${T.brd}`, borderRadius: 8, fontSize: 13, color: T.tx1, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              <option value="daily">Daily (recommended)</option>
              <option value="weekly">Weekly</option>
              <option value="manual">Manual only</option>
            </select>
          </div>
        </Card>

        {[
          { label: 'Auto-raise PRs', desc: 'Automatically raise PRs for high-confidence fixes (>85% confidence)', val: autoPR, set: setAutoPR },
          { label: 'Email notifications', desc: 'Get notified when PRs are raised or health score changes significantly', val: emailNotifs, set: setEmailNotifs },
        ].map((s) => (
          <Card key={s.label} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.tx1 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: T.tx3, marginTop: 3 }}>{s.desc}</div>
              </div>
              <div onClick={() => s.set(!s.val)} style={{ width: 44, height: 24, background: s.val ? T.p : T.bg3, border: `1px solid ${s.val ? T.p2 : T.brd}`, borderRadius: 12, cursor: 'pointer', position: 'relative', transition: 'all .2s', flexShrink: 0 }}>
                <div style={{ width: 18, height: 18, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, left: s.val ? 23 : 3, transition: 'left .2s', boxShadow: '0 1px 4px rgba(0,0,0,.4)' }} />
              </div>
            </div>
          </Card>
        ))}

        <Card style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.tx1 }}>Alert threshold</div>
              <div style={{ fontSize: 12, color: T.tx3, marginTop: 3 }}>Only notify for issues above this severity level</div>
            </div>
            <select value={threshold} onChange={(e) => setThreshold(e.target.value)} style={{ padding: '7px 12px', background: T.bg3, border: `1px solid ${T.brd}`, borderRadius: 8, fontSize: 13, color: T.tx1, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              <option value="all">All issues</option>
              <option value="high">High + Critical</option>
              <option value="critical">Critical only</option>
            </select>
          </div>
        </Card>

        <Card style={{ background: T.pl, borderColor: T.p, marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.pm }}>Solo plan — Rs.999/month</div>
              <div style={{ fontSize: 12, color: T.tx3, marginTop: 4 }}>2/3 repos used · Next billing June 1, 2026</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <Btn size="sm" onClick={() => showToast('Opening upgrade page…')}>Upgrade to Startup</Btn>
                <Btn variant="ghost" size="sm" onClick={() => showToast('Managing billing…')}>Manage billing</Btn>
              </div>
            </div>
            <Badge variant="purple">Active</Badge>
          </div>
        </Card>

        <Btn onClick={() => showToast('Settings saved successfully')} style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
          Save settings
        </Btn>
      </div>
    </div>
  );
}
