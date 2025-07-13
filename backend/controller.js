// File: backend/controller.js
import fetch from 'node-fetch';

// This handler function processes translation requests
// It expects a POST request with JSON body containing 'content' and 'lang'
// It uses the Groq API to detect language and translate the content
// Returns the translated text or an error message if translation fails

/** * @typedef {Object} TranslationResponse
 * @property {string} translation - The translated text or an error message.    
 *    
 * @param {Object} req - The request object containing the content to translate and the target language.
 * @returns {Promise<TranslationResponse>} - An object containing the translated text or an error message.
 */
export default async function handler(req) {
  const { content, lang } = req.body;

  const prompt = `Detect the language of this text and translate it into ${lang}. Only return the translated result:\n\n"${content}"`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768",
      messages: [
        { role: "system", content: "You are a multilingual translator." },
        { role: "user", content: prompt }
      ],
      max_tokens: 300
    })
  });

  const data = await response.json();
  const translation = data.choices?.[0]?.message?.content?.trim() || "⚠️ Translation failed.";

  return { translation };
}

