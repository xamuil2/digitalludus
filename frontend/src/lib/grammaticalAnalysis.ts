import { WordAnalysis } from '../pages/api/grammatical-analysis';
import { SentenceGrammaticalData } from '../data/lessons';

/**
 * Utility to generate grammatical data for lesson sentences
 */
export async function generateGrammaticalData(
  sentences: Array<{ id: string; latin: string }>,
  lessonId?: number
): Promise<SentenceGrammaticalData[]> {
  const grammaticalData: SentenceGrammaticalData[] = [];

  for (const sentence of sentences) {
    try {
      const response = await fetch('/api/grammatical-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sentence.latin,
          lessonId
        }),
      });

      const data = await response.json();

      if (data.success && data.words) {
        grammaticalData.push({
          sentenceId: sentence.id,
          words: data.words.map((word: WordAnalysis) => ({
            word: word.word,
            lemma: word.lemma,
            case: word.case,
            number: word.number,
            gender: word.gender,
            partOfSpeech: word.partOfSpeech,
            person: word.person,
            tense: word.tense,
            voice: word.voice,
            mood: word.mood,
            notes: word.notes
          }))
        });
      }
    } catch (error) {
      console.error(`Failed to analyze sentence ${sentence.id}:`, error);
    }
  }

  return grammaticalData;
}

/**
 * Pre-computed grammatical data for common Latin words and forms
 * This provides fast lookup for frequently used words without API calls
 */
export const precomputedGrammaticalData: Record<string, WordAnalysis> = {
  // Common verbs
  'est': { word: 'est', lemma: 'sum', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'sunt': { word: 'sunt', lemma: 'sum', person: '3rd', number: 'plural', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'sedet': { word: 'sedet', lemma: 'sedeo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'laborat': { word: 'laborat', lemma: 'laboro', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'labōrat': { word: 'labōrat', lemma: 'laboro', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'scribit': { word: 'scribit', lemma: 'scribo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'scrībit': { word: 'scrībit', lemma: 'scribo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'dormit': { word: 'dormit', lemma: 'dormio', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'intrat': { word: 'intrat', lemma: 'intro', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'intrāt': { word: 'intrāt', lemma: 'intro', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'circumspectat': { word: 'circumspectat', lemma: 'circumspecto', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'salit': { word: 'salit', lemma: 'salio', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'stat': { word: 'stat', lemma: 'sto', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'stertit': { word: 'stertit', lemma: 'sterto', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'latrat': { word: 'latrat', lemma: 'latro', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'lātrat': { word: 'lātrat', lemma: 'latro', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'surgit': { word: 'surgit', lemma: 'surgo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'clamat': { word: 'clamat', lemma: 'clamo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'clāmat': { word: 'clāmat', lemma: 'clamo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'exit': { word: 'exit', lemma: 'exeo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },

  // Common nouns - nominative
  'Caecilius': { word: 'Caecilius', lemma: 'Caecilius', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'caecilius': { word: 'Caecilius', lemma: 'Caecilius', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Metella': { word: 'Metella', lemma: 'Metella', case: 'nominative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'metella': { word: 'Metella', lemma: 'Metella', case: 'nominative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'Quintus': { word: 'Quintus', lemma: 'Quintus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'quintus': { word: 'Quintus', lemma: 'Quintus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Quīntus': { word: 'Quīntus', lemma: 'Quintus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'quīntus': { word: 'Quīntus', lemma: 'Quintus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Servus': { word: 'Servus', lemma: 'servus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'servus': { word: 'servus', lemma: 'servus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'coquus': { word: 'coquus', lemma: 'coquus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Cerberus': { word: 'Cerberus', lemma: 'Cerberus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'cerberus': { word: 'Cerberus', lemma: 'Cerberus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Grumio': { word: 'Grumio', lemma: 'Grumio', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'grumio': { word: 'Grumio', lemma: 'Grumio', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'canis': { word: 'canis', lemma: 'canis', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'cibus': { word: 'cibus', lemma: 'cibus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },

  // Common nouns - ablative (with prepositions)
  'horto': { word: 'horto', lemma: 'hortus', case: 'ablative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'hortō': { word: 'hortō', lemma: 'hortus', case: 'ablative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'atrio': { word: 'atrio', lemma: 'atrium', case: 'ablative', number: 'singular', gender: 'neuter', partOfSpeech: 'noun' },
  'ātriō': { word: 'ātriō', lemma: 'atrium', case: 'ablative', number: 'singular', gender: 'neuter', partOfSpeech: 'noun' },
  'tablino': { word: 'tablino', lemma: 'tablinum', case: 'ablative', number: 'singular', gender: 'neuter', partOfSpeech: 'noun' },
  'tablīnō': { word: 'tablīnō', lemma: 'tablinum', case: 'ablative', number: 'singular', gender: 'neuter', partOfSpeech: 'noun' },
  'via': { word: 'via', lemma: 'via', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'viā': { word: 'viā', lemma: 'via', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'culina': { word: 'culina', lemma: 'culina', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'culinā': { word: 'culinā', lemma: 'culina', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'mensa': { word: 'mensa', lemma: 'mensa', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'mēnsā': { word: 'mēnsā', lemma: 'mensa', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },

  // Prepositions
  'in': { word: 'in', lemma: 'in', partOfSpeech: 'preposition' },

  // Adjectives
  'iratus': { word: 'iratus', lemma: 'iratus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },

  // Interjections
  'pestis': { word: 'pestis', lemma: 'pestis', case: 'nominative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun', notes: 'Used as an exclamation meaning "pest!"' },
  'furcifer': { word: 'furcifer', lemma: 'furcifer', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun', notes: 'Used as an insult meaning "scoundrel!"' }
};

/**
 * Quick lookup function for pre-computed grammatical data
 */
export function getPrecomputedWordAnalysis(word: string): WordAnalysis | null {
  // Clean the word of punctuation and normalize it
  const cleanWord = word.toLowerCase()
    .replace(/[.,;:!?"]/g, '')
    .replace(/[āēīōūȳ]/g, (match) => {
      // Convert macrons to regular vowels for lookup
      const macronMap: Record<string, string> = {
        'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'y'
      };
      return macronMap[match] || match;
    });
    
  // Try exact match first (with macrons)
  const exactMatch = precomputedGrammaticalData[word.toLowerCase().replace(/[.,;:!?"]/g, '')];
  if (exactMatch) return exactMatch;
  
  // Try normalized match (without macrons)
  return precomputedGrammaticalData[cleanWord] || null;
}
