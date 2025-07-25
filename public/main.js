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

// Yakihonne context detection (Yakihonne environment)
function detectYakihonneContext() {
  if (window.YakihonneWidgetSDK && typeof window.YakihonneWidgetSDK.ready === "function") {
    window.YakihonneWidgetSDK.ready().then((context) => {
      content = context?.content || context?.text || "";
      document.getElementById("original").innerText = "📝 Original:\n" + content;
      translateNow();
    });
    return true;
  }
  return false;
}

// Listen for postMessage from parent (iframe preview)
window.addEventListener("message", (event) => {
  if (event.data && (event.data.type === "yakihonne-preview-content" || event.data.type === "yakihonne:context")) {
    content = event.data.content || event.data.text || "";
    document.getElementById("original").innerText = "📝 Original:\n" + content;
    translateNow();
  }
});

// On load: try Yakihonne context, else fallback to preview text
document.addEventListener("DOMContentLoaded", () => {
  const foundContext = detectYakihonneContext();
  if (!foundContext) {
    // If no Yakihonne context and no postMessage, use default preview text
    setTimeout(() => {
      if (!content) {
        content = "Hello, how are you today?";
        document.getElementById("original").innerText = "📝 Original:\n" + content;
        translateNow();
      }
    }, 100); // Give postMessage a chance to arrive first
  }
});

// function to detect language and translate
async function translateNow() {
  if (!content) return;
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