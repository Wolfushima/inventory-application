const mongoose = require('mongoose');
const { DateTime } = require('luxon');

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

// Virtual for camera's date of release formatted
CameraSchema.virtual('date_of_release_formatted').get(function () {
    return DateTime.fromJSDate(this.date_of_release).toLocaleString(
        DateTime.DATE_MED,
    );
});

// Virtual for camera's date of discontinuation formatted
CameraSchema.virtual('date_of_discontinuation_formatted').get(function () {
    if (!this.date_of_discontinuation) return 'N/A';
    return DateTime.fromJSDate(this.date_of_discontinuation).toLocaleString(
        DateTime.DATE_MED,
    );
});

// Export model
module.exports = mongoose.model('Camera', CameraSchema);
