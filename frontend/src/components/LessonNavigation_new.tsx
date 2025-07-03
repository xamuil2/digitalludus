import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, CheckCircle, Trophy, Clock, Target, Sparkles, Lock, Play } from 'lucide-react';
import { useRouter } from 'next/router';
import { getAllLessons, type Lesson } from '@/data/lessons';

interface LessonNavigationProps {
  selectedLesson: number;
  onLessonSelect: (lessonId: number) => void;
}

export default function LessonNavigation({ selectedLesson, onLessonSelect }: LessonNavigationProps) {
  const router = useRouter();
  const lessons = getAllLessons();

  const handleLessonClick = (lessonId: number) => {
    onLessonSelect(lessonId);
    router.push(`/lesson/${lessonId}`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-200/50">
          <Sparkles className="h-4 w-4" />
          Your Learning Journey
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
          Course Progress
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Master Latin fundamentals with structured lessons and practice. Each lesson builds upon the previous ones.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          const isLocked = lesson.id > 2; // For now, lock lessons after 2
          const isCompleted = false; // We'll implement completion tracking later
          const isCurrent = selectedLesson === lesson.id;
          
          return (
            <Card 
              key={lesson.id} 
              className={`group cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden ${
                isCurrent 
                  ? 'ring-2 ring-blue-400 shadow-blue-200/50 shadow-xl' 
                  : isCompleted
                    ? 'bg-gradient-to-br from-emerald-50 to-teal-50 shadow-emerald-100/50'
                    : isLocked 
                      ? 'bg-gradient-to-br from-slate-50 to-slate-100 opacity-60'
                      : 'bg-gradient-to-br from-white to-slate-50 shadow-slate-200/50 hover:shadow-blue-200/50'
              }`}
              onClick={() => !isLocked && handleLessonClick(lesson.id)}
            >
              {/* Gradient accent */}
              <div className={`h-1 w-full ${
                isCurrent 
                  ? 'bg-gradient-to-r from-blue-400 to-indigo-500' 
                  : isCompleted
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                    : isLocked
                      ? 'bg-gradient-to-r from-slate-300 to-slate-400'
                      : 'bg-gradient-to-r from-purple-400 to-pink-500'
              }`}></div>
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 ${
                      isCompleted 
                        ? 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600' 
                        : isLocked 
                          ? 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400'
                          : isCurrent
                            ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600'
                            : 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : isLocked ? (
                        <Lock className="h-6 w-6" />
                      ) : isCurrent ? (
                        <Play className="h-6 w-6" />
                      ) : (
                        <BookOpen className="h-6 w-6" />
                      )}
                    </div>
                    <div className="text-left">
                      <CardTitle className={`text-lg font-bold ${
                        isLocked ? 'text-slate-400' : 'text-slate-800'
                      }`}>
                        {lesson.title}
                      </CardTitle>
                      <CardDescription className={`text-sm ${
                        isLocked ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        Lesson {lesson.id}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {isCurrent && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-sm">
                        Current
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-sm">
                        Complete
                      </Badge>
                    )}
                    {isLocked && (
                      <Badge variant="secondary" className="bg-slate-200 text-slate-500 border-slate-300">
                        Locked
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                {/* Progress indicators */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className={`${isLocked ? 'text-slate-400' : 'text-slate-600'}`}>
                    <div className={`text-lg font-bold ${
                      isLocked ? 'text-slate-400' : 'text-emerald-600'
                    }`}>
                      {lesson.vocabulary.length}
                    </div>
                    <div className="text-xs">Words</div>
                  </div>
                  <div className={`${isLocked ? 'text-slate-400' : 'text-slate-600'}`}>
                    <div className={`text-lg font-bold ${
                      isLocked ? 'text-slate-400' : 'text-blue-600'
                    }`}>
                      {lesson.keyConcepts.length}
                    </div>
                    <div className="text-xs">Grammar</div>
                  </div>
                  <div className={`${isLocked ? 'text-slate-400' : 'text-slate-600'}`}>
                    <div className={`text-lg font-bold ${
                      isLocked ? 'text-slate-400' : 'text-purple-600'
                    }`}>
                      {lesson.estimatedTime}m
                    </div>
                    <div className="text-xs">Time</div>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${
                  isLocked ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {lesson.description}
                </p>

                {/* Action button */}
                <Button 
                  className={`w-full transition-all ${
                    isLocked 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                      : isCurrent
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                        : isCompleted
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                  disabled={isLocked}
                  size="sm"
                >
                  {isLocked ? (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Locked
                    </>
                  ) : isCurrent ? (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </>
                  ) : isCompleted ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Review
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Lesson
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Overall progress summary */}
      <Card className="border-0 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg shadow-indigo-100/50">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-indigo-800 flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-900 mb-1">1</div>
              <div className="text-sm text-indigo-600">Lessons Started</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-900 mb-1">0</div>
              <div className="text-sm text-emerald-600">Lessons Complete</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-900 mb-1">45</div>
              <div className="text-sm text-purple-600">Words Learned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-900 mb-1">89%</div>
              <div className="text-sm text-amber-600">Average Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
