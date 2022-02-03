#Whisk

## Summary

-This app helps small bakery shops manage inventory, recipes, and other activities related to the kitchen. It even includes a ledger to keep track of financial information

## Features

### Recipes
Users can add/edit/delete recipes in their catalog. They can keep a list of ingredients in each recipe with an amount and unit of measurment. 

### Inventory
Users can add/edit/delete inventory they currently have in their kitchen. This will be checked when users attempt to make batches of recipes.

### Batches
Users can make batches based off their recipes' ingredient list and available inventory. If there are short any items, that app will alert them.

### Ledger
Users can add/edit/delete transactions related to their bakery here. 

### Users
Each user is unique that signs up and each API call is verified using JWTs.

## Tech Stack and Installation Instructions

### Front End
This app uses React, Sass, and Axios to make the user experience responsive and dynamic. 

Install: 

```
cd client
npm install
npm start
```

### Back End
The server uses Express/Nodejs with Knex/MySql and JWTs for authentication.

Database Setup: (assuming mysql is installed)

You will first need to install MySQL(https://www.mysql.com/) and configure your knex file(https://knexjs.org/#Installation-client) to point to your database.

Install:
```
cd server
npm install
npx knex migrate:latest
npx knex seed:run
node server
```
