/**
 * Pads a number with leading zeros
 * e.g. padNum(3) => "03"
 */
export const padNum = (n) => String(n).padStart(2, "0");

/**
 * Cleans raw Claude API response from markdown artifacts
 */
export const cleanJSON = (raw) => raw.replace(/```json|```/g, "").trim();

/**
 * Safely parses JSON — returns null on failure
 */
export const safeParseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

/**
 * Formats a timestamp to HH:MM
 */
export const formatTime = (ts) => {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

/**
 * Returns true if the checklist is fully complete
 */
export const isComplete = (steps) =>
  steps.length > 0 && steps.every((s) => s.done);

/**
 * Calculates completion percentage
 */
export const calcPct = (steps) => {
  if (!steps.length) return 0;
  return Math.round((steps.filter((s) => s.done).length / steps.length) * 100);
};

/**
 * Builds a readable step list string for Claude context
 */
export const buildStepContext = (steps) =>
  steps
    .map((s, i) => `${padNum(i + 1)}. [${s.done ? "DONE" : "    "}] ${s.text}`)
    .join("\n");