import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  CheckCircle, 
  PenTool, 
  Target, 
  Trophy,
  Clock,
  FileText,
  Languages,
  BookOpenCheck,
  Lightbulb,
  Sparkles,
  Globe,
  ArrowRight,
  Star,
  Eye,
  EyeOff,
  MessageCircle,
  ChevronDown
} from 'lucide-react';
import { type Lesson, type LessonSection } from '@/data/lessons';
import VocabularyDriller from '@/components/VocabularyDriller';

// Component for displaying the prose passage as continuous text
export function ProsePassage({ lesson }: { lesson: Lesson }) {
  const [showTranslation, setShowTranslation] = useState(false);

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  // Combine all Latin sentences into one continuous text
  const latinText = lesson.prosePassage.sentences
    .sort((a, b) => a.order - b.order)
    .map(sentence => sentence.latin)
    .join(' ');

  return (
    <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl shadow-slate-200/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100/50 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg">
                <BookOpen className="h-6 w-6 text-amber-700" />
              </div>
              {lesson.prosePassage.title || 'Reading Passage'}
            </CardTitle>
            {lesson.prosePassage.context && (
              <CardDescription className="mt-3 text-slate-600 text-base">
                {lesson.prosePassage.context}
              </CardDescription>
            )}
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={toggleTranslation}
            className="bg-white/80 border-amber-200 hover:bg-amber-50 hover:border-amber-300 shadow-sm"
          >
            {showTranslation ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showTranslation ? 'Hide' : 'Show'} Translation
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Latin Text */}
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200/50 shadow-inner">
            <div className="font-serif text-xl leading-relaxed text-slate-800 tracking-wide">
              {latinText}
            </div>
          </div>
        </div>

        {/* Translation */}
        {showTranslation && lesson.prosePassage.fullTranslation && (
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-semibold text-blue-800 text-lg">English Translation</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg font-medium">
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
    <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl shadow-slate-200/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100/50 pb-6">
        <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg">
            <Brain className="h-6 w-6 text-emerald-700" />
          </div>
          Vocabulary
        </CardTitle>
        <CardDescription className="text-slate-600 text-base">
          New words introduced in this lesson ({lesson.vocabulary.length} words)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lesson.vocabulary.map((word) => (
            <div
              key={word.id}
              className={`group relative bg-white rounded-xl border border-slate-200/50 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100/50 hover:-translate-y-1 hover:border-emerald-200 ${
                selectedWord === word.id ? 'ring-2 ring-emerald-400 shadow-lg shadow-emerald-100/50 border-emerald-300' : ''
              }`}
              onClick={() => setSelectedWord(selectedWord === word.id ? null : word.id)}
            >
              {/* Gradient corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-emerald-400 to-emerald-500 rounded-bl-lg rounded-tr-xl opacity-80"></div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-xl text-slate-800 group-hover:text-emerald-700 transition-colors">
                  {word.latin}
                </span>
                <Badge 
                  variant="outline" 
                  className="text-xs bg-emerald-50 border-emerald-200 text-emerald-700 px-2 py-1"
                >
                  {word.partOfSpeech}
                </Badge>
              </div>

              {word.principalParts && (
                <div className="text-xs text-slate-500 mb-3 font-mono bg-slate-50 px-3 py-2 rounded-lg border">
                  {word.principalParts}
                </div>
              )}

              <div className="font-medium text-slate-700 mb-3">
                {word.english}
              </div>

              {selectedWord === word.id && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in slide-in-from-top-2 duration-200">
                  {word.etymology && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <span className="text-xs font-semibold text-amber-700">Etymology: </span>
                      <span className="text-xs text-amber-600">{word.etymology}</span>
                    </div>
                  )}
                  
                  {word.notes && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <span className="text-xs font-semibold text-blue-700">Notes: </span>
                      <span className="text-xs text-blue-600">{word.notes}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 border border-slate-300"
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
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
              <Brain className="h-6 w-6 text-emerald-600" />
              Practice Vocabulary
            </h3>
            <p className="text-slate-600">
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
    'from-blue-50 to-indigo-50',
    'from-blue-50 to-cyan-50', 
    'from-green-50 to-emerald-50',
    'from-orange-50 to-amber-50',
    'from-indigo-50 to-purple-50',
    'from-teal-50 to-blue-50',
    'from-yellow-50 to-orange-50'
  ];

  const iconColors = [
    'text-purple-600 from-purple-100 to-purple-200',
    'text-blue-600 from-blue-100 to-blue-200',
    'text-green-600 from-green-100 to-green-200', 
    'text-orange-600 from-orange-100 to-orange-200',
    'text-indigo-600 from-indigo-100 to-indigo-200',
    'text-teal-600 from-teal-100 to-teal-200',
    'text-yellow-600 from-yellow-100 to-yellow-200'
  ];

  return (
    <div className="space-y-8">
      {lesson.keyConcepts.map((concept, index) => {
        const isExpanded = expandedConcepts.has(concept.id);
        const gradient = gradients[index % gradients.length];
        const iconColor = iconColors[index % iconColors.length];
        
        return (
          <Card key={concept.id} className="border-0 bg-white/70 backdrop-blur-sm shadow-xl shadow-slate-200/50 overflow-hidden">
            <CardHeader 
              className={`cursor-pointer bg-gradient-to-r ${gradient} border-b border-slate-100/50 pb-6 transition-all hover:shadow-md`} 
              onClick={() => toggleConcept(concept.id)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                  <div className={`p-2 bg-gradient-to-br ${iconColor} rounded-lg`}>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  {concept.title}
                </CardTitle>
                <div className="text-slate-500">
                  {isExpanded ? 'Click to collapse' : 'Click to expand'}
                </div>
              </div>
            </CardHeader>

            {isExpanded && (
              <CardContent className="p-8 space-y-8 animate-in slide-in-from-top-4 duration-300">
                {/* Main explanation */}
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-200/50">
                    {concept.explanation}
                  </div>
                </div>

                {/* Rules */}
                {concept.rules.length > 0 && (
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200/50">
                    <h4 className="font-bold text-lg text-amber-800 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      Rules
                    </h4>
                    <ul className="space-y-3">
                      {concept.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="inline-block w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-slate-700 leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Charts/Tables */}
                {concept.charts && concept.charts.length > 0 && (
                  <div className="space-y-6">
                    {concept.charts.map((chart, chartIndex) => (
                      <div key={chartIndex} className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200/50">
                        <h4 className="font-bold text-lg text-indigo-800 mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          {chart.title}
                        </h4>
                        <div className="overflow-hidden rounded-lg border border-indigo-200 shadow-sm">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gradient-to-r from-indigo-100 to-indigo-200">
                                {chart.headers.map((header, headerIndex) => (
                                  <th key={headerIndex} className="border-r border-indigo-200 p-4 text-left font-bold text-indigo-800 last:border-r-0">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {chart.rows.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-indigo-50/50 transition-colors">
                                  {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="border-r border-indigo-100 p-4 font-mono text-slate-700 last:border-r-0">
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
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50">
                    <h4 className="font-bold text-lg text-green-800 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Examples
                    </h4>
                    <div className="space-y-4">
                      {concept.examples.map((example, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg border border-green-200/50 shadow-sm">
                          <div className="font-serif text-lg font-medium text-green-800 mb-2">{example.latin}</div>
                          <div className="text-slate-600 mb-3 italic">{example.english}</div>
                          {example.notes && (
                            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
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
      <div className="flex gap-4 p-2 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm">
        {lesson.practiceExercises.map((exercise, index) => (
          <Button
            key={exercise.id}
            variant={selectedExercise === index ? "default" : "ghost"}
            onClick={() => setSelectedExercise(index)}
            className={`flex-1 h-12 rounded-lg font-medium transition-all ${
              selectedExercise === index 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200/50' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {exercise.type === 'latin-to-english' ? (
              <>
                <span className="font-serif text-sm mr-2">Latin</span>
                →
                <span className="text-sm ml-2">English</span>
              </>
            ) : (
              <>
                <span className="text-sm mr-2">English</span>
                →
                <span className="font-serif text-sm ml-2">Latin</span>
              </>
            )}
          </Button>
        ))}
      </div>

      {/* Current Exercise */}
      {lesson.practiceExercises[selectedExercise] && (
        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl shadow-slate-200/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50 pb-6">
            <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                <ChevronDown className="h-6 w-6 text-blue-600" />
              </div>
              {lesson.practiceExercises[selectedExercise].title}
            </CardTitle>
            <CardDescription className="text-slate-600 text-base">
              {lesson.practiceExercises[selectedExercise].sentences.length} sentences to practice
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {lesson.practiceExercises[selectedExercise].sentences.map((sentence, index) => (
                <div key={sentence.id} className="group bg-white rounded-xl border border-slate-200/50 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      {/* Question Number */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span className="text-slate-500 text-sm font-medium">Question {index + 1}</span>
                      </div>

                      {/* Source Text */}
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200/50">
                        <div className="font-medium text-lg text-slate-800 leading-relaxed">
                          {sentence.source}
                        </div>
                      </div>

                      {/* Hints */}
                      {sentence.hints && sentence.hints.length > 0 && (
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200/50">
                          <div className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2">
                            💡 Hints:
                          </div>
                          <ul className="text-sm text-amber-600 space-y-1">
                            {sentence.hints.map((hint, hintIndex) => (
                              <li key={hintIndex} className="flex items-start gap-2">
                                <span className="text-amber-400 mt-1">•</span>
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
                        className="bg-white/80 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-sm transition-all"
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
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-200/50 animate-in slide-in-from-top-2 duration-300">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="font-semibold text-emerald-800">Answer:</span>
                          </div>
                          <div className="font-medium text-emerald-700 text-lg mb-2">{sentence.target}</div>
                          {sentence.notes && (
                            <div className="text-sm text-emerald-600 bg-emerald-100 p-3 rounded-lg border border-emerald-200">
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
