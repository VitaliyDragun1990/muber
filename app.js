// import express
const express = require('express');
// import body-parser library for parsing incoming requests
const bodyParser = require('body-parser');
// import routes
const routes = require('./routes/routes');
// import mongoose
const mongoose = require('mongoose');

// create an express application
const app = express();

mongoose.Promise = global.Promise;
// connect to our development database if we aren't running in test mode
if (process.env.NODE_ENV !== 'test') {
    // connect to our database
    mongoose.connect('mongodb://localhost/muber', {useMongoClient: true});
}
// use body-parser as middleware in our router - parse incoming request as json
app.use(bodyParser.json());
// passing app to routes function (middleware) which setups router handlers for concrete routes
routes(app);

// define error handler middleware
app.use((err, req, res, next) => {
    // set appropriate status code and send response to user
    res.status(422).send({ error: err._message });
});

// export our express application
module.exports = app;