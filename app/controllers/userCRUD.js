const User = require('../models/userModel');
const appError = require('../utils/appError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const UserService = require('../services/userCRUD');

const userService = new UserService();

// Create a new user
exports.createUser = asyncErrorHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userService.createUser(name, email, password);

  res.status(201).json({
    status: "success",
    message: "User created successfull",
    data: {
      user
    }
  });

});

exports.login = asyncErrorHandler(async (req, res, next) => {

  const { email, password } = req.body;
  const token = await userService.login(email, password);
  res.status(200).json({
    statuscode: 200,
    status: 'success',
    token: { token }
  });

});


// Read all users
exports.readUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.findAll();
  res.json({
    status: "success",
    message: "Get all data from user",
    data: {
      users
    }
  });
});

// Update a user by ID
exports.updateUser = asyncErrorHandler(async (req, res, next) => {

  const { id } = req.params;
  const { name, email, password } = req.body;
  const user = userService.updateUser(id, name, email, password);
  res.json({
    status: "success",
    message: "User updated successfull",
    data: {
      user
    }
  });

});

// Delete a user by ID
exports.deleteUser = asyncErrorHandler(async (req, res) => {

  const { id } = req.params;
  const user = await userService.deleteUser(id);

  res.json({
    status: "success",
    message: 'User deleted',
    data: {
      user
    }
  });

});

exports.preview = (req, res, next) => {
  const imageName = req.params.imageName;
  const imageFilePath = path.resolve('D:/extract_image_pdf_2/imageStorage/', imageName);

  // Set the response headers for image preview
  res.set('Content-Type', 'image/png');
  res.set('Content-Disposition', `inline; filename="${imageName}"`);

  // Send the image file as the response
  res.sendFile(imageFilePath, (error) => {
    if (error) {
      return next(new appError(404, 'unable to preview'));
    }
  });
};