const asyncHandler = require('../utils/asyncErrorHandler');
const appError = require('../utils/appError');
const MapService = require('../services/mapCRUD');
const mapService = new MapService();
const path = require('path');

// Create a new map association
exports.createMap = asyncHandler(async (req, res) => {
  const { userId, contentId } = req.body;
  const map = await mapService.createMap(userId, contentId);
  res.status(201).json({
    status: "success",
    message: "user and content maped",
    data: map
  });
});

// Get all map associations
exports.getMaps = asyncHandler(async (req, res) => {
  const transformedMaps = await mapService.readMap();
  res.status(200).json({
    status: "success",
    message: "All data retrived form user",
    data: transformedMaps

  });

});


exports.getSingleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const transformedMaps = await mapService.readSingleMap(id);
  res.status(200).json({
    status: 'success',
    message: 'User data retrieved successfully',
    data: transformedMaps,
  });
});


// Update map association
exports.updateMap = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { contentID, updatedContentId } = req.body;
  await mapService.updateMap(id, contentID, updatedContentId);
  res.status(200).json({
    status: "success",
    message: 'Map associations updated successfully'
  });

});


// Delete map association
exports.deleteMap = asyncHandler(async (req, res, next) => {
  const { userid } = req.params;
  const { contentid } = req.body;
  await mapService.deleteMap(userid, contentid);
  res.status(200).json({
    status: "success",
    message: 'mapping deleted successfully'
  });
});

exports.Preview = async (req, res, next) => {
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

