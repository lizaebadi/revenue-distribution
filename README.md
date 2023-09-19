# Movie Revenue Distribution App

This is a simple JavaScript full-stack app for handling movie revenues. The app allows administrators to add movies, add shareholders associated with those movies, and initiate incoming transfers. It also provides a wallet view to check a shareholders current balance and transfers in relation to the shareholder.

## Technologies Used

  - ReactJS
  - Apollo Client for GraphQL communication
  - Node.js
  - Apollo Server for GraphQL API
  - Prisma as the ORM (Object-Relational Mapping) for the database
  - PostgreSQL as the database

## Installation

1. Clone the repository to your local machine:
```
git clone https://github.com/lizaebadi/revenue-distribution.git
```
2. Navigate to the project directory:
```
cd revenue-distribution
```

3. Install dependencies for both the frontend and backend:

```
npm install

cd server
npm install
```
4. Set up the database by creating a PostgreSQL database and updating the database URL in the `.env` files:

- Update the `DATABASE_URL` variable in `server/.env` file with your PostgreSQL database connection URL.

5. Apply database migrations and seed data by running the following commands in the `backend` directory:

```
npx prisma migrate dev
npx prisma db seed
```

6. Start the backend server:

```
cd server
node index.js
```

7. In a separate terminal, start the frontend development server:

```
npm start
```

8. Open your web browser and access the application at http://localhost:3000

### Admin View
- http://localhost:3000/admin
### Wallet View
- http://localhost:3000/wallet

### Additional Functionality

- The application evenly distributes transfer amounts among shareholders associated with a movie.
- Custom CSS styles are used.
- Errors and validation messages are displayed when adding transfers.

## Next steps

- Improve error handling to provide more user-friendly error messages and better feedback in case of failed operations.
- Testing: Expand test coverage by writing unit tests, integration tests, and end-to-end tests using tools like Jest, React Testing Library, and Apollo Client testing utilities.
