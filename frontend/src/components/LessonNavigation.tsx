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
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gold-gradient text-white px-6 py-3 rounded-full text-sm font-classical font-medium mb-6 shadow-gold">
          <Crown className="h-5 w-5" />
          Your Classical Learning Journey
        </div>
        <h2 className="text-4xl font-classical font-bold mb-6 text-roman-red">
          Course Progress
        </h2>
        <p className="text-lg text-roman-black max-w-3xl mx-auto leading-relaxed">
          Master Latin fundamentals with structured lessons and practice. Each lesson builds upon the previous ones in the ancient tradition of Roman education.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {lessons.map((lesson) => {
          const isLocked = lesson.id > 2; // For now, lock lessons after 2
          const isCompleted = false; // We'll implement completion tracking later
          const isCurrent = selectedLesson === lesson.id;
          
          return (
            <Card 
              key={lesson.id} 
              className={`group cursor-pointer transition-all duration-300 glass-effect hover:shadow-roman hover:-translate-y-2 overflow-hidden ${
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
                  ? 'bg-roman-gradient' 
                  : isCompleted
                    ? 'bg-gold-gradient'
                    : isLocked
                      ? 'bg-gradient-to-r from-roman-red/30 to-roman-red/50'
                      : 'bg-roman-gradient'
              }`}></div>
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 shadow-roman ${
                      isCompleted 
                        ? 'bg-gold-gradient text-white' 
                        : isLocked 
                          ? 'bg-gradient-to-br from-roman-marble to-roman-cream text-roman-black/40'
                          : isCurrent
                            ? 'bg-roman-gradient text-white'
                            : 'bg-gradient-to-br from-roman-cream to-roman-marble text-roman-red'
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
                      <CardTitle className={`text-lg font-classical font-bold ${
                        isLocked ? 'text-roman-black/40' : 'text-roman-red'
                      }`}>
                        {lesson.title}
                      </CardTitle>
                      <CardDescription className={`text-sm font-classical ${
                        isLocked ? 'text-roman-black/30' : 'text-muted-foreground'
                      }`}>
                        Lesson {lesson.id}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {isCurrent && (
                      <Badge className="bg-roman-gradient text-white border-none shadow-roman font-classical">
                        Current
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge className="bg-gold-gradient text-white border-none shadow-gold font-classical">
                        Complete
                      </Badge>
                    )}
                    {isLocked && (
                      <Badge variant="secondary" className="bg-roman-marble text-roman-black/50 border-roman-gold/20 font-classical">
                        Locked
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                {/* Progress indicators */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className={`${isLocked ? 'text-roman-black/40' : 'text-roman-black'}`}>
                    <div className={`text-lg font-classical font-bold ${
                      isLocked ? 'text-roman-black/40' : 'text-roman-gold'
                    }`}>
                      {lesson.vocabulary.length}
                    </div>
                    <div className="text-xs font-classical">Words</div>
                  </div>
                  <div className={`${isLocked ? 'text-roman-black/40' : 'text-roman-black'}`}>
                    <div className={`text-lg font-classical font-bold ${
                      isLocked ? 'text-roman-black/40' : 'text-roman-red'
                    }`}>
                      {lesson.keyConcepts.length}
                    </div>
                    <div className="text-xs font-classical">Grammar</div>
                  </div>
                  <div className={`${isLocked ? 'text-roman-black/40' : 'text-roman-black'}`}>
                    <div className={`text-lg font-classical font-bold ${
                      isLocked ? 'text-roman-black/40' : 'text-roman-gold'
                    }`}>
                      {lesson.estimatedTime}m
                    </div>
                    <div className="text-xs font-classical">Time</div>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed font-classical ${
                  isLocked ? 'text-roman-black/40' : 'text-roman-black'
                }`}>
                  {lesson.description}
                </p>

                {/* Action button */}
                <Button 
                  className={`w-full transition-all font-classical ${
                    isLocked 
                      ? 'bg-roman-marble text-roman-black/40 cursor-not-allowed border border-roman-gold/20' 
                      : isCurrent
                        ? 'bg-roman-gradient hover:shadow-roman text-white shadow-roman'
                        : isCompleted
                          ? 'bg-gold-gradient hover:shadow-gold text-white shadow-gold'
                          : 'bg-roman-gradient hover:shadow-roman text-white shadow-roman'
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
