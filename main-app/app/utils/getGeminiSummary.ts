import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_GEMINI_API_KEY });

export async function getSummary(diff: string): Promise<string> {
  const prompt = `Summarize the following GitHub diff:\n\n${diff}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text || 'No summary generated';
}
