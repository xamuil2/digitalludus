import { type VocabWord, getAllLessons } from '@/data/lessons';

// Build a comprehensive vocabulary map from all lessons
let vocabularyMap: Map<string, VocabWord> | null = null;

// Normalize Latin text for matching:
// - lowercase
// - remove diacritics (macrons, accents)
// - remove punctuation/whitespace, keep only letters (Unicode-aware)
function normalizeLatin(input: string): string {
  if (!input) return '';
  const lower = input.toLowerCase();
  // Decompose and remove combining marks (macrons etc.)
  // Remove combining diacritics (covers macron U+0304 etc.)
  const noDiacritics = lower.normalize('NFD').replace(/[\u0300-\u036f]+/g, '');
  // Some precomposed macron letters may still remain depending on source; map common ones
  const mapped = noDiacritics
    .replace(/[æ]/g, 'ae')
    .replace(/[œ]/g, 'oe');
  // Keep only letters (drop punctuation, digits, underscores)
  // Keep only basic Latin letters after normalization
  const onlyLetters = mapped.replace(/[^a-z]+/g, '');
  return onlyLetters;
}

function buildVocabularyMap(): Map<string, VocabWord> {
  if (vocabularyMap) return vocabularyMap;
  
  vocabularyMap = new Map();
  const allLessons = getAllLessons();
  
  // Add all vocabulary words from all lessons
  allLessons.forEach(lesson => {
    lesson.vocabulary.forEach(word => {
      // Add the main Latin form (normalized)
      const mainForm = normalizeLatin(word.latin);
      if (mainForm) {
        vocabularyMap!.set(mainForm, word);
      }
      
      // For verbs, also add common conjugated forms
      if (word.partOfSpeech === 'verb' && word.principalParts) {
        const parts = word.principalParts.split(', ');
        parts.forEach(part => {
          const cleanPart = normalizeLatin(part);
          if (cleanPart && cleanPart !== mainForm) {
            vocabularyMap!.set(cleanPart, word);
          }
        });
        
        // Add common verb endings based on conjugation patterns
        const firstPartNorm = normalizeLatin(parts[0] || '');
        if (firstPartNorm.endsWith('o')) {
          const stem = firstPartNorm.replace(/o$/, '');
          // First conjugation present active forms
          const forms = [
            `${stem}o`, `${stem}as`, `${stem}at`, 
            `${stem}amus`, `${stem}atis`, `${stem}ant`
          ];
          forms.forEach(form => vocabularyMap!.set(form, word));
        }
      }
      
      // For nouns, add common case forms
      if (word.partOfSpeech === 'noun' && word.principalParts) {
        const parts = word.principalParts.split(', ');
        if (parts.length >= 2) {
          const nominative = parts[0];
          const genitive = parts[1];

          const nominativeNorm = normalizeLatin(nominative);
          const genitiveRaw = genitive.toLowerCase();
          const genitiveNorm = normalizeLatin(genitiveRaw);

          // Detect declension by normalized genitive ending
          const isFirstDecl = genitiveNorm.endsWith('ae');
          const isSecondDecl = genitiveNorm.endsWith('i');

          if (isFirstDecl) {
            // Build stem from full genitive if present; handle "-ae" shorthand
            let stem = '';
            if (genitiveRaw.startsWith('-')) {
              // Shorthand like "-ae": remove final 'a' from nominative to get stem
              // e.g., terra, -ae -> terr-
              stem = normalizeLatin(nominative).replace(/a$/, '');
            } else {
              // Full genitive given
              stem = genitiveNorm.replace(/ae$/, '');
            }
            const forms = [
              nominativeNorm, // nom sg
              `${stem}ae`, // gen sg & nom/voc pl
              `${stem}am`, // acc sg
              `${stem}arum`, // gen pl
              `${stem}as`, // acc pl
              `${stem}is`, // dat/abl pl
            ];
            forms.forEach(form => form && vocabularyMap!.set(form, word));
          } else if (isSecondDecl) {
            // Handle second declension (-us/-um, gen -i)
            let stem = '';
            const nominativeStr = nominativeNorm;
            if (genitiveRaw.startsWith('-')) {
              // e.g., hortus, -i -> stem from nominative
              if (nominativeStr.endsWith('us')) stem = nominativeStr.slice(0, -2);
              else if (nominativeStr.endsWith('um')) stem = nominativeStr.slice(0, -2);
              else if (nominativeStr.endsWith('er')) stem = nominativeStr.slice(0, -2); // puer
              else stem = nominativeStr; // fallback
            } else {
              // Full genitive provided: remove trailing 'i'
              stem = genitiveNorm.replace(/i$/, '');
              if (!stem) {
                // Fallback to nominative-based stem if genitive was too short
                if (nominativeStr.endsWith('us')) stem = nominativeStr.slice(0, -2);
                else if (nominativeStr.endsWith('um')) stem = nominativeStr.slice(0, -2);
                else if (nominativeStr.endsWith('er')) stem = nominativeStr.slice(0, -2);
                else stem = nominativeStr;
              }
            }

            const isNeuter = nominativeStr.endsWith('um');
            const nomSg = nominativeStr;
            const genSg = `${stem}i`;
            const datSg = `${stem}o`;
            const accSg = isNeuter ? `${stem}um` : `${stem}um`;
            const ablSg = `${stem}o`;
            const nomPl = isNeuter ? `${stem}a` : `${stem}i`;
            const genPl = `${stem}orum`;
            const datPl = `${stem}is`;
            const accPl = isNeuter ? `${stem}a` : `${stem}os`;
            const ablPl = `${stem}is`;

            const forms = [
              nomSg, genSg, datSg, accSg, ablSg,
              nomPl, genPl, datPl, accPl, ablPl,
            ];
            forms.forEach(form => form && vocabularyMap!.set(form, word));
          }
        }
      }
      
      // For adjectives, add feminine forms
      if (word.partOfSpeech === 'adjective' && word.principalParts) {
        const parts = word.principalParts.split(', ');
        parts.forEach(part => {
          const cleanPart = normalizeLatin(part);
          if (cleanPart) {
            vocabularyMap!.set(cleanPart, word);
          }
        });
      }
    });
  });
  
  return vocabularyMap;
}

export function lookupWord(word: string): VocabWord | undefined {
  const vocab = buildVocabularyMap();
  
  // Normalize the input (remove macrons/diacritics, punctuation, lowercase)
  const cleanWord = normalizeLatin(word);
  
  if (!cleanWord) return undefined;
  
  // Direct lookup
  let result = vocab.get(cleanWord);
  if (result) return result;
  
  // Try without common prefixes/suffixes that might not be in our forms
  const variations = [
    cleanWord.replace(/que$/, ''), // Remove -que enclitic
    cleanWord.replace(/ne$/, ''), // Remove -ne enclitic
    cleanWord.replace(/ve$/, ''), // Remove -ve enclitic
  ];
  
  for (const variation of variations) {
    result = vocab.get(variation);
    if (result) return result;
  }
  
  return undefined;
}

// Function to get all words that start with a prefix (for autocomplete, etc.)
export function getWordsStartingWith(prefix: string): VocabWord[] {
  const vocab = buildVocabularyMap();
  const cleanPrefix = prefix.toLowerCase().trim();
  
  if (!cleanPrefix) return [];
  
  const results: VocabWord[] = [];
  const seen = new Set<string>();
  
  vocab.forEach((word, key) => {
    if (key.startsWith(cleanPrefix) && !seen.has(word.id)) {
      results.push(word);
      seen.add(word.id);
    }
  });
  
  return results.sort((a, b) => a.latin.localeCompare(b.latin));
}

// Refresh the vocabulary map (useful if lessons are updated)
export function refreshVocabularyMap(): void {
  vocabularyMap = null;
  buildVocabularyMap();
}
