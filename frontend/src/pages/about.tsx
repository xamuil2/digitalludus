import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  BookOpen, 
  Users, 
  Target, 
  Heart, 
  GraduationCap, 
  Globe, 
  Lightbulb,
  Star,
  Github,
  Mail
} from 'lucide-react';

const About: React.FC = () => {
  const router = useRouter();

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
                  src="/logo-with-text.svg" 
                  alt="DigitalLudus Logo" 
                  className="h-12 w-auto"
                />
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              About DigitalLudus
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">
              About DigitalLudus
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Most of this is filler text. So you can ignore it. Actual project description to come.
              <br />
              Democratizing classical education through innovative technology and accessible learning platforms.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl shadow-blue-200/50">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-blue-700 leading-relaxed">
              <p>
                DigitalLudus is dedicated to making Latin education accessible to everyone, regardless of background or 
                geographic location. We believe that classical languages and Roman culture should not be confined to 
                elite institutions but should be available to all curious minds seeking to understand the foundations 
                of Western civilization.
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg shadow-emerald-200/50">
              <CardHeader>
                <CardTitle className="text-xl text-emerald-800 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Interactive Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="text-emerald-700">
                <p>
                  Our platform combines traditional pedagogy with modern technology, featuring interactive exercises, 
                  adaptive quizzes, and immersive cultural content that brings ancient Rome to life.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg shadow-amber-200/50">
              <CardHeader>
                <CardTitle className="text-xl text-amber-800 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Intelligent Tutoring
                </CardTitle>
              </CardHeader>
              <CardContent className="text-amber-700">
                <p>
                  Meet Magister Marcellus, your personal Latin tutor who provides contextual help, explains 
                  complex grammar concepts, and shares fascinating insights about Roman culture and history.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg shadow-purple-200/50">
              <CardHeader>
                <CardTitle className="text-xl text-purple-800 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Driven
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-700">
                <p>
                  Built as an open-source project, DigitalLudus benefits from contributions by educators, 
                  developers, and Latin enthusiasts worldwide who share our passion for classical education.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg shadow-rose-200/50">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Global Access
                </CardTitle>
              </CardHeader>
              <CardContent className="text-rose-700">
                <p>
                  Available worldwide and completely free, our platform breaks down barriers to classical 
                  education and serves learners from diverse backgrounds and learning styles.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 shadow-xl shadow-slate-200/50">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg">
                  <Heart className="h-6 w-6 text-slate-600" />
                </div>
                Created with Passion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed">
                DigitalLudus was born from a simple belief: that the beauty and wisdom of Latin literature 
                should be accessible to everyone. Our team combines expertise in classical studies, modern 
                pedagogy, and cutting-edge technology to create an unparalleled learning experience.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Educational Excellence
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  Innovation
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  Community
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Links */}
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl shadow-blue-200/50">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800 flex items-center gap-3">
                <Mail className="h-5 w-5" />
                Get Involved
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-blue-700">
                We welcome contributions from educators, developers, and Latin enthusiasts. 
                Join our community and help make classical education accessible to all.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  className="bg-white/80 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => window.open('https://github.com/xamuil2/digitalludus', '_blank')}
                >
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/80 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => window.open('mailto:yliu13@exeter.edu', '_blank')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer Credits */}
          <div className="text-center text-slate-500 text-sm">
            <p className="mb-2">
              A Max Liu & Ronald Qiao production • © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
