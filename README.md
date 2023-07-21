## Introduction
In this assignment, I have developed a full-stack web application using Node.js and MongoDB. where I am handling CRUD operations on a "users" collection, implementing input validation and error handling for API endpoints. User authentication is secured using JSON Web Tokens (JWT). Additional optional tasks include implementing pagination, sorting, searching, and filtering functionalities for the user listing page. The frontend is displaying a list of users, provides a form to create new users, and allows updating and deleting users with client-side input validation and error handling.

## Deplolyed App
Coming Soon

## Features

- JWT authentication and authorization
- secured API using JWT token 
- CRUD , Search , Sorting, Filter, Pagination

## Installation & Getting started

### How to run Backend(server) 

- use your MongoDB_LINK to connect with database 
- inside server directory run command in terminal 

    - npm install 
    - npm start

- without connecting with database server will not run.

### How to run Frontend(client) 
- inside client directory run command in terminal 

    - npm install 
    - npm start

## Usage
- First of all user has to signup 
- Then login (Now user has JWT token to run query)
- User will be redirect to user details page.
- Then Add user.
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