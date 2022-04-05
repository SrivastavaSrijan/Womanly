import { objectType, extendType } from 'nexus';
export const SymptomDiseaseAsset = objectType({
  name: 'SymptomDiseaseAsset',
  definition(t) {
    t.string('id');
    t.string('diseaseName');
    t.list.string('symptomsList');
  }
});

export const SymptomDiseaseAssetQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('SymptomDiseaseLinkers', {
      type: 'SymptomDiseaseAsset',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.symptomDiseaseAsset.findMany();
      }
    });
  }
});
