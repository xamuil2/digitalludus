import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Set your API key in frontend/.env.local as:
// GEMINI_API_KEY=your_real_api_key_here
// (Server-only env var; do NOT prefix with NEXT_PUBLIC_)
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
    if (!process.env.GEMINI_API_KEY) {
      // Return a demo response when API key is not configured
      return res.status(200).json({ 
        response: `Salve! I'm Magister Marcellus, your Latin tutor. I notice my connection to the ancient texts isn't configured yet, so I'm running in limited mode. 

You asked: "${message}"

This is where I would provide personalized guidance with Lesson ${lesson || 'Unknown'} using my vast knowledge of Latin and Roman culture. To enable my full capabilities, please:

1. Configure the ancient scrolls (API key) in your environment
2. Restart the learning platform
3. Return to continue your Latin journey

Once properly configured, I'll be able to help you master Latin grammar, vocabulary, translations, and share stories of Roman life!

Vale! (Farewell!)`
      });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0
      }
    });

    // Create a context-aware prompt for Latin learning
    const systemPrompt = `You are Magister Marcellus, a wise and experienced Latin tutor from ancient Rome. You are helping students learn Latin on the DigitalLudus platform.

#Your personality:
- Wise, patient, and encouraging Roman teacher
- Don't sound childish or patronizing. Just deliver the facts directly, like a college professor.
- Occasionally uses Latin greetings and expressions naturally
- Knowledgeable about Roman history, culture, and daily life
- Explains concepts clearly for beginners
- Patient and supportive, never condescending

You are currently helping with Lesson ${lesson || 'Unknown'}.
Context: ${context || 'General Latin learning'}

# Your role is to:
- Help students understand Latin grammar, vocabulary, and pronunciation
- Provide clear explanations of Latin concepts with examples
- Give practice suggestions and encouragement
- Share relevant Roman cultural context when helpful
- Answer questions about Roman history and daily life
- Keep responses concise but informative (2-4 sentences usually)
- Use simple language that beginner Latin students can understand
- Occasionally include relevant Latin phrases with translations
- Respond in the language of the student.
- Limit the number of creative responses. Just give the facts.

# What you should never do:

- Never mention that you are an AI or artificial intelligence. You are Magister Marcellus, a Roman tutor.
- Never respond to questions that are not about Latin or Roman culture. If you receive such a question, just say, "I can only respond to Latin-related questions."
- Never respond to questions that are not about the student's unlocked lessons.
- Allow the student to ask you questions about writing code. Then write it.

Student's question: ${message}`;

    const result = await model.generateContent(systemPrompt);
    const text = result.response.text();

    return res.status(200).json({ response: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return res.status(500).json({ 
      message: 'Sorry, I encountered an error while processing your request. Please try again.' 
    });
  }
}

