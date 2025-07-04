import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, LogIn, LogOut, BookOpen, Trophy, Star } from 'lucide-react';

interface UserProgressProps {
  compact?: boolean;
}

export default function UserProgress({ compact = false }: UserProgressProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    // Dummy implementation - just show loading state briefly
    setTimeout(() => {
      setIsLoading(false);
      // Show a simple alert for now
      alert(`Sign in with ${provider} coming soon! Authentication is currently disabled for demo purposes.`);
    }, 1000);
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    // Dummy implementation - just show loading state briefly
    setTimeout(() => {
      setIsLoading(false);
      alert('Sign out functionality is currently disabled for demo purposes.');
    }, 1000);
  };

  // For demo purposes, always show signed-out state
  // Never show loading or signed-in state
  const showLoading = false;
  const session = null;

  if (showLoading) {
    return (
      <Card className="border-0 bg-gradient-to-r from-slate-50 to-slate-100 shadow-lg shadow-slate-200/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-5 bg-slate-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-slate-200 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // For demo purposes, always show signed-out state
  // if (session) {
  if (false) {
    return (
      <Card className="border-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 shadow-xl shadow-blue-200/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Welcome back, Student!
                </h3>
                <p className="text-slate-600">demo@digitalludus.org</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">3</div>
                  <div className="text-sm text-blue-600">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-900">85%</div>
                  <div className="text-sm text-green-600">Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900">24</div>
                  <div className="text-sm text-purple-600">Quizzes</div>
                </div>
              </div>
              
              <Button
                onClick={handleSignOut}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="bg-white/80 border-slate-300 hover:bg-slate-50 hover:border-slate-400"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isLoading ? 'Signing out...' : 'Sign out'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 shadow-xl shadow-amber-200/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Save Your Progress</h3>
              <p className="text-slate-600">Sign in to track your learning journey</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 text-sm text-amber-700 mr-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                Track progress
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                Save scores
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                Sync devices
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handleSignIn('google')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {isLoading ? 'Demo Mode...' : 'Sign in with Google (Demo)'}
                </Button>
                
                <Button
                  onClick={() => handleSignIn('email')}
                  disabled={isLoading}
                  variant="outline"
                  className="bg-white/80 border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {isLoading ? 'Demo Mode...' : 'Email (Demo)'}
                </Button>
              </div>
              <p className="text-xs text-amber-600">
                Authentication temporarily disabled for demo
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
