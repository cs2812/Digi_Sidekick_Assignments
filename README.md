## Introduction
In this assignment, I have developed a full-stack web application using Node.js and MongoDB. where I am handling CRUD operations on a "users" collection, implementing input validation and error handling for API endpoints. User authentication is secured using JSON Web Tokens (JWT). Additional optional tasks include implementing pagination, sorting, searching, and filtering functionalities for the user listing page. The frontend is displaying a list of users, provides a form to create new users, and allows updating and deleting users with client-side input validation and error handling.

## Deployed App
https://deployed-site.whatever

## Features

- JWT authentication and authorization
- secured API using JWT token 
- CRUD, Search, Sorting, Filter, Pagination

## Installation & Getting started

### How to run Backend(server) 

- use your MongoDB_LINK to connect with the database 
- inside the server directory run the command in terminal 

    - npm install 
    - npm start

- without connecting with the database server will not run.

### How to run Frontend(client) 
- inside the client directory run the command in terminal 

    - npm install 
    - npm start

## Usage
- First of all, the user has to signup 
- Then login (Now a user has a JWT token to run the query)
- The user will be redirected to the user details page.
- Then Add the user.
- Now user can perform CRUD, Search, Sort, Filter, Pagination

## API Endpoints

- POST /auth/signup -register user
- POST /auth/login -authorize user

- GET /users - retrieve all items
- POST /users - create a new item
- PUT /users:id - Update item
- DELETE /users:id - Delete item


## Technology Stack
- Node.js
- Express.js
- MongoDB
- ReactJs

## Screenshots

### SignUp
![image](https://github.com/cs2812/Digi_Sidekick_Assignments/assets/101570543/eb278a4a-22d7-4e94-ab23-f650b839f4ef)
### Login
![image](https://github.com/cs2812/Digi_Sidekick_Assignments/assets/101570543/8ab9dbd3-35d8-4e6c-9b48-77303ac16d64)
### User Details
![image](https://github.com/cs2812/Digi_Sidekick_Assignments/assets/101570543/02a37bb7-cc87-42ae-8c26-f2c20e7562fd)


