const mongoose = require('mongoose');

// this method'll be called before our tests run
before(done => {
    // connect to our test database for testing
    mongoose.connect('mongodb://localhost/muber_test', { useMongoClient: true });
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', err);
        })
});

// this method will drop our drivers collection before each test
beforeEach(done => {
    // find our drivers collection in our test muber_test database
    const { drivers } = mongoose.connection.collections;
    // drop it
    drivers.drop()
        // recreate an specific index after collection drop - for tests propose
        .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
        .then(() => done())
        .catch(() => done());
});