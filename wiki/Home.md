# Eatme E-commerce Platform


## Architecture
- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Node.js with Express, TypeORM, and TypeScript
- **Database**: PostgreSQL

## Key Features
- User authentication and authorization
- Product catalog with categories and subcategories
- Product search with filtering capabilities
- Shopping cart functionality
- Wishlist system
- Product reviews and comments
- Image handling for products

## Project Structure
The application follows a clean architecture pattern with:

### Backend (api directory)
- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **Repositories**: Data access layer
- **Models**: Domain entities, DTOs, and mappers
- **Routes**: API endpoint definitions
- **Middleware**: Request processing functions

### Frontend (client directory)
- React components
- API integration using Axios and React Query
- State management with Zustand
- Routing with React Router

## Technologies Used
- TypeScript for type safety
- TypeORM for database interactions
- JWT for authentication
- Express for API routing
- React for the UI
- Tailwind CSS for styling
