import { useState } from "react";
import { callClaude } from "../api/groq";
import { COSTS } from "../constants/costs";

export const useChat = (domain, description, steps, spend) => {
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);

  const addSystemMessage = (text) => {
    setMessages((m) => [...m, { role: "ai", text, ts: Date.now() }]);
  };

  const send = async (text) => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { role: "user", text, ts: Date.now() }]);
    setBusy(true);
    spend(COSTS.message);

    const stepList = steps
      .map((s, i) => `${i + 1}. [${s.done ? "DONE" : "    "}] ${s.text}`)
      .join("\n");

    try {
      const reply = await callClaude(
        `You are an expert assistant for domain: ${domain?.label}.
Task: "${description}"
Checklist:
${stepList}
Be concise, practical, and expert. Use short paragraphs or bullet points. Be encouraging but direct.`,
        text,
      );

      setMessages((m) => [...m, { role: "ai", text: reply, ts: Date.now() }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: "⚠ Connection error. Please try again.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const reset = () => setMessages([]);

  return { messages, busy, send, addSystemMessage, reset };
};
