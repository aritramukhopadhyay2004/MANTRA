import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import StepRow from "../components/StepRow";
import ChatBubble from "../components/ChatBubble";
import QuickPrompts from "../components/QuickPrompts";
import CameraModal from "../components/CameraModal";
import { useVision } from "../vision/useVision";
import { COSTS } from "../constants/costs";

const Work = ({
  domain, taskTitle, steps, onToggle,
  messages, onSend, input, setInput,
  busy, tokens, onShop, done, pct, onReset,
  description,
}) => {
  const [tab, setTab]             = useState("list");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState(null);   // "ingredient"|"step"|"final"
  const [activeStep, setActiveStep] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const bottomRef = useRef(null);

  const visionHook = useVision(domain, description, steps);

  useEffect(() => {
    if (tab === "chat") bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, tab]);

  const handleAsk = (step, index) => {
    setTab("chat");
    onSend(`Help me complete step ${index + 1}: "${step.text}". Give me detailed guidance.`);
  };

  const handleVerifyStep = (step, index) => {
    setActiveStep(step);
    setActiveIndex(index);
    setCameraMode("step");
    setCameraOpen(true);
  };

  const handleIngredientCheck = () => {
    setCameraMode("ingredient");
    setCameraOpen(true);
  };

  const handleFinalCheck = () => {
    setCameraMode("final");
    setCameraOpen(true);
  };

  const handleVisionResult = (result, mode) => {
    if (mode === "step" && result?.complete) {
      onToggle(activeStep.id);
    }
  };

  const canChat = !busy && tokens >= COSTS.message;

  return (
    <div style={S.screen}>
      <Header
        tokens={tokens}
        onShop={onShop}
        domainIcon={domain?.icon}
        domainLabel={domain?.label}
        extra={<button style={S.newBtn} onClick={onReset}>NEW TASK</button>}
      />

      <ProgressBar taskTitle={taskTitle} done={done} total={steps.length} pct={pct} color={domain?.color} />

      {/* Vision action bar */}
      <div style={S.visionBar}>
        <button style={S.visionBtn} onClick={handleIngredientCheck}>
          📸 SCAN WORKSPACE
        </button>
        {pct === 100 && (
          <button style={{ ...S.visionBtn, ...S.visionBtnFinal }} onClick={handleFinalCheck}>
            ✅ FINAL CHECK
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={S.tabs}>
        {[["list", "▤  CHECKLIST"], ["chat", "◈  AI AGENT"]].map(([id, label]) => (
          <button key={id} className="tabBtn"
            style={{ ...S.tab, ...(tab === id ? { ...S.tabOn, borderBottomColor: domain?.color || "#FF6B35", color: domain?.color || "#FF6B35" } : {}) }}
            onClick={() => setTab(id)}>
            {label}
            {id === "chat" && messages.filter((m) => m.role === "ai").length > 0 && (
              <span style={{ ...S.dot, background: domain?.color || "#FF6B35" }}>
                {messages.filter((m) => m.role === "ai").length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Checklist */}
      {tab === "list" && (
        <div style={S.listBody}>
          {pct === 100 && (
            <div style={S.completeBanner}>✓ ALL STEPS COMPLETE — TAP FINAL CHECK ABOVE</div>
          )}
          {steps.map((step, i) => (
            <StepRow
              key={step.id}
              step={step}
              index={i}
              onToggle={onToggle}
              onAsk={handleAsk}
              onVerify={handleVerifyStep}
              domainColor={domain?.color}
            />
          ))}
        </div>
      )}

      {/* Chat */}
      {tab === "chat" && (
        <div style={S.chatWrap}>
          <div style={S.chatBody}>
            {messages.length === 0 && (
              <div style={S.empty}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>◈</div>
                <div style={S.emptyTitle}>AI AGENT STANDING BY</div>
                <div style={S.emptyHint}>tap ASK on any step · or type below</div>
              </div>
            )}
            {messages.map((m, i) => (
              <ChatBubble key={i} message={m} domainColor={domain?.color} />
            ))}
            {busy && (
              <div style={S.thinking}>
                <span style={{ ...S.thinkDot, background: domain?.color || "#FF6B35", animation: "pulse 1.2s infinite" }} />
                <span style={S.thinkTxt}>processing...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <QuickPrompts onSelect={onSend} disabled={!canChat} />
          {tokens < COSTS.message && (
            <div style={S.warn}>
              Out of tokens — <button style={S.warnLink} onClick={onShop}>Recharge →</button>
            </div>
          )}
          <div style={S.inputRow}>
            <input style={S.inp}
              placeholder={`Ask anything… (⚡${COSTS.message} tokens)`}
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && canChat && onSend(input)}
              disabled={!canChat} />
            <button
              style={{ ...S.sendBtn, background: domain?.color || "#FF6B35", opacity: !input.trim() || !canChat ? 0.25 : 1 }}
              disabled={!input.trim() || !canChat}
              onClick={() => onSend(input)}>→</button>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {cameraOpen && (
        <CameraModal
          mode={cameraMode}
          step={activeStep}
          stepIndex={activeIndex}
          onResult={handleVisionResult}
          onClose={() => setCameraOpen(false)}
          visionHook={visionHook}
          domainColor={domain?.color}
        />
      )}
    </div>
  );
};

const S = {
  screen: { minHeight: "100vh", display: "flex", flexDirection: "column" },
  newBtn: { fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: "#484848", background: "#141414", border: "1px solid #1e1e1e", borderRadius: 2, padding: "4px 9px", letterSpacing: "1px", cursor: "pointer" },
  visionBar: { display: "flex", gap: 8, padding: "10px 14px", borderBottom: "1px solid #181818", background: "#0d0d0d" },
  visionBtn: { fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "1.5px", color: "#FF6B35", background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.2)", borderRadius: 2, padding: "7px 12px", cursor: "pointer" },
  visionBtnFinal: { color: "#4ECDC4", background: "rgba(78,205,196,0.06)", borderColor: "rgba(78,205,196,0.2)" },
  tabs: { display: "flex", borderBottom: "1px solid #181818" },
  tab: { flex: 1, fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "2px", color: "#383838", background: "none", border: "none", borderBottom: "2px solid transparent", padding: "12px 0", transition: "all 0.15s", position: "relative", cursor: "pointer" },
  tabOn: { color: "#fff", borderBottom: "2px solid" },
  dot: { display: "inline-block", width: 16, height: 16, borderRadius: "50%", fontSize: 9, fontWeight: 900, textAlign: "center", lineHeight: "16px", marginLeft: 6, color: "#0d0d0d", fontFamily: "'Barlow Condensed', sans-serif" },
  completeBanner: { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 12, letterSpacing: "2px", color: "#4ECDC4", background: "rgba(78,205,196,0.06)", border: "1px solid rgba(78,205,196,0.18)", borderRadius: 2, padding: "10px 14px", textAlign: "center", marginBottom: 10 },
  listBody: { flex: 1, overflowY: "auto", padding: "10px 12px 24px", display: "flex", flexDirection: "column", gap: 3 },
  chatWrap: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 },
  chatBody: { flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 },
  empty: { textAlign: "center", padding: "50px 20px" },
  emptyTitle: { color: "#333", fontFamily: "'Share Tech Mono', monospace", fontSize: 12 },
  emptyHint: { color: "#252525", fontSize: 11, marginTop: 6, fontFamily: "'Share Tech Mono', monospace" },
  thinking: { display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#111", border: "1px solid #1a1a1a", borderRadius: 3, alignSelf: "flex-start" },
  thinkDot: { width: 6, height: 6, borderRadius: "50%", display: "inline-block" },
  thinkTxt: { color: "#333", fontFamily: "'Share Tech Mono', monospace", fontSize: 11 },
  warn: { background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 3, padding: "9px 13px", fontSize: 12, color: "#ef4444", margin: "0 14px 8px" },
  warnLink: { background: "none", border: "none", color: "#FF6B35", fontWeight: 700, fontSize: 12, textDecoration: "underline", cursor: "pointer" },
  inputRow: { display: "flex", gap: 6, padding: "10px 12px 16px", borderTop: "1px solid #181818" },
  inp: { flex: 1, background: "#111", border: "1px solid #1e1e1e", borderLeft: "2px solid #FF6B35", borderRadius: 3, padding: "10px 14px", color: "#bbb", fontSize: 13, fontFamily: "'Barlow', sans-serif" },
  sendBtn: { border: "none", borderRadius: 3, padding: "10px 16px", color: "#0d0d0d", fontWeight: 900, fontSize: 18, transition: "opacity 0.15s", cursor: "pointer" },
};

export default Work;