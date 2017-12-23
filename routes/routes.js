// import our drivers_controller for handling appropriate requests
const DriverController = require('../controllers/drivers_controller');

// The propose of this function is taking request and sending them to right location
// depending on request method and appending appropriate controller's handler method to each
module.exports = (app) => {
    // Watch for incoming requests of method GET
    // to the route http://localhost:3050/api
    app.get('/api', DriverController.greeting);
};