import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Type for the selected user fields in leaderboard query
type LeaderboardUser = {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
  totalStudyTime: number;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  quizzesTaken: number;
  vocabularyMastered: number;
  averageScore: number;
  lastActive: Date;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { limit = '50', period = 'all-time' } = req.query;
    
    // Get the date filter based on period
    let dateFilter = {};
    const now = new Date();
    
    switch (period) {
      case 'daily':
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);
        dateFilter = { lastActive: { gte: startOfDay } };
        break;
      case 'weekly':
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - 7);
        dateFilter = { lastActive: { gte: startOfWeek } };
        break;
      case 'monthly':
        const startOfMonth = new Date(now);
        startOfMonth.setDate(now.getDate() - 30);
        dateFilter = { lastActive: { gte: startOfMonth } };
        break;
      case 'all-time':
      default:
        // No filter for all-time
        break;
    }

    // Get top users by total study time
    const topUsers = await prisma.user.findMany({
      where: {
        totalStudyTime: { gt: 0 },
        ...dateFilter
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        totalStudyTime: true,
        currentStreak: true,
        longestStreak: true,
        lessonsCompleted: true,
        quizzesTaken: true,
        vocabularyMastered: true,
        averageScore: true,
        lastActive: true,
      },
      orderBy: [
        { totalStudyTime: 'desc' },
        { averageScore: 'desc' },
        { lessonsCompleted: 'desc' }
      ],
      take: parseInt(limit as string)
    });

    // Calculate ranks and additional stats
    const leaderboard = topUsers.map((user: LeaderboardUser, index: number) => ({
      rank: index + 1,
      ...user,
      displayName: user.username || user.name || 'Anonymous',
      studyTimeFormatted: formatStudyTime(user.totalStudyTime),
      isActive: isUserActive(user.lastActive),
    }));

    // Get total user count for context
    const totalUsers = await prisma.user.count({
      where: {
        totalStudyTime: { gt: 0 },
        ...dateFilter
      }
    });

    res.status(200).json({
      leaderboard,
      totalUsers,
      period,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}

function formatStudyTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours < 24) {
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }
  
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
}

function isUserActive(lastActive: Date): boolean {
  const now = new Date();
  const timeDiff = now.getTime() - lastActive.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  
  return daysDiff <= 7; // Active if seen within last 7 days
}
