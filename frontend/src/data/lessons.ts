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

// Lesson 2 - A Girl of Sicily
export const lesson2Template: Lesson = {
  id: 2,
  title: "Ludus - Lesson 2",
  subtitle: "A Girl of Sicily",
  description: "Person, number, and voice; 1st conjugation present active indicative; the verb 'to be'",
  pageNumbers: [7, 8, 9, 10],
  
  introductoryNote: {
    content: `This lesson introduces the fundamental concepts of Latin verbs, including person, number, and voice. You will learn the first conjugation of verbs in the present active indicative, as well as the irregular but essential verb "to be" (sum, esse). The prose passage tells the story of a young girl in Sicily and her daily life.`
  },
  
  prosePassage: {
    title: "A Girl of Sicily",
    context: "The story of a young girl living in Sicily, describing her life, family, and daily activities",
    sentences: [
      { id: "2-prose-1", latin: "Parva puella est fīlia agricolae et in īnsulā habitat.", english: "A small girl is the daughter of a farmer and lives on an island.", order: 1 },
      { id: "2-prose-2", latin: "Īncola Siciliae est.", english: "She is an inhabitant of Sicily.", order: 2 },
      { id: "2-prose-3", latin: "Epistulās amat.", english: "She loves letters.", order: 3 },
      { id: "2-prose-4", latin: "Multās et longās epistulās scrībit.", english: "She writes many and long letters.", order: 4 },
      { id: "2-prose-5", latin: "Fābulās quoque scrībit.", english: "She also writes stories.", order: 5 },
      { id: "2-prose-6", latin: "Nautīs saepe spectat.", english: "She often watches sailors.", order: 6 },
      { id: "2-prose-7", latin: "Vītam nautārum videt.", english: "She sees the life of sailors.", order: 7 },
      { id: "2-prose-8", latin: "Vīta nautae est perīculōsa.", english: "The life of a sailor is dangerous.", order: 8 },
      { id: "2-prose-9", latin: "Puella longam fābulam scrībit et vītam perīculōsam nautārum laudat, sed vītam nautārum nōn amat.", english: "The girl writes a long story and praises the dangerous life of sailors, but does not love the life of sailors.", order: 9 },
      { id: "2-prose-10", latin: "Epistulās et fābulās amat.", english: "She loves letters and stories.", order: 10 },
      { id: "2-prose-11", latin: "Agricola puellam videt et exspectat.", english: "The farmer sees and waits for the girl.", order: 11 },
      { id: "2-prose-12", latin: "Puella et agricola ambulant et puella longam fābulam bene narrat.", english: "The girl and farmer walk and the girl tells a long story well.", order: 12 },
      { id: "2-prose-13", latin: "Agricola fābulam parvae puellae amat et laudat.", english: "The farmer loves and praises the story of the small girl.", order: 13 },
      { id: "2-prose-14", latin: "Puellam laudat.", english: "He praises the girl.", order: 14 },
      { id: "2-prose-15", latin: "Cūr vīta puellae est bona?", english: "Why is the girl's life good?", order: 15 },
      { id: "2-prose-16", latin: "Puella magnam pecūniam nōn habet sed multās epistulās scrībit et fābulās bene narrat.", english: "The girl does not have much money but writes many letters and tells stories well.", order: 16 }
    ],
    fullTranslation: "A small girl is the daughter of a farmer and lives on an island. She is an inhabitant of Sicily. She loves letters. She writes many and long letters. She also writes stories. She often watches sailors. She sees the life of sailors. The life of a sailor is dangerous. The girl writes a long story and praises the dangerous life of sailors, but does not love the life of sailors. She loves letters and stories. The farmer sees and waits for the girl. The girl and farmer walk and the girl tells a long story well. The farmer loves and praises the story of the small girl. He praises the girl. Why is the girl's life good? The girl does not have much money but writes many letters and tells stories well."
  },
  
  vocabulary: [
    {
      id: "2-vocab-1",
      latin: "ambulō, ambulāre",
      english: "walk",
      partOfSpeech: "verb",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-2", 
      latin: "amō, amāre",
      english: "love, like",
      partOfSpeech: "verb",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-3",
      latin: "expectō, expectāre",
      english: "wait for, await",
      partOfSpeech: "verb", 
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-4",
      latin: "habitō, habitāre", 
      english: "dwell, live (in)",
      partOfSpeech: "verb",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-5",
      latin: "laudō, laudāre",
      english: "praise",
      partOfSpeech: "verb",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-6",
      latin: "narrō, narrāre",
      english: "tell, narrate",
      partOfSpeech: "verb",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-7",
      latin: "portō, portāre",
      english: "carry, bring",
      partOfSpeech: "verb",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-8",
      latin: "scrībō",
      english: "he, she, it writes",
      partOfSpeech: "verb",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-9",
      latin: "spectō, spectāre",
      english: "look at, watch",
      partOfSpeech: "verb",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-10",
      latin: "sum, esse",
      english: "be",
      partOfSpeech: "verb",
      lesson: 2,
      difficulty: "medium"
    },
    {
      id: "2-vocab-11",
      latin: "epistula, -ae",
      english: "letter",
      partOfSpeech: "noun",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-12",
      latin: "fābula, -ae",
      english: "story",
      partOfSpeech: "noun",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-13",
      latin: "fīlia, -ae",
      english: "daughter",
      partOfSpeech: "noun",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-14",
      latin: "nauta, -ae",
      english: "sailor",
      partOfSpeech: "noun",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-15",
      latin: "pecūnia, -ae",
      english: "money",
      partOfSpeech: "noun",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-16",
      latin: "longa (adj.)",
      english: "long",
      partOfSpeech: "adjective",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-17",
      latin: "multa (adj.)",
      english: "much",
      partOfSpeech: "adjective",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-18",
      latin: "bene (adv.)",
      english: "well",
      partOfSpeech: "adverb",
      lesson: 2,
      difficulty: "easy"
    },
    {
      id: "2-vocab-19",
      latin: "cūr (adv.)",
      english: "why?",
      partOfSpeech: "adverb",
      lesson: 2,
      difficulty: "easy"
    }
  ],
  
  keyConcepts: [
    {
      id: "2-concept-1",
      title: "Verbs - Person, Number, and Voice",
      explanation: "Latin verbs change their endings to agree with the person and number of the subject. The three persons are 1st (I, we), 2nd (you), and 3rd (he, she, it, they). Each person can be singular (only one person or thing) or plural (two or more). Voice refers to whether a verb shows an action or activity being done by the subject (active voice) or being done to the subject (passive voice).",
      examples: [
        { latin: "ambulat", english: "he/she walks", notes: "3rd person singular active" },
        { latin: "ambulant", english: "they walk", notes: "3rd person plural active" }
      ],
      rules: [
        "Latin verbs change endings to show person and number",
        "Active voice shows the subject doing the action",
        "Passive voice shows action being done to the subject"
      ]
    },
    {
      id: "2-concept-2", 
      title: "First Conjugation - Present Active Indicative",
      explanation: "The first group of Latin verbs follows the amō pattern. All other verbs of the first conjugation follow their present active in this way. For first conjugation verbs, these endings are added to the present stem, which always ends in -a.",
      examples: [
        { latin: "amō", english: "I love, am loving, do love", notes: "1st person singular" },
        { latin: "amās", english: "you love, are loving, do love", notes: "2nd person singular" },
        { latin: "amat", english: "he, she, it loves, is loving, does love", notes: "3rd person singular" }
      ],
      rules: [
        "First conjugation verbs have present stems ending in -a",
        "Personal endings are added to the stem: -ō, -s, -t, -mus, -tis, -nt",
        "The present tense can be translated three ways in English"
      ],
      charts: [
        {
          title: "Present Active - First Conjugation (amō, love)",
          headers: ["Person", "Singular", "Plural"],
          rows: [
            ["1st", "amō, I love, am loving, do love", "amāmus, we love, are loving, do love"],
            ["2nd", "amās, you love, are loving, do love", "amātis, you love, are loving, do love"],
            ["3rd", "amat, he, she, it loves, is loving, does love", "amant, they love, are loving, do love"]
          ]
        },
        {
          title: "Personal Endings for Present Active",
          headers: ["Person", "Singular", "Plural"],
          rows: [
            ["1st", "-ō", "-mus"],
            ["2nd", "-s", "-tis"], 
            ["3rd", "-t", "-nt"]
          ]
        }
      ]
    },
    {
      id: "2-concept-3",
      title: "The Verb 'to be' (sum, esse)",
      explanation: "The verb 'to be' in Latin, as in English, is irregular, so its forms must be learned as a special set. The present infinitive is esse, meaning 'to be'.",
      examples: [
        { latin: "sum", english: "I am", notes: "1st person singular" },
        { latin: "es", english: "you are", notes: "2nd person singular" },
        { latin: "est", english: "he, she, it is", notes: "3rd person singular" }
      ],
      rules: [
        "Sum is irregular and must be memorized",
        "Forms do not follow the regular conjugation patterns",
        "Essential for forming many Latin constructions"
      ],
      charts: [
        {
          title: "Present Active of sum, be",
          headers: ["Person", "Singular", "Plural"],
          rows: [
            ["1st", "sum, I am", "sumus, we are"],
            ["2nd", "es, you are", "estis, you are"],
            ["3rd", "est, he, she, it is", "sunt, they are"]
          ]
        }
      ]
    },
    {
      id: "2-concept-4",
      title: "Indicative and Infinitive Moods",
      explanation: "Verbs like amō, habitō, laudō, etc. are said to be in the indicative mood, which is used to state what the speaker or writer regards as fact. There are also finite forms because they have definite person and number. The infinitive is made with the preposition to: to walk, to join, to see. In Latin, the present active infinitive of first conjugation verbs like amō adds the ending -re to the present stem.",
      examples: [
        { latin: "amāre", english: "to love", notes: "present active infinitive" },
        { latin: "ambulāre", english: "to walk", notes: "present active infinitive" },
        { latin: "laudāre", english: "to praise", notes: "present active infinitive" }
      ],
      rules: [
        "Indicative mood states facts",
        "Infinitive forms use 'to' in English",
        "First conjugation infinitives add -re to the stem"
      ]
    },
    {
      id: "2-concept-5",
      title: "Principal Parts",
      explanation: "The present infinitive is given along with the first person singular present active indicative in the vocabulary listing of any verb, e.g., laudō, laudāre, and it is always important to learn these two forms along with the meaning. These forms provide crucial information about the verb and its forms. Most verbs have a total of four principal parts.",
      examples: [
        { latin: "laudō, laudāre", english: "I praise, to praise", notes: "1st and 2nd principal parts" },
        { latin: "amō, amāre", english: "I love, to love", notes: "1st and 2nd principal parts" },
        { latin: "esse", english: "to be", notes: "irregular infinitive of sum" }
      ],
      rules: [
        "Learn both the 1st person singular and infinitive forms",
        "These provide the foundation for all other verb forms",
        "Principal parts are essential for vocabulary memorization"
      ]
    }
  ],
  
  practiceExercises: [
    {
      id: "2-exercise-1",
      type: "latin-to-english",
      title: "2A - Latin to English Translation",
      sentences: [
        {
          id: "2a-1",
          source: "Puella sum. Nautae sunt.",
          target: "I am a girl. They are sailors.",
          hints: ["sum = I am", "sunt = they are"]
        },
        {
          id: "2a-2",
          source: "Cūr pecūniam nautae spectās?",
          target: "Why are you looking at the sailor's money?",
          hints: ["cūr = why", "spectās = you are looking at"]
        },
        {
          id: "2a-3", 
          source: "Terram bonam amās quod es agricola.",
          target: "You love good land because you are a farmer.",
          hints: ["amās = you love", "es = you are"]
        },
        {
          id: "2a-4",
          source: "Multās terrās spectant sed parvam īnsulam agricolae nōn amant.",
          target: "They look at many lands but the farmers do not love the small island.",
          hints: ["spectant = they look at", "amant = they love"]
        },
        {
          id: "2a-5",
          source: "Fīliae nautārum sumus.",
          target: "We are daughters of sailors.",
          hints: ["sumus = we are", "fīliae = daughters"]
        },
        {
          id: "2a-6",
          source: "Ambulātis et longam fābulam bene narrātis.",
          target: "You walk and tell a long story well.",
          hints: ["ambulātis = you walk", "narrātis = you tell"]
        },
        {
          id: "2a-7",
          source: "Nauta pecūniam nōn habet, sed vīta nautae est bona.",
          target: "The sailor does not have money, but the sailor's life is good.",
          hints: ["habet = he has", "est = is"]
        },
        {
          id: "2a-8",
          source: "Cūr epistulās fīliae portātis?",
          target: "Why are you carrying the daughter's letters?",
          hints: ["portātis = you are carrying", "epistulās = letters"]
        },
        {
          id: "2a-9",
          source: "Saepe ambulant et multās silvās vident.",
          target: "They often walk and see many forests.",
          hints: ["ambulant = they walk", "vident = they see"]
        },
        {
          id: "2a-10",
          source: "Vītam puellae bonae laudāmus.",
          target: "We praise the life of the good girl.",
          hints: ["laudāmus = we praise", "bonae = good (feminine)"]
        }
      ]
    },
    {
      id: "2-exercise-2",
      type: "english-to-latin",
      title: "2B - English to Latin Translation",
      sentences: [
        {
          id: "2b-1",
          source: "She often carries the inhabitants' letters.",
          target: "Saepe epistulās incolarum portat.",
          hints: ["portat = she carries", "incolarum = of the inhabitants"]
        },
        {
          id: "2b-2",
          source: "You are the daughter of the sailor.",
          target: "Fīlia nautae es.",
          hints: ["es = you are", "fīlia = daughter"]
        },
        {
          id: "2b-3",
          source: "He does not see (his) daughters.",
          target: "Fīliās nōn videt.",
          hints: ["videt = he sees", "fīliās = daughters (accusative)"]
        },
        {
          id: "2b-4",
          source: "The life of the sailor is also good.",
          target: "Vīta nautae quoque bona est.",
          hints: ["quoque = also", "bona = good"]
        },
        {
          id: "2b-5",
          source: "Why are we waiting for the farmers?",
          target: "Cūr agricolās exspectāmus?",
          hints: ["exspectāmus = we wait for", "agricolās = farmers (accusative)"]
        },
        {
          id: "2b-6",
          source: "I walk well, they see well, but he does not write well.",
          target: "Bene ambulō, bene vident, sed nōn bene scrībit.",
          hints: ["ambulō = I walk", "vident = they see", "scrībit = he writes"]
        },
        {
          id: "2b-7",
          source: "You are many but not large.",
          target: "Multae estis sed nōn magnae.",
          hints: ["estis = you are (plural)", "multae = many (feminine)"]
        },
        {
          id: "2b-8",
          source: "Why are they looking at the money?",
          target: "Cūr pecūniam spectant?",
          hints: ["spectant = they are looking at", "pecūniam = money (accusative)"]
        },
        {
          id: "2b-9",
          source: "There is a long (and) large island.",
          target: "Longa magnaque īnsula est.",
          hints: ["est = there is", "-que = and"]
        },
        {
          id: "2b-10",
          source: "They are telling the story well.",
          target: "Fābulam bene narrant.",
          hints: ["narrant = they are telling", "fābulam = story (accusative)"]
        }
      ]
    }
  ],
  
  objectives: [
    "Understand the concepts of person, number, and voice in Latin verbs",
    "Learn the present active indicative forms of first conjugation verbs",
    "Master the irregular present forms of sum (to be)",
    "Distinguish between indicative and infinitive moods", 
    "Memorize essential vocabulary for daily life and activities",
    "Practice translation skills with increasingly complex sentences"
  ],
  
  culturalNotes: [
    "Roman girls from farming families often learned to read and write, which was relatively uncommon in the ancient world",
    "Letter writing was an important form of communication in the Roman world, as travel was difficult and dangerous",
    "Sicily was known as the 'granary of Rome' due to its fertile agricultural land"
  ],
  
  difficulty: "beginner",
  prerequisiteSkills: [
    "Basic first declension noun endings",
    "Present tense verb forms",
    "Basic sentence structure",
    "Nominative and accusative cases"
  ],
  
  estimatedTime: 40,
  
  sections: [
    {
      id: "intro",
      title: "Introduction",
      content: "Learn about the dative case, indirect objects, and Latin word order through stories of women and sailors.",
      type: "intro",
      order: 1
    },
    {
      id: "prose",
      title: "Fēmina et Nauta",
      content: "The woman and the sailor - a story about relationships and the dative case",
      type: "prose", 
      order: 2
    },
    {
      id: "vocabulary-section",
      title: "New Vocabulary",
      content: "Key verbs, nouns, and adjectives for Lesson 3",
      type: "vocabulary",
      order: 3
    },
    {
      id: "grammar-section", 
      title: "Grammar: Dative Case",
      content: "Understanding the dative case and its uses",
      type: "grammar",
      order: 4
    },
    {
      id: "exercises-section",
      title: "Practice Exercises", 
      content: "Translation practice with dative constructions",
      type: "exercises",
      order: 5
    }
  ]
};

// Lesson 3 - The Girl's Story
const lesson3Template: Lesson = {
  id: 3,
  title: "The Girl's Story",
  subtitle: "Dative Case and Indirect Objects",
  description: "Learn about the dative case, indirect objects, and Latin word order through stories of women and sailors.",
  pageNumbers: [11, 12, 13],
  
  introductoryNote: {
    content: `In this lesson, we will learn about the dative case, which is used for indirect objects and with certain special adjectives. We will also explore Latin word order principles and expand our vocabulary with new verbs and adjectives. The stories feature women and sailors, introducing themes of work, beauty, and relationships in ancient contexts.`
  },
  
  prosePassage: {
    title: "Fēmina et Nauta (The Woman and the Sailor)",
    context: "A story about a woman who owns good lands and forests, and her relationship with farmers and a sailor",
    sentences: [
      { id: "3-prose-1", latin: "Fēmina terrās bonās et magnam silvam habet.", english: "The woman has good lands and a large forest.", order: 1 },
      { id: "3-prose-2", latin: "Agricolae terram bonam amant.", english: "The farmers love the good land.", order: 2 },
      { id: "3-prose-3", latin: "Terrae fēminae agricolīs grātae sunt quod bonae sunt.", english: "The woman's lands are pleasing to the farmers because they are good.", order: 3 },
      { id: "3-prose-4", latin: "Fēmina est bona, sed agricolae fēminam nōn amant.", english: "The woman is good, but the farmers do not love the woman.", order: 4 },
      { id: "3-prose-5", latin: "Terrās fēminae amant sed nōn occupant.", english: "They love the woman's lands but do not occupy them.", order: 5 },
      { id: "3-prose-6", latin: "Fēmina nautam videt et amat.", english: "The woman sees a sailor and loves him.", order: 6 },
      { id: "3-prose-7", latin: "Nauta fēminam pulchram videt; fēmina nautae quoque grāta est.", english: "The sailor sees the beautiful woman; the woman is also pleasing to the sailor.", order: 7 },
      { id: "3-prose-8", latin: "Fēmina nautam vocat.", english: "The woman calls the sailor.", order: 8 },
      { id: "3-prose-9", latin: "Nauta et fēmina ambulant.", english: "The sailor and woman walk.", order: 9 },
      { id: "3-prose-10", latin: "Fēmina nautae multās epistulās dat quod nautam amat.", english: "The woman gives many letters to the sailor because she loves the sailor.", order: 10 },
      { id: "3-prose-11", latin: "Nauta quoque fēminae epistulās dat.", english: "The sailor also gives letters to the woman.", order: 11 },
      { id: "3-prose-12", latin: "Hodiē nauta labōrat.", english: "Today the sailor works.", order: 12 },
      { id: "3-prose-13", latin: "Fēmina quoque labōrat et nautam exspectat.", english: "The woman also works and waits for the sailor.", order: 13 },
      { id: "3-prose-14", latin: "Fēmina nautae quoque terram et pecūniam dat, sed nauta fēminam, nōn pecūniam, amat.", english: "The woman also gives land and money to the sailor, but the sailor loves the woman, not the money.", order: 14 },
      { id: "3-prose-15", latin: "\"Vīta perīculōsa est,\" inquit, \"sed mihi grāta est quod fēminam bonam amō.\"", english: "\"Life is dangerous,\" he says, \"but it is pleasing to me because I love a good woman.\"", order: 15 }
    ],
    fullTranslation: "The woman has good lands and a large forest. The farmers love the good land. The woman's lands are pleasing to the farmers because they are good. The woman is good, but the farmers do not love the woman. They love the woman's lands but do not occupy them. The woman sees a sailor and loves him. The sailor sees the beautiful woman; the woman is also pleasing to the sailor. The woman calls the sailor. The sailor and woman walk. The woman gives many letters to the sailor because she loves the sailor. The sailor also gives letters to the woman. Today the sailor works. The woman also works and waits for the sailor. The woman also gives land and money to the sailor, but the sailor loves the woman, not the money. \"Life is dangerous,\" he says, \"but it is pleasing to me because I love a good woman.\""
  },
  
  vocabulary: [
    { id: "clamo-3", latin: "clāmō", principalParts: "clāmō, clāmāre", english: "shout", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "do-3", latin: "dō", principalParts: "dō, dare", english: "give", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "laboro-3", latin: "labōrō", principalParts: "labōrō, labōrāre", english: "work, toil", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "monstro-3", latin: "mōnstrō", principalParts: "mōnstrō, mōnstrāre", english: "show, display", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "neco-3", latin: "necō", principalParts: "necō, necāre", english: "kill", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "occupo-3", latin: "occupō", principalParts: "occupō, occupāre", english: "seize, capture", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "pugno-3", latin: "pugnō", principalParts: "pugnō, pugnāre", english: "fight", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "servo-3", latin: "servō", principalParts: "servō, servāre", english: "save, preserve", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "supero-3", latin: "superō", principalParts: "superō, superāre", english: "defeat, conquer, overcome, surpass, win", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "voco-3", latin: "vocō", principalParts: "vocō, vocāre", english: "call, summon", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "femina-3", latin: "fēmina", principalParts: "fēmina, fēminae, f.", english: "woman", partOfSpeech: "noun", lesson: 3, difficulty: "easy" },
    { id: "mihi-3", latin: "mihi", english: "to me, for me", partOfSpeech: "pronoun", lesson: 3, difficulty: "easy", notes: "Dative case" },
    { id: "grata-3", latin: "grāta", english: "pleasing (to)", partOfSpeech: "adjective", lesson: 3, difficulty: "medium", notes: "Takes dative case" },
    { id: "propinqua-3", latin: "propinqua", english: "near (to), nearby", partOfSpeech: "adjective", lesson: 3, difficulty: "medium", notes: "Takes dative case" },
    { id: "pulchra-3", latin: "pulchra", english: "beautiful, handsome", partOfSpeech: "adjective", lesson: 3, difficulty: "easy" },
    { id: "hodie-3", latin: "hodiē", english: "today", partOfSpeech: "adverb", lesson: 3, difficulty: "easy" },
    { id: "ibi-3", latin: "ibī", english: "there, in that place", partOfSpeech: "adverb", lesson: 3, difficulty: "easy" },
    { id: "nunc-3", latin: "nunc", english: "now", partOfSpeech: "adverb", lesson: 3, difficulty: "easy" }
  ],
  
  keyConcepts: [
    {
      id: "dative-case",
      title: "Dative Case",
      explanation: "The dative case is used for indirect objects and with certain special adjectives. For first declension nouns, the dative endings are -ae (singular) and -īs (plural).",
      examples: [
        { latin: "Nautae pecūniam damus.", english: "We give money to the sailor.", notes: "Nautae is dative indirect object" },
        { latin: "Puellae fābulās narrātis.", english: "You tell stories to the girl.", notes: "Puellae is dative indirect object" },
        { latin: "Fēminīs terram damus.", english: "We give the women land.", notes: "Fēminīs is dative plural" }
      ],
      rules: [
        "The dative case is used for indirect objects of verbs of giving, showing, and telling",
        "First declension dative singular ending: -ae",
        "First declension dative plural ending: -īs",
        "Dative indirect objects usually precede direct objects in Latin word order"
      ]
    },
    {
      id: "dative-special-adjectives",
      title: "Dative with Special Adjectives",
      explanation: "Certain adjectives meaning 'dear, near, pleasing' can take the dative case.",
      examples: [
        { latin: "Vīta est nautīs grāta.", english: "Life is pleasing to sailors.", notes: "grāta takes dative nautīs" },
        { latin: "Puella est silvae propinqua.", english: "The girl is near the forest.", notes: "propinqua takes dative silvae" }
      ],
      rules: [
        "Special adjectives can govern the dative case",
        "The adjective agrees with its subject, but governs a dependent noun in the dative",
        "Dative nouns with special adjectives usually precede the adjective"
      ]
    }
  ],
  
  practiceExercises: [
    {
      id: "latin-to-english-3",
      type: "latin-to-english",
      title: "3A - Latin to English Translation",
      sentences: [
        { id: "3a-1", source: "Hodiē agricolae pecūniam nōn dās.", target: "Today you do not give money to the farmer.", hints: ["hodiē = today", "dās = you give"] },
        { id: "3a-2", source: "Ibī pugnant et nautam servant.", target: "There they fight and save the sailor.", hints: ["ibī = there", "servant = they save"] },
        { id: "3a-3", source: "Fēminās amō quod mihi pecūniam saepe dant.", target: "I love the women because they often give money to me.", hints: ["mihi = to me", "saepe = often"] },
        { id: "3a-4", source: "Cūr agricolīs epistulam fēminae mōnstrās?", target: "Why do you show the woman's letter to the farmers?", hints: ["Cūr = why", "mōnstrās = you show"] },
        { id: "3a-5", source: "Īnsulae sunt terrae propinquae.", target: "The islands are near the lands.", hints: ["propinquae = near"] }
      ]
    },
    {
      id: "english-to-latin-3",
      type: "english-to-latin", 
      title: "3B - English to Latin Translation",
      sentences: [
        { id: "3b-1", source: "Life is pleasing because they often give money to me.", target: "Vīta grāta est quod mihi pecūniam saepe dant.", hints: ["grāta = pleasing", "mihi = to me"] },
        { id: "3b-2", source: "The women are near the farmer's land.", target: "Fēminae terrae agricolae propinquae sunt.", hints: ["propinquae = near"] },
        { id: "3b-3", source: "There you are saving the land but you are not fighting.", target: "Ibī terram servās sed nōn pugnās.", hints: ["ibī = there", "servās = you save"] },
        { id: "3b-4", source: "We are seizing the large forests and the small island.", target: "Magnās silvās et parvam īnsulam occupāmus.", hints: ["occupāmus = we seize"] },
        { id: "3b-5", source: "Now they are shouting and calling the farmers.", target: "Nunc clāmant et agricolās vocant.", hints: ["nunc = now", "clāmant = they shout"] }
      ]
    }
  ],
  
  culturalNotes: [],
  
  difficulty: "beginner",
  estimatedTime: 45,
  objectives: [
    "Master the dative case endings",
    "Understand dative indirect objects", 
    "Learn dative with special adjectives",
    "Practice Latin word order rules",
    "Expand vocabulary with new verbs and adjectives"
  ],
  prerequisiteSkills: [
    "Basic first declension noun endings",
    "Present tense verb forms",
    "Basic sentence structure",
    "Nominative and accusative cases"
  ],
  
  sections: [
    {
      id: "intro",
      title: "Introduction",
      content: "Learn about the dative case, indirect objects, and Latin word order through stories of women and sailors.",
      type: "intro",
      order: 1
    },
    {
      id: "prose",
      title: "Fēmina et Nauta",
      content: "The woman and the sailor - a story about relationships and the dative case",
      type: "prose", 
      order: 2
    },
    {
      id: "vocabulary-section",
      title: "New Vocabulary",
      content: "Key verbs, nouns, and adjectives for Lesson 3",
      type: "vocabulary",
      order: 3
    },
    {
      id: "grammar-section", 
      title: "Grammar: Dative Case",
      content: "Understanding the dative case and its uses",
      type: "grammar",
      order: 4
    },
    {
      id: "exercises-section",
      title: "Practice Exercises", 
      content: "Translation practice with dative constructions",
      type: "exercises",
      order: 5
    }
  ]
};

// Updated lessons array with our template
export const lessonsData: Lesson[] = [
  lesson1Template,
  lesson2Template,
  lesson3Template
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
