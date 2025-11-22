import { GoogleGenAI, Type } from "@google/genai";
import { Product, RecommendationResponse, Language } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiRecommendations = async (
  cartItems: Product[],
  viewedItems: Product[],
  allProducts: Product[],
  language: Language
): Promise<RecommendationResponse> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const cartNames = cartItems.map(p => p.name).join(', ');
    const viewedNames = viewedItems.map(p => p.name).join(', ');
    
    // Construct a catalog summary for the model
    const catalogSummary = allProducts.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      tags: p.tags
    }));

    const langInstruction = language === 'ta' 
      ? "Provide the 'reason' strictly in Tamil language." 
      : "Provide the 'reason' in English.";

    const prompt = `
      You are an expert AI shopping assistant for an Indian grocery store.
      
      Context:
      - The user has these items in their cart: [${cartNames}]
      - The user has recently viewed these items: [${viewedNames}]
      
      Task:
      - Select exactly 3 products from the provided catalog that would best complement the user's cooking needs (e.g., if they bought dal, suggest ghee or spices).
      - Do not recommend items already in the cart.
      - ${langInstruction}
      - Provide a short, helpful reason for each recommendation (max 1 sentence).
      
      Catalog (JSON format):
      ${JSON.stringify(catalogSummary)}
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  productId: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["productId", "reason"]
              }
            }
          },
          required: ["recommendations"]
        }
      }
    });

    if (response.text) {
        return JSON.parse(response.text) as RecommendationResponse;
    }
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails
    return { recommendations: [] };
  }
};