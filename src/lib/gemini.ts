import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Response cache using Map
const responseCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const SYSTEM_CONTEXT = `You are CustoDesk AI's customer service assistant. Respond in a friendly, professional, and concise manner.

KEY INFORMATION:
• CustoDesk AI: Advanced AI-powered customer service provider
• Target: Businesses seeking to automate and enhance customer support
• Core Benefits:
  - 24/7 Automated Support
  - Natural Language Processing
  - Multi-channel Integration
  - Real-time Analytics
  - Custom Training

RESPONSE GUIDELINES:
1. Keep responses brief and focused
2. Highlight relevant features
3. For pricing/details → Recommend consultation call
4. Use natural, conversational tone
5. Maintain professional demeanor

QUICK LINKS:
• Demo/Trial: Mention free trial availability
• Pricing: Direct to consultation call
• Integration: Emphasize seamless setup
• Support: Highlight 24/7 availability`;

export async function getGeminiResponse(prompt: string) {
  try {
    // Check cache first
    const cached = responseCache.get(prompt);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.response;
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Please introduce yourself and explain your role." }],
        },
        {
          role: "model",
          parts: [{ text: SYSTEM_CONTEXT }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const result = await chat.sendMessage([{ text: prompt }]);
    const response = await result.response;
    const responseText = response.text();

    // Cache the response
    responseCache.set(prompt, {
      response: responseText,
      timestamp: Date.now(),
    });

    return responseText;
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    throw error;
  }
}
