const asyncHandler = require('express-async-handler');
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
    res.send('NOT IMPLEMENTED: Brand create GET');
});

// Handle Brand create on POST.
exports.brand_create_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Brand create POST');
});

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
