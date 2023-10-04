const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const CameraInstance = require('../models/camera-instance');
const Camera = require('../models/camera');

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
    const cameraInstance = await CameraInstance.findById(req.params.id)
        .populate('camera')
        .exec();

    if (cameraInstance === null) {
        // No results.
        const err = new Error('Camera Instance not found');
        err.status = 404;
        return next(err);
    }

    res.render('camerainstance_detail', {
        title: 'Camera Instance detail',
        camerainstance: cameraInstance,
    });
});

// Display CameraInstance create form on GET.
exports.camerainstance_create_get = asyncHandler(async (req, res, next) => {
    const allCameras = await Camera.find().select('name').exec();

    res.render('camerainstance_form', {
        title: 'Create Camera Instance (Unit)',
        camera_list: allCameras,
    });
});

// Handle CameraInstance create on POST.
exports.camerainstance_create_post = [
    // Validate and sanitize fields.
    body('camera', 'Camera must be specified.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('color', 'Color must be specified.')
        .trim()
        .isLength({ min: 2 })
        .escape(),
    body('condition').escape(),
    body('price', 'Price must be in numbers.').trim().isNumeric().escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from the request.
        const errors = validationResult(req);

        // Create a CameraInstance object with escaped and trimmed data.
        const cameraInstance = new CameraInstance({
            camera: req.body.camera,
            color: req.body.color,
            condition: req.body.condition,
            price: req.body.price,
        });

        if (!errors.isEmpty()) {
            // There are errors.
            // Render form again with sanitized values and error messages.
            const allCameras = await Camera.find().select('name').exec();

            res.render('camerainstance_form', {
                title: 'Create Camera Instance (Unit)',
                camera_list: allCameras,
                selected_camera: cameraInstance.camera._id,
                errors: errors.array(),
                camera_instance: cameraInstance,
            });
            return;
        }
        // Data from form is valid.
        await cameraInstance.save();
        res.redirect(cameraInstance.url);
    }),
];

// Display CameraInstance delete form on GET.
exports.camerainstance_delete_get = asyncHandler(async (req, res, next) => {
    const cameraInstance = await CameraInstance.findById(req.params.id)
        .populate('camera')
        .exec();

    if (cameraInstance === null) {
        // No result.
        res.redirect('/catalog/camerainstances');
    }

    res.render('camerainstance_delete', {
        title: 'Delete Camera Instance (Unit)',
        camera_instance: cameraInstance,
    });
});

// Handle CameraInstance delete on POST.
exports.camerainstance_delete_post = asyncHandler(async (req, res, next) => {
    // Assume valid CameraInstance id in field.
    await CameraInstance.findByIdAndRemove(req.body.id);
    res.redirect('/catalog/camerainstances');
});

// Display CameraInstance update form on GET.
exports.camerainstance_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraInstance update GET');
});

// Handle CameraInstance update on POST.
exports.camerainstance_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: CameraInstance update POST');
});
