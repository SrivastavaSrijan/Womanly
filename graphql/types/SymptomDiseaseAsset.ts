import { startsWith, filter } from 'lodash';
import { objectType, extendType, stringArg, nonNull } from 'nexus';

export const SymptomDiseaseAsset = objectType({
  name: 'SymptomDiseaseAsset',
  definition(t) {
    t.string('id');
    t.string('diseaseName');
    t.list.string('symptomsList');
  },
});

export const List = objectType({
  name: 'List',
  definition(t) {
    t.string('id');
    t.nonNull.list.string('payload');
  },
});

export const SymptomTypeaheadQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('SymptomTypeahead', {
      type: 'List',
      args: {
        searchString: nonNull(stringArg()),
      },
      async resolve(_parent, _args, ctx) {
        const { searchString = '' } = _args;
        if (searchString !== '' && searchString.length >= 3) {
          const allSymptoms = await ctx.prisma.list.findMany({ select: { payload: true }, where: { id: '624dba897f848bfa560a88d2' } });
          const result = filter(
            allSymptoms[0]?.payload,
            (symptom: string) => startsWith(symptom, searchString),
          );
          return { id: '624dba897f848bfa560a88d2', payload: result };
        }
        return null;
      },
    });
  },
});

export const SymptomDiseaseAssetQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('SymptomDiseaseLinkers', {
      type: 'SymptomDiseaseAsset',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.symptomDiseaseAsset.findMany();
      },
    });
  },
});
