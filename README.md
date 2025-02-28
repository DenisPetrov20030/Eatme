## Project Overview

Eatme is a full-stack food ordering application built with React and Node.js. The platform allows users to browse food items by category, add items to cart, create wishlists, leave comments, and place orders.

## Features

- User authentication and profile management
- Product browsing with category filtering
- Shopping cart functionality
- Wishlist management
- Product comments and reviews
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development and building
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Redux for state management

### Backend
- [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/) for database operations
- JWT authentication

## Installation & Setup

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- Database (PostgreSQL recommended)

### Server Setup
1. Navigate to the server directory:
```sh
cd server
```

2. Install dependencies:
```sh
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=5000
CLIENT_URL=http://localhost:5173
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```sh
npm run dev
```

### Client Setup
1. Navigate to the client directory:
```sh
cd client
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

## Usage

After starting both the client and server, you can access the application at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
client/             # Frontend React application
  src/
    api/            # API integration
    components/     # Reusable UI components
    hooks/          # Custom React hooks
    pages/          # Application pages
    providers/      # Context providers
    store/          # Redux store
    utils/          # Utility functions

server/             # Backend Express application
  src/
    controllers/    # Request handlers
    db/             # Database related files
    middlewares/    # Express middlewares
    models/         # Data models
    routes/         # API routes
```

## API Endpoints
API Overview is available in the Wiki (https://github.com/DenisPetrov20030/Eatme/wiki.).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT](LICENSE) License.
