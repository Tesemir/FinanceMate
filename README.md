# FinanceMate

FinanceMate is a **Fund Management System** designed to help users securely manage their funds. It offers features for **user authentication, fund management, and transaction tracking**, ensuring security through **JSON Web Tokens (JWT)**. The backend is built with **Node.js**, uses **MongoDB** as its database, and is deployed on **Render**.

## 🚀 Features

### 🔑 User Authentication
- Secure **user registration** and **login** using **JWT**.
- **Password hashing** for enhanced security with **bcrypt**.

### 💰 Fund Management
- Add, update, delete, and view funds.
- Track **fund transactions** and monitor balances.

### 🔒 Security
- **JWT-based authentication** to secure access to endpoints.
- **Protected routes**, ensuring only authenticated users can manage funds.

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JSON Web Tokens (JWT)  
**Password Hashing:** bcrypt  
**Deployment:** Render  
**Environment Variables:** dotenv  

## 📌 Prerequisites

Before running FinanceMate, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local or cloud-based, e.g., MongoDB Atlas)
- **Postman** or any API testing tool (for testing endpoints)

## 📥 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/fund-management-system.git
   cd fund-management-system

2. **Install dependencies:**
   ```bash
   npm install

3. **Set up environment variables:**
   - Create a .env file in the root directory.
   - Add the following variables:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key

4. **Start the server:**
   ```bash
   npm start
