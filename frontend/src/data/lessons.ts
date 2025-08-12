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

// Lesson 3 - Coming Soon
export const lesson3Template: Lesson = {
  id: 3,
  title: "Coming Soon",
  subtitle: "Future Lesson", 
  description: "This lesson is not yet available",
  pageNumbers: [],
  introductoryNote: { content: "Coming soon..." },
  prosePassage: { title: "", context: "", sentences: [] },
  vocabulary: [],
  keyConcepts: [],
  practiceExercises: [],
  objectives: [],
  culturalNotes: [],
  difficulty: "beginner" as const,
  prerequisiteSkills: [],
  estimatedTime: 30,
  sections: []
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
