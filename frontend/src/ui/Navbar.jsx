import { useLocation, useNavigate } from 'react-router-dom';
import { Badge, Dot } from './primitives.jsx';
import { TOKENS as T } from '../theme/tokens.js';
import { getToken } from '../services/authService.js';

const NAV_ITEMS = [
  { key: 'login', label: 'Login', path: '/login', guestOnly: true },
  { key: 'connect', label: 'Connect repo', path: '/connect', authOnly: true },
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard', authOnly: true },
];

export default function Navbar({ user, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = Boolean(getToken());

  const visibleItems = NAV_ITEMS.filter((item) => {
    if (item.guestOnly) return !isAuthenticated;
    if (item.authOnly) return isAuthenticated;
    return true;
  });

  const displayName = typeof user === 'string' ? user : user?.name;

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${T.brd}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 56 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect width="22" height="22" rx="6" fill={T.p} />
          <path d="M6 11L9.5 14.5L16 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: T.tx1, letterSpacing: '-0.01em' }}>TeslaLab</span>
        <Badge variant="purple" size="xs">AI</Badge>
      </div>

      <nav style={{ display: 'flex', gap: 3, background: T.bg2, padding: 3, borderRadius: 12, border: `1px solid ${T.brd}` }}>
        {visibleItems.map((n) => {
          const active = location.pathname === n.path;
          return (
            <button
              key={n.key}
              type="button"
              onClick={() => navigate(n.path)}
              style={{ padding: '5px 14px', borderRadius: 9, border: 'none', background: active ? T.p : 'transparent', color: active ? '#fff' : T.tx3, fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all .15s', fontFamily: "'DM Sans', sans-serif" }}
            >
              {n.label}
            </button>
          );
        })}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {isAuthenticated && displayName ? (
          <>
            <Dot color={T.g} pulse />
            <span style={{ fontSize: 12, color: T.tx3 }}>4 repos active</span>
            <button
              type="button"
              onClick={onLogout}
              title="Logout"
              style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${T.p}, ${T.pm})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', border: `2px solid ${T.brd2}` }}
            >
              {displayName[0]?.toUpperCase()}
            </button>
          </>
        ) : (
          <span style={{ fontSize: 13, color: T.tx3 }}>← Navigate above</span>
        )}
      </div>
    </header>
  );
}
