const mongoose = require('mongoose');

const { Schema } = mongoose;

const BrandSchema = new Schema({
    name: { type: String, required: true, minLength: 1, maxLength: 100 },
    description: { type: String, required: true },
    date_of_founding: { type: Date },
    date_of_defunct: { type: Date },
    founder: [{ type: String }],
    headquarters: { type: String },
    website: { type: String },
});

// Virtual for brand's URL
BrandSchema.virtual('url').get(function () {
    return `/catalog/brand/${this._id}`;
});

// Export model
module.exports = mongoose.model('Brand', BrandSchema);
