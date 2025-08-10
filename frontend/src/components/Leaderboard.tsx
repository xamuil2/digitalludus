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
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-slate-600">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-200 rounded animate-pulse"></div>
              <div>
                <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-60 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mb-2"></div>
                    <div className="h-3 w-24 bg-slate-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-6 w-16 bg-slate-200 rounded animate-pulse"></div>
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
      <Card className="border-0 shadow-lg shadow-slate-200/50">
        <CardContent className="p-8 text-center">
          <div className="text-red-500 mb-4">
            <TrendingUp className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Unable to Load Leaderboard</h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <Button onClick={fetchLeaderboard} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.leaderboard.length === 0) {
    return (
      <Card className="border-0 shadow-lg shadow-slate-200/50">
        <CardContent className="p-8 text-center">
          <div className="text-slate-400 mb-4">
            <Users className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No Rankings Yet</h3>
          <p className="text-slate-600">
            Be the first to start studying and claim the top spot!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-xl shadow-slate-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-2xl text-slate-800">Study Time Leaderboard</CardTitle>
                <CardDescription>
                  Top Latin learners ranked by dedication and progress
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Users className="h-4 w-4" />
              {data.totalUsers} students competing
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={period} onValueChange={(value) => setPeriod(value as 'daily' | 'weekly' | 'monthly' | 'all-time')} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="daily" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Daily
              </TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="all-time">All Time</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-3">
            {data.leaderboard.map((user, index) => (
              <div
                key={user.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:shadow-md ${
                  user.id === currentUserId
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200'
                    : 'bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200'
                }`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-12">
                  {index < 3 ? (
                    <div className={`p-2 rounded-full ${getRankBadgeColor(user.rank)}`}>
                      {getRankIcon(user.rank)}
                    </div>
                  ) : (
                    getRankIcon(user.rank)
                  )}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center overflow-hidden">
                    {user.image ? (
                      <img 
                        src={user.image} 
                        alt={user.displayName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-medium text-sm">
                        {user.displayName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-800">
                        {user.displayName}
                        {user.id === currentUserId && (
                          <Badge variant="secondary" className="ml-2 text-xs">You</Badge>
                        )}
                      </h4>
                      {user.isActive && (
                        <div className="w-2 h-2 bg-green-400 rounded-full" title="Active user" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {user.studyTimeFormatted}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {user.currentStreak} day streak
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {user.averageScore}% avg
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-800">
                    {user.studyTimeFormatted}
                  </div>
                  <div className="text-sm text-slate-500">
                    {user.lessonsCompleted} lessons
                  </div>
                </div>
              </div>
            ))}
          </div>

          {data.leaderboard.length >= 50 && (
            <div className="text-center mt-6 pt-4 border-t">
              <p className="text-sm text-slate-500">
                Showing top 50 students • Updated every hour
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Period Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-lg shadow-amber-100/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-amber-600" />
              <div>
                <div className="text-2xl font-bold text-amber-900">
                  {data.leaderboard[0]?.studyTimeFormatted || '0m'}
                </div>
                <div className="text-sm text-amber-700">Top Study Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-100/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-900">
                  {Math.max(...data.leaderboard.map(u => u.currentStreak))}
                </div>
                <div className="text-sm text-green-700">Longest Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-100/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-900">{data.totalUsers}</div>
                <div className="text-sm text-blue-700">Active Students</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
