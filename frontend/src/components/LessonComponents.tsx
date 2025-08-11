import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  Eye,
  EyeOff,
  MessageCircle,
  ChevronDown,
  X
} from 'lucide-react';
import { type Lesson, type VocabWord } from '@/data/lessons';
import VocabularyDriller from '@/components/VocabularyDriller';
import { lookupWord } from '@/lib/vocabularyLookup';

// Function to render Latin text with clickable words
function renderLatinTextWithClickableWords(
  text: string, 
  onWordClick: (word: string, definition: VocabWord | undefined) => void
): React.ReactNode {
  // Split text into words while preserving punctuation and spaces
  const parts = text.split(/(\s+|[.,;:!?"()[\]{}])/);
  
  return parts.map((part, index) => {
    // If it's whitespace or punctuation, render as-is
    if (/^\s+$/.test(part) || /^[.,;:!?"()[\]{}]+$/.test(part)) {
      return <span key={index}>{part}</span>;
    }
    
    // If it's a word, check for definition and make it clickable
    if (part.trim()) {
      const definition = lookupWord(part);
      return (
        <span
          key={index}
          className={`${
            definition 
              ? 'cursor-pointer hover:bg-roman-gold/20 hover:text-roman-red hover:underline decoration-roman-gold decoration-2 underline-offset-2 transition-all duration-200 rounded-sm px-1 py-0.5' 
              : ''
          }`}
          onClick={() => definition && onWordClick(part, definition)}
          title={definition ? 'Click for definition' : undefined}
        >
          {part}
        </span>
      );
    }
    
    return <span key={index}>{part}</span>;
  });
}

// Component for displaying the prose passage as continuous text
export function ProsePassage({ lesson }: { lesson: Lesson }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedWords, setSelectedWords] = useState<Array<{ word: string; definition: VocabWord }>>([]);

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const handleWordClick = (word: string, definition: VocabWord | undefined) => {
    if (!definition) return;
    
    // Check if word is already selected
    const existingIndex = selectedWords.findIndex(item => item.word === word);
    
    if (existingIndex >= 0) {
      // Remove if already selected
      setSelectedWords(prev => prev.filter((_, index) => index !== existingIndex));
    } else {
      // Add new word definition
      setSelectedWords(prev => [...prev, { word, definition }]);
    }
  };

  const clearAllDefinitions = () => {
    setSelectedWords([]);
  };

  // Combine all Latin sentences into one continuous text
  const latinText = lesson.prosePassage.sentences
    .sort((a, b) => a.order - b.order)
    .map(sentence => sentence.latin)
    .join(' ');

  return (
    <Card className="glass-effect shadow-roman border-roman-gold/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-roman-cream to-roman-marble border-b border-roman-gold/20 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-classical font-bold text-roman-red flex items-center gap-3">
              <div className="p-2 bg-gold-gradient rounded-lg shadow-gold">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              {lesson.prosePassage.title || 'Reading Passage'}
            </CardTitle>
            {lesson.prosePassage.context && (
              <CardDescription className="mt-3 text-muted-foreground text-base font-classical">
                {lesson.prosePassage.context}
              </CardDescription>
            )}
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={toggleTranslation}
            className="glass-effect border-roman-gold/30 hover:bg-roman-gold/10 hover:border-roman-gold shadow-gold font-classical"
          >
            {showTranslation ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showTranslation ? 'Hide' : 'Show'} Translation
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Latin Text */}
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gold-gradient rounded-full"></div>
          <div className="glass-effect p-8 rounded-xl border border-roman-gold/20 shadow-roman">
            <div className="font-classical text-xl leading-relaxed text-roman-black tracking-wide">
              {renderLatinTextWithClickableWords(latinText, handleWordClick)}
            </div>
            <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2 font-classical">
              <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
              Click on any word to see its definition below
            </div>
          </div>
        </div>

        {/* Word Definitions Section */}
        {selectedWords.length > 0 && (
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-roman-gradient rounded-full"></div>
            <div className="glass-effect p-8 rounded-xl border border-roman-gold/20 shadow-gold">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-roman-gradient rounded-lg shadow-roman">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-classical font-semibold text-roman-red text-lg">
                    Word Definitions ({selectedWords.length})
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllDefinitions}
                  className="glass-effect border-roman-gold/30 hover:bg-roman-gold/10 hover:border-roman-gold font-classical"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {selectedWords.map((item, index) => (
                  <div
                    key={`${item.word}-${index}`}
                    className="group relative glass-effect rounded-xl border border-roman-gold/20 p-6 shadow-gold"
                  >
                    {/* Gradient corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gold-gradient rounded-bl-lg rounded-tr-xl opacity-80 shadow-gold"></div>
                    
                    {/* Remove button */}
                    <button
                      onClick={() => setSelectedWords(prev => prev.filter((_, i) => i !== index))}
                      className="absolute top-2 right-2 w-6 h-6 bg-roman-red/80 hover:bg-roman-red text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-classical font-bold text-xl text-roman-red group-hover:text-roman-gold transition-colors">
                        {item.definition.latin}
                      </span>
                      <Badge 
                        variant="outline" 
                        className="text-xs bg-roman-cream/80 border-roman-gold/30 text-roman-black px-2 py-1 font-classical"
                      >
                        {item.definition.partOfSpeech}
                      </Badge>
                    </div>

                    {item.definition.principalParts && (
                      <div className="text-xs text-muted-foreground mb-3 font-classical bg-roman-marble/50 px-3 py-2 rounded-lg border border-roman-gold/20">
                        {item.definition.principalParts}
                      </div>
                    )}

                    <div className="font-medium text-roman-black mb-3">
                      {item.definition.english}
                    </div>

                    {item.definition.etymology && (
                      <div className="bg-gradient-to-br from-roman-cream/50 to-roman-marble/30 border border-roman-gold/20 rounded-lg p-3 mb-2">
                        <span className="text-xs font-classical font-semibold text-roman-gold">Etymology: </span>
                        <span className="text-xs text-roman-black">{item.definition.etymology}</span>
                      </div>
                    )}
                    
                    {item.definition.notes && (
                      <div className="bg-gradient-to-br from-roman-marble/50 to-roman-cream/30 border border-roman-gold/20 rounded-lg p-3">
                        <span className="text-xs font-classical font-semibold text-roman-red">Notes: </span>
                        <span className="text-xs text-roman-black">{item.definition.notes}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Translation */}
        {showTranslation && lesson.prosePassage.fullTranslation && (
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-roman-gradient rounded-full"></div>
            <div className="glass-effect p-8 rounded-xl border border-roman-gold/20 shadow-gold">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-roman-gradient rounded-lg shadow-roman">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <span className="font-classical font-semibold text-roman-red text-lg">English Translation</span>
              </div>
              <p className="text-roman-black leading-relaxed text-lg font-medium">
                {lesson.prosePassage.fullTranslation}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Component for displaying vocabulary with principal parts
export function VocabularySection({ lesson }: { lesson: Lesson }) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  return (
    <Card className="glass-effect shadow-roman border-roman-gold/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-roman-cream to-roman-marble border-b border-roman-gold/20 pb-6">
        <CardTitle className="text-2xl font-classical font-bold text-roman-red flex items-center gap-3">
          <div className="p-2 bg-roman-gradient rounded-lg shadow-roman">
            <Brain className="h-6 w-6 text-white" />
          </div>
          Vocabulary
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base font-classical">
          New words introduced in this lesson ({lesson.vocabulary.length} words)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lesson.vocabulary.map((word) => (
            <div
              key={word.id}
              className={`group relative glass-effect rounded-xl border border-roman-gold/20 p-6 cursor-pointer transition-all duration-300 hover:shadow-gold hover:-translate-y-1 hover:border-roman-gold/40 ${
                selectedWord === word.id ? 'ring-2 ring-roman-gold shadow-gold border-roman-gold/60' : ''
              }`}
              onClick={() => setSelectedWord(selectedWord === word.id ? null : word.id)}
            >
              {/* Gradient corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gold-gradient rounded-bl-lg rounded-tr-xl opacity-80 shadow-gold"></div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="font-classical font-bold text-xl text-roman-red group-hover:text-roman-gold transition-colors">
                  {word.latin}
                </span>
                <Badge 
                  variant="outline" 
                  className="text-xs bg-roman-cream/80 border-roman-gold/30 text-roman-black px-2 py-1 font-classical"
                >
                  {word.partOfSpeech}
                </Badge>
              </div>

              {word.principalParts && (
                <div className="text-xs text-muted-foreground mb-3 font-classical bg-roman-marble/50 px-3 py-2 rounded-lg border border-roman-gold/20">
                  {word.principalParts}
                </div>
              )}

              <div className="font-medium text-roman-black mb-3">
                {word.english}
              </div>

              {selectedWord === word.id && (
                <div className="mt-4 pt-4 border-t border-roman-gold/20 space-y-3 animate-in slide-in-from-top-2 duration-200">
                  {word.etymology && (
                    <div className="bg-gradient-to-br from-roman-cream/50 to-roman-marble/30 border border-roman-gold/20 rounded-lg p-3">
                      <span className="text-xs font-classical font-semibold text-roman-gold">Etymology: </span>
                      <span className="text-xs text-roman-black">{word.etymology}</span>
                    </div>
                  )}
                  
                  {word.notes && (
                    <div className="bg-gradient-to-br from-roman-marble/50 to-roman-cream/30 border border-roman-gold/20 rounded-lg p-3">
                      <span className="text-xs font-classical font-semibold text-roman-red">Notes: </span>
                      <span className="text-xs text-roman-black">{word.notes}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-gold-gradient text-white border-none font-classical shadow-gold"
                    >
                      Difficulty: {word.difficulty}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Vocabulary Practice Section */}
        <div className="mt-12 pt-8 border-t border-roman-gold/20">
          <div className="text-center mb-8">
            <h3 className="text-xl font-classical font-bold text-roman-red mb-2 flex items-center justify-center gap-2">
              <Brain className="h-6 w-6 text-roman-gold" />
              Practice Vocabulary
            </h3>
            <p className="text-muted-foreground font-classical">
              Test your knowledge with interactive vocabulary drills
            </p>
          </div>
          
          <div className="flex justify-center">
            <VocabularyDriller 
              selectedLesson={lesson.id} 
              allowLessonSelection={false}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Component for displaying grammar concepts with charts and examples
export function GrammarSection({ lesson }: { lesson: Lesson }) {
  const [expandedConcepts, setExpandedConcepts] = useState<Set<string>>(new Set());

  const toggleConcept = (conceptId: string) => {
    const newExpanded = new Set(expandedConcepts);
    if (newExpanded.has(conceptId)) {
      newExpanded.delete(conceptId);
    } else {
      newExpanded.add(conceptId);
    }
    setExpandedConcepts(newExpanded);
  };

  const gradients = [
    'from-roman-cream to-roman-marble',
    'from-roman-marble to-roman-cream', 
    'from-roman-cream/80 to-roman-marble/60',
    'from-roman-marble/80 to-roman-cream/60',
    'from-roman-cream/60 to-roman-marble/80',
    'from-roman-marble/60 to-roman-cream/80',
    'from-roman-cream/90 to-roman-marble/70'
  ];

  const iconGradients = [
    'bg-roman-gradient',
    'bg-gold-gradient',
    'bg-roman-gradient',
    'bg-gold-gradient',
    'bg-roman-gradient',
    'bg-gold-gradient',
    'bg-roman-gradient'
  ];

  return (
    <div className="space-y-8">
      {lesson.keyConcepts.map((concept, index) => {
        const isExpanded = expandedConcepts.has(concept.id);
        const gradient = gradients[index % gradients.length];
        const iconGradient = iconGradients[index % iconGradients.length];
        
        return (
          <Card key={concept.id} className="glass-effect shadow-roman border-roman-gold/20 overflow-hidden">
            <CardHeader 
              className={`cursor-pointer bg-gradient-to-r ${gradient} border-b border-roman-gold/20 pb-6 transition-all hover:shadow-gold`} 
              onClick={() => toggleConcept(concept.id)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-classical font-bold text-roman-red flex items-center gap-3">
                  <div className={`p-2 ${iconGradient} rounded-lg shadow-roman`}>
                    <ChevronDown className={`h-5 w-5 text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  {concept.title}
                </CardTitle>
                <div className="text-muted-foreground font-classical">
                  {isExpanded ? 'Click to collapse' : 'Click to expand'}
                </div>
              </div>
            </CardHeader>

            {isExpanded && (
              <CardContent className="p-8 space-y-8 animate-in slide-in-from-top-4 duration-300">
                {/* Main explanation */}
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-roman-black leading-relaxed glass-effect p-6 rounded-xl border border-roman-gold/20">
                    {concept.explanation}
                  </div>
                </div>

                {/* Rules */}
                {concept.rules.length > 0 && (
                  <div className="bg-gradient-to-br from-roman-cream/50 to-roman-marble/30 p-6 rounded-xl border border-roman-gold/20">
                    <h4 className="font-classical font-bold text-lg text-roman-gold mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                      Rules
                    </h4>
                    <ul className="space-y-3">
                      {concept.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="inline-block w-6 h-6 bg-gold-gradient text-white text-xs font-classical font-bold rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 shadow-gold">
                            {index + 1}
                          </span>
                          <span className="text-roman-black leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Charts/Tables */}
                {concept.charts && concept.charts.length > 0 && (
                  <div className="space-y-6">
                    {concept.charts.map((chart, chartIndex) => (
                      <div key={chartIndex} className="bg-gradient-to-br from-roman-marble/50 to-roman-cream/30 p-6 rounded-xl border border-roman-gold/20">
                        <h4 className="font-classical font-bold text-lg text-roman-red mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                          {chart.title}
                        </h4>
                        <div className="overflow-hidden rounded-lg border border-roman-gold/30 shadow-roman">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-roman-gradient">
                                {chart.headers.map((header, headerIndex) => (
                                  <th key={headerIndex} className="border-r border-roman-gold/20 p-4 text-left font-classical font-bold text-white last:border-r-0">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="glass-effect">
                              {chart.rows.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-roman-gold/10 transition-colors">
                                  {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="border-r border-roman-gold/10 p-4 font-classical text-roman-black last:border-r-0">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Examples */}
                {concept.examples.length > 0 && (
                  <div className="bg-gradient-to-br from-roman-cream/60 to-roman-marble/40 p-6 rounded-xl border border-roman-gold/20">
                    <h4 className="font-classical font-bold text-lg text-roman-gold mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                      Examples
                    </h4>
                    <div className="space-y-4">
                      {concept.examples.map((example, index) => (
                        <div key={index} className="glass-effect p-6 rounded-lg border border-roman-gold/20 shadow-gold">
                          <div className="font-classical text-lg font-medium text-roman-red mb-2">{example.latin}</div>
                          <div className="text-muted-foreground mb-3 italic">{example.english}</div>
                          {example.notes && (
                            <div className="text-sm text-roman-black bg-roman-cream/50 p-3 rounded-lg border border-roman-gold/20 font-classical">
                              <strong>Note:</strong> {example.notes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}

// Component for practice exercises
export function PracticeSection({ lesson }: { lesson: Lesson }) {
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

  const toggleAnswer = (sentenceId: string) => {
    const newRevealed = new Set(revealedAnswers);
    if (newRevealed.has(sentenceId)) {
      newRevealed.delete(sentenceId);
    } else {
      newRevealed.add(sentenceId);
    }
    setRevealedAnswers(newRevealed);
  };

  return (
    <div className="space-y-8">
      {/* Exercise Type Selector */}
      <div className="flex gap-4 p-2 glass-effect rounded-xl border border-roman-gold/20 shadow-gold">
        {lesson.practiceExercises.map((exercise, index) => (
          <Button
            key={exercise.id}
            variant={selectedExercise === index ? "default" : "ghost"}
            onClick={() => setSelectedExercise(index)}
            className={`flex-1 h-12 rounded-lg font-classical font-medium transition-all ${
              selectedExercise === index 
                ? 'bg-roman-gradient text-white shadow-roman' 
                : 'text-roman-black hover:bg-roman-gold/10 hover:text-roman-red'
            }`}
          >
            {exercise.type === 'latin-to-english' ? (
              <>
                <span className="font-classical text-sm mr-2">Latin</span>
                →
                <span className="text-sm ml-2">English</span>
              </>
            ) : (
              <>
                <span className="text-sm mr-2">English</span>
                →
                <span className="font-classical text-sm ml-2">Latin</span>
              </>
            )}
          </Button>
        ))}
      </div>

      {/* Current Exercise */}
      {lesson.practiceExercises[selectedExercise] && (
        <Card className="glass-effect shadow-roman border-roman-gold/20 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-roman-cream to-roman-marble border-b border-roman-gold/20 pb-6">
            <CardTitle className="text-2xl font-classical font-bold text-roman-red flex items-center gap-3">
              <div className="p-2 bg-gold-gradient rounded-lg shadow-gold">
                <ChevronDown className="h-6 w-6 text-white" />
              </div>
              {lesson.practiceExercises[selectedExercise].title}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base font-classical">
              {lesson.practiceExercises[selectedExercise].sentences.length} sentences to practice
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {lesson.practiceExercises[selectedExercise].sentences.map((sentence, index) => (
                <div key={sentence.id} className="group glass-effect rounded-xl border border-roman-gold/20 p-6 shadow-gold hover:shadow-roman hover:border-roman-gold/40 transition-all duration-300">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      {/* Question Number */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-roman-gradient text-white text-sm font-classical font-bold rounded-full flex items-center justify-center shadow-roman">
                          {index + 1}
                        </div>
                        <span className="text-muted-foreground text-sm font-classical font-medium">Question {index + 1}</span>
                      </div>

                      {/* Source Text */}
                      <div className="bg-gradient-to-br from-roman-marble/50 to-roman-cream/30 p-4 rounded-lg border border-roman-gold/20">
                        <div className="font-medium text-lg text-roman-black leading-relaxed font-classical">
                          {sentence.source}
                        </div>
                      </div>

                      {/* Hints */}
                      {sentence.hints && sentence.hints.length > 0 && (
                        <div className="bg-gradient-to-br from-roman-cream/60 to-roman-marble/40 p-4 rounded-lg border border-roman-gold/20">
                          <div className="text-sm font-classical font-semibold text-roman-gold mb-2 flex items-center gap-2">
                            💡 Hints:
                          </div>
                          <ul className="text-sm text-roman-black space-y-1">
                            {sentence.hints.map((hint, hintIndex) => (
                              <li key={hintIndex} className="flex items-start gap-2">
                                <span className="text-roman-gold mt-1">•</span>
                                <span>{hint}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Show Answer Button */}
                      <Button
                        variant="outline"
                        onClick={() => toggleAnswer(sentence.id)}
                        className="glass-effect border-roman-gold/30 hover:bg-roman-gold/10 hover:border-roman-gold shadow-gold transition-all font-classical"
                      >
                        {revealedAnswers.has(sentence.id) ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Hide Answer
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Show Answer
                          </>
                        )}
                      </Button>

                      {/* Answer */}
                      {revealedAnswers.has(sentence.id) && (
                        <div className="bg-gradient-to-br from-roman-cream/70 to-roman-marble/50 p-4 rounded-lg border border-roman-gold/20 animate-in slide-in-from-top-2 duration-300 shadow-gold">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                            <span className="font-classical font-semibold text-roman-red">Answer:</span>
                          </div>
                          <div className="font-medium text-roman-black text-lg mb-2 font-classical">{sentence.target}</div>
                          {sentence.notes && (
                            <div className="text-sm text-roman-black bg-roman-marble/50 p-3 rounded-lg border border-roman-gold/20 font-classical">
                              <strong>Note:</strong> {sentence.notes}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
