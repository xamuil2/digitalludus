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
  'furcifer': { word: 'furcifer', lemma: 'furcifer', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun', notes: 'Used as an insult meaning "scoundrel!"' },

  // Lesson 2 vocabulary
  'mercator': { word: 'mercator', lemma: 'mercator', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'mercatorem': { word: 'mercatorem', lemma: 'mercator', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'amicus': { word: 'amicus', lemma: 'amicus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'amicum': { word: 'amicum', lemma: 'amicus', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'villam': { word: 'villam', lemma: 'villa', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'villa': { word: 'villa', lemma: 'villa', case: 'nominative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'Clemens': { word: 'Clemens', lemma: 'Clemens', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'clemens': { word: 'Clemens', lemma: 'Clemens', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'visitat': { word: 'visitat', lemma: 'visito', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'salutat': { word: 'salutat', lemma: 'saluto', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'pecuniam': { word: 'pecuniam', lemma: 'pecunia', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'numerat': { word: 'numerat', lemma: 'numero', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'argentarius': { word: 'argentarius', lemma: 'argentarius', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'respondet': { word: 'respondet', lemma: 'respondeo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'quoque': { word: 'quoque', lemma: 'quoque', partOfSpeech: 'adverb' },
  'recumbit': { word: 'recumbit', lemma: 'recumbo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'cantat': { word: 'cantat', lemma: 'canto', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'pavonem': { word: 'pavonem', lemma: 'pavo', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'coquit': { word: 'coquit', lemma: 'coquo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'laetus': { word: 'laetus', lemma: 'laetus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },
  'audit': { word: 'audit', lemma: 'audio', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'cenam': { word: 'cenam', lemma: 'cena', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'exspectat': { word: 'exspectat', lemma: 'exspecto', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'vituperat': { word: 'vituperat', lemma: 'vitupero', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'portat': { word: 'portat', lemma: 'porto', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'vinum': { word: 'vinum', lemma: 'vinum', case: 'accusative', number: 'singular', gender: 'neuter', partOfSpeech: 'noun' },
  'gustat': { word: 'gustat', lemma: 'gusto', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'optimus': { word: 'optimus', lemma: 'optimus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },
  'laudat': { word: 'laudat', lemma: 'laudo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'dominus': { word: 'dominus', lemma: 'dominus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'ancilla': { word: 'ancilla', lemma: 'ancilla', case: 'nominative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'ancillam': { word: 'ancillam', lemma: 'ancilla', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'suaviter': { word: 'suaviter', lemma: 'suaviter', partOfSpeech: 'adverb' },
  'delectat': { word: 'delectat', lemma: 'delecto', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'mox': { word: 'mox', lemma: 'mox', partOfSpeech: 'adverb' },
  'et': { word: 'et', lemma: 'et', partOfSpeech: 'conjunction' },
  'videt': { word: 'videt', lemma: 'video', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'consumit': { word: 'consumit', lemma: 'consumo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'bibit': { word: 'bibit', lemma: 'bibo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'magnifice': { word: 'magnifice', lemma: 'magnifice', partOfSpeech: 'adverb' },
  'cenat': { word: 'cenat', lemma: 'ceno', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'spectat': { word: 'spectat', lemma: 'specto', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'laetissimus': { word: 'laetissimus', lemma: 'laetus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },

  // Lesson 3 vocabulary  
  'non': { word: 'non', lemma: 'non', partOfSpeech: 'adverb' },
  'foro': { word: 'foro', lemma: 'forum', case: 'ablative', number: 'singular', gender: 'neuter', partOfSpeech: 'noun' },
  'forum': { word: 'forum', lemma: 'forum', case: 'accusative', number: 'singular', gender: 'neuter', partOfSpeech: 'noun' },
  'negotium': { word: 'negotium', lemma: 'negotium', case: 'accusative', number: 'singular', gender: 'neuter', partOfSpeech: 'noun' },
  'agit': { word: 'agit', lemma: 'ago', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'ecce': { word: 'ecce', lemma: 'ecce', partOfSpeech: 'interjection' },
  'pictor': { word: 'pictor', lemma: 'pictor', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'pictorem': { word: 'pictorem', lemma: 'pictor', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'ambulat': { word: 'ambulat', lemma: 'ambulo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'Celer': { word: 'Celer', lemma: 'Celer', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'celer': { word: 'Celer', lemma: 'Celer', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Celerem': { word: 'Celerem', lemma: 'Celer', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'celerem': { word: 'Celerem', lemma: 'Celer', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'tonsor': { word: 'tonsor', lemma: 'tonsor', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'tonsorem': { word: 'tonsorem', lemma: 'tonsor', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Pantagathus': { word: 'Pantagathus', lemma: 'Pantagathus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'pantagathus': { word: 'Pantagathus', lemma: 'Pantagathus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'venalicius': { word: 'venalicius', lemma: 'venalicius', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Syphax': { word: 'Syphax', lemma: 'Syphax', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'syphax': { word: 'Syphax', lemma: 'Syphax', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'venit': { word: 'venit', lemma: 'venio', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'ianuam': { word: 'ianuam', lemma: 'ianua', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'pulsat': { word: 'pulsat', lemma: 'pulso', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'aperit': { word: 'aperit', lemma: 'aperio', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'vocat': { word: 'vocat', lemma: 'voco', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'ducit': { word: 'ducit', lemma: 'duco', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'atrium': { word: 'atrium', lemma: 'atrium', case: 'accusative', number: 'singular', gender: 'neuter', partOfSpeech: 'noun' },
  'triclinium': { word: 'triclinium', lemma: 'triclinium', case: 'accusative', number: 'singular', gender: 'neuter', partOfSpeech: 'noun' },
  'triclīnium': { word: 'triclīnium', lemma: 'triclinium', case: 'accusative', number: 'singular', gender: 'neuter', partOfSpeech: 'noun' },
  'picturam': { word: 'picturam', lemma: 'pictura', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'pingit': { word: 'pingit', lemma: 'pingo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'magnus': { word: 'magnus', lemma: 'magnus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },
  'magnum': { word: 'magnum', lemma: 'magnus', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },
  'leo': { word: 'leo', lemma: 'leo', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'leō': { word: 'leō', lemma: 'leo', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'leonem': { word: 'leonem', lemma: 'leo', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'leōnem': { word: 'leōnem', lemma: 'leo', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'pictura': { word: 'pictura', lemma: 'pictura', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'pictūra': { word: 'pictūra', lemma: 'pictura', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'Hercules': { word: 'Hercules', lemma: 'Hercules', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'hercules': { word: 'Hercules', lemma: 'Hercules', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Herculem': { word: 'Herculem', lemma: 'Hercules', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'herculem': { word: 'Herculem', lemma: 'Hercules', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'ferociter': { word: 'ferociter', lemma: 'ferociter', partOfSpeech: 'adverb' },
  'ferōciter': { word: 'ferōciter', lemma: 'ferociter', partOfSpeech: 'adverb' },
  'petit': { word: 'petit', lemma: 'peto', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'fustem': { word: 'fustem', lemma: 'fustis', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'tenet': { word: 'tenet', lemma: 'teneo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'verberat': { word: 'verberat', lemma: 'verbero', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'fortis': { word: 'fortis', lemma: 'fortis', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },
  'revenit': { word: 'revenit', lemma: 'revenio', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'intente': { word: 'intente', lemma: 'intente', partOfSpeech: 'adverb' },
  'intentē': { word: 'intentē', lemma: 'intente', partOfSpeech: 'adverb' },

  // Lesson 4 vocabulary
  'ego': { word: 'ego', lemma: 'ego', case: 'nominative', number: 'singular', partOfSpeech: 'pronoun' },
  'tu': { word: 'tu', lemma: 'tu', case: 'nominative', number: 'singular', partOfSpeech: 'pronoun' },
  'quid': { word: 'quid', lemma: 'quid', partOfSpeech: 'pronoun' },
  'quis': { word: 'quis', lemma: 'quis', partOfSpeech: 'pronoun' },
  'cur': { word: 'cur', lemma: 'cur', partOfSpeech: 'adverb' },
  'ubi': { word: 'ubi', lemma: 'ubi', partOfSpeech: 'adverb' },
  'sum': { word: 'sum', lemma: 'sum', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'es': { word: 'es', lemma: 'sum', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'coquo': { word: 'coquo', lemma: 'coquo', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'coquis': { word: 'coquis', lemma: 'coquo', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'teneo': { word: 'teneo', lemma: 'teneo', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'tenes': { word: 'tenes', lemma: 'teneo', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'tondeo': { word: 'tondeo', lemma: 'tondeo', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'tondes': { word: 'tondes', lemma: 'tondeo', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'vendo': { word: 'vendo', lemma: 'vendo', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'vendis': { word: 'vendis', lemma: 'vendo', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'servum': { word: 'servum', lemma: 'servus', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'poeta': { word: 'poeta', lemma: 'poeta', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'poēta': { word: 'poēta', lemma: 'poeta', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'versum': { word: 'versum', lemma: 'versus', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'recito': { word: 'recito', lemma: 'recito', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'recitas': { word: 'recitas', lemma: 'recito', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'pingo': { word: 'pingo', lemma: 'pingo', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'pingis': { word: 'pingis', lemma: 'pingo', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'barbam': { word: 'barbam', lemma: 'barba', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'Melissa': { word: 'Melissa', lemma: 'Melissa', case: 'nominative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'melissa': { word: 'Melissa', lemma: 'Melissa', case: 'nominative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'argentariam': { word: 'argentariam', lemma: 'argentaria', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'habet': { word: 'habet', lemma: 'habeo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'habeo': { word: 'habeo', lemma: 'habeo', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'habes': { word: 'habes', lemma: 'habeo', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'Hermogenes': { word: 'Hermogenes', lemma: 'Hermogenes', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'hermogenes': { word: 'Hermogenes', lemma: 'Hermogenes', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Hermogenem': { word: 'Hermogenem', lemma: 'Hermogenes', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'hermogenem': { word: 'Hermogenem', lemma: 'Hermogenes', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Graecus': { word: 'Graecus', lemma: 'Graecus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },
  'graecus': { word: 'Graecus', lemma: 'Graecus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },
  'navem': { word: 'navem', lemma: 'navis', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'navis': { word: 'navis', lemma: 'navis', case: 'nominative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'probus': { word: 'probus', lemma: 'probus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },
  'quaero': { word: 'quaero', lemma: 'quaero', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'quaeris': { word: 'quaeris', lemma: 'quaero', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'adest': { word: 'adest', lemma: 'adsum', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'Graecia': { word: 'Graecia', lemma: 'Graecia', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'graecia': { word: 'Graecia', lemma: 'Graecia', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'tamen': { word: 'tamen', lemma: 'tamen', partOfSpeech: 'adverb' },
  'semper': { word: 'semper', lemma: 'semper', partOfSpeech: 'adverb' },
  'reddo': { word: 'reddo', lemma: 'reddo', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'reddis': { word: 'reddis', lemma: 'reddo', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'reddit': { word: 'reddit', lemma: 'reddo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'ceram': { word: 'ceram', lemma: 'cera', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'cera': { word: 'cera', lemma: 'cera', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'cērā': { word: 'cērā', lemma: 'cera', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'anulum': { word: 'anulum', lemma: 'anulus', case: 'accusative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'anulus': { word: 'anulus', lemma: 'anulus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'signum': { word: 'signum', lemma: 'signum', case: 'accusative', number: 'singular', gender: 'neuter', partOfSpeech: 'noun' },
  'imprimo': { word: 'imprimo', lemma: 'imprimo', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'tradit': { word: 'tradit', lemma: 'trado', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'capit': { word: 'capit', lemma: 'capio', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'currit': { word: 'currit', lemma: 'curro', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'eheu': { word: 'eheu', lemma: 'eheu', partOfSpeech: 'interjection' },
  'basilicam': { word: 'basilicam', lemma: 'basilica', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'iudex': { word: 'iudex', lemma: 'iudex', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Lucius': { word: 'Lucius', lemma: 'Lucius', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'lucius': { word: 'Lucius', lemma: 'Lucius', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Iucundus': { word: 'Iucundus', lemma: 'Iucundus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'iucundus': { word: 'Iucundus', lemma: 'Iucundus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'Pompeianus': { word: 'Pompeianus', lemma: 'Pompeianus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },
  'pompeianus': { word: 'Pompeianus', lemma: 'Pompeianus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },
  'urbe': { word: 'urbe', lemma: 'urbs', case: 'ablative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'agis': { word: 'agis', lemma: 'ago', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'venio': { word: 'venio', lemma: 'venio', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'venis': { word: 'venis', lemma: 'venio', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'cotidie': { word: 'cotidie', lemma: 'cotidie', partOfSpeech: 'adverb' },
  'cotīdiē': { word: 'cotīdiē', lemma: 'cotidie', partOfSpeech: 'adverb' },
  'hodie': { word: 'hodie', lemma: 'hodie', partOfSpeech: 'adverb' },
  'hodiē': { word: 'hodiē', lemma: 'hodie', partOfSpeech: 'adverb' },
  'multam': { word: 'multam', lemma: 'multus', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'adjective' },
  'debet': { word: 'debet', lemma: 'debeo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'debeo': { word: 'debeo', lemma: 'debeo', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'mendax': { word: 'mendax', lemma: 'mendax', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'inquit': { word: 'inquit', lemma: 'inquam', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'meus': { word: 'meus', lemma: 'meus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },
  'testis': { word: 'testis', lemma: 'testis', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'noun' },
  'tuus': { word: 'tuus', lemma: 'tuus', case: 'nominative', number: 'singular', gender: 'masculine', partOfSpeech: 'adjective' },
  'satis': { word: 'satis', lemma: 'satis', partOfSpeech: 'adverb' },
  'accusas': { word: 'accusas', lemma: 'accuso', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'sed': { word: 'sed', lemma: 'sed', partOfSpeech: 'conjunction' },
  'probas': { word: 'probas', lemma: 'probo', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'rem': { word: 'rem', lemma: 'res', case: 'accusative', number: 'singular', gender: 'feminine', partOfSpeech: 'noun' },
  'vides': { word: 'vides', lemma: 'video', person: '2nd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'celat': { word: 'celat', lemma: 'celo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'probat': { word: 'probat', lemma: 'probo', person: '3rd', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' },
  'convinco': { word: 'convinco', lemma: 'convinco', person: '1st', number: 'singular', tense: 'present', voice: 'active', mood: 'indicative', partOfSpeech: 'verb' }
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
