const mongoose = require('mongoose');

const { Schema } = mongoose;

const CameraTypeSchema = new Schema({
    name: { type: String, required: true, minLength: 1, maxLength: 100 },
    category: {
        type: String,
        required: true,
        enum: ['Digital', 'Film'],
    },
    description: { type: String },
});

// Virtual for camera-type's URL
CameraTypeSchema.virtual('url').get(function () {
    return `/catalog/cameratype/${this._id}`;
});

// Export model
module.exports = mongoose.model('CameraType', CameraTypeSchema);
