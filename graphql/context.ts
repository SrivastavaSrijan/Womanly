import { PrismaClient } from '@prisma/client';
import prisma from '../src/lib/prisma';

export type Context = {
  prisma: PrismaClient;
};

/** Asynchronous fn  createContext()
 * @returns Prisma instance created in the lib directory.
 */
export async function createContext({ req, res }: any): Promise<Context> {
  return {
    prisma,
  };
}
