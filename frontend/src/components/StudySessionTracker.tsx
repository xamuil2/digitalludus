import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Square, Clock } from 'lucide-react';

interface StudySessionTrackerProps {
  lessonId?: number;
  activityType?: string;
  onTimeUpdate?: (totalTime: number) => void;
}

export default function StudySessionTracker({ 
  lessonId = 1, 
  activityType = 'general',
  onTimeUpdate 
}: StudySessionTrackerProps) {
  const { data: session } = useSession();
  const [isStudying, setIsStudying] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isStudying) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStudying]);

  // Fetch user's total study time on mount
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
        setTotalStudyTime(data.user?.totalStudyTime || 0);
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    }
  };

  const startStudySession = async () => {
    if (!session?.user?.id) {
      alert('Please sign in to track study time!');
      return;
    }

    try {
      const response = await fetch('/api/study-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, activityType })
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentSessionId(data.sessionId);
        setIsStudying(true);
        setSessionTime(0);
        console.log('Study session started:', data.sessionId);
      } else {
        throw new Error('Failed to start session');
      }
    } catch (error) {
      console.error('Error starting study session:', error);
      alert('Failed to start study session. Please try again.');
    }
  };

  const pauseStudySession = () => {
    setIsStudying(false);
  };

  const resumeStudySession = () => {
    setIsStudying(true);
  };

  const endStudySession = async () => {
    if (!currentSessionId) return;

    try {
      const response = await fetch('/api/study-session', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: currentSessionId })
      });

      if (response.ok) {
        const data = await response.json();
        setIsStudying(false);
        setCurrentSessionId(null);
        const sessionMinutes = Math.floor(sessionTime / 60);
        setTotalStudyTime(prev => prev + sessionMinutes);
        setSessionTime(0);
        
        // Call the callback if provided
        if (onTimeUpdate) {
          onTimeUpdate(totalStudyTime + sessionMinutes);
        }
        
        console.log(`Study session ended: ${data.duration} minutes`);
        alert(`Great job! You studied for ${data.duration} minutes.`);
        
        // Trigger a page refresh to update all stats
        window.location.reload();
      } else {
        throw new Error('Failed to end session');
      }
    } catch (error) {
      console.error('Error ending study session:', error);
      alert('Failed to end study session. Your time may not be saved.');
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!session?.user) {
    return (
      <Card className="border-0 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg shadow-amber-100/50">
        <CardContent className="p-4 text-center">
          <Clock className="h-8 w-8 text-amber-600 mx-auto mb-2" />
          <p className="text-amber-700 text-sm">Sign in to track your study time!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg shadow-green-100/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-green-800 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Study Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Session Display */}
        <div className="text-center">
          <div className="text-3xl font-bold text-green-900 mb-1">
            {formatTime(sessionTime)}
          </div>
          <div className="text-sm text-green-600">
            {isStudying ? 'Studying now...' : currentSessionId ? 'Paused' : 'Ready to study'}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge 
            variant={isStudying ? "default" : "secondary"}
            className={`${
              isStudying 
                ? 'bg-green-600 text-white' 
                : currentSessionId 
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-500 text-white'
            }`}
          >
            {isStudying ? 'Active' : currentSessionId ? 'Paused' : 'Inactive'}
          </Badge>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2 justify-center">
          {!currentSessionId ? (
            <Button 
              onClick={startStudySession}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Studying
            </Button>
          ) : (
            <>
              {isStudying ? (
                <Button 
                  onClick={pauseStudySession}
                  variant="outline"
                  size="sm"
                  className="border-yellow-500 text-yellow-700 hover:bg-yellow-50"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button 
                  onClick={resumeStudySession}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              )}
              <Button 
                onClick={endStudySession}
                variant="outline"
                size="sm"
                className="border-red-500 text-red-700 hover:bg-red-50"
              >
                <Square className="h-4 w-4 mr-2" />
                End Session
              </Button>
            </>
          )}
        </div>

        {/* Total Study Time */}
        <div className="pt-3 border-t border-green-200 text-center">
          <div className="text-sm text-green-600 mb-1">Total Study Time</div>
          <div className="text-xl font-semibold text-green-800">
            {Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m
          </div>
        </div>

        {/* Activity Info */}
        <div className="text-xs text-green-600 text-center">
          Lesson {lessonId} • {activityType}
        </div>
      </CardContent>
    </Card>
  );
}
