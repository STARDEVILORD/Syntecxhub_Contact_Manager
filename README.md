# Syntecxhub Contact Manager

Full-stack MERN application for securely storing and managing personal contacts with user authentication.

🌐 Live Demo
Try it here: https://contact-manager-app-fu0p.onrender.com

Create an account to access your secure contact vault, or use the public page to send a direct message.

📌 Overview
This project demonstrates an end-to-end full-stack web application built with JavaScript. It:

- Manages user authentication (registration and secure login) using encrypted passwords.
- Provides a secure, user-specific vault to Add, Edit, and Delete personal contacts.
- Features a public "Contact Us" page that routes messages directly into the database.
- Connects a React frontend to a Node.js/Express backend via RESTful APIs.
- Stores all user and contact data securely in a MongoDB database.
  This project was developed to gain hands-on experience in full-stack web development, database management, and secure API architecture.

🚀 Features

- User Registration & Secure Authentication (JWT)
- Private Contact Vault (Create, Read, Update, Delete)
- Public Messaging System with "Click-to-Copy" UI
- Password encryption and security middleware
- Interactive frontend built with React and Vite
- RESTful backend architecture

🛠 Technologies Used

- MongoDB & Mongoose
- Express.js
- React.js (via Vite)
- Node.js
- JSON Web Tokens (JWT) & bcryptjs
- Axios

📂 Project Structure
Syntecxhub_Contact_Manager/
├── backend/ # Express server and API logic
│ ├── models/ # MongoDB schemas (User, Contact, Message)
│ ├── routes/ # API endpoints (auth, contacts, messages)
│ ├── middleware/ # Security and JWT verification
│ ├── .env # Environment variables (DB keys, Ports)
│ └── server.js # Main server entry point
├── frontend/ # React user interface
│ ├── src/
│ │ ├── components/ # UI Components (ContactPage, ContactList, etc.)
│ │ ├── App.jsx # Main application and routing logic
│ │ └── main.jsx # React DOM renderer
│ ├── public/ # Static assets and icons
│ └── package.json
├── README.md
└── LICENSE

⚙️ Setup

$git clone https://github.com/STARDEVILORD/Syntecxhub_CONTACT_MANAGER.git

$ cd Syntecxhub_Contact_Manager

# 1. Setup the Backend

cd backend
npm install

Create a .env file in the backend folder with your MONGO_URI and JWT_SECRET

# 2. Setup the Frontend

cd ../frontend
npm install

▶️ Usage

You will need two terminal windows open to run the full stack locally.

Terminal 1 (Backend):
cd backend
npm run dev

# Server will start on http://localhost:5000

Terminal 2 (Frontend):
cd frontend
npm run dev

# Vite will start the frontend, usually on http://localhost:5173

This opens a browser tab with the web app. You can navigate between the secure login screen and the public contact page.

🧠 How It Works

- **Frontend:** Built with React, the UI manages state for logging in and viewing contacts. Axios intercepts requests to attach a secure JWT token to the headers.
- **Authentication:** When a user registers, `bcryptjs` scrambles their password before saving it to MongoDB. Upon login, the server issues a timed JSON Web Token.
- **Backend API:** Express handles routing. A custom authentication middleware acts as a "bouncer," checking incoming requests for valid tokens before allowing access to the contact vault.
- **Database:** MongoDB stores data in distinct collections (Users, Contacts, Messages), automatically linking contacts to the specific user ID that created them.

👤 Author
Shriram Pawar
B.Sc. Computer Science Graduate | Software Developer | Unity & Backend API Developer

📄 License
This project is licensed under the terms of the MIT License.
