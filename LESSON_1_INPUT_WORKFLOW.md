# Lesson 1 Content Input Workflow

## Quick Start Guide
Based on your description of Lesson 1 (pages 17-22), here's the streamlined process to get the content into our system:

## Step 1: Gather All Content from PDF (pages 17-22)
Open the Ludus PDF and collect:

### A. Introductory Note
- Copy the exact text from the introductory note
- Note any special formatting or emphasis

### B. Latin Prose (12 sentences)
- Copy each of the 12 Latin sentences
- Note if there's a title for the passage
- Note the overall theme/story (Roman family life, etc.)
- Check if English translations are provided

### C. Vocabulary Box (~20 words)
- Copy each Latin word exactly as shown
- Copy the principal parts (e.g., "puella, puellae, f.")
- Copy the English definitions
- Note the part of speech for each word

### D. Key Concepts (Grammar Section)
- Copy the section title
- Copy the full explanation
- Copy any example sentences (Latin + English)
- Copy any declension charts or tables
- List any specific rules mentioned

### E. Practice Sentences
- **Latin → English**: Copy all Latin sentences and their expected translations
- **English → Latin**: Copy all English sentences and their expected Latin translations
- Note any hints or special instructions

## Step 2: Fill in the Data Structure
Open `/frontend/src/data/lessons.ts` and replace the placeholder content in `lesson1Template`:

### Replace placeholders like:
- `[PLEASE FILL IN: ...]` → actual content from PDF
- `[Sentence 1 Latin text]` → actual Latin sentence
- `[Latin word]` → actual vocabulary word
- etc.

### Key areas to fill:
1. `introductoryNote.content`
2. `prosePassage.sentences[]` (all 12 sentences)
3. `vocabulary[]` (all ~20 words)
4. `keyConcepts[]` (all grammar concepts)
5. `practiceExercises[]` (both Latin→English and English→Latin)

## Step 3: Test and Refine
1. Save the file
2. Reload the lesson page in browser (http://localhost:3000/lesson/1)
3. Check that all content displays correctly
4. Make adjustments as needed

## Content Format Examples

### Introductory Note Example:
```typescript
introductoryNote: {
  content: `
  In this first lesson, you will learn about first declension nouns and basic Latin sentence structure. 
  Pay attention to the endings of the nouns and how they change based on their function in the sentence.
  
  The story introduces a Roman family and their daily activities.
  `
},
```

### Prose Sentence Example:
```typescript
{ 
  id: "1-prose-1", 
  latin: "Puella in villa habitat.", 
  english: "The girl lives in the villa.", 
  order: 1 
},
```

### Vocabulary Example:
```typescript
{
  id: "1-vocab-1",
  latin: "puella",
  principalParts: "puella, puellae, f.",
  english: "girl",
  partOfSpeech: "noun",
  lesson: 1,
  difficulty: "easy"
},
```

### Key Concept Example:
```typescript
{
  id: "1-concept-1",
  title: "First Declension Nouns",
  explanation: `
  First declension nouns are predominantly feminine and end in -a in the nominative singular.
  They follow a regular pattern of endings that indicate their case and number.
  `,
  examples: [
    {
      latin: "Puella in horto ambulat.",
      english: "The girl walks in the garden.",
      notes: "Note that 'puella' is the subject (nominative case)"
    }
  ],
  rules: [
    "Nominative singular ends in -a",
    "Accusative singular ends in -am",
    "Nominative plural ends in -ae",
    "Accusative plural ends in -as"
  ],
  charts: [
    {
      title: "First Declension Endings",
      headers: ["Case", "Singular", "Plural"],
      rows: [
        ["Nominative", "-a", "-ae"],
        ["Accusative", "-am", "-as"]
      ]
    }
  ]
}
```

### Practice Exercise Example:
```typescript
{
  id: "1-practice-latin-english",
  type: "latin-to-english",
  title: "Translate the following Latin sentences into English",
  sentences: [
    {
      id: "1-l2e-1",
      source: "Puella rosam amat.",
      target: "The girl loves the rose.",
      hints: ["Remember: puella = subject, rosam = direct object"],
      notes: "Note the accusative ending -am on rosam"
    }
  ]
}
```

## Tips for Efficiency
1. **Copy in chunks**: Copy all similar content at once (all vocab words, all sentences, etc.)
2. **Use find/replace**: Use your editor's find/replace to quickly update multiple placeholders
3. **Start with structure**: Fill in the main content first, then add details like hints and notes
4. **Test frequently**: Save and check the browser after each major section

## Quality Checklist
- [ ] All 12 prose sentences included
- [ ] All ~20 vocabulary words with principal parts
- [ ] All key grammar concepts with explanations
- [ ] All practice sentences (both directions)
- [ ] Introductory note included
- [ ] No placeholder text remains
- [ ] Content displays correctly in browser
- [ ] Expandable prose works
- [ ] Vocabulary section is complete
- [ ] Practice exercises work

Once you've extracted the content, we'll build beautiful UI components to display it all!
