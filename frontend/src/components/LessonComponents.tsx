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
  X,
  Highlighter
} from 'lucide-react';
import { type Lesson, type VocabWord } from '@/data/lessons';
import VocabularyDriller from '@/components/VocabularyDriller';
import GrammaticalHighlighter from '@/components/GrammaticalHighlighter';
import { lookupWord } from '@/lib/vocabularyLookup';

// Function to render Latin text with clickable words and interlinear definitions
function renderLatinTextWithClickableWords(
  text: string, 
  onWordClick: (word: string, definition: VocabWord | undefined, wordIndex: number) => void,
  interlinearWords: Map<number, VocabWord>
): React.ReactNode {
  // Split text into words while preserving punctuation and spaces
  const parts = text.split(/(\s+|[.,;:!?"()[\]{}])/);
  
  // Pre-calculate word positions to ensure consistency
  const wordPositions: Array<{ part: string; index: number; isWord: boolean }> = [];
  let wordIndex = 0;
  
  parts.forEach((part, index) => {
    if (part.trim()) {
      wordPositions.push({ part, index, isWord: true });
      wordIndex++;
    } else {
      wordPositions.push({ part, index, isWord: false });
    }
  });
  
  // Calculate which lines need spacing and how much
  const linesWithDefinitions = new Map<number, number>(); // line -> number of definitions
  let currentLine = 0;
  
  parts.forEach((part, index) => {
    if (/^\s+$/.test(part) || /^[.,;:!?"()[\]{}]+$/.test(part)) {
      if (part.includes('\n') || part.length > 1) {
        currentLine++;
      }
    } else if (part.trim()) {
      const wordPosition = wordPositions.find(wp => wp.part === part && wp.isWord);
      const currentWordIndex = wordPosition ? wordPositions.indexOf(wordPosition) : -1;
      
      if (interlinearWords.has(currentWordIndex)) {
        const currentCount = linesWithDefinitions.get(currentLine) || 0;
        linesWithDefinitions.set(currentLine, currentCount + 1);
      }
    }
  });
  
  // Reset line counter for rendering
  currentLine = 0;
  
  return parts.map((part, index) => {
    // If it's whitespace or punctuation, render as-is
    if (/^\s+$/.test(part) || /^[.,;:!?"()[\]{}]+$/.test(part)) {
      // Check if this is a line break (multiple spaces or newlines)
      if (part.includes('\n') || part.length > 1) {
        currentLine++;
      }
      return <span key={index}>{part}</span>;
    }
    
    // If it's a word, check for definition and make it clickable
    if (part.trim()) {
      const definition = lookupWord(part);
      
      // Find the word position for this part
      const wordPosition = wordPositions.find(wp => wp.part === part && wp.isWord);
      const currentWordIndex = wordPosition ? wordPositions.indexOf(wordPosition) : -1;
      
      const isInterlinear = interlinearWords.has(currentWordIndex);
      
      // Check if this line needs extra spacing for interlinear definitions
      const needsExtraSpacing = isInterlinear && linesWithDefinitions.has(currentLine);
      
      return (
        <span key={index} className="relative inline-block">
          {/* Add top margin for interlinear spacing - creates space above the current line */}
          {needsExtraSpacing && (
            <div className="pt-10" /> // Reduced height to bring definitions closer
          )}
          
          <span
            className={`${
              definition 
                ? 'cursor-pointer hover:bg-roman-gold/20 hover:text-roman-red hover:underline decoration-roman-gold decoration-2 underline-offset-2 transition-all duration-200 rounded-sm px-1 py-0.5 touch-manipulation active:scale-95' 
                : ''
            }`}
            onClick={() => definition && onWordClick(part, definition, currentWordIndex)}
            title={definition ? 'Tap for definition' : undefined}
          >
            {part}
          </span>
          
          {/* Interlinear definition - positioned within the created space */}
          {isInterlinear && (
            <div className="absolute top-0 left-0 ">
              <div className="bg-white border border-roman-gold/30 rounded-lg shadow-lg px-2 py-1 text-xs font-sans text-roman-black whitespace-nowrap max-w-xs">
                <div className="font-semibold text-roman-red truncate">{interlinearWords.get(currentWordIndex)?.english}</div>
                <div className="text-roman-gold text-xs">{interlinearWords.get(currentWordIndex)?.partOfSpeech}</div>
              </div>
              {/* Arrow pointing down to word */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-white"></div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-1px] w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-roman-gold/30"></div>
            </div>
          )}
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
  const [interlinearWords, setInterlinearWords] = useState<Map<number, VocabWord>>(new Map());
  const [displayMode, setDisplayMode] = useState<'interlinear' | 'bottom' | 'grammar'>('interlinear');

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const handleWordClick = (word: string, definition: VocabWord | undefined, wordIndex: number) => {
    if (!definition) return;
    
    if (displayMode === 'interlinear') {
      // Toggle interlinear display by word index (position)
      const newInterlinearWords = new Map(interlinearWords);
      if (newInterlinearWords.has(wordIndex)) {
        newInterlinearWords.delete(wordIndex);
      } else {
        newInterlinearWords.set(wordIndex, definition);
      }
      setInterlinearWords(newInterlinearWords);
    } else if (displayMode === 'bottom') {
      // Bottom display mode (original behavior)
      const existingIndex = selectedWords.findIndex(item => item.word === word);
      
      if (existingIndex >= 0) {
        // Remove if already selected
        setSelectedWords(prev => prev.filter((_, index) => index !== existingIndex));
      } else {
        // Add new word definition
        setSelectedWords(prev => [...prev, { word, definition }]);
      }
    }
    // Grammar mode handled by GrammaticalHighlighter component
  };

  const clearAllDefinitions = () => {
    setSelectedWords([]);
    setInterlinearWords(new Map());
  };

  const cycleModes = () => {
    setDisplayMode(prev => {
      if (prev === 'interlinear') return 'bottom';
      if (prev === 'bottom') return 'grammar';
      return 'interlinear';
    });
  };

  // Combine all Latin sentences into one continuous text
  const latinText = lesson.prosePassage.sentences
    .sort((a, b) => a.order - b.order)
    .map(sentence => sentence.latin)
    .join(' ');

  return (
    <Card className="glass-effect shadow-roman border-roman-gold/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-roman-cream to-roman-marble border-b border-roman-gold/20 pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl sm:text-2xl font-classical font-bold text-roman-red flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-gold-gradient rounded-lg shadow-gold flex-shrink-0">
                <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="truncate">{lesson.prosePassage.title || 'Reading Passage'}</span>
            </CardTitle>
            {lesson.prosePassage.context && (
              <CardDescription className="mt-2 sm:mt-3 text-muted-foreground text-sm sm:text-base font-classical">
                {lesson.prosePassage.context}
              </CardDescription>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={cycleModes}
              className="glass-effect border-roman-gold/30 hover:bg-roman-gold/10 hover:border-roman-gold shadow-gold font-classical text-xs"
            >
              {displayMode === 'interlinear' && <BookOpen className="h-3 w-3 mr-1" />}
              {displayMode === 'bottom' && <ChevronDown className="h-3 w-3 mr-1" />}
              {displayMode === 'grammar' && <Highlighter className="h-3 w-3 mr-1" />}
              {displayMode === 'interlinear' ? 'Interlinear' : displayMode === 'bottom' ? 'Bottom' : 'Grammar'} Mode
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTranslation}
              className="glass-effect border-roman-gold/30 hover:bg-roman-gold/10 hover:border-roman-gold shadow-gold font-classical w-full sm:w-auto flex-shrink-0"
            >
              {showTranslation ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4 mr-2" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />}
              {showTranslation ? 'Hide' : 'Show'} Translation
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Latin Text */}
        <div className="relative">
          <div className="absolute -left-2 sm:-left-4 top-0 w-0.5 sm:w-1 h-full bg-gold-gradient rounded-full"></div>
          <div className="glass-effect p-4 sm:p-6 lg:p-8 rounded-xl border border-roman-gold/20 shadow-roman">
            {displayMode === 'grammar' ? (
              <GrammaticalHighlighter
                text={latinText}
                sentenceId={lesson.prosePassage.sentences[0]?.id} // Use first sentence for now, could be improved
                grammaticalData={lesson.prosePassage.grammaticalData}
                lessonId={lesson.id}
                className="font-classical text-lg sm:text-xl leading-relaxed text-roman-black tracking-wide"
              />
            ) : (
              <div className="font-classical text-lg sm:text-xl leading-relaxed text-roman-black tracking-wide relative" style={{ lineHeight: '2.5rem' }}>
                {renderLatinTextWithClickableWords(latinText, handleWordClick, interlinearWords)}
              </div>
            )}
            
            {displayMode === 'interlinear' && (
              <div className="mt-2 text-xs text-roman-gold/70 font-sans">
                Interlinear mode active - definitions appear above words
              </div>
            )}
            
            {displayMode === 'grammar' && (
              <div className="mt-2 text-xs text-roman-gold/70 font-sans">
                Grammar mode active - select text to analyze Latin grammatical cases and forms
              </div>
            )}
            
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground flex items-center gap-2 font-classical">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
              <span>
                {displayMode === 'interlinear' 
                  ? 'Tap on any word to see its definition above the text' 
                  : displayMode === 'bottom'
                  ? 'Tap on any word to see its definition below'
                  : 'Select Latin text to analyze its grammatical structure'
                }
              </span>
              {displayMode === 'interlinear' && interlinearWords.size > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInterlinearWords(new Map())}
                  className="ml-auto text-xs border-roman-gold/30 hover:bg-roman-gold/10 hover:border-roman-gold"
                >
                  Clear Interlinear
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Word Definitions Section - Only show in bottom mode */}
        {displayMode === 'bottom' && selectedWords.length > 0 && (
          <div className="relative">
            <div className="absolute -left-2 sm:-left-4 top-0 w-0.5 sm:w-1 h-full bg-roman-gradient rounded-full"></div>
            <div className="glass-effect p-4 sm:p-6 lg:p-8 rounded-xl border border-roman-gold/20 shadow-gold">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-roman-gradient rounded-lg shadow-roman flex-shrink-0">
                    <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className="font-classical font-semibold text-roman-red text-base sm:text-lg">
                    Word Definitions ({selectedWords.length})
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllDefinitions}
                  className="glass-effect border-roman-gold/30 hover:bg-roman-gold/10 hover:border-roman-gold font-classical w-full sm:w-auto"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Clear All
                </Button>
              </div>
              
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {selectedWords.map((item, index) => (
                  <div
                    key={`${item.word}-${index}`}
                    className="group relative glass-effect rounded-xl border border-roman-gold/20 p-4 sm:p-6 shadow-gold"
                  >
                    {/* Gradient corner accent */}
                    <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-gold-gradient rounded-bl-lg rounded-tr-xl opacity-80 shadow-gold"></div>
                    
                    {/* Remove button */}
                    <button
                      onClick={() => setSelectedWords(prev => prev.filter((_, i) => i !== index))}
                      className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-roman-red/80 hover:bg-roman-red text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10 touch-manipulation"
                    >
                      <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </button>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3 pr-6 sm:pr-0">
                      <span className="font-classical font-bold text-lg sm:text-xl text-roman-red group-hover:text-roman-gold transition-colors">
                        {item.definition.latin}
                      </span>
                      <Badge 
                        variant="outline" 
                        className="text-xs bg-roman-cream/80 border-roman-gold/30 text-roman-black px-2 py-1 font-classical self-start sm:self-auto"
                      >
                        {item.definition.partOfSpeech}
                      </Badge>
                    </div>

                    {item.definition.principalParts && (
                      <div className="text-xs text-muted-foreground mb-3 font-classical bg-roman-marble/50 px-3 py-2 rounded-lg border border-roman-gold/20">
                        {item.definition.principalParts}
                      </div>
                    )}

                    <div className="font-medium text-roman-black mb-3 text-sm sm:text-base">
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
            <div className="absolute -left-2 sm:-left-4 top-0 w-0.5 sm:w-1 h-full bg-roman-gradient rounded-full"></div>
            <div className="glass-effect p-4 sm:p-6 lg:p-8 rounded-xl border border-roman-gold/20 shadow-gold">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 bg-roman-gradient rounded-lg shadow-roman flex-shrink-0">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="font-classical font-semibold text-roman-red text-base sm:text-lg">English Translation</span>
              </div>
              <p className="text-roman-black leading-relaxed text-base sm:text-lg font-medium">
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
      <CardHeader className="bg-gradient-to-r from-roman-cream to-roman-marble border-b border-roman-gold/20 pb-4 sm:pb-6">
        <CardTitle className="text-xl sm:text-2xl font-classical font-bold text-roman-red flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-roman-gradient rounded-lg shadow-roman flex-shrink-0">
            <Brain className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </div>
          <span>Vocabulary</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm sm:text-base font-classical">
          New words introduced in this lesson ({lesson.vocabulary.length} words)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lesson.vocabulary.map((word) => (
            <div
              key={word.id}
              className={`group relative glass-effect rounded-xl border border-roman-gold/20 p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-gold hover:-translate-y-1 hover:border-roman-gold/40 touch-manipulation active:scale-95 ${
                selectedWord === word.id ? 'ring-2 ring-roman-gold shadow-gold border-roman-gold/60' : ''
              }`}
              onClick={() => setSelectedWord(selectedWord === word.id ? null : word.id)}
            >
              {/* Gradient corner accent */}
              <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-gold-gradient rounded-bl-lg rounded-tr-xl opacity-80 shadow-gold"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3 pr-6 sm:pr-8">
                <span className="font-classical font-bold text-lg sm:text-xl text-roman-red group-hover:text-roman-gold transition-colors">
                  {word.latin}
                </span>
                <Badge 
                  variant="outline" 
                  className="text-xs bg-roman-cream/80 border-roman-gold/30 text-roman-black px-2 py-1 font-classical self-start sm:self-auto"
                >
                  {word.partOfSpeech}
                </Badge>
              </div>

              {word.principalParts && (
                <div className="text-xs text-muted-foreground mb-3 font-classical bg-roman-marble/50 px-3 py-2 rounded-lg border border-roman-gold/20">
                  {word.principalParts}
                </div>
              )}

              <div className="font-medium text-roman-black mb-3 text-sm sm:text-base">
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
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-roman-gold/20">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-classical font-bold text-roman-red mb-2 flex items-center justify-center gap-2">
              <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-roman-gold" />
              Practice Vocabulary
            </h3>
            <p className="text-muted-foreground font-classical text-sm sm:text-base">
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
  const [sentenceAnswers, setSentenceAnswers] = useState<Record<string, string>>({});
  const [sentenceResults, setSentenceResults] = useState<Record<string, boolean | undefined>>({});
  const [translationAnswers, setTranslationAnswers] = useState<Record<string, string>>({});
  const [translationResults, setTranslationResults] = useState<Record<string, boolean | undefined>>({});

  const toggleAnswer = (sentenceId: string) => {
    const newRevealed = new Set(revealedAnswers);
    if (newRevealed.has(sentenceId)) {
      newRevealed.delete(sentenceId);
    } else {
      newRevealed.add(sentenceId);
    }
    setRevealedAnswers(newRevealed);
  };

  const checkAnswer = (sentenceId: string) => {
    const currentExercise = lesson.practiceExercises[selectedExercise];
    const sentence = currentExercise.sentences.find(s => s.id === sentenceId);
    const userAnswer = sentenceAnswers[sentenceId];
    
    if (sentence && userAnswer) {
      const isCorrect = userAnswer === sentence.correctAnswer;
      setSentenceResults(prev => ({ ...prev, [sentenceId]: isCorrect }));
      
      if (isCorrect) {
        // Mark as correct and keep the answer
        // The word is effectively "used up" from the word bank
      } else {
        // Return the word to the word bank by clearing the answer
        setSentenceAnswers(prev => ({ ...prev, [sentenceId]: '' }));
        // Clear the result so user can try again
        setSentenceResults(prev => ({ ...prev, [sentenceId]: undefined }));
      }
    }
  };

  const checkTranslation = (sentenceId: string) => {
    const currentExercise = lesson.practiceExercises[selectedExercise];
    const sentence = currentExercise.sentences.find(s => s.id === sentenceId);
    const userTranslation = translationAnswers[sentenceId];
    
    if (sentence && userTranslation && sentence.translation) {
      // Simple case-insensitive comparison for now
      const isCorrect = userTranslation.toLowerCase().trim() === sentence.translation.toLowerCase().trim();
      setTranslationResults(prev => ({ ...prev, [sentenceId]: isCorrect }));
      
      // Always set the result, don't clear it for incorrect answers
      // This ensures the feedback section always appears
    }
  };

  const handleDrop = (sentenceId: string, e: React.DragEvent) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain');
    setSentenceAnswers(prev => ({ ...prev, [sentenceId]: word }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getAvailableWords = () => {
    const currentExercise = lesson.practiceExercises[selectedExercise];
    if (currentExercise.type !== 'fill-in-blank' || !currentExercise.wordBank) {
      return [];
    }
    
    // Get all used words
    const usedWords = Object.values(sentenceAnswers).filter(word => word);
    
    // Return words that haven't been used yet
    return currentExercise.wordBank.filter(word => !usedWords.includes(word));
  };

  const highlightDifferences = (userAnswer: string, correctAnswer: string) => {
    const userWords = userAnswer.toLowerCase().trim().split(/\s+/);
    const correctWords = correctAnswer.toLowerCase().trim().split(/\s+/);
    
    const result: React.ReactNode[] = [];
    const maxLength = Math.max(userWords.length, correctWords.length);
    
    for (let i = 0; i < maxLength; i++) {
      const userWord = userWords[i] || '';
      const correctWord = correctWords[i] || '';
      
      if (i > 0) result.push(' ');
      
      if (userWord === correctWord) {
        // Words match exactly
        result.push(<span key={i} className="text-green-700 font-medium">{correctWord}</span>);
      } else if (userWord && correctWord) {
        // Both words exist but are different
        result.push(<span key={i} className="text-red-700 line-through">{userWord}</span>);
        result.push(' ');
        result.push(<span key={i + '-correct'} className="text-red-700 font-medium">{correctWord}</span>);
      } else if (userWord && !correctWord) {
        // User has extra word
        result.push(<span key={i} className="text-red-700 line-through">{userWord}</span>);
      } else if (!userWord && correctWord) {
        // User is missing word
        result.push(<span key={i} className="text-red-700 font-medium">{correctWord}</span>);
      }
    }
    
    return result;
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
            ) : exercise.type === 'english-to-latin' ? (
              <>
                <span className="text-sm mr-2">English</span>
                →
                <span className="font-classical text-sm ml-2">Latin</span>
              </>
            ) : exercise.type === 'translation-only' ? (
              <>
                <span className="font-classical text-sm">Practice C</span>
              </>
            ) : (
              <>
                <span className="font-classical text-sm">{exercise.title.includes('Practice A') ? 'Practice A' : 'Practice B'}</span>
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
            {lesson.practiceExercises[selectedExercise].type === 'fill-in-blank' && lesson.practiceExercises[selectedExercise].description && (
              <div className="text-roman-black text-base font-classical mt-2">
                {lesson.practiceExercises[selectedExercise].description}
              </div>
            )}
            {lesson.practiceExercises[selectedExercise].type === 'fill-in-blank' && lesson.practiceExercises[selectedExercise].example && (
              <div className="bg-gradient-to-br from-roman-cream/60 to-roman-marble/40 p-4 rounded-lg border border-roman-gold/20 mt-4">
                <div className="text-sm font-classical font-semibold text-roman-gold mb-2 flex items-center gap-2">
                  📝 Example:
                </div>
                <div className="space-y-2 text-roman-black font-classical">
                  <div><span className="font-medium">Incomplete:</span> {lesson.practiceExercises[selectedExercise].example?.incomplete}</div>
                  <div><span className="font-medium">Complete:</span> {lesson.practiceExercises[selectedExercise].example?.complete}</div>
                  <div><span className="font-medium">Translation:</span> {lesson.practiceExercises[selectedExercise].example?.translation}</div>
                </div>
              </div>
            )}
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
                          {lesson.practiceExercises[selectedExercise].type === 'fill-in-blank' 
                            ? sentence.incomplete 
                            : lesson.practiceExercises[selectedExercise].type === 'translation-only'
                            ? sentence.latin
                            : sentence.source}
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

                      {/* Fill in the Blank Exercise - ONLY for fill-in-blank type */}
                      {lesson.practiceExercises[selectedExercise].type === 'fill-in-blank' && (
                        <div className="space-y-4">
                          {/* Word Bank */}
                          <div className="bg-gradient-to-br from-roman-cream/60 to-roman-marble/40 p-4 rounded-lg border border-roman-gold/20">
                            <div className="text-sm font-classical font-semibold text-roman-gold mb-3 flex items-center gap-2">
                              📚 Word Bank:
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {getAvailableWords().map((word, wordIndex) => (
                                <div
                                  key={wordIndex}
                                  className="px-3 py-2 bg-white border-2 border-roman-gold/30 rounded-lg text-roman-black font-classical font-medium cursor-pointer hover:bg-roman-gold/10 hover:border-roman-gold transition-all shadow-sm"
                                  draggable
                                  onDragStart={(e) => e.dataTransfer.setData('text/plain', word)}
                                >
                                  {word}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Answer Input */}
                          <div className="bg-gradient-to-br from-roman-marble/50 to-roman-cream/30 p-4 rounded-lg border border-roman-gold/20">
                            <div className="text-sm font-classical font-semibold text-roman-gold mb-3 flex items-center gap-2">
                              ✏️ Your Answer:
                            </div>
                            <div className="flex items-center gap-3">
                              <div 
                                className="flex-1 min-h-[48px] bg-white border-2 border-roman-gold/30 rounded-lg p-3 flex items-center justify-center text-roman-black font-classical font-medium"
                                onDrop={(e) => handleDrop(sentence.id, e)}
                                onDragOver={handleDragOver}
                                style={{ 
                                  borderColor: sentenceAnswers[sentence.id] ? '#d97706' : '#fbbf24',
                                  backgroundColor: sentenceAnswers[sentence.id] ? '#fef3c7' : '#ffffff'
                                }}
                              >
                                {sentenceAnswers[sentence.id] || 'Drop word here'}
                              </div>
                              <Button
                                variant="outline"
                                onClick={() => checkAnswer(sentence.id)}
                                disabled={!sentenceAnswers[sentence.id]}
                                className="glass-effect border-roman-gold/30 hover:bg-roman-gold/10 hover:border-roman-gold shadow-gold transition-all font-classical"
                              >
                                Check
                              </Button>
                            </div>
                          </div>

                          {/* Feedback */}
                          {sentenceResults[sentence.id] !== undefined && (
                            <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                              sentenceResults[sentence.id] 
                                ? 'bg-green-50 border-green-200 text-green-800' 
                                : 'bg-red-50 border-red-200 text-red-800'
                            }`}>
                              <div className="flex items-center gap-2 font-classical font-semibold">
                                {sentenceResults[sentence.id] ? (
                                  <>
                                    <span className="text-green-600">✅ Correct!</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-red-600">❌ Incorrect</span>
                                  </>
                                )}
                              </div>
                              {!sentenceResults[sentence.id] && (
                                <div className="mt-2 text-sm">
                                  <span className="text-red-700">
                                    <span className="font-medium">Correct answer:</span> {sentence.correctAnswer}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}



                      {/* Translation-Only Exercise */}
                      {lesson.practiceExercises[selectedExercise].type === 'translation-only' && (
                        <div className="space-y-4">
                          {/* Latin Text Display */}
                          

                          {/* Translation Input */}
                          <div className="bg-gradient-to-br from-roman-marble/50 to-roman-cream/30 p-4 rounded-lg border border-roman-gold/20">
                            <div className="text-sm font-classical font-semibold text-roman-gold mb-3 flex items-center gap-2">
                              🌐 Translate to English:
                            </div>
                            <div className="flex items-center gap-3">
                              <input
                                type="text"
                                placeholder="Type your English translation here..."
                                value={translationAnswers[sentence.id] || ''}
                                onChange={(e) => setTranslationAnswers(prev => ({ ...prev, [sentence.id]: e.target.value }))}
                                className="flex-1 px-3 py-2 bg-white border-2 border-roman-gold/30 rounded-lg text-roman-black font-classical font-medium focus:outline-none focus:border-roman-gold transition-all"
                              />
                              <Button
                                variant="outline"
                                onClick={() => checkTranslation(sentence.id)}
                                disabled={!translationAnswers[sentence.id]}
                                className="glass-effect border-roman-gold/30 hover:bg-roman-gold/10 hover:border-roman-gold shadow-gold transition-all font-classical"
                              >
                                Check
                              </Button>
                            </div>
                          </div>

                          {/* Translation Feedback */}
                          {translationResults[sentence.id] !== undefined && (
                            <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                              translationResults[sentence.id] 
                                ? 'bg-green-50 border-green-200 text-green-800' 
                                : 'bg-red-50 border-red-200 text-red-800'
                            }`}>
                              <div className="flex items-center gap-2 font-classical font-semibold">
                                {translationResults[sentence.id] ? (
                                  <>
                                    <span className="text-green-600">✅ Correct Translation!</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-red-600">❌ Incorrect Translation</span>
                                  </>
                                )}
                              </div>
                              {!translationResults[sentence.id] && sentence.translation && (
                                <div className="mt-2 text-sm">
                                  <span className="text-red-700">
                                    <span className="font-medium">Your answer:</span> {translationAnswers[sentence.id]}
                                  </span>
                                  <br />
                                  <span className="text-red-700">
                                    <span className="font-medium">Correct answer:</span> {highlightDifferences(translationAnswers[sentence.id], sentence.translation)}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
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
                          {lesson.practiceExercises[selectedExercise].type === 'fill-in-blank' ? (
                            <>
                              <div className="font-medium text-roman-black text-lg mb-2 font-classical">{sentence.complete}</div>
                              <div className="font-medium text-roman-black text-base mb-2 font-classical">{sentence.translation}</div>
                            </>
                          ) : lesson.practiceExercises[selectedExercise].type === 'translation-only' ? (
                            <>
                              <div className="font-medium text-roman-black text-lg mb-2 font-classical">{sentence.latin}</div>
                              <div className="font-medium text-roman-black text-base mb-2 font-classical">{sentence.translation}</div>
                            </>
                          ) : (
                            <div className="font-medium text-roman-black text-lg mb-2 font-classical">{sentence.target}</div>
                          )}
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
