export interface LessonSection {
  id: string;
  title: string;
  content: string;
  type: 'intro' | 'prose' | 'vocabulary' | 'grammar' | 'exercises' | 'culture';
  order: number;
}

export interface VocabWord {
  id: string;
  latin: string;
  principalParts?: string; // e.g., "puella, puellae, f."
  english: string;
  partOfSpeech: string;
  lesson: number;
  difficulty: 'easy' | 'medium' | 'hard';
  etymology?: string;
  notes?: string;
}

export interface GrammarConcept {
  id: string;
  title: string;
  explanation: string;
  examples: {
    latin: string;
    english: string;
    notes?: string;
  }[];
  rules: string[];
  charts?: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
}

export interface PracticeExercise {
  id: string;
  type: 'latin-to-english' | 'english-to-latin';
  title: string;
  sentences: {
    id: string;
    source: string;
    target: string;
    hints?: string[];
    notes?: string;
  }[];
}

export interface Lesson {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  pageNumbers: number[];
  
  // Content sections in order
  introductoryNote: {
    content: string;
  };
  
  prosePassage: {
    title?: string;
    sentences: {
      id: string;
      latin: string;
      english?: string; // Translation if provided
      order: number;
    }[];
    fullTranslation?: string;
    context?: string; // What the story is about
  };
  
  vocabulary: VocabWord[];
  
  keyConcepts: GrammarConcept[];
  
  practiceExercises: PracticeExercise[];
  
  // Metadata
  objectives: string[];
  culturalNotes?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisiteSkills: string[];
  estimatedTime: number; // in minutes
  
  // For UI organization
  sections: LessonSection[];
}

// Lesson 1 - Extracted from Ludus pages 17-22
export const lesson1Template: Lesson = {
  id: 1,
  title: "Ludus - Lesson 1",
  subtitle: "The Latin Language",
  description: "Introduction to Latin with first declension nouns, cases, and the story of Sicily",
  pageNumbers: [17, 18, 19, 20, 21, 22],
  
  introductoryNote: {
    content: `Latin derives from what was once only one of many related languages spoken in Italy in the first half of the first millennium B.C. These Italic languages are considered one major branch, or family, of Proto-Indo-European, which is the root, or parent language of many still spoken today in Europe, Russia, the Middle East, India, and the Americas.

The gradual spread of Rome's political and economic power in the Mediterranean world from circa 500 B.C. was the main cause of Latin prominence in antiquity and of its long history thereafter. Yet the importance and influence of Latin rests also on the literary creativity of the Romans themselves, who, while drawing inspiration from other ancient cultures (most notably that of the Greeks) fashioned their own corpus of remarkable works – epic and lyric poetry, history, oratory, and novels. As English today is spoken and written fluently by many who are neither natives of England nor descendants of those peoples, but have learned English as a second language, so many thousands within the Roman Empire and beyond spoke and wrote Latin, whether as a matter of practical necessity or as medium for the expression of ideas in speech, prose, and poetry.

Latin as a living language, in the common sense of that expression, did not survive much beyond 500-600 A.D. By the time of the emperor Charlemagne (800 C.E.), a conscious program was required to restore the knowledge of Latin to a level sufficient for the reading and understanding of documents in that language, especially works pertaining to the Christian religion (in western Europe).

In some sense, however, Latin survived through a kind of evolution. Like virtually every living language, its most frequent users was in oral communication. Oral languages tend to change in pronunciation and grammar over time, often to suit the needs of the speakers. Several modern European languages, such as French, Spanish, and Italian, are the results of this evolution. Pronunciation of words has changed, and, more important, the grammar of the oral forms of these languages has been considerably simplified, to the extent, in fact, that a speaker of French and a speaker of ancient Latin would be mutually unintelligible (as would be a speaker of modern English and one of Old English).`
  },
  
  prosePassage: {
    title: "Insula Sicilia",
    context: "A story about Sicily describing the islands, their inhabitants, and the agricultural life",
    sentences: [
      { id: "1-prose-1", latin: "Sunt multae īnsulae.", english: "There are many islands.", order: 1 },
      { id: "1-prose-2", latin: "Multae īnsulae sunt parvae, sed multae quoque sunt magnae.", english: "Many islands are small, but many also are large.", order: 2 },
      { id: "1-prose-3", latin: "Sicilia īnsula est.", english: "Sicily is an island.", order: 3 },
      { id: "1-prose-4", latin: "Magna īnsula est.", english: "It is a large island.", order: 4 },
      { id: "1-prose-5", latin: "Multās et magnās silvās nōn habet, sed īncolae Siciliae īnsulam saepe laudant.", english: "It does not have many and large forests, but the inhabitants of Sicily often praise the island.", order: 5 },
      { id: "1-prose-6", latin: "Agricolae Siciliam amant quod terram bonam habet.", english: "Farmers love Sicily because it has good land.", order: 6 },
      { id: "1-prose-7", latin: "Terram bonam īnsulae laudant.", english: "They praise the good land of the island.", order: 7 },
      { id: "1-prose-8", latin: "Fēminae quoque Siciliam laudant.", english: "Women also praise Sicily.", order: 8 },
      { id: "1-prose-9", latin: "Sicilia nōn est īnsula perīculōsa.", english: "Sicily is not a dangerous island.", order: 9 },
      { id: "1-prose-10", latin: "Vīta agricolārum et fēminārum est bona quod Sicilia terra bona est.", english: "The life of farmers and women is good because Sicily is good land.", order: 10 }
    ],
    fullTranslation: "There are many islands. Many islands are small, but many also are large. Sicily is an island. It is a large island. It does not have many and large forests, but the inhabitants of Sicily often praise the island. Farmers love Sicily because it has good land. They praise the good land of the island. Women also praise Sicily. Sicily is not a dangerous island. The life of farmers and women is good because Sicily is good land."
  },
  
  vocabulary: [
    {
      id: "1-vocab-1",
      latin: "amant",
      principalParts: "amō, amāre, amāvī, amātus",
      english: "they love, like",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-2",
      latin: "est",
      principalParts: "sum, esse, fuī, futūrus",
      english: "he, she, it is",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-3",
      latin: "habet",
      principalParts: "habeō, habēre, habuī, habitus",
      english: "he, she, it has, holds",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-4",
      latin: "laudant",
      principalParts: "laudō, laudāre, laudāvī, laudātus",
      english: "they praise",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-5",
      latin: "sunt",
      principalParts: "sum, esse, fuī, futūrus",
      english: "they are",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-6",
      latin: "vident",
      principalParts: "videō, vidēre, vīdī, vīsus",
      english: "they see",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-7",
      latin: "videt",
      principalParts: "videō, vidēre, vīdī, vīsus",
      english: "he, she, it sees",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-8",
      latin: "agricola",
      principalParts: "agricola, -ae",
      english: "farmer",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-9",
      latin: "īncola",
      principalParts: "īncola, -ae",
      english: "inhabitant",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-10",
      latin: "īnsula",
      principalParts: "īnsula, -ae",
      english: "island",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-11",
      latin: "puella",
      principalParts: "puella, -ae",
      english: "girl",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-12",
      latin: "silva",
      principalParts: "silva, -ae",
      english: "forest, woods",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-13",
      latin: "terra",
      principalParts: "terra, -ae",
      english: "land, earth",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-14",
      latin: "vīta",
      principalParts: "vīta, -ae",
      english: "life",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-15",
      latin: "bona",
      principalParts: "bonus, -a, -um",
      english: "good",
      partOfSpeech: "adjective",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-16",
      latin: "magna",
      principalParts: "magnus, -a, -um",
      english: "large, great",
      partOfSpeech: "adjective",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-17",
      latin: "multae",
      principalParts: "multus, -a, -um",
      english: "many",
      partOfSpeech: "adjective",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-18",
      latin: "parva",
      principalParts: "parvus, -a, -um",
      english: "small",
      partOfSpeech: "adjective",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-19",
      latin: "perīculōsa",
      principalParts: "perīculōsus, -a, -um",
      english: "dangerous",
      partOfSpeech: "adjective",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-20",
      latin: "et",
      principalParts: "et",
      english: "and",
      partOfSpeech: "conjunction",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-21",
      latin: "nōn",
      principalParts: "nōn",
      english: "not",
      partOfSpeech: "adverb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-22",
      latin: "quod",
      principalParts: "quod",
      english: "because",
      partOfSpeech: "conjunction",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-23",
      latin: "quoque",
      principalParts: "quoque",
      english: "also, too",
      partOfSpeech: "adverb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-24",
      latin: "saepe",
      principalParts: "saepe",
      english: "often",
      partOfSpeech: "adverb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-25",
      latin: "sed",
      principalParts: "sed",
      english: "but",
      partOfSpeech: "conjunction",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-26",
      latin: "terra incognita",
      principalParts: "terra incognita",
      english: "unknown land",
      partOfSpeech: "phrase",
      lesson: 1,
      difficulty: "medium",
      notes: "A famous Latin phrase meaning unexplored territory"
    }
  ],
  
  keyConcepts: [
    {
      id: "1-concept-1",
      title: "Case",
      explanation: `Latin nouns change their endings to show their function. The different types of forms produced by changing the endings are called "cases". Canis and canem are, in some sense, the same word (dog), but each is a different case. While this difference does not affect the basic meaning of the noun, it does affect the meaning of the sentence.

(A Latin adjective must always be in the same case as the noun it modifies.)`,
      examples: [
        {
          latin: "Canis fēlem īnsequitur.",
          english: "The dog chases the cat.",
          notes: "canis is subject, fēlem is direct object"
        },
        {
          latin: "Fēlis canem īnsequitur.",
          english: "The cat chases the dog.",
          notes: "fēlis is subject, canem is direct object"
        }
      ],
      rules: [
        "Latin nouns change their endings to show their function",
        "The ending of a word shows which noun is the subject and which the direct object",
        "Order of words is unimportant in expressing the basic meaning of the sentence"
      ]
    },
    {
      id: "1-concept-2", 
      title: "Number",
      explanation: `Nouns and adjectives can refer to one thing or more than one thing. Of the two nouns dog and dogs, we say the first is singular in number and the second plural in number.

(A Latin adjective must always be in the same number as the noun it modifies.)`,
      examples: [
        {
          latin: "Terra est magna.",
          english: "The land is large.",
          notes: "singular forms"
        },
        {
          latin: "Terrae sunt magnae.",
          english: "The lands are large.",
          notes: "plural forms"
        }
      ],
      rules: [
        "Singular refers to one thing",
        "Plural refers to more than one thing",
        "Adjectives must match the number of the noun they modify"
      ]
    },
    {
      id: "1-concept-3",
      title: "Nominative Case", 
      explanation: `In Latin a subject or predicate noun or adjective is in the nominative case. Any adjective that modifies a subject or predicate noun must also be in the nominative case. In the Latin equivalent of The girl chases the cat, girl would have to be nominative in case and singular in number. In the Latin equivalent of The girls are strong, girls would have to be nominative in case and plural in number; strong would have to be nominative plural also, since it modifies girls (as a predicate adjective).

In the first type of Latin nouns and adjectives we will encounter, the nominative singular and plural endings are -a and -ae, respectively. Thus, terra (land) is the nominative singular, and terrae (lands) is the nominative plural.`,
      examples: [
        {
          latin: "Terra est magna.",
          english: "The land is large.",
          notes: "terra is nominative singular subject"
        },
        {
          latin: "Terrae sunt magnae.",
          english: "The lands are large.",
          notes: "terrae is nominative plural subject, magnae agrees"
        }
      ],
      rules: [
        "Subject nouns are in nominative case",
        "Predicate nouns and adjectives are in nominative case", 
        "Nominative singular ends in -a",
        "Nominative plural ends in -ae"
      ]
    },
    {
      id: "1-concept-4",
      title: "Adjective-Noun Agreement",
      explanation: `Notice that in the first example above the (predicate) adjective magna is in the same case and number as the noun which it modifies. The same is true with adjectives modifying nouns directly. In the following sentence, magna must be in the nominative plural, magnae, in order to modify the noun terrae.

This fundamental rule about the relation of adjectives to the nouns they modify is referred to as adjective-noun agreement.`,
      examples: [
        {
          latin: "Magnae terrae sunt bonae.",
          english: "Large lands are good.",
          notes: "magnae agrees with terrae in case, number, and gender"
        }
      ],
      rules: [
        "Adjectives must agree with their nouns in case, number, and gender",
        "This agreement is maintained regardless of word order"
      ]
    },
    {
      id: "1-concept-5",
      title: "Genitive Case",
      explanation: `When a Latin noun is the possessor, it is in the genitive case. The singular and plural endings of this case are -ae and -ārum, respectively.

N.B.: A possessive genitive usually follows the noun it modifies.`,
      examples: [
        {
          latin: "terra agricolae",
          english: "the land of the farmer, the farmer's land",
          notes: "agricolae is genitive singular"
        },
        {
          latin: "terra agricolārum", 
          english: "the land of the farmers, the farmers' land",
          notes: "agricolārum is genitive plural"
        }
      ],
      rules: [
        "Genitive case shows possession",
        "Genitive singular ends in -ae", 
        "Genitive plural ends in -ārum",
        "Possessive genitive usually follows the noun it modifies"
      ]
    },
    {
      id: "1-concept-6",
      title: "Accusative Case",
      explanation: `A Latin noun that functions as the direct object must be in the accusative case. The singular and plural endings for this case are -am and -ās, respectively.`,
      examples: [
        {
          latin: "Agricola terram habet.",
          english: "The farmer has land.",
          notes: "terram is accusative singular direct object"
        },
        {
          latin: "Agricola terrās bonās habet.",
          english: "The farmer has good lands.",
          notes: "terrās is accusative plural, bonās agrees"
        }
      ],
      rules: [
        "Direct objects are in accusative case",
        "Accusative singular ends in -am",
        "Accusative plural ends in -ās"
      ],
      charts: [
        {
          title: "First Declension Endings",
          headers: ["Case", "Singular", "Plural"],
          rows: [
            ["Nominative", "-a", "-ae"],
            ["Genitive", "-ae", "-ārum"], 
            ["Accusative", "-am", "-ās"]
          ]
        },
        {
          title: "Model: terra",
          headers: ["Case", "Singular", "Plural"],
          rows: [
            ["NOM", "terra", "terrae"],
            ["GEN", "terrae", "terrārum"],
            ["ACC", "terram", "terrās"]
          ]
        }
      ]
    },
    {
      id: "1-concept-7",
      title: "Three Notes about Verbs and Sentences",
      explanation: `1) Verbs change their forms to agree with their subject in number. If the subject is singular, the verb has a singular form; if the subject is plural, the verb has a plural form.

2) The standard order of words in a Latin sentence is subject-object-verb (SOV). Linking verbs, such as to be, can come between the subject and (predicate) adjective or noun, as in the examples directly above.

3) When the verb est or sunt comes before its subject, then it has the sense of the English There is... or There are... Est īnsula. There is an island. (Such use of the verb to be in English is called the "expletive".)`,
      examples: [
        {
          latin: "Terra est bona.",
          english: "The land is good.",
          notes: "Singular subject and verb"
        },
        {
          latin: "Terrae sunt bonae.",
          english: "The lands are good.", 
          notes: "Plural subject and verb"
        },
        {
          latin: "Terram videt.",
          english: "She sees the land.",
          notes: "SOV word order"
        },
        {
          latin: "Est īnsula.",
          english: "There is an island.",
          notes: "Expletive use of est"
        }
      ],
      rules: [
        "Verbs agree with their subjects in number",
        "Standard Latin word order is Subject-Object-Verb (SOV)",
        "Est/sunt before the subject means 'there is/are'"
      ]
    }
  ],
  
  practiceExercises: [
    {
      id: "1-practice-latin-english",
      type: "latin-to-english",
      title: "1A Translate into English",
      sentences: [
        {
          id: "1-l2e-1",
          source: "Silva est magna.",
          target: "The forest is large.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-2", 
          source: "Silva nōn est magna.",
          target: "The forest is not large.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-3",
          source: "Silvae nōn sunt magnae.",
          target: "The forests are not large.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-4",
          source: "Sunt multae et parvae īnsulae.",
          target: "There are many and small islands.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-5",
          source: "Agricolae īnsulās saepe nōn amant.",
          target: "Farmers often do not love islands.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-6",
          source: "Īncola magnam silvam quoque habet.",
          target: "The inhabitant also has a large forest.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-7",
          source: "Agricolae silvās amant, sed silvae parvae sunt.",
          target: "Farmers love forests, but the forests are small.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-8",
          source: "Puellae terram nōn laudant quod terra silvam nōn habet.",
          target: "The girls do not praise the land because the land does not have a forest.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-9",
          source: "Īnsulās amant. Īnsulae magnae sunt.",
          target: "They love islands. The islands are large.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-10",
          source: "Īnsulās amant et īnsulae magnae sunt.",
          target: "They love islands and the islands are large.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-11",
          source: "Īnsulās amant quod īnsulae sunt magnae.",
          target: "They love islands because the islands are large.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-12",
          source: "Terra īncolae est magna et bona.",
          target: "The land of the inhabitant is large and good.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-13",
          source: "Magnās īnsulīs nautārum videt.",
          target: "She sees the large islands of the sailors.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-14",
          source: "Multās et bonās silvās vident.",
          target: "They see many and good forests.",
          hints: [],
          notes: ""
        },
        {
          id: "1-l2e-15",
          source: "Vītam agricolārum laudant sed vītam perīculōsam nōn amant.",
          target: "They praise the life of farmers but do not love a dangerous life.",
          hints: [],
          notes: ""
        }
      ]
    },
    {
      id: "1-practice-english-latin",
      type: "english-to-latin",
      title: "1B Write in Latin",
      sentences: [
        {
          id: "1-e2l-1",
          source: "The land is large.",
          target: "Terra est magna.",
          hints: ["Remember: nominative case for subject", "Use est for 'is'"],
          notes: ""
        },
        {
          id: "1-e2l-2",
          source: "There are small islands.",
          target: "Sunt parvae īnsulae.",
          hints: ["Use sunt for 'there are'", "Adjective must agree with noun"],
          notes: ""
        },
        {
          id: "1-e2l-3",
          source: "The land of a farmer is large and good.",
          target: "Terra agricolae est magna et bona.",
          hints: ["Genitive case for 'of a farmer'", "Multiple adjectives with et"],
          notes: ""
        },
        {
          id: "1-e2l-4",
          source: "The lives of the girls are good.",
          target: "Vītae puellārum sunt bonae.",
          hints: ["Plural subject and verb", "Genitive plural for 'of the girls'"],
          notes: ""
        },
        {
          id: "1-e2l-5",
          source: "He does not have many (and) small islands.",
          target: "Multās et parvās īnsulās nōn habet.",
          hints: ["Accusative case for direct object", "Use nōn for negation"],
          notes: ""
        },
        {
          id: "1-e2l-6",
          source: "The inhabitant has little land because the island has many forests.",
          target: "Īncola parvam terram habet quod īnsula multās silvās habet.",
          hints: ["Use quod for 'because'", "Accusative for direct objects"],
          notes: ""
        },
        {
          id: "1-e2l-7",
          source: "The islands are many but small.",
          target: "Īnsulae sunt multae sed parvae.",
          hints: ["Use sed for 'but'", "Predicate adjectives in nominative"],
          notes: ""
        },
        {
          id: "1-e2l-8",
          source: "She sees the inhabitant's island.",
          target: "Īnsulam īncolae videt.",
          hints: ["Genitive for possession", "Accusative for direct object"],
          notes: ""
        },
        {
          id: "1-e2l-9",
          source: "They often praise the farmer because they love the land.",
          target: "Agricolam saepe laudant quod terram amant.",
          hints: ["Use saepe for 'often'", "Use quod for 'because'"],
          notes: ""
        },
        {
          id: "1-e2l-10",
          source: "The life of girls is good.",
          target: "Vīta puellārum est bona.",
          hints: ["Singular 'life'", "Genitive plural for 'of girls'"],
          notes: ""
        }
      ]
    }
  ],
  
  objectives: [
    "Understand the concept of grammatical case in Latin",
    "Learn the nominative, genitive, and accusative cases of first declension nouns",
    "Master first declension noun endings (-a, -ae, -am, -ās, -ae, -ārum)", 
    "Understand adjective-noun agreement in case, number, and gender",
    "Learn basic Latin sentence structure (Subject-Object-Verb)",
    "Recognize and use common first declension vocabulary",
    "Translate simple Latin sentences with first declension nouns and adjectives",
    "Understand the difference between singular and plural forms",
    "Learn basic Latin verbs (est, sunt, habet, amant, laudant, vident)",
    "Practice reading connected Latin prose about Sicily"
  ],
  
  culturalNotes: [
    "Sicily was an important island in the ancient Mediterranean world",
    "Roman farmers (agricolae) were crucial to the empire's food supply", 
    "The Latin language evolved from spoken dialects in ancient Italy",
    "Latin became the language of administration, literature, and education throughout the Roman Empire",
    "The phrase 'terra incognita' (unknown land) was used on ancient maps for unexplored regions"
  ],
  
  difficulty: "beginner",
  prerequisiteSkills: ["Basic understanding of English grammar", "Familiarity with concepts of subject and direct object"],
  estimatedTime: 60,
  
  // UI organization - this structures how the lesson appears in our interface
  sections: [
    {
      id: "1-intro",
      title: "Introduction",
      content: "introductoryNote", // References the introductoryNote field
      type: "intro",
      order: 1
    },
    {
      id: "1-prose",
      title: "Reading Passage",
      content: "prosePassage", // References the prosePassage field
      type: "prose",
      order: 2
    },
    {
      id: "1-vocab",
      title: "Vocabulary",
      content: "vocabulary", // References the vocabulary field
      type: "vocabulary",
      order: 3
    },
    {
      id: "1-grammar",
      title: "Key Concepts",
      content: "keyConcepts", // References the keyConcepts field
      type: "grammar",
      order: 4
    },
    {
      id: "1-exercises",
      title: "Practice Exercises",
      content: "practiceExercises", // References the practiceExercises field
      type: "exercises",
      order: 5
    }
  ]
};

// Updated lessons array with our template
export const lessonsData: Lesson[] = [
  lesson1Template
  // We'll add more lessons later
];

export function getLessonById(id: number): Lesson | undefined {
  return lessonsData.find(lesson => lesson.id === id);
}

export function getAllLessons(): Lesson[] {
  return lessonsData;
}

export function getLessonsByDifficulty(difficulty: Lesson['difficulty']): Lesson[] {
  return lessonsData.filter(lesson => lesson.difficulty === difficulty);
}
