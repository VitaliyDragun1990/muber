// need to import Driver model here for our tests work
const Driver = require('../models/driver');

// Contain different specific logic for manipulating 'drivers' inside this application
module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there' });
    },

    index(req, res, next) {
        // retrieve longitude and latitude from request url's query string
        const { lng, lat } = req.query;

        // make geoNear find request to our database using driver model
        Driver.geoNear(
            { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            { spherical: true, maxDistance: 200000 }
            )
            .then(drivers => res.send(drivers))  // send them in response body
            .catch(next);                       // if error happened -> call next middleware (error handler)
    },

    create(req, res, next) {
        const driverProps = req.body;
        // create a new driver using request body and send newly created driver
        // back with response
        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);                   // if error happened -> call next middleware (error handler)
    },

    edit(req, res, next) {
        const driverId = req.params.id;  // get driver id from request url
        const driverProps = req.body;   // get edit data from request body
        // find particular driver in database using giving id
        // and update it using given edit data
        Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
            .then(() => Driver.findById({ _id: driverId }))
            .then(driver => res.send(driver))
            .catch(next);               // if error happened -> call next middleware (error handler)
    },

    delete(req, res, next) {
        const driverId = req.params.id;  // get driver id from request url
        // find particular driver in database using giving id
        // and remove it
        Driver.findByIdAndRemove({ _id: driverId })
            .then(driver => res.status(204).send(driver))
            .catch(next);               // if error happened -> call next middleware (error handler)
    }
};