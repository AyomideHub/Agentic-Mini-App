# 🌐 AI Language Translator Smart Widget

A Yakihonne-compatible agentic mini-app that auto-detects the language of a Nostr post and translates it to your selected language (English, French, Yoruba, Spanish, Arabic, etc.).

---

## 🚀 Features

- 🧠 AI-powered language detection
- 🔁 Translates any Nostr post to your preferred language
- 🌍 Supports multiple output languages
- 📋 Displays original and translated versions side-by-side
- Auto-detect language
- Translate to English, French, Yoruba, Chinese, etc.
- Save preferred language
- Reset button to change back

---

## How it works
Yakihonne context injects post → sends to API → Mixtral replies → displays translated result.

---

## 📁 Project Structure

language-translator-widget/
├── public/index.html # UI layout and language dropdown
├── controller.js # Translation logic using GROQ
└── manifest.json # Widget configuration for Yakihonne


---

## 🛠️ Technologies Used

| Tool/Tech | Role |
|-----------|------|
| HTML, JavaScript | Frontend user interface |
| Node.js/Express.js (`controller.js`) |
| GROQ API | Language detection & translation |
| Yakihonne | Smart Widget Platform & Nostr integration |

---





