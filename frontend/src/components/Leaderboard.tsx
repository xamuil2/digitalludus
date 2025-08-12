import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Award, Clock, TrendingUp, Users, Calendar, Star } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  id: string;
  displayName: string;
  image?: string;
  totalStudyTime: number;
  studyTimeFormatted: string;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  averageScore: number;
  isActive: boolean;
}

interface LeaderboardData {
  leaderboard: LeaderboardUser[];
  totalUsers: number;
  period: string;
  generatedAt: string;
}

interface LeaderboardProps {
  currentUserId?: string;
}

export default function Leaderboard({ currentUserId }: LeaderboardProps) {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'all-time'>('all-time');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [period]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/leaderboard?period=${period}&limit=50`);
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError('Failed to load leaderboard. Please try again.');
      console.error('Leaderboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-roman-gold" />;
      case 2:
        return <Medal className="h-6 w-6 text-roman-marble" />;
      case 3:
        return <Award className="h-6 w-6 text-roman-red" />;
      default:
        return <span className="text-lg font-classical font-bold text-roman-black">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gold-gradient text-white shadow-gold';
      case 2:
        return 'bg-gradient-to-r from-roman-marble to-roman-cream text-roman-black shadow-roman';
      case 3:
        return 'bg-roman-gradient text-white shadow-roman';
      default:
        return 'bg-roman-cream text-roman-black border border-roman-gold/20';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <Card className="glass-effect shadow-roman border-roman-gold/20">
          <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
              <div className="p-1.5 sm:p-2 bg-roman-gradient rounded-lg shadow-roman">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              Loading Leaderboard...
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="space-y-3 sm:space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 lg:gap-4 p-3 sm:p-4 bg-roman-cream rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-roman-marble rounded-full animate-pulse flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-3 sm:h-4 w-20 sm:w-32 bg-roman-marble rounded animate-pulse mb-2"></div>
                    <div className="h-2 sm:h-3 w-16 sm:w-24 bg-roman-marble rounded animate-pulse"></div>
                  </div>
                  <div className="h-4 sm:h-6 w-12 sm:w-16 bg-roman-marble rounded animate-pulse flex-shrink-0"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="glass-effect shadow-roman border-roman-gold/20">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="text-roman-red mb-3 sm:mb-4">
            <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
          </div>
          <h3 className="text-base sm:text-lg font-classical font-semibold text-roman-red mb-2">Unable to Load Leaderboard</h3>
          <p className="text-roman-black/70 font-classical mb-4 text-sm sm:text-base">{error}</p>
          <Button 
            onClick={fetchLeaderboard} 
            variant="outline"
            className="glass-effect border-roman-gold/30 text-roman-red hover:bg-roman-gold/10 hover:border-roman-gold font-classical touch-manipulation active:scale-95"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.leaderboard.length === 0) {
    return (
      <Card className="glass-effect shadow-roman border-roman-gold/20">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="text-roman-gold mb-3 sm:mb-4">
            <Users className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
          </div>
          <h3 className="text-base sm:text-lg font-classical font-semibold text-roman-red mb-2">No Rankings Yet</h3>
          <p className="text-roman-black/70 font-classical text-sm sm:text-base">
            Be the first to start studying and claim the top spot!
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="glass-effect shadow-roman border-roman-gold/20">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="text-roman-red mb-3 sm:mb-4">
            <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
          </div>
          <h3 className="text-base sm:text-lg font-classical font-semibold text-roman-red mb-2">Unable to Load Leaderboard</h3>
          <p className="text-roman-black/70 font-classical mb-4 text-sm sm:text-base">{error}</p>
          <Button 
            onClick={fetchLeaderboard} 
            variant="outline"
            className="glass-effect border-roman-gold/30 text-roman-red hover:bg-roman-gold/10 hover:border-roman-gold font-classical touch-manipulation active:scale-95"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.leaderboard.length === 0) {
    return (
      <Card className="glass-effect shadow-roman border-roman-gold/20">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="text-roman-gold mb-3 sm:mb-4">
            <Users className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
          </div>
          <h3 className="text-base sm:text-lg font-classical font-semibold text-roman-red mb-2">No Rankings Yet</h3>
          <p className="text-roman-black/70 font-classical text-sm sm:text-base">
            Be the first to start studying and claim the top spot!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="glass-effect shadow-roman border-roman-gold/20 bg-gradient-to-br from-roman-cream to-roman-marble">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-gold-gradient rounded-lg shadow-gold flex-shrink-0">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl text-roman-red font-classical truncate">Study Time Leaderboard</CardTitle>
                <CardDescription className="font-classical text-roman-black/70 text-sm sm:text-base">
                  Top Latin learners ranked by dedication and progress
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-roman-black/60 font-classical flex-shrink-0">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              {data.totalUsers} students competing
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <Tabs value={period} onValueChange={(value) => setPeriod(value as 'daily' | 'weekly' | 'monthly' | 'all-time')} className="mb-4 sm:mb-6">
            <TabsList className="glass-effect grid w-full grid-cols-4 border border-roman-gold/20 h-auto">
              <TabsTrigger 
                value="daily" 
                className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 py-2 px-1 xs:px-2 font-classical data-[state=active]:bg-roman-gradient data-[state=active]:text-white data-[state=active]:shadow-roman text-xs xs:text-sm"
              >
                <Calendar className="h-3 w-3 xs:h-4 xs:w-4" />
                <span className="hidden xs:inline">Daily</span>
                <span className="xs:hidden">Day</span>
              </TabsTrigger>
              <TabsTrigger 
                value="weekly"
                className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 py-2 px-1 xs:px-2 font-classical data-[state=active]:bg-gold-gradient data-[state=active]:text-white data-[state=active]:shadow-gold text-xs xs:text-sm"
              >
                <span className="hidden xs:inline">Weekly</span>
                <span className="xs:hidden">Week</span>
              </TabsTrigger>
              <TabsTrigger 
                value="monthly"
                className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 py-2 px-1 xs:px-2 font-classical data-[state=active]:bg-roman-gradient data-[state=active]:text-white data-[state=active]:shadow-roman text-xs xs:text-sm"
              >
                <span className="hidden xs:inline">Monthly</span>
                <span className="xs:hidden">Month</span>
              </TabsTrigger>
              <TabsTrigger 
                value="all-time"
                className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 py-2 px-1 xs:px-2 font-classical data-[state=active]:bg-gold-gradient data-[state=active]:text-white data-[state=active]:shadow-gold text-xs xs:text-sm"
              >
                <span className="hidden xs:inline">All Time</span>
                <span className="xs:hidden">All</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2 sm:space-y-3">
            {data.leaderboard.map((user, index) => (
              <div
                key={user.id}
                className={`flex items-center gap-2 sm:gap-3 lg:gap-4 p-3 sm:p-4 rounded-lg transition-all hover:shadow-roman touch-manipulation ${
                  user.id === currentUserId
                    ? 'bg-gradient-to-r from-roman-gold/10 to-roman-gold/20 border-2 border-roman-gold/40 glass-effect'
                    : 'bg-gradient-to-r from-roman-cream/50 to-roman-marble/50 hover:from-roman-cream hover:to-roman-marble glass-effect border border-roman-gold/10'
                }`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 flex-shrink-0">
                  {index < 3 ? (
                    <div className={`p-1 sm:p-2 rounded-full ${getRankBadgeColor(user.rank)}`}>
                      {getRankIcon(user.rank)}
                    </div>
                  ) : (
                    getRankIcon(user.rank)
                  )}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-roman-gradient rounded-full flex items-center justify-center overflow-hidden shadow-roman flex-shrink-0">
                    {user.image ? (
                      <img 
                        src={user.image} 
                        alt={user.displayName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-classical font-medium text-xs sm:text-sm">
                        {user.displayName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1">
                      <h4 className="font-classical font-semibold text-roman-red text-sm sm:text-base truncate">
                        {user.displayName}
                        {user.id === currentUserId && (
                          <Badge 
                            variant="secondary" 
                            className="ml-1 sm:ml-2 text-xs bg-roman-gold text-white font-classical shadow-gold"
                          >
                            You
                          </Badge>
                        )}
                      </h4>
                      {user.isActive && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-roman-gold rounded-full flex-shrink-0" title="Active user" />
                      )}
                    </div>
                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-roman-black/70 font-classical">
                      <span className="flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                        <span className="truncate">{user.studyTimeFormatted}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                        <span className="truncate">{user.currentStreak} day streak</span>
                      </span>
                      <span className="flex items-center gap-1 hidden sm:flex">
                        <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                        <span className="truncate">{user.averageScore}% avg</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right flex-shrink-0">
                  <div className="text-sm sm:text-base lg:text-lg font-classical font-bold text-roman-red">
                    {user.studyTimeFormatted}
                  </div>
                  <div className="text-xs sm:text-sm text-roman-black/60 font-classical">
                    {user.lessonsCompleted} lessons
                  </div>
                </div>
              </div>
            ))}
          </div>

          {data.leaderboard.length >= 50 && (
            <div className="text-center mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-roman-gold/20">
              <p className="text-xs sm:text-sm text-roman-black/60 font-classical">
                Showing top 50 students • Updated every hour
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Period Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card className="glass-effect shadow-gold border-roman-gold/20 bg-gradient-to-br from-roman-cream to-roman-marble">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-roman-gold flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-lg sm:text-xl lg:text-2xl font-classical font-bold text-roman-gold">
                  {data.leaderboard[0]?.studyTimeFormatted || '0m'}
                </div>
                <div className="text-xs sm:text-sm text-roman-black font-classical">Top Study Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect shadow-roman border-roman-gold/20 bg-gradient-to-br from-roman-cream to-roman-marble">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-roman-red flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-lg sm:text-xl lg:text-2xl font-classical font-bold text-roman-red">
                  {Math.max(...data.leaderboard.map(u => u.currentStreak))}
                </div>
                <div className="text-xs sm:text-sm text-roman-black font-classical">Longest Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect shadow-gold border-roman-gold/20 bg-gradient-to-br from-roman-cream to-roman-marble sm:col-span-2 md:col-span-1">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-roman-gold flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-lg sm:text-xl lg:text-2xl font-classical font-bold text-roman-red">{data.totalUsers}</div>
                <div className="text-xs sm:text-sm text-roman-black font-classical">Active Students</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
