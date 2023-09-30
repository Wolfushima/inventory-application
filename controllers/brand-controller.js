const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Brand = require('../models/brand');
const Camera = require('../models/camera');

// Display list of all Brands.
exports.brand_list = asyncHandler(async (req, res, next) => {
    const allBrands = await Brand.find({}).sort('name').exec();

    res.render('brand_list', {
        title: 'Brands List',
        brand_list: allBrands,
    });
});

// Display detail page for a specific Brand.
exports.brand_detail = asyncHandler(async (req, res, next) => {
    const [brand, allCamerasByBrand] = await Promise.all([
        Brand.findById(req.params.id).exec(),
        Camera.find({ brand: req.params.id }).select('name description').exec(),
    ]);

    if (brand === null) {
        // No result.
        const err = new Error('Brand not found');
        err.status = 404;
        return next(err);
    }

    res.render('brand_detail', {
        title: 'Brand Detail',
        brand,
        brand_cameras: allCamerasByBrand,
    });
});

// Display Brand create form on GET.
exports.brand_create_get = asyncHandler(async (req, res, next) => {
    res.render('brand_form', { title: 'Create Brand' });
});

// Handle Brand create on POST.
exports.brand_create_post = [
    // Convert founder to an array.
    (req, res, next) => {
        if (!(req.body.founder instanceof Array)) {
            if (typeof req.body.founder === 'undefined') req.body.founder = [];
            else req.body.founder = new Array(req.body.founder);
        }
        next();
    },

    // Validate and sanitize fields.
    body('name', 'Name of brand must be specified.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('description', 'Description must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('date_of_founding', 'Invalid date of founding.')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    body('date_of_defunct', 'Invalid date of defunct.')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    body('founder.*', 'Founder must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('headquarted').trim().escape(),
    body('website').trim().escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Brand object with escaped and trimmed data
        const brand = new Brand({
            name: req.body.name,
            description: req.body.description,
            date_of_founding: req.body.date_of_founding,
            date_of_defunct: req.body.date_of_defunct,
            founder: req.body.founder,
            headquarters: req.body.headquarters,
            website: req.body.website,
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('brand_form', {
                title: 'Create Brand',
                brand,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save brand.
        await brand.save();
        res.redirect(brand.url);
    }),
];

// Display Brand delete form on GET.
exports.brand_delete_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Brand delete GET');
});

// Handle Brand delete on POST.
exports.brand_delete_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Brand delete POST');
});

// Display Brand update form on GET.
exports.brand_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Brand update GET');
});

// Handle Brand update on POST.
exports.brand_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Brand update POST');
});
