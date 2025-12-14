# FitPlanHub

FitPlanHub is a full-stack web application designed for fitness enthusiasts and trainers. It allows users to create, share, discover, and subscribe to fitness plans. The platform bridges the gap between trainers and individuals seeking structured workout routines.

## 🚀 Features

* **User Authentication**: Secure Sign Up and Login functionality using JSON Web Tokens (JWT) and Bcrypt for password hashing.
* **Fitness Plans**:
    * Create and customize workout plans.
    * Edit and manage existing plans.
    * View detailed breakdowns of plans.
* **Subscriptions**: Users can subscribe to plans created by trainers.
* **Trainer Interaction**:
    * Browse a list of trainers.
    * View trainer profiles.
* **Social Feed**: A feed section to discover new content or updates.
* **Dashboard**: A personalized dashboard for managing subscriptions and created plans.

## 🛠️ Tech Stack

### Frontend
* **Framework**: React (v19)
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **Routing**: React Router DOM
* **Form Handling**: React Hook Form

### Backend
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: jsonwebtoken (JWT) & bcryptjs
* **Environment Variables**: dotenv
* **CORS**: cors

## 📂 Project Structure

FitPlanHub/
├── client/             # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/ # Reusable UI components (Navbar, Sidebar, etc.)
│   │   ├── pages/      # Application pages (Login, Dashboard, Plans, etc.)
│   │   └── utils/      # Utility functions (auth, etc.)
│   ├── package.json
│   └── vite.config.js
│
└── server/             # Backend Node.js/Express application
    ├── config/         # Database configuration
    ├── controllers/    # Route logic
    ├── middleware/     # Auth middleware
    ├── models/         # Mongoose models (User, Plan, Subscription, etc.)
    ├── routes/         # API routes
    ├── package.json
    └── server.js       # Entry point

## ⚙️ Installation & Setup

Follow these steps to get a local copy up and running.

### Prerequisites
* Node.js (v14+ recommended)
* MongoDB (Local or Atlas URL)

1. Clone the Repository:
git clone [https://github.com/amangour3108/fitplanhub.git]
cd fitplanhub

2. Backend Setup
Navigate to the server directory and install dependencies:
cd server
npm install

Create a .env file in the server directory and add the following variable:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Start the backend server:
node server.js

3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
cd client
npm install

Start the frontend development server: 
npm run dev

🔌 API Endpoints
The backend exposes the following API base endpoints:

/api/auth - Authentication routes (Login/Signup)

/api/plans - Operations related to fitness plans

/api/feed - Feed data

/api/subscriptions - Management of user subscriptions

/api/trainers - Trainer data

