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
    title: "Cerberus",
    context: "A story about the household of Caecilius in Pompeii, featuring the family dog Cerberus and his mischievous adventure in the kitchen",
    sentences: [
      { id: "1-prose-1", latin: "Caecilius est in hortō.", english: "Caecilius is in the garden.", order: 1 },
      { id: "1-prose-2", latin: "Caecilius in hortō sedet.", english: "Caecilius sits in the garden.", order: 2 },
      { id: "1-prose-3", latin: "Servus est in ātriō.", english: "The slave is in the atrium.", order: 3 },
      { id: "1-prose-4", latin: "Servus in ātriō labōrat.", english: "The slave works in the atrium.", order: 4 },
      { id: "1-prose-5", latin: "Metella est in ātriō.", english: "Metella is in the atrium.", order: 5 },
      { id: "1-prose-6", latin: "Metella in ātriō sedet.", english: "Metella sits in the atrium.", order: 6 },
      { id: "1-prose-7", latin: "Quīntus est in tablīnō.", english: "Quintus is in the study.", order: 7 },
      { id: "1-prose-8", latin: "Quīntus in tablīnō scrībit.", english: "Quintus writes in the study.", order: 8 },
      { id: "1-prose-9", latin: "Cerberus est in viā.", english: "Cerberus is in the street.", order: 9 },
      { id: "1-prose-10", latin: "Coquus est in culīnā.", english: "The cook is in the kitchen.", order: 10 },
      { id: "1-prose-11", latin: "Coquus in culīnā dormit.", english: "The cook sleeps in the kitchen.", order: 11 },
      { id: "1-prose-12", latin: "Cerberus intrat.", english: "Cerberus enters.", order: 12 },
      { id: "1-prose-13", latin: "Cerberus circumspectat.", english: "Cerberus looks around.", order: 13 },
      { id: "1-prose-14", latin: "Cibus est in mēnsā.", english: "Food is on the table.", order: 14 },
      { id: "1-prose-15", latin: "Canis salit.", english: "The dog jumps.", order: 15 },
      { id: "1-prose-16", latin: "Canis in mēnsā stat.", english: "The dog stands on the table.", order: 16 },
      { id: "1-prose-17", latin: "Grumio stertit.", english: "Grumio snores.", order: 17 },
      { id: "1-prose-18", latin: "Canis lātrat.", english: "The dog barks.", order: 18 },
      { id: "1-prose-19", latin: "Grumio surgit.", english: "Grumio gets up.", order: 19 },
      { id: "1-prose-20", latin: "Coquus est īrātus.", english: "The cook is angry.", order: 20 },
      { id: "1-prose-21", latin: "\"Pestis! Furcifer!\" coquus clāmat.", english: "\"Pest! Scoundrel!\" the cook shouts.", order: 21 },
      { id: "1-prose-22", latin: "Cerberus exit.", english: "Cerberus leaves.", order: 22 }
    ],
    fullTranslation: "Caecilius is in the garden. Caecilius sits in the garden. The slave is in the atrium. The slave works in the atrium. Metella is in the atrium. Metella sits in the atrium. Quintus is in the study. Quintus writes in the study. Cerberus is in the street. The cook is in the kitchen. The cook sleeps in the kitchen. Cerberus enters. Cerberus looks around. Food is on the table. The dog jumps. The dog stands on the table. Grumio snores. The dog barks. Grumio gets up. The cook is angry. \"Pest! Scoundrel!\" the cook shouts. Cerberus leaves."
  },
  
  vocabulary: [
    
    // Additional vocabulary for Cerberus passage
    {
      id: "1-vocab-1",
      latin: "Caecilius",
      principalParts: "Caecilius, -ī",
      english: "Caecilius (Roman name)",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy",
      notes: "A typical Roman praenomen (first name)"
    },
    {
      id: "1-vocab-2",
      latin: "hortus",
      principalParts: "hortus, -ī",
      english: "garden",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-3",
      latin: "sedet",
      principalParts: "sedeō, sedēre, sēdī, sessus",
      english: "he, she, it sits",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-4",
      latin: "servus",
      principalParts: "servus, -ī",
      english: "slave, servant",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-5",
      latin: "ātrium",
      principalParts: "ātrium, -ī",
      english: "atrium, main hall",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-6",
      latin: "labōrat",
      principalParts: "labōrō, labōrāre, labōrāvī, labōrātus",
      english: "he, she, it works",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-7",
      latin: "Metella",
      principalParts: "Metella, -ae",
      english: "Metella (Roman name)",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy",
      notes: "A typical Roman woman's name"
    },
    {
      id: "1-vocab-8",
      latin: "Quīntus",
      principalParts: "Quīntus, -ī",
      english: "Quintus (Roman name)",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy",
      notes: "A typical Roman praenomen meaning 'fifth'"
    },
    {
      id: "1-vocab-9",
      latin: "tablīnum",
      principalParts: "tablīnum, -ī",
      english: "study, office",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-10",
      latin: "scrībit",
      principalParts: "scrībō, scrībere, scrīpsī, scrīptus",
      english: "he, she, it writes",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-11",
      latin: "Cerberus",
      principalParts: "Cerberus, -ī",
      english: "Cerberus (dog's name)",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy",
      notes: "Named after the three-headed dog that guards the underworld"
    },
    {
      id: "1-vocab-12",
      latin: "via",
      principalParts: "via, -ae",
      english: "street, road, way",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-13",
      latin: "coquus",
      principalParts: "coquus, -ī",
      english: "cook, chef",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-14",
      latin: "culīna",
      principalParts: "culīna, -ae",
      english: "kitchen",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-15",
      latin: "dormit",
      principalParts: "dormiō, dormīre, dormīvī, dormītus",
      english: "he, she, it sleeps",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-16",
      latin: "intrat",
      principalParts: "intrō, intrāre, intrāvī, intrātus",
      english: "he, she, it enters",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-17",
      latin: "circumspectat",
      principalParts: "circumspectō, circumspectāre",
      english: "he, she, it looks around",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "medium"
    },
    {
      id: "1-vocab-18",
      latin: "cibus",
      principalParts: "cibus, -ī",
      english: "food",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-19",
      latin: "mēnsa",
      principalParts: "mēnsa, -ae",
      english: "table",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-20",
      latin: "canis",
      principalParts: "canis, canis",
      english: "dog",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-21",
      latin: "salit",
      principalParts: "saliō, salīre, saluī, saltus",
      english: "he, she, it jumps",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-22",
      latin: "stat",
      principalParts: "stō, stāre, stetī, status",
      english: "he, she, it stands",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-23",
      latin: "Grumio",
      principalParts: "Grumio, Grumiōnis",
      english: "Grumio (slave's name)",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "easy",
      notes: "The cook in Caecilius's household"
    },
    {
      id: "1-vocab-24",
      latin: "stertit",
      principalParts: "stertō, stertere",
      english: "he, she, it snores",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-25",
      latin: "lātrat",
      principalParts: "lātrō, lātrāre, lātrāvī, lātrātus",
      english: "he, she, it barks",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-26",
      latin: "surgit",
      principalParts: "surgō, surgere, surrēxī, surrēctus",
      english: "he, she, it gets up, rises",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-27",
      latin: "īrātus",
      principalParts: "īrātus, -a, -um",
      english: "angry",
      partOfSpeech: "adjective",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-28",
      latin: "pestis",
      principalParts: "pestis, pestis",
      english: "pest, plague",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "medium",
      notes: "Used as an insult meaning 'pest' or 'nuisance'"
    },
    {
      id: "1-vocab-29",
      latin: "furcifer",
      principalParts: "furcifer, furciferis",
      english: "scoundrel, rascal",
      partOfSpeech: "noun",
      lesson: 1,
      difficulty: "medium",
      notes: "A strong insult in Latin, literally meaning 'fork-bearer'"
    },
    {
      id: "1-vocab-30",
      latin: "clāmat",
      principalParts: "clāmō, clāmāre, clāmāvī, clāmātus",
      english: "he, she, it shouts, calls out",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
    },
    {
      id: "1-vocab-31",
      latin: "exit",
      principalParts: "exeō, exīre, exiī, exitus",
      english: "he, she, it goes out, leaves",
      partOfSpeech: "verb",
      lesson: 1,
      difficulty: "easy"
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

// Lesson 2 - Stage 2: mercator
export const lesson2Template: Lesson = {
  id: 2,
  title: "Stage 2 - mercator",
  subtitle: "The Merchant",
  description: "Nominative and accusative cases; nouns and their forms; Latin word order",
  pageNumbers: [1, 2, 3, 4],
  
  introductoryNote: {
    content: `In this lesson, you will learn about the different forms of Latin nouns called cases. You'll discover how the nominative case is used for subjects and the accusative case for direct objects. The story follows a merchant who visits Caecilius, leading to a dinner scene in the triclinium with various characters.`
  },
  
  prosePassage: {
    title: "mercator and in triclinio",
    context: "A merchant visits Caecilius the banker. In the first story 'mercator', we see the merchant's arrival and Caecilius's business. In 'in triclinio', we witness a dinner scene where Grumio the cook serves peacock and an ancilla entertains the guests.",
    sentences: [
      { id: "2-prose-1", latin: "amicus Caecilium visitat.", order: 1 },
      { id: "2-prose-2", latin: "amicus est mercator.", order: 2 },
      { id: "2-prose-3", latin: "mercator villam intrat.", order: 3 },
      { id: "2-prose-4", latin: "Clemens est in atrio.", order: 4 },
      { id: "2-prose-5", latin: "Clemens mercatorem salutat.", order: 5 },
      { id: "2-prose-6", latin: "Caecilius est in tablino.", order: 6 },
      { id: "2-prose-7", latin: "Caecilius pecuniam numerat.", order: 7 },
      { id: "2-prose-8", latin: "Caecilius est argentarius.", order: 8 },
      { id: "2-prose-9", latin: "amicus tablinum intrat.", order: 9 },
      { id: "2-prose-10", latin: "Caecilius surgit.", order: 10 },
      { id: "2-prose-11", latin: "\"salve!\" Caecilius mercatorem salutat.", order: 11 },
      { id: "2-prose-12", latin: "\"salve!\" mercator respondet.", order: 12 },
      { id: "2-prose-13", latin: "Caecilius triclinium intrat.", order: 13 },
      { id: "2-prose-14", latin: "amicus quoque intrat.", order: 14 },
      { id: "2-prose-15", latin: "amicus in lecto recumbit.", order: 15 },
      { id: "2-prose-16", latin: "argentarius in lecto recumbit.", order: 16 },
      { id: "2-prose-17", latin: "Grumio in culina cantat.", order: 17 },
      { id: "2-prose-18", latin: "Grumio pavonem coquit.", order: 18 },
      { id: "2-prose-19", latin: "coquus est laetus.", order: 19 },
      { id: "2-prose-20", latin: "Caecilius coquum audit.", order: 20 },
      { id: "2-prose-21", latin: "Caecilius non est laetus.", order: 21 },
      { id: "2-prose-22", latin: "Caecilius cenam exspectat.", order: 22 },
      { id: "2-prose-23", latin: "amicus cenam exspectat.", order: 23 },
      { id: "2-prose-24", latin: "Caecilius Grumionem vituperat.", order: 24 },
      { id: "2-prose-25", latin: "Grumio triclinium intrat.", order: 25 },
      { id: "2-prose-26", latin: "Grumio pavonem portat.", order: 26 },
      { id: "2-prose-27", latin: "Clemens triclinium intrat.", order: 27 },
      { id: "2-prose-28", latin: "Clemens vinum portat.", order: 28 },
      { id: "2-prose-29", latin: "Caecilius pavonem gustat.", order: 29 },
      { id: "2-prose-30", latin: "\"pavo est optimus!\" Caecilius clamat.", order: 30 },
      { id: "2-prose-31", latin: "mercator quoque pavonem gustat.", order: 31 },
      { id: "2-prose-32", latin: "mercator cenam laudat.", order: 32 },
      { id: "2-prose-33", latin: "dominus coquum laudat.", order: 33 },
      { id: "2-prose-34", latin: "Grumio exit.", order: 34 },
      { id: "2-prose-35", latin: "ancilla intrat.", order: 35 },
      { id: "2-prose-36", latin: "ancilla suaviter cantat.", order: 36 },
      { id: "2-prose-37", latin: "ancilla dominum delectat.", order: 37 },
      { id: "2-prose-38", latin: "ancilla mercatorem delectat.", order: 38 },
      { id: "2-prose-39", latin: "mox dominus dormit.", order: 39 },
      { id: "2-prose-40", latin: "amicus quoque dormit.", order: 40 },
      { id: "2-prose-41", latin: "Grumio triclinium intrat et circumspectat.", order: 41 },
      { id: "2-prose-42", latin: "coquus cibum in mensa videt.", order: 42 },
      { id: "2-prose-43", latin: "Grumio cibum consumit et vinum bibit!", order: 43 },
      { id: "2-prose-44", latin: "Caecilius Grumionem non videt.", order: 44 },
      { id: "2-prose-45", latin: "coquus in triclinio magnifice cenat.", order: 45 },
      { id: "2-prose-46", latin: "coquus ancillam spectat.", order: 46 },
      { id: "2-prose-47", latin: "ancilla Grumionem delectat.", order: 47 },
      { id: "2-prose-48", latin: "Grumio ancillam delectat.", order: 48 },
      { id: "2-prose-49", latin: "Grumio est laetissimus.", order: 49 }
    ]
  },
  
  vocabulary: [
    { id: "2-vocab-1", latin: "mercator", english: "merchant", partOfSpeech: "noun", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-2", latin: "amicus", english: "friend", partOfSpeech: "noun", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-3", latin: "visitat", english: "is visiting", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-4", latin: "villam", english: "house", partOfSpeech: "noun", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-5", latin: "salutat", english: "greets", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-6", latin: "pecuniam", english: "money", partOfSpeech: "noun", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-7", latin: "numerat", english: "is counting", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-8", latin: "argentarius", english: "banker", partOfSpeech: "noun", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-9", latin: "salve", english: "hello", partOfSpeech: "interjection", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-10", latin: "respondet", english: "replies", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-11", latin: "quoque", english: "also, too", partOfSpeech: "adverb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-12", latin: "in lecto", english: "on a couch", partOfSpeech: "phrase", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-13", latin: "recumbit", english: "reclines", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-14", latin: "cantat", english: "is singing", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-15", latin: "pavonem", english: "peacock", partOfSpeech: "noun", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-16", latin: "coquit", english: "is cooking", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-17", latin: "laetus", english: "happy", partOfSpeech: "adjective", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-18", latin: "audit", english: "hears, listens to", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-19", latin: "non est", english: "is not", partOfSpeech: "phrase", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-20", latin: "cenam", english: "dinner", partOfSpeech: "noun", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-21", latin: "exspectat", english: "is waiting for", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-22", latin: "vituperat", english: "tells off, curses", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-23", latin: "in triclinio", english: "in the dining room", partOfSpeech: "phrase", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-24", latin: "portat", english: "is carrying", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-25", latin: "vinum", english: "wine", partOfSpeech: "noun", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-26", latin: "gustat", english: "tastes", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-27", latin: "optimus", english: "very good, excellent", partOfSpeech: "adjective", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-28", latin: "laudat", english: "praises", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-29", latin: "dominus", english: "master", partOfSpeech: "noun", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-30", latin: "ancilla", english: "slave-girl", partOfSpeech: "noun", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-31", latin: "suaviter", english: "sweetly", partOfSpeech: "adverb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-32", latin: "delectat", english: "pleases", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-33", latin: "mox", english: "soon", partOfSpeech: "adverb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-34", latin: "et", english: "and", partOfSpeech: "conjunction", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-35", latin: "videt", english: "sees", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-36", latin: "consumit", english: "eats", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-37", latin: "magnifice", english: "magnificently, in style", partOfSpeech: "adverb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-38", latin: "cenat", english: "eats dinner, dines", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-39", latin: "spectat", english: "looks at", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-40", latin: "laetissimus", english: "very happy", partOfSpeech: "adjective", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-41", latin: "bibit", english: "drinks", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-42", latin: "surgit", english: "gets up, rises", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-43", latin: "exit", english: "goes out, leaves", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-44", latin: "clamat", english: "shouts", partOfSpeech: "verb", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-45", latin: "mensa", english: "table", partOfSpeech: "noun", lesson: 2, difficulty: "easy" },
    { id: "2-vocab-46", latin: "cibus", english: "food", partOfSpeech: "noun", lesson: 2, difficulty: "easy" }
  ],
  
  keyConcepts: [
    {
      id: "2-concept-1",
      title: "Nouns and Their Forms",
      explanation: "Words like Metella, Caecilius, and mercator are known as nouns. They often indicate people or animals (e.g. ancilla, canis), places (e.g. villa, hortus), and things (e.g. cena, cibus). You have now met two forms of the same noun: Metella – Metellam, Caecilius – Caecilium, mercator – mercatorem.",
      examples: [
        { latin: "Metella – Metellam", english: "Metella (subject) – Metella (object)", notes: "Same person, different grammatical function" },
        { latin: "Caecilius – Caecilium", english: "Caecilius (subject) – Caecilius (object)", notes: "Masculine name with different endings" },
        { latin: "mercator – mercatorem", english: "merchant (subject) – merchant (object)", notes: "Third declension noun" }
      ],
      rules: [
        "Nouns indicate people, animals, places, and things",
        "The same noun can have different forms depending on its function",
        "Learn to recognize both nominative and accusative forms"
      ]
    },
    {
      id: "2-concept-2",
      title: "Nominative and Accusative Cases",
      explanation: "The different forms are known as the nominative case and the accusative case. The nominative case is used when the noun is the subject (doing the action), and the accusative case is used when the noun is the direct object (receiving the action).",
      examples: [
        { latin: "Metella Grumionem laudat.", english: "Metella praises Grumio.", notes: "Metella (nominative) does the action; Grumionem (accusative) receives it" },
        { latin: "amicus Metellam salutat.", english: "The friend greets Metella.", notes: "amicus (nominative) does the action; Metellam (accusative) receives it" }
      ],
      rules: [
        "Nominative case: used for subjects (who/what does the action)",
        "Accusative case: used for direct objects (who/what receives the action)",
        "Different cases have different endings"
      ],
      charts: [
        {
          title: "Case Examples",
          headers: ["Function", "Nominative", "Accusative"],
          rows: [
            ["Subject/Object", "Metella", "Metellam"],
            ["Subject/Object", "Caecilius", "Caecilium"],
            ["Subject/Object", "mercator", "mercatorem"]
          ]
        }
      ]
    },
    {
      id: "2-concept-3",
      title: "Latin Word Order",
      explanation: "Notice the difference in word order between Latin and English. Latin word order is more flexible than English because the case endings show the grammatical function of words. The verb often comes at the end of the sentence in Latin.",
      examples: [
        { latin: "coquus culinam intrat.", english: "The cook enters the kitchen.", notes: "Subject - Object - Verb order" },
        { latin: "Clemens vinum portat.", english: "Clemens carries the wine.", notes: "Subject - Object - Verb order" },
        { latin: "Metella Grumionem laudat.", english: "Metella praises Grumio.", notes: "Subject - Object - Verb order" }
      ],
      rules: [
        "Latin word order is flexible due to case endings",
        "Verbs often come at the end of sentences",
        "Subject-Object-Verb is a common pattern",
        "Case endings, not word order, show grammatical function"
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
          source: "amicus Caecilium visitat.",
          target: "A friend visits Caecilius.",
          hints: ["amicus = friend", "visitat = visits"]
        },
        {
          id: "2a-2", 
          source: "mercator villam intrat.",
          target: "The merchant enters the house.",
          hints: ["mercator = merchant", "intrat = enters"]
        },
        {
          id: "2a-3",
          source: "Caecilius pecuniam numerat.",
          target: "Caecilius counts the money.",
          hints: ["pecuniam = money (accusative)", "numerat = counts"]
        },
        {
          id: "2a-4",
          source: "Clemens mercatorem salutat.",
          target: "Clemens greets the merchant.",
          hints: ["mercatorem = merchant (accusative)", "salutat = greets"]
        },
        {
          id: "2a-5",
          source: "Grumio cenam parat.",
          target: "Grumio prepares dinner.",
          hints: ["cenam = dinner (accusative)", "parat = prepares"]
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
          source: "The slave enters the kitchen.",
          target: "servus culinam intrat.",
          hints: ["servus = slave", "culinam = kitchen (accusative)"]
        },
        {
          id: "2b-2",
          source: "Metella greets the friend.",
          target: "Metella amicum salutat.",
          hints: ["amicum = friend (accusative)", "salutat = greets"]
        },
        {
          id: "2b-3", 
          source: "The merchant prepares the wine.",
          target: "mercator vinum parat.",
          hints: ["vinum = wine (accusative)", "parat = prepares"]
        },
        {
          id: "2b-4",
          source: "Caecilius praises the slave-girl.",
          target: "Caecilius ancillam laudat.",
          hints: ["ancillam = slave-girl (accusative)", "laudat = praises"]
        },
        {
          id: "2b-5",
          source: "The cook tastes the peacock.",
          target: "coquus pavonem gustat.",
          hints: ["pavonem = peacock (accusative)", "gustat = tastes"]
        }
      ]
    }
  ],
  
  objectives: [
    "Understand the difference between nominative and accusative cases",
    "Recognize subjects and direct objects in Latin sentences",
    "Learn vocabulary related to Roman household and business",
    "Practice Latin word order patterns",
    "Translate sentences using case recognition"
  ],
  
  culturalNotes: [
    "Daily Life in Pompeii: The day began early for Caecilius and the members of his household. He would usually get up at dawn. His slaves were up even earlier, sweeping, dusting, and polishing. It did not take Caecilius long to dress. The first garment that he put on was his tunica, a tunic similar to a short-sleeved shirt, then his toga, a very large piece of woolen cloth arranged in folds, and finally his shoes, which were rather like modern sandals.",
    "Roman Dining: The meal began with a first course of light dishes to whet the appetite. Eggs, fish, and cooked and raw vegetables were often served. Then came the main course in which a variety of meat dishes with different sauces and vegetables would be offered. Finally, the dessert was brought in, consisting of fruit, nuts, cheese, and sweet dishes. Roman dinners were said to run 'ab ovo usque ad mala' (from eggs to apples).",
    "The Triclinium: Three couches were arranged around a mensa or circular table which, though small, was very elegantly carved and decorated. Each couch had places for three people. The diners reclined on the couches, leaning on their left elbow and taking food from the table with their right hand. The food was cut up by a slave before being served, and diners ate it with their fingers or a spoon. Forks were not used by the Romans."
  ],
  
  difficulty: "beginner" as const,
  prerequisiteSkills: [
    "Basic noun endings",
    "Simple verb forms", 
    "Understanding of Latin sentence structure"
  ],
  
  estimatedTime: 40,
  
  sections: [
    {
      id: "intro",
      title: "Introduction",
      content: "Learn about nominative and accusative cases through the story of a merchant visiting Caecilius.",
      type: "intro",
      order: 1
    },
    {
      id: "prose",
      title: "mercator and in triclinio",
      content: "Read about a merchant's visit and a dinner in the triclinium",
      type: "prose", 
      order: 2
    },
    {
      id: "vocabulary-section",
      title: "New Vocabulary",
      content: "Key words for household activities and people",
      type: "vocabulary",
      order: 3
    },
    {
      id: "grammar-section", 
      title: "Grammar: Cases and Word Order",
      content: "Understanding nominative and accusative cases",
      type: "grammar",
      order: 4
    },
    {
      id: "exercises-section",
      title: "Practice Exercises", 
      content: "Translation practice with case recognition",
      type: "exercises",
      order: 5
    }
  ]
};

// Lesson 3 - Stage 3: in foro  
export const lesson3Template: Lesson = {
  id: 3,
  title: "Stage 3 - in foro",
  subtitle: "In the Forum",
  description: "Explore the Roman forum through stories of daily life; learn about the three declensions and practice case recognition",
  pageNumbers: [1, 2, 3, 4, 5],
  
  introductoryNote: {
    content: `In this lesson, you will explore the Roman forum through four interconnected stories featuring Caecilius and various tradespeople. You'll learn about the three main declensions (noun families) in Latin and practice distinguishing between nominative and accusative cases. The stories introduce you to the vibrant commercial and social life of ancient Pompeii.`
  },
  
  prosePassage: {
    title: "Four Stories from the Forum",
    context: "Follow Caecilius through his day in the forum of Pompeii, meeting a painter (pictor), barber (tonsor), and slave-dealer (venalicius). Each story demonstrates different aspects of Roman commercial and social life.",
    sentences: [
      // Story 1: in foro
      { id: "3-prose-1", latin: "Caecilius non est in villa.", english: "Caecilius is not in the house.", order: 1 },
      { id: "3-prose-2", latin: "Caecilius in foro negotium agit.", english: "Caecilius is doing business in the forum.", order: 2 },
      { id: "3-prose-3", latin: "Caecilius est argentarius.", english: "Caecilius is a banker.", order: 3 },
      { id: "3-prose-4", latin: "argentarius pecuniam numerat.", english: "The banker counts money.", order: 4 },
      { id: "3-prose-5", latin: "Caecilius forum circumspectat.", english: "Caecilius looks around the forum.", order: 5 },
      { id: "3-prose-6", latin: "ecce! pictor in foro ambulat.", english: "Look! A painter is walking in the forum.", order: 6 },
      { id: "3-prose-7", latin: "pictor est Celer.", english: "The painter is Celer.", order: 7 },
      { id: "3-prose-8", latin: "Celer Caecilium salutat.", english: "Celer greets Caecilius.", order: 8 },
      { id: "3-prose-9", latin: "ecce! tonsor quoque est in foro.", english: "Look! A barber is also in the forum.", order: 9 },
      { id: "3-prose-10", latin: "tonsor est Pantagathus.", english: "The barber is Pantagathus.", order: 10 },
      { id: "3-prose-11", latin: "Caecilius tonsorem videt.", english: "Caecilius sees the barber.", order: 11 },
      { id: "3-prose-12", latin: "\"salve!\" Caecilius tonsorem salutat.", english: "\"Hello!\" Caecilius greets the barber.", order: 12 },
      { id: "3-prose-13", latin: "\"salve!\" Pantagathus respondet.", english: "\"Hello!\" Pantagathus replies.", order: 13 },
      { id: "3-prose-14", latin: "ecce! venalicius forum intrat.", english: "Look! A slave-dealer enters the forum.", order: 14 },
      { id: "3-prose-15", latin: "venalicius est Syphax.", english: "The slave-dealer is Syphax.", order: 15 },
      { id: "3-prose-16", latin: "venalicius mercatorem exspectat.", english: "The slave-dealer waits for a merchant.", order: 16 },
      { id: "3-prose-17", latin: "mercator non venit.", english: "The merchant does not come.", order: 17 },
      { id: "3-prose-18", latin: "Syphax est iratus.", english: "Syphax is angry.", order: 18 },
      { id: "3-prose-19", latin: "Syphax mercatorem vituperat.", english: "Syphax criticizes the merchant.", order: 19 },
      
      // Story 2: pictor  
      { id: "3-prose-20", latin: "pictor ad villam venit.", english: "The painter comes to the house.", order: 20 },
      { id: "3-prose-21", latin: "pictor est Celer.", english: "The painter is Celer.", order: 21 },
      { id: "3-prose-22", latin: "Celer ianuam pulsat.", english: "Celer knocks on the door.", order: 22 },
      { id: "3-prose-23", latin: "Clemens pictorem non audit.", english: "Clemens does not hear the painter.", order: 23 },
      { id: "3-prose-24", latin: "servus est in horto.", english: "The slave is in the garden.", order: 24 },
      { id: "3-prose-25", latin: "Celer clamat.", english: "Celer shouts.", order: 25 },
      { id: "3-prose-26", latin: "canis Celerem audit et latrat.", english: "The dog hears Celer and barks.", order: 26 },
      { id: "3-prose-27", latin: "Quintus canem audit.", english: "Quintus hears the dog.", order: 27 },
      { id: "3-prose-28", latin: "Quintus ad ianuam venit.", english: "Quintus comes to the door.", order: 28 },
      { id: "3-prose-29", latin: "filius ianuam aperit.", english: "The son opens the door.", order: 29 },
      { id: "3-prose-30", latin: "Celer Quintum salutat et villam intrat.", english: "Celer greets Quintus and enters the house.", order: 30 },
      { id: "3-prose-31", latin: "Metella est in culina.", english: "Metella is in the kitchen.", order: 31 },
      { id: "3-prose-32", latin: "Quintus matrem vocat.", english: "Quintus calls his mother.", order: 32 },
      { id: "3-prose-33", latin: "Metella atrium intrat.", english: "Metella enters the atrium.", order: 33 },
      { id: "3-prose-34", latin: "pictor Metellam salutat.", english: "The painter greets Metella.", order: 34 },
      { id: "3-prose-35", latin: "Metella pictorem ad triclinium ducit.", english: "Metella leads the painter to the dining room.", order: 35 },
      { id: "3-prose-36", latin: "Celer in triclinio laborat.", english: "Celer works in the dining room.", order: 36 },
      { id: "3-prose-37", latin: "Celer picturam pingit.", english: "Celer paints a picture.", order: 37 },
      { id: "3-prose-38", latin: "magnus leo est in pictura.", english: "A large lion is in the picture.", order: 38 },
      { id: "3-prose-39", latin: "Hercules quoque est in pictura.", english: "Hercules is also in the picture.", order: 39 },
      { id: "3-prose-40", latin: "leo Herculem ferociter petit.", english: "The lion fiercely attacks Hercules.", order: 40 },
      { id: "3-prose-41", latin: "Hercules magnum fustem tenet et leonem verberat.", english: "Hercules holds a large club and strikes the lion.", order: 41 },
      { id: "3-prose-42", latin: "Hercules est fortis.", english: "Hercules is brave.", order: 42 },
      { id: "3-prose-43", latin: "Caecilius ad villam revenit et triclinium intrat.", english: "Caecilius returns to the house and enters the dining room.", order: 43 },
      { id: "3-prose-44", latin: "Caecilius picturam intente spectat et picturam laudat.", english: "Caecilius looks intently at the picture and praises the picture.", order: 44 }
    ],
    fullTranslation: "Caecilius is not in the house. Caecilius is doing business in the forum. Caecilius is a banker. The banker counts money. Caecilius looks around the forum. Look! A painter is walking in the forum. The painter is Celer. Celer greets Caecilius. Look! A barber is also in the forum. The barber is Pantagathus. Caecilius sees the barber. \"Hello!\" Caecilius greets the barber. \"Hello!\" Pantagathus replies. Look! A slave-dealer enters the forum. The slave-dealer is Syphax. The slave-dealer waits for a merchant. The merchant does not come. Syphax is angry. Syphax criticizes the merchant. The painter comes to the house. The painter is Celer. Celer knocks on the door. Clemens does not hear the painter. The slave is in the garden. Celer shouts. The dog hears Celer and barks. Quintus hears the dog. Quintus comes to the door. The son opens the door. Celer greets Quintus and enters the house. Metella is in the kitchen. Quintus calls his mother. Metella enters the atrium. The painter greets Metella. Metella leads the painter to the dining room. Celer works in the dining room. Celer paints a picture. A large lion is in the picture. Hercules is also in the picture. The lion fiercely attacks Hercules. Hercules holds a large club and strikes the lion. Hercules is brave. Caecilius returns to the house and enters the dining room. Caecilius looks intently at the picture and praises the picture."
  },
  
  vocabulary: [
    // From "in foro"
    { id: "3-vocab-1", latin: "fōrum", principalParts: "fōrum, -ī", english: "forum, marketplace", partOfSpeech: "noun", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-2", latin: "negōtium agit", principalParts: "negōtium agere", english: "is working, is doing business", partOfSpeech: "verb phrase", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-3", latin: "ecce", principalParts: "ecce", english: "see, look", partOfSpeech: "interjection", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-4", latin: "pictor", principalParts: "pictor, pictōris", english: "painter, artist", partOfSpeech: "noun", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-5", latin: "ambulat", principalParts: "ambulāre", english: "is walking", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-6", latin: "tonsor", principalParts: "tonsor, tonsōris", english: "barber", partOfSpeech: "noun", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-7", latin: "venālicius", principalParts: "venālicius, -ī", english: "slave-dealer", partOfSpeech: "noun", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-8", latin: "nōn venit", principalParts: "venīre", english: "does not come", partOfSpeech: "verb phrase", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-9", latin: "vituperat", principalParts: "vituperāre", english: "criticizes, blames", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    
    // From "pictor"  
    { id: "3-vocab-10", latin: "ad villam", principalParts: "ad + acc.", english: "to the house", partOfSpeech: "prepositional phrase", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-11", latin: "ianuam", principalParts: "ianua, -ae", english: "door", partOfSpeech: "noun", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-12", latin: "pulsat", principalParts: "pulsāre", english: "knocks on/at", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-13", latin: "aperit", principalParts: "aperīre", english: "opens", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-14", latin: "vocat", principalParts: "vocāre", english: "calls", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-15", latin: "dūcit", principalParts: "dūcere", english: "leads", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-16", latin: "pictūram", principalParts: "pictūra, -ae", english: "picture", partOfSpeech: "noun", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-17", latin: "pingit", principalParts: "pingere", english: "paints", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-18", latin: "magnus", principalParts: "magnus, -a, -um", english: "big, large", partOfSpeech: "adjective", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-19", latin: "leō", principalParts: "leō, leōnis", english: "lion", partOfSpeech: "noun", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-20", latin: "ferōciter", principalParts: "ferōciter", english: "fiercely", partOfSpeech: "adverb", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-21", latin: "petit", principalParts: "petere", english: "heads for, attacks", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-22", latin: "fustem", principalParts: "fustis, -is", english: "club", partOfSpeech: "noun", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-23", latin: "tenet", principalParts: "tenēre", english: "is holding", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-24", latin: "verberat", principalParts: "verberāre", english: "is striking", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-25", latin: "fortis", principalParts: "fortis, -e", english: "brave, strong", partOfSpeech: "adjective", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-26", latin: "revenit", principalParts: "revenīre", english: "returns", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-27", latin: "intentē", principalParts: "intentē", english: "intently", partOfSpeech: "adverb", lesson: 3, difficulty: "medium" },
    
    // From "tonsor"
    { id: "3-vocab-28", latin: "taberna", principalParts: "taberna, -ae", english: "shop", partOfSpeech: "noun", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-29", latin: "inquit", principalParts: "inquit", english: "says", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-30", latin: "occupātus", principalParts: "occupātus, -a, -um", english: "busy", partOfSpeech: "adjective", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-31", latin: "senex", principalParts: "senex, senis", english: "old man", partOfSpeech: "noun", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-32", latin: "sellā", principalParts: "sella, -ae", english: "chair", partOfSpeech: "noun", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-33", latin: "novāculam", principalParts: "novācula, -ae", english: "razor", partOfSpeech: "noun", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-34", latin: "barbam", principalParts: "barba, -ae", english: "beard", partOfSpeech: "noun", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-35", latin: "tondet", principalParts: "tondēre", english: "is trimming", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-36", latin: "poēta", principalParts: "poēta, -ae", english: "poet", partOfSpeech: "noun", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-37", latin: "versum", principalParts: "versus, -ūs", english: "a line, a verse", partOfSpeech: "noun", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-38", latin: "recitat", principalParts: "recitāre", english: "recites", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-39", latin: "rīdet", principalParts: "rīdēre", english: "laughs, smiles", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-40", latin: "sed", principalParts: "sed", english: "but", partOfSpeech: "conjunction", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-41", latin: "scurrīlis", principalParts: "scurrīlis, -e", english: "obscene, dirty", partOfSpeech: "adjective", lesson: 3, difficulty: "hard" },
    { id: "3-vocab-42", latin: "perterritus", principalParts: "perterritus, -a, -um", english: "terrified", partOfSpeech: "adjective", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-43", latin: "secat", principalParts: "secāre", english: "cuts", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-44", latin: "multus", principalParts: "multus, -a, -um", english: "much", partOfSpeech: "adjective", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-45", latin: "sanguis", principalParts: "sanguis, sanguinis", english: "blood", partOfSpeech: "noun", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-46", latin: "fluit", principalParts: "fluere", english: "flows", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    
    // From "venalicius"
    { id: "3-vocab-47", latin: "ad portum", principalParts: "ad + acc.", english: "to the harbor", partOfSpeech: "prepositional phrase", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-48", latin: "nāvem Syriam", principalParts: "nāvis Syria", english: "Syrian ship", partOfSpeech: "noun phrase", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-49", latin: "prope", principalParts: "prope + acc.", english: "near", partOfSpeech: "preposition", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-50", latin: "quaerit", principalParts: "quaerere", english: "is searching for, is looking for", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-51", latin: "habet", principalParts: "habēre", english: "has", partOfSpeech: "verb", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-52", latin: "contentus", principalParts: "contentus, -a, -um", english: "satisfied", partOfSpeech: "adjective", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-53", latin: "emit", principalParts: "emere", english: "buys", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-54", latin: "bonum", principalParts: "bonus, -a, -um", english: "good", partOfSpeech: "adjective", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-55", latin: "pulchra", principalParts: "pulcher, -chra, -chrum", english: "beautiful", partOfSpeech: "adjective", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-56", latin: "linguam Latīnam", principalParts: "lingua Latīna", english: "Latin language", partOfSpeech: "noun phrase", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-57", latin: "discit", principalParts: "discere", english: "is learning", partOfSpeech: "verb", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-58", latin: "docta", principalParts: "doctus, -a, -um", english: "skillful, good at her job", partOfSpeech: "adjective", lesson: 3, difficulty: "medium" },
    { id: "3-vocab-59", latin: "satis", principalParts: "satis", english: "enough", partOfSpeech: "adverb", lesson: 3, difficulty: "easy" },
    { id: "3-vocab-60", latin: "eheu", principalParts: "eheu", english: "alas, oh dear", partOfSpeech: "interjection", lesson: 3, difficulty: "easy" }
  ],
  
  keyConcepts: [
    {
      id: "3-concept-1",
      title: "First Declension Nouns",
      explanation: "First declension nouns are mostly feminine and have -a in the nominative singular and -am in the accusative singular. Examples include ancilla, taberna, Metella.",
      examples: [
        { latin: "Metella", english: "Metella (nominative)", notes: "subject form" },
        { latin: "Metellam", english: "Metella (accusative)", notes: "direct object form" },
        { latin: "ancilla", english: "slave-girl (nominative)", notes: "subject form" },
        { latin: "ancillam", english: "slave-girl (accusative)", notes: "direct object form" },
        { latin: "taberna", english: "shop (nominative)", notes: "subject form" },
        { latin: "tabernam", english: "shop (accusative)", notes: "direct object form" }
      ],
      rules: [
        "Nominative ending: -a",
        "Accusative ending: -am", 
        "Most first declension nouns are feminine",
        "Some masculine nouns like pictor also exist"
      ]
    },
    {
      id: "3-concept-2",
      title: "Second Declension Nouns",
      explanation: "Second declension nouns are mostly masculine and have various nominative endings but -um in the accusative singular. Examples include Caecilius, servus, amicus.",
      examples: [
        { latin: "Caecilius", english: "Caecilius (nominative)", notes: "subject form" },
        { latin: "Caecilium", english: "Caecilius (accusative)", notes: "direct object form" },
        { latin: "servus", english: "slave (nominative)", notes: "subject form" },
        { latin: "servum", english: "slave (accusative)", notes: "direct object form" },
        { latin: "amīcus", english: "friend (nominative)", notes: "subject form" },
        { latin: "amīcum", english: "friend (accusative)", notes: "direct object form" }
      ],
      rules: [
        "Nominative endings vary (-us, -ius, -er)",
        "Accusative ending: -um",
        "Most second declension nouns are masculine",
        "Some neuter nouns also exist"
      ]
    },
    {
      id: "3-concept-3", 
      title: "Third Declension Nouns",
      explanation: "Third declension nouns have various nominative forms but nearly always end in -em in the accusative singular. Examples include mercator, leo, senex, canis.",
      examples: [
        { latin: "mercātor", english: "merchant (nominative)", notes: "subject form" },
        { latin: "mercātōrem", english: "merchant (accusative)", notes: "direct object form" },
        { latin: "leō", english: "lion (nominative)", notes: "subject form" },
        { latin: "leōnem", english: "lion (accusative)", notes: "direct object form" },
        { latin: "senex", english: "old man (nominative)", notes: "subject form" },
        { latin: "senem", english: "old man (accusative)", notes: "direct object form" },
        { latin: "canis", english: "dog (nominative)", notes: "subject form" },
        { latin: "canem", english: "dog (accusative)", notes: "direct object form" }
      ],
      rules: [
        "Nominative endings vary greatly",
        "Accusative ending: -em (almost always)",
        "Can be masculine, feminine, or neuter",
        "Must learn nominative and genitive forms"
      ]
    },
    {
      id: "3-concept-4",
      title: "Word Order and Emphasis",
      explanation: "Latin word order is flexible because case endings show grammatical relationships. However, certain patterns create emphasis and style. The verb often comes at the end of a sentence or clause.",
      examples: [
        { latin: "Caecilius pictūram laudat.", english: "Caecilius praises the picture.", notes: "Subject-Object-Verb order" },
        { latin: "pictūram Caecilius laudat.", english: "Caecilius praises the picture.", notes: "Object first for emphasis" },
        { latin: "laudat Caecilius pictūram.", english: "Caecilius praises the picture.", notes: "Verb first for emphasis" }
      ],
      rules: [
        "Case endings show grammatical function, not word order",
        "Verb typically comes at the end",
        "Unusual word order creates emphasis",
        "Context helps determine meaning"
      ]
    }
  ],
  
  practiceExercises: [
    {
      id: "3-exercise-1",
      type: "latin-to-english",
      title: "3A - Complete the Sentences", 
      sentences: [
        {
          id: "3a-1",
          source: "mercator e villa ambulat.",
          target: "The merchant walks out of the house.",
          hints: ["e = out of", "ambulat = walks"]
        },
        {
          id: "3a-2", 
          source: "servus ad hortum venit.",
          target: "The slave comes to the garden.",
          hints: ["ad = to", "venit = comes"]
        },
        {
          id: "3a-3",
          source: "coquus ad culinam revenit.",
          target: "The cook returns to the kitchen.", 
          hints: ["revenit = returns", "culinam = kitchen (acc.)"]
        },
        {
          id: "3a-4",
          source: "Syphax servum ad villam ducit.",
          target: "Syphax leads the slave to the house.",
          hints: ["ducit = leads", "servum = slave (acc.)"]
        },
        {
          id: "3a-5",
          source: "Clemens cibum ad Caecilium portat.",
          target: "Clemens carries food to Caecilius.",
          hints: ["cibum = food (acc.)", "portat = carries"]
        }
      ]
    },
    {
      id: "3-exercise-2",
      type: "english-to-latin",
      title: "3B - Choose the Right Case",
      sentences: [
        {
          id: "3b-1",
          source: "The friend praises the slave.",
          target: "amicus servum laudat.",
          hints: ["amicus = friend (nom.)", "servum = slave (acc.)"]
        },
        {
          id: "3b-2",
          source: "The old man enters the shop.",
          target: "senex tabernam intrat.",
          hints: ["senex = old man (nom.)", "tabernam = shop (acc.)"]
        },
        {
          id: "3b-3",
          source: "The master tastes the food.",
          target: "dominus cibum gustat.",
          hints: ["dominus = master (nom.)", "cibum = food (acc.)"]
        },
        {
          id: "3b-4",
          source: "The merchant greets Metella.",
          target: "mercator Metellam salutat.",
          hints: ["mercator = merchant (nom.)", "Metellam = Metella (acc.)"]
        },
        {
          id: "3b-5",
          source: "The slave-dealer sees the barber.",
          target: "venalicius tonsorem videt.",
          hints: ["venalicius = slave-dealer (nom.)", "tonsorem = barber (acc.)"]
        },
        {
          id: "3b-6",
          source: "The poet recites a verse.",
          target: "poeta versum recitat.",
          hints: ["poeta = poet (nom.)", "versum = verse (acc.)"]
        },
        {
          id: "3b-7",
          source: "The old man walks in the forum.",
          target: "senex in foro ambulat.",
          hints: ["senex = old man (nom.)", "in foro = in the forum"]
        },
        {
          id: "3b-8",
          source: "The slave-girl leads the painter to the atrium.",
          target: "ancilla pictorem ad atrium ducit.",
          hints: ["ancilla = slave-girl (nom.)", "pictorem = painter (acc.)"]
        }
      ]
    }
  ],
  
  objectives: [
    "Learn vocabulary related to Roman forum life and professions",
    "Understand the three main declensions of Latin nouns",
    "Practice distinguishing between nominative and accusative cases",
    "Recognize different word order patterns in Latin",
    "Translate sentences with increasing complexity",
    "Explore Roman commercial and social culture"
  ],
  
  culturalNotes: [
    "The Town of Pompeii: Pompeii was built on volcanic rock about five miles south of Mount Vesuvius. It covered 163 acres and was surrounded by a wall with eleven towers and eight gates. The town was divided into neat blocks by straight streets, with high paved sidewalks to keep pedestrians away from traffic and garbage.",
    "The Roman Forum: The forum was the center of business, government, and religion. It was a large open space with covered colonnades on three sides. Here people conducted business, held political meetings, and participated in religious ceremonies. Various shops and services surrounded the forum area.",
    "Roman Professions: The stories introduce various Roman professions: argentarius (banker), pictor (painter), tonsor (barber), and venalicius (slave-dealer). These reflect the diverse commercial life of Roman towns. Bankers like Caecilius were wealthy and important members of society.",
    "Roman Entertainment: Pompeii had two theaters and an amphitheater. The large theater held 5,000 people for popular shows, while the smaller roofed theater was used for concerts. The amphitheater hosted gladiatorial combats and wild animal hunts, and could seat all of Pompeii's inhabitants plus visitors."
  ],
  
  difficulty: "beginner" as const,
  prerequisiteSkills: [
    "Basic understanding of nominative and accusative cases",
    "Familiarity with Latin sentence structure",
    "Knowledge of basic Latin vocabulary",
    "Understanding of subject and direct object concepts"
  ],
  
  estimatedTime: 45,
  
  sections: [
    {
      id: "intro",
      title: "Introduction", 
      content: "Explore the Roman forum through stories of daily life and learn about the three declensions.",
      type: "intro",
      order: 1
    },
    {
      id: "prose",
      title: "Stories from the Forum",
      content: "Follow Caecilius through his encounters with various tradespeople in Pompeii",
      type: "prose",
      order: 2
    },
    {
      id: "vocabulary-section",
      title: "New Vocabulary",
      content: "Learn words for professions, places, and actions in the Roman world",
      type: "vocabulary", 
      order: 3
    },
    {
      id: "grammar-section",
      title: "Grammar: The Three Declensions",
      content: "Master the first, second, and third declensions of Latin nouns",
      type: "grammar",
      order: 4
    },
    {
      id: "exercises-section",
      title: "Practice Exercises",
      content: "Practice case recognition and translation with forum stories",
      type: "exercises",
      order: 5
    },
    {
      id: "culture-section",
      title: "Cultural Context",
      content: "Learn about the town of Pompeii and Roman commercial life",
      type: "culture",
      order: 6
    }
  ]
};

// Lesson 4 - Stage 4: Hermogenes
export const lesson4Template: Lesson = {
  id: 4,
  title: "Stage 4 - Hermogenes",
  subtitle: "First and Second Person Verbs",
  description: "Learn about ego and tu (I and you) verb forms; explore Roman legal proceedings and the forum",
  pageNumbers: [1, 2, 3, 4, 5, 6],
  
  introductoryNote: {
    content: `In this lesson, you will learn about first and second person verb forms using ego (I) and tu (you). The stories focus on Hermogenes, a Greek merchant who borrows money from Caecilius and the subsequent legal case when he fails to repay. You'll explore the Roman forum and legal system while mastering personal pronouns and verb conjugations.`
  },
  
  prosePassage: {
    title: "Hermogenes and in basilica",
    context: "Follow the story of Hermogenes, a Greek merchant who requests a loan from Caecilius, and the dramatic court case that follows when the loan is not repaid. Learn about Roman business practices and legal procedures.",
    sentences: [
      // Introduction - Character identities
      { id: "4-prose-1", latin: "ego sum coquus.", english: "I am a cook.", order: 1 },
      { id: "4-prose-2", latin: "ego cenam coquo.", english: "I cook dinner.", order: 2 },
      { id: "4-prose-3", latin: "ego sum argentarius.", english: "I am a banker.", order: 3 },
      { id: "4-prose-4", latin: "ego pecuniam teneo.", english: "I hold money.", order: 4 },
      { id: "4-prose-5", latin: "ego sum tonsor.", english: "I am a barber.", order: 5 },
      { id: "4-prose-6", latin: "ego barbam tondeo.", english: "I trim a beard.", order: 6 },
      { id: "4-prose-7", latin: "ego sum venalicius.", english: "I am a slave-dealer.", order: 7 },
      { id: "4-prose-8", latin: "ego servum vendo.", english: "I sell a slave.", order: 8 },
      { id: "4-prose-9", latin: "ego sum poeta.", english: "I am a poet.", order: 9 },
      { id: "4-prose-10", latin: "ego versum recito.", english: "I recite a verse.", order: 10 },
      { id: "4-prose-11", latin: "ego sum pictor.", english: "I am a painter.", order: 11 },
      { id: "4-prose-12", latin: "ego leonem pingo.", english: "I paint a lion.", order: 12 },
      
      // Dialogue with Quintus
      { id: "4-prose-13", latin: "quid tu coquis?", english: "What are you cooking?", order: 13 },
      { id: "4-prose-14", latin: "ego cenam coquo.", english: "I cook dinner.", order: 14 },
      { id: "4-prose-15", latin: "quid tu tenes?", english: "What are you holding?", order: 15 },
      { id: "4-prose-16", latin: "ego pecuniam teneo.", english: "I hold money.", order: 16 },
      { id: "4-prose-17", latin: "quid tu tondes?", english: "What are you trimming?", order: 17 },
      { id: "4-prose-18", latin: "ego barbam tondeo.", english: "I trim a beard.", order: 18 },
      { id: "4-prose-19", latin: "quid tu vendis?", english: "What are you selling?", order: 19 },
      { id: "4-prose-20", latin: "ego servum vendo.", english: "I sell a slave.", order: 20 },
      { id: "4-prose-21", latin: "quid tu recitas?", english: "What are you reciting?", order: 21 },
      { id: "4-prose-22", latin: "ego versum recito.", english: "I recite a verse.", order: 22 },
      { id: "4-prose-23", latin: "quid tu pingis?", english: "What are you painting?", order: 23 },
      { id: "4-prose-24", latin: "ego leonem pingo.", english: "I paint a lion.", order: 24 },
      
      // Identity questions
      { id: "4-prose-25", latin: "quis es tu?", english: "Who are you?", order: 25 },
      { id: "4-prose-26", latin: "ego sum Melissa.", english: "I am Melissa.", order: 26 },
      { id: "4-prose-27", latin: "ego sum Syphax.", english: "I am Syphax.", order: 27 },
      { id: "4-prose-28", latin: "ego sum Pantagathus.", english: "I am Pantagathus.", order: 28 },
      
      // Story 1: Hermogenes
      { id: "4-prose-29", latin: "Caecilius est in foro.", english: "Caecilius is in the forum.", order: 29 },
      { id: "4-prose-30", latin: "Caecilius in foro argentariam habet.", english: "Caecilius has a banker's stall in the forum.", order: 30 },
      { id: "4-prose-31", latin: "Hermogenes ad forum venit.", english: "Hermogenes comes to the forum.", order: 31 },
      { id: "4-prose-32", latin: "Hermogenes est mercator Graecus.", english: "Hermogenes is a Greek merchant.", order: 32 },
      { id: "4-prose-33", latin: "mercator navem habet.", english: "The merchant has a ship.", order: 33 },
      { id: "4-prose-34", latin: "mercator Caecilium salutat.", english: "The merchant greets Caecilius.", order: 34 },
      { id: "4-prose-35", latin: "\"ego sum mercator Graecus,\" inquit Hermogenes.", english: "\"I am a Greek merchant,\" says Hermogenes.", order: 35 },
      { id: "4-prose-36", latin: "\"ego sum mercator probus.\"", english: "\"I am an honest merchant.\"", order: 36 },
      { id: "4-prose-37", latin: "\"ego pecuniam quaero.\"", english: "\"I am looking for money.\"", order: 37 },
      { id: "4-prose-38", latin: "\"cur tu pecuniam quaeris?\" inquit Caecilius.", english: "\"Why are you looking for money?\" says Caecilius.", order: 38 },
      { id: "4-prose-39", latin: "\"tu navem habes.\"", english: "\"You have a ship.\"", order: 39 },
      { id: "4-prose-40", latin: "\"sed navis non adest,\" respondet Hermogenes.", english: "\"But the ship is not here,\" replies Hermogenes.", order: 40 },
      { id: "4-prose-41", latin: "\"navis est in Graecia.\"", english: "\"The ship is in Greece.\"", order: 41 },
      { id: "4-prose-42", latin: "\"ego pecuniam non habeo.\"", english: "\"I do not have money.\"", order: 42 },
      { id: "4-prose-43", latin: "\"ego tamen sum probus.\"", english: "\"However, I am honest.\"", order: 43 },
      { id: "4-prose-44", latin: "\"ego semper pecuniam reddo.\"", english: "\"I always give back money.\"", order: 44 },
      { id: "4-prose-45", latin: "\"ecce!\" inquit Caecilius.", english: "\"Look!\" says Caecilius.", order: 45 },
      { id: "4-prose-46", latin: "\"ego ceram habeo. tu anulum habes?\"", english: "\"I have a wax tablet. Do you have a ring?\"", order: 46 },
      { id: "4-prose-47", latin: "\"ego anulum habeo,\" respondet Hermogenes.", english: "\"I have a ring,\" replies Hermogenes.", order: 47 },
      { id: "4-prose-48", latin: "\"anulus signum habet.\"", english: "\"The ring has a seal.\"", order: 48 },
      { id: "4-prose-49", latin: "\"ecce! ego signum in cera imprimo.\"", english: "\"Look! I press the seal into the wax.\"", order: 49 },
      { id: "4-prose-50", latin: "Caecilius pecuniam tradit.", english: "Caecilius hands over the money.", order: 50 },
      { id: "4-prose-51", latin: "mercator pecuniam capit et e foro currit.", english: "The merchant takes the money and runs from the forum.", order: 51 },
      { id: "4-prose-52", latin: "eheu! Hermogenes non revenit.", english: "Alas! Hermogenes does not return.", order: 52 },
      { id: "4-prose-53", latin: "mercator pecuniam non reddit.", english: "The merchant does not give back the money.", order: 53 },
      { id: "4-prose-54", latin: "Caecilius Hermogenem ad basilicam vocat.", english: "Caecilius summons Hermogenes to the law court.", order: 54 },
      
      // Story 2: in basilica
      { id: "4-prose-55", latin: "iudex basilicam intrat.", english: "The judge enters the law court.", order: 55 },
      { id: "4-prose-56", latin: "\"quis es tu?\" inquit iudex.", english: "\"Who are you?\" says the judge.", order: 56 },
      { id: "4-prose-57", latin: "\"ego sum Lucius Caecilius Iucundus,\" respondet Caecilius.", english: "\"I am Lucius Caecilius Iucundus,\" replies Caecilius.", order: 57 },
      { id: "4-prose-58", latin: "\"tu es Pompeianus?\"", english: "\"Are you a Pompeian?\"", order: 58 },
      { id: "4-prose-59", latin: "\"ego sum Pompeianus.\"", english: "\"I am a Pompeian.\"", order: 59 },
      { id: "4-prose-60", latin: "\"quid tu in urbe agis?\"", english: "\"What do you do in the city?\"", order: 60 },
      { id: "4-prose-61", latin: "\"ego cotidie ad forum venio. ego sum argentarius.\"", english: "\"I come to the forum daily. I am a banker.\"", order: 61 },
      { id: "4-prose-62", latin: "\"cur tu hodie ad basilicam venis?\"", english: "\"Why do you come to the law court today?\"", order: 62 },
      { id: "4-prose-63", latin: "\"Hermogenes multam pecuniam debet.\"", english: "\"Hermogenes owes a lot of money.\"", order: 63 },
      { id: "4-prose-64", latin: "\"Hermogenes pecuniam non reddit.\"", english: "\"Hermogenes does not give back the money.\"", order: 64 },
      { id: "4-prose-65", latin: "\"Caecilius est mendax!\" inquit Hermogenes.", english: "\"Caecilius is a liar!\" says Hermogenes.", order: 65 },
      { id: "4-prose-66", latin: "\"quis es tu?\" inquit iudex.", english: "\"Who are you?\" says the judge.", order: 66 },
      { id: "4-prose-67", latin: "\"ego sum Hermogenes.\"", english: "\"I am Hermogenes.\"", order: 67 },
      { id: "4-prose-68", latin: "\"Hermogenes, quid tu in urbe agis?\"", english: "\"Hermogenes, what do you do in the city?\"", order: 68 },
      { id: "4-prose-69", latin: "\"ego pecuniam non debeo. amicus meus est testis.\"", english: "\"I do not owe money. My friend is a witness.\"", order: 69 },
      { id: "4-prose-70", latin: "\"ego sum testis,\" inquit amicus.", english: "\"I am a witness,\" says the friend.", order: 70 },
      { id: "4-prose-71", latin: "\"Hermogenes pecuniam non debet.\"", english: "\"Hermogenes does not owe money.\"", order: 71 },
      { id: "4-prose-72", latin: "\"Caecilius est mendax.\"", english: "\"Caecilius is a liar.\"", order: 72 },
      { id: "4-prose-73", latin: "\"tu, Hermogenes, es mendax,\" inquit Caecilius.", english: "\"You, Hermogenes, are a liar,\" says Caecilius.", order: 73 },
      { id: "4-prose-74", latin: "\"amicus tuus quoque est mendax.\"", english: "\"Your friend is also a liar.\"", order: 74 },
      { id: "4-prose-75", latin: "\"tu pecuniam non reddis...\"", english: "\"You do not give back the money...\"", order: 75 },
      { id: "4-prose-76", latin: "\"satis!\" inquit iudex.", english: "\"Enough!\" says the judge.", order: 76 },
      { id: "4-prose-77", latin: "\"tu Hermogenem accusas, sed tu rem non probas.\"", english: "\"You accuse Hermogenes, but you do not prove the case.\"", order: 77 },
      { id: "4-prose-78", latin: "\"ego ceram habeo,\" inquit Caecilius.", english: "\"I have the wax tablet,\" says Caecilius.", order: 78 },
      { id: "4-prose-79", latin: "\"tu signum in cera vides.\"", english: "\"You see the seal in the wax.\"", order: 79 },
      { id: "4-prose-80", latin: "\"eheu!\" inquit Hermogenes.", english: "\"Alas!\" says Hermogenes.", order: 80 },
      { id: "4-prose-81", latin: "\"Hermogenes, tu anulum habes?\" inquit iudex.", english: "\"Hermogenes, do you have a ring?\" says the judge.", order: 81 },
      { id: "4-prose-82", latin: "\"ecce! Hermogenes anulum celat,\" inquit Caecilius.", english: "\"Look! Hermogenes is hiding the ring,\" says Caecilius.", order: 82 },
      { id: "4-prose-83", latin: "\"ubi est anulus?\" inquit iudex.", english: "\"Where is the ring?\" says the judge.", order: 83 },
      { id: "4-prose-84", latin: "\"ecce! anulus rem probat.\"", english: "\"Look! The ring proves the case.\"", order: 84 },
      { id: "4-prose-85", latin: "\"ego Hermogenem convinco.\"", english: "\"I convict Hermogenes.\"", order: 85 }
    ],
    fullTranslation: "I am a cook. I cook dinner. I am a banker. I hold money. I am a barber. I trim a beard. I am a slave-dealer. I sell a slave. I am a poet. I recite a verse. I am a painter. I paint a lion. What are you cooking? I cook dinner. What are you holding? I hold money. What are you trimming? I trim a beard. What are you selling? I sell a slave. What are you reciting? I recite a verse. What are you painting? I paint a lion. Who are you? I am Melissa. I am Syphax. I am Pantagathus. Caecilius is in the forum. Caecilius has a banker's stall in the forum. Hermogenes comes to the forum. Hermogenes is a Greek merchant. The merchant has a ship. The merchant greets Caecilius. \"I am a Greek merchant,\" says Hermogenes. \"I am an honest merchant.\" \"I am looking for money.\" \"Why are you looking for money?\" says Caecilius. \"You have a ship.\" \"But the ship is not here,\" replies Hermogenes. \"The ship is in Greece.\" \"I do not have money.\" \"However, I am honest.\" \"I always give back money.\" \"Look!\" says Caecilius. \"I have a wax tablet. Do you have a ring?\" \"I have a ring,\" replies Hermogenes. \"The ring has a seal.\" \"Look! I press the seal into the wax.\" Caecilius hands over the money. The merchant takes the money and runs from the forum. Alas! Hermogenes does not return. The merchant does not give back the money. Caecilius summons Hermogenes to the law court. The judge enters the law court. \"Who are you?\" says the judge. \"I am Lucius Caecilius Iucundus,\" replies Caecilius. \"Are you a Pompeian?\" \"I am a Pompeian.\" \"What do you do in the city?\" \"I come to the forum daily. I am a banker.\" \"Why do you come to the law court today?\" \"Hermogenes owes a lot of money.\" \"Hermogenes does not give back the money.\" \"Caecilius is a liar!\" says Hermogenes. \"Who are you?\" says the judge. \"I am Hermogenes.\" \"Hermogenes, what do you do in the city?\" \"I do not owe money. My friend is a witness.\" \"I am a witness,\" says the friend. \"Hermogenes does not owe money.\" \"Caecilius is a liar.\" \"You, Hermogenes, are a liar,\" says Caecilius. \"Your friend is also a liar.\" \"You do not give back the money...\" \"Enough!\" says the judge. \"You accuse Hermogenes, but you do not prove the case.\" \"I have the wax tablet,\" says Caecilius. \"You see the seal in the wax.\" \"Alas!\" says Hermogenes. \"Hermogenes, do you have a ring?\" says the judge. \"Look! Hermogenes is hiding the ring,\" says Caecilius. \"Where is the ring?\" says the judge. \"Look! The ring proves the case.\" \"I convict Hermogenes.\""
  },
  
  vocabulary: [
    // Personal pronouns and basic verbs
    { id: "4-vocab-1", latin: "ego", principalParts: "ego", english: "I", partOfSpeech: "pronoun", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-2", latin: "tu", principalParts: "tu", english: "you (singular)", partOfSpeech: "pronoun", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-3", latin: "quid", principalParts: "quid", english: "what", partOfSpeech: "pronoun", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-4", latin: "quis", principalParts: "quis", english: "who", partOfSpeech: "pronoun", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-5", latin: "cur", principalParts: "cur", english: "why", partOfSpeech: "adverb", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-6", latin: "ubi", principalParts: "ubi", english: "where", partOfSpeech: "adverb", lesson: 4, difficulty: "easy" },
    
    // From Hermogenes story
    { id: "4-vocab-7", latin: "argentaria", principalParts: "argentaria, -ae", english: "banker's stall", partOfSpeech: "noun", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-8", latin: "Graecus", principalParts: "Graecus, -a, -um", english: "Greek", partOfSpeech: "adjective", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-9", latin: "probus", principalParts: "probus, -a, -um", english: "honest", partOfSpeech: "adjective", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-10", latin: "quaero", principalParts: "quaero, quaerere", english: "I look for, I seek", partOfSpeech: "verb", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-11", latin: "non adest", principalParts: "adesse", english: "is not here", partOfSpeech: "verb phrase", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-12", latin: "in Graecia", principalParts: "in + abl.", english: "in Greece", partOfSpeech: "prepositional phrase", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-13", latin: "tamen", principalParts: "tamen", english: "however", partOfSpeech: "adverb", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-14", latin: "semper", principalParts: "semper", english: "always", partOfSpeech: "adverb", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-15", latin: "reddo", principalParts: "reddo, reddere", english: "I give back", partOfSpeech: "verb", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-16", latin: "cera", principalParts: "cera, -ae", english: "wax tablet", partOfSpeech: "noun", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-17", latin: "anulus", principalParts: "anulus, -i", english: "ring", partOfSpeech: "noun", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-18", latin: "signum", principalParts: "signum, -i", english: "seal, sign", partOfSpeech: "noun", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-19", latin: "imprimo", principalParts: "imprimo, imprimere", english: "I press", partOfSpeech: "verb", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-20", latin: "trado", principalParts: "trado, tradere", english: "I hand over", partOfSpeech: "verb", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-21", latin: "capio", principalParts: "capio, capere", english: "I take", partOfSpeech: "verb", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-22", latin: "curro", principalParts: "curro, currere", english: "I run", partOfSpeech: "verb", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-23", latin: "ad basilicam", principalParts: "ad + acc.", english: "to the law court", partOfSpeech: "prepositional phrase", lesson: 4, difficulty: "medium" },
    
    // From in basilica story
    { id: "4-vocab-24", latin: "iudex", principalParts: "iudex, iudicis", english: "judge", partOfSpeech: "noun", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-25", latin: "Pompeianus", principalParts: "Pompeianus, -a, -um", english: "Pompeian, citizen of Pompeii", partOfSpeech: "adjective", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-26", latin: "in urbe", principalParts: "in + abl.", english: "in the city", partOfSpeech: "prepositional phrase", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-27", latin: "ago", principalParts: "ago, agere", english: "I do", partOfSpeech: "verb", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-28", latin: "cotidie", principalParts: "cotidie", english: "every day", partOfSpeech: "adverb", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-29", latin: "hodie", principalParts: "hodie", english: "today", partOfSpeech: "adverb", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-30", latin: "debeo", principalParts: "debeo, debere", english: "I owe", partOfSpeech: "verb", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-31", latin: "mendax", principalParts: "mendax, mendacis", english: "liar", partOfSpeech: "noun", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-32", latin: "meus", principalParts: "meus, -a, -um", english: "my, mine", partOfSpeech: "adjective", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-33", latin: "testis", principalParts: "testis, -is", english: "witness", partOfSpeech: "noun", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-34", latin: "tuus", principalParts: "tuus, -a, -um", english: "your", partOfSpeech: "adjective", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-35", latin: "accuso", principalParts: "accuso, accusare", english: "I accuse", partOfSpeech: "verb", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-36", latin: "rem probo", principalParts: "rem probare", english: "I prove the case", partOfSpeech: "verb phrase", lesson: 4, difficulty: "hard" },
    { id: "4-vocab-37", latin: "celo", principalParts: "celo, celare", english: "I hide", partOfSpeech: "verb", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-38", latin: "convinco", principalParts: "convinco, convincere", english: "I convict, I find guilty", partOfSpeech: "verb", lesson: 4, difficulty: "hard" },
    { id: "4-vocab-39", latin: "satis", principalParts: "satis", english: "enough", partOfSpeech: "adverb", lesson: 4, difficulty: "easy" },
    
    // Additional vocabulary from the exercises
    { id: "4-vocab-40", latin: "disco", principalParts: "disco, discere", english: "I depart, I leave", partOfSpeech: "verb", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-41", latin: "e taberna", principalParts: "e + abl.", english: "from the inn", partOfSpeech: "prepositional phrase", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-42", latin: "ebrius", principalParts: "ebrius, -a, -um", english: "drunk", partOfSpeech: "adjective", lesson: 4, difficulty: "medium" },
    { id: "4-vocab-43", latin: "ita vero", principalParts: "ita vero", english: "yes", partOfSpeech: "phrase", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-44", latin: "multus", principalParts: "multus, -a, -um", english: "much, many", partOfSpeech: "adjective", lesson: 4, difficulty: "easy" },
    { id: "4-vocab-45", latin: "vendo", principalParts: "vendo, vendere", english: "I sell", partOfSpeech: "verb", lesson: 4, difficulty: "easy" }
  ],
  
  keyConcepts: [
    {
      id: "4-concept-1",
      title: "First and Second Person Verbs",
      explanation: "In Stage 4, you learn about first person (ego = I) and second person (tu = you) verb forms. Notice how the verb endings change: -o for 'I', -s for 'you', and -t for 'he/she/it'.",
      examples: [
        { latin: "ego ambulo", english: "I walk", notes: "first person singular" },
        { latin: "tu ambulas", english: "you walk", notes: "second person singular" },
        { latin: "ancilla ambulat", english: "the slave-girl walks", notes: "third person singular" },
        { latin: "ego sum", english: "I am", notes: "first person of 'to be'" },
        { latin: "tu es", english: "you are", notes: "second person of 'to be'" },
        { latin: "servus est", english: "the slave is", notes: "third person of 'to be'" }
      ],
      rules: [
        "First person (I): verb ends in -o",
        "Second person (you): verb ends in -s", 
        "Third person (he/she/it): verb ends in -t",
        "ego and tu are often omitted since the verb ending shows the person"
      ]
    },
    {
      id: "4-concept-2",
      title: "Personal Pronouns",
      explanation: "ego (I) and tu (you) are personal pronouns. They are often omitted in Latin because the verb ending already shows who is doing the action. Use them for emphasis or clarity.",
      examples: [
        { latin: "ego sum coquus", english: "I am a cook", notes: "ego used for emphasis" },
        { latin: "sum coquus", english: "I am a cook", notes: "ego omitted, ending shows person" },
        { latin: "quis es tu?", english: "Who are you?", notes: "tu used for clarity in question" },
        { latin: "es mendax", english: "You are a liar", notes: "tu omitted, ending shows person" }
      ],
      rules: [
        "ego = I (first person singular)",
        "tu = you (second person singular)",
        "Usually omitted unless needed for emphasis",
        "Verb endings already show the person"
      ]
    },
    {
      id: "4-concept-3", 
      title: "Question Words",
      explanation: "Stage 4 introduces important question words: quis (who), quid (what), cur (why), and ubi (where). These help form questions and gather information.",
      examples: [
        { latin: "quis es tu?", english: "Who are you?", notes: "asking for identity" },
        { latin: "quid tu agis?", english: "What are you doing?", notes: "asking for action" },
        { latin: "cur tu venis?", english: "Why are you coming?", notes: "asking for reason" },
        { latin: "ubi est anulus?", english: "Where is the ring?", notes: "asking for location" }
      ],
      rules: [
        "quis = who (person)",
        "quid = what (thing or action)",
        "cur = why (reason)",
        "ubi = where (location)"
      ]
    },
    {
      id: "4-concept-4",
      title: "Possessive Adjectives",
      explanation: "meus (my) and tuus (your) are possessive adjectives that show ownership. They agree with the noun they describe in gender, number, and case.",
      examples: [
        { latin: "amicus meus", english: "my friend", notes: "masculine nominative" },
        { latin: "amicus tuus", english: "your friend", notes: "masculine nominative" },
        { latin: "villa mea", english: "my house", notes: "feminine nominative" },
        { latin: "villam tuam", english: "your house", notes: "feminine accusative" }
      ],
      rules: [
        "meus, mea, meum = my, mine",
        "tuus, tua, tuum = your, yours",
        "Must agree with the noun in gender, number, and case",
        "Often placed after the noun"
      ]
    }
  ],
  
  practiceExercises: [
    {
      id: "4-exercise-1",
      type: "latin-to-english",
      title: "4A - Personal Pronouns and Verbs",
      sentences: [
        {
          id: "4a-1",
          source: "ego sum mercator Graecus.",
          target: "I am a Greek merchant.",
          hints: ["ego = I", "Graecus = Greek"]
        },
        {
          id: "4a-2",
          source: "tu es venalicius probus.",
          target: "You are an honest slave-dealer.",
          hints: ["tu = you", "probus = honest"]
        },
        {
          id: "4a-3",
          source: "ego pecuniam quaero.",
          target: "I am looking for money.",
          hints: ["quaero = I look for", "pecuniam = money (acc.)"]
        },
        {
          id: "4a-4",
          source: "quid tu in urbe agis?",
          target: "What do you do in the city?",
          hints: ["quid = what", "agis = you do"]
        },
        {
          id: "4a-5",
          source: "cur tu ad basilicam venis?",
          target: "Why do you come to the law court?",
          hints: ["cur = why", "venis = you come"]
        },
        {
          id: "4a-6",
          source: "ego anulum habeo.",
          target: "I have a ring.",
          hints: ["habeo = I have", "anulum = ring (acc.)"]
        },
        {
          id: "4a-7",
          source: "tu rem non probas.",
          target: "You do not prove the case.",
          hints: ["probas = you prove", "rem = case (acc.)"]
        },
        {
          id: "4a-8",
          source: "ego Hermogenem convinco.",
          target: "I convict Hermogenes.",
          hints: ["convinco = I convict", "Hermogenem = Hermogenes (acc.)"]
        }
      ]
    },
    {
      id: "4-exercise-2",
      type: "english-to-latin",
      title: "4B - Questions and Responses",
      sentences: [
        {
          id: "4b-1",
          source: "Who are you?",
          target: "quis es tu?",
          hints: ["quis = who", "es = you are"]
        },
        {
          id: "4b-2",
          source: "I am a judge.",
          target: "ego sum iudex.",
          hints: ["ego = I", "iudex = judge"]
        },
        {
          id: "4b-3",
          source: "What are you selling?",
          target: "quid tu vendis?",
          hints: ["quid = what", "vendis = you sell"]
        },
        {
          id: "4b-4",
          source: "I sell slaves.",
          target: "ego servos vendo.",
          hints: ["vendo = I sell", "servos = slaves (acc.)"]
        },
        {
          id: "4b-5",
          source: "Why do you accuse me?",
          target: "cur tu me accusas?",
          hints: ["cur = why", "accusas = you accuse", "me = me"]
        },
        {
          id: "4b-6",
          source: "You are a liar.",
          target: "tu es mendax.",
          hints: ["tu = you", "mendax = liar"]
        },
        {
          id: "4b-7",
          source: "Where is my ring?",
          target: "ubi est anulus meus?",
          hints: ["ubi = where", "meus = my"]
        },
        {
          id: "4b-8",
          source: "Your friend is hiding the money.",
          target: "amicus tuus pecuniam celat.",
          hints: ["tuus = your", "celat = is hiding"]
        }
      ]
    }
  ],
  
  objectives: [
    "Master first and second person verb forms (ego/tu)",
    "Learn question words: quis, quid, cur, ubi",
    "Understand possessive adjectives: meus, tuus",
    "Practice legal and commercial vocabulary",
    "Explore Roman business and legal practices",
    "Translate increasingly complex dialogues"
  ],
  
  culturalNotes: [
    "The Roman Forum: The forum was the heart of commercial, administrative, and religious life in Pompeii. It was a large open space (156 x 42 yards) surrounded by colonnades and important buildings. The forum was a pedestrian area protected by barriers to keep out wheeled traffic.",
    "Roman Business Practices: Roman merchants like Hermogenes often traveled long distances for trade. Credit and loans were common, with bankers like Caecilius providing financial services. Wax tablets (cera) and seal rings (anulus) were used to create legal documents and contracts.",
    "Roman Legal System: The basilica was the courthouse where legal disputes were settled. Judges (iudices) heard cases and made decisions. Evidence like sealed documents was crucial for proving cases. Witnesses (testes) played important roles in legal proceedings.",
    "Roman Identity: Roman citizens were proud of their citizenship and city affiliation. Being 'Pompeianus' (a citizen of Pompeii) was an important part of one's identity. Full names like 'Lucius Caecilius Iucundus' showed family heritage and status."
  ],
  
  difficulty: "beginner" as const,
  prerequisiteSkills: [
    "Understanding of nominative and accusative cases",
    "Basic Latin sentence structure",
    "Third person verb forms (-t endings)",
    "Fundamental vocabulary from Stages 1-3"
  ],
  
  estimatedTime: 50,
  
  sections: [
    {
      id: "intro",
      title: "Introduction",
      content: "Learn about first and second person verbs through character introductions and dialogues.",
      type: "intro",
      order: 1
    },
    {
      id: "prose",
      title: "Hermogenes and the Court Case",
      content: "Follow the dramatic story of a Greek merchant and a legal dispute in Roman Pompeii",
      type: "prose",
      order: 2
    },
    {
      id: "vocabulary-section", 
      title: "New Vocabulary",
      content: "Legal terms, question words, and personal pronouns",
      type: "vocabulary",
      order: 3
    },
    {
      id: "grammar-section",
      title: "Grammar: Personal Pronouns and Verb Forms",
      content: "Master ego/tu and first/second person verb endings",
      type: "grammar",
      order: 4
    },
    {
      id: "exercises-section",
      title: "Practice Exercises",
      content: "Practice questions, responses, and legal dialogues",
      type: "exercises",
      order: 5
    },
    {
      id: "culture-section",
      title: "Cultural Context",
      content: "Explore the Roman forum, business practices, and legal system",
      type: "culture",
      order: 6
    }
  ]
};

// Updated lessons array with our template
export const lessonsData: Lesson[] = [
  lesson1Template,
  lesson2Template,
  lesson3Template,
  lesson4Template
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
