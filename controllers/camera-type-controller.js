const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
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
    res.render('cameratype_form', { title: 'Create Camera Type' });
});

// Handle CameraType create on POST.
exports.cameratype_create_post = [
    // Validate and sanitize fields.
    body('name', 'Name must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('category').escape(),
    body('description', 'Description must not be empty.').trim().escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create CameraType object with escaped and trimmed data.
        const cameraType = new CameraType({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
        });

        if (!errors.isEmpty) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('cameratype_form', {
                title: 'Create Camera Type',
                camera_type: cameraType,
                errors: errors.array(),
            });
        }

        // Data from form is valid.
        // Check if CameraType with same name and category already exists.
        const cameraTypeExists = await CameraType.findOne({
            name: req.body.name,
            category: req.body.category,
        }).exec();
        if (cameraTypeExists) {
            // CameraType exists, redirect to its detail page.
            res.redirect(cameraTypeExists.url);
        } else {
            await cameraType.save();
            // New cameratype saved. Redirect to cameratype detail page.
            res.redirect(cameraType.url);
        }
    }),
];

// Display CameraType delete form on GET.
exports.cameratype_delete_get = asyncHandler(async (req, res, next) => {
    const [cameraType, camerasInCameraType] = await Promise.all([
        CameraType.findById(req.params.id).exec(),
        Camera.find({ camera_type: req.params.id })
            .select('name description')
            .exec(),
    ]);

    if (cameraType === null) {
        // No result.
        res.redirect('/catalog/cameratypes');
    }

    res.render('cameratype_delete', {
        title: 'Delete Camera Type',
        camera_type: cameraType,
        camera_type_cameras: camerasInCameraType,
    });
});

// Handle CameraType delete on POST.
exports.cameratype_delete_post = asyncHandler(async (req, res, next) => {
    const [cameraType, camerasInCameraType] = await Promise.all([
        CameraType.findById(req.params.id).exec(),
        Camera.find({ camera_type: req.params.id })
            .select('name description')
            .exec(),
    ]);

    if (camerasInCameraType.lenght > 0) {
        // CameraType has cameras.
        res.render('cameratype_delete', {
            title: 'Delete Camera Type',
            camera_type: cameraType,
            camera_type_cameras: camerasInCameraType,
        });
        return;
    }

    // CameraType has no cameras.
    await CameraType.findByIdAndRemove(req.body.id);
    res.redirect('/catalog/cameratypes');
});

// Display CameraType update form on GET.
exports.cameratype_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraType update GET');
});

// Handle CameraType update on POST.
exports.cameratype_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraType update POST');
});
