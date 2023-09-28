const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
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
        title: 'Camera Category Detail',
        camera_category: cameraCategory,
        camera_category_cameras: camerasInCameraCategory,
    });
});

// Display CameraCategory create form on GET.
exports.cameracategory_create_get = (req, res, next) => {
    res.render('cameracategory_form', { title: 'Create Camera Category' });
};

// Handle CameraCategory create on POST.
exports.cameracategory_create_post = [
    // Validate and sanitize the name field.
    body('name', 'Camera Category must contain at least 3 characters.')
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body('description', 'Description must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a cameracategory object with escaped and trimmed data.
        const cameraCategory = new CameraCategory({
            name: req.body.name,
            description: req.body.description,
        });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('cameracategory_form', {
                title: 'Create Camera Category',
                camera_category: cameraCategory,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid.
        // Check if CameraCategory with same name already exists.
        const cameraCategoryExists = await CameraCategory.findOne({
            name: req.body.name,
        }).exec();
        if (cameraCategoryExists) {
            // CameraCategory exists, redirect to its detail page.
            res.redirect(cameraCategoryExists.url);
        } else {
            await cameraCategory.save();
            // New cameracategory saved. redirect to cameracategory detail page.
            res.redirect(cameraCategory.url);
        }
    }),
];

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
