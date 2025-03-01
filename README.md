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

## Swagger video instruction
[Watch the video](https://github.com/DenisPetrov20030/Eatme/raw/main/Swagger%20video/2025-02-28-23-44-27.mp4)

## Cookie Popup
![Cookie Popup 1](https://github.com/DenisPetrov20030/Eatme/raw/main/Cookie%20popup/Сookie_popup_1.jpg)
![Cookie Popup 2](https://github.com/DenisPetrov20030/Eatme/raw/main/Cookie%20popup/Cookie_popup_2.jpg)
 
## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT](LICENSE) License.

# Privacy Policy

## Introduction

Thank you for choosing Eatme Store. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. We respect your privacy and are committed to protecting your personal data.

## Information We Collect

We may collect the following types of information:

- **Personal Information**: Name, email address, phone number, billing address, and delivery address.
- **Account Information**: Login credentials and account preferences.
- **Payment Information**: Credit card details, payment method (processed securely through third-party payment processors).
- **Order Information**: Items purchased, order history, and transaction records.
- **Communication Data**: Messages sent through our contact forms or customer service channels.
- **Technical Data**: IP address, browser type, device information, and cookies.

## How We Use Your Information

We use collected information to:

- Process and fulfill your orders
- Manage your account
- Provide customer support
- Send order confirmations and updates
- Process payments
- Improve our website and services
- Personalize your user experience
- Send promotional communications (if you opt-in)

## Information Sharing

We may share your information with:

- Payment processors to complete transactions
- Delivery partners to fulfill orders
- Service providers who assist our business operations
- Legal authorities when required by law

We do not sell your personal data to third parties.

## Data Security

We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.

## Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate information
- Delete your data (where applicable)
- Withdraw consent for marketing communications
- Request a copy of your data

## Cookies

We use cookies to enhance your browsing experience. You can adjust your browser settings to refuse cookies, but this may limit some functionality of our website.

## Children's Privacy

Our services are not intended for individuals under the age of 13. We do not knowingly collect data from children.

## Changes to This Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.

## Contact Us

If you have questions about this Privacy Policy, please contact us at:
- Email: privacy@eatmestore.com
- Address: []
- Phone: []

Last updated: February 26, 2025 
