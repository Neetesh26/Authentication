import { ACTIVITY } from '../../../data/mockData.js';
import { Card } from '../../../ui/primitives.jsx';
import { TOKENS as T } from '../../../theme/tokens.js';

export default function ActivitySection() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: T.tx1, margin: '0 0 6px', letterSpacing: '-0.02em' }}>Activity log</h1>
        <p style={{ color: T.tx3, fontSize: 14 }}>Complete record of everything your AI engineering team has done.</p>
      </div>
      <Card noPad>
        {ACTIVITY.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 20px', borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${T.brd}` : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: T.bg3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.tx1 }}>{a.title}</div>
              <div style={{ fontSize: 12, color: T.tx3, marginTop: 3, lineHeight: 1.5 }}>{a.sub}</div>
            </div>
            <div style={{ fontSize: 11, color: T.tx4, whiteSpace: 'nowrap', marginTop: 2 }}>{a.time}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}
