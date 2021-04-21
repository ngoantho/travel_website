/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
function attraction(parent, args, ctx) {
  return ctx.prisma.review
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .attraction();
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
function user(parent, args, ctx) {
  return ctx.prisma.review
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .user();
}

module.exports = {
  queries: {},
  mutations: {},
  resolvers: {
    attraction,
    user
  }
};
