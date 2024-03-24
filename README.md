## Description

This project is a basic implementation of a web application using the MERN stack, which consists of MongoDB, Express.js, React.js, and Node.js. It showcases the integration of these technologies to build a full-stack web application.

## Features

## Frontend Task

### Transactions Table

- Use the transactions listing API to list transactions in the table.
- Month dropdown displays Jan to Dec months as options, defaulting to March.
- Table lists transactions of the selected month irrespective of the year.
- Search transaction box filters transactions by title/description/price.
- Next and Previous buttons load next/previous page data from API.

### Transactions Statistics

- Display total amount of sale, total sold items, and total not sold items for the selected month using the API.

### Transactions Bar Chart

- Display price range and the number of items in that range for the selected month using the API.

## Backend Task

### Data Source

- **Third Party API URL:** [https://s3.amazonaws.com/roxiler.com/product_transaction.json](https://s3.amazonaws.com/roxiler.com/product_transaction.json)
- **Request Method:** GET
- **Response Format:** JSON

### Initialization API

- Create an API to initialize the database.
- Fetch JSON from the third party API and initialize the database with seed data.

### Transaction Listing API

- Create an API to list all transactions.
- Support search and pagination on product transactions.
- Search parameters match against the fields dateOfSale, title, description, and price.
- Default pagination values: page = 1, per page = 10.

### Statistics API

- Create an API for statistics:
  - Total sale amount of selected month.
  - Total number of sold items of selected month.
  - Total number of not sold items of selected month.

### Bar Chart API

- Create an API for a bar chart:
  - Response contains price range and the number of items in that range for the selected month.

### Pie Chart API

- Create an API for a pie chart:
  - Find unique categories and number of items from that category for the selected month.

### Combined Data API

- Fetch data from all the above APIs.
- Combine the response and send a final response of the combined JSON.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd projectName`
3. Install dependencies:
   - For backend:
     `cd backend && npm install`
   - For frontend:
     `cd frontend && npm install`
4. Set up environment variables:
   - Create a `.env` file in the `backend` directory and add variables (e.g., `MONGODB_URI` && `PORT`)
5. Start the backend server:
   - `cd backend && npm start`
6. Start the frontend development server:
   - `cd frontend && npm start`
7. Open your browser and navigate to `http://localhost:3000` to view the application.

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- HTML/CSS
- JavaScript

## Folder Structure

- `/backend`: Contains the server-side code (Node.js and Express.js)
- `/frontend`: Contains the client-side code (React.js)
