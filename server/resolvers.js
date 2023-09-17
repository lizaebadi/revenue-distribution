const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    wallet: async (_, { shareholderID }) => {
      // Retrive the shareholder details
      const shareholder = await prisma.shareholder.findUnique({
        where: {
          id: shareholderID,
        },
      });
      // All transfers associated with the shareholder
      const transfers = await prisma.transfer.findMany({
        where: {
          movie: {
            shareholders: {
              some: {
                id: shareholderID,
              },
            },
          },
        },
        include: {
          movie: {
            include: {
              shareholders: true,
            },
          },
        },
      });
      // Balance calculation using the movie data included above 
      let balance = 0;
      transfers.forEach((transfer) => {
        const movie = transfer.movie;
        const numberOfShareholders = movie.shareholders.length;
        const amountPerShareholder = transfer.amount / numberOfShareholders;
        balance += amountPerShareholder;
      });

      return {
        shareholder,
        balance,
        transfers,
      };
    },

    movies: async () => {
      return prisma.movie.findMany();
    },
    shareholders: async () => {
      return prisma.shareholder.findMany();
    },
    transfers: async () => {
      return prisma.transfer.findMany();
    },
  },
  Mutation: {
    createMovie: async (_, { data }) => {
      return prisma.movie.create({ data });
    },
    createShareholder: async (_, { data }) => {
      return prisma.shareholder.create({ data });
    },
    createTransfer: async (_, { data }) => {
      return prisma.transfer.create({ data });
    },
  },
};

module.exports = resolvers;
