#! /usr/bin/env node

console.log(
    'This script populates some test cameras, brands, camera-categories, camera-types and camera-instances to the database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require('mongoose');
const Camera = require('./models/camera');
const Brand = require('./models/brand');
const CameraCategory = require('./models/camera-category');
const CameraType = require('./models/camera-type');
const CameraInstance = require('./models/camera-instance');

const cameraCategories = [];
const cameraTypes = [];
const brands = [];
const cameras = [];
const cameraInstances = [];

mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected?');
    await createCameraCategories();
    await createCameraTypes();
    await createBrands();
    await createCameras();
    await createCameraInstances();
    console.log('Debug: Closing mongoose');
    mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// brand[0] will always be the Canon brand, regardless of the order
// in which the elements of promise.all's argument complete.
async function cameraCategoryCreate(index, name, description) {
    const cameraCategory = new CameraCategory({ name, description });
    await cameraCategory.save();
    cameraCategories[index] = cameraCategory;
    console.log(`Added cameraCategory: ${name}`);
}

async function cameraTypeCreate(index, name, category, description) {
    const cameraType = new CameraType({ name, category, description });
    await cameraType.save();
    cameraTypes[index] = cameraType;
    console.log(`Added cameraType: ${name}`);
}

async function brandCreate(
    index,
    name,
    description,
    dateFounding,
    dateDefunct,
    founder,
    headquarters,
    website,
) {
    const brandDetail = { name, description };
    if (dateFounding) brandDetail.date_of_founding = dateFounding;
    if (dateDefunct) brandDetail.date_of_defunct = dateDefunct;
    if (founder) brandDetail.founder = founder;
    if (headquarters) brandDetail.headquarters = headquarters;
    if (website) brandDetail.website = website;

    const brand = new Brand(brandDetail);

    await brand.save();
    brands[index] = brand;
    console.log(`Added brand: ${name}`);
}

async function cameraCreate(
    index,
    name,
    brand,
    cameraCategory,
    cameraType,
    description,
    dateRelease,
    dateDiscontinuation,
    lensMount,
    pictureSize,
    resolution,
    viewfinder,
    dimensions,
    weight,
) {
    const cameraDetail = {
        name,
        brand,
        camera_category: cameraCategory,
        camera_type: cameraType,
        description,
    };
    if (dateRelease) cameraDetail.date_of_release = dateRelease;
    if (dateDiscontinuation)
        cameraDetail.date_of_discontinuation = dateDiscontinuation;
    if (lensMount) cameraDetail.lens_mount = lensMount;
    if (pictureSize) cameraDetail.picture_size = pictureSize;
    if (resolution) cameraDetail.resolution = resolution;
    if (viewfinder) cameraDetail.viewfinder = viewfinder;
    if (dimensions) cameraDetail.dimensions = dimensions;
    if (weight) cameraDetail.weight = weight;

    const camera = new Camera(cameraDetail);
    await camera.save();
    cameras[index] = camera;
    console.log(`Added camera: ${name}`);
}

async function cameraInstanceCreate(index, camera, color, condition, price) {
    const cameraInstanceDetail = {
        camera,
        color,
        condition,
        price,
    };

    const cameraInstance = new CameraInstance(cameraInstanceDetail);
    await cameraInstance.save();
    cameraInstances[index] = cameraInstance;
    console.log(`Added cameraInstance: ${camera}`);
}

async function createCameraCategories() {
    console.log('Adding cameraCategories');
    await Promise.all([
        cameraCategoryCreate(
            0,
            'Digital',
            'Digital cameras are modern imaging devices that capture and store photographs as digital files. They use image sensors to convert light into digital data, which can be stored on memory cards and easily transferred to computers or other devices. Digital cameras offer instant review, editing, and sharing capabilities, making them versatile tools for photography and videography in the digital age.',
        ),
        cameraCategoryCreate(
            1,
            'Film',
            'Film cameras are traditional photographic devices that use rolls or sheets of photosensitive film to capture images. These cameras expose the film to light, creating a chemical reaction that forms a latent image. After development, the image appears on the film as a negative or slide. Film cameras are known for their analog nature and are cherished for their unique and nostalgic photographic qualities.',
        ),
    ]);
}

async function createCameraTypes() {
    console.log('Adding cameraTypes');
    await Promise.all([
        // Digital Category
        cameraTypeCreate(
            0,
            '4K',
            'Digital',
            'A 4K camera captures content with a resolution of approximately 4,000 horizontal pixels.',
        ),
        cameraTypeCreate(
            1,
            '6K',
            'Digital',
            'A 6K camera offers a resolution of around 6,000 horizontal pixels.',
        ),
        cameraTypeCreate(
            2,
            '8K',
            'Digital',
            'An 8K camera is designed to capture images and videos with an extremely high resolution of approximately 8,000 horizontal pixels.',
        ),
        cameraTypeCreate(
            3,
            'Bluetooth Capable',
            'Digital',
            'A Bluetooth-enabled camera comes equipped with Bluetooth technology, allowing it to connect wirelessly to other devices, such as smartphones, tablets, or laptops.',
        ),
        cameraTypeCreate(
            4,
            'DSLR Camera',
            'Digital',
            "A DSLR camera is a versatile and popular type of digital camera known for its exceptional image quality and creative control. It features a mirror and optical viewfinder that allows photographers to see through the camera's lens in real-time.",
        ),
        cameraTypeCreate(
            5,
            'GPS Capable',
            'Digital',
            'A GPS-enabled camera is equipped with built-in Global Positioning System (GPS) technology. This feature allows the camera to automatically record the precise location where each photo was taken.',
        ),
        cameraTypeCreate(
            6,
            'Mirrorless Camera/Compact System Camera',
            'Digital',
            'A Mirrorless Camera, often referred to as a Compact System Camera (CSC), is a compact and versatile digital camera that offers high-quality image capture without the traditional mirror and optical viewfinder found in DSLRs.',
        ),
        cameraTypeCreate(
            7,
            'NFC Capable',
            'Digital',
            'An NFC-enabled camera incorporates Near Field Communication technology, allowing it to establish a wireless connection with other NFC-compatible devices, such as smartphones or tablets, by simply bringing them close together.',
        ),
        cameraTypeCreate(
            8,
            'Point & Shoot',
            'Digital',
            'A Point & Shoot Digital Camera, often referred to as a compact digital camera, is a user-friendly and portable imaging device designed for effortless photography.',
        ),
        cameraTypeCreate(
            9,
            'WaterProof',
            'Digital',
            'A waterproof camera is specially designed to be resistant to water, making it suitable for use in wet or underwater environments.',
        ),
        cameraTypeCreate(
            10,
            'Wi-Fi Capable',
            'Digital',
            'A Wi-Fi-enabled camera is equipped with wireless networking capabilities, allowing it to connect to Wi-Fi networks and other compatible devices, such as smartphones, tablets, and computers.',
        ),
        // Film Category
        cameraTypeCreate(
            11,
            '35mm',
            'Film',
            'A 35mm film camera is a classic and traditional camera that uses 35mm film rolls for capturing photographs.',
        ),
        cameraTypeCreate(
            12,
            '110mm',
            'Film',
            'A 110mm film camera is a compact and portable analog camera that uses 110 film cartridges for capturing photographs.',
        ),
        cameraTypeCreate(
            13,
            'Instant/Polaroid',
            'Film',
            'An instant camera, also known as a Polaroid camera, is a type of camera that produces physical prints (instant photos) immediately after capturing an image.',
        ),
        cameraTypeCreate(
            14,
            'Medium Format',
            'Film',
            'A medium format camera is a type of camera that uses larger film formats, typically larger than 35mm film, to capture high-resolution images.',
        ),
        cameraTypeCreate(
            15,
            'Point & Shoot',
            'Film',
            'A point-and-shoot film camera, often referred to as a compact film camera, is a user-friendly and portable analog camera designed for straightforward photography.',
        ),
        cameraTypeCreate(
            16,
            'Single Use',
            'Film',
            'A single-use camera, also known as a disposable camera, is a simple and compact film camera designed for one-time use.',
        ),
        cameraTypeCreate(
            17,
            'Toy',
            'Film',
            'A toy camera, also known as a lomography camera or a plastic-fantastic camera, is a type of camera designed for creative and experimental photography.',
        ),
    ]);
}

async function createBrands() {
    console.log('Adding brands');
    await Promise.all([
        brandCreate(
            0,
            'Canon',
            "Canon is a renowned Japanese multinational corporation recognized for its excellence in imaging and optical products. With a strong focus on cameras, Canon offers a diverse range of digital cameras, DSLRs, and camcorders, making it a preferred choice for both professionals and photography enthusiasts. Canon's commitment to innovation and quality has established it as a leader in the imaging industry, while its dedication to corporate responsibility includes a focus on sustainability and environmental initiatives, aligning with the values of many consumers.",
            '1937-08-10',
            false,
            ['Takeshi Mitarai', 'Goro Yoshida', 'Saburo Uchida', 'Takeo Maeda'],
            'Ōta, Tokyo, Japan',
            'https://global.canon/en/',
        ),
        brandCreate(
            1,
            'Nikon',
            'Nikon is a well-established Japanese multinational corporation known for its extensive range of imaging products, including digital cameras, DSLRs, and optics. Nikon cameras are renowned for their exceptional image quality and advanced technology. The company has a rich history in photography and a strong presence in both the professional and consumer markets.',
            '1917-06-25',
            false,
            ['Koyata Iwasaki'],
            'Kōnan, Minato, Tokyo, Japan',
            'https://www.nikon.com/',
        ),
        brandCreate(
            2,
            'Yashica',
            "Yashica, a Japanese camera manufacturer, was known for its range of film cameras, including 35mm SLRs and rangefinders. Founded in 1949, Yashica produced cameras appreciated for their affordability and quality. However, Yashica faced challenges in the digital age and ceased camera production in the early 2000s. The brand's assets were acquired by Kyocera, marking the end of the Yashica era.",
            '1949-12',
            '2005',
            ['Yoshimasa Ushiyama'],
            'Nagano, Japan',
            'https://www.yashica.com/',
        ),
        brandCreate(
            3,
            'Polaroid',
            'Polaroid, founded in 1937, was an iconic American company famous for instant photography. Their instant cameras and film allowed users to see photographs immediately after capturing them. While Polaroid cameras enjoyed immense popularity for decades, the advent of digital photography led to financial struggles. Polaroid filed for bankruptcy in 2001, but its brand and instant photography technology continue to have a legacy in the modern market.',
            '1937',
            '2002',
            ['Edwin H. Land'],
            'Minnetonka, Minnesota, U.S.',
            'https://www.polaroid.com/',
        ),
    ]);
}

async function createCameras() {
    console.log('Adding cameras');
    await Promise.all([
        cameraCreate(
            0,
            'Canon AE-1',
            brands[0],
            cameraCategories[1],
            [cameraTypes[11]],
            "The Canon AE-1 is a classic 35mm SLR film camera known for its reliability and ease of use. It's a favorite among film enthusiasts and offers manual control over exposure settings.",
            '1976',
            '1984',
            'Canon FD mount',
            '35mm film format',
            false,
            'Optical viewfinder',
            '141 x 92 x 48 mm',
            '590 grams',
        ),
        cameraCreate(
            1,
            'Polaroid SX-70',
            brands[3],
            cameraCategories[1],
            [cameraTypes[13]],
            "The Polaroid SX-70 is an iconic instant camera that produces square instant photos. It's known for its folding design and ability to create unique, vintage-style instant prints.",
            '1972',
            '1981',
            'Fixed lens',
            'SX-70 instant film format',
            false,
            'Optical viewfinder',
            '190 x 110 x 32 mm',
            '470 grams',
        ),
        cameraCreate(
            2,
            'Nikon z5',
            brands[1],
            cameraCategories[0],
            [cameraTypes[0], cameraTypes[3], cameraTypes[6], cameraTypes[10]],
            "The Nikon Z5 is a compact and capable full-frame mirrorless camera, offering a 24.3-megapixel sensor for superb image quality. With 4K video recording, in-body image stabilization, and compatibility with Nikon's extensive lens lineup, it's a versatile choice for both photographers and videographers seeking performance and convenience.",
            '2020',
            false,
            'Nikon Z',
            false,
            '24.2 MP',
            'Electronic viewfinder',
            '134 x 100.5 x 69.5 mm',
            '675 grams',
        ),
        cameraCreate(
            3,
            'Yashica 635',
            brands[2],
            cameraCategories[1],
            [cameraTypes[14]],
            'The Yashica 635 is a classic medium format film camera known for its flexibility and high-quality images.',
            '1960',
            '1972',
            'Yashica Bayonet Mount',
            '120 Film (6x6 cm square format)',
            false,
            'Twin-lens Reflex (TLR)',
            '165.1 x 93.98 x 106.68 mm',
            '997.9 grams',
        ),
    ]);
}

async function createCameraInstances() {
    console.log('Adding authors');
    await Promise.all([
        cameraInstanceCreate(0, cameras[0], 'Black', 'Excellent', 200),
        cameraInstanceCreate(1, cameras[0], 'Black', 'Good', 150),
        cameraInstanceCreate(2, cameras[0], 'Silver', 'Good', 150),
        cameraInstanceCreate(
            3,
            cameras[0],
            'Silver',
            'For Parts or Not Working',
            45,
        ),
        cameraInstanceCreate(4, cameras[1], 'White', 'Excellent', 370),
        cameraInstanceCreate(5, cameras[1], 'Black', 'Good', 300),
        cameraInstanceCreate(6, cameras[2], 'Black', 'New', 1299.95),
        cameraInstanceCreate(7, cameras[2], 'Black', 'New', 1299.95),
        cameraInstanceCreate(8, cameras[2], 'Black', 'Excellent', 1100),
        cameraInstanceCreate(9, cameras[3], 'Black', 'Excellent', 238),
        cameraInstanceCreate(
            10,
            cameras[3],
            'Black',
            'For Parts or Not Working',
            64.99,
        ),
        cameraInstanceCreate(
            11,
            cameras[3],
            'Black',
            'For Parts or Not Working',
            34.67,
        ),
    ]);
}
