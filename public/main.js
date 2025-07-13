// // let content = "";
// //     window.addEventListener("message", async (event) => {
// // 		event.preventDefault()
// //       if (event.data?.type === "yakihonne:context") {
// //         content = event.data.payload?.content || '';
// // 		console.log("clicked1")
// //         document.getElementById("original").innerText = "📝 Original:\n" + content;
// // 		console.log("clicked2")
// //         await translateNow();
// // 		console.log("clicked4")
// //       }
// //     });

// //     document.getElementById('lang').addEventListener('change', ()=>console.log('clicked5'));

// //     async function translateNow(e) {
// // 		e.preventDefault()
// // 		console.log("clicked3")
// //       const lang = document.getElementById('lang').value;
// //       const res = await fetch("../backend/controller.js", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ content, lang })
// //       });
// //       const data = await res.json();
// //       document.getElementById("translated").innerText = "🔁 Translation:\n" + data.translation;
// //     }



//   let content = "";

//   // Detect browser language OR use saved one
//   const browserLang = navigator.language || navigator.userLanguage; // e.g. "en", "fr", "yo"
//   const langMap = {
//     "en": "english",
//     "fr": "french",
//     "es": "spanish",
//     "yo": "yoruba",
//     "ar": "arabic"
//   };

//   const storedLang = localStorage.getItem("preferredLang");
//   const defaultLang = storedLang || langMap[browserLang.slice(0, 2)] || "english";

//   document.getElementById("lang").value = defaultLang;

//   // Save new language to localStorage when changed
//   document.getElementById("lang").addEventListener('change', () => {
//     const lang = document.getElementById("lang").value;
//     localStorage.setItem("preferredLang", lang);
//     translateNow(); // re-run
//   });

//   // Wait for Nostr post context from Yakihonne
//   window.addEventListener("message", async (event) => {
//     if (event.data?.type === "yakihonne:context") {
//       content = event.data.payload?.content || '';
//       document.getElementById("original").innerText = "📝 Original:\n" + content;
//       await translateNow();
//     }
//   });

//   // Call backend to translate
//   async function translateNow() {
//     const lang = document.getElementById('lang').value;
//     const res = await fetch("handler.js", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content, lang })
//     });
//     const data = await res.json();
//     document.getElementById("translated").innerText = "🔁 Translation:\n" + data.translation;
//   }
//   // Initial translation on page load
//   document.addEventListener("DOMContentLoaded", () => {
//     const lang = document.getElementById("lang").value;
//     translateNow();
//   });


 let content = "";

    const langMap = {
      "en": "english",
      "fr": "french",
      "es": "spanish",
      "yo": "yoruba",
      "ar": "arabic"
    };

    const storedLang = localStorage.getItem("preferredLang");
    const browserLang = navigator.language || navigator.userLanguage;
    const defaultLang = storedLang || langMap[browserLang.slice(0, 2)] || "english";
    document.getElementById("lang").value = defaultLang;

    document.getElementById("lang").addEventListener("change", () => {
      const lang = document.getElementById("lang").value;
      localStorage.setItem("preferredLang", lang);
      translateNow();
    });


    window.addEventListener("message", async (event) => {
      if (event.data?.type === "yakihonne:context") {
        content = event.data.payload?.content || '';
        document.getElementById("original").innerText = "📝 Original:\n" + content;
        await translateNow();
      }
    });

    async function translateNow() {
      const lang = document.getElementById("lang").value;
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, lang })
      });
      const data = await res.json();
      document.getElementById("translated").innerText = "🔁 Translation:\n" + data.translation;
    }