# 🛒 GreenCart

A modern, responsive e-commerce web application built with **React.js** that allows users to discover products, search and filter products, manage their shopping cart, authenticate users, and complete a protected checkout flow.

## 🚀 Live Demo

🔗 **Live Website:** https://green-cart-roan-beta.vercel.app/

🔗 **GitHub Repository:**  
https://github.com/Sumit-2004-bit/GreenCart

---

## 📌 About The Project

GreenCart is a frontend-focused e-commerce application developed to demonstrate practical React.js development skills and modern frontend concepts.

The application integrates product data from the **DummyJSON API** and provides users with a complete shopping experience including product discovery, product details, cart management, authentication, protected routes, and real-time toast notifications.

The project is designed with a responsive interface that works across desktop, tablet, and mobile devices.

---

## ✨ Features

### 🛍️ Product Features

- Browse products from an external API
- Product search
- Category-based filtering
- Product sorting
- Product details page
- Product ratings and pricing
- Responsive product cards
- Product image optimization

### 🛒 Shopping Cart

- Add products to cart
- Add multiple quantities of the same product
- Increase product quantity
- Decrease product quantity
- Remove individual products
- Clear entire cart
- Automatic cart total calculation
- Automatic item count calculation
- Cart persistence using LocalStorage

### 🔐 Authentication

- User registration
- User login
- User logout
- User session persistence
- Protected checkout route
- Authentication state management using React Context API

> **Note:** Authentication is currently implemented on the frontend using LocalStorage for learning and demonstration purposes.

### 🔔 Notifications

- Account created successfully
- Login successful
- Logout successful
- Product added to cart
- Product removed from cart
- Cart cleared successfully

### 📱 Responsive Design

Optimized for desktop, laptop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| React.js          | Frontend UI                   |
| JavaScript (ES6+) | Application logic             |
| HTML5             | Structure                     |
| CSS3              | Styling and responsive design |
| React Router      | Client-side routing           |
| Context API       | Global state management       |
| LocalStorage      | Cart and session persistence  |
| Vite              | Development and build tool    |
| DummyJSON API     | Product data                  |

---

## 🏗️ Project Structure

```text
GreenCart/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Cart.jsx
│   │   ├── Categories.jsx
│   │   ├── Checkout.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Toast.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 🔄 Application Flow

```text
                    ┌───────────────┐
                    │   GreenCart   │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          Products      Categories     Search
              │             │             │
              └─────────────┼─────────────┘
                            │
                            ▼
                    Product Details
                            │
                            ▼
                       Add to Cart
                            │
                            ▼
                          Cart
                            │
                  ┌─────────┴─────────┐
                  │                   │
                  ▼                   ▼
             Update Cart          Checkout
                                      │
                                      ▼
                               Authentication
```

---

## 🔐 Authentication Flow

```text
Register
   │
   ▼
Create Account
   │
   ▼
Store User Session
   │
   ▼
Login
   │
   ▼
Authenticated User
   │
   ▼
Protected Checkout
```

Logout clears the current user session.

---

## 💾 LocalStorage

GreenCart uses browser LocalStorage for frontend persistence.

```text
greencart-cart
greencart-account
greencart-user
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- Git

Verify Node.js:

```bash
node --version
```

Verify npm:

```bash
npm --version
```

### Installation

Clone the repository:

```bash
git clone https://github.com/Sumit-2004-bit/GreenCart.git
```

Navigate to the project:

```bash
cd GreenCart
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## 🏭 Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🧪 Testing Checklist

- [x] Product listing
- [x] Product search
- [x] Category filtering
- [x] Product sorting
- [x] Product details
- [x] Add to cart
- [x] Increase/decrease quantity
- [x] Remove product
- [x] Clear cart
- [x] Cart total
- [x] LocalStorage persistence
- [x] Register
- [x] Login
- [x] Logout
- [x] Protected checkout
- [x] Toast notifications
- [x] Responsive layout
- [x] Production build

---

## 🔮 Future Improvements

- Backend authentication
- Database integration
- Secure authentication
- Password hashing
- JWT authentication
- Refresh tokens
- Payment gateway
- Order management
- Order history
- Wishlist
- User profile
- Admin dashboard
- Product management
- Reviews and ratings
- Real-time order tracking
- Email notifications

---

## ⚠️ Current Limitations

This project is primarily a frontend learning and portfolio project.

The current authentication system uses LocalStorage and should **not** be considered production-grade authentication.

For a real-world application, authentication and user data should be handled by a secure backend and database.

---

## 📸 Screenshots

Screenshots can be added after deployment.

### Home Page

_Add screenshot here_

### Products

_Add screenshot here_

### Product Details

_Add screenshot here_

### Shopping Cart

_Add screenshot here_

### Authentication

_Add screenshot here_

---

## 👨‍💻 Author

### Sumit Deshmukh

**GitHub:**  
https://github.com/Sumit-2004-bit

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project was created for educational and portfolio purposes.
