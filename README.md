This is my backend for the People Management assignment.
I made a simple REST API using Node.js, Express and MongoDB.
Also added separate /api/person route for Angular(frontend).

Versions I used

Node.js: v24.11.1

npm: 11.6.2

MongoDB local: 127.0.0.1:27017

used Express, Mongoose, cors, etc.


How to run the backend

Install all dependencies:

npm install

Make sure MongoDB is running.

Start the server:

node app.js

Server will start on:

http://localhost:3000

API Endpoints (JSON)

I added these for Angular:

GET    /api/person          -> get all people
GET    /api/person/:id      -> get single person
PUT    /api/person/:id      -> update person
DELETE /api/person/:id      -> delete person
