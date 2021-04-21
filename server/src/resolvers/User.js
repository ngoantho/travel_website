/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
function reviews(parent, args, ctx) {
  return ctx.prisma.user
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .reviews();
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function signup(parent, args, ctx) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await ctx.prisma.user.create({
    data: {...args, password},
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function login(parent, args, ctx) {
  const user = await ctx.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

module.exports = {
  queries: {},
  mutations: {
    signup,
    login
  },
  resolvers: {
    reviews
  }
};
