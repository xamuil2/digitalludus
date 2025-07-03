export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  lesson: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'vocabulary' | 'grammar' | 'translation' | 'culture';
}

export const quizData: QuizQuestion[] = [
  // Lesson 1 Questions
  {
    id: '1-1',
    question: 'What is the nominative singular of "puella"?',
    options: ['puella', 'puellam', 'puellae', 'puellarum'],
    correctAnswer: 0,
    explanation: 'The nominative singular is the basic dictionary form of the noun, used for the subject of a sentence.',
    lesson: 1,
    difficulty: 'easy',
    category: 'grammar'
  },
  {
    id: '1-2',
    question: 'Which case is used for the direct object in Latin?',
    options: ['Nominative', 'Accusative', 'Genitive', 'Dative'],
    correctAnswer: 1,
    explanation: 'The accusative case is used for direct objects - the thing being acted upon by the verb.',
    lesson: 1,
    difficulty: 'medium',
    category: 'grammar'
  },
  {
    id: '1-3',
    question: 'What does "aqua" mean in English?',
    options: ['earth', 'water', 'forest', 'gate'],
    correctAnswer: 1,
    explanation: 'Aqua is a first declension feminine noun meaning "water". Think of English words like "aquatic" and "aquarium".',
    lesson: 1,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '1-4',
    question: 'Translate: "Agricola in villa habitat"',
    options: ['The farmer lives in the house', 'The farmer works in the field', 'The girl lives in the house', 'The farmer loves the house'],
    correctAnswer: 0,
    explanation: 'Agricola (nominative) = farmer/subject, villa (ablative) = in the house, habitat = he lives/dwells.',
    lesson: 1,
    difficulty: 'medium',
    category: 'translation'
  },
  {
    id: '1-5',
    question: 'Which of these is a first declension noun?',
    options: ['servus', 'dominus', 'puella', 'amicus'],
    correctAnswer: 2,
    explanation: 'Puella is first declension (ends in -a). The others (servus, dominus, amicus) are second declension nouns ending in -us.',
    lesson: 1,
    difficulty: 'medium',
    category: 'grammar'
  },
  {
    id: '1-6',
    question: 'What is the accusative singular of "silva"?',
    options: ['silva', 'silvam', 'silvae', 'silvarum'],
    correctAnswer: 1,
    explanation: 'First declension accusative singular endings are -am. So silva → silvam.',
    lesson: 1,
    difficulty: 'medium',
    category: 'grammar'
  },
  
  // Lesson 2 Questions
  {
    id: '2-1',
    question: 'What does "amat" mean?',
    options: ['he walks', 'he works', 'he loves', 'he lives'],
    correctAnswer: 2,
    explanation: 'Amat is the third person singular present tense of the verb amare, meaning "to love".',
    lesson: 2,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '2-2',
    question: 'Translate: "Servus in villa laborat"',
    options: ['The slave works in the house', 'The slave lives in the house', 'The master works in the house', 'The slave loves the house'],
    correctAnswer: 0,
    explanation: 'Servus = slave (subject), villa = house (location), laborat = works.',
    lesson: 2,
    difficulty: 'medium',
    category: 'translation'
  },
  {
    id: '2-3',
    question: 'Which verb means "to walk"?',
    options: ['amare', 'laborare', 'habitare', 'ambulare'],
    correctAnswer: 3,
    explanation: 'Ambulare means "to walk". Think of English "ambulatory" (relating to walking).',
    lesson: 2,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '2-4',
    question: 'What is the subject of: "Dominus agricolam amat"?',
    options: ['dominus', 'agricolam', 'amat', 'none of these'],
    correctAnswer: 0,
    explanation: 'Dominus is in the nominative case, making it the subject. Agricolam is accusative (direct object).',
    lesson: 2,
    difficulty: 'medium',
    category: 'grammar'
  }
];

export function getQuizByLesson(lesson: number): QuizQuestion[] {
  return quizData.filter(question => question.lesson === lesson);
}

export function getQuizByCategory(category: QuizQuestion['category']): QuizQuestion[] {
  return quizData.filter(question => question.category === category);
}

export function getQuizByDifficulty(difficulty: QuizQuestion['difficulty']): QuizQuestion[] {
  return quizData.filter(question => question.difficulty === difficulty);
}
