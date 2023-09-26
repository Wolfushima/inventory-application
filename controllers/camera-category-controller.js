const asyncHandler = require('express-async-handler');
const CameraCategory = require('../models/camera-category');
const Camera = require('../models/camera');

// Display list of all CameraCategories.
exports.cameracategory_list = asyncHandler(async (req, res, next) => {
    const allCameraCategories = await CameraCategory.find({})
        .select('name')
        .exec();

    res.render('cameracategory_list', {
        title: 'Camera Categories List',
        cameracategory_list: allCameraCategories,
    });
});

// Display detail page for a specific CameraCategory.
exports.cameracategory_detail = asyncHandler(async (req, res, next) => {
    const [cameraCategory, camerasInCameraCategory] = await Promise.all([
        CameraCategory.findById(req.params.id).exec(),
        Camera.find({ camera_category: req.params.id })
            .select('name brand description')
            .populate('brand')
            .select('name')
            .sort('name')
            .exec(),
    ]);

    if (cameraCategory === null) {
        // No results.
        const err = new Error('Camera Category not found');
        err.status = 404;
        return next(err);
    }

    res.render('cameracategory_detail', {
        title: 'Camera Detail',
        camera_category: cameraCategory,
        camera_category_cameras: camerasInCameraCategory,
    });
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
