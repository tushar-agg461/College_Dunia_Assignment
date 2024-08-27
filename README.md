# Bookstore API with Node.js and MongoDB
In this comprehensive guide, we introduce you to our Bookstore API, a resource designed to help developers quickly build and manage a collection of books. Whether you are just starting with backend development or looking for an efficient solution to manage book data, this document will guide you through setting up and using our API.

# Prerequisites
Before you begin, ensure you have met the following requirements:

* Node.js and npm installed
* MongoDB installed and accessible (either locally or via a cloud service like MongoDB Atlas)
* Git installed for version control
# Getting Started
## Installation
* Fork the Repository
* Click the "Fork" button in the upper right corner of the repository page to create a copy of the repository under your GitHub account.

* Clone this Repository
Clone the forked repository to your local machine using the following command:

```bash
https://github.com/tushar-agg461/College_Dunia_Assignment.git
```
Navigate to the Project Directory
```bash
cd server
```
* Install all necessary Node.js packages by running:

```bash
npm install
```

# Running the App
To start the application, use one of the following commands depending on your environment:


## Development
```bash
npm run start
```
## Add the Following Environment Variables
Create a .env file in the root directory of your project and add the following environment variables:

```bash
MONGODB_URI= your_mongodb_uri
PORT=your_port_number (default is 3000)
```
### For example:
```bash
MONGODB_URI=mongodb://localhost:27017/server 
PORT=3000
```
# API Endpoints
Below are the main API endpoints provided by this application:

```bash
POST /api/books       : Create a new book entry.
GET /api/books        : Retrieve a list of all books.
GET /api/books/       : Retrieve details of a specific book by its ID.
PUT /api/books/:id    : Update a book's information by its ID.
DELETE /api/books/:id : Delete a specific book by its ID.
```
# Additional Features
```
Pagination: Use ?page=1&limit=10 for paginated results.
Sorting: Use ?sortby=publishedDate&ord=desc to sort results.
```
# Folder Structure
## Here's a quick overview of the project's folder structure:

```bash
server/
├── models/
│   └── book.js
├── routes/
│   └── bookRoutes.js
├── index.js
└── .env
```
# Documentation and Links 
* [Postman Collection Link](https://documenter.getpostman.com/view/26463895/2sAXjGduh5)
* [Github Link](https://github.com/tushar-agg461/College_Dunia_Assignment/)
