# 📰 Modern MERN Blogging Platform (2025 Edition)

> 🌟 A full-stack blogging platform built using **React + Node.js + Express + Bolt Database**, featuring authentication, user profiles, post management, and modern 2025 UI design.

![Preview Banner](screenshots/hero-section.png)

---

## 🚀 Features

### ✍️ Blog Management
- Create, edit, and delete posts using a **rich text editor (React-Quill)**  
- Upload cover images with **Cloudinary**  
- Like and comment on posts in real time  
- Categorize blogs (Tech, Lifestyle, Education, etc.)  
- Featured posts carousel on homepage  
- Search & filter posts by keyword or category  

### 👤 User System
- Secure **JWT authentication** (Login / Signup)  
- Profile page showing posts, followers, following, and comments received  
- Edit profile details and upload new profile photo  
- Real-time updates after each interaction  

### 🌗 Dark / Light Mode
- Persistent theme toggle (auto remembers preference)  
- Smooth **Framer Motion** animations  

### 🧠 Admin Dashboard
- Approve / feature / delete blogs  
- Manage users and comments  
- View analytics (total users, posts, comments)  

### 🎨 UI & Design
- Modern, minimalistic interface (inspired by Medium & Hashnode)  
- **Tailwind CSS** + **Framer Motion** animations  
- Responsive for mobile, tablet, and desktop  
- Subtle gradient & glassmorphism effects  
- Optional animated background video or particle effects  

---

## 🏗️ Tech Stack

| Category | Technologies |
|-----------|---------------|
| Frontend | React.js, Redux Toolkit, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | Bolt Database (with MongoDB fallback) |
| Auth & Security | JWT, bcrypt, dotenv, Helmet, CORS |
| File Uploads | Cloudinary / Multer |
| Editor | React-Quill |
| Charts | Chart.js (for admin analytics) |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash

git clone https://github.com/Indu-Pacha-4/MERN-Blogging-Platform.git
cd MERN-Blogging-Platform

2️⃣ Install dependencies

Backend

cd backend
npm install

Frontend

cd ../frontend
npm install

3️⃣ Configure environment variables

Create .env files in both frontend and backend folders:

backend/.env

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_api_url

frontend/.env

VITE_API_BASE_URL=http://localhost:5000/api

4️⃣ Run the project

Backend

cd backend
npm run dev

Frontend

cd ../frontend
npm start

Then open 👉 http://localhost:5173
 (or whichever port your frontend shows).

💬 About This Project

This project was developed as part of my Internship Project-2, focused on mastering Full-Stack Development with the MERN stack.
It demonstrates:
Real-world CRUD operations
Modern front-end design principles
Secure authentication
Clean backend API architecture

🔗 Links

GitHub Repo: MERN-Blogging-Platform
LinkedIn Profile: Indu Pacha

🙌 Author

👩‍💻 Indu Pacha
📫 GitHub – @Indu-Pacha-4
💼 LinkedIn – Indu Pacha
🚀 Aspiring Full-Stack Developer | Internship Project 2025

⭐ Support
If you like this project, please ⭐ star the repo and connect with me on LinkedIn — feedback is always welcome!
