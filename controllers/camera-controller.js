const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Camera = require('../models/camera');
const Brand = require('../models/brand');
const CameraCategory = require('../models/camera-category');
const CameraType = require('../models/camera-type');
const CameraInstance = require('../models/camera-instance');

exports.index = asyncHandler(async (req, res, next) => {
    const [{ _id: digitalCategoryId }, { _id: filmCategoryId }] =
        await CameraCategory.find({
            name: ['Digital', 'Film'],
        })
            .select('_id')
            .exec();
    const [
        numCameras,
        numCameraInstances,
        numBrands,
        numCameraCategories,
        [{ digitalCameraInstancesCount: numDigitalCameraInstances }],
        [{ filmCameraInstancesCount: numFilmCameraInstances }],
        numCameraTypes,
    ] = await Promise.all([
        Camera.countDocuments({}).exec(),
        CameraInstance.countDocuments({}).exec(),
        Brand.countDocuments({}).exec(),
        CameraCategory.countDocuments({}).exec(),
        Camera.aggregate([
            {
                $lookup: {
                    from: 'camerainstances',
                    localField: '_id',
                    foreignField: 'camera',
                    as: 'instances',
                },
            },
            {
                $match: {
                    camera_category: digitalCategoryId,
                },
            },
            {
                $unwind: '$instances',
            },
            {
                $count: 'digitalCameraInstancesCount',
            },
        ]).exec(),
        Camera.aggregate([
            {
                $lookup: {
                    from: 'camerainstances',
                    localField: '_id',
                    foreignField: 'camera',
                    as: 'instances',
                },
            },
            {
                $match: {
                    camera_category: filmCategoryId,
                },
            },
            {
                $unwind: '$instances',
            },
            {
                $count: 'filmCameraInstancesCount',
            },
        ]).exec(),
        CameraType.countDocuments({}).exec(),
    ]);

    res.render('index', {
        title: 'Camera Store Home',
        camera_count: numCameras,
        camera_instance_count: numCameraInstances,
        brand_count: numBrands,
        camera_category_count: numCameraCategories,
        camera_instance_digital_count: numDigitalCameraInstances,
        camera_instance_film_count: numFilmCameraInstances,
        camera_type_count: numCameraTypes,
    });
});

// Display list of all Cameras.
exports.camera_list = asyncHandler(async (req, res, next) => {
    const allCameras = await Camera.find({})
        .select('name brand')
        .populate('brand')
        .exec();

    res.render('camera_list', {
        title: 'Camera List',
        camera_list: allCameras,
    });
});

// Display detail page for a specific Camera.
exports.camera_detail = asyncHandler(async (req, res, next) => {
    const [camera, cameraInstances] = await Promise.all([
        Camera.findById(req.params.id)
            .populate('brand')
            .populate('camera_category')
            .populate('camera_type')
            .exec(),
        CameraInstance.find({ camera: req.params.id }).sort('-price').exec(),
    ]);

    if (camera === null) {
        // No results.
        const err = new Error('Camera not found');
        err.status = 404;
        return next(err);
    }

    res.render('camera_detail', {
        title: camera.name,
        camera,
        camera_instances: cameraInstances,
    });
});

// Display Camera create form on GET.
exports.camera_create_get = asyncHandler(async (req, res, next) => {
    const [allBrands, allCameraCategories, allCameraTypes] = await Promise.all([
        Brand.find().exec(),
        CameraCategory.find().exec(),
        CameraType.find().exec(),
    ]);

    res.render('camera_form', {
        title: 'Create Camera',
        brands: allBrands,
        camera_categories: allCameraCategories,
        camera_types: allCameraTypes,
    });
});

// Handle Camera create on POST.
exports.camera_create_post = [
    // Convert cameratype to an array.
    (req, res, next) => {
        if (!(req.body.camera_type instanceof Array)) {
            if (typeof req.body.camera_type === 'undefined')
                req.body.camera_type = [];
            else req.body.camera_type = new Array(req.body.camera_type);
        }
        next();
    },

    // Validate and sanitize fields.
    body('name', 'Name must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('brand', 'Brand must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('camera_category', 'Category must not be empty').escape(),
    body('camera_type.*').escape(),
    body('description', 'Description must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('date_of_release', 'Invalid date.')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    body('date_of_discontinuation', 'Invalid date.')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    body('lens_mount').trim().escape(),
    body('picture_size').trim().escape(),
    body('resolution').trim().escape(),
    body('viewfinder').trim().escape(),
    body('dimensions').trim().escape(),
    body('weight').trim().escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Camera object with escaped and trimmed data.
        const camera = new Camera({
            name: req.body.name,
            brand: req.body.brand,
            camera_category: req.body.camera_category,
            camera_type: req.body.camera_type,
            description: req.body.description,
            date_of_release: req.body.date_of_release,
            date_of_discontinuation: req.body.date_of_discontinuation,
            lens_mount: req.body.lens_mount,
            picture_size: req.body.picture_size,
            resolution: req.body.resolution,
            viewfinder: req.body.viewfinder,
            dimensions: req.body.dimensions,
            weight: req.body.weight,
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            // Get brand, cameracategory and cameratype for form.
            const [allBrands, allCameraCategories, allCameraTypes] =
                await Promise.all([
                    Brand.find().exec(),
                    CameraCategory.find().exec(),
                    CameraType.find().exec(),
                ]);

            // Mark selected cameratypes as checked.
            for (const cameraType of allCameraTypes) {
                if (camera.camera_type.includes(camera_type._id)) {
                    cameraType.checked = 'true';
                }
            }

            res.render('camera_form', {
                title: 'Create Camera',
                brands: allBrands,
                camera_categories: allCameraCategories,
                camera_types: allCameraTypes,
                camera,
                errors: errors.array(),
            });
        } else {
            // Data from form is valid. Save camera.
            await camera.save();
            res.redirect(camera.url);
        }
    }),
];

// Display Camera delete form on GET.
exports.camera_delete_get = asyncHandler(async (req, res, next) => {
    const [camera, cameraInstances] = await Promise.all([
        Camera.findById(req.params.id)
            .populate('brand')
            .populate('camera_category')
            .populate('camera_type')
            .exec(),
        CameraInstance.find({ camera: req.params.id }).exec(),
    ]);

    if (camera === null) {
        // No results.
        res.redirect('/catalog/cameras');
    }

    res.render('camera_delete', {
        title: 'Delete Camera',
        camera,
        camera_instances: cameraInstances,
    });
});

// Handle Camera delete on POST.
exports.camera_delete_post = asyncHandler(async (req, res, next) => {
    // Asume the post has a valid id (ie no validation/sanitization)
    const [camera, cameraInstances] = await Promise.all([
        Camera.findById(req.params.id)
            .populate('brand')
            .populate('camera_category')
            .populate('camera_type')
            .exec(),
        CameraInstance.find({ camera: req.params.id }).exec(),
    ]);

    if (camera === null) {
        // No results.
        res.redirect('catalog/cameras');
    }

    if (cameraInstances.lenght > 0) {
        // Cameras has camera_instances.
        res.render('camera_delete', {
            title: 'Delete Camera',
            camera,
            camera_instances: cameraInstances,
        });
        return;
    }

    // Camera has no CameraInstance objects.
    await Camera.findByIdAndRemove(req.body.id);
    res.redirect('/catalog/cameras');
});

// Display Camera update form on GET.
exports.camera_update_get = asyncHandler(async (req, res, next) => {
    const [camera, allBrands, allCameraCategories, allCameraTypes] =
        await Promise.all([
            Camera.findById(req.params.id)
                .populate('brand')
                .populate('camera_category')
                .populate('camera_type')
                .exec(),
            Brand.find().exec(),
            CameraCategory.find().exec(),
            CameraType.find().exec(),
        ]);

    if (camera === null) {
        // No results.
        const err = new Error('Camera not found');
        err.status = 404;
        return next(err);
    }

    // Mark our selected camera types as checked.
    for (const cameraType of allCameraTypes) {
        for (const cameraTypeInCamera of camera.camera_type) {
            if (
                cameraType._id.toString() === cameraTypeInCamera._id.toString()
            ) {
                cameraType.checked = 'true';
            }
        }
    }

    res.render('camera_form', {
        title: 'Update Camera',
        brands: allBrands,
        camera_categories: allCameraCategories,
        camera_types: allCameraTypes,
        camera,
    });
});

// Handle Camera update on POST.
exports.camera_update_post = [
    // Convert cameratype to an array.
    (req, res, next) => {
        if (!(req.body.camera_type instanceof Array)) {
            if (typeof req.body.camera_type === 'undefined') {
                req.body.camera_type = [];
            } else {
                req.body.camera_type = new Array(req.body.camera_type);
            }
        }
        next();
    },

    // Validate and sanitize fields.
    body('name', 'Name must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('brand', 'Brand must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('camera_category', 'Category must not be empty').escape(),
    body('camera_type.*').escape(),
    body('description', 'Description must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('date_of_release', 'Invalid date.')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    body('date_of_discontinuation', 'Invalid date.')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    body('lens_mount').trim().escape(),
    body('picture_size').trim().escape(),
    body('resolution').trim().escape(),
    body('viewfinder').trim().escape(),
    body('dimensions').trim().escape(),
    body('weight').trim().escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Camera object with escaped and trimmed data.
        const camera = new Camera({
            name: req.body.name,
            brand: req.body.brand,
            camera_category: req.body.camera_category,
            camera_type:
                typeof req.body.camera_type === 'undefined'
                    ? []
                    : req.body.camera_type,
            description: req.body.description,
            date_of_release: req.body.date_of_release,
            date_of_discontinuation: req.body.date_of_discontinuation,
            lens_mount: req.body.lens_mount,
            picture_size: req.body.picture_size,
            resolution: req.body.resolution,
            viewfinder: req.body.viewfinder,
            dimensions: req.body.dimensions,
            weight: req.body.weight,
            _id: req.params.id, // This is required, or a new ID will be assigned.
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            // Get brand, cameracategory and cameratype for form.
            const [allBrands, allCameraCategories, allCameraTypes] =
                await Promise.all([
                    Brand.find().exec(),
                    CameraCategory.find().exec(),
                    CameraType.find().exec(),
                ]);

            // Mark selected cameratypes as checked.
            for (const cameraType of allCameraTypes) {
                if (camera.camera_type.includes(camera_type._id)) {
                    cameraType.checked = 'true';
                }
            }

            res.render('camera_form', {
                title: 'Update Camera',
                brands: allBrands,
                camera_categories: allCameraCategories,
                camera_types: allCameraTypes,
                camera,
                errors: errors.array(),
            });
            return;
        }
        // Data from form is valid. Update the record.
        const updatedCamera = await Camera.findByIdAndUpdate(
            req.params.id,
            camera,
            {},
        );

        // Redirect to camera detail page.
        res.redirect(updatedCamera.url);
    }),
];
