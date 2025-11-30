import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getTutorHelp = async (letters: string[], context: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment variable.";
  }

  const prompt = `
    I am learning the Hindi Alphabet (Varnamala). 
    The current group of letters I am studying is: ${letters.join(', ')}.
    Context: ${context}

    Please provide a concise, friendly, and educational explanation of these specific letters. 
    Include:
    1. A brief pronunciation tip for the group.
    2. One simple Hindi word (with English meaning) for each letter to help me remember the order.
    
    Keep the tone encouraging. Format the output with clear line breaks or bullet points suitable for a markdown display.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Fast response needed
      }
    });
    return response.text || "Sorry, I couldn't generate a hint right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while contacting the AI Tutor.";
  }
};
