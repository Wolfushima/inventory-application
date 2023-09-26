const asyncHandler = require('express-async-handler');
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
    res.send(`NOT IMPLEMENTED: Camera detail: ${req.params.id}`);
});

// Display Camera create form on GET.
exports.camera_create_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera create GET');
});

// Handle Camera create on POST.
exports.camera_create_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera create POST');
});

// Display Camera delete form on GET.
exports.camera_delete_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera delete GET');
});

// Handle Camera delete on POST.
exports.camera_delete_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera delete POST');
});

// Display Camera update form on GET.
exports.camera_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera update GET');
});

// Handle Camera update on POST.
exports.camera_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Camera update POST');
});
