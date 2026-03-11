import { useState } from "react";

import Splash from "./screens/Splash";
import DomainSelect from "./screens/DomainSelect";
import Describe from "./screens/Describe";
import Work from "./screens/Work";
import Shop from "./screens/Shop";

import { useTokens } from "./hooks/useTokens";
import { useChecklist } from "./hooks/useChecklist";
import { useChat } from "./hooks/useChat";

const App = () => {
  const [view, setView] = useState("splash");
  const [domain, setDomain] = useState(null);
  const [description, setDescription] = useState("");
  const [input, setInput] = useState("");
  const [shopMsg, setShopMsg] = useState("");
  const [prevView, setPrevView] = useState("domain");

  // ── Hooks ──────────────────────────────────────────────────────────────────
  const { tokens, spend, recharge } = useTokens();

  const {
    steps,
    taskTitle,
    busy: checkBusy,
    generate,
    toggle,
    reset: resetChecklist,
    done,
    pct,
  } = useChecklist(domain, description, spend);

  const {
    messages,
    busy: chatBusy,
    send: sendMsg,
    addSystemMessage,
    reset: resetChat,
  } = useChat(domain, description, steps, spend);

  // ── Navigation ─────────────────────────────────────────────────────────────
  const goShop = () => {
    setPrevView(view);
    setView("shop");
  };

  const handleReset = () => {
    resetChecklist();
    resetChat();
    setDescription("");
    setInput("");
    setView("domain");
  };

  // ── Generate checklist ─────────────────────────────────────────────────────
  const handleGenerate = async () => {
    const result = await generate();
    if (result) {
      addSystemMessage(
        `Mission loaded. ${result.steps?.length} steps locked in for "${result.title}". ` +
          `Check off each step as you go — tap ASK on any step for detailed guidance. Let's build. 🎯`,
      );
      setView("work");
    }
  };

  // ── Chat ───────────────────────────────────────────────────────────────────
  const handleSend = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setInput("");
    await sendMsg(msg);
  };

  // ── Shop ───────────────────────────────────────────────────────────────────
  const handleBuy = (pkg) => {
    recharge(pkg.tokens);
    setShopMsg(`+${pkg.tokens} tokens loaded successfully.`);
    setTimeout(() => {
      setShopMsg("");
      setView(prevView);
    }, 2000);
  };

  const busy = checkBusy || chatBusy;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={S.root}>
      <div style={S.scanline} />

      {view === "splash" && <Splash onStart={() => setView("domain")} />}

      {view === "domain" && (
        <DomainSelect
          tokens={tokens}
          onSelect={(d) => {
            setDomain(d);
            setView("describe");
          }}
          onShop={goShop}
          onBack={() => setView("splash")}
        />
      )}

      {view === "describe" && (
        <Describe
          domain={domain}
          description={description}
          setDescription={setDescription}
          onGenerate={handleGenerate}
          onBack={() => setView("domain")}
          onShop={goShop}
          tokens={tokens}
          busy={busy}
        />
      )}

      {view === "work" && (
        <Work
          domain={domain}
          taskTitle={taskTitle}
          steps={steps}
          onToggle={toggle}
          messages={messages}
          onSend={handleSend}
          input={input}
          setInput={setInput}
          busy={busy}
          tokens={tokens}
          onShop={goShop}
          done={done}
          pct={pct}
          onReset={handleReset}
        />
      )}

      {view === "shop" && (
        <Shop
          tokens={tokens}
          onBuy={handleBuy}
          onBack={() => setView(prevView)}
          successMsg={shopMsg}
        />
      )}
    </div>
  );
};

const S = {
  root: {
    background: "#0d0d0d",
    minHeight: "100vh",
    maxWidth: 480,
    margin: "0 auto",
    position: "relative",
    color: "#ccc",
    fontFamily: "'Barlow', sans-serif",
  },
  scanline: {
    position: "fixed",
    left: 0,
    right: 0,
    height: 2,
    background: "rgba(255, 255, 255, 0.025)",
    animation: "scanline 10s linear infinite",
    pointerEvents: "none",
    zIndex: 999,
  },
};

export default App;
