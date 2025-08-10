import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      // Get user profile with full stats
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          studySessions: {
            take: 10,
            orderBy: { startTime: 'desc' }
          },
          lessonProgress: {
            orderBy: { lastAccessed: 'desc' }
          },
          quizAttempts: {
            take: 5,
            orderBy: { completedAt: 'desc' }
          },
          achievements: {
            include: {
              achievement: true
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Calculate additional stats
      const recentActivity = await getRecentActivity(session.user.id);
      const streakInfo = await calculateStreak(session.user.id);

      res.status(200).json({
        user: {
          ...user,
          password: undefined, // Never expose password
        },
        stats: {
          recentActivity,
          streakInfo,
        }
      });
    } 
    
    else if (req.method === 'PUT') {
      // Update user profile
      const { name, username, bio, location, website } = req.body;
      
      // Check if username is taken (if provided and different from current)
      if (username) {
        const existingUser = await prisma.user.findFirst({
          where: {
            username,
            NOT: { id: session.user.id }
          }
        });
        
        if (existingUser) {
          return res.status(400).json({ message: 'Username is already taken' });
        }
      }

      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: name || undefined,
          username: username || undefined,
          bio: bio || undefined,
          location: location || undefined,
          website: website || undefined,
        },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          bio: true,
          location: true,
          website: true,
          image: true,
          totalStudyTime: true,
          currentStreak: true,
          longestStreak: true,
          lessonsCompleted: true,
          quizzesTaken: true,
          vocabularyMastered: true,
          averageScore: true,
        }
      });

      res.status(200).json({ user: updatedUser });
    }
    
    else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}

async function getRecentActivity(userId: string) {
  const sessions = await prisma.studySession.findMany({
    where: { 
      userId,
      endTime: { not: null }
    },
    orderBy: { startTime: 'desc' },
    take: 7
  });

  return sessions.map(session => ({
    date: session.startTime.toISOString().split('T')[0],
    duration: session.duration || 0,
    activityType: session.activityType,
    lessonId: session.lessonId,
  }));
}

async function calculateStreak(userId: string) {
  const sessions = await prisma.studySession.findMany({
    where: { 
      userId,
      endTime: { not: null },
      duration: { gt: 5 } // Only count sessions longer than 5 minutes
    },
    orderBy: { startTime: 'desc' },
    select: {
      startTime: true,
    }
  });

  if (sessions.length === 0) return { current: 0, longest: 0 };

  // Group sessions by date
  const dates = sessions.map(s => s.startTime.toISOString().split('T')[0]);
  const uniqueDatesSet = new Set(dates);
  const uniqueDates = Array.from(uniqueDatesSet).sort().reverse();

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Calculate current streak
  for (let i = 0; i < uniqueDates.length; i++) {
    const date = uniqueDates[i];
    
    if (i === 0) {
      // First date should be today or yesterday for active streak
      if (date === today || date === yesterday) {
        currentStreak = 1;
        tempStreak = 1;
      } else {
        break;
      }
    } else {
      const prevDate = new Date(uniqueDates[i - 1]);
      const currDate = new Date(date);
      const diffTime = prevDate.getTime() - currDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
        tempStreak++;
      } else {
        break;
      }
    }
    
    longestStreak = Math.max(longestStreak, tempStreak);
  }

  return { current: currentStreak, longest: longestStreak };
}
