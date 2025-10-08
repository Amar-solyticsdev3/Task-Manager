# Task Manager

A **full-stack Task Manager application** built with the **MERN stack (MongoDB, Express, React, Node.js)** that allows users to manage tasks efficiently with role-based access control.

---


## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas or local)  
- **Authentication:** JWT-based authentication with role-based access (Admin/Member)  
- **File Uploads:** Express file uploads for user/profile images  
- **Charts & Visualization:** Task charts using custom React components

---

## 🏗️ Features

- **User Authentication & Roles**
  - Sign Up / Login
  - Admin and Member roles
- **Task Management**
  - Create, update, and delete tasks
  - Assign tasks to members
  - Update task status (Pending, In Progress, Completed)
- **User Management**
  - Admin can add or remove users
  - View user list with avatars
- **Dashboard & Charts**
  - Visual representation of tasks using charts
  - Admin and User dashboards
- **Responsive Design**
  - Built with Tailwind CSS for mobile and desktop devices

---

Backend Setup:

cd Task-Manager/backend
npm install

Create a .env file with:
PORT=7000
MONGO_URI=<your-mongo-db-connection-string>
JWT_SECRET=<your-secret-key>

Frontend Setup:

cd ../task-manager-web
npm install
npm run start

Run Backend Server:

cd ../backend
npm run dev

