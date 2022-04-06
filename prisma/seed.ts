import { PrismaClient } from '@prisma/client';
import * as lodash from 'lodash';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.symptomDiseaseAsset.findMany({
    select: { symptomsList: true },
  });
  const { sortedUniq, concat, map, filter, startsWith, sortBy } = lodash;
  const a = map(
    sortedUniq(sortBy(concat(...map(result, 'symptomsList')))),
    (val) => val.toLowerCase()
  );
  await prisma.symptomsList.create({ data: { payload: a } });
  return prisma.symptomsList.findMany({ take: 100 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
