import { useEffect } from "react";
import { useCamera } from "../vision/useCamera";
import VisionResult from "./VisionResult";

const CameraModal = ({ mode, step, stepIndex, onResult, onClose, visionHook, domainColor }) => {
  const {
    videoRef, canvasRef,
    active, captured, error,
    startCamera, stopCamera, capture, flipCamera, retake,
  } = useCamera();

  const { busy, result, checkIngredients, verifyStep, checkFinal, reset } = visionHook;

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const handleCapture = async () => {
    const base64 = capture();
    if (!base64) return;
    if (mode === "ingredient") await checkIngredients(base64);
    else if (mode === "step")  await verifyStep(base64, step, stepIndex);
    else if (mode === "final") await checkFinal(base64);
  };

  const handleConfirm = () => {
    onResult(result, mode);
    reset();
    onClose();
  };

  const handleRetake = () => {
    reset();
    retake();
  };

  const modeLabel = {
    ingredient: "SCAN WORKSPACE",
    step:       `VERIFY STEP ${stepIndex + 1}`,
    final:      "FINAL CHECK",
  }[mode];

  return (
    <div style={S.overlay}>
      <div style={S.modal}>

        {/* Header */}
        <div style={S.hdr}>
          <span style={S.modeLabel}>// {modeLabel}</span>
          <button style={S.closeBtn} onClick={() => { stopCamera(); reset(); onClose(); }}>✕</button>
        </div>

        {/* Step context */}
        {mode === "step" && step && (
          <div style={S.stepCtx}>
            <span style={S.stepNum}>{String(stepIndex + 1).padStart(2, "0")}</span>
            <span style={S.stepTxt}>{step.text}</span>
          </div>
        )}

        {/* Camera view */}
        {!captured && (
          <div style={S.camWrap}>
            {error ? (
              <div style={S.errBox}>{error}</div>
            ) : (
              <video ref={videoRef} style={S.video} playsInline muted autoPlay />
            )}
            <div style={S.scanOverlay}>
              <div style={S.corner} />
              <div style={{ ...S.corner, ...S.cornerTR }} />
              <div style={{ ...S.corner, ...S.cornerBL }} />
              <div style={{ ...S.corner, ...S.cornerBR }} />
            </div>
          </div>
        )}

        {/* Captured preview */}
        {captured && !result && (
          <div style={S.camWrap}>
            <img
              src={`data:image/jpeg;base64,${captured}`}
              style={S.video}
              alt="captured"
            />
            {busy && (
              <div style={S.analyzingOverlay}>
                <div style={S.analyzingDot} />
                <span style={S.analyzingTxt}>ANALYZING IMAGE...</span>
              </div>
            )}
          </div>
        )}

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* Vision result */}
        {result && (
          <div style={S.resultWrap}>
            <VisionResult
              result={result}
              mode={mode}
              onConfirm={handleConfirm}
              onRetake={handleRetake}
              domainColor={domainColor}
            />
          </div>
        )}

        {/* Camera controls */}
        {!captured && !error && (
          <div style={S.controls}>
            <button style={S.flipBtn} onClick={flipCamera}>⟳ FLIP</button>
            <button
              style={{ ...S.captureBtn, background: domainColor || "#FF6B35" }}
              onClick={handleCapture}
            >
              ● CAPTURE
            </button>
            <div style={{ width: 64 }} />
          </div>
        )}

        {/* Hint */}
        {!captured && !error && (
          <div style={S.hint}>
            {{
              ingredient: "Point camera at your ingredients or tools",
              step:       "Point camera at the completed step",
              final:      "Point camera at the finished result",
            }[mode]}
          </div>
        )}
      </div>
    </div>
  );
};

const S = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" },
  modal: { width: "100%", maxWidth: 480, height: "100vh", display: "flex", flexDirection: "column", background: "#0d0d0d", overflow: "hidden" },
  hdr: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: "1px solid #181818" },
  modeLabel: { fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: "#FF6B35", letterSpacing: "2px" },
  closeBtn: { fontFamily: "'Share Tech Mono', monospace", fontSize: 14, color: "#484848", background: "none", border: "none", cursor: "pointer" },
  stepCtx: { display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderBottom: "1px solid #181818", background: "#111" },
  stepNum: { fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: "#383838" },
  stepTxt: { fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "#888" },
  camWrap: { flex: 1, position: "relative", background: "#000", overflow: "hidden" },
  video: { width: "100%", height: "100%", objectFit: "cover" },
  scanOverlay: { position: "absolute", inset: 20, pointerEvents: "none" },
  corner: { position: "absolute", top: 0, left: 0, width: 24, height: 24, borderTop: "2px solid #FF6B35", borderLeft: "2px solid #FF6B35" },
  cornerTR: { left: "auto", right: 0, borderLeft: "none", borderRight: "2px solid #FF6B35" },
  cornerBL: { top: "auto", bottom: 0, borderTop: "none", borderBottom: "2px solid #FF6B35" },
  cornerBR: { top: "auto", bottom: 0, left: "auto", right: 0, borderTop: "none", borderLeft: "none", borderBottom: "2px solid #FF6B35", borderRight: "2px solid #FF6B35" },
  analyzingOverlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 },
  analyzingDot: { width: 12, height: 12, borderRadius: "50%", background: "#FF6B35", animation: "pulse 1s infinite" },
  analyzingTxt: { fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: "#FF6B35", letterSpacing: "2px" },
  resultWrap: { flex: 1, overflowY: "auto", padding: "0 16px 20px" },
  controls: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderTop: "1px solid #181818" },
  flipBtn: { fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: "#484848", background: "#111", border: "1px solid #1e1e1e", borderRadius: 2, padding: "8px 14px", cursor: "pointer", width: 64 },
  captureBtn: { width: 64, height: 64, borderRadius: "50%", border: "none", fontFamily: "'Share Tech Mono', monospace", fontSize: 9, fontWeight: 900, letterSpacing: "1px", color: "#0d0d0d", cursor: "pointer" },
  hint: { fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: "#2e2e2e", textAlign: "center", padding: "10px 20px 16px", letterSpacing: "1px" },
  errBox: { display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#ef4444", fontFamily: "'Share Tech Mono', monospace", fontSize: 12, padding: 20, textAlign: "center" },
};

export default CameraModal;