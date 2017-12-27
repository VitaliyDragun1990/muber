// import our drivers_controller for handling appropriate requests
const DriverController = require('../controllers/drivers_controller');

// The propose of this function is taking request and sending them to right router handler
// depending on request method and appending appropriate controller's handler method to each
module.exports = (app) => {
    // Watch for incoming requests of method GET
    // to the route http://localhost:3050/api
    app.get('/api', DriverController.greeting);
    // router handler for get request method
    app.get('/api/drivers', DriverController.index);
    // router handler for post request method
    app.post('/api/drivers', DriverController.create);
    // router handler for put request method
    app.put('/api/drivers/:id', DriverController.edit);
    // router handler for delete request method
    app.delete('/api/drivers/:id', DriverController.delete);
};