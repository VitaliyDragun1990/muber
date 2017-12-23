// import express
const  express = require('express');
// import routes
const routes = require('./routes/routes');

// create an express application
const app = express();

// passing app to routes function to handle routing
routes(app);

// export our express application
module.exports = app;