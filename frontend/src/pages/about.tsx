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
    <div className="min-h-screen bg-marble ancient-texture">
      {/* Header */}
            {/* Header */}
      <header className="glass-effect shadow-roman sticky top-0 z-50 border-b border-roman-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="hover:bg-roman-gold/10 p-2 rounded-xl group text-roman-red"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="relative p-3 bg-roman-gradient rounded-lg shadow-roman">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-classical font-bold text-roman-red">DigitalLudus</h1>
                    <p className="text-sm text-muted-foreground font-medium">About Our Platform</p>
                  </div>
                </div>
              </div>
            </div>
            <Badge className="bg-gold-gradient text-white border-none px-4 py-2 text-sm font-classical shadow-gold">
              About DigitalLudus
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-classical font-bold mb-4 bg-gradient-to-r from-roman-red to-roman-gold bg-clip-text text-transparent">
              About DigitalLudus
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-classical">
              Most of this is filler text. So you can ignore it. Actual project description to come.
              <br />
              Democratizing classical education through innovative technology and accessible learning platforms.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="glass-effect shadow-roman border-roman-gold/20">
            <CardHeader>
              <CardTitle className="text-2xl font-classical text-roman-red flex items-center gap-3">
                <div className="p-2 bg-roman-gradient rounded-lg shadow-roman">
                  <Target className="h-6 w-6 text-white" />
                </div>
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-roman-black leading-relaxed">
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
            <Card className="glass-effect shadow-roman border-roman-gold/20">
              <CardHeader>
                <CardTitle className="text-xl font-classical text-roman-red flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Interactive Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="text-roman-black">
                <p>
                  Our platform combines traditional pedagogy with modern technology, featuring interactive exercises, 
                  adaptive quizzes, and immersive cultural content that brings ancient Rome to life.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect shadow-gold border-roman-gold/20">
              <CardHeader>
                <CardTitle className="text-xl font-classical text-roman-gold flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Intelligent Tutoring
                </CardTitle>
              </CardHeader>
              <CardContent className="text-roman-black">
                <p>
                  Meet Magister Marcellus, your personal Latin tutor who provides contextual help, explains 
                  complex grammar concepts, and shares fascinating insights about Roman culture and history.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect shadow-roman border-roman-gold/20">
              <CardHeader>
                <CardTitle className="text-xl font-classical text-roman-red flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Driven
                </CardTitle>
              </CardHeader>
              <CardContent className="text-roman-black">
                <p>
                  Built as an open-source project, DigitalLudus benefits from contributions by educators, 
                  developers, and Latin enthusiasts worldwide who share our passion for classical education.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect shadow-gold border-roman-gold/20">
              <CardHeader>
                <CardTitle className="text-xl font-classical text-roman-gold flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Global Access
                </CardTitle>
              </CardHeader>
              <CardContent className="text-roman-black">
                <p>
                  Available worldwide and completely free, our platform breaks down barriers to classical 
                  education and serves learners from diverse backgrounds and learning styles.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <Card className="glass-effect shadow-roman border-roman-gold/20">
            <CardHeader>
              <CardTitle className="text-2xl font-classical text-roman-red flex items-center gap-3">
                <div className="p-2 bg-roman-gradient rounded-lg shadow-roman">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                Created with Passion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-roman-black text-lg leading-relaxed">
                DigitalLudus was born from a simple belief: that the beauty and wisdom of Latin literature 
                should be accessible to everyone. Our team combines expertise in classical studies, modern 
                pedagogy, and cutting-edge technology to create an unparalleled learning experience.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Badge className="bg-roman-gradient text-white border-none px-4 py-2 shadow-roman">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Educational Excellence
                </Badge>
                <Badge className="bg-gold-gradient text-white border-none px-4 py-2 shadow-gold">
                  <Star className="h-4 w-4 mr-2" />
                  Innovation
                </Badge>
                <Badge className="bg-roman-gradient text-white border-none px-4 py-2 shadow-roman">
                  <Users className="h-4 w-4 mr-2" />
                  Community
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Links */}
          <Card className="glass-effect shadow-gold border-roman-gold/20">
            <CardHeader>
              <CardTitle className="text-xl font-classical text-roman-gold flex items-center gap-3">
                <Mail className="h-5 w-5" />
                Get Involved
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-roman-black">
                We welcome contributions from educators, developers, and Latin enthusiasts. 
                Join our community and help make classical education accessible to all.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  className="glass-effect border-roman-gold/30 hover:bg-roman-gold/10 hover:border-roman-gold text-roman-red font-medium"
                  onClick={() => window.open('https://github.com/xamuil2/digitalludus', '_blank')}
                >
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </Button>
                <Button 
                  variant="outline" 
                  className="glass-effect border-roman-gold/30 hover:bg-roman-gold/10 hover:border-roman-gold text-roman-red font-medium"
                  onClick={() => window.open('mailto:yliu13@exeter.edu', '_blank')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer Credits */}
          <div className="text-center text-roman-black/60 text-sm">
            <p className="mb-2 font-classical">
              A Max Liu & Ronald Qiao production • © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
