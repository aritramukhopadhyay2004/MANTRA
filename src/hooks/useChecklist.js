import { useState } from "react";
import { callClaude } from "../api/groq";
import { COSTS } from "../constants/costs";

export const useChecklist = (domain, description, spend) => {
  const [steps, setSteps] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    if (!description.trim()) return;
    setBusy(true);
    setError(null);
    spend(COSTS.generate);

    try {
      const raw = await callClaude(
        `You are a precise task-breakdown engine for the domain: ${domain.label}.
Return ONLY valid JSON, no markdown, no preamble.
Format: {"title":"short task name (max 6 words)","steps":["step 1","step 2",...]}
Rules: 6–14 steps. Each step max 12 words. Be specific and actionable. Domain-appropriate language.`,
        `Break this task into a checklist: ${description}`,
      );

      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      setTaskTitle(parsed.title || `${domain.label} Task`);
      setSteps(
        (parsed.steps || []).map((text, i) => ({
          id: i,
          text,
          done: false,
        })),
      );

      return parsed;
    } catch (e) {
      setError("Failed to generate checklist. Please try again.");
      return null;
    } finally {
      setBusy(false);
    }
  };

  const toggle = (id) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)),
    );
  };

  const reset = () => {
    setSteps([]);
    setTaskTitle("");
    setError(null);
  };

  const done = steps.filter((s) => s.done).length;
  const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;

  return { steps, taskTitle, busy, error, generate, toggle, reset, done, pct };
};
