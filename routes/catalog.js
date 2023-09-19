const express = require('express');

const router = express.Router();

// Require controller modules.
const camera_controller = require('../controllers/camera-controller');
const brand_controller = require('../controllers/brand-controller');
const camera_category_controller = require('../controllers/camera-category-controller');
const camera_type_controller = require('../controllers/camera-type-controller');
const camera_instance_controller = require('../controllers/camera-instance-controller');

/// >>>>>>>>>> CAMERA ROUTES <<<<<<<<<< ///

// GET catalog home page.
router.get('/', camera_controller.index);

// GET request for creating a camera. NOTE This must come before routes that display camera (uses id).
router.get('/camera/create', camera_controller.camera_create_get);

// POST request for creating camera.
router.post('/camera/create', camera_controller.camera_create_post);

// GET request to delete camera.
router.get('/camera/:id/delete', camera_controller.camera_delete_get);

// POST request to delete camera.
router.post('/camera/:id/delete', camera_controller.camera_delete_post);

// GET request to update camera.
router.get('/camera/:id/update', camera_controller.camera_update_get);

// POST request to update camera.
router.post('/camera/:id/update', camera_controller.camera_update_post);

// GET request for one camera.
router.get('/camera/:id', camera_controller.camera_detail);

// GET request for list of all camera items.
router.get('/cameras', camera_controller.camera_list);

/// >>>>>>>>>> BRAND ROUTES <<<<<<<<<< ///

// GET request for creating brand. NOTE This must come before route for id (i.e. display brand).
router.get('/brand/create', brand_controller.brand_create_get);

// POST request for creating brand.
router.post('/brand/create', brand_controller.brand_create_post);

// GET request to delete brand.
router.get('/brand/:id/delete', brand_controller.brand_delete_get);

// POST request to delete brand.
router.post('/brand/:id/delete', brand_controller.brand_delete_post);

// GET request to update brand.
router.get('/brand/:id/update', brand_controller.brand_update_get);

// POST request to update brand.
router.post('/brand/:id/update', brand_controller.brand_update_post);

// GET request for one brand.
router.get('/brand/:id', brand_controller.brand_detail);

// GET request for list of all brands.
router.get('/brands', brand_controller.brand_list);

/// >>>>>>>>>> CAMERA-CATEGORY ROUTES <<<<<<<<<< ///

// GET request for creating a cameracategory. NOTE This must come before route that displays cameracategory (uses id).
router.get(
    '/cameracategory/create',
    camera_category_controller.cameracategory_create_get,
);

// POST request for creating cameracategory.
router.post(
    '/cameracategory/create',
    camera_category_controller.cameracategory_create_post,
);

// GET request to delete cameracategory.
router.get(
    '/cameracategory/:id/delete',
    camera_category_controller.cameracategory_delete_get,
);

// POST request to delete cameracategory.
router.post(
    '/cameracategory/:id/delete',
    camera_category_controller.cameracategory_delete_post,
);

// GET request to update cameracategory.
router.get(
    '/cameracategory/:id/update',
    camera_category_controller.cameracategory_update_get,
);

// POST request to update cameracategory.
router.post(
    '/cameracategory/:id/update',
    camera_category_controller.cameracategory_update_post,
);

// GET request for one cameracategory.
router.get(
    '/cameracategory/:id',
    camera_category_controller.cameracategory_detail,
);

// GET request for list of all cameracategory.
router.get('/cameracategories', camera_category_controller.cameracategory_list);

/// >>>>>>>>>> CAMERA-TYPES ROUTES <<<<<<<<<< ///

// GET request for creating a cameratype. NOTE This must come before route that displays cameratype (uses id).
router.get('/cameratype/create', camera_type_controller.cameratype_create_get);

// POST request for creating cameratype.
router.post(
    '/cameratype/create',
    camera_type_controller.cameratype_create_post,
);

// GET request to delete cameratype.
router.get(
    '/cameratype/:id/delete',
    camera_type_controller.cameratype_delete_get,
);

// POST request to delete cameratype.
router.post(
    '/cameratype/:id/delete',
    camera_type_controller.cameratype_delete_post,
);

// GET request to update cameratype.
router.get(
    '/cameratype/:id/update',
    camera_type_controller.cameratype_update_get,
);

// POST request to update cameratype.
router.post(
    '/cameratype/:id/update',
    camera_type_controller.cameratype_update_post,
);

// GET request for one cameratype.
router.get('/cameratype/:id', camera_type_controller.cameratype_detail);

// GET request for list of all cameracategory.
router.get('/cameratypes', camera_type_controller.cameratype_list);

/// >>>>>>>>>> CAMERA-INSTANCE ROUTES <<<<<<<<<< ///

// GET request for creating a cameraInstance. NOTE This must come before route that displays cameraInstance (uses id).
router.get(
    '/camerainstance/create',
    camera_instance_controller.camerainstance_create_get,
);

// POST request for creating cameraInstance.
router.post(
    '/camerainstance/create',
    camera_instance_controller.camerainstance_create_post,
);

// GET request to delete cameraInstance.
router.get(
    '/camerainstance/:id/delete',
    camera_instance_controller.camerainstance_delete_get,
);

// POST request to delete cameraInstance.
router.post(
    '/camerainstance/:id/delete',
    camera_instance_controller.camerainstance_delete_post,
);

// GET request to update cameraInstance.
router.get(
    '/camerainstance/:id/update',
    camera_instance_controller.camerainstance_update_get,
);

// POST request to update cameraInstance.
router.post(
    '/camerainstance/:id/update',
    camera_instance_controller.camerainstance_update_post,
);

// GET request for one cameraInstance.
router.get(
    '/camerainstance/:id',
    camera_instance_controller.camerainstance_detail,
);

// GET request for list of all cameraInstance.
router.get('/camerainstances', camera_instance_controller.camerainstance_list);

module.exports = router;
