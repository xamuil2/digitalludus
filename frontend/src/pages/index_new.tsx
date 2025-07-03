import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PDFReader from '@/components/PDFReader';
import VocabularyDriller from '@/components/VocabularyDriller';
import Quiz from '@/components/Quiz';
import LessonNavigation from '@/components/LessonNavigation';
import { BookOpen, Brain, Trophy, GraduationCap, Star, Sparkles, ArrowRight, Clock, Target } from 'lucide-react';

const PDF_URL = '/ludus.pdf';

const Home: React.FC = () => {
    const [selectedLesson, setSelectedLesson] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
            {/* Header */}
            <header className="border-b bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/50">
                                    <GraduationCap className="h-7 w-7 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <Sparkles className="h-2.5 w-2.5 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                                    DigitalLudus
                                </h1>
                                <p className="text-sm text-muted-foreground font-medium">Interactive Latin Learning Platform</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200 px-3 py-1.5 text-sm font-medium">
                                <Star className="h-3.5 w-3.5 text-amber-500 mr-1.5" />
                                Lesson {selectedLesson} Active
                            </Badge>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-200/50">
                            <Sparkles className="h-4 w-4" />
                            Modern Digital Learning Experience
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
                            Master Latin with
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Interactive Excellence
                            </span>
                        </h2>
                        <p className="text-xl text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto">
                            Transform your Latin studies with our comprehensive digital companion to the <strong>Ludus</strong> textbook.
                            Experience immersive lessons, interactive exercises, and intelligent practice tools designed for serious learners.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                size="lg" 
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-blue-300/50 transition-all duration-300 group"
                                onClick={() => window.location.href = '/lesson/1'}
                            >
                                Start Learning Now
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button 
                                variant="outline" 
                                size="lg"
                                className="bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-slate-50 hover:border-slate-400 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <BookOpen className="mr-2 h-5 w-5" />
                                Browse Textbook
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <Tabs defaultValue="lessons" className="space-y-8">
                    <div className="flex justify-center">
                        <TabsList className="grid w-full max-w-2xl grid-cols-4 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 p-2 h-auto">
                            <TabsTrigger 
                                value="lessons" 
                                className="flex flex-col items-center gap-2 py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200/50 rounded-lg font-medium transition-all"
                            >
                                <GraduationCap className="h-5 w-5" />
                                <span className="text-sm">Lessons</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="textbook" 
                                className="flex flex-col items-center gap-2 py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-200/50 rounded-lg font-medium transition-all"
                            >
                                <BookOpen className="h-5 w-5" />
                                <span className="text-sm">Textbook</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="vocabulary" 
                                className="flex flex-col items-center gap-2 py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-200/50 rounded-lg font-medium transition-all"
                            >
                                <Brain className="h-5 w-5" />
                                <span className="text-sm">Vocabulary</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="quiz" 
                                className="flex flex-col items-center gap-2 py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-amber-200/50 rounded-lg font-medium transition-all"
                            >
                                <Trophy className="h-5 w-5" />
                                <span className="text-sm">Quiz</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    
                    <TabsContent value="lessons" className="space-y-8">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                                {/* Quick Stats */}
                                <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-100/50">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                                            <Clock className="h-5 w-5" />
                                            Study Progress
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-blue-900 mb-1">1/50</div>
                                        <div className="text-sm text-blue-600">Lessons Completed</div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg shadow-emerald-100/50">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg text-emerald-800 flex items-center gap-2">
                                            <Brain className="h-5 w-5" />
                                            Vocabulary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-emerald-900 mb-1">45</div>
                                        <div className="text-sm text-emerald-600">Words Learned</div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg shadow-purple-100/50">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg text-purple-800 flex items-center gap-2">
                                            <Target className="h-5 w-5" />
                                            Accuracy
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-purple-900 mb-1">89%</div>
                                        <div className="text-sm text-purple-600">Average Score</div>
                                    </CardContent>
                                </Card>
                            </div>

                            <LessonNavigation 
                                selectedLesson={selectedLesson}
                                onLessonSelect={setSelectedLesson}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="textbook" className="space-y-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid gap-6 lg:grid-cols-4">
                                <div className="lg:col-span-3">
                                    <Card className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden">
                                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
                                            <CardTitle className="text-xl text-slate-800 flex items-center gap-3">
                                                <div className="p-2 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg">
                                                    <BookOpen className="h-6 w-6 text-slate-600" />
                                                </div>
                                                Ludus Textbook Reader
                                            </CardTitle>
                                            <CardDescription>Interactive PDF reader with navigation and study tools</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <PDFReader 
                                                pdfUrl={PDF_URL}
                                                currentPage={currentPage}
                                                onPageChange={setCurrentPage}
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="space-y-6">
                                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-100/50">
                                        <CardHeader>
                                            <CardTitle className="text-lg text-blue-800">Study Tools</CardTitle>
                                            <CardDescription className="text-blue-600">
                                                Quick access to lesson resources
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-200/50">
                                                <div className="font-medium text-blue-900 mb-1">Current Lesson: {selectedLesson}</div>
                                                <div className="text-blue-600 text-sm">Page {currentPage}</div>
                                            </div>
                                            <div className="space-y-3 text-sm text-blue-700">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                    Switch to Vocabulary tab to practice words
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                    Take the Quiz tab to test your knowledge
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                    Use Lessons tab to navigate chapters
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg shadow-amber-100/50">
                                        <CardHeader>
                                            <CardTitle className="text-lg text-amber-800">Reading Tips</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm space-y-3 text-amber-700">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                                Use the zoom controls to adjust text size
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                                Take notes on vocabulary as you read
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                                Practice pronunciation aloud
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                                Review grammar patterns
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="vocabulary" className="space-y-8">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-800 to-pink-800 bg-clip-text text-transparent">
                                    Vocabulary Practice
                                </h3>
                                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                    Master Latin vocabulary with our intelligent spaced repetition system. 
                                    Practice both directions and track your progress.
                                </p>
                            </div>

                            <div className="flex justify-center mb-12">
                                <VocabularyDriller selectedLesson={selectedLesson} />
                            </div>
                            
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg shadow-purple-100/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-purple-800 flex items-center gap-2">
                                            <Brain className="h-5 w-5" />
                                            Study Strategy
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm space-y-3 text-purple-700">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                            Review words multiple times
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                            Practice both directions
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                            Focus on difficult words
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                            Use spaced repetition
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="border-0 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg shadow-emerald-100/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-emerald-800 flex items-center gap-2">
                                            <Sparkles className="h-5 w-5" />
                                            Memory Tips
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm space-y-3 text-emerald-700">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                            Create mental associations
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                            Use the words in sentences
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                            Practice daily for best results
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                            Review before moving on
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-100/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                                            <Target className="h-5 w-5" />
                                            Progress Tracking
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm space-y-3 text-blue-700">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            Aim for 80%+ accuracy
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            Track your daily practice
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            Review missed words
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            Celebrate milestones!
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="quiz" className="space-y-8">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                                    Knowledge Assessment
                                </h3>
                                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                    Test your understanding with comprehensive quizzes covering vocabulary, grammar, and reading comprehension.
                                </p>
                            </div>

                            <div className="flex justify-center mb-12">
                                <Quiz selectedLesson={selectedLesson} />
                            </div>
                            
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg shadow-amber-100/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-amber-800 flex items-center gap-2">
                                            <Trophy className="h-5 w-5" />
                                            Quiz Guidelines
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm space-y-3 text-amber-700">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                            Read each question carefully
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                            Think before selecting an answer
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                            Review explanations for wrong answers
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                            Retake quizzes to improve scores
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-100/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                                            <Star className="h-5 w-5" />
                                            Scoring Guide
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm space-y-3 text-green-700">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            90-100%: Excellent mastery
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            80-89%: Good understanding
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            70-79%: Needs some review
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            Below 70%: Requires more study
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            {/* Footer */}
            <footer className="border-t bg-gradient-to-r from-slate-50 to-slate-100 mt-16">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200/50">
                                <GraduationCap className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <h4 className="text-2xl font-bold mb-3 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            DigitalLudus
                        </h4>
                        <p className="text-slate-600 mb-4 max-w-2xl mx-auto">
                            Making Latin accessible through technology. An open source initiative to democratize classical education.
                        </p>
                        <div className="text-sm text-slate-500">
                            A Max Liu & Ronald Qiao production • © {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
