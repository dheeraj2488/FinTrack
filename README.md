💰 FinTrack - Expense Management System

   FinTrack is a full-stack expense management system that helps users manage their finances effectively by allowing them to add, edit, and delete income and expenses category-wise. The application also provides powerful analytics, visualizing data by category, time period (yearly, monthly, weekly, or specific dates), and percentage breakdowns.

🚀 Features

🔐 User Authentication

 -> Secure login and signup using bcrypt for password hashing

 -> Token-based authentication using JSON Web Tokens (JWT)

💸 Income & Expense Management

 -> Add, edit, and delete transactions

 -> Organize transactions by custom categories

 -> Filter by income or expense

📊 Analytics Dashboard

 -> Visual representation of financial data

 -> View analytics:

   -> Category-wise percentage breakdown

   -> Yearly, monthly, weekly, and specific date analytics

🧾 Database

 -> Data persistence using MongoDB

🛠️ Tech Stack

   Frontend:

  -> React (or your frontend framework)

  -> TailwindCSS / CSS Modules / Material UI (if used)

   Backend:

  -> Node.js

  -> Express.js

  -> MongoDB (with Mongoose ODM)

  -> bcrypt

  -> jsonwebtoken

📦 Installation & Setup

-> Clone the repository

git clone https://github.com/your-username/fintrack.git

cd fintrack

-> Backend Setup

npm install
npm run dev

-> Frontend Setup

cd client
npm install
npm run dev
Environment Variables

Create a .env file in the backend with:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

<img width="1457" alt="Screenshot 2025-04-11 at 11 56 06 PM" src="https://github.com/user-attachments/assets/9b2d8645-b5e2-4c53-b642-97ea2abd60de" />

<img width="1455" alt="Screenshot 2025-04-11 at 11 56 39 PM" src="https://github.com/user-attachments/assets/0b0204a8-3626-436b-a201-190d7673d9ae" />

<img width="1467" alt="Screenshot 2025-04-11 at 11 56 11 PM" src="https://github.com/user-attachments/assets/5496e92e-7d0e-4b64-983e-c5d55ed9741b" />

<img width="1462" alt="Screenshot 2025-04-11 at 11 56 27 PM" src="https://github.com/user-attachments/assets/2bd7e096-0e5c-4ee6-9f71-07401249a960" />

<img width="1465" alt="Screenshot 2025-04-11 at 11 59 41 PM" src="https://github.com/user-attachments/assets/4fc1c9b7-f28d-42d3-8887-f41888eda3d3" />
