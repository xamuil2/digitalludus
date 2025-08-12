import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, RotateCcw, Brain, BookOpen, ChevronDown, Trophy, Star } from 'lucide-react';
import { getAllLessons, getLessonById, type VocabWord } from '@/data/lessons';

interface VocabularyDrillerProps {
  selectedLesson?: number;
  allowLessonSelection?: boolean;
  allowMultipleLessons?: boolean;
}

export default function VocabularyDriller({ 
  selectedLesson = 1, 
  allowLessonSelection = true,
  allowMultipleLessons = false
}: VocabularyDrillerProps) {
  const [currentLesson, setCurrentLesson] = useState(selectedLesson);
  const [selectedLessons, setSelectedLessons] = useState<number[]>([selectedLesson]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [sessionWords, setSessionWords] = useState<VocabWord[]>([]);
  const [mode, setMode] = useState<'latin-to-english' | 'english-to-latin'>('latin-to-english');
  const [sessionComplete, setSessionComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  // Get vocabulary from lesson data
  const getVocabularyByLesson = (lessonNumber: number): VocabWord[] => {
    const lesson = getLessonById(lessonNumber);
    return lesson?.vocabulary || [];
  };

  // Get vocabulary from multiple lessons (for combined practice)
  const getVocabularyByLessons = (lessonNumbers: number[]): VocabWord[] => {
    const allWords: VocabWord[] = [];
    lessonNumbers.forEach(num => {
      allWords.push(...getVocabularyByLesson(num));
    });
    return allWords;
  };

  // Filter words by lesson and shuffle
  useEffect(() => {
    const lessonsToUse = allowMultipleLessons ? selectedLessons : [currentLesson];
    let allWords: VocabWord[] = [];
    
    lessonsToUse.forEach(lessonNum => {
      const lessonWords = getVocabularyByLesson(lessonNum);
      allWords.push(...lessonWords);
    });
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      allWords = allWords.filter(word => word.difficulty === difficultyFilter);
    }
    
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    setSessionWords(shuffled);
    setCurrentWordIndex(0);
    setScore({ correct: 0, total: 0 });
    setShowAnswer(false);
    setSessionComplete(false);
    setStreak(0);
  }, [currentLesson, selectedLessons, difficultyFilter, allowMultipleLessons]);

  // Update current lesson when prop changes
  useEffect(() => {
    setCurrentLesson(selectedLesson);
    if (!allowMultipleLessons) {
      setSelectedLessons([selectedLesson]);
    }
  }, [selectedLesson, allowMultipleLessons]);

  const currentWord = sessionWords[currentWordIndex];
  const progress = sessionWords.length > 0 ? ((currentWordIndex + 1) / sessionWords.length) * 100 : 0;
  const availableLessons = getAllLessons();
  const currentLessonData = getLessonById(currentLesson);

  const handleCorrect = () => {
    const newScore = { correct: score.correct + 1, total: score.total + 1 };
    setScore(newScore);
    setStreak(prev => {
      const newStreak = prev + 1;
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      return newStreak;
    });
    nextWord();
  };

  const handleIncorrect = () => {
    setScore(prev => ({ correct: prev.correct, total: prev.total + 1 }));
    setStreak(0);
    nextWord();
  };

  const nextWord = () => {
    if (currentWordIndex < sessionWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      // Session complete
      setSessionComplete(true);
    }
  };

  const resetSession = () => {
    const shuffled = [...sessionWords].sort(() => Math.random() - 0.5);
    setSessionWords(shuffled);
    setCurrentWordIndex(0);
    setScore({ correct: 0, total: 0 });
    setShowAnswer(false);
    setSessionComplete(false);
    setStreak(0);
  };

  const startNewSession = () => {
    const lessonsToUse = allowMultipleLessons ? selectedLessons : [currentLesson];
    let allWords: VocabWord[] = [];
    
    lessonsToUse.forEach(lessonNum => {
      const lessonWords = getVocabularyByLesson(lessonNum);
      allWords.push(...lessonWords);
    });
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      allWords = allWords.filter(word => word.difficulty === difficultyFilter);
    }
    
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    setSessionWords(shuffled);
    setCurrentWordIndex(0);
    setScore({ correct: 0, total: 0 });
    setShowAnswer(false);
    setSessionComplete(false);
    setStreak(0);
  };

  const toggleMode = () => {
    setMode(prev => prev === 'latin-to-english' ? 'english-to-latin' : 'latin-to-english');
    setShowAnswer(false);
  };

  const getLessonLabel = () => {
    if (allowMultipleLessons && selectedLessons.length > 1) {
      return `Lessons ${selectedLessons.join(', ')}`;
    }
    return `Lesson ${currentLesson}`;
  };

  if (!currentWord && !sessionComplete) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
            Vocabulary Driller
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {sessionWords.length === 0 ? 
              `No vocabulary words found for lesson ${currentLesson}` :
              'Loading vocabulary...'
            }
          </CardDescription>
        </CardHeader>
        {allowLessonSelection && (
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Select Lesson
                </label>
                <Select 
                  value={currentLesson.toString()} 
                  onValueChange={(value) => setCurrentLesson(parseInt(value))}
                >
                  <SelectTrigger className="w-full h-10 sm:h-11">
                    <SelectValue placeholder="Choose a lesson" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLessons.map((lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id.toString()}>
                        Lesson {lesson.id}: {lesson.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    );
  }

  // Session complete screen
  if (sessionComplete) {
    const percentage = sessionWords.length > 0 ? Math.round((score.correct / sessionWords.length) * 100) : 0;
    const isExcellent = percentage >= 90;
    const isGood = percentage >= 70;
    
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="text-center">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center ${
              isExcellent ? 'bg-gradient-to-br from-yellow-100 to-yellow-200' :
              isGood ? 'bg-gradient-to-br from-green-100 to-green-200' :
              'bg-gradient-to-br from-blue-100 to-blue-200'
            }`}>
              {isExcellent ? (
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
              ) : isGood ? (
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              ) : (
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              )}
            </div>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl mb-2">
              {isExcellent ? 'Excellent Work!' : isGood ? 'Well Done!' : 'Session Complete!'}
            </CardTitle>
            <CardDescription className="text-base sm:text-lg">
              You scored {score.correct} out of {sessionWords.length} ({percentage}%)
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
            <div className="p-3 sm:p-4 bg-slate-50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-slate-800">{percentage}%</div>
              <div className="text-xs sm:text-sm text-slate-600">Accuracy</div>
            </div>
            <div className="p-3 sm:p-4 bg-slate-50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-slate-800">{bestStreak}</div>
              <div className="text-xs sm:text-sm text-slate-600">Best Streak</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              onClick={startNewSession} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto touch-manipulation active:scale-95"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Practice Again
            </Button>
            {allowLessonSelection && (
              <Button 
                variant="outline" 
                onClick={() => {
                  const nextLesson = currentLesson + 1;
                  if (availableLessons.find(l => l.id === nextLesson)) {
                    setCurrentLesson(nextLesson);
                  }
                }}
                disabled={!availableLessons.find(l => l.id === currentLesson + 1)}
                className="w-full sm:w-auto touch-manipulation active:scale-95"
              >
                Next Lesson
              </Button>
            )}
          </div>
          
          {allowLessonSelection && (
            <div className="pt-3 sm:pt-4 border-t">
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Change Lesson
              </label>
              <Select 
                value={currentLesson.toString()} 
                onValueChange={(value) => setCurrentLesson(parseInt(value))}
              >
                <SelectTrigger className="w-full h-10 sm:h-11">
                  <SelectValue placeholder="Choose a lesson" />
                </SelectTrigger>
                <SelectContent>
                  {availableLessons.map((lesson) => (
                    <SelectItem key={lesson.id} value={lesson.id.toString()}>
                      Lesson {lesson.id}: {lesson.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex-1 min-w-0">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl truncate">
              <Brain className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="truncate">Vocabulary Driller - {getLessonLabel()}</span>
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {mode === 'latin-to-english' ? 'Latin → English' : 'English → Latin'}
            </CardDescription>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-sm text-muted-foreground">
              Score: {score.correct}/{score.total}
            </div>
            <div className="text-xs text-muted-foreground">
              {currentWordIndex + 1} of {sessionWords.length}
            </div>
            {streak > 0 && (
              <div className="text-xs text-amber-600 font-medium">
                🔥 {streak} streak
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <Progress value={progress} className="w-full" />
          {allowLessonSelection && (
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2">
              <Select 
                value={currentLesson.toString()} 
                onValueChange={(value) => setCurrentLesson(parseInt(value))}
              >
                <SelectTrigger className="w-full xs:w-32 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableLessons.map((lesson) => (
                    <SelectItem key={lesson.id} value={lesson.id.toString()}>
                      L{lesson.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="outline" className="text-xs self-start xs:self-auto">
                {sessionWords.length} words
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">
            {currentWord.partOfSpeech}
          </div>
          <div className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 break-words">
            {mode === 'latin-to-english' ? currentWord.latin : currentWord.english}
          </div>
          {showAnswer && (
            <div className="text-lg sm:text-xl text-muted-foreground bg-slate-50 p-3 sm:p-4 rounded-lg">
              {mode === 'latin-to-english' ? currentWord.english : currentWord.latin}
              {currentWord.principalParts && mode === 'latin-to-english' && (
                <div className="text-sm text-slate-500 mt-2 italic">
                  {currentWord.principalParts}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3 sm:gap-4">
          {!showAnswer ? (
            <Button 
              onClick={() => setShowAnswer(true)} 
              className="w-full xs:w-32 touch-manipulation active:scale-95"
            >
              Show Answer
            </Button>
          ) : (
            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 w-full xs:w-auto">
              <Button 
                onClick={handleCorrect} 
                variant="default" 
                className="w-full xs:w-32 bg-green-600 hover:bg-green-700 touch-manipulation active:scale-95"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Correct
              </Button>
              <Button 
                onClick={handleIncorrect} 
                variant="destructive" 
                className="w-full xs:w-32 touch-manipulation active:scale-95"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Incorrect
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2">
          <Button 
            variant="outline" 
            onClick={toggleMode} 
            size="sm"
            className="touch-manipulation active:scale-95"
          >
            Switch Mode
          </Button>
          <Button variant="outline" onClick={resetSession} size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
