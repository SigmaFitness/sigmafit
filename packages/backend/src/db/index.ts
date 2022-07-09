

import { PrismaClient } from '@prisma/client'


// we are having a single object which can be used across all routes
export const prisma = new PrismaClient(
    {
        // log: ['query', 'info', 'warn', 'error'],
    }
)


