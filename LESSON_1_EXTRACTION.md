# Lesson 1 Content Extraction

## Lesson Overview
- **Page Numbers**: 17-22 (6 pages total)
- **Structure Identified**: 
  1. Introductory note
  2. Latin prose passage
  3. Vocabulary box
  4. Key concepts section
  5. Latin to English practice sentences
  6. English to Latin practice sentences

## Lesson Structure Found in PDF

### 1. Introductory Note (Page 17)
- **Content**: _[Please provide the introductory text]_

### 2. Latin Prose Section
- **Title**: _[Please provide title if any]_
- **Content**: _[Please provide the Latin text]_
- **Translation**: _[If provided in PDF, or we can translate]_

### 3. Vocabulary Box
- **Section Title**: _[Please provide exact title]_
- **Words Found**: _[Please list each word with definition as shown in PDF]_

Format from PDF:
```
[Please provide exact format from vocabulary box]
```

### 4. Key Concepts Section
- **Section Title**: _[Please provide exact title]_
- **Main Grammar Points**: _[What concepts are taught?]_
- **Explanation**: _[Please provide the explanation from PDF]_
- **Examples/Charts**: _[Any declension tables or example sentences]_

### 5. Latin to English Practice
- **Section Title**: _[Please provide exact title]_
- **Sample Sentences**: _[Please provide several example sentences]_

### 6. English to Latin Practice  
- **Section Title**: _[Please provide exact title]_
- **Sample Sentences**: _[Please provide several example sentences]_

### 5. Cultural Notes (if any)
- **Section Title**: _[If there's a culture section]_
- **Content**: _[Any historical/cultural information]_

## Questions for You to Answer

1. **What's the very first thing you see on Lesson 1?** (Title, number, introduction?)

2. **How is the lesson organized?** (Sections, subsections, etc.)

3. **Is there a main story or reading passage?** If so, what's it about?

4. **How is vocabulary presented?** (List format, in context, with declensions?)

5. **What grammar concept is introduced?** (Declensions, verb tenses, etc.)

6. **What types of exercises are there?** (Translation, multiple choice, fill-in?)

7. **Are there any cultural/historical notes?**

8. **How many pages does Lesson 1 span?**

---

## Extraction Template

Once you provide the above information, I'll fill in this template:

```typescript
// Lesson 1 Data Structure
{
  id: 1,
  title: "[Latin Title]",
  subtitle: "[English Title]", 
  description: "[Brief description]",
  objectives: [
    // Will extract from content
  ],
  sections: [
    {
      id: "1-reading",
      title: "[Reading Title]",
      content: "[Reading Content]",
      type: "reading"
    },
    // More sections...
  ],
  vocabulary: [
    {
      id: "1-1",
      latin: "[word]",
      english: "[definition]",
      partOfSpeech: "[noun/verb/etc]",
      lesson: 1,
      difficulty: "easy",
      // More details...
    }
    // More words...
  ],
  grammarPoints: [
    {
      id: "1-grammar-1",
      title: "[Grammar Topic]",
      explanation: "[Explanation]",
      examples: [
        // Examples from PDF
      ],
      rules: [
        // Rules from PDF
      ]
    }
  ],
  exercises: [
    // Will extract exercise questions
  ],
  pageNumbers: [/* page numbers */],
  difficulty: "beginner",
  estimatedTime: 45
}
```
