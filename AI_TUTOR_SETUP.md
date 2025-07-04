# AI Tutor Setup Instructions

## Getting Started with the AI Latin Tutor

The DigitalLudus platform includes an AI-powered Latin tutor that uses Google's Gemini API to provide personalized assistance to students.

### 1. Get a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure the Environment

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace `your_gemini_api_key_here` with your actual API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Test the AI Tutor

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to any lesson page (e.g., http://localhost:3000/lesson/1)

3. Click on the "AI Tutor" tab

4. Start chatting with your AI Latin tutor!

### Features

The AI tutor is designed to help students with:
- **Grammar explanations**: Ask about cases, verb conjugations, and syntax
- **Vocabulary help**: Get definitions, etymology, and usage examples
- **Translation assistance**: Help with understanding Latin passages
- **Cultural context**: Learn about Roman history and culture
- **Practice suggestions**: Get personalized study recommendations

### Example Questions

Try asking the AI tutor questions like:
- "What is the difference between the nominative and accusative cases?"
- "How do I conjugate the verb 'amare' in present tense?"
- "What does 'Salve' mean and when is it used?"
- "Can you explain the word order in Latin sentences?"
- "Tell me about Roman daily life"

### Lesson-Aware Context

The AI tutor is aware of the current lesson context and will provide explanations tailored to the student's current level and the specific concepts being studied.

## API Usage Notes

- The Gemini API has usage limits on the free tier
- For production use, consider upgrading to a paid plan
- All conversations are processed through Google's servers
- Consider implementing rate limiting for production deployments
