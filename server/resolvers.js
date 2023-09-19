const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Decimal } = require("decimal.js");

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
      const allTransfers = await prisma.transfer.findMany({
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

      const transfersPerShareholder = allTransfers.map((transfer) => {
        const movie = transfer.movie;
        const numberOfShareholders = movie.shareholders.length;
        const transferAmount = new Decimal(transfer.amount);
        const baseAmount = transferAmount.dividedBy(numberOfShareholders);
    
        // Distribute the remainder among shareholders
        const remainder = transferAmount.modulo(numberOfShareholders);
        const allShareholderAmounts = Array(numberOfShareholders)
          .fill(baseAmount)
          .map((amount, index) =>
            index < remainder ? amount.plus(0.01) : amount
          );
        // Array of amounts per shareholder 
        const amountPerShareholder = allShareholderAmounts.map((amount) =>
          amount.toDecimalPlaces(2).toString()
        );
    
        return {
          transfer,
          amountPerShareholder,
        };
      });
      // Calculates the balance for the shareholder
      let balance = new Decimal(0);
      transfersPerShareholder.forEach((transfer) => {
        const shareholderIndex = transfer.transfer.movie.shareholders.findIndex(
          (sh) => sh.id === shareholderID
        );
        const amount = new Decimal(transfer.amountPerShareholder[shareholderIndex]);
        balance = balance.plus(amount);
      });
    
      balance = balance.toDecimalPlaces(2);
      
      return {
        shareholder,
        balance,
        transfers: transfersPerShareholder,
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
