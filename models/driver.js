const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define subdocument's schema for geoJson, representing geographical location of particular driver
const PointSchema = new Schema({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere'}
});

// define driver schema
const DriverSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    driving: {
        type: Boolean,
        default: false
    },
    geometry: PointSchema
});

// define driver model
const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;