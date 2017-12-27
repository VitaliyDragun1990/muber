const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {

    it('GET to /api/drivers finds drivers in a location', done => {
        // create two different drivers with distinct locations
        const seattleDriver = new Driver({
            email: 'seattle@test.com',
            geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
        });
        const miamiDriver = new Driver({
            email: 'miami@test.com',
            geometry: { type: 'Point', coordinates: [-80.256, 25.791] }
        });

        // save them both to the database
        Promise.all([seattleDriver.save(), miamiDriver.save()])
            .then(() => {
                request(app)            // make get request to retrieve nearest drivers from database
                    .get('/api/drivers?lng=-80&lat=25')
                    .end((err, response) => {
                       if (err) {
                           return done(err);
                       }
                       // use response body to make appropriate assertions
                        assert(response.body.length === 1);
                        assert(response.body[0].obj.email === 'miami@test.com');
                        done();
                    });
            });
    });

    it('POST to /api/drivers creates a new driver', done => {
        // find count of drivers in database before post request
        Driver.count({}).then(count => {
            request(app)
                .post('/api/drivers')
                .send({email: 'test@test.com'})
                .end(() => {
                    // find count of drivers in database after post request
                    Driver.count({}).then(newCount => {
                        // make a assertion that 1 addition driver was created
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });

    it('PUT to /api/drivers/id edit an existing driver', done => {
        // create a new driver
        const driver = new Driver({email: 't@t.com', driving: false});
        // save driver to database
        driver.save().then(() => {
            request(app)                            // make request to our application
                .put(`/api/drivers/${driver._id}`)  // using PUT method to specific url
                .send({driving: true})             // body of the request - property we want to update
                .end(() => {
                    Driver.findOne({email: 't@t.com'})  // find driver and assert that update was success
                        .then(driver => {
                            assert(driver.driving === true);
                            done();
                        });
                });
        });
    });

    it('DELETE to /api/drivers/id  can delete an existing driver', done => {
        // create a new driver
        const driver = new Driver({ email: 'deletetest@test.com' });
        // save it to the database
        driver.save().then(() => {
            request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end(() => {
                    Driver.findOne({email: 'deletetest@test.com'})
                        .then((driver) => {
                            assert(driver === null);
                            done();
                        })
                });
        })
    });
});