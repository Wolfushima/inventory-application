const asyncHandler = require('express-async-handler');
const CameraType = require('../models/camera-type');
const Camera = require('../models/camera');

// Display list of all CameraTypes.
exports.cameratype_list = asyncHandler(async (req, res, next) => {
    const allCameraTypes = await CameraType.find({})
        .select('name category')
        .sort('category')
        .exec();

    res.render('cameratype_list', {
        title: 'Camera Types List',
        cameratype_list: allCameraTypes,
    });
});

// Display detail page for a specific CameraType.
exports.cameratype_detail = asyncHandler(async (req, res, next) => {
    const [cameraType, camerasInCameraType] = await Promise.all([
        CameraType.findById(req.params.id).exec(),
        Camera.find({ camera_type: req.params.id })
            .select('name description')
            .sort('name')
            .exec(),
    ]);

    if (cameraType === null) {
        // No result.
        const err = new Error('Camera Type not found');
        err.status = 404;
        return next(err);
    }

    res.render('cameratype_detail', {
        title: 'Camera Type Detail',
        camera_type: cameraType,
        camera_type_cameras: camerasInCameraType,
    });
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
