import './main.css';
import SWHandler from 'smart-widget-handler';
const { client } = SWHandler;

let content = "";

document.addEventListener("DOMContentLoaded", () => {
  // Restore saved language
  const savedLang = localStorage.getItem("preferredLang");
  if (savedLang) {
    document.getElementById("lang").value = savedLang;
  }

  // Tell parent we're ready
  client.ready();

  // Listen for Yakihonne context
  client.listen((event) => {
    if (event.kind === "yakihonne:context") {
      content = event.data?.content || event.data?.text || "";
      document.getElementById("original").innerText = "📝 Original:\n" + content;
      translateNow();
    }
  });

  // Handle language change
  document.getElementById("lang").addEventListener("change", () => {
    localStorage.setItem("preferredLang", document.getElementById("lang").value);
    translateNow();
  });

  // Reset button
  document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("translated").innerText = "🔁 Translation:";
    localStorage.removeItem("preferredLang");
  });
});

async function translateNow() {
  if (!content) return;

  const lang = document.getElementById("lang").value;

  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, lang })
    });

    const data = await res.json();

    document.getElementById("translated").innerText =
      `Detected Language: ${data.detectedLanguage}\n🔁 Translation:\n${data.translation}`;

    client.send({
      kind: 'translation:complete',
      data: {
        original: content,
        translated: data.translation,
        lang
      }
    });
  } catch (error) {
    document.getElementById("translated").innerText = "Error translating text.";
    console.error(error);
  }
}
