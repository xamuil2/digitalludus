import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RotateCcw, Brain } from 'lucide-react';
import { getVocabularyByLesson, type VocabWord } from '@/data/vocabulary';

interface VocabularyDrillerProps {
  selectedLesson?: number;
}

export default function VocabularyDriller({ selectedLesson = 1 }: VocabularyDrillerProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [sessionWords, setSessionWords] = useState<VocabWord[]>([]);
  const [mode, setMode] = useState<'latin-to-english' | 'english-to-latin'>('latin-to-english');

  // Filter words by lesson and shuffle
  useEffect(() => {
    const lessonWords = getVocabularyByLesson(selectedLesson);
    const shuffled = [...lessonWords].sort(() => Math.random() - 0.5);
    setSessionWords(shuffled);
    setCurrentWordIndex(0);
    setScore({ correct: 0, total: 0 });
    setShowAnswer(false);
  }, [selectedLesson]);

  const currentWord = sessionWords[currentWordIndex];
  const progress = sessionWords.length > 0 ? ((currentWordIndex + 1) / sessionWords.length) * 100 : 0;

  const handleCorrect = () => {
    setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    nextWord();
  };

  const handleIncorrect = () => {
    setScore(prev => ({ correct: prev.correct, total: prev.total + 1 }));
    nextWord();
  };

  const nextWord = () => {
    if (currentWordIndex < sessionWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      // Session complete
      alert(`Session complete! Score: ${score.correct + 1}/${sessionWords.length}`);
    }
  };

  const resetSession = () => {
    const shuffled = [...sessionWords].sort(() => Math.random() - 0.5);
    setSessionWords(shuffled);
    setCurrentWordIndex(0);
    setScore({ correct: 0, total: 0 });
    setShowAnswer(false);
  };

  const toggleMode = () => {
    setMode(prev => prev === 'latin-to-english' ? 'english-to-latin' : 'latin-to-english');
    setShowAnswer(false);
  };

  if (!currentWord) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vocabulary Driller</CardTitle>
          <CardDescription>No vocabulary words found for lesson {selectedLesson}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Vocabulary Driller - Lesson {selectedLesson}
            </CardTitle>
            <CardDescription>
              {mode === 'latin-to-english' ? 'Latin → English' : 'English → Latin'}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              Score: {score.correct}/{score.total}
            </div>
            <div className="text-xs text-muted-foreground">
              {currentWordIndex + 1} of {sessionWords.length}
            </div>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">
            {currentWord.partOfSpeech}
          </div>
          <div className="text-3xl font-bold mb-4">
            {mode === 'latin-to-english' ? currentWord.latin : currentWord.english}
          </div>
          {showAnswer && (
            <div className="text-xl text-muted-foreground">
              {mode === 'latin-to-english' ? currentWord.english : currentWord.latin}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          {!showAnswer ? (
            <Button onClick={() => setShowAnswer(true)} className="w-32">
              Show Answer
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button 
                onClick={handleCorrect} 
                variant="default" 
                className="w-32 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Correct
              </Button>
              <Button 
                onClick={handleIncorrect} 
                variant="destructive" 
                className="w-32"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Incorrect
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={toggleMode} size="sm">
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
