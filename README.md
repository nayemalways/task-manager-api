# Task Manager API

Task Manager API is a backend application designed to manage tasks efficiently. It is built with **Node.js**, **Express**, and **MongoDB**, ensuring scalability, security, and performance.

---

## Features

- **User Authentication**: Secure user login and registration using `jsonwebtoken` and `bcrypt`.
- **Task Management**: Create, update, delete, and retrieve tasks.
- **Security Enhancements**:
  - Middleware like `helmet`, `hpp`, and `cors`.
  - Rate limiting to prevent abuse.
- **Email Notifications**: Integration with `nodemailer` for email functionality.
- **Environment Configuration**: Sensitive credentials managed using `.env`.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-manager-backend-project
