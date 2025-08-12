import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Trophy, BookOpen, ArrowRight } from 'lucide-react';
import { getQuizByLesson } from '@/data/quiz';
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
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-lg sm:text-xl">Quiz</CardTitle>
          <CardDescription className="text-sm sm:text-base">No quiz questions available for lesson {selectedLesson}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (quizComplete) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl">
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
            Quiz Complete!
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">Lesson {selectedLesson} Quiz Results</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
          <div>
            <div className="text-3xl sm:text-4xl font-bold mb-2">{score}/{questions.length}</div>
            <div className="text-xl sm:text-2xl font-semibold text-muted-foreground">
              {getScorePercentage()}%
            </div>
          </div>
          <div className="text-base sm:text-lg px-4">{getScoreMessage()}</div>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button 
              onClick={resetQuiz} 
              variant="outline"
              className="w-full sm:w-auto touch-manipulation active:scale-95"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
            {getScorePercentage() >= 70 && nextLesson && (
              <Button 
                onClick={goToNextLesson} 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 w-full sm:w-auto touch-manipulation active:scale-95"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Next Lesson
              </Button>
            )}
          </div>
          {getScorePercentage() >= 70 && !nextLesson && (
            <div className="text-center mt-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium text-sm sm:text-base">🎉 Congratulations! You've completed all available lessons!</p>
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
            <CardTitle className="text-lg sm:text-xl truncate">Lesson {selectedLesson} Quiz</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardDescription>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <div className="text-sm text-muted-foreground">
              Score: {score}/{currentQuestionIndex + (showResult ? 1 : 0)}
            </div>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 leading-relaxed">{currentQuestion.question}</h3>
          <div className="space-y-2 sm:space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "w-full text-left justify-start h-auto p-3 sm:p-4 text-sm sm:text-base";
              
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
                  className={`${buttonClass} touch-manipulation active:scale-95`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-center w-full">
                    <span className="font-semibold mr-2 sm:mr-3 flex-shrink-0">{String.fromCharCode(65 + index)}.</span>
                    <span className="flex-1 text-left break-words">{option}</span>
                    {showResult && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-600 flex-shrink-0" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                      <XCircle className="h-4 w-4 ml-2 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {showResult && currentQuestion.explanation && (
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm sm:text-base">Explanation:</h4>
            <p className="text-xs sm:text-sm leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="flex justify-center">
          {!showResult ? (
            <Button 
              onClick={handleSubmitAnswer} 
              disabled={selectedAnswer === null}
              className="w-full xs:w-32 touch-manipulation active:scale-95"
            >
              Submit
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion} 
              className="w-full xs:w-32 touch-manipulation active:scale-95"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
