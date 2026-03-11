/**
 * Builds the prompt for ingredient/tool pre-check
 * before the task starts
 */
export const buildIngredientCheckPrompt = (domain, description, steps) => {
  const stepList = steps.map((s, i) => `${i + 1}. ${s.text}`).join("\n");
  return `You are a computer vision assistant for the domain: ${domain}.
The user is about to start this task: "${description}"
These are the steps they need to complete:
${stepList}

Look at the image carefully. Identify all visible items, ingredients, or tools.
Then compare against what is needed for the task.

Respond ONLY in this exact JSON format, no markdown:
{
  "detected": ["item1", "item2"],
  "required": ["item1", "item2"],
  "missing": ["item1", "item2"],
  "ready": true or false,
  "message": "one encouraging sentence about readiness"
}`;
};

/**
 * Builds the prompt for verifying a single step
 */
export const buildStepVerifyPrompt = (domain, taskDescription, step, stepIndex) => {
  return `You are a strict but fair task verification assistant for domain: ${domain}.
The overall task is: "${taskDescription}"
The user claims they have completed step ${stepIndex + 1}: "${step.text}"

Look at the image carefully and determine if this step appears to be genuinely complete.
Be specific and practical. Consider what "done" looks like for this domain.

Respond ONLY in this exact JSON format, no markdown:
{
  "complete": true or false,
  "confidence": "high" or "medium" or "low",
  "observations": "what you can see in the image",
  "feedback": "specific actionable feedback — what looks good or what is missing",
  "suggestion": "one tip to improve or confirm completion"
}`;
};

/**
 * Builds the prompt for final task completion check
 */
export const buildFinalCheckPrompt = (domain, taskDescription, steps) => {
  const completedSteps = steps.filter(s => s.done).map(s => s.text).join("\n");
  const remainingSteps = steps.filter(s => !s.done).map(s => s.text).join("\n");
  return `You are a quality control inspector for domain: ${domain}.
Task: "${taskDescription}"

Completed steps:
${completedSteps || "none"}

Uncompleted steps:
${remainingSteps || "none"}

Look at the image and assess the overall state of this task.
Is the final result what you would expect from a properly completed task?

Respond ONLY in this exact JSON format, no markdown:
{
  "taskComplete": true or false,
  "qualityScore": 1-10,
  "observations": "what you see in the image",
  "issues": ["issue1", "issue2"] or [],
  "verdict": "PASS" or "FAIL" or "PARTIAL",
  "summary": "2 sentence summary of the quality assessment"
}`;
};