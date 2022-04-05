import { PrismaClient } from '@prisma/client';

/** Define and export Global Prisma Client Object */
// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;
const globalObject: any = global;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalObject.prisma) {
    globalObject.prisma = new PrismaClient();
  }
  prisma = globalObject.prisma;
}

export default prisma;
