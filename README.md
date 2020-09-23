# CS3219 Task B

## Task B1
Implement a simple Javascript backend and REST API to GET, POST, PUT and DELETE.

This repository contains a API that allows for create, retrive, update and delete of quotes.

The application uses [Node.js](https://nodejs.org/en/) and [PostgreSQL](https://www.postgresql.org/)(with pgAdmin). It will be testing through [Postman](https://www.postman.com/).

### Setup and Run Task B1
1. You are required to download and install [Node.js](https://nodejs.org/en/), [PostgreSQL](https://www.postgresql.org/)(with pgAdmin) and [Postman](https://www.postman.com/).
2. Clone this repository by `git clone https://github.com/sheexiong/task-b.git`.
3. Navigate to the root directory by `cd task-b`.
4. Run `npm install` to install all the required dependencies to run this application.
5. Run pgAdmin applicaton to start the database and create a new Database name `task-b` in pgAdmin.
6. Run `npm start` to start the application.
7. Afterwards, we can start accessing the API through the [Postman](https://www.postman.com/).

### Postman testing
This section will show how to use [Postman](https://www.postman.com/) to test the API.

1. Get all quotes
    * Enter http://localhost:3000/api/quote
    * Select **GET** request.
    * Press **Send** button.
    * You should get the list of all quotes.
    * If the database is empty, it will return an empty array.
2. Get a specific quote
    * Enter http://localhost:3000/api/quote/{id}
    * Replace {id} with the **id** of quote.
    * Select **GET** request.
    * Press **Send** button.
    * You should get the detail of this specific quote.
    * If this quote does not exist, it will return nothing.
3. Create a new quote
    * Enter http://localhost:3000/api/quote/
    * Select the **body** tab below the URL.
    * Select **x-www-form-urlencoded**.
    * Fill in **content** and **author** of the new quote (e.g. key: content, value: Get busy living or get busy dying.).
    * Select **POST** request.
    * Press **Send** button.
    * You should get the detail of the new quote if the quote was created successfully.
4. Update a quote
    * Enter http://localhost:3000/api/quote/{id}
    * Replace {id} with the **id** of quote.
    * Select the **body** tab below the URL.
    * Select **x-www-form-urlencoded**.
    * Fill in updated **content** and **author** of the quote (e.g. key: content, value: NEW Get busy living or get busy dying.).
    * Select **PUT** request.
    * Press **Send** button.
    * You should get the message of quote was updated successfully.
5. Delete a quote
    * Enter http://localhost:3000/api/quote/{id}
    * Replace {id} with the **id** of quote.
    * Select **DELETE** request.
    * Press **Send** button.
    * You should get the message of quote was deleted successfully.
7. Delete all quote
    * Enter http://localhost:3000/api/quote
    * Select **DELETE** request.
    * Press **Send** button.
    * You should get the message of total number of quotes was deleted successfully.



## Task B2


