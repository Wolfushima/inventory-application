const asyncHandler = require('express-async-handler');
const CameraInstance = require('../models/camera-instance');

// Display list of all CameraInstances.
exports.camerainstance_list = asyncHandler(async (req, res, next) => {
    const allCameraInstances = await CameraInstance.find()
        .populate('camera')
        .sort('camera')
        .exec();

    res.render('camerainstance_list', {
        title: 'Camera Instance List',
        camerainstance_list: allCameraInstances,
    });
});

// Display detail page for a specific CameraInstances.
exports.camerainstance_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: CameraInstance detail: ${req.params.id}`);
});

// Display CameraInstance create form on GET.
exports.camerainstance_create_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraInstance create GET');
});

// Handle CameraInstance create on POST.
exports.camerainstance_create_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraInstance create POST');
});

// Display CameraInstance delete form on GET.
exports.camerainstance_delete_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraInstance delete GET');
});

// Handle CameraInstance delete on POST.
exports.camerainstance_delete_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraInstance delete POST');
});

// Display CameraInstance update form on GET.
exports.camerainstance_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraInstance update GET');
});

// Handle CameraInstance update on POST.
exports.camerainstance_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraInstance update POST');
});
