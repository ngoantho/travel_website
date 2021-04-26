/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
function country(parent, args, ctx) {
  return ctx.prisma.place
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .country();
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
function attractions(parent, args, ctx) {
  return ctx.prisma.place
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .attractions();
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function places(parent, args, ctx) {
  const where = args.filter
    ? {
        city: {
          contains: args.filter,
        },
      }
    : {};

  const results = await ctx.prisma.place.findMany({
    where,
  });

  return results;
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function place(parent, args, ctx) {
  let place = await ctx.prisma.place.findUnique({
    where: {
      id: Number(args.id),
    },
  });

  if (!place) {
    throw new Error(`Specified country ${args.id} does not exist`);
  }

  return place;
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function attractionsHere(parent, args, ctx) {
  let place = await ctx.prisma.place.findUnique({
    where: {
      id: Number(args.id),
    },
  });

  if (!place) {
    throw new Error(`Specified place ${args.id} does not exist`);
  }

  let attractions = await ctx.prisma.attraction.findMany({
    where: {
      locatedInId: place.id,
    },
  });

  return attractions;
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function addPlace(parent, args, ctx) {
  let input = args.input;

  const user = ctx.prisma.user.findUnique({
    where: {
      id: ctx.userId,
    },
  });
  if (!user.admin) {
    throw new Error("Not authenticated as admin");
  }

  let country = await ctx.prisma.country.findUnique({
    where: {
      name: input.country.name,
    },
  });

  if (!country) {
    throw new Error(`Country does not exist: ${input.country.name}`);
  }

  const newPlace = await ctx.prisma.place.create({
    data: {
      city: input.city,
      state: input.state,
      country: { connect: { id: country.id } },
    },
  });

  return newPlace;
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function removePlace(parent, args, ctx) {
  const user = ctx.prisma.user.findUnique({
    where: {
      id: ctx.userId,
    },
  });
  if (!user.admin) {
    throw new Error("Not authenticated as admin");
  }

  let place = await ctx.prisma.place.findUnique({
    where: {
      id: Number(args.id),
    },
  });

  if (!place) {
    throw new Error(`Specified place ${args.id} does not exist`);
  }

  let old = await ctx.prisma.place.delete({
    where: {
      id: Number(args.id),
    },
  });
  return old;
}

module.exports = {
  queries: {
    places,
    place,
    attractionsHere,
  },
  mutations: {
    addPlace,
    removePlace,
  },
  resolvers: {
    country,
    attractions,
  },
};
