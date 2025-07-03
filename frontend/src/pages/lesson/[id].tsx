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
  PenTool,
  Sparkles,
  Users,
  Flag
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl shadow-slate-200/50">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Lesson Not Found</CardTitle>
            <CardDescription className="text-lg">
              The requested lesson could not be found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/')} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="hover:bg-slate-100 p-2 rounded-xl group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              </Button>
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.svg" 
                  alt="DigitalLudus Logo" 
                  className="h-10 w-auto"
                />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                    {lesson.title}
                  </h1>
                  <p className="text-sm text-muted-foreground font-medium">Lesson {lesson.id}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-slate-700">Progress</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {progress}%
                </div>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-slate-200"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${progress * 1.76} 176`}
                    className="text-emerald-500 transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle className={`h-6 w-6 ${progress === 100 ? 'text-emerald-500' : 'text-slate-300'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-100/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Lesson Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">Vocabulary</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                      {lesson.vocabulary.length} words
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">Grammar Topics</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                      {lesson.keyConcepts.length} concepts
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">Exercises</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                      {lesson.practiceExercises.length} sets
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            {lesson.prerequisiteSkills.length > 0 && (
              <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg shadow-amber-100/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-amber-800 flex items-center gap-2">
                    <Flag className="h-5 w-5" />
                    Prerequisites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lesson.prerequisiteSkills.map((prereq, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-amber-700">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        {prereq}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg shadow-slate-200/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                  <ArrowRight className="h-5 w-5" />
                  Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start bg-white/60 hover:bg-white hover:border-slate-300"
                  onClick={() => router.push(`/lesson/${lessonId - 1}`)}
                  disabled={lessonId <= 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Lesson
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start bg-white/60 hover:bg-white hover:border-slate-300"
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
                <TabsList className="grid w-full max-w-3xl grid-cols-5 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 p-2 h-auto">
                  <TabsTrigger 
                    value="intro" 
                    className="flex flex-col items-center gap-2 py-3 px-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200/50 rounded-lg font-medium transition-all"
                  >
                    <Flag className="h-4 w-4" />
                    <span className="text-xs">Intro</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reading" 
                    className="flex flex-col items-center gap-2 py-3 px-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-200/50 rounded-lg font-medium transition-all"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span className="text-xs">Reading</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="vocabulary" 
                    className="flex flex-col items-center gap-2 py-3 px-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200/50 rounded-lg font-medium transition-all"
                  >
                    <Brain className="h-4 w-4" />
                    <span className="text-xs">Vocabulary</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="grammar" 
                    className="flex flex-col items-center gap-2 py-3 px-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-orange-200/50 rounded-lg font-medium transition-all"
                  >
                    <PenTool className="h-4 w-4" />
                    <span className="text-xs">Grammar</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="practice" 
                    className="flex flex-col items-center gap-2 py-3 px-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-amber-200/50 rounded-lg font-medium transition-all"
                  >
                    <Trophy className="h-4 w-4" />
                    <span className="text-xs">Practice</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="intro" className="space-y-8">
                <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl shadow-slate-200/50 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                        <Flag className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl font-bold text-slate-800">
                          {lesson.title}
                        </CardTitle>
                        <CardDescription className="text-lg text-slate-600 mt-2">
                          Lesson {lesson.id}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    {/* Lesson Objectives */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200/50">
                      <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <Target className="h-6 w-6" />
                        Learning Objectives
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {lesson.objectives.map((objective, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-emerald-700 leading-relaxed">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cultural Context */}
                    {lesson.culturalNotes && lesson.culturalNotes.length > 0 && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200/50">
                        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                          <Globe className="h-6 w-6" />
                          Cultural Context
                        </h3>
                        <div className="space-y-3">
                          {lesson.culturalNotes.map((note, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                              <p className="text-purple-700 leading-relaxed">{note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Preview */}
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200/50 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-blue-900 mb-1">{lesson.vocabulary.length}</div>
                        <div className="text-sm text-blue-600">New Vocabulary</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <PenTool className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-green-900 mb-1">{lesson.keyConcepts.length}</div>
                        <div className="text-sm text-green-600">Grammar Concepts</div>
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200/50 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Trophy className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-amber-900 mb-1">{lesson.practiceExercises.length}</div>
                        <div className="text-sm text-amber-600">Practice Sets</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reading" className="space-y-8">
                <ProsePassage lesson={lesson} />
              </TabsContent>

              <TabsContent value="vocabulary" className="space-y-8">
                <VocabularySection lesson={lesson} />
              </TabsContent>

              <TabsContent value="grammar" className="space-y-8">
                <GrammarSection lesson={lesson} />
              </TabsContent>

              <TabsContent value="practice" className="space-y-8">
                <PracticeSection lesson={lesson} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
