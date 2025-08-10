import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, LogIn, LogOut, Star } from 'lucide-react';

interface UserStats {
  id: string;
  name?: string;
  username?: string;
  email: string;
  totalStudyTime: number;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  averageScore: number;
  vocabularyMastered: number;
  quizzesTaken: number;
}

interface UserProgressProps {
  compact?: boolean;
}

export default function UserProgress(): React.ReactElement {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserStats();
    }
  }, [session]);

  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setUserStats(data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    }
  };

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    try {
      if (provider === 'google') {
        await signIn('google');
      } else {
        // Redirect to custom sign-in page
        window.location.href = '/auth/signin';
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showLoading = status === 'loading' || isLoading;

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

  if (session?.user) {
    const displayName = userStats?.username || userStats?.name || session.user.name || 'Student';
    
    return (
      <Card className="border-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 shadow-xl shadow-blue-200/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center overflow-hidden">
                {session.user.image ? (
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Welcome back, {displayName}!
                </h3>
                <p className="text-slate-600">{session.user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">
                    {userStats?.lessonsCompleted || 0}
                  </div>
                  <div className="text-sm text-blue-600">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-900">
                    {userStats?.averageScore ? `${Math.round(userStats.averageScore)}%` : '0%'}
                  </div>
                  <div className="text-sm text-green-600">Average</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900">
                    {userStats?.currentStreak || 0}
                  </div>
                  <div className="text-sm text-purple-600">Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-900">
                    {Math.floor((userStats?.totalStudyTime || 0) / 60)}h
                  </div>
                  <div className="text-sm text-amber-600">Study Time</div>
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
                Join leaderboard
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
                  {isLoading ? 'Loading...' : 'Sign in with Google'}
                </Button>
                
                <Button
                  onClick={() => handleSignIn('email')}
                  disabled={isLoading}
                  variant="outline"
                  className="bg-white/80 border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {isLoading ? 'Loading...' : 'Email Sign In'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
