const ImageService = require('../services/imageCRUD');
const imageService = new ImageService();
const asyncErrorHandler = require('../utils/asyncErrorHandler');

// Create a new image for a content
exports.createImages = asyncErrorHandler(async (req, res, next) => {
    const { images } = req.body;
    const { contentId } = req.params;

    const createdImages = await imageService.createImage(images, contentId);
    res.status(200).json({
        status: "success",
        message: "Image created successfully",
        data: {
            createdImages
        }
    })
});


exports.getImageById = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    const image = await imageService.getImageById(id);

    res.status(200).json({
        status: 'success',
        message: 'Image retrieved successfully',
        data: {
            image,
        },
    });
});


exports.updateImage = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const { newImage } = req.body;

    const updatedImage = await imageService.updateImage(id, newImage);

    res.status(200).json({
        status: 'success',
        message: 'Image updated successfully',
        data: {
            image: updatedImage,
        },
    });
});


// Delete an image by ID
exports.deleteImage = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    await imageService.deleteImage(id);

    res.status(200).json({
        status: 'success',
        message: 'Image deleted successfully',
    });
});

exports.pdf_image=asyncErrorHandler(async (req,res,next)=>{
        const path = req.file;

          const images = await imageService.convertPDFToImages(path);
          res.status(200).json({
            status:"success",
            message:"pdf to image extract successfully",
            data:images
          })
       
})