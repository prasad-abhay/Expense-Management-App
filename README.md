# Expense Management System using MERN Stack

### Live Website: [click here](https://main.d1sj7cd70hlter.amplifyapp.com/)

## Project Description:

The Expense Management System is a web-based application designed to assist users in tracking and managing their daily expenses. This system is built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) to create a scalable, responsive, and user-friendly application.

## 🚀 Features


### 🔐 Authentication & Authorization

* User signup and login system
* Secure authentication using JWT
* Protected routes with middleware

### 💸 Expense Management

* Add, update, and delete expenses
* Categorize expenses
* Track by date, type, and description

### 📊 Dashboard & Reports

* Visual summary of total expenses
* Category-wise expense distribution
* Interactive charts (Pie & Bar graphs)
* Filter by date range and category
    

### 📱 Responsive UI

* Fully responsive design (Mobile + Desktop)
* Clean and modern interface using React
* Reusable components for scalability

## 📂 Project Structure
```
Expense-Tracker-App/
│
├── frontend/        # React frontend
├── backend/         # Node/Express backend
│   ├── config/      # Environment configs
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API routes
│   └── controllers/ # Business logic
│
└── README.md
```

## Technical Architecture:

- Frontend:

    Utilize React.js for building the user interface, tsparticle library for awesome background effect and used other libraries like unique-names-generator, react-datepicker, moment

    Implement responsive design using CSS frameworks like Bootstrap and Material-Icons.

- Backend:

    Use Node.js and Express.js to build a RESTful API for handling client requests and serving as the application's backend.

    Implement authentication and authorization using JSON Web Tokens (JWT) and middleware to protect endpoints.

- Database:

    Store all data, including user information, expense entries, and categories, in MongoDB, a NoSQL database.

    Implement Mongoose ORM for schema definition and validation.

- Deployment:

    Deploy the application to a cloud provider like AWS and render.
    frontend has deployed on AWS and backend on Render.

    Set up Continuous Integration and Continuous Deployment (CI/CD) pipelines for automated builds and deployments.
## Run Locally

Clone the project

```bash
  git clone https://github.com/prasad-abhay/Expense-Management-App
```

Go to the project directory

```bash
  cd Expense-Tracker-App
```

Go to the frontend directory and Install dependencies

```bash
  cd frontend
```
```bash
  npm install
```

Go to the backend directory and Install dependencies

```bash
  cd backend
```
```bash
  npm install
```

Start the frontend server

```bash
  npm start
```


Start the backend server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in backend folder

create config folder and add config.env file in it and all all env variables there.

`MONGO_URL` : Your MongoDB Connection String

`PORT`: PORT number


## Tech Stack

**Client:** React, Redux, react-bootstrap, Material Icons, tsparticles

**Server:** Node, Express

**Database:** MongoDB


