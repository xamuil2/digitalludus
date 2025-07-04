import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, lesson, context } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Return a demo response when API key is not configured
      return res.status(200).json({ 
        response: `Hello! I'm your AI Latin tutor. I notice the Gemini API key isn't configured yet, so I'm running in demo mode. 

You asked: "${message}"

This is where I would provide personalized help with Lesson ${lesson || 'Unknown'} using Google's Gemini AI. To enable full functionality, please:

1. Get a Gemini API key from https://makersuite.google.com/app/apikey
2. Add it to your .env.local file as GEMINI_API_KEY=your_key_here
3. Restart the development server

Once configured, I'll be able to help you with Latin grammar, vocabulary, translations, and cultural context!`
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Create a context-aware prompt for Latin learning
    const systemPrompt = `You are a helpful Latin tutor for DigitalLudus, an interactive Latin learning platform. 
    
You are currently helping with Lesson ${lesson || 'Unknown'}.
Context: ${context || 'General Latin learning'}

Your role is to:
- Help students understand Latin grammar, vocabulary, and pronunciation
- Provide clear explanations of Latin concepts
- Give examples and practice suggestions
- Encourage students in their Latin learning journey
- Answer questions about Roman culture and history when relevant
- Keep responses concise but informative (2-3 sentences usually)
- Use simple language that beginner Latin students can understand

Student's question: ${message}`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ response: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return res.status(500).json({ 
      message: 'Sorry, I encountered an error while processing your request. Please try again.' 
    });
  }
}
