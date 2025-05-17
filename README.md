# 🎉 Event Booking App (Full Stack)

This project is a full-stack Event Booking application built with:

- **Frontend:** React + Vite + TypeScript
- **Backend:** Node.js + Express + TypeScript + MongoDB

---

## 📁 Project Structure

root/
│
├── client/ # React + Vite frontend
│
└── server/ # Node.js + Express backend with TypeScript

---

## 🔧 Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance like MongoDB Atlas)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/youssefelaalem/ATC_01016623291.git
cd ATC_01016623291
```

⚙️ Backend Setup (/server)
📦 Install Dependencies
bash
Copy
Edit
cd server
npm install

# or

yarn

⚙️ Environment Variables
Create a .env file inside the server folder with the following:

env
Copy
Edit
PORT=8000
MONGO_URL=mongodb+srv://youssefelaalem82:youssef123@cluster0.3tqxtme.mongodb.net/eventsApp
JWT_SECRET_KEY=1wko1kwo1w1kwo1kwo1kwk1wok1

▶️ Run the Server
bash
Copy
Edit
npm run dev

# or

yarn dev
This will start the server at: http://localhost:8000

💻 Frontend Setup (/client)
📦 Install Dependencies
bash
Copy
Edit
cd client
npm install

# or

yarn
🔧 Configure API Base URL
Create a .env file inside the client folder:

env
Copy
Edit
VITE_API_BASE_URL=http://localhost:8000/api
VITE_SUPABASE_URL=https://mfdiwbvuazycliilmkdw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mZGl3YnZ1YXp5Y2xpaWxta2R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxOTU0ODcsImV4cCI6MjA1NDc3MTQ4N30.SvnF0k9spac5-lf5MgZQAO-trjkQl-Q5lkZRO8e4N88
Make sure to use this variable for your API requests inside the app.

▶️ Run the React App
bash
Copy
Edit
npm run dev

# or

yarn dev
This will start the app at: http://localhost:5173

🧪 Tech Stack
Frontend: React, Vite, TypeScript, Tailwind CSS, Redux Toolkit , Shadcn/UI , Zod , React-Form 

Backend: Express, TypeScript, Mongoose, JWT , Bcryptjs , Axpress-Async-Handler

Database: MongoDB

Other Tools: Nodemon, dotenv, Sonner (for toasts), Lucide icons

🙌 Author
Developed by Youssef Muhammad Ashref Elaalem
