# Graines Academy Platform

<img src="./image/grains.jpg">


## Introduction

Graines Academy aims to provide an interactive and user-friendly environment for managing classes and groups, as well as offering an e-learning platform with courses and documentation accessible to children and parents.

## Project Structure

### Frontend (React)
```bash
frontend/
├── public/
├── src/
│ ├── components/
│ │ ├── User/
│ │ ├── Admin/
│ │ ├── Formateur/
│ │ └── Enfant/
│ ├── pages/
│ ├── services/
│ ├── routes/
│ ├── utils/
│ ├── styles/
│ ├── App.js
│ └── index.js
├── package.json
└── README.md
```

### Backend (Node.js, Express)
```bash
backend/
├── config/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── app.js
├── server.js
├── .env
└── package.json
```
## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```sh
   cd backend


2. Install dependencies:
	```sh
	npm install

3. Create a .env file and configure your environment variables:
	```sh
	MONGO_URI=your_mongodb_connection_string
	JWT_SECRET=your_secret_key

4. Start the backend server:
	```sh
	npm run dev 

### Frontend
1. Navigate to the frontend directory:
	```sh
   cd frontend

2. Install dependencies:
	```sh
	npm install

3. Start the frontend development server:
	```sh
	npm run dev  or npm run start


# Features
- User Management: Registration, login, and role-based access control for children, parents, trainers, and administrators.
- Class Management: Creation and management of classes and groups.
- Resource Sharing: Upload and share documents, videos, and other educational resources.
- E-learning: Access to interactive online courses and progress tracking.
- Communication: Messaging and notifications for interactions and updates.
- Progress Tracking: Monitor the performance and progress of children.

# Technologies Used
- Frontend: React, React Router, Axios
- Backend: Node.js, Express, Mongoose, JWT
- Database: MongoDB
- Styling: CSS, MUI 

# Contributing
- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature).
- Make your changes.
- Commit your changes (git commit -m 'Add some feature').
- Push to the branch (git push origin feature/your-feature).
- Open a pull request.