# Modern Hardware

A full-stack e-commerce web application for a Kenyan hardware store, built with React, Tailwind CSS, Vite, Node.js, Express.js, and SQLite.

## Features

- 🛒 **Product Catalog** - Browse hardware products with categories, search, and filtering
- 👤 **User Authentication** - Register, login, and JWT-based authentication
- 🛍️ **Shopping Cart** - Add, update, and remove items from cart
- 📦 **Order Management** - Checkout, order history, and order tracking
- ⚙️ **Admin Panel** - Manage products and orders (admin access required)
- 🇰🇪 **Kenyan Market** - KES currency, local categories, M-Pesa placeholder

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)
- JWT Authentication

## Prerequisites

- Node.js 18+
- npm

## Installation

### 1. Clone the repository

```bash
cd modern-hardware
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

The API will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The app will run on `http://localhost:3000`

## Demo Accounts

### Admin Account
- Email: `admin@modernhardware.com`
- Password: `admin123`

### Customer Account
- Email: `john@example.com`
- Password: `user123`

## Project Structure

```
modern-hardware/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Auth middleware
│   ├── routes/        # API routes
│   ├── seed/          # Seed data
│   ├── server.js      # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/   # React context (auth, cart)
│   │   ├── pages/     # Page components
│   │   ├── utils/     # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - List products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get categories
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (admin)

## Environment Variables

### Backend (.env)
```
PORT=5000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Seed Data

The application includes seed data with 30 hardware products across 6 categories:
- Building Materials
- Power Tools
- Hand Tools
- Electrical
- Plumbing
- Paint

## Deployment

### Deploy to Render.com (Recommended)

This application is configured for easy deployment to Render.com.

#### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create a new repository on GitHub and push
   git remote add origin https://github.com/yourusername/modern-hardware.git
   git push -u origin main
   ```

2. **Create a Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Configure the following:
     - **Name**: `modern-hardware`
     - **Environment**: `Node`
     - **Build Command**: `cd frontend && npm install && npm run build`
     - **Start Command**: `cd backend && npm start`
     - **Plan**: Free (or paid as needed)

3. **Set Environment Variables**
   In the Render dashboard, add these environment variables:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `JWT_SECRET` = (generate a secure random string)
   - (Optional) M-Pesa variables for payment integration

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application

#### Option 2: Deploy using render.yaml

The repository includes a `render.yaml` file for automatic deployment:

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New +" and select "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect the `render.yaml` and deploy

### Manual Deployment

If you prefer manual deployment:

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Set environment variables:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. The app will be served from `http://localhost:5000`

### Database Note

This application uses SQLite which stores data in a file (`kimati.db`). For production:
- The database file will be created automatically on first run
- For persistent storage on Render, you may want to use Render's PostgreSQL add-on
- To switch to PostgreSQL, update `backend/config/database.js`

### M-Pesa Payments

To enable M-Pesa payments in production:
1. Register for M-Pesa Daraja API at [Safaricom Developer Portal](https://developer.safaricom.co.ke)
2. Add your M-Pesa credentials as environment variables in Render
3. Update `MPESA_CALLBACK_URL` to your production URL

## License

MIT

