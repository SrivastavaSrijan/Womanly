import { PrismaClient } from '@prisma/client';
import { Claims, getSession } from '@auth0/nextjs-auth0';
import prisma from '../src/lib/prisma';

export type Context = {
  user?: Claims
  accessToken?: string
  prisma: PrismaClient
}

/** Asynchronous fn  createContext()
 * @returns Prisma instance created in the lib directory.
 * @returns User Context and Access Token
 */
export async function createContext({ req, res }: any): Promise<Context> {
  const session = getSession(req, res);
  /** If the user is not logged in, omit returning the user and accessToken */
  if (!session) return { prisma };

  const { user, accessToken } = session;
  return {
    user,
    accessToken,
    prisma,
  };
}
