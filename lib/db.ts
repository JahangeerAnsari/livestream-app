// we create prisma client to prevent to the hot reload
// in production we don't want hot reload

import { PrismaClient } from '@prisma/client'
declare global{
 var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV !== 'production') globalThis.prisma = db;