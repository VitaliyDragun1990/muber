const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {

    it('handles a GET request to /api', (done) => {
        // make a fake request to our express application
        request(app)                                        // get request to our app
            .get('/api')                                    // use GET request method
            .end((err, response) => {                       // handle error and response
                assert(response.body.hi === 'there');       // check if response body valid
                done();
            });
    });
});