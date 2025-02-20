FinanceMate
Overview
This is a Fund Management System designed to help users manage their funds securely. The system provides features for user registration, login, and fund management, with additional security using JSON Web Tokens (JWT) for authentication. The backend is written in JavaScript (Node.js), uses MongoDB as the database, and is deployed on Render.

Features
User Authentication:

Secure user registration and login using JWT.

Password hashing for enhanced security.

Fund Management:

Add, update, delete, and view funds.

Track fund transactions and balances.

Security:

JWT-based authentication for secure access to endpoints.

Protected routes to ensure only authenticated users can access fund management features.

Database:

MongoDB for storing user data and fund information.

Deployment:

Backend deployed on Render for easy access and scalability.

Technologies Used
Backend: Node.js, Express.js

Database: MongoDB

Authentication: JSON Web Tokens (JWT)

Password Hashing: bcrypt

Deployment: Render

Environment Variables: dotenv

Prerequisites
Before running the program, ensure you have the following installed:

Node.js (v16 or higher)

npm (Node Package Manager)

MongoDB (local or cloud-based, e.g., MongoDB Atlas)

Postman or any API testing tool (for testing endpoints)

Installation
Clone the repository:

bash
Copy
git clone https://github.com/your-username/fund-management-system.git
cd fund-management-system
Install dependencies:

bash
Copy
npm install
Set up environment variables:

Create a .env file in the root directory.

Add the following variables:

Copy
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the server:

bash
Copy
npm start
The server will run on http://localhost:5000 (or the port specified in .env).
