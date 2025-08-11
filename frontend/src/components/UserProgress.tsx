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
      <Card className="glass-effect shadow-roman border-roman-gold/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-roman-marble rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-5 bg-roman-marble rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-roman-marble rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (session?.user) {
    const displayName = userStats?.username || userStats?.name || session.user.name || 'Student';
    
    return (
      <Card className="glass-effect shadow-roman border-roman-gold/20 bg-gradient-to-r from-roman-cream to-roman-marble">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-roman-gradient rounded-full flex items-center justify-center overflow-hidden shadow-roman">
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
                <h3 className="text-xl font-classical font-semibold text-roman-red">
                  Welcome back, {displayName}!
                </h3>
                <p className="text-roman-black/70 font-classical">{session.user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-classical font-bold text-roman-red">
                    {userStats?.lessonsCompleted || 0}
                  </div>
                  <div className="text-sm text-roman-black font-classical">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-classical font-bold text-roman-gold">
                    {userStats?.averageScore ? `${Math.round(userStats.averageScore)}%` : '0%'}
                  </div>
                  <div className="text-sm text-roman-black font-classical">Average</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-classical font-bold text-roman-red">
                    {userStats?.currentStreak || 0}
                  </div>
                  <div className="text-sm text-roman-black font-classical">Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-classical font-bold text-roman-gold">
                    {Math.floor((userStats?.totalStudyTime || 0) / 60)}h
                  </div>
                  <div className="text-sm text-roman-black font-classical">Study Time</div>
                </div>
              </div>
              
              <Button
                onClick={handleSignOut}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="glass-effect border-roman-gold/30 text-roman-red hover:bg-roman-gold/10 hover:border-roman-gold font-classical"
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
    <Card className="glass-effect shadow-gold border-roman-gold/20 bg-gradient-to-r from-roman-marble to-roman-cream">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center shadow-gold">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-classical font-semibold text-roman-red">Save Your Progress</h3>
              <p className="text-roman-black/70 font-classical">Sign in to track your learning journey</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 text-sm text-roman-black mr-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                <span className="font-classical">Track progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                <span className="font-classical">Save scores</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-roman-gold rounded-full"></div>
                <span className="font-classical">Join leaderboard</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handleSignIn('google')}
                  disabled={isLoading}
                  className="bg-roman-gradient hover:shadow-roman text-white shadow-roman font-classical"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {isLoading ? 'Loading...' : 'Sign in with Google'}
                </Button>
                
                <Button
                  onClick={() => handleSignIn('email')}
                  disabled={isLoading}
                  variant="outline"
                  className="glass-effect border-roman-gold/30 text-roman-red hover:bg-roman-gold/10 hover:border-roman-gold font-classical"
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
