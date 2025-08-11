import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database initialization for server-side only
export async function initializeDatabase() {
  // Only run on server-side (Node.js environment)
  if (typeof window !== 'undefined') {
    console.warn('Database initialization should not run in browser')
    return false
  }
  
  try {
    // Test the connection
    await prisma.$connect()
    console.log('Database connected successfully')
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}
