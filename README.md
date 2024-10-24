
# User Authentication & Profile Management System (MySQL)

## Objective
This project demonstrates the development of a **User Authentication System** using **JWT (JSON Web Tokens)** along with **OTP-based login** and basic **User Profile Management** features. The system allows users to log in with a One-Time Password (OTP), manage their profiles, and regenerate access tokens using refresh tokens.

---

## Features

### OTP-based Login:
- Sends a **mock OTP** to the user's mobile number for login.
- Verifies the OTP and provides **JWT access** and **refresh tokens** for authentication.

### User Profile Management:
- Allows users to **create**, **update**, **view**, and **delete** their profiles (**CRUD operations**).

### JWT Token Functionality:
- **Access token** for user authentication.
- **Refresh token** functionality to regenerate expired access tokens.

### MySQL Database:
- **MySQL** is used for securely storing user data.

---

## Technologies Used

### Backend:
- **Node.js** (Express.js)
- **JSON Web Token (JWT)** for authentication
- **OTP** (mock implementation)

### Database:
- **MySQL** for user data storage


