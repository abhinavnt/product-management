# Authentication Module

The Product Management System is a full-stack web application designed to manage products efficiently. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides features like product listing, user authentication, and potentially wishlist and feedback management. This project showcases modern web development practices, including RESTful APIs, responsive design, and state management with Redux.

- *Frontend*: React, Vite, TypeScript, Tailwind, Axios
- *Backend*: Express, MongoDB, TypeScript, JWT
- *Tools*:Git, npm, MongoDB Atlas, Postman (for API testing)

It supports user registration, login, logout, and token refresh using JWT access tokens and HttpOnly refresh token cookies.

---

## Project Structure

### Client (frontend/)

- src/utils/axiosInstance.ts: Axios instance with interceptors for token refresh
- src/store/authSlice.ts:  store for authentication state
- src/pages/: all pages
- src/types/: all types
- src/services: all services
- src/App.tsx: Routing and main app component


### Server (backend/)

- src/controllers/:  controllers 
- src/service/:  services 
- src/repository/: repositories   
- src/core/abstract/baserepository:  all baserepositories
- src/core/interface:  all interfaces 
- src/models/: Mongoose user schema
- src/routes/: routes
- src/server.ts: Express server setup
- src/app.ts: app config

---

## Prerequisites

- Node.js (v18 or higher)
- 
- MongoDB (local or cloud via MongoDB Atlas)

---

## Backend Setup

1. Navigate to the server/ directory and install dependencies:

   bash
   cd server
   npm install
   

2. Create a .env file in server/:

   env
   MONGO_URI= your uri
   PORT=5000
   ACCESS_TOKEN_SECRET=your_jwt_secret_here
   REFRESH_TOKEN_SECRET=your_jwt_secret_here
   NODE_ENV=development
   CLOUDINARY_NAME= name
   CLOUDINARY_API_KEY= your_api_key
   CLOUDINARY_API_SECRET=your_key
   

   - Replace your_jwt_secret_here with a secure string (e.g., run openssl rand -base64 32).
   - Update MONGO_URI for remote MongoDB instances.

3. Start the backend:

   bash
   npm run dev
   

   The server runs at http://localhost:5000.

---

## Frontend Setup

1. Navigate to the client/ directory and install dependencies:

   bash
   cd client
   npm install
   

2. Create a .env file in client/:

   env
   VITE_BACKEND_URL=http://localhost:5000
   

3. Start the frontend:

   bash
   npm run dev
   

   The app runs at http://localhost:5173.

---


---



### Copy Backend

- Copy server/src/ to your project’s backend directory.
- Merge server/package.json dependencies:

  json
  {
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "ts-node src/server.ts",
    "dev": "nodemon src/server.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "cloudinary": "^2.6.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "express-async-handler": "^1.2.0",
    "http-status-codes": "^2.3.0",
    "inversify": "^7.5.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.14.3",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.2",
    "reflect-metadata": "^0.2.2",
    "rotating-file-stream": "^3.2.6",
    "uuid": "^11.1.0"
  },
  "devDependencies": {
    "@types/cookie-parser": "^1.4.8",
    "@types/cors": "^2.8.18",
    "@types/express": "^5.0.1",
    "@types/inversify": "^2.0.32",
    "@types/jsonwebtoken": "^9.0.9",
    "@types/mongoose": "^5.11.96",
    "@types/morgan": "^1.9.9",
    "@types/multer": "^1.4.12",
    "@types/node": "^22.15.18",
    "nodemon": "^3.1.10",
    "ts-node": "^10.9.2",
    "typescript": "^5.8.3"
  }
}

  


  


### Copy Frontend

- Copy client/src/api/, client/src/store/, client/src/components/Login.tsx, and client/src/components/Register.tsx to your frontend.
- Merge client/package.json dependencies:

  json
  {
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.2",
    "@reduxjs/toolkit": "^2.8.2",
    "@tailwindcss/vite": "^4.1.6",
    "axios": "^1.9.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.510.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-image-crop": "^11.0.10",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.6.0",
    "sonner": "^2.0.3",
    "tailwind-merge": "^3.3.0",
    "tailwindcss": "^4.1.6"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/node": "^22.15.18",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react": "^4.4.1",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "tw-animate-css": "^1.2.9",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.30.1",
    "vite": "^6.3.5"
  }
}

  

- Add .env to your frontend:

  env
  VITE_BACKEND_URL=http://localhost:5000
  


  

### Configure CORS

- Ensure backend CORS allows your frontend origin:

  typescript
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
  

