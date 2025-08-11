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
    if (req.method === 'POST') {
      // Start a new study session
      const { lessonId, activityType } = req.body;
      
      const studySession = await prisma.studySession.create({
        data: {
          userId: session.user.id,
          lessonId: lessonId ? parseInt(lessonId) : null,
          activityType: activityType || 'general',
          startTime: new Date(),
        }
      });

      return res.status(201).json({ sessionId: studySession.id });
    } 
    
    if (req.method === 'PUT') {
      // End a study session
      const { sessionId } = req.body;
      
      const studySession = await prisma.studySession.findFirst({
        where: {
          id: sessionId,
          userId: session.user.id,
          endTime: null, // Only allow ending active sessions
        }
      });

      if (!studySession) {
        return res.status(404).json({ message: 'Study session not found' });
      }

      const endTime = new Date();
      const duration = Math.round((endTime.getTime() - studySession.startTime.getTime()) / (1000 * 60)); // in minutes

      await prisma.studySession.update({
        where: { id: sessionId },
        data: {
          endTime,
          duration,
        }
      });

      // Update user's total study time
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          totalStudyTime: {
            increment: duration
          }
        }
      });

      return res.status(200).json({ 
        message: 'Study session ended',
        duration: duration
      });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Study session error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
