# Mini Twitter Backend — CSE341 Lab 7

A RESTful API backend for a mini Twitter clone, built with **Node.js** and **Express**.  
Data is stored in-memory using JavaScript arrays (no database required).

---

## Getting Started

### Prerequisites
- Node.js installed (`node --version` should work)

### Installation

```bash
git clone <your-repo-url>
cd mini-twitter-backend
npm install
```

### Run the server

```bash
node server.js
```

Server runs at: `http://localhost:3000`

---

## API Endpoints

### Users

| Method | Endpoint      | Description         | Body                          |
|--------|---------------|---------------------|-------------------------------|
| POST   | /users        | Create a user       | `{ username, email }`         |
| GET    | /users        | Get all users       | —                             |
| GET    | /users/:id    | Get user by ID      | —                             |

### Posts

| Method | Endpoint          | Description         | Body                              |
|--------|-------------------|---------------------|-----------------------------------|
| POST   | /posts            | Create a post       | `{ title, content, userId }`      |
| GET    | /posts            | Get all posts       | —                                 |
| GET    | /posts/:id        | Get post by ID      | —                                 |
| PUT    | /posts/:id        | Update a post       | `{ title?, content? }`            |
| DELETE | /posts/:id        | Delete a post       | —                                 |

### Likes

| Method | Endpoint              | Description         | Body              |
|--------|-----------------------|---------------------|-------------------|
| POST   | /posts/:id/likes      | Like a post         | `{ userId }`      |
| GET    | /posts/:id/likes      | Get likes count     | —                 |

---

## Project Structure

```
mini-twitter-backend/
├── server.js       # Main server file with all endpoints
├── package.json    # Project metadata and dependencies
├── .gitignore      # Ignores node_modules
└── README.md       # This file
```

---

## Technologies Used

- **Node.js** — JavaScript runtime
- **Express** — Web framework for Node.js
