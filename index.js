// import express application
const app = require('./app');

// listen for connections on port 3050
app.listen(3050, () => {
    console.log('Running on port 3050');
});