// const { PrismaClient } = require("@prisma/client");
// const dotenv = require("dotenv");

// dotenv.config({ path: "../env" });

// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.TEST_DATABASE_URL,
//     },
//   },
// });

// afterAll(async () => {
//   await prisma.$disconnect();
// });

// describe("Schema Tests", () => {
//   beforeEach(async () => {
//     await prisma.$executeRaw('TRUNCATE TABLE "Movie" CASCADE;');
//   });

//   it("should create a new movie", async () => {
//     const movie = await prisma.movie.create({
//       data: {
//         title: "Test Movie",
//       },
//     });

//     expect(movie.title).toBe("Test Movie");
//   });
// });
