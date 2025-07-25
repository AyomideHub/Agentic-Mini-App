# 🌐 AI Language Translator Smart Widget

A Yakihonne-compatible **Agentic Mini-App** that automatically detects and translates the content of any Nostr post into your preferred language — including English, French, Yoruba, Spanish, Arabic, Chinese, Korean, and more.

---

## 🚀 Features

- 🧠 **AI-Powered Language Detection**
- 🔁 **Real-time translation** of Nostr posts
- 🌍 **Supports multiple languages** (English, French, Yoruba, Spanish, Arabic, Chinese, Korean)
- 📋 **Displays original and translated text**
- 💾 **Saves your language preference** using localStorage
- 🔄 **Manual Reset Button** to clear and change language

---

## ⚙️ How It Works

> Yakihonne injects the Nostr post context →  
> Your selected language is retrieved or auto-detected →  
> A request is sent to the GROQ API →  
> AI replies with a translated version →  
> The widget updates instantly with both texts.

---

## 📁 Project Structure

language-translator-widget/
├── backend/
│ └── controller.js # Handles AI translation logic using GROQ API
├── public/
│ ├── index.html # Smart Widget UI (dropdown, original + translated text)
│ ├── main.js # Frontend logic (event listener, translation trigger)
│ └── .well-known/
│ └── manifest.json # Required by Yakihonne for widget discovery
├── server.js # Express backend server
└── README.md


---

## 🛠️ Tech Stack

| Tool/Technology     | Description                             |
|---------------------|-----------------------------------------|
| HTML + JS (Vanilla) | Lightweight frontend user interface     |
| Node.js + Express   | Backend server for API endpoint         |
| GROQ API (Mixtral)  | AI translation & language detection     |
| Yakihonne           | Smart Widget Platform for Nostr Apps    |

---
