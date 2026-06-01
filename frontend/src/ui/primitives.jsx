import { useState } from "react";
import { TOKENS as T } from "../theme/tokens.js";

export const Badge = ({ children, variant = "default", size = "sm" }) => {
  const variants = {
    default: { bg: T.bg3, color: T.tx2, border: T.brd },
    purple: { bg: T.pl, color: T.pm, border: "#4C1D95" },
    green: { bg: T.gl, color: "#34D399", border: "#065F46" },
    red: { bg: T.rl, color: "#F87171", border: "#7F1D1D" },
    amber: { bg: T.al, color: "#FCD34D", border: "#78350F" },
    blue: { bg: T.bl, color: "#60A5FA", border: "#1E3A8A" },
    critical: { bg: "#3B0606", color: "#FCA5A5", border: "#7F1D1D" },
  };
  const v = variants[variant];
  const pad = size === "xs" ? "2px 6px" : "3px 9px";
  const fs = size === "xs" ? 10 : 11;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: pad,
        borderRadius: 6,
        background: v.bg,
        color: v.color,
        border: `1px solid ${v.border}`,
        fontSize: fs,
        fontWeight: 600,
        letterSpacing: "0.02em",
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};

export const Dot = ({ color = T.g, pulse = false }) => (
  <span style={{ position: "relative", display: "inline-block", width: 8, height: 8, flexShrink: 0 }}>
    <span style={{ display: "block", width: 8, height: 8, borderRadius: "50%", background: color }} />
    {pulse && (
      <span
        style={{
          position: "absolute",
          inset: -3,
          borderRadius: "50%",
          background: color,
          opacity: 0.25,
          animation: "pulseRing 1.6s ease infinite",
        }}
      />
    )}
  </span>
);

export const Card = ({ children, style, onClick, hover = true, noPad = false }) => (
  <div
    onClick={onClick}
    style={{
      background: T.bg2,
      border: `1px solid ${T.brd}`,
      borderRadius: 16,
      padding: noPad ? 0 : "20px 22px",
      cursor: onClick ? "pointer" : "default",
      transition: "border-color .2s, box-shadow .2s",
      overflow: "hidden",
      ...style,
    }}
    onMouseEnter={(e) => {
      if (hover && onClick) {
        e.currentTarget.style.borderColor = T.brd2;
        e.currentTarget.style.boxShadow = "0 0 0 1px " + T.brd2;
      }
    }}
    onMouseLeave={(e) => {
      if (hover && onClick) {
        e.currentTarget.style.borderColor = T.brd;
        e.currentTarget.style.boxShadow = "none";
      }
    }}
  >
    {children}
  </div>
);

export const Btn = ({ children, onClick, variant = "primary", size = "md", disabled = false, style, type = "button", loading = false }) => {
  const variants = {
    primary: { bg: T.p, bg2: T.p2, color: "#fff", border: T.p },
    secondary: { bg: T.bg3, bg2: T.bg4, color: T.tx1, border: T.brd2 },
    ghost: { bg: "transparent", bg2: T.bg2, color: T.tx2, border: "transparent" },
    danger: { bg: T.rl, bg2: "#3B0606", color: "#F87171", border: "#7F1D1D" },
    success: { bg: T.gl, bg2: "#022C22", color: "#34D399", border: "#065F46" },
  };
  const sizes = {
    xs: { px: 10, py: 5, fs: 12 },
    sm: { px: 14, py: 7, fs: 13 },
    md: { px: 18, py: 9, fs: 14 },
    lg: { px: 24, py: 12, fs: 15 },
  };
  const v = variants[variant];
  const s = sizes[size];
  const [hov, setHov] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: `${s.py}px ${s.px}px`,
        background: hov && !disabled ? v.bg2 : v.bg,
        color: v.color,
        border: `1px solid ${v.border}`,
        borderRadius: 10,
        fontSize: s.fs,
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "all .15s",
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {loading && (
        <span
          style={{
            width: 12,
            height: 12,
            border: `2px solid rgba(255,255,255,.3)`,
            borderTop: `2px solid #fff`,
            borderRadius: "50%",
            animation: "spin .7s linear infinite",
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </button>
  );
};

export const ScoreRing = ({ score, size = 120 }) => {
  const r = 44;
  const cx = 60;
  const cy = 60;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? T.g : score >= 50 ? T.a : T.r;
  const bgColor = score >= 75 ? "#022C22" : score >= 50 ? T.al : T.rl;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
      <circle cx={cx} cy={cy} r={r} fill={bgColor} stroke={T.bg3} strokeWidth={2} />
      <circle cx={cx} cy={cy} r={r - 6} fill="none" stroke={T.bg3} strokeWidth={10} />
      <circle
        cx={cx}
        cy={cy}
        r={r - 6}
        fill="none"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={circ - 12}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
      <text
        x={cx}
        y={cy + 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize={22}
        fontWeight={700}
        fontFamily="'JetBrains Mono', monospace"
        style={{ transform: "rotate(90deg)", transformOrigin: `${cx}px ${cy}px` }}
      >
        {score}
      </text>
    </svg>
  );
};

export const MiniSparkline = ({ data, color = T.p }) => {
  const w = 80;
  const h = 32;
  const pad = 2;
  const max = Math.max(...data, 1);
  const pts = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (w - 2 * pad);
      const y = h - pad - (v / max) * (h - 2 * pad);
      return `${x},${y}`;
    })
    .join(" ");
  const last = pts.split(" ").pop().split(",");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx={+last[0]} cy={+last[1]} r={3} fill={color} />
    </svg>
  );
};

export const Input = ({ label, type = "text", placeholder, value, onChange, icon, error, style }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 500,
            color: T.tx2,
            marginBottom: 6,
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {icon && (
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: T.tx3,
              fontSize: 15,
              display: "flex",
            }}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: icon ? "10px 14px 10px 38px" : "10px 14px",
            background: T.bg2,
            border: `1px solid ${error ? T.r : focused ? T.p : T.brd}`,
            borderRadius: 10,
            fontSize: 14,
            color: T.tx1,
            transition: "border-color .15s",
            boxShadow: focused ? `0 0 0 3px ${T.pl}` : "none",
            ...style,
          }}
        />
      </div>
      {error && (
        <p style={{ fontSize: 12, color: T.r, marginTop: 4 }}>{error}</p>
      )}
    </div>
  );
};
