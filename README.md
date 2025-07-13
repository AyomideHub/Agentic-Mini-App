# 🌐 AI Language Translator Smart Widget

A Yakihonne-compatible agentic mini-app that auto-detects the language of a Nostr post and translates it to your selected language (English, French, Yoruba, Spanish, Arabic, etc.).

---

## 🚀 Features

- 🧠 AI-powered language detection
- 🔁 Translates any Nostr post to your preferred language
- 🌍 Supports multiple output languages
- 📋 Displays original and translated versions side-by-side
- 💸 Optional: Add a tip button for Lightning donations

---

## 📁 Project Structure

language-switcher-widget/
├── widget.html # UI layout and language dropdown
├── handler.js # Translation logic using OpenAI
└── manifest.json # Widget configuration for Yakihonne


---

## 🛠️ Technologies Used

| Tool/Tech | Role |
|-----------|------|
| HTML, JavaScript | Frontend user interface |
| Node.js (`handler.js`) | Serverless AI processing |
| OpenAI API | Language detection & translation |
| Yakihonne | Smart Widget Platform & Nostr integration |

---

## 🧪 How to Test Locally

> You must have [Node.js](https://nodejs.org) and Yakihonne CLI installed.

### 1. Install Yakihonne CLI

```bash
npm install -g yakihonne
