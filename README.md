# 📚 Library Management API

A RESTful Library Management System built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**. This API enables you to manage a catalog of books, borrow books, and track inventory efficiently.

---

## ✅ Features

- 📖 Create, update, delete, and retrieve books
- 🔍 Filter books by genre with pagination and sorting
- 🛒 Borrow books with quantity control and due date
- ⛔ Availability check and validation on borrow
- 📊 Borrowed books summary via aggregation pipeline
- 🧠 Business logic and middleware integration
- 📦 Modular and clean code with TypeScript

---

## 🛠️ Tech Stack

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: Mongoose Schema Validation
- **Tooling**: ts-node-dev, nodemon

---

## 📂 Project Structure

src/
├── controllers/
│ ├── book.controller.ts
│ └── borrow.controller.ts
├── interfaces/
│ ├── book.interface.ts
│ └── borrow.interface.ts
├── models/
│ ├── book.model.ts
│ └── borrow.model.ts
├── app.ts
└── server.ts


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api

2. Install Dependencies

npm install

3. Setup Environment Variables

Create a .env file in the root:

PORT=5000
MONGODB_URI=your-mongodb-connection-string

    ⚠️ Never commit your real MongoDB URI with credentials.

4. Run the Server (Development)

npm run dev

5. Build & Run (Production)

npm run build
npm start

🧪 API Endpoints
📘 Book Endpoints
Create Book

POST /api/books

Request:

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}

Response:
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}

Get All Books (Filter, Sort, Limit)

GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

Get Book by ID
GET /api/books/:bookId

Update Book
PUT /api/books/:bookId

Partial Update Book
PATCH /api/books/:bookId

Delete Book
DELETE /api/books/:bookId


📦 Borrow Endpoints

Borrow a Book
POST /api/borrow

Request
{
  "book": "BOOK_ID",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}


Borrowed Summary (Aggregation)
GET /api/borrow

Response:
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}

⚙️ Business Logic

    Books must have copies > 0 to be borrowed

    Copies are auto-deducted on borrow

    available field updated automatically via static method

    Middleware (pre('save')) ensures borrow rules are enforced

❗ Error Handling Format

{
  "success": false,
  "message": "Validation failed",
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}


