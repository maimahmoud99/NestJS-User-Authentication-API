 # User Authentication API

## Project Description

This project is a RESTful API built with NestJS that provides a secure user authentication and user management system.  
Users can register, login to receive a JWT token, update their profile info, and admins can fetch all users.  
The API uses JWT tokens for authentication and supports role-based authorization to protect certain endpoints.

---

## How to Use the API

All requests and responses use JSON format.

### Authentication

- To access protected routes, clients must include a JWT token in the HTTP header:
  

- The token is received upon successful login.

### Endpoints

| Method | Endpoint           | Description                             | Auth Required? | Role         |
|--------|--------------------|-------------------------------------|---------------|--------------|
| POST   | `/auth/register`   | Register a new user                   | No            | N/A          |
| POST   | `/auth/login`      | Login and receive JWT token           | No            | N/A          |
| PATCH  | `/users/update-info`| Update logged-in user's email or password | Yes          | Any authenticated user |
| GET    | `/users`           | Get a list of all users                | Yes           | Admin only   |

---

## API Details

### 1. Register a New User

- **URL:** `/auth/register`
- **Method:** POST
- **Body Parameters:**

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
 

 Response:

Returns the created user object with hashed password (for example):


{
  "fullName": "mai Mahmoud",
  "email": "mai@example.com",
  "password": "$2b$10$hashedPasswordHere",
  "role": "user",
  "_id": "user_id_here",
  "__v": 0
}

2. Login User
URL: /auth/login
Method: POST
Body Parameters:

{
  "email": "string",
  "password": "string"
}

Response:
Returns an access token:

{
  "access_token": "your.jwt.token.here"
}

3. Update User Information
URL: /users/update-info
Method: PATCH
Headers:


Authorization: Bearer <access_token>
Body Parameters (one or both optional):

{
  "email": "newemail@example.com",
  "password": "newpassword"
}
Response:

Returns the updated user object or confirmation message.

4. Get All Users (Admin Only)
URL: /users
Method: GET
Headers:


Authorization: Bearer <access_token>
Response:
Returns an array of all users.

"# NestJS-User-Authentication-API" 
