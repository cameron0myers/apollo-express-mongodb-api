## Installation

* `touch .env`
* `npm install`
* fill out *.env file* (see below)
* `npm start`
* [start MongoDB](https://www.robinwieruch.de/mongodb-express-setup-tutorial/)
* visit `http://localhost:8000` for GraphQL playground

#### .env file

Since this boilerplate project is using MongoDB, you have to install it for your machine and get a database up and running. You find everything for the set up over here: [Setup MongoDB with Mongoose in Express Tutorial](https://www.robinwieruch.de/mongodb-express-setup-tutorial) [TODO: write setup tutorial]. After you have created a MongoDB database, you can fill out the environment variables in the *server/.env* file.

```
SECRET=asdlplplfwfwefwekwself.2342.dawasdq
PORT=8000
DATABASE_URL=mongodb://localhost:27017/mydatabase
TEST_DATABASE_URL=mongodb://localhost:27017/mydatabase // I am not impletented testing yet.
```

The `SECRET` is just a random string for your authentication. Keep all these information secure by adding the *.env* file to your *.gitignore* file. No third-party should have access to this information.