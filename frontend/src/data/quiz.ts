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
    question: 'What does "pater" mean?',
    options: ['mother', 'father', 'son', 'slave'],
    correctAnswer: 1,
    explanation: 'Pater means "father". Caecilius est pater = Caecilius is the father.',
    lesson: 1,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '1-2',
    question: 'Translate: "Metella est mater"',
    options: ['Metella is the mother', 'Metella is the daughter', 'Metella is the slave', 'Metella is angry'],
    correctAnswer: 0,
    explanation: 'Metella est mater = Metella is the mother. Mater means "mother".',
    lesson: 1,
    difficulty: 'easy',
    category: 'translation'
  },
  {
    id: '1-3',
    question: 'What does "canis" mean?',
    options: ['cat', 'dog', 'horse', 'bird'],
    correctAnswer: 1,
    explanation: 'Canis means "dog". Cerberus est canis = Cerberus is the dog.',
    lesson: 1,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '1-4',
    question: 'Translate: "coquus in culina laborat"',
    options: ['The cook works in the kitchen', 'The cook sleeps in the kitchen', 'The slave works in the garden', 'The cook is angry'],
    correctAnswer: 0,
    explanation: 'Coquus = cook, in culina = in the kitchen, laborat = works. "The cook works in the kitchen."',
    lesson: 1,
    difficulty: 'medium',
    category: 'translation'
  },
  {
    id: '1-5',
    question: 'What does "dormit" mean?',
    options: ['works', 'sits', 'sleeps', 'enters'],
    correctAnswer: 2,
    explanation: 'Dormit means "sleeps" or "is sleeping". Canis in via dormit = The dog sleeps in the street.',
    lesson: 1,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '1-6',
    question: 'Which room is the "tablinum"?',
    options: ['kitchen', 'dining room', 'study', 'garden'],
    correctAnswer: 2,
    explanation: 'Tablinum is the study or office where business was conducted in a Roman house.',
    lesson: 1,
    difficulty: 'medium',
    category: 'culture'
  },
  {
    id: '1-7',
    question: 'Translate: "Cerberus intrat"',
    options: ['Cerberus exits', 'Cerberus enters', 'Cerberus barks', 'Cerberus jumps'],
    correctAnswer: 1,
    explanation: 'Intrat means "enters". This is when Cerberus enters the kitchen and causes trouble.',
    lesson: 1,
    difficulty: 'easy',
    category: 'translation'
  },
  {
    id: '1-8',
    question: 'What does "iratus" mean?',
    options: ['happy', 'angry', 'tired', 'hungry'],
    correctAnswer: 1,
    explanation: 'Iratus means "angry". Coquus est iratus = The cook is angry (when he finds Cerberus in the kitchen).',
    lesson: 1,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '1-9',
    question: 'What does Grumio shout when he sees Cerberus?',
    options: ['salve!', 'pestis! furcifer!', 'ave!', 'vale!'],
    correctAnswer: 1,
    explanation: '"Pestis! furcifer!" means "Pest! Scoundrel!" - Grumio\'s angry exclamation when Cerberus wakes him up.',
    lesson: 1,
    difficulty: 'medium',
    category: 'culture'
  },
  {
    id: '1-10',
    question: 'In which room does Grumio work?',
    options: ['atrium', 'tablinum', 'culina', 'hortus'],
    correctAnswer: 2,
    explanation: 'Grumio works in the culina (kitchen) because he is the coquus (cook).',
    lesson: 1,
    difficulty: 'easy',
    category: 'vocabulary'
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
  },

  // Lesson 4 Questions
  {
    id: '4-1',
    question: 'What does "ego" mean?',
    options: ['you', 'I', 'he', 'we'],
    correctAnswer: 1,
    explanation: 'Ego is the first person singular pronoun meaning "I". It is often omitted in Latin since the verb ending shows the person.',
    lesson: 4,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '4-2',
    question: 'What does "tu" mean?',
    options: ['I', 'you (singular)', 'he', 'you (plural)'],
    correctAnswer: 1,
    explanation: 'Tu is the second person singular pronoun meaning "you" (when speaking to one person).',
    lesson: 4,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '4-3',
    question: 'Translate: "ego sum mercator"',
    options: ['You are a merchant', 'I am a merchant', 'He is a merchant', 'We are merchants'],
    correctAnswer: 1,
    explanation: 'Ego = I, sum = am, mercator = merchant. "I am a merchant."',
    lesson: 4,
    difficulty: 'easy',
    category: 'translation'
  },
  {
    id: '4-4',
    question: 'What question word means "who"?',
    options: ['quid', 'quis', 'cur', 'ubi'],
    correctAnswer: 1,
    explanation: 'Quis means "who" (for people). Quid = what, cur = why, ubi = where.',
    lesson: 4,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '4-5',
    question: 'What question word means "what"?',
    options: ['quis', 'quid', 'cur', 'ubi'],
    correctAnswer: 1,
    explanation: 'Quid means "what" (for things or actions). Quis = who, cur = why, ubi = where.',
    lesson: 4,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '4-6',
    question: 'Translate: "quis es tu?"',
    options: ['What are you?', 'Who are you?', 'Where are you?', 'Why are you?'],
    correctAnswer: 1,
    explanation: 'Quis = who, es = you are, tu = you (for emphasis). "Who are you?"',
    lesson: 4,
    difficulty: 'medium',
    category: 'translation'
  },
  {
    id: '4-7',
    question: 'What verb ending is used for "I" (first person singular)?',
    options: ['-s', '-t', '-o', '-nt'],
    correctAnswer: 2,
    explanation: 'First person singular verbs end in -o. For example: ego amo = I love, ego habeo = I have.',
    lesson: 4,
    difficulty: 'medium',
    category: 'grammar'
  },
  {
    id: '4-8',
    question: 'What verb ending is used for "you" (second person singular)?',
    options: ['-o', '-s', '-t', '-nt'],
    correctAnswer: 1,
    explanation: 'Second person singular verbs end in -s. For example: tu amas = you love, tu habes = you have.',
    lesson: 4,
    difficulty: 'medium',
    category: 'grammar'
  },
  {
    id: '4-9',
    question: 'Translate: "cur tu pecuniam quaeris?"',
    options: ['Why do you look for money?', 'What money do you want?', 'Where is your money?', 'Who has the money?'],
    correctAnswer: 0,
    explanation: 'Cur = why, tu = you, pecuniam = money (accusative), quaeris = you look for/seek.',
    lesson: 4,
    difficulty: 'medium',
    category: 'translation'
  },
  {
    id: '4-10',
    question: 'What does "anulus" mean?',
    options: ['money', 'seal', 'ring', 'wax tablet'],
    correctAnswer: 2,
    explanation: 'Anulus means "ring". In Roman times, rings often had seals (signum) for making legal documents.',
    lesson: 4,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '4-11',
    question: 'What does "iudex" mean?',
    options: ['witness', 'lawyer', 'judge', 'merchant'],
    correctAnswer: 2,
    explanation: 'Iudex means "judge". In Roman courts, the judge (iudex) heard cases and made decisions.',
    lesson: 4,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '4-12',
    question: 'Translate: "tu es mendax"',
    options: ['You are honest', 'You are a liar', 'You are a witness', 'You are a judge'],
    correctAnswer: 1,
    explanation: 'Tu = you, es = are, mendax = liar. "You are a liar." This accusation appears in the Hermogenes court case.',
    lesson: 4,
    difficulty: 'medium',
    category: 'translation'
  },
  {
    id: '4-13',
    question: 'What possessive adjective means "my"?',
    options: ['tuus', 'meus', 'suus', 'noster'],
    correctAnswer: 1,
    explanation: 'Meus, mea, meum means "my" or "mine". It must agree with the noun in gender, number, and case.',
    lesson: 4,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '4-14',
    question: 'What possessive adjective means "your"?',
    options: ['meus', 'tuus', 'suus', 'vester'],
    correctAnswer: 1,
    explanation: 'Tuus, tua, tuum means "your" or "yours" (singular). It must agree with the noun it modifies.',
    lesson: 4,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '4-15',
    question: 'Translate: "amicus meus est testis"',
    options: ['My friend is a witness', 'Your friend is a witness', 'His friend is a witness', 'Our friend is a witness'],
    correctAnswer: 0,
    explanation: 'Amicus = friend, meus = my (masculine nominative), est = is, testis = witness.',
    lesson: 4,
    difficulty: 'medium',
    category: 'translation'
  },
  {
    id: '4-16',
    question: 'What does "convinco" mean?',
    options: ['I accuse', 'I prove', 'I convict', 'I hide'],
    correctAnswer: 2,
    explanation: 'Convinco means "I convict" or "I find guilty". The judge uses this word at the end of the Hermogenes trial.',
    lesson: 4,
    difficulty: 'medium',
    category: 'vocabulary'
  },
  {
    id: '4-17',
    question: 'In Latin, when do you typically use "ego" or "tu"?',
    options: ['Always with verbs', 'Only in questions', 'For emphasis or clarity', 'Never - they are forbidden'],
    correctAnswer: 2,
    explanation: 'Ego and tu are usually omitted since verb endings show the person. Use them for emphasis or clarity.',
    lesson: 4,
    difficulty: 'medium',
    category: 'grammar'
  },
  {
    id: '4-18',
    question: 'What does "ubi" mean?',
    options: ['who', 'what', 'why', 'where'],
    correctAnswer: 3,
    explanation: 'Ubi means "where". Example: "ubi est anulus?" = "Where is the ring?"',
    lesson: 4,
    difficulty: 'easy',
    category: 'vocabulary'
  },
  {
    id: '4-19',
    question: 'Translate: "ego Hermogenem convinco"',
    options: ['I accuse Hermogenes', 'I convict Hermogenes', 'I defend Hermogenes', 'I question Hermogenes'],
    correctAnswer: 1,
    explanation: 'Ego = I, Hermogenem = Hermogenes (accusative), convinco = I convict. This is the judge\'s final pronouncement.',
    lesson: 4,
    difficulty: 'hard',
    category: 'translation'
  },
  {
    id: '4-20',
    question: 'What was Hermogenes\' profession?',
    options: ['banker', 'judge', 'Greek merchant', 'witness'],
    correctAnswer: 2,
    explanation: 'Hermogenes was a mercator Graecus (Greek merchant) who sought a loan from Caecilius but failed to repay it.',
    lesson: 4,
    difficulty: 'easy',
    category: 'culture'
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
