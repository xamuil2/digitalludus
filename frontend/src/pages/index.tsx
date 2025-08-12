import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
            {/* Majestic Header - Mobile Optimized */}
            <header className="glass-effect shadow-roman sticky top-0 z-50 border-b border-roman-gold/20">
                <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
                            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                                <div className="relative p-2 sm:p-3 bg-roman-gradient rounded-lg shadow-roman flex-shrink-0">
                                    <Columns className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                    <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gold-gradient rounded-full flex items-center justify-center">
                                        <Crown className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-lg sm:text-2xl font-classical font-bold text-roman-red truncate">DigitalLudus</h1>
                                    <p className="text-xs sm:text-sm text-muted-foreground font-medium hidden sm:block">Interactive Latin Learning Platform</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                            <Button
                                variant="ghost"
                                onClick={() => window.location.href = '/about'}
                                className="text-roman-red hover:bg-roman-gold/10 hover:text-roman-gold font-medium text-xs sm:text-sm px-2 sm:px-4 touch-manipulation active:scale-95"
                            >
                                <span className="hidden xs:inline">About Ludus</span>
                                <span className="xs:hidden">About</span>
                            </Button>
                            <Badge className="bg-gold-gradient text-white border-none px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-classical shadow-gold">
                                <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Lesson </span>{selectedLesson}
                            </Badge>
                        </div>
                    </div>
                </div>
            </header>

            {/* Imperial Hero Section - Mobile Optimized */}
            <section
              className="relative overflow-hidden py-10 sm:py-16 md:py-20 bg-gradient-to-b from-gray-100 to-white cursor-crimson-spotlight"
              onMouseMove={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                const rect = target.getBoundingClientRect();
                const mx = ((e.clientX - rect.left) / rect.width) * 100;
                const my = ((e.clientY - rect.top) / rect.height) * 100;
                target.style.setProperty('--mx', `${mx}%`);
                target.style.setProperty('--my', `${my}%`);
              }}
              onMouseEnter={(e) => e.currentTarget.classList.add('rippling')}
              onAnimationEnd={(e) => e.currentTarget.classList.remove('rippling')}
            >
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center max-w-5xl mx-auto flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 sm:gap-3 bg-crimson text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-classical font-medium mb-6 sm:mb-8 shadow-crimson">
                            <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="hidden xs:inline">Modern </span>Digital Learning<span className="hidden xs:inline"> Experience</span>
                        </div>
                        <div className="rounded-xl px-2 sm:px-3 py-2 inline-block">
                          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-classical font-bold mb-6 sm:mb-8 leading-tight">
                              <span className="text-roman-black">Master Latin</span>
                              <br />
                              <span className="text-roman-black">with</span>
                              <br />
                              <span className="text-crimson font-extrabold tracking-tight">
                                  Interactive Excellence
                              </span>
                          </h2>
                        </div>
                        <p className="text-base sm:text-lg md:text-xl text-neutral-800 leading-relaxed mb-8 sm:mb-12 max-w-3xl mx-auto font-medium px-4">
                            Transform your Latin studies with our comprehensive digital companion to the <strong className="text-crimson">Cambridge Latin</strong> textbook.
                            Experience immersive lessons, interactive exercises, and intelligent practice tools designed for serious learners.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-lg sm:max-w-none">
                            <a href="/lesson/1" className="w-full sm:w-auto">
                                <Button 
                                    size="lg" 
                                    className="w-full sm:w-auto bg-crimson hover:bg-crimson/90 text-white px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-classical font-semibold shadow-crimson transition-all duration-300 group border-none"
                                >
                                    Start Learning Now
                                    <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </a>
                            <Button 
                                variant="outline" 
                                size="lg"
                                className="w-full sm:w-auto glass-effect border border-neutral-200 text-crimson hover:bg-neutral-100 px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-classical font-semibold transition-all duration-300"
                                onClick={() => setActiveTab('textbook')}
                            >
                                <Scroll className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                                Browse Textbook
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Imperial Tabs - Mobile Optimized */}
            <main className="container mx-auto px-3 sm:px-6 py-8 sm:py-16">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 sm:space-y-12">
                    {/* Partners Section - Mobile Optimized */}
                    <div className="glass-effect shadow-roman border border-roman-gold/20 rounded-xl p-4 sm:p-8 md:p-12">
                        <div className="text-center mb-4 sm:mb-6">
                            <h3 className="text-base sm:text-lg md:text-xl font-classical font-semibold text-roman-red">
                                Our partners are from:
                            </h3>
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                            <div className="relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                                <Image src="/Exeter.png" alt="Phillips Exeter Academy" fill className="object-contain" sizes="(max-width: 480px) 4rem, (max-width: 640px) 5rem, (max-width: 768px) 6rem, (max-width: 1024px) 7rem, 8rem" />
                            </div>
                            <div className="relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                                <Image src="/Andover.png" alt="Phillips Academy Andover" fill className="object-contain" sizes="(max-width: 480px) 4rem, (max-width: 640px) 5rem, (max-width: 768px) 6rem, (max-width: 1024px) 7rem, 8rem" />
                            </div>
                            <div className="relative w-20 h-16 xs:w-24 xs:h-20 sm:w-28 sm:h-24 md:w-32 md:h-28 lg:w-40 lg:h-32">
                                <Image src="/SPS.png" alt="St. Paul's School" fill className="object-contain" sizes="(max-width: 480px) 5rem, (max-width: 640px) 6rem, (max-width: 768px) 7rem, (max-width: 1024px) 8rem, 10rem" />
                            </div>
                            <div className="relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                                <Image src="/Taft.png" alt="The Taft School" fill className="object-contain" sizes="(max-width: 480px) 4rem, (max-width: 640px) 5rem, (max-width: 768px) 6rem, (max-width: 1024px) 7rem, 8rem" />
                            </div>
                            <div className="relative w-20 h-16 xs:w-24 xs:h-20 sm:w-28 sm:h-24 md:w-32 md:h-28 lg:w-40 lg:h-32">
                                <Image src="/Lawrenceville.png" alt="The Lawrenceville School" fill className="object-contain" sizes="(max-width: 480px) 5rem, (max-width: 640px) 6rem, (max-width: 768px) 7rem, (max-width: 1024px) 8rem, 10rem" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Tab Navigation - Mobile Optimized */}
                    <div className="flex justify-center overflow-x-auto pb-2">
                        <TabsList className="glass-effect p-1 sm:p-2 h-auto shadow-gold border border-roman-gold/20 flex-shrink-0 min-w-max">
                            <TabsTrigger 
                                value="lessons" 
                                className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-3 sm:px-8 data-[state=active]:bg-roman-gradient data-[state=active]:text-white data-[state=active]:shadow-roman rounded-lg font-classical transition-all text-xs sm:text-base"
                            >
                                <GraduationCap className="h-4 w-4 sm:h-6 sm:w-6" />
                                <span>Lessons</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="textbook" 
                                className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-3 sm:px-8 data-[state=active]:bg-crimson data-[state=active]:text-white rounded-lg font-classical transition-all text-xs sm:text-base"
                            >
                                <Scroll className="h-4 w-4 sm:h-6 sm:w-6" />
                                <span>Textbook</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="vocabulary" 
                                className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-3 sm:px-8 data-[state=active]:bg-crimson data-[state=active]:text-white data-[state=active]:shadow-roman rounded-lg font-classical transition-all text-xs sm:text-base"
                            >
                                <Brain className="h-4 w-4 sm:h-6 sm:w-6" />
                                <span>Vocabulary</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="quiz" 
                                className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-3 sm:px-8 data-[state=active]:bg-crimson data-[state=active]:text-white rounded-lg font-classical transition-all text-xs sm:text-base"
                            >
                                <Trophy className="h-4 w-4 sm:h-6 sm:w-6" />
                                <span>Quiz</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="leaderboard" 
                                className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-4 px-3 sm:px-8 data-[state=active]:bg-roman-gradient data-[state=active]:text-white data-[state=active]:shadow-roman rounded-lg font-classical transition-all text-xs sm:text-base"
                            >
                                <Crown className="h-4 w-4 sm:h-6 sm:w-6" />
                                <span>Leaderboard</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    
                    <TabsContent value="lessons" className="space-y-6 sm:space-y-8 lg:space-y-12">
                        <div className="w-full mx-auto">
                            {/* User Progress Section - Mobile Optimized */}
                            <div className="mb-6 sm:mb-8 lg:mb-12">
                                <UserProgress />
                            </div>
                            
                            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12 lg:mb-16">
                                {/* Imperial Stats - Mobile Optimized */}
                                <Card className="glass-effect shadow-roman border-roman-gold/20">
                                    <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                                        <CardTitle className="text-base sm:text-lg text-roman-red flex items-center gap-2 sm:gap-3 font-classical">
                                            <div className="p-1.5 sm:p-2 bg-roman-gradient rounded-lg">
                                                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                            </div>
                                            Study Progress
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                                        <div className="text-2xl sm:text-3xl lg:text-4xl font-classical font-bold text-roman-red mb-1 sm:mb-2">1/50</div>
                                        <div className="text-xs sm:text-sm text-muted-foreground">Lessons Completed</div>
                                    </CardContent>
                                </Card>

                                <Card className="glass-effect shadow-roman border-roman-gold/20">
                                    <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                                        <CardTitle className="text-base sm:text-lg text-roman-red flex items-center gap-2 sm:gap-3 font-classical">
                                            <div className="p-1.5 sm:p-2 bg-roman-gradient rounded-lg">
                                                <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                            </div>
                                            Vocabulary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                                        <div className="text-2xl sm:text-3xl lg:text-4xl font-classical font-bold text-roman-gold mb-1 sm:mb-2">45</div>
                                        <div className="text-xs sm:text-sm text-muted-foreground">Words Learned</div>
                                    </CardContent>
                                </Card>

                                {/* Study Session Tracker - Mobile Optimized */}
                                <div className="sm:col-span-2 lg:col-span-1">
                                    <StudySessionTracker 
                                        lessonId={selectedLesson} 
                                        activityType="lesson"
                                    />
                                </div>
                            </div>

                            <LessonNavigation 
                                selectedLesson={selectedLesson}
                                onLessonSelect={setSelectedLesson}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="textbook" className="space-y-6 sm:space-y-8 lg:space-y-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-4">
                                <div className="lg:col-span-3">
                                    <Card className="glass-effect shadow-roman border-roman-gold/20 overflow-hidden">
                                        <CardHeader className="bg-gradient-to-r from-roman-cream to-roman-marble border-b border-roman-gold/20 px-4 sm:px-6 py-4 sm:py-6">
                                            <CardTitle className="text-lg sm:text-xl text-roman-red flex items-center gap-3 sm:gap-4 font-classical">
                                                <div className="p-2 sm:p-3 bg-gold-gradient rounded-lg shadow-gold">
                                                    <Scroll className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                                </div>
                                                Cambridge Textbook
                                            </CardTitle>
                                            <CardDescription className="text-muted-foreground text-sm sm:text-base">Interactive PDF reader with study tools</CardDescription>
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
                                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                                    <Card className="glass-effect shadow-roman border-roman-gold/20">
                                        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                                            <CardTitle className="text-base sm:text-lg text-roman-red font-classical">Study Tools</CardTitle>
                                            <CardDescription className="text-muted-foreground text-sm sm:text-base">
                                                Quick access to lesson resources
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                                            <div className="bg-roman-gradient/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-roman-gold/20">
                                                <div className="font-classical font-medium text-roman-red mb-1 text-sm sm:text-base">Current Lesson: {selectedLesson}</div>
                                                <div className="text-muted-foreground text-xs sm:text-sm">Page {currentPage}</div>
                                            </div>
                                            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
                                                    Go to Vocabulary for word practice
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
                                                    Go to Quiz for knowledge testing
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
                                                    Go to Lessons for chapter navigation
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="glass-effect shadow-gold border-roman-gold/20">
                                        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                                            <CardTitle className="text-base sm:text-lg text-roman-gold font-classical">Reading Tips</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-xs sm:text-sm space-y-2 sm:space-y-3 text-muted-foreground px-4 sm:px-6 pb-4 sm:pb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                                Control zoom for text size
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                                Take notes on vocabulary
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                                Practice pronunciation aloud
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                                Review grammar forms
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="glass-effect shadow-gold border-roman-gold/20">
                                        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                                            <CardTitle className="text-base sm:text-lg text-roman-gold flex items-center gap-3 font-classical">
                                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gold-gradient rounded-full flex items-center justify-center">
                                                    <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                                                </div>
                                                Ask Teacher Marcus
                                            </CardTitle>
                                            <CardDescription className="text-muted-foreground text-sm sm:text-base">
                                                Get help with the textbook
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
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

                    <TabsContent value="vocabulary" className="space-y-6 sm:space-y-8 lg:space-y-12">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-classical font-bold mb-4 sm:mb-6 text-roman-red">
                                    Vocabulary Practice
                                </h3>
                                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                                    Master Latin vocabulary with our intelligent spaced repetition system. 
                                    Practice both directions and track your progress.
                                </p>
                            </div>

                            <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                                {activeTab === 'vocabulary' && (
                                    <VocabularyDriller 
                                        selectedLesson={selectedLesson} 
                                        allowLessonSelection={true}
                                        allowMultipleLessons={true}
                                    />
                                )}
                            </div>
                            
                            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                <Card className="glass-effect shadow-roman border-roman-gold/20">
                                    <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                                        <CardTitle className="text-base sm:text-lg text-roman-red flex items-center gap-2 sm:gap-3 font-classical">
                                            <div className="p-1.5 sm:p-2 bg-roman-gradient rounded-lg">
                                                <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                            </div>
                                            Study Strategy
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xs sm:text-sm space-y-3 sm:space-y-4 text-muted-foreground px-4 sm:px-6 pb-4 sm:pb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                            Review words multiple times
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                            Practice both directions
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                            Focus on difficult words
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                            Use spaced repetition
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="glass-effect shadow-gold border-roman-gold/20">
                                    <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                                        <CardTitle className="text-base sm:text-lg text-roman-gold flex items-center gap-2 sm:gap-3 font-classical">
                                            <div className="p-1.5 sm:p-2 bg-gold-gradient rounded-lg">
                                                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                            </div>
                                            Memory Tips
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xs sm:text-sm space-y-3 sm:space-y-4 text-muted-foreground px-4 sm:px-6 pb-4 sm:pb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
                                            Create mental associations
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
                                            Use words in sentences
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
                                            Practice daily for best results
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
                                            Review before advancing
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="glass-effect shadow-roman border-roman-gold/20 md:col-span-2 lg:col-span-1">
                                    <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                                        <CardTitle className="text-base sm:text-lg text-roman-red flex items-center gap-2 sm:gap-3 font-classical">
                                            <div className="p-1.5 sm:p-2 bg-roman-gradient rounded-lg">
                                                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                            </div>
                                            Progress Tracking
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xs sm:text-sm space-y-3 sm:space-y-4 text-muted-foreground px-4 sm:px-6 pb-4 sm:pb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                            Aim for 80%+ accuracy
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                            Track daily practice
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                            Review missed words
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                            Celebrate milestones!
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="quiz" className="space-y-6 sm:space-y-8 lg:space-y-12">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-classical font-bold mb-4 sm:mb-6 text-roman-gold">
                                    Knowledge Assessment
                                </h3>
                                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                                    Test your understanding with comprehensive quizzes covering vocabulary, grammar, and reading comprehension.
                                </p>
                            </div>

                            <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                                <Quiz selectedLesson={selectedLesson} />
                            </div>
                            
                            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 mb-8 sm:mb-12">
                                <Card className="glass-effect shadow-gold border-roman-gold/20">
                                    <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                                        <CardTitle className="text-base sm:text-lg text-roman-gold flex items-center gap-2 sm:gap-3 font-classical">
                                            <div className="p-1.5 sm:p-2 bg-gold-gradient rounded-lg">
                                                <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                            </div>
                                            Quiz Rules
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xs sm:text-sm space-y-3 sm:space-y-4 text-muted-foreground px-4 sm:px-6 pb-4 sm:pb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
                                            Read each question carefully
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
                                            Think before selecting answer
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
                                            Review explanations for errors
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-gold rounded-full flex-shrink-0"></div>
                                            Retake quizzes for better scores
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="glass-effect shadow-roman border-roman-gold/20">
                                    <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                                        <CardTitle className="text-base sm:text-lg text-roman-red flex items-center gap-2 sm:gap-3 font-classical">
                                            <div className="p-1.5 sm:p-2 bg-roman-gradient rounded-lg">
                                                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                            </div>
                                            Score Guide
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xs sm:text-sm space-y-3 sm:space-y-4 text-muted-foreground px-4 sm:px-6 pb-4 sm:pb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                            90-100%: Excellent mastery
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                            80-89%: Good understanding
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                            70-79%: Some review needed
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-roman-red rounded-full flex-shrink-0"></div>
                                            Below 70%: More study required
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            
                            <div className="flex justify-center">
                                <Card className="glass-effect shadow-gold border-roman-gold/20 max-w-lg w-full mx-4 sm:mx-0">
                                    <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                                        <CardTitle className="text-base sm:text-lg text-roman-gold flex items-center gap-2 sm:gap-3 font-classical">
                                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gold-gradient rounded-full flex items-center justify-center">
                                                <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                                            </div>
                                            Ask Teacher Marcus
                                        </CardTitle>
                                        <CardDescription className="text-muted-foreground text-sm sm:text-base">
                                            Get help with quiz questions
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
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
                    <TabsContent value="leaderboard" className="space-y-6 sm:space-y-8 lg:space-y-12">
                        <div className="w-full mx-auto">
                            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-classical font-bold mb-4 sm:mb-6 text-roman-red">
                                    Study Time Leaderboard
                                </h3>
                                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-classical px-4">
                                    See how you rank among your fellow Latin students. Track your progress and compete for the top spots!
                                </p>
                            </div>

                            <Leaderboard currentUserId={session?.user?.id} />

                            {!session && (
                                <div className="mt-8 sm:mt-12 flex justify-center px-4">
                                    <Card className="glass-effect shadow-gold border-roman-gold/20 max-w-md w-full">
                                        <CardContent className="p-6 sm:p-8 lg:p-10 text-center">
                                            <div className="text-roman-gold mb-4 sm:mb-6">
                                                <Crown className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-classical font-semibold text-roman-red mb-3 sm:mb-4">Join the Competition!</h3>
                                            <p className="text-roman-black/70 mb-4 sm:mb-6 leading-relaxed font-classical text-sm sm:text-base">
                                                Sign in to track your study time and appear on the leaderboard
                                            </p>
                                            <Button 
                                                onClick={() => window.location.href = '/auth/signin'}
                                                className="bg-roman-gradient hover:shadow-roman text-white font-classical border-none px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
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

            {/* Imperial Footer - Mobile Optimized */}
            <footer className="border-t border-roman-gold/20 bg-gradient-to-r from-roman-marble to-roman-cream mt-12 sm:mt-16 lg:mt-20">
                <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
                    <div className="text-center">
                        <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
                            <div className="p-3 sm:p-4 bg-roman-gradient rounded-lg shadow-roman">
                                <Columns className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                            </div>
                        </div>
                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-classical font-bold mb-3 sm:mb-4 text-roman-red">
                            DigitalLudus
                        </h4>
                        <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4">
                            Making Latin accessible through technology. An open source initiative to democratize classical education.
                        </p>
                        <div className="text-xs sm:text-sm text-muted-foreground font-classical">
                            A Max Liu & Ronald Qiao production • © {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
