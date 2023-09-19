const asyncHandler = require('express-async-handler');
const Camera = require('../models/camera');

exports.index = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Site Home Page');
});

// Display list of all Cameras.
exports.camera_list = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera list');
});

// Display detail page for a specific Camera.
exports.camera_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Camera detail: ${req.params.id}`);
});

// Display Camera create form on GET.
exports.camera_create_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera create GET');
});

// Handle Camera create on POST.
exports.camera_create_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera create POST');
});

// Display Camera delete form on GET.
exports.camera_delete_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera delete GET');
});

// Handle Camera delete on POST.
exports.camera_delete_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera delete POST');
});

// Display Camera update form on GET.
exports.camera_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera update GET');
});

// Handle Camera update on POST.
exports.camera_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera update POST');
});
