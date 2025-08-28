import { NextApiRequest, NextApiResponse } from 'next';

export interface WordAnalysis {
  word: string;
  lemma: string;
  case?: 'nominative' | 'genitive' | 'dative' | 'accusative' | 'ablative' | 'vocative';
  number?: 'singular' | 'plural';
  gender?: 'masculine' | 'feminine' | 'neuter';
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'interjection' | 'pronoun';
  person?: '1st' | '2nd' | '3rd';
  tense?: 'present' | 'imperfect' | 'future' | 'perfect' | 'pluperfect' | 'future-perfect';
  voice?: 'active' | 'passive';
  mood?: 'indicative' | 'subjunctive' | 'imperative' | 'infinitive' | 'participle';
  notes?: string;
}

export interface GrammaticalAnalysisRequest {
  text: string;
  lessonId?: number;
}

export interface GrammaticalAnalysisResponse {
  words: WordAnalysis[];
  success: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GrammaticalAnalysisResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed', words: [] });
  }

  try {
    const { text, lessonId }: GrammaticalAnalysisRequest = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ success: false, error: 'Text is required', words: [] });
    }

    // Clean the text (remove quotes and punctuation for analysis)
    const cleanText = text.replace(/[""".,!?;:]/g, '').trim();
    const words = cleanText.split(/\s+/).filter(word => word.length > 0);

    const prompt = `You are a Latin grammar expert. Analyze the following Latin text and provide detailed grammatical information for each word.

Text: "${cleanText}"

For each word, provide:
1. The word as it appears
2. The lemma (dictionary form)
3. Case (if noun/adjective/pronoun): nominative, genitive, dative, accusative, ablative, vocative
4. Number: singular or plural
5. Gender (if applicable): masculine, feminine, neuter
6. Part of speech: noun, verb, adjective, adverb, preposition, conjunction, interjection, pronoun
7. Person (if verb): 1st, 2nd, 3rd
8. Tense (if verb): present, imperfect, future, perfect, pluperfect, future-perfect
9. Voice (if verb): active, passive
10. Mood (if verb): indicative, subjunctive, imperative, infinitive, participle
11. Any relevant notes

Return ONLY a JSON array with this exact structure for each word:
[
  {
    "word": "actual_word",
    "lemma": "dictionary_form", 
    "case": "nominative|genitive|dative|accusative|ablative|vocative",
    "number": "singular|plural",
    "gender": "masculine|feminine|neuter",
    "partOfSpeech": "noun|verb|adjective|adverb|preposition|conjunction|interjection|pronoun",
    "person": "1st|2nd|3rd",
    "tense": "present|imperfect|future|perfect|pluperfect|future-perfect",
    "voice": "active|passive", 
    "mood": "indicative|subjunctive|imperative|infinitive|participle",
    "notes": "any_relevant_notes"
  }
]

Only include fields that apply to each word. For example, don't include "case" for verbs or "tense" for nouns.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a Latin grammar expert. Provide accurate grammatical analysis in JSON format only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No analysis received from OpenAI');
    }

    try {
      // Parse the JSON response
      const analysisResult = JSON.parse(content);
      
      if (!Array.isArray(analysisResult)) {
        throw new Error('Invalid response format from OpenAI');
      }

      // Validate and clean the response
      const validatedWords: WordAnalysis[] = analysisResult.map((wordData: unknown) => {
        // Type guard for the word data
        const data = wordData as Record<string, unknown>;
        
        const validatedWord: WordAnalysis = {
          word: (data.word as string) || '',
          lemma: (data.lemma as string) || (data.word as string) || '',
          partOfSpeech: (data.partOfSpeech as WordAnalysis['partOfSpeech']) || 'noun'
        };

        // Add optional fields only if they exist and are valid
        if (data.case && ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'vocative'].includes(data.case as string)) {
          validatedWord.case = data.case as WordAnalysis['case'];
        }
        if (data.number && ['singular', 'plural'].includes(data.number as string)) {
          validatedWord.number = data.number as WordAnalysis['number'];
        }
        if (data.gender && ['masculine', 'feminine', 'neuter'].includes(data.gender as string)) {
          validatedWord.gender = data.gender as WordAnalysis['gender'];
        }
        if (data.person && ['1st', '2nd', '3rd'].includes(data.person as string)) {
          validatedWord.person = data.person as WordAnalysis['person'];
        }
        if (data.tense && ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future-perfect'].includes(data.tense as string)) {
          validatedWord.tense = data.tense as WordAnalysis['tense'];
        }
        if (data.voice && ['active', 'passive'].includes(data.voice as string)) {
          validatedWord.voice = data.voice as WordAnalysis['voice'];
        }
        if (data.mood && ['indicative', 'subjunctive', 'imperative', 'infinitive', 'participle'].includes(data.mood as string)) {
          validatedWord.mood = data.mood as WordAnalysis['mood'];
        }
        if (data.notes) {
          validatedWord.notes = data.notes as string;
        }

        return validatedWord;
      });

      return res.status(200).json({
        success: true,
        words: validatedWords
      });

    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      return res.status(500).json({
        success: false,
        error: 'Failed to parse grammatical analysis',
        words: []
      });
    }

  } catch (error) {
    console.error('Grammatical analysis error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to analyze text',
      words: []
    });
  }
}
