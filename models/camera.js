const mongoose = require('mongoose');

const { Schema } = mongoose;

const CameraSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    camera_category: {
        type: Schema.Types.ObjectId,
        ref: 'CameraCategory',
        required: true,
    },
    camera_type: [
        {
            type: Schema.Types.ObjectId,
            ref: 'CameraType',
            required: true,
        },
    ],
    description: { type: String, required: true },
    date_of_release: { type: Date },
    date_of_discontinuation: { type: Date },
    lens_mount: { type: String },
    picture_size: { type: String },
    resolution: { type: String },
    viewfinder: { type: String },
    dimensions: { type: String },
    weight: { type: String },
});

// Virtual for camera's URL
CameraSchema.virtual('url').get(function () {
    return `/catalog/camera/${this._id}`;
});

// Export model
module.exports = mongoose.model('Camera', CameraSchema);
