/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
function locatedIn(parent, args, ctx) {
  return ctx.prisma.attraction
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .locatedIn();
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
function reviews(parent, args, ctx) {
  return ctx.prisma.attraction
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
async function attraction(parent, args, ctx) {
  let attraction = await ctx.prisma.attraction.findUnique({
    where: {
      id: Number(args.id)
    }
  })

  if (!attraction) {
    throw new Error(`Specified attraction ${args.id} does not exist`)
  }

  return attraction;
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function addAttraction(parent, args, ctx) {
  let input = args.input;
  let locatedIn = input.locatedIn;

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
      name: locatedIn.country.name
    }
  })

  if (!country) {
    throw new Error(`Country does not exist: ${input.country.name}`)
  }

  let place = await ctx.prisma.place.findFirst({
    where: {
      city: locatedIn.city,
      state: locatedIn.state,
      country: {
        name: country.name
      }
    }
  })

  if (!place) {
    throw new Error(`Place does not exist: ${input.locatedIn}`)
  }

  let dup = await ctx.prisma.attraction.findFirst({
    where: {
      AND: [
        { locatedInId: place.id },
        { name: input.name }
      ]
    }
  })
  if (dup) {
    throw new Error(`Attraction ${input.name} located in ${locatedIn.city}, ${locatedIn.country.name} already exists`)
  }

  const newAttraction = await ctx.prisma.attraction.create({
    data: {
      name: input.name,
      description: input.description,
      price: input.price,
      locatedIn: { connect: { id: place.id } }
    }
  })

  return newAttraction;
}

/**
 * @param {any} parent
 * @param {any} args
 * @param {{ prisma: Prisma }} ctx
 */
async function removeAttraction(parent, args, ctx) {
  let attraction = await ctx.prisma.attraction.findUnique({
    where: {
      id: Number(args.id)
    }
  })

  const user = ctx.prisma.user.findUnique({
    where: {
      id: ctx.userId
    }
  })
  if (!user.admin) {
    throw new Error("Not authenticated as admin");
  }

  if (!attraction) {
    throw new Error(`Specified attraction ${args.id} does not exist`);
  }

  let old = await ctx.prisma.attraction.delete({
    where: {
      id: Number(args.id)
    }
  })
  return old;
}

module.exports = {
  queries: {
    attraction
  },
  mutations: {
    addAttraction,
    removeAttraction
  },
  resolvers: {
    locatedIn,
    reviews
  }
};

