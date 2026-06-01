export const TOKENS = {
  // Backgrounds
  bg0: "#09090B",
  bg1: "#0F0F12",
  bg2: "#18181B",
  bg3: "#27272A",
  bg4: "#3F3F46",

  // Borders
  brd: "#27272A",
  brd2: "#3F3F46",

  // Text
  tx1: "#FAFAF9",
  tx2: "#A1A1AA",
  tx3: "#71717A",
  tx4: "#52525B",

  // Brand purple
  p: "#7C3AED",
  p2: "#6D28D9",
  p3: "#5B21B6",
  pl: "#1E1033",
  pm: "#A78BFA",
  pl2: "#EDE9FE",

  // Semantic
  g: "#059669",
  gl: "#022C22",
  gl2: "#D1FAE5",
  r: "#DC2626",
  rl: "#1C0A0A",
  rl2: "#FEE2E2",
  a: "#D97706",
  al: "#1C1208",
  al2: "#FEF3C7",
  b: "#2563EB",
  bl: "#0D1529",
  bl2: "#DBEAFE",
};

export const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  background: #09090B;
  color: #FAFAF9;
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
}
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #27272A; border-radius: 2px; }
input, textarea, select, button { font-family: 'DM Sans', sans-serif; }
* { outline: none; }
*:focus-visible { outline: 2px solid #7C3AED; outline-offset: 2px; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulseRing { 0%,100%{transform:scale(1);opacity:.25;} 50%{transform:scale(2);opacity:0;} }
`;