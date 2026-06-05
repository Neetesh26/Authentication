import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clearToken, getToken } from '../../services/authService.js';
import { getProfile } from '../../services/userService.js';
import { getDashboard } from '../../services/dashboardService.js';
import { approvePR as approvePRApi } from '../../services/prService.js';
import { Btn, Dot } from '../../ui/primitives.jsx';
import { TOKENS as T } from '../../theme/tokens.js';
import OverviewSection from './sections/OverviewSection.jsx';
import PRsSection from './sections/PRsSection.jsx';
import HealthSection from './sections/HealthSection.jsx';
import ActivitySection from './sections/ActivitySection.jsx';
import SettingsSection from './sections/SettingsSection.jsx';

export default function TeslaDashboard({ user, setUser, setGlobalError, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState('overview');
  const [repos, setRepos] = useState([]);
  const [prs, setPrs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [metrics, setMetrics] = useState({ reposCount: 0, openPRs: 0, mergedPRs: 0, avgHealth: 0, issuesResolved: 0, recentActivity: [], activityFeed: [] });
  const [activeRepo, setActiveRepo] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = useCallback((msg) => {
    setToast({ msg });
    setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => {
    async function fetchDashboardData() {
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      setGlobalError('');
      setLoading(true);

      try {
        const profileResponse = await getProfile();
        const profileData = profileResponse.user || profileResponse;
        setProfile(profileData);
        if (!user) setUser(profileData);

        const dashboardResponse = await getDashboard();
        setRepos(dashboardResponse.repos || []);
        setPrs(dashboardResponse.prs || []);
        setActivities(dashboardResponse.activities || []);
        setMetrics(dashboardResponse.metrics || metrics);
        setActiveRepo(dashboardResponse.repos?.[0] || null);
      } catch (error) {
        setGlobalError(error.message);
        if (error.message.toLowerCase().includes('token')) {
          clearToken();
          setUser(null);
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [navigate, setGlobalError, setUser, user]);

  const approvePR = async (id) => {
    try {
      const response = await approvePRApi(id);
      setPrs((prev) => prev.map((p) => (String(p._id || p.id) === String(response.pr._id) ? { ...p, status: 'merged' } : p)));
      showToast('PR approved and merged to main branch');
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  const displayName = profile?.name || user?.name || user || 'User';
  const openPRCount = prs.filter((p) => p.status === 'open').length;

  const navItems = [
    { key: 'overview', label: 'Overview', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    { key: 'prs', label: 'Pull requests', icon: 'M18 15V9a6 6 0 00-6-6H9M3 9l3-3 3 3M18 18a3 3 0 100-6 3 3 0 000 6zM6 6a3 3 0 100 6 3 3 0 000-6z' },
    { key: 'health', label: 'Health details', icon: 'M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z' },
    { key: 'activity', label: 'Activity log', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { key: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 56px)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, margin: '0 auto 16px', border: `3px solid ${T.bg3}`, borderTop: `3px solid ${T.p}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ color: T.tx3 }}>Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
      <aside style={{ width: 220, flexShrink: 0, borderRight: `1px solid ${T.brd}`, background: T.bg1, padding: '16px 8px', display: 'flex', flexDirection: 'column', position: 'sticky', top: 56, height: 'calc(100vh - 56px)', overflowY: 'auto' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((n) => {
            const isActive = section === n.key;
            return (
              <button
                key={n.key}
                type="button"
                onClick={() => setSection(n.key)}
                style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 12px', borderRadius: 9, background: isActive ? T.pl : 'transparent', border: 'none', cursor: 'pointer', color: isActive ? T.pm : T.tx3, fontSize: 13, fontWeight: 500, transition: 'all .12s', textAlign: 'left', fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = T.bg2; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={n.icon} /></svg>
                <span>{n.label}</span>
                {n.key === 'prs' && openPRCount > 0 && (
                  <span style={{ marginLeft: 'auto', background: T.r, color: '#fff', fontSize: 10, padding: '1px 6px', borderRadius: 8, fontWeight: 700 }}>{openPRCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${T.brd}` }}>
          <div style={{ padding: '4px 12px 6px', fontSize: 10, fontWeight: 600, color: T.tx4, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Repositories</div>
          {repos.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => { setActiveRepo(r); setSection('health'); }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, border: 'none', background: activeRepo?.id === r.id && section === 'health' ? T.bg2 : 'transparent', cursor: 'pointer', width: '100%', fontFamily: "'DM Sans', sans-serif", transition: 'background .12s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = T.bg2; }}
              onMouseLeave={(e) => { if (!(activeRepo?.id === r.id && section === 'health')) e.currentTarget.style.background = 'transparent'; }}
            >
              <Dot color={r.health >= 75 ? T.g : r.health >= 50 ? T.a : T.r} />
              <span style={{ fontSize: 12, fontWeight: 500, color: T.tx2, flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</span>
              <span style={{ fontSize: 11, color: T.tx4, fontFamily: "'JetBrains Mono', monospace" }}>{r.health}</span>
            </button>
          ))}
          <Btn variant="danger" size="sm" onClick={onLogout} style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
            Logout
          </Btn>
        </div>
      </aside>

      <main style={{ flex: 1, overflowY: 'auto', background: T.bg0, padding: '24px 28px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={section} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            {section === 'overview' && <OverviewSection userName={displayName} repos={repos} prs={prs} metrics={metrics} showToast={showToast} setSection={setSection} setActiveRepo={setActiveRepo} />}
            {section === 'prs' && <PRsSection prs={prs} approvePR={approvePR} />}
            {section === 'health' && <HealthSection repos={repos} repo={activeRepo} setRepo={setActiveRepo} showToast={showToast} />}
            {section === 'activity' && <ActivitySection activities={activities} />}
            {section === 'settings' && <SettingsSection showToast={showToast} profile={profile} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999, background: T.bg3, border: `1px solid ${T.brd2}`, borderRadius: 12, padding: '12px 16px', fontSize: 13, fontWeight: 500, color: T.tx1, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(0,0,0,.4)', backdropFilter: 'blur(8px)' }}
          >
            <span style={{ fontSize: 14 }}>✓</span>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
