import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeTranscript = async (transcript: string): Promise<AnalysisResult> => {
  try {
    const prompt = `
      Analyze the following customer support call transcript. 
      Provide a brief summary, a sentiment score from 0 to 100 (where 0 is very negative, 100 is very positive), 
      a sentiment label (Positive, Neutral, Negative), a list of action items, and key topics discussed.
      
      Transcript:
      "${transcript}"
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            sentimentScore: { type: Type.NUMBER },
            sentimentLabel: { type: Type.STRING, enum: ["Positive", "Neutral", "Negative"] },
            actionItems: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            keyTopics: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
          },
          required: ["summary", "sentimentScore", "sentimentLabel", "actionItems", "keyTopics"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing transcript:", error);
    // Fallback mock response in case of API failure or missing key during demo
    return {
      summary: "Could not analyze transcript. Please check your API key.",
      sentimentScore: 50,
      sentimentLabel: "Neutral",
      actionItems: ["Retry analysis later"],
      keyTopics: ["Error"]
    };
  }
};