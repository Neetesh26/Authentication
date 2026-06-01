export const REPOS = [
  { id: 1, name: 'teslalab-web', fw: 'Next.js 14', lang: 'TypeScript', health: 72, sec: 2, deps: 5, lint: 14, build: true, scan: '2h ago', branch: 'main' },
  { id: 2, name: 'api-server', fw: 'FastAPI', lang: 'Python', health: 88, sec: 0, deps: 2, lint: 3, build: true, scan: '4h ago', branch: 'main' },
  { id: 3, name: 'mobile-client', fw: 'React Native', lang: 'TypeScript', health: 45, sec: 4, deps: 11, lint: 32, build: false, scan: '1d ago', branch: 'develop' },
  { id: 4, name: 'data-pipeline', fw: 'FastAPI + Celery', lang: 'Python', health: 91, sec: 0, deps: 1, lint: 2, build: true, scan: '30m ago', branch: 'main' },
];

export const GITHUB_REPOS = [
  { id: 1, name: 'teslalab-web', desc: 'Main product frontend', lang: 'TypeScript', priv: true, updated: '2 days ago', stars: 0 },
  { id: 2, name: 'api-server', desc: 'FastAPI REST backend', lang: 'Python', priv: true, updated: '4 hours ago', stars: 0 },
  { id: 3, name: 'landing-page', desc: 'Marketing site', lang: 'JavaScript', priv: false, updated: '1 week ago', stars: 3 },
  { id: 4, name: 'mobile-client', desc: 'React Native app', lang: 'TypeScript', priv: true, updated: '3 days ago', stars: 0 },
  { id: 5, name: 'ml-experiments', desc: 'Research notebooks', lang: 'Python', priv: false, updated: '2 weeks ago', stars: 12 },
  { id: 6, name: 'infra-configs', desc: 'Terraform + Docker', lang: 'HCL', priv: true, updated: '5 days ago', stars: 0 },
];

export const INIT_PRS = [
  { id: 1, repo: 'teslalab-web', title: 'fix(security): upgrade lodash 4.17.20 → 4.17.21', desc: 'Patches CVE-2021-23337 — prototype pollution via zipObjectDeep', conf: 94, risk: 'low', status: 'open', pr: '#47', type: 'security' },
  { id: 2, repo: 'teslalab-web', title: 'chore(deps): upgrade react-query 4.x → 5.x', desc: 'Major version upgrade with breaking changes in query key format', conf: 72, risk: 'medium', status: 'pending', pr: '#46', type: 'deps' },
  { id: 3, repo: 'mobile-client', title: 'fix(security): patch axios ≥1.6.0 — SSRF fix', desc: 'Prevents server-side request forgery in HTTP adapter', conf: 96, risk: 'low', status: 'open', pr: '#23', type: 'security' },
  { id: 4, repo: 'api-server', title: 'chore(lint): remove unused imports in auth module', desc: 'Cleans up 3 unused imports across middleware.py and routes.py', conf: 99, risk: 'none', status: 'open', pr: '#18', type: 'lint' },
  { id: 5, repo: 'teslalab-web', title: 'chore(deps): upgrade tailwindcss 3.3.0 → 3.4.1', desc: 'Minor version — new utilities, no breaking changes', conf: 91, risk: 'low', status: 'merged', pr: '#45', type: 'deps' },
  { id: 6, repo: 'data-pipeline', title: 'fix(perf): optimise SQLAlchemy query in reports.py', desc: 'N+1 query resolved with eager loading — 94% faster', conf: 88, risk: 'low', status: 'merged', pr: '#12', type: 'perf' },
];

export const ACTIVITY = [
  { icon: '🔍', type: 'scan', title: 'Scan complete — teslalab-web', sub: '5 outdated packages · 2 security patches available · lint score: 68', time: '10m ago' },
  { icon: '🔐', type: 'security', title: 'PR #47 raised — CVE-2021-23337', sub: 'lodash 4.17.20 → 4.17.21 · confidence 94% · risk: low', time: '15m ago' },
  { icon: '✅', type: 'merged', title: 'PR #45 merged — tailwindcss upgrade', sub: 'Human approved · all tests passed · build green · 0 regressions', time: '2h ago' },
  { icon: '🧪', type: 'test', title: 'Test run — api-server', sub: '47/47 tests passed · coverage 78% · lint 97 · build passing', time: '4h ago' },
  { icon: '⚠️', type: 'alert', title: 'Health drop — mobile-client', sub: 'Score 52 → 45 · 4 new CVEs detected in outdated packages', time: '1d ago' },
  { icon: '🚀', type: 'deploy', title: 'Deployment monitored — api-server', sub: 'Deploy v2.4.1 succeeded · latency +0.2ms · 0 errors · build 3m 12s', time: '1d ago' },
  { icon: '🔧', type: 'fix', title: 'Auto-fix applied — data-pipeline', sub: 'SQLAlchemy N+1 query resolved · PR #12 merged automatically', time: '2d ago' },
];
