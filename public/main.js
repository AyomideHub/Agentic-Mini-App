let content = "";

// supported languages
const langMap = {
  en: "english",
  fr: "french",
  es: "spanish",
  yo: "yoruba",
  ar: "arabic",
  ko: "korean",
  zh: "chinese",
};

// browser language or saved preference
const browserLang = navigator.language || navigator.userLanguage;
const storedLang = localStorage.getItem("preferredLang");
const defaultLang = storedLang || langMap[browserLang.slice(0, 2)] || "english";

// Setting initial dropdown value
document.getElementById("lang").value = defaultLang;

// Saving user-selected language to localStorage
document.getElementById("lang").addEventListener("change", () => {
  const lang = document.getElementById("lang").value;
  localStorage.setItem("preferredLang", lang);
  translateNow();
});

// Listening for Yakihonne message event
if (window.YakihonneWidgetSDK) {
  window.YakihonneWidgetSDK.ready().then((context) => {
    content = context?.content || context?.text || "";
    document.getElementById("original").innerText = "📝 Original:\n" + content;
    translateNow();
  });
}

// function to detected language
async function translateNow() {
  const lang = document.getElementById("lang").value;

  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, lang }),
  });

  const data = await res.json();

  // Update UI with detected language and translated result
  document.getElementById(
    "translated"
  ).innerText = `Detected Language: ${data.detectedLanguage}\n🔁 Translation:\n${data.translation}`;
}

// Reset Button Logic
document.getElementById("resetBtn").addEventListener("click", () => {
  localStorage.removeItem("preferredLang");

  const resetLang =
    langMap[(navigator.language || "en").slice(0, 2)] || "english";
  document.getElementById("lang").value = resetLang;

  document.getElementById("translated").innerText = "🔁 Translation:";
});

// to Trigger translation on load if content exists
document.addEventListener("DOMContentLoaded", () => {
  if (content) translateNow();
});
