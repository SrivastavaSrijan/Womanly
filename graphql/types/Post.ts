import { objectType, extendType, booleanArg } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.string('id');
    t.string('title');
    t.boolean('isFeatured');
    t.string('desc');
    t.string('image');
    t.string('link');
    t.string('buttonText');
  },
});

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('Posts', {
      type: 'Post',
      args: {
        isFeatured: booleanArg(),
      },
      resolve(_parent, _args, ctx) {
        const { isFeatured = false } = _args;
        return ctx.prisma.post.findMany({
          where: {
            ...(isFeatured && { isFeatured: true }),
          },
        });
      },
    });
  },
});
