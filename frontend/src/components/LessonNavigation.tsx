import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle, Trophy, Crown, Lock, Play } from 'lucide-react';
import { useRouter } from 'next/router';
import { getAllLessons } from '@/data/lessons';

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
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center px-4">
        <div className="inline-flex items-center gap-2 bg-crimson text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-classical font-medium mb-4 sm:mb-6 shadow-crimson">
          <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
          Your Classical Learning Journey
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-classical font-bold mb-4 sm:mb-6 text-roman-red">
          Course Progress
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-roman-black max-w-3xl mx-auto leading-relaxed">
          Master Latin fundamentals with structured lessons and practice. Each lesson builds upon the previous ones in the ancient tradition of Roman education.
        </p>
      </div>
      
      <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {lessons.map((lesson) => {
          const isLocked = lesson.id > 2; // For now, lock lessons after 2
          const isCompleted = false; // We'll implement completion tracking later
          const isCurrent = selectedLesson === lesson.id;
          
          return (
            <Card 
              key={lesson.id} 
              className={`group cursor-pointer transition-all duration-300 glass-effect hover:shadow-roman hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden h-full flex flex-col touch-manipulation active:scale-95 ${
                isCurrent 
                  ? 'ring-2 ring-roman-gold shadow-gold border-roman-gold/40' 
                  : isCompleted
                    ? 'border-roman-gold/30 shadow-gold/50'
                    : isLocked 
                      ? 'opacity-60 border-roman-red/20'
                      : 'border-roman-gold/20 hover:border-roman-gold/40'
              }`}
              onClick={() => !isLocked && handleLessonClick(lesson.id)}
            >
              {/* Gradient accent */}
              <div className={`h-2 w-full ${
                isCurrent 
                  ? 'bg-crimson' 
                  : isCompleted
                    ? 'bg-crimson'
                    : isLocked
                      ? 'bg-gradient-to-r from-red-900/20 to-red-900/40'
                      : 'bg-crimson'
              }`}></div>
              
              <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all group-hover:scale-110 shadow-crimson ${
                      isCompleted 
                        ? 'bg-crimson text-white' 
                        : isLocked 
                          ? 'bg-gradient-to-br from-white to-neutral-100 text-neutral-400'
                          : isCurrent
                            ? 'bg-crimson text-white'
                            : 'bg-gradient-to-br from-neutral-50 to-white text-crimson'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                      ) : isLocked ? (
                        <Lock className="h-5 w-5 sm:h-6 sm:w-6" />
                      ) : isCurrent ? (
                        <Play className="h-5 w-5 sm:h-6 sm:w-6" />
                      ) : (
                        <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                      )}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <CardTitle className={`text-sm sm:text-base lg:text-lg font-classical font-bold truncate ${
                        isLocked ? 'text-roman-black/40' : 'text-roman-red'
                      }`}>
                        {lesson.title}
                      </CardTitle>
                      <CardDescription className={`text-xs sm:text-sm font-classical ${
                        isLocked ? 'text-roman-black/30' : 'text-muted-foreground'
                      }`}>
                        Lesson {lesson.id}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1 sm:gap-2 flex-shrink-0">
                    {isCurrent && (
                      <Badge className="bg-crimson text-white border-none shadow-crimson font-classical text-xs">
                        Current
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge className="bg-crimson text-white border-none font-classical text-xs">
                        Complete
                      </Badge>
                    )}
                    {isLocked && (
                      <Badge variant="secondary" className="bg-roman-marble text-roman-black/50 border-roman-gold/20 font-classical text-xs">
                        Locked
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-3 sm:space-y-4 flex flex-col grow px-3 sm:px-6 pb-3 sm:pb-6">
                {/* Progress indicators */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div className={`${isLocked ? 'text-roman-black/40' : 'text-roman-black'}`}>
                    <div className={`text-base sm:text-lg font-classical font-bold ${
                      isLocked ? 'text-roman-black/40' : 'text-roman-gold'
                    }`}>
                      {lesson.vocabulary.length}
                    </div>
                    <div className="text-xs font-classical">Words</div>
                  </div>
                  <div className={`${isLocked ? 'text-roman-black/40' : 'text-roman-black'}`}>
                    <div className={`text-base sm:text-lg font-classical font-bold ${
                      isLocked ? 'text-roman-black/40' : 'text-roman-red'
                    }`}>
                      {lesson.keyConcepts.length}
                    </div>
                    <div className="text-xs font-classical">Grammar</div>
                  </div>
                  <div className={`${isLocked ? 'text-roman-black/40' : 'text-roman-black'}`}>
                    <div className={`text-base sm:text-lg font-classical font-bold ${
                      isLocked ? 'text-roman-black/40' : 'text-roman-gold'
                    }`}>
                      {lesson.estimatedTime}m
                    </div>
                    <div className="text-xs font-classical">Time</div>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-xs sm:text-sm leading-relaxed font-classical ${
                  isLocked ? 'text-roman-black/40' : 'text-roman-black'
                }`}>
                  {lesson.description}
                </p>

                {/* Action button */}
                <Button 
                  className={`w-full transition-all font-classical mt-auto text-sm ${
                    isLocked 
                      ? 'bg-white text-neutral-400 cursor-not-allowed border border-neutral-200' 
                      : 'bg-crimson hover:shadow-crimson text-white shadow-crimson touch-manipulation active:scale-95'
                  }`}
                  disabled={isLocked}
                  size="sm"
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  mt-auto
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
      <Card className="glass-effect shadow-roman border-roman-gold/20 bg-gradient-to-br from-roman-cream to-roman-marble">
        <CardHeader className="text-center bg-gradient-to-r from-roman-marble to-roman-cream border-b border-roman-gold/20">
          <CardTitle className="text-xl text-roman-red flex items-center justify-center gap-2 font-classical">
            <Trophy className="h-6 w-6" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-classical font-bold text-roman-red mb-1">1</div>
              <div className="text-sm text-roman-black font-classical">Lessons Started</div>
            </div>
            <div>
              <div className="text-2xl font-classical font-bold text-roman-gold mb-1">0</div>
              <div className="text-sm text-roman-black font-classical">Lessons Complete</div>
            </div>
            <div>
              <div className="text-2xl font-classical font-bold text-roman-red mb-1">45</div>
              <div className="text-sm text-roman-black font-classical">Words Learned</div>
            </div>
            <div>
              <div className="text-2xl font-classical font-bold text-roman-gold mb-1">89%</div>
              <div className="text-sm text-roman-black font-classical">Average Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
