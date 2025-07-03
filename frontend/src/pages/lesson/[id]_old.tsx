import { useRouter } from 'next/router';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
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
  PenTool
} from 'lucide-react';
import { getLessonById, type Lesson, type LessonSection } from '@/data/lessons';
import VocabularyDriller from '@/components/VocabularyDriller';
import Quiz from '@/components/Quiz';
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Lesson Not Found</CardTitle>
            <CardDescription>
              The requested lesson could not be found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/')} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progressPercentage = (completedSections.size / lesson.sections.length) * 100;

  const markSectionComplete = (sectionId: string) => {
    setCompletedSections(prev => new Set(Array.from(prev).concat([sectionId])));
  };

  const navigateToLesson = (direction: 'prev' | 'next') => {
    const newLessonId = direction === 'prev' ? lessonId - 1 : lessonId + 1;
    router.push(`/lesson/${newLessonId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/')}
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Lessons
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {lesson.title}
                </h1>
                {lesson.subtitle && (
                  <p className="text-slate-600 font-medium">{lesson.subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge 
                variant={lesson.difficulty === 'beginner' ? 'default' : 'secondary'}
                className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm"
              >
                {lesson.difficulty}
              </Badge>
              <div className="text-sm text-slate-600 bg-white/50 px-3 py-2 rounded-full border border-slate-200/50">
                <Clock className="h-4 w-4 inline mr-2" />
                {lesson.estimatedTime} min
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="font-medium text-slate-700">Progress</span>
              <span className="font-semibold text-slate-900">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="w-full h-2 bg-slate-200/50" 
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="intro" className="space-y-8">
              <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
                <TabsTrigger 
                  value="intro"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Intro
                </TabsTrigger>
                <TabsTrigger 
                  value="prose"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900"
                >
                  <BookOpenCheck className="h-4 w-4 mr-2" />
                  Reading
                </TabsTrigger>
                <TabsTrigger 
                  value="vocabulary"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Vocabulary
                </TabsTrigger>
                <TabsTrigger 
                  value="grammar"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900"
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Grammar
                </TabsTrigger>
                <TabsTrigger 
                  value="practice"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900"
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  Practice
                </TabsTrigger>
              </TabsList>

              <TabsContent value="intro" className="space-y-8">
                <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl shadow-slate-200/50">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Introduction
                    </CardTitle>
                    <CardDescription className="text-slate-600 text-base">
                      Welcome to {lesson.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                      <div className="whitespace-pre-line">
                        {lesson.introductoryNote.content}
                      </div>
                    </div>
                    
                    {lesson.objectives.length > 0 && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                          <Target className="h-5 w-5 text-blue-600" />
                          Learning Objectives
                        </h3>
                        <ul className="space-y-3">
                          {lesson.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2.5 flex-shrink-0"></div>
                              <span className="text-slate-700 leading-relaxed">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prose" className="space-y-6">
                <ProsePassage lesson={lesson} />
              </TabsContent>

              <TabsContent value="vocabulary" className="space-y-6">
                <VocabularySection lesson={lesson} />
                <VocabularyDriller selectedLesson={lessonId} />
              </TabsContent>

              <TabsContent value="grammar" className="space-y-6">
                <GrammarSection lesson={lesson} />
              </TabsContent>

              <TabsContent value="practice" className="space-y-6">
                <PracticeSection lesson={lesson} />
              </TabsContent>

              <TabsContent value="quiz">
                <Quiz selectedLesson={lessonId} />
              </TabsContent>

              <TabsContent value="culture" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Cultural Context
                    </CardTitle>
                    <CardDescription>
                      Learn about Roman culture and history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {lesson.culturalNotes?.length ? (
                      <ul className="space-y-2">
                        {lesson.culturalNotes.map((note, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">
                        Cultural notes will be added for this lesson.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <LessonSidebar 
              lesson={lesson}
              completedSections={completedSections}
              onNavigate={navigateToLesson}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Lesson Sidebar Component
function LessonSidebar({ 
  lesson, 
  completedSections, 
  onNavigate 
}: {
  lesson: Lesson;
  completedSections: Set<string>;
  onNavigate: (direction: 'prev' | 'next') => void;
}) {
  return (
    <>
      {/* Prerequisites */}
      {lesson.prerequisiteSkills.length > 0 && (
        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg shadow-slate-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
                <GraduationCap className="h-5 w-5 text-purple-600" />
              </div>
              Prerequisites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lesson.prerequisiteSkills.map((skill, index) => (
                <li key={index} className="text-slate-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-slate-800">Navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full bg-white/50 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
            onClick={() => onNavigate('prev')}
            disabled={lesson.id === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Lesson
          </Button>
          <Button 
            variant="outline" 
            className="w-full bg-white/50 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
            onClick={() => onNavigate('next')}
          >
            Next Lesson
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
