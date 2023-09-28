const mongoose = require('mongoose');

const { Schema } = mongoose;

const CameraCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
    },
    description: { type: String, required: true },
});

// Virtual for camera-category's URL
CameraCategorySchema.virtual('url').get(function () {
    return `/catalog/cameracategory/${this._id}`;
});

// Export model
module.exports = mongoose.model('CameraCategory', CameraCategorySchema);
