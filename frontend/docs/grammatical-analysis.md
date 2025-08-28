# Grammatical Analysis Feature

This feature provides intelligent Latin grammatical case highlighting and analysis for reading passages in lessons.

## Overview

The grammatical analysis system includes:

1. **Text Selection Analysis** - Select any Latin text to get detailed grammatical breakdown
2. **Pre-computed Data** - Fast analysis using stored grammatical information 
3. **API Fallback** - LLM-powered analysis for new text not in the database
4. **Visual Highlighting** - Color-coded highlighting based on grammatical cases
5. **Interactive Tooltips** - Detailed grammatical information on hover/click

## How It Works

### 1. User Experience

**Three Reading Modes:**
- **Interlinear Mode**: Click words to see definitions above the text
- **Bottom Mode**: Click words to see definitions below the text  
- **Grammar Mode**: Select text to analyze Latin grammatical structure

**Grammar Mode Features:**
- Select any portion of Latin text
- Instant grammatical analysis appears in a tooltip
- Color-coded highlighting based on case (nominative = blue, accusative = red, etc.)
- Detailed information: lemma, case, number, gender, part of speech, etc.
- Apply highlighting button to mark analyzed text

### 2. Technical Implementation

**Data Flow:**
1. User selects text in Grammar Mode
2. System checks for pre-computed grammatical data first
3. If not found, falls back to global precomputed word database
4. If still not found, makes API call to OpenAI for analysis
5. Displays results in interactive tooltip with highlighting options

**Components:**
- `GrammaticalHighlighter.tsx` - Main analysis component
- `grammatical-analysis.ts` - API endpoint for LLM analysis
- `grammaticalAnalysis.ts` - Utility functions and precomputed data
- Enhanced lesson data structure with `grammaticalData` field

## Data Structure

### Lesson Data
```typescript
interface SentenceGrammaticalData {
  sentenceId: string;
  words: WordGrammaticalData[];
}

interface WordGrammaticalData {
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
```

### API Response
```typescript
interface GrammaticalAnalysisResponse {
  words: WordAnalysis[];
  success: boolean;
  error?: string;
}
```

## Performance Optimizations

### 1. Pre-computed Data
- Common Latin words are pre-analyzed and stored in `grammaticalAnalysis.ts`
- Lesson-specific data is stored in the lesson data structure
- Eliminates API calls for frequently used words

### 2. Efficient Lookup
- Three-tier fallback system:
  1. Lesson-specific pre-computed data (fastest)
  2. Global precomputed word database (fast)
  3. LLM API call (slowest, most comprehensive)

### 3. Caching
- API responses are cached in component state
- Avoids re-analysis of the same text within a session

## Color Coding System

**Grammatical Cases:**
- **Nominative**: Blue (bg-blue-200)
- **Genitive**: Green (bg-green-200)  
- **Dative**: Yellow (bg-yellow-200)
- **Accusative**: Red (bg-red-200)
- **Ablative**: Purple (bg-purple-200)
- **Vocative**: Pink (bg-pink-200)

**Parts of Speech (fallback):**
- **Noun**: Blue
- **Verb**: Green
- **Adjective**: Yellow
- **Adverb**: Orange
- **Preposition**: Gray
- **Conjunction**: Indigo
- **Interjection**: Pink
- **Pronoun**: Cyan

## Adding New Lessons

### 1. Pre-computed Data (Recommended)

Add grammatical data directly to the lesson structure:

```typescript
prosePassage: {
  title: "Your Lesson Title",
  sentences: [...],
  grammaticalData: [
    {
      sentenceId: "lesson-prose-1",
      words: [
        { 
          word: "Caecilius", 
          lemma: "Caecilius", 
          case: "nominative", 
          number: "singular", 
          gender: "masculine", 
          partOfSpeech: "noun" 
        },
        // ... more words
      ]
    }
  ]
}
```

### 2. Global Pre-computed Words

Add common words to `precomputedGrammaticalData` in `grammaticalAnalysis.ts`:

```typescript
export const precomputedGrammaticalData: Record<string, WordAnalysis> = {
  'newword': { 
    word: 'newword', 
    lemma: 'newword', 
    case: 'nominative', 
    number: 'singular', 
    partOfSpeech: 'noun' 
  },
  // ... existing words
};
```

### 3. API Generation (Fallback)

For new content without pre-computed data, the system will automatically use the LLM API to analyze text. The API prompt is optimized for accurate Latin grammatical analysis.

## Usage in Components

```typescript
import GrammaticalHighlighter from '@/components/GrammaticalHighlighter';

<GrammaticalHighlighter
  text="Caecilius est in horto"
  sentenceId="1-prose-1"
  grammaticalData={lesson.prosePassage.grammaticalData}
  lessonId={lesson.id}
  className="font-classical text-lg"
/>
```

## Future Enhancements

1. **Sentence-level Analysis** - Analyze complete sentences for syntax relationships
2. **Grammar Rules Integration** - Link to specific grammar rules being demonstrated
3. **Progressive Highlighting** - Build up complex sentences word by word
4. **Audio Integration** - Pronunciation tied to grammatical analysis
5. **Comparative Analysis** - Show how word forms change across cases
6. **Student Annotations** - Allow students to save their own grammatical notes
7. **Assessment Integration** - Quiz students on grammatical analysis
8. **Batch Data Generation** - Scripts to auto-generate grammatical data for all lessons

## Troubleshooting

### API Key Issues
Ensure `OPENAI_API_KEY` is set in your environment variables for the LLM fallback to work.

### Performance Issues
If analysis is slow:
1. Add more words to the precomputed database
2. Add lesson-specific grammatical data
3. Check network connectivity for API calls

### Accuracy Issues
The LLM analysis is quite accurate but can occasionally make mistakes. Pre-computed data is always preferred for lesson content.

## Dependencies

- OpenAI API (gpt-4) for dynamic analysis
- React hooks for state management
- Tailwind CSS for styling
- TypeScript for type safety
