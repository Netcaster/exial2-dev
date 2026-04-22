import React, { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";

const GATE_KEY = "exial2-access";
const CORRECT  = "EXIAL2-SECURE";

export function useGateAccess() {
  const [granted, setGranted] = useState(
    () => sessionStorage.getItem(GATE_KEY) === "granted"
  );
  const grant = () => {
    sessionStorage.setItem(GATE_KEY, "granted");
    setGranted(true);
  };
  return { granted, grant };
}

export default function GatePage({ onAccess }: { onAccess: () => void }) {
  const [code, setCode]     = useState("");
  const [error, setError]   = useState(false);
  const [shake, setShake]   = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toUpperCase() === CORRECT) {
      onAccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#060A12 0%,#08111E 60%,#060A12 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      padding: "24px",
    }}>
      {/* Aurora blobs */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0,
      }}>
        <div style={{
          position: "absolute", top: "15%", left: "30%",
          width: 480, height: 480,
          background: "radial-gradient(circle, rgba(43,108,255,0.16) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(40px)",
        }}/>
        <div style={{
          position: "absolute", bottom: "20%", right: "25%",
          width: 360, height: 360,
          background: "radial-gradient(circle, rgba(123,47,190,0.13) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(40px)",
        }}/>
      </div>

      {/* Card */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: 420,
        background: "rgba(10,18,35,0.80)",
        border: "1px solid rgba(43,108,255,0.22)",
        borderRadius: 20,
        padding: "48px 40px 44px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
        backdropFilter: "blur(18px)",
        animation: shake ? "shake 0.45s ease" : "none",
      }}>
        {/* Logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <div style={{
            width: 44, height: 44,
            background: "rgba(43,108,255,0.15)",
            border: "1px solid rgba(43,108,255,0.30)",
            borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Lock size={20} color="#2B6CFF" strokeWidth={2} />
          </div>
          <div>
            <div style={{ color: "#F1F5F9", fontWeight: 700, fontSize: 17, letterSpacing: "0.04em" }}>EXIAL</div>
            <div style={{ color: "#94A3B8", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}>TPG Infrastructure</div>
          </div>
        </div>

        <h1 style={{
          color: "#F1F5F9", fontSize: 24, fontWeight: 700,
          margin: "0 0 8px", letterSpacing: "-0.01em",
        }}>
          Request Access
        </h1>
        <p style={{ color: "#94A3B8", fontSize: 14, margin: "0 0 32px", lineHeight: 1.6 }}>
          Enter your access code to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Access code"
            value={code}
            onChange={e => { setCode(e.target.value); setError(false); }}
            autoFocus
            style={{
              width: "100%",
              padding: "13px 16px",
              background: "rgba(6,10,18,0.70)",
              border: `1px solid ${error ? "rgba(239,68,68,0.60)" : "rgba(43,108,255,0.22)"}`,
              borderRadius: 10,
              color: "#F1F5F9",
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
              marginBottom: error ? 8 : 20,
              transition: "border-color 0.2s",
              letterSpacing: "0.08em",
            }}
          />
          {error && (
            <p style={{ color: "rgba(239,68,68,0.85)", fontSize: 13, margin: "0 0 16px" }}>
              Incorrect access code. Please try again.
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px 20px",
              background: "linear-gradient(135deg, #2B6CFF 0%, #1a4fd6 100%)",
              border: "none",
              borderRadius: 10,
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              letterSpacing: "0.02em",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Continue <ArrowRight size={16} />
          </button>
        </form>
      </div>

      <p style={{
        position: "relative", zIndex: 1,
        color: "rgba(148,163,184,0.45)", fontSize: 12,
        marginTop: 28, letterSpacing: "0.03em",
      }}>
        © 2026 EXIAL · Restricted Access
      </p>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-5px)}
          80%{transform:translateX(5px)}
        }
      `}</style>
    </div>
  );
}
