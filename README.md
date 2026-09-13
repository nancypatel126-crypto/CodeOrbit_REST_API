# CodeOrbit REST API

A simple REST API built using Node.js and Express.js for managing notes.

## Internship Task

CodeOrbit Tech - Full Stack Development Internship

Task 3: Simple REST API with Node.js

## Technologies Used

- Node.js
- Express.js
- JavaScript
- JSON File Storage
- Postman
- VS Code

## Features

- Create a new note
- Get all notes
- Get a single note
- Update a note
- Delete a note
- Store notes in a JSON file
- REST API testing using Postman

## Project Structure

REST_API/
│
├── node_modules/
├── notes.json
├── package.json
├── package-lock.json
├── README.md
└── server.js

## Installation

1. Clone or download the project.

2. Open the project folder in VS Code.

3. Install dependencies:

npm install

4. Start the server:

npm start

The server will run at:

http://localhost:3000

## API Endpoints

### 1. Home

GET

http://localhost:3000/

### 2. Get All Notes

GET

http://localhost:3000/api/notes

### 3. Get Single Note

GET

http://localhost:3000/api/notes/1

### 4. Create Note

POST

http://localhost:3000/api/notes

Request Body:

{
    "title": "Learn REST API",
    "content": "Testing POST request using Postman"
}

### 5. Update Note

PUT

http://localhost:3000/api/notes/1

Request Body:

{
    "title": "Learn Node.js REST API",
    "content": "Updated note using PUT request"
}

### 6. Delete Note

DELETE

http://localhost:3000/api/notes/1

## Testing

All API endpoints were tested using Postman.

Tested operations:

- GET
- POST
- PUT
- DELETE

## Author

Nancy Patel

GitHub:
https://github.com/nancypatel126-crypto
## Project Status

Task 3 REST API completed and tested successfully using Postman.