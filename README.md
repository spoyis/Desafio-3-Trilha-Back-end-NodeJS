
# Compass.UOL final challenge

This project tests my understanding of the NodeJS learning path built for training interns at Compass.

it is an API for managing car rentals. It allows users to view available cars, make reservations, and manage their reservations. The API is built using Node.js and Express, with data stored in a MongoDB database using Mongoose with Joi object validation. Authentication and authorization are handled using JSON Web Tokens (JWT). The API uses the Swagger UI tool for documentation and testing.


## Setup - running locally

clone the depository, and install the project dependencies using npm

```bash
  git clone https://github.com/LeandroCompass/Desafio-3-Trilha-Back-end-NodeJS.git
  cd Desafio-3-Trilha-Back-end-NodeJS
  npm install
```

then, you can use the start script to run the server in your local machine.

```bash
  npm start
```

you can also run the test suite with the following npm script

```bash
  npm test
```
# FEATURES
The API provides the following features:

- Authentication: Users can create an account, login, and receive a JWT token to use for authenticated routes.
- Car management: Users can create, read, update, and delete cars.
- Reservation management: Users can create, read, update, and delete reservations. Reservations are linked to a car and an authenticated user.
- Search: Users can search for cars based on various properties, including make, model, and year.
- Validation: The API uses Joi to validate request input for both cars and reservations.
- Pagination: The API supports pagination for search results.

## Endpoints
The API supports the following endpoints. this section is separated in three subsections, one for each module. car/user/reservation

### CAR

- ***GET*** **/api/v1/car/**: *Returns a list of all cars, supports query strings**
- ***GET*** **/api/v1/car/:id**: *Returns a specific car by ID.*
- ***POST*** **/api/v1/car**: *Creates a new car.*
- ***PUT*** **/api/v1/car/:id**: *Updates a specific car by ID.*
- ***DELETE*** **/api/v1/car/:id**: *Deletes a specific car by ID.*
- ***PATCH*** **/api/v1/car/:id/accessories/:id**: *Adds or removes a specific accessory by ID*

### USER

- ***GET*** **/api/v1/user**: *Returns a list of all users, supports query strings*
- ***GET*** **/api/v1/user:id**: *Returns a list of all users, supports query strings*
- **POST** **api/v1/user**: *Creates a new user account.*
- **POST** **api/v1/authenticate**: *Authenticates a user and returns a JWT token.*
- ***PUT*** **/api/v1/user/**: *Updates the currently logged in user*
- ***DELETE*** **/api/v1/user**: *Deletes the currently logged in user*

### RESERVATION

- ***GET*** **/api/v1/reserve**: *Returns a list of all reservations, supports query strings*
- ***GET*** **/api/v1/reserve/:id**: *Returns a specific reservation by ID*
- ***POST*** **/api/v1/reserve**: *Creates a new reservation*
- ***PUT*** **/api/v1/reserve/:id**: *Updates a specific reservation by ID.*
- ***DELETE*** **/api/v1/reserve/:id**: *Deletes a specific reservation by ID*

## Authorization
Most endpoints require an authentication token, obtained by logging in. The only endpoints that do not require authentication are:

- **GET** /api/v1/user
- **GET** /api/v1/user/:id
- **POST** api/v1/user
- **POST** api/v1/authenticate

In this challenge, different levels of user privileges were not required, therefore - all users are basically admins.

## Pagination
The API supports pagination for search results. By default, 5 results are returned per page. *Users can specify which page of results to retrieve by including a **pageIndex** number in the request body*
## Documentation

[Swagger documentation (must be running the server locally)](http://localhost:8000/api-docs/)

## Dependencies

- ***NODE.JS*** - version 18.13.0
- **axios: ^1.3.5** - Sending HTTP request to get address data
- **bcryptjs: ^2.4.3** - Password hashing and hash validation
- **dotenv: ^16.0.3** - Loads environment variables from .env file
- **express: ^4.18.2** - Web framework for node
- **express-async-errors:** ^3.1.1 - Middleware for handling async errors in Express
- **joi: ^17.9.1** - Schema validation library
- **jsonwebtoken: ^9.0.0** - JSON Web Token implementation
- **mongodb-memory-server: ^8.12.2** - In-memory MongoDB database server *FOR TESTING*
- **mongoose: ^7.0.2** - MongoDB object modeling tool for Node.js
- **swagger-jsdoc: ^6.2.8** - Generates Swagger documentation from JSDoc comments
- **swagger-ui-express: ^4.6.2** - Express middleware for serving Swagger UI

## Dev Dependencies
- **@types/bcryptjs: ^2.4.2** - TypeScript definitions for bcryptjs
- **@types/dotenv: ^8.2.0** - TypeScript definitions for dotenv
- **@types/express: ^4.17.17** - TypeScript definitions for express
- **@types/jest: ^29.5.0** - TypeScript definitions for Jest
- **@types/jsonwebtoken: ^9.0.1** - TypeScript definitions for jsonwebtoken
- **@types/mongoose: ^5.11.97** - TypeScript definitions for mongoose
- **@types/supertest: ^2.0.12** - TypeScript definitions for supertest
- **@types/swagger-jsdoc: ^6.0.1** - TypeScript definitions for swagger-jsdoc
- **@types/swagger-ui-express: ^4.1.3** - TypeScript definitions for swagger-ui-express
- **jest: ^29.5.0** - JavaScript testing framework
- **supertest: ^6.3.3** - Sends HTTP requests for testing
- **ts-jest: ^29.1.0** - A Jest preset to work with TypeScript
- **ts-node: ^10.9.1** - TypeScript execution environment for node.js
- **ts-node-dev: ^2.0.0** - TypeScript execution and reloading tool