const VisionResult = ({ result, mode, onConfirm, onRetake, domainColor }) => {
  if (!result) return null;

  // ── INGREDIENT CHECK ──────────────────────────────────────────────────────
  if (mode === "ingredient") {
    return (
      <div style={S.wrap}>
        <div style={S.title}>// WORKSPACE SCAN</div>
        <div style={{ ...S.verdict, color: result.ready ? "#4ECDC4" : "#FF6B35" }}>
          {result.ready ? "✓ READY TO START" : "⚠ ITEMS MISSING"}
        </div>
        {result.detected?.length > 0 && (
          <div style={S.section}>
            <div style={S.sLabel}>DETECTED</div>
            <div style={S.tagRow}>
              {result.detected.map((item) => (
                <span key={item} style={{ ...S.tag, ...S.tagGreen }}>{item}</span>
              ))}
            </div>
          </div>
        )}
        {result.missing?.length > 0 && (
          <div style={S.section}>
            <div style={S.sLabel}>MISSING</div>
            <div style={S.tagRow}>
              {result.missing.map((item) => (
                <span key={item} style={{ ...S.tag, ...S.tagRed }}>{item}</span>
              ))}
            </div>
          </div>
        )}
        <div style={S.message}>{result.message}</div>
        <div style={S.btnRow}>
          <button style={S.retakeBtn} onClick={onRetake}>RETAKE</button>
          <button style={{ ...S.confirmBtn, background: domainColor || "#FF6B35" }} onClick={onConfirm}>
            {result.ready ? "START TASK →" : "CONTINUE ANYWAY →"}
          </button>
        </div>
      </div>
    );
  }

  // ── STEP VERIFY ───────────────────────────────────────────────────────────
  if (mode === "step") {
    const pass = result.complete;
    return (
      <div style={S.wrap}>
        <div style={S.title}>// STEP VERIFICATION</div>
        <div style={{ ...S.verdict, color: pass ? "#4ECDC4" : "#ef4444" }}>
          {pass ? "✓ STEP COMPLETE" : "✗ NOT COMPLETE"}
        </div>
        <div style={S.confidenceBadge}>
          CONFIDENCE: <span style={{ color: domainColor || "#FF6B35" }}>{result.confidence?.toUpperCase()}</span>
        </div>
        <div style={S.obsBox}>
          <div style={S.sLabel}>OBSERVATIONS</div>
          <div style={S.obsText}>{result.observations}</div>
        </div>
        <div style={S.feedbackBox}>
          <div style={S.sLabel}>FEEDBACK</div>
          <div style={S.obsText}>{result.feedback}</div>
        </div>
        {result.suggestion && (
          <div style={S.tipBox}>
            💡 {result.suggestion}
          </div>
        )}
        <div style={S.btnRow}>
          <button style={S.retakeBtn} onClick={onRetake}>RETAKE</button>
          <button style={{ ...S.confirmBtn, background: pass ? "#4ECDC4" : domainColor || "#FF6B35",
            color: pass ? "#0d0d0d" : "#0d0d0d" }} onClick={onConfirm}>
            {pass ? "MARK COMPLETE ✓" : "TRY AGAIN →"}
          </button>
        </div>
      </div>
    );
  }

  // ── FINAL CHECK ───────────────────────────────────────────────────────────
  if (mode === "final") {
    const pass    = result.verdict === "PASS";
    const partial = result.verdict === "PARTIAL";
    const color   = pass ? "#4ECDC4" : partial ? "#FFB347" : "#ef4444";
    return (
      <div style={S.wrap}>
        <div style={S.title}>// FINAL QUALITY CHECK</div>
        <div style={{ ...S.verdict, color }}>
          {pass ? "✓ MISSION COMPLETE" : partial ? "◑ PARTIALLY COMPLETE" : "✗ NEEDS WORK"}
        </div>
        <div style={S.scoreRow}>
          <span style={S.sLabel}>QUALITY SCORE</span>
          <span style={{ fontFamily: "'Share Tech Mono'", fontSize: 28, fontWeight: 900, color }}>
            {result.qualityScore}<span style={{ fontSize: 14, color: "#444" }}>/10</span>
          </span>
        </div>
        <div style={S.obsBox}>
          <div style={S.sLabel}>ASSESSMENT</div>
          <div style={S.obsText}>{result.summary}</div>
        </div>
        {result.issues?.length > 0 && (
          <div style={S.section}>
            <div style={S.sLabel}>ISSUES FOUND</div>
            {result.issues.map((issue, i) => (
              <div key={i} style={S.issueRow}>⚠ {issue}</div>
            ))}
          </div>
        )}
        <div style={S.btnRow}>
          <button style={S.retakeBtn} onClick={onRetake}>RETAKE</button>
          <button style={{ ...S.confirmBtn, background: color, color: "#0d0d0d" }} onClick={onConfirm}>
            DONE
          </button>
        </div>
      </div>
    );
  }

  return null;
};

const S = {
  wrap: { padding: "20px 0", display: "flex", flexDirection: "column", gap: 14 },
  title: { fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: "#383838", letterSpacing: "2px" },
  verdict: { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, letterSpacing: "2px" },
  confidenceBadge: { fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: "#383838" },
  section: { display: "flex", flexDirection: "column", gap: 6 },
  sLabel: { fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: "#383838", letterSpacing: "2px", marginBottom: 4 },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  tag: { fontFamily: "'Barlow', sans-serif", fontSize: 11, padding: "3px 10px", borderRadius: 20 },
  tagGreen: { background: "rgba(78,205,196,0.1)", border: "1px solid rgba(78,205,196,0.3)", color: "#4ECDC4" },
  tagRed: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" },
  message: { fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "#888", lineHeight: 1.5 },
  obsBox: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 3, padding: "12px 14px" },
  feedbackBox: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 3, padding: "12px 14px" },
  obsText: { fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "#888", lineHeight: 1.5, marginTop: 4 },
  tipBox: { background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.15)", borderRadius: 3, padding: "10px 14px", fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#888" },
  scoreRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  issueRow: { fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#ef4444", padding: "4px 0" },
  btnRow: { display: "flex", gap: 8, marginTop: 4 },
  retakeBtn: { flex: 1, fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "1px", color: "#484848", background: "#111", border: "1px solid #1e1e1e", borderRadius: 2, padding: "12px", cursor: "pointer" },
  confirmBtn: { flex: 2, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, letterSpacing: "2px", border: "none", borderRadius: 2, padding: "12px", cursor: "pointer" },
};

export default VisionResult;