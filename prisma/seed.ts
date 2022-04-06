import { PrismaClient } from '@prisma/client';
import * as lodash from 'lodash';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.symptomDiseaseAsset.findMany({
    select: { symptomsList: true },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
