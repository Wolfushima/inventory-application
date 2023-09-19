const asyncHandler = require('express-async-handler');
const CameraType = require('../models/camera-type');

// Display list of all CameraTypes.
exports.cameratype_list = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraType list');
});

// Display detail page for a specific CameraType.
exports.cameratype_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: CameraType detail: ${req.params.id}`);
});

// Display CameraType create form on GET.
exports.cameratype_create_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraType create GET');
});

// Handle CameraType create on POST.
exports.cameratype_create_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraType create POST');
});

// Display CameraType delete form on GET.
exports.cameratype_delete_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraType delete GET');
});

// Handle CameraType delete on POST.
exports.cameratype_delete_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraType delete POST');
});

// Display CameraType update form on GET.
exports.cameratype_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraType update GET');
});

// Handle CameraType update on POST.
exports.cameratype_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraType update POST');
});
