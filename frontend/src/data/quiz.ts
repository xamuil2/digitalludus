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
  
  // Additional Lesson 1 Questions
  {
    id: '1-7',
    question: 'What is the genitive singular of "porta" (gate)?',
    options: ['porta', 'portam', 'portae', 'portarum'],
    correctAnswer: 2,
    explanation: 'First declension genitive singular endings are -ae. So porta → portae.',
    lesson: 1,
    difficulty: 'medium',
    category: 'grammar'
  },
  {
    id: '1-8',
    question: 'Translate: "Puella aquam portat"',
    options: ['The girl carries water', 'The girl drinks water', 'The water carries the girl', 'The girl loves water'],
    correctAnswer: 0,
    explanation: 'Puella (nominative) = girl (subject), aquam (accusative) = water (object), portat = carries.',
    lesson: 1,
    difficulty: 'easy',
    category: 'translation'
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
  },
  {
    id: '2-5',
    question: 'What does "silva" mean?',
    options: ['field', 'forest', 'water', 'road'],
    correctAnswer: 1,
    explanation: 'Silva is a first declension feminine noun meaning "forest" or "woods".',
    lesson: 2,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '2-6',
    question: 'Translate: "Filia rosam portat"',
    options: ['The daughter carries a rose', 'The daughter loves a rose', 'The girl gives a rose', 'The daughter picks a rose'],
    correctAnswer: 0,
    explanation: 'Filia (nominative) = daughter, rosam (accusative) = rose (direct object), portat = carries.',
    lesson: 2,
    difficulty: 'medium',
    category: 'translation'
  },

  // Additional Lesson 2 Questions  
  {
    id: '2-7',
    question: 'What does "terra" mean?',
    options: ['sky', 'earth/land', 'sea', 'mountain'],
    correctAnswer: 1,
    explanation: 'Terra is a first declension feminine noun meaning "earth" or "land".',
    lesson: 2,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '2-8',
    question: 'Which of these verbs is in the present tense?',
    options: ['amavit', 'amabat', 'amat', 'amabit'],
    correctAnswer: 2,
    explanation: 'Amat is present tense (he/she loves). Amavit is perfect, amabat is imperfect, amabit is future.',
    lesson: 2,
    difficulty: 'medium',
    category: 'grammar'
  },

  // Lesson 3 Questions
  {
    id: '3-1',
    question: 'What does "magnus" mean?',
    options: ['small', 'good', 'large/great', 'bad'],
    correctAnswer: 2,
    explanation: 'Magnus is a first/second declension adjective meaning "large" or "great".',
    lesson: 3,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '3-2',
    question: 'How do adjectives agree with nouns in Latin?',
    options: ['Only in case', 'Only in number', 'Only in gender', 'In case, number, and gender'],
    correctAnswer: 3,
    explanation: 'Latin adjectives must agree with their nouns in case, number, and gender.',
    lesson: 3,
    difficulty: 'medium',
    category: 'grammar'
  },
  {
    id: '3-3',
    question: 'Translate: "Puella bona est"',
    options: ['The girl is good', 'The good girl', 'The girls are good', 'The girl was good'],
    correctAnswer: 0,
    explanation: 'Puella (nominative singular) = the girl, bona (nominative singular feminine) = good, est = is.',
    lesson: 3,
    difficulty: 'medium',
    category: 'translation'
  },
  {
    id: '3-4',
    question: 'What is the correct form of "bonus" to modify "puella"?',
    options: ['bonus', 'bonum', 'bona', 'bonae'],
    correctAnswer: 2,
    explanation: 'Since puella is feminine nominative singular, the adjective must be bona (feminine nominative singular).',
    lesson: 3,
    difficulty: 'medium',
    category: 'grammar'
  },
  {
    id: '3-5',
    question: 'What does "malus" mean?',
    options: ['good', 'bad/evil', 'apple', 'big'],
    correctAnswer: 1,
    explanation: 'Malus is an adjective meaning "bad" or "evil". It can also be a noun meaning "apple tree".',
    lesson: 3,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '3-6',
    question: 'Translate: "Agricola magnam villam habet"',
    options: ['The farmer has a large house', 'The large farmer has a house', 'The farmer loves a large house', 'The farmer lives in a large house'],
    correctAnswer: 0,
    explanation: 'Agricola = farmer (subject), magnam villam = large house (accusative, direct object), habet = has.',
    lesson: 3,
    difficulty: 'hard',
    category: 'translation'
  },

  // Additional Lesson 3 Questions
  {
    id: '3-7',
    question: 'What is the accusative form of "bonus agricola"?',
    options: ['bonus agricola', 'bonum agricola', 'bonum agricolam', 'bona agricola'],
    correctAnswer: 2,
    explanation: 'Both adjective and noun must be accusative: bonum (neuter accusative) agricolam (accusative).',
    lesson: 3,
    difficulty: 'hard',
    category: 'grammar'
  },
  {
    id: '3-8',
    question: 'What does "novus" mean?',
    options: ['old', 'new', 'beautiful', 'strong'],
    correctAnswer: 1,
    explanation: 'Novus is an adjective meaning "new". Think of English words like "novel" and "novice".',
    lesson: 3,
    difficulty: 'easy',
    category: 'vocabulary'
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
