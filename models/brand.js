const mongoose = require('mongoose');
const { DateTime } = require('luxon');

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

// Virtual for brand's date of founding formatted
BrandSchema.virtual('date_of_founding_formatted').get(function () {
    return DateTime.fromJSDate(this.date_of_founding).toLocaleString(
        DateTime.DATE_MED,
    );
});

// Virtual for brand's date of defunct formatted
BrandSchema.virtual('date_of_defunct_formatted').get(function () {
    if (!this.date_of_defunct) return 'N/A';
    return DateTime.fromJSDate(this.date_of_defunct).toLocaleString(
        DateTime.DATE_MED,
    );
});

// Export model
module.exports = mongoose.model('Brand', BrandSchema);
