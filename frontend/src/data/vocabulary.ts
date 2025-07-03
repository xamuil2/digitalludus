export interface VocabWord {
  id: string;
  latin: string;
  english: string;
  partOfSpeech: string;
  lesson: number;
  difficulty: 'easy' | 'medium' | 'hard';
  etymology?: string;
}

export const vocabularyData: VocabWord[] = [
  // Lesson 1: First Declension Nouns
  { id: '1-1', latin: 'puella', english: 'girl', partOfSpeech: 'noun (fem.)', lesson: 1, difficulty: 'easy' },
  { id: '1-2', latin: 'agricola', english: 'farmer', partOfSpeech: 'noun (masc.)', lesson: 1, difficulty: 'easy' },
  { id: '1-3', latin: 'aqua', english: 'water', partOfSpeech: 'noun (fem.)', lesson: 1, difficulty: 'easy', etymology: 'Related to English "aquatic"' },
  { id: '1-4', latin: 'silva', english: 'forest, woods', partOfSpeech: 'noun (fem.)', lesson: 1, difficulty: 'easy', etymology: 'Related to English "sylvan"' },
  { id: '1-5', latin: 'porta', english: 'gate, door', partOfSpeech: 'noun (fem.)', lesson: 1, difficulty: 'easy', etymology: 'Related to English "portal"' },
  { id: '1-6', latin: 'via', english: 'road, way, street', partOfSpeech: 'noun (fem.)', lesson: 1, difficulty: 'easy', etymology: 'Related to English "via"' },
  { id: '1-7', latin: 'villa', english: 'house, country house, villa', partOfSpeech: 'noun (fem.)', lesson: 1, difficulty: 'easy' },
  { id: '1-8', latin: 'terra', english: 'earth, land', partOfSpeech: 'noun (fem.)', lesson: 1, difficulty: 'easy', etymology: 'Related to English "terrestrial"' },
  { id: '1-9', latin: 'insula', english: 'island', partOfSpeech: 'noun (fem.)', lesson: 1, difficulty: 'medium', etymology: 'Related to English "insular"' },
  { id: '1-10', latin: 'femina', english: 'woman', partOfSpeech: 'noun (fem.)', lesson: 1, difficulty: 'easy', etymology: 'Related to English "feminine"' },
  
  // Lesson 2: Verbs and more nouns
  { id: '2-1', latin: 'amat', english: 'he/she loves', partOfSpeech: 'verb', lesson: 2, difficulty: 'medium' },
  { id: '2-2', latin: 'habitat', english: 'he/she lives, dwells', partOfSpeech: 'verb', lesson: 2, difficulty: 'medium' },
  { id: '2-3', latin: 'laborat', english: 'he/she works', partOfSpeech: 'verb', lesson: 2, difficulty: 'medium' },
  { id: '2-4', latin: 'ambulat', english: 'he/she walks', partOfSpeech: 'verb', lesson: 2, difficulty: 'medium' },
  { id: '2-5', latin: 'servus', english: 'slave, servant', partOfSpeech: 'noun (masc.)', lesson: 2, difficulty: 'easy' },
  { id: '2-6', latin: 'dominus', english: 'master, lord', partOfSpeech: 'noun (masc.)', lesson: 2, difficulty: 'easy' },
  { id: '2-7', latin: 'amicus', english: 'friend', partOfSpeech: 'noun (masc.)', lesson: 2, difficulty: 'easy', etymology: 'Related to English "amicable"' },
  { id: '2-8', latin: 'campus', english: 'field, plain', partOfSpeech: 'noun (masc.)', lesson: 2, difficulty: 'easy' },
];

export function getVocabularyByLesson(lesson: number): VocabWord[] {
  return vocabularyData.filter(word => word.lesson === lesson);
}

export function getAllLessons(): number[] {
  return Array.from(new Set(vocabularyData.map(word => word.lesson))).sort();
}
