/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

const { getUserId } = require("../utils");

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
function places(parent, args, ctx) {
  return ctx.prisma.country
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .places();
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function countries(parent, args, ctx) {
  const where = args.filter ? {
    name: {
      contains: args.filter
    }
  } : {}

  const results = await ctx.prisma.country.findMany({
    where
  })

  return results;
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function country(parent, args, ctx) {
  let country = await ctx.prisma.country.findUnique({
    where: {
      id: Number(args.id)
    }
  })

  if (!country) {
    throw new Error(`Specified country ${args.id} does not exist`);
  }

  let places = await ctx.prisma.place.findMany({
    where: {
      countryId: country.id,
    }
  })

  let attractions = await Promise.all(places.map(async (place) => {
    return await ctx.prisma.attraction.findMany({
      where: {
        locatedInId: place.id
      }
    })
  }))

  return {
    places,
    attractions: attractions.flat()
  };
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function addCountry(parent, args, ctx) {
  let input = args.input;

  const user = ctx.prisma.user.findUnique({
    where: {
      id: ctx.userId
    }
  })
  if (!user.admin) {
    throw new Error("Not authenticated as admin");
  }

  const newCountry = await ctx.prisma.country.create({
    data: {
      name: input.name
    }
  })

  return newCountry;
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function removeCountry(parent, args, ctx) {
  let input = args.input;

  const user = ctx.prisma.user.findUnique({
    where: {
      id: ctx.userId
    }
  })
  if (!user.admin) {
    throw new Error("Not authenticated as admin");
  }
  
  let country = await ctx.prisma.country.findUnique({
    where: {
      name: input.name
    }
  })

  if (!country) {
    throw new Error(`Specified country ${args.id} does not exist`);
  }

  let old = await ctx.prisma.country.delete({
    where: {
      name: input.name
    }
  })
  return old;
}

module.exports = {
  queries: {
    countries,
    country
  },
  mutations: {
    addCountry,
    removeCountry
  },
  resolvers: {
    places
  }
};
