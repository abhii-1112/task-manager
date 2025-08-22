# Task Manager API

A simple **RESTful API** for managing tasks with authentication, built with **Node.js, Express, TypeScript, and MongoDB**.

---

## **Features**

- User authentication with **JWT**
- CRUD operations for tasks:
  - Create, Read, Update, Delete
- Each task includes:
  - `title`, `description`, `status` (`pending`/`completed`), `createdAt`, `updatedAt`
- Input validation and error handling
- Protected routes for authenticated users

---

## **Technologies Used**

- Node.js  
- Express.js  
- TypeScript  
- MongoDB (Atlas)  
- Mongoose  
- bcrypt for password hashing  
- JSON Web Tokens (JWT) for authentication  

---

## **Setup Instructions**

1. **Clone the repository**
```bash
git clone https://github.com/<your-username>/task-manager-api.git
cd task-manager-api
