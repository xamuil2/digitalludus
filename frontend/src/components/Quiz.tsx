import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Trophy, BookOpen, ArrowRight } from 'lucide-react';
import { getQuizByLesson, type QuizQuestion } from '@/data/quiz';
import { getAllLessons } from '@/data/lessons';

interface QuizProps {
  selectedLesson?: number;
}

export default function Quiz({ selectedLesson = 1 }: QuizProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = getQuizByLesson(selectedLesson);
  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const allLessons = getAllLessons();
  const nextLesson = allLessons.find(lesson => lesson.id === selectedLesson + 1);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);
  };

  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return "Excellent! You've mastered this lesson.";
    if (percentage >= 80) return "Great job! You have a strong understanding.";
    if (percentage >= 70) return "Good work! Review the areas you missed.";
    if (percentage >= 60) return "Not bad! Consider reviewing this lesson.";
    return "Keep studying! Review this lesson and try again.";
  };

  const goToNextLesson = () => {
    if (nextLesson) {
      router.push(`/lesson/${nextLesson.id}`);
    }
  };

  if (questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz</CardTitle>
          <CardDescription>No quiz questions available for lesson {selectedLesson}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (quizComplete) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Quiz Complete!
          </CardTitle>
          <CardDescription>Lesson {selectedLesson} Quiz Results</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div>
            <div className="text-4xl font-bold mb-2">{score}/{questions.length}</div>
            <div className="text-2xl font-semibold text-muted-foreground">
              {getScorePercentage()}%
            </div>
          </div>
          <div className="text-lg">{getScoreMessage()}</div>
          <div className="flex justify-center gap-4">
            <Button onClick={resetQuiz} variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
            {getScorePercentage() >= 70 && nextLesson && (
              <Button onClick={goToNextLesson} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <ArrowRight className="h-4 w-4 mr-2" />
                Next Lesson
              </Button>
            )}
          </div>
          {getScorePercentage() >= 70 && !nextLesson && (
            <div className="text-center mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">🎉 Congratulations! You've completed all available lessons!</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Lesson {selectedLesson} Quiz</CardTitle>
            <CardDescription>
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              Score: {score}/{currentQuestionIndex + (showResult ? 1 : 0)}
            </div>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "w-full text-left justify-start h-auto p-4";
              
              if (showResult) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass += " bg-green-100 border-green-500 text-green-700 hover:bg-green-100";
                } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                  buttonClass += " bg-red-100 border-red-500 text-red-700 hover:bg-red-100";
                }
              } else if (selectedAnswer === index) {
                buttonClass += " bg-blue-100 border-blue-500";
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-center">
                    <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                    {showResult && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-4 w-4 ml-auto text-green-600" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                      <XCircle className="h-4 w-4 ml-auto text-red-600" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {showResult && currentQuestion.explanation && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Explanation:</h4>
            <p className="text-sm">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="flex justify-center">
          {!showResult ? (
            <Button 
              onClick={handleSubmitAnswer} 
              disabled={selectedAnswer === null}
              className="w-32"
            >
              Submit
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="w-32">
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
