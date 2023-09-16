const mongoose = require('mongoose');

const { Schema } = mongoose;

const CameraInstanceSchema = new Schema({
    camera: { type: Schema.Types.ObjectId, ref: 'Camera', required: true },
    color: { type: String, required: true, minLength: 2, maxLength: 100 },
    condition: {
        type: String,
        required: true,
        enum: [
            'New',
            'Excellent',
            'Very Good',
            'Good',
            'For Parts or Not Working',
        ],
        default: 'New',
    },
    price: { type: Number, required: true },
});

// Virtual for camera-instance's URL
CameraInstanceSchema.virtual('url').get(function () {
    return `/catalog/camerainstance/${this._id}`;
});

// Export model
module.exports = mongoose.model('CameraInstance', CameraInstanceSchema);
