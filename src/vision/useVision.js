import { useState } from "react";
import {
  buildIngredientCheckPrompt,
  buildStepVerifyPrompt,
  buildFinalCheckPrompt,
} from "./visionPrompts";

const VISION_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

const callGroqVision = async (prompt, base64Image) => {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: VISION_MODEL,
      max_tokens: 800,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || "Vision API failed");
  }

  const data = await res.json();
  const raw  = data.choices?.[0]?.message?.content || "{}";
  const clean = raw.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(clean);
  } catch {
    return { error: "Could not parse vision response", raw };
  }
};

export const useVision = (domain, description, steps) => {
  const [busy,   setBusy]   = useState(false);
  const [result, setResult] = useState(null);
  const [mode,   setMode]   = useState(null); // "ingredient" | "step" | "final"
  const [error,  setError]  = useState(null);

  // Check ingredients / tools before starting
  const checkIngredients = async (base64Image) => {
    setBusy(true);
    setError(null);
    setMode("ingredient");
    try {
      const prompt = buildIngredientCheckPrompt(domain?.label, description, steps);
      const res    = await callGroqVision(prompt, base64Image);
      setResult(res);
      return res;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setBusy(false);
    }
  };

  // Verify a single step
  const verifyStep = async (base64Image, step, stepIndex) => {
    setBusy(true);
    setError(null);
    setMode("step");
    try {
      const prompt = buildStepVerifyPrompt(domain?.label, description, step, stepIndex);
      const res    = await callGroqVision(prompt, base64Image);
      setResult(res);
      return res;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setBusy(false);
    }
  };

  // Final quality check
  const checkFinal = async (base64Image) => {
    setBusy(true);
    setError(null);
    setMode("final");
    try {
      const prompt = buildFinalCheckPrompt(domain?.label, description, steps);
      const res    = await callGroqVision(prompt, base64Image);
      setResult(res);
      return res;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setBusy(false);
    }
  };

  const reset = () => { setResult(null); setMode(null); setError(null); };

  return { busy, result, mode, error, checkIngredients, verifyStep, checkFinal, reset };
};