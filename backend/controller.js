import fetch from "node-fetch";

/**
 * @typedef {Object} TranslationResponse
 * @property {string} translation - The translated text or an error message.
 * @property {string} detectedLanguage - The detected source language.
 *
 * @param {Object} req - The request object containing the content and the target language.
 * @returns {Promise<TranslationResponse>}
 */
export default async function handler(req, res) {
  try {
    const { content, lang } = req.body;

    const prompt = `Detect the language of this text. Then translate it into ${lang}. Reply with this format:
Detected Language: <language>
Translation: <translated text>

Text: """${content}"""`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages: [
            { role: "system", content: "You are a helpful translator bot." },
            { role: "user", content: prompt },
          ],
          max_tokens: 300,
        }),
      }
    );

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || "";

    const detectedMatch = raw.match(/Detected Language:\s*(.+)/i);
    const translationMatch = raw.match(/Translation:\s*([\s\S]*)/i);

    const detectedLanguage = detectedMatch?.[1]?.trim() || "Unknown";
    const translation = translationMatch?.[1]?.trim() || "Translation failed.";

    // return { translation, detectedLanguage };
    res.json({ translation, detectedLanguage });
  } catch (error) {
    console.error("Error in translation handler:", error);
    return res.status(500).json({ translation: "Error while translating." });
  }
}
