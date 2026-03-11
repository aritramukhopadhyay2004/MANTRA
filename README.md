# MANTRA
AI-powered task guidance app with camera-based step verification — built with React, Groq LLM, and computer vision.

# MANTRA — AI Work Guidance System

MANTRA is an intelligent checklist and task guidance app that helps 
you complete any real-world task step by step — whether you're 
assembling furniture, cooking a recipe, studying for an exam, 
or building a software feature.

## How it works

1. Choose your work domain (Assembly, Cooking, Study, Fitness, Coding, Creative, Repair, Business)
2. Describe your task in plain language
3. MANTRA's AI agent breaks it into a precise, actionable checklist
4. Work through each step — ask the AI for guidance at any point
5. Use the camera to verify steps are genuinely complete

## Features

- 🤖 AI Checklist Generation — describe any task, get instant steps
- 💬 AI Agent Chat — ask for help, tips, or guidance on any step
- 📸 Camera Step Verification — point your camera at your work, AI confirms completion
- 🥬 Workspace Scanner — detects ingredients or tools before you start
- ✅ Final Quality Check — AI scores your finished result out of 10
- ⚡ Token System — lightweight credit system for AI usage
- 🔋 Token Shop — affordable recharge packs (Spark / Core / Forge)

## Tech Stack

- React 18 + Vite
- Groq API — llama-3.3-70b-versatile for text
- Groq Vision — llama-4-scout-17b for image analysis
- OpenCV-ready camera pipeline via native browser MediaDevices API
- Pure CSS animations — no UI library dependencies

## Getting Started

git clone https://github.com/yourname/mantra.git
cd mantra
npm install
echo "VITE_GROQ_API_KEY=your_key_here" > .env
npm run dev
```

---

**GitHub topics/tags to add:**
```
react groq llm computer-vision checklist ai-agent task-management 
vite javascript camera-api productivity llama
