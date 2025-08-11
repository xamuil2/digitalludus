import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PDFReader from '@/components/PDFReader';
import VocabularyDriller from '@/components/VocabularyDriller';
import Quiz from '@/components/Quiz';
import MagisterChat from '@/components/AIChat';
import UserProgress from '@/components/UserProgress';
import LessonNavigation from '@/components/LessonNavigation';
import Leaderboard from '@/components/Leaderboard';
import StudySessionTracker from '@/components/StudySessionTracker';
import { BookOpen, Brain, Trophy, GraduationCap, Star, Crown, ArrowRight, Clock, Target, TrendingUp, Scroll, Columns, Shield, Sparkles } from 'lucide-react';

const PDF_URL = '/CLC_OCR.pdf';

const Home: React.FC = () => {
    const { data: session } = useSession();
    const [selectedLesson, setSelectedLesson] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('lessons');

    return (
        <div className="min-h-screen bg-marble ancient-texture">
            {/* Majestic Header */}
            <header className="glass-effect shadow-roman sticky top-0 z-50 border-b border-roman-gold/20">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="relative p-3 bg-roman-gradient rounded-lg shadow-roman">
                                    <Columns className="h-8 w-8 text-white" />
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold-gradient rounded-full flex items-center justify-center">
                                        <Crown className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-classical font-bold text-roman-red">DigitalLudus</h1>
                                    <p className="text-sm text-muted-foreground font-medium">Interactive Latin Learning Platform</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                onClick={() => window.location.href = '/about'}
                                className="text-roman-red hover:bg-roman-gold/10 hover:text-roman-gold font-medium"
                            >
                                About Ludus
                            </Button>
                            <Badge className="bg-gold-gradient text-white border-none px-4 py-2 text-sm font-classical shadow-gold">
                                <Shield className="h-4 w-4 mr-2" />
                                Lesson {selectedLesson}
                            </Badge>
                        </div>
                    </div>
                </div>
            </header>

            {/* Imperial Hero Section with Darker Banner */}
                        {/* Imperial Hero Section with Darker Banner */}
            <section className="relative overflow-hidden py-20 bg-gradient-to-b from-gray-100 to-white border-b border-gray-200">
                {/* Subtle darker banner around top half - positioned BEHIND content */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/12 via-black/6 to-transparent pointer-events-none z-0"></div>
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-r from-roman-red/10 via-roman-gold/8 to-roman-red/10 pointer-events-none z-0"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-3 bg-gold-gradient text-white px-6 py-3 rounded-full text-sm font-classical font-medium mb-8 shadow-gold">
                            <Crown className="h-5 w-5" />
                            Modern Digital Learning Experience
                        </div>
                        <h2 className="text-6xl md:text-7xl font-classical font-bold mb-8 leading-tight">
                            <span className="text-roman-red">Master Latin</span>
                            <br />
                            <span className="text-roman-black">with</span>
                            <br />
                            <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent font-extrabold tracking-tight">
                                Interactive Excellence
                            </span>
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
                            Transform your Latin studies with our comprehensive digital companion to the <strong className="text-roman-gold">Cambridge Latin</strong> textbook.
                            Experience immersive lessons, interactive exercises, and intelligent practice tools designed for serious learners.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="/lesson/1" className="inline-block">
                                <Button 
                                    size="lg" 
                                    className="bg-roman-gradient hover:shadow-roman text-white px-10 py-6 text-lg font-classical font-semibold shadow-roman transition-all duration-300 group border-none"
                                >
                                    Start Learning Now
                                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </a>
                            <Button 
                                variant="outline" 
                                size="lg"
                                className="glass-effect border-roman-gold text-roman-red hover:bg-roman-gold/10 px-10 py-6 text-lg font-classical font-semibold shadow-gold transition-all duration-300"
                                onClick={() => setActiveTab('textbook')}
                            >
                                <Scroll className="mr-3 h-6 w-6" />
                                Browse Textbook
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Imperial Tabs */}
            <main className="container mx-auto px-6 py-16">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
                    <div className="flex justify-center">
                        <TabsList className="glass-effect p-2 h-auto shadow-gold border border-roman-gold/20">
                            <TabsTrigger 
                                value="lessons" 
                                className="flex flex-col items-center gap-2 py-4 px-8 data-[state=active]:bg-roman-gradient data-[state=active]:text-white data-[state=active]:shadow-roman rounded-lg font-classical transition-all"
                            >
                                <GraduationCap className="h-6 w-6" />
                                <span>Lessons</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="textbook" 
                                className="flex flex-col items-center gap-2 py-4 px-8 data-[state=active]:bg-gold-gradient data-[state=active]:text-white data-[state=active]:shadow-gold rounded-lg font-classical transition-all"
                            >
                                <Scroll className="h-6 w-6" />
                                <span>Textbook</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="vocabulary" 
                                className="flex flex-col items-center gap-2 py-4 px-8 data-[state=active]:bg-roman-gradient data-[state=active]:text-white data-[state=active]:shadow-roman rounded-lg font-classical transition-all"
                            >
                                <Brain className="h-6 w-6" />
                                <span>Vocabulary</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="quiz" 
                                className="flex flex-col items-center gap-2 py-4 px-8 data-[state=active]:bg-gold-gradient data-[state=active]:text-white data-[state=active]:shadow-gold rounded-lg font-classical transition-all"
                            >
                                <Trophy className="h-6 w-6" />
                                <span>Quiz</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="leaderboard" 
                                className="flex flex-col items-center gap-2 py-4 px-8 data-[state=active]:bg-roman-gradient data-[state=active]:text-white data-[state=active]:shadow-roman rounded-lg font-classical transition-all"
                            >
                                <Crown className="h-6 w-6" />
                                <span>Leaderboard</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    
                    <TabsContent value="lessons" className="space-y-12">
                        <div className="w-full mx-auto">
                            {/* User Progress Section */}
                            <div className="mb-12">
                                <UserProgress />
                            </div>
                            
                            <div className="grid gap-8 md:grid-cols-3 mb-16">
                                {/* Imperial Stats */}
                                <Card className="glass-effect shadow-roman border-roman-gold/20">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg text-roman-red flex items-center gap-3 font-classical">
                                            <div className="p-2 bg-roman-gradient rounded-lg">
                                                <Clock className="h-5 w-5 text-white" />
                                            </div>
                                            Study Progress
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-4xl font-classical font-bold text-roman-red mb-2">1/50</div>
                                        <div className="text-sm text-muted-foreground">Lessons Completed</div>
                                    </CardContent>
                                </Card>

                                <Card className="glass-effect shadow-gold border-roman-gold/20">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg text-roman-gold flex items-center gap-3 font-classical">
                                            <div className="p-2 bg-gold-gradient rounded-lg">
                                                <Brain className="h-5 w-5 text-white" />
                                            </div>
                                            Vocabulary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-4xl font-classical font-bold text-roman-gold mb-2">45</div>
                                        <div className="text-sm text-muted-foreground">Words Learned</div>
                                    </CardContent>
                                </Card>

                                {/* Study Session Tracker */}
                                <StudySessionTracker 
                                    lessonId={selectedLesson} 
                                    activityType="lesson"
                                />
                            </div>

                            <LessonNavigation 
                                selectedLesson={selectedLesson}
                                onLessonSelect={setSelectedLesson}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="textbook" className="space-y-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid gap-8 lg:grid-cols-4">
                                <div className="lg:col-span-3">
                                    <Card className="glass-effect shadow-roman border-roman-gold/20 overflow-hidden">
                                        <CardHeader className="bg-gradient-to-r from-roman-cream to-roman-marble border-b border-roman-gold/20">
                                            <CardTitle className="text-xl text-roman-red flex items-center gap-4 font-classical">
                                                <div className="p-3 bg-gold-gradient rounded-lg shadow-gold">
                                                    <Scroll className="h-6 w-6 text-white" />
                                                </div>
                                                Cambridge Textbook
                                            </CardTitle>
                                            <CardDescription className="text-muted-foreground">Interactive PDF reader with study tools</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            {activeTab === 'textbook' && (
                                                <PDFReader 
                                                    pdfUrl={PDF_URL}
                                                    currentPage={currentPage}
                                                    onPageChange={setCurrentPage}
                                                />
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="space-y-8">
                                    <Card className="glass-effect shadow-roman border-roman-gold/20">
                                        <CardHeader>
                                            <CardTitle className="text-lg text-roman-red font-classical">Study Tools</CardTitle>
                                            <CardDescription className="text-muted-foreground">
                                                Quick access to lesson resources
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="bg-roman-gradient/10 backdrop-blur-sm rounded-lg p-4 border border-roman-gold/20">
                                                <div className="font-classical font-medium text-roman-red mb-1">Current Lesson: {selectedLesson}</div>
                                                <div className="text-muted-foreground text-sm">Page {currentPage}</div>
                                            </div>
                                            <div className="space-y-3 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                                                    Go to Vocabulary for word practice
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                                                    Go to Quiz for knowledge testing
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                                                    Go to Lessons for chapter navigation
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="glass-effect shadow-gold border-roman-gold/20">
                                        <CardHeader>
                                            <CardTitle className="text-lg text-roman-gold font-classical">Reading Tips</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm space-y-3 text-muted-foreground">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                                Control zoom for text size
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                                Take notes on vocabulary
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                                Practice pronunciation aloud
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                                Review grammar forms
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="glass-effect shadow-gold border-roman-gold/20">
                                        <CardHeader>
                                            <CardTitle className="text-lg text-roman-gold flex items-center gap-3 font-classical">
                                                <div className="w-8 h-8 bg-gold-gradient rounded-full flex items-center justify-center">
                                                    <Crown className="h-4 w-4 text-white" />
                                                </div>
                                                Ask Teacher Marcus
                                            </CardTitle>
                                            <CardDescription className="text-muted-foreground">
                                                Get help with the textbook
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <MagisterChat 
                                                context={`Reading textbook page ${currentPage}`}
                                                compact={true}
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="vocabulary" className="space-y-12">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <h3 className="text-4xl font-classical font-bold mb-6 text-roman-red">
                                    Vocabulary Practice
                                </h3>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Master Latin vocabulary with our intelligent spaced repetition system. 
                                    Practice both directions and track your progress.
                                </p>
                            </div>

                            <div className="flex justify-center mb-16">
                                {activeTab === 'vocabulary' && (
                                    <VocabularyDriller 
                                        selectedLesson={selectedLesson} 
                                        allowLessonSelection={true}
                                        allowMultipleLessons={true}
                                    />
                                )}
                            </div>
                            
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                <Card className="glass-effect shadow-roman border-roman-gold/20">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-roman-red flex items-center gap-3 font-classical">
                                            <div className="p-2 bg-roman-gradient rounded-lg">
                                                <Brain className="h-5 w-5 text-white" />
                                            </div>
                                            Study Strategy
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm space-y-4 text-muted-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                            Review words multiple times
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                            Practice both directions
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                            Focus on difficult words
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                            Use spaced repetition
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="glass-effect shadow-gold border-roman-gold/20">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-roman-gold flex items-center gap-3 font-classical">
                                            <div className="p-2 bg-gold-gradient rounded-lg">
                                                <Sparkles className="h-5 w-5 text-white" />
                                            </div>
                                            Memory Tips
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm space-y-4 text-muted-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                                            Create mental associations
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                                            Use words in sentences
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                                            Practice daily for best results
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                                            Review before advancing
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="glass-effect shadow-roman border-roman-gold/20 md:col-span-2 lg:col-span-1">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-roman-red flex items-center gap-3 font-classical">
                                            <div className="p-2 bg-roman-gradient rounded-lg">
                                                <Target className="h-5 w-5 text-white" />
                                            </div>
                                            Progress Tracking
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm space-y-4 text-muted-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                            Aim for 80%+ accuracy
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                            Track daily practice
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                            Review missed words
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                            Celebrate milestones!
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="quiz" className="space-y-12">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <h3 className="text-4xl font-classical font-bold mb-6 text-roman-gold">
                                    Knowledge Assessment
                                </h3>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Test your understanding with comprehensive quizzes covering vocabulary, grammar, and reading comprehension.
                                </p>
                            </div>

                            <div className="flex justify-center mb-16">
                                <Quiz selectedLesson={selectedLesson} />
                            </div>
                            
                            <div className="grid gap-8 md:grid-cols-2 mb-12">
                                <Card className="glass-effect shadow-gold border-roman-gold/20">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-roman-gold flex items-center gap-3 font-classical">
                                            <div className="p-2 bg-gold-gradient rounded-lg">
                                                <Trophy className="h-5 w-5 text-white" />
                                            </div>
                                            Quiz Rules
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm space-y-4 text-muted-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                                            Read each question carefully
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                                            Think before selecting answer
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                                            Review explanations for errors
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                                            Retake quizzes for better scores
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="glass-effect shadow-roman border-roman-gold/20">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-roman-red flex items-center gap-3 font-classical">
                                            <div className="p-2 bg-roman-gradient rounded-lg">
                                                <Star className="h-5 w-5 text-white" />
                                            </div>
                                            Score Guide
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm space-y-4 text-muted-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                            90-100%: Excellent mastery
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                            80-89%: Good understanding
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                            70-79%: Some review needed
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full"></div>
                                            Below 70%: More study required
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            
                            <div className="flex justify-center">
                                <Card className="glass-effect shadow-gold border-roman-gold/20 max-w-lg">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-roman-gold flex items-center gap-3 font-classical">
                                            <div className="w-8 h-8 bg-gold-gradient rounded-full flex items-center justify-center">
                                                <Crown className="h-4 w-4 text-white" />
                                            </div>
                                            Ask Teacher Marcus
                                        </CardTitle>
                                        <CardDescription className="text-muted-foreground">
                                            Get help with quiz questions
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <MagisterChat 
                                            lesson={selectedLesson}
                                            context={`Quiz practice for lesson ${selectedLesson}`}
                                            compact={true}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="leaderboard" className="space-y-12">
                        <div className="w-full mx-auto">
                            <div className="text-center mb-16">
                                <h3 className="text-4xl font-classical font-bold mb-6 text-roman-red">
                                    Study Time Leaderboard
                                </h3>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-classical">
                                    See how you rank among your fellow Latin students. Track your progress and compete for the top spots!
                                </p>
                            </div>

                            <Leaderboard currentUserId={session?.user?.id} />

                            {!session && (
                                <div className="mt-12 flex justify-center">
                                    <Card className="glass-effect shadow-gold border-roman-gold/20 max-w-md">
                                        <CardContent className="p-10 text-center">
                                            <div className="text-roman-gold mb-6">
                                                <Crown className="h-16 w-16 mx-auto" />
                                            </div>
                                            <h3 className="text-xl font-classical font-semibold text-roman-red mb-4">Join the Competition!</h3>
                                            <p className="text-roman-black/70 mb-6 leading-relaxed font-classical">
                                                Sign in to track your study time and appear on the leaderboard
                                            </p>
                                            <Button 
                                                onClick={() => window.location.href = '/auth/signin'}
                                                className="bg-roman-gradient hover:shadow-roman text-white font-classical border-none px-8 py-3"
                                            >
                                                Sign In to Compete
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            {/* Imperial Footer */}
            <footer className="border-t border-roman-gold/20 bg-gradient-to-r from-roman-marble to-roman-cream mt-20">
                <div className="container mx-auto px-6 py-16">
                    <div className="text-center">
                        <div className="flex justify-center mb-8">
                            <div className="p-4 bg-roman-gradient rounded-lg shadow-roman">
                                <Columns className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <h4 className="text-3xl font-classical font-bold mb-4 text-roman-red">
                            DigitalLudus
                        </h4>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-lg leading-relaxed">
                            Making Latin accessible through technology. An open source initiative to democratize classical education.
                        </p>
                        <div className="text-sm text-muted-foreground font-classical">
                            A Max Liu & Ronald Qiao production • © {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
