# Goel Traders - Inventory Management System

A comprehensive inventory management solution for Goel Traders, featuring role-based access control, payment processing, and product management capabilities.

## Project Overview

Goel Traders Inventory Management System is a full-stack application built to streamline inventory operations, manage sales, track payments, and handle user roles. The system implements a secure authentication mechanism with role-based authorization, allowing different levels of access for shopkeepers (admins) and workers (regular users).

## Features

- **User Authentication & Authorization**
  - JWT-based secure authentication
  - Role-based access control (shopkeeper/admin and worker/user roles)
  - Password encryption using bcrypt

- **Inventory Management**
  - Product tracking and categorization
  - Stock level monitoring
  - Inventory reports

- **Payment Processing**
  - Transaction recording
  - Payment status tracking
  - PDF receipt generation

- **User Management**
  - User registration and profile management
  - Role assignment by shopkeepers
  - Access control based on user roles

## Tech Stack

### Backend
- **Node.js** with **Express.js** framework
- **MongoDB** with **Mongoose** ORM
- **JWT** for authentication
- **bcrypt** for password hashing
- **PDFKit** for PDF generation
- **Cloudinary** for image storage
- **Express Validator** for request validation

### Frontend
- **React** with **TypeScript**
- **Redux Toolkit** for state management
- **TailwindCSS** for styling
- **Vite** as the build tool

## Project Structure

```
goel-traders/
├── backend/                # Node.js backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── validations/    # Request validators
│   ├── .env                # Environment variables
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point
│
└── frontend/               # React frontend
    ├── public/             # Static files
    ├── src/                # Source code
    ├── index.html          # HTML entry point
    └── vite.config.ts      # Vite configuration
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Sajal439/invoicing-system.git
   cd invoicing-system
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the backend directory with the following variables:
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Install frontend dependencies
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server
   ```
   cd frontend
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/current-user` - Get current user details
- `POST /api/auth/update-role/:id` - Update user role (shopkeeper only)

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product (shopkeeper only)
- `GET /api/products/:id` - Get product by ID
- `PATCH /api/products/:id` - Update product (shopkeeper only)
- `DELETE /api/products/:id` - Delete product (shopkeeper only)

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Create a new payment (shopkeeper only)
- `GET /api/payments/:id` - Get payment by ID
- `PATCH /api/payments/:id` - Update payment status (shopkeeper only)

## Role-Based Access Control

The system implements two main roles:

1. **Shopkeeper (Admin)**
   - Full read/write access to all resources
   - Can create, update, and delete products
   - Can manage payments
   - Can assign roles to users

2. **Worker (Regular User)**
   - Read-only access to resources
   - Can view products and inventory
   - Limited access to payment information

## License

ISC

## Author

Sajal
