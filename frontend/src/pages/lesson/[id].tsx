import { useRouter } from 'next/router';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

import { 
  BookOpen, 
  Clock, 
  Target, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  Brain,
  Trophy,
  Globe,
  GraduationCap,
  FileText,
  BookOpenCheck,
  PenTool,
  Sparkles,
  Users,
  Flag,
  MessageCircle
} from 'lucide-react';
import { getLessonById, type Lesson, type LessonSection } from '@/data/lessons';
import VocabularyDriller from '@/components/VocabularyDriller';
import Quiz from '@/components/Quiz';
import MagisterChat from '@/components/AIChat';
import { ProsePassage, VocabularySection, GrammarSection, PracticeSection } from '@/components/LessonComponents';

export default function LessonPage() {
  const router = useRouter();
  const { id } = router.query;
  const lessonId = parseInt(id as string);
  const lesson = getLessonById(lessonId);

  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  if (!lesson) {
    return (
      <div className="min-h-screen bg-marble ancient-texture flex items-center justify-center p-4">
        <Card className="w-full max-w-sm sm:max-w-md glass-effect shadow-roman border-roman-gold/20">
          <CardHeader className="text-center px-4 sm:px-6 py-4 sm:py-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-roman-gradient rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-roman">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-classical text-roman-red">Lesson Not Found</CardTitle>
            <CardDescription className="text-base sm:text-lg text-muted-foreground">
              The requested lesson could not be found.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <Button onClick={() => router.push('/')} className="w-full bg-roman-gradient hover:shadow-roman text-white shadow-roman font-classical touch-manipulation active:scale-95">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = Math.round((completedSections.size / lesson.objectives.length) * 100);

  return (
    <div className="min-h-screen bg-marble ancient-texture">
      {/* Header */}
      <header className="glass-effect shadow-roman sticky top-0 z-50 border-b border-roman-gold/20">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="hover:bg-roman-gold/10 p-1.5 sm:p-2 rounded-xl group text-roman-red touch-manipulation active:scale-95 flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform" />
              </Button>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="relative p-2 sm:p-3 bg-roman-gradient rounded-lg shadow-roman flex-shrink-0">
                  <BookOpen className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-2xl font-classical font-bold text-roman-red truncate">
                    {lesson.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Lesson {lesson.id}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="text-right">
                <div className="text-xs sm:text-sm font-medium text-roman-black font-classical hidden sm:block">Progress</div>
                <div className="text-lg sm:text-2xl font-bold font-classical text-roman-gold">
                  {progress}%
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => window.location.href = '/about'}
                className="text-roman-red hover:bg-roman-gold/10 hover:text-roman-gold font-medium text-xs sm:text-sm px-1 sm:px-4 touch-manipulation active:scale-95"
              >
                <span className="hidden xs:inline">About Ludus</span>
                <span className="xs:hidden">About</span>
              </Button>
              <div className="w-12 h-12 sm:w-16 sm:h-16 relative flex-shrink-0">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 transform -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-roman-stone"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${progress * 1.76} 176`}
                    className="text-roman-gold transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle className={`h-4 w-4 sm:h-6 sm:w-6 ${progress === 100 ? 'text-roman-gold' : 'text-roman-stone'}`} />
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Progress Display */}
          <div className="sm:hidden mt-2 text-center">
            <div className="text-xs font-medium text-roman-black font-classical">
              Progress: <span className="text-roman-gold font-bold">{progress}%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Quick Stats */}
            <Card className="glass-effect shadow-roman border-roman-gold/20">
              <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6 py-3 sm:py-4">
                <CardTitle className="text-base sm:text-lg text-roman-red flex items-center gap-2 font-classical">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Lesson Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-3 sm:pb-4">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-roman-red font-classical">Vocabulary</span>
                    <Badge variant="secondary" className="bg-roman-gold/10 text-roman-gold border-roman-gold/20 text-xs">
                      {lesson.vocabulary.length} words
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-roman-red font-classical">Grammar Topics</span>
                    <Badge variant="secondary" className="bg-roman-gold/10 text-roman-gold border-roman-gold/20 text-xs">
                      {lesson.keyConcepts.length} concepts
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-roman-red font-classical">Exercises</span>
                    <Badge variant="secondary" className="bg-roman-gold/10 text-roman-gold border-roman-gold/20 text-xs">
                      {lesson.practiceExercises.length} sets
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            {lesson.prerequisiteSkills.length > 0 && (
              <Card className="glass-effect shadow-gold border-roman-gold/20">
                <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6 py-3 sm:py-4">
                  <CardTitle className="text-base sm:text-lg text-roman-gold flex items-center gap-2 font-classical">
                    <Flag className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    Prerequisites
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-3 sm:pb-4">
                  <div className="space-y-1 sm:space-y-2">
                    {lesson.prerequisiteSkills.map((prereq, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
                        <span className="break-words">{prereq}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <Card className="glass-effect shadow-roman border-roman-gold/20">
              <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6 py-3 sm:py-4">
                <CardTitle className="text-base sm:text-lg text-roman-red flex items-center gap-2 font-classical">
                  <ArrowRight className="h-5 w-5" />
                  Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start glass-effect hover:bg-roman-gold/10 hover:border-roman-gold font-classical"
                  onClick={() => router.push(`/lesson/${lessonId - 1}`)}
                  disabled={lessonId <= 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Lesson
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start glass-effect hover:bg-roman-gold/10 hover:border-roman-gold font-classical"
                  onClick={() => router.push(`/lesson/${lessonId + 1}`)}
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Next Lesson
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="intro" className="space-y-8">
              <div className="flex justify-center">
                <TabsList className="glass-effect p-2 sm:p-3 h-auto shadow-gold border border-roman-gold/20 w-full overflow-x-auto">
                  <TabsTrigger 
                    value="intro" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-2 sm:px-4 data-[state=active]:bg-roman-gradient data-[state=active]:text-white data-[state=active]:shadow-roman rounded-lg font-classical transition-all flex-1 min-w-0 touch-manipulation active:scale-95"
                  >
                    <Flag className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">Intro</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reading" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-2 sm:px-4 data-[state=active]:bg-gold-gradient data-[state=active]:text-white data-[state=active]:shadow-gold rounded-lg font-classical transition-all flex-1 min-w-0 touch-manipulation active:scale-95"
                  >
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">Reading</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="vocabulary" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-1 sm:px-4 data-[state=active]:bg-roman-gradient data-[state=active]:text-white data-[state=active]:shadow-roman rounded-lg font-classical transition-all flex-1 min-w-0 touch-manipulation active:scale-95"
                  >
                    <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm hidden xs:inline">Vocabulary</span>
                    <span className="text-xs sm:text-sm xs:hidden">Vocab</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="grammar" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-2 sm:px-4 data-[state=active]:bg-gold-gradient data-[state=active]:text-white data-[state=active]:shadow-gold rounded-lg font-classical transition-all flex-1 min-w-0 touch-manipulation active:scale-95"
                  >
                    <PenTool className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">Grammar</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="practice" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-2 sm:px-4 data-[state=active]:bg-roman-gradient data-[state=active]:text-white data-[state=active]:shadow-roman rounded-lg font-classical transition-all flex-1 min-w-0 touch-manipulation active:scale-95"
                  >
                    <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">Practice</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="quiz" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-2 sm:px-4 data-[state=active]:bg-gold-gradient data-[state=active]:text-white data-[state=active]:shadow-gold rounded-lg font-classical transition-all flex-1 min-w-0 touch-manipulation active:scale-95"
                  >
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">Quiz</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ai-tutor" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-2 sm:px-4 data-[state=active]:bg-roman-gradient data-[state=active]:text-white data-[state=active]:shadow-roman rounded-lg font-classical transition-all flex-1 min-w-0 touch-manipulation active:scale-95"
                  >
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">Magister</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="w-full">
                <div className="min-h-[800px] max-w-full">
                  <TabsContent value="intro" className="space-y-8 m-0">
                    <Card className="glass-effect shadow-roman border-roman-gold/20 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-roman-cream to-roman-marble border-b border-roman-gold/20 pb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-roman-gradient rounded-2xl flex items-center justify-center shadow-roman">
                          <Flag className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-3xl font-classical font-bold text-roman-red">
                            {lesson.title}
                          </CardTitle>
                          <CardDescription className="text-lg text-muted-foreground mt-2 font-classical">
                            Lesson {lesson.id}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                      {/* Lesson Objectives */}
                      <div className="bg-gradient-to-br from-roman-cream/50 to-roman-marble/30 p-6 rounded-xl border border-roman-gold/20">
                        <h3 className="text-xl font-classical font-bold text-roman-red mb-4 flex items-center gap-2">
                          <Target className="h-6 w-6" />
                          Learning Objectives
                        </h3>
                        <div className="grid gap-3 md:grid-cols-2">
                          {lesson.objectives.map((objective, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-gold-gradient text-white text-sm font-classical font-bold rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 shadow-gold">
                                {index + 1}
                              </div>
                              <span className="text-roman-black leading-relaxed">{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cultural Context */}
                      {lesson.culturalNotes && lesson.culturalNotes.length > 0 && (
                        <div className="bg-gradient-to-br from-roman-marble/50 to-roman-cream/30 p-6 rounded-xl border border-roman-gold/20">
                          <h3 className="text-xl font-classical font-bold text-roman-gold mb-4 flex items-center gap-2">
                            <Globe className="h-6 w-6" />
                            Cultural Context
                          </h3>
                          <div className="space-y-3">
                            {lesson.culturalNotes.map((note, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-roman-gold rounded-full mt-2"></div>
                                <p className="text-roman-black leading-relaxed">{note}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Preview */}
                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="glass-effect shadow-roman border-roman-gold/20 p-6 rounded-xl text-center">
                          <div className="w-12 h-12 bg-roman-gradient rounded-xl flex items-center justify-center mx-auto mb-3 shadow-roman">
                            <Brain className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-2xl font-classical font-bold text-roman-red mb-1">{lesson.vocabulary.length}</div>
                          <div className="text-sm text-muted-foreground font-classical">New Vocabulary</div>
                        </div>
                        <div className="glass-effect shadow-gold border-roman-gold/20 p-6 rounded-xl text-center">
                          <div className="w-12 h-12 bg-gold-gradient rounded-xl flex items-center justify-center mx-auto mb-3 shadow-gold">
                            <PenTool className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-2xl font-classical font-bold text-roman-gold mb-1">{lesson.keyConcepts.length}</div>
                          <div className="text-sm text-muted-foreground font-classical">Grammar Concepts</div>
                        </div>
                        <div className="glass-effect shadow-roman border-roman-gold/20 p-6 rounded-xl text-center">
                          <div className="w-12 h-12 bg-roman-gradient rounded-xl flex items-center justify-center mx-auto mb-3 shadow-roman">
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-2xl font-classical font-bold text-roman-red mb-1">{lesson.practiceExercises.length}</div>
                          <div className="text-sm text-muted-foreground font-classical">Practice Sets</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reading" className="space-y-8 m-0">
                  <ProsePassage lesson={lesson} />
                </TabsContent>

                <TabsContent value="vocabulary" className="space-y-8 m-0">
                  <VocabularySection lesson={lesson} />
                </TabsContent>

                <TabsContent value="grammar" className="space-y-8 m-0">
                  <GrammarSection lesson={lesson} />
                </TabsContent>

                <TabsContent value="practice" className="space-y-8 m-0">
                  <PracticeSection lesson={lesson} />
                </TabsContent>

                <TabsContent value="quiz" className="space-y-8 m-0">
                  <Card className="glass-effect shadow-roman border-roman-gold/20 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-roman-cream to-roman-marble border-b border-roman-gold/20 pb-6">
                      <CardTitle className="text-2xl font-classical font-bold text-roman-red flex items-center gap-3">
                        <div className="p-2 bg-gold-gradient rounded-lg shadow-gold">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        Lesson {lesson.id} Quiz
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-base font-classical">
                        Test your understanding of this lesson's concepts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="flex justify-center">
                        <Quiz selectedLesson={lesson.id} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ai-tutor" className="space-y-8 m-0">
                  <Card className="glass-effect shadow-gold border-roman-gold/20 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-roman-marble to-roman-cream border-b border-roman-gold/20 pb-6">
                      <CardTitle className="text-2xl font-classical font-bold text-roman-gold flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-roman-gold">
                          <img 
                            src="/magister-marcellus.svg" 
                            alt="Magister Marcellus" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        Magister Marcellus
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-base font-classical">
                        Your wise Latin tutor is here to help with Lesson {lesson.id}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="flex justify-center">
                        <MagisterChat 
                          lesson={lesson.id} 
                          context={`Lesson ${lesson.id}: ${lesson.title}. Topics: ${lesson.keyConcepts.join(', ')}`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
