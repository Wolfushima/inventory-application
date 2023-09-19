const asyncHandler = require('express-async-handler');
const CameraCategory = require('../models/camera-category');

// Display list of all CameraCategories.
exports.cameracategory_list = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraCategory list');
});

// Display detail page for a specific CameraCategory.
exports.cameracategory_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: CameraCategory detail: ${req.params.id}`);
});

// Display CameraCategory create form on GET.
exports.cameracategory_create_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraCategory create GET');
});

// Handle CameraCategory create on POST.
exports.cameracategory_create_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraCategory create POST');
});

// Display CameraCategory delete form on GET.
exports.cameracategory_delete_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraCategory delete GET');
});

// Handle CameraCategory delete on POST.
exports.cameracategory_delete_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraCategory delete POST');
});

// Display CameraCategory update form on GET.
exports.cameracategory_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraCategory update GET');
});

// Handle CameraCategory update on POST.
exports.cameracategory_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraCategory update POST');
});
