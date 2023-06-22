const router = require('express').Router();
const userCRUD = require('../controllers/userCRUD')
const contentCRUD = require('../controllers/contentCRUD');
const imageCRUD = require('../controllers/imageCRUD');
const mapCRUD = require('../controllers/mapCRUD');
const jwt = require('../middleware/jwt');

const multer=require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'D:/extract_image_pdf_2/uploads'); // Specify the directory to save the uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = file.originalname;
      cb(null, uniqueSuffix);
    },
  });
  
  const upload = multer({ storage })

// Create a new user
router.post('/createUser', jwt, userCRUD.createUser);

// Read all users
router.get('/readUser', jwt, userCRUD.readUsers);

// Update a user by ID
router.put('/updateUser/:id', jwt, userCRUD.updateUser);

// Delete a user by ID
router.delete('/deleteUSer/:id', jwt, userCRUD.deleteUser);

//login user
router.post('/loginUser', userCRUD.login)

//create content
router.post('/createContent', jwt, contentCRUD.createContent);

//read Content
router.get('/readContent', jwt, contentCRUD.getAllContents);

//read content by id
router.get('/content/:id', jwt, contentCRUD.getContentById);

//update content
router.put('/updatecontent/:id', jwt, contentCRUD.updateContent);

//delete content
router.delete('/deletecontent/:id', jwt, contentCRUD.deleteContent);

// Image create
router.post('/imageCreate/:contentId', jwt, imageCRUD.createImages);

// Read image by id
router.get('/imageGet/:id', jwt, imageCRUD.getImageById);

//update image
router.put('/imageUpdate/:id', jwt, imageCRUD.updateImage);

//delete image
router.delete('/imageDelete/:id', jwt, imageCRUD.deleteImage);

//create Map 
router.route('/maps')
    .post(jwt, mapCRUD.createMap)
    .get(jwt, mapCRUD.getMaps)

// Update map association
router.put('/maps/:id', jwt, mapCRUD.updateMap);

// Delete map association
router.delete('/maps/:userid', jwt, mapCRUD.deleteMap);

//Read single user
router.get('/getSingleUser/:id', mapCRUD.getSingleUser);

//PREVIEW
router.get('/preview/:imageName', mapCRUD.Preview)

router.post('/pdf_img',upload.single('file'),imageCRUD.pdf_image)
module.exports = router;