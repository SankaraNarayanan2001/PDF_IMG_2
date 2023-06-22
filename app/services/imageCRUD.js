const { Content, Image } = require('../data/associations');
const appError = require('../utils/appError');
const pdfPoppler = require('pdf-poppler');
const fs=require('fs')



class ImageService {
  async createImage(images, contentId) {
    const content = await Content.findByPk(contentId);
    if (!content) {
      throw new appError(404, "content not found")
    }

    const imagePromises = images.map(async (image, index) => {
      return Image.create({ image, ContentId: contentId });
    });

    const createdImages = await Promise.all(imagePromises);
    return createdImages;
  }

  async getImageById(id) {
    const image = await Image.findByPk(id);
    if (!image) {
      throw new appError(404, "Image not found");
    }
    return image;
  }

  async updateImage(id, newImage) {
    const IMAGE = await Image.findByPk(id);
    if (!IMAGE) {
      throw new appError(404, "Image not found");
    }

    IMAGE.image = newImage;
    const updatedImage = await IMAGE.save();
    return updatedImage;
  }

  async deleteImage(id) {
    const image = await Image.findByPk(id);
    if (!image) {
      throw new appError(404, "Image not found");
    }

    return await image.destroy();
  }

  async convertPDFToImages(path){
    const pdfPath = path.destination + `${path.originalname}`;
    const outputDir = 'D:/extract_image_pdf_2/imageStorage/'; // Output directory for the converted images
  
    const options = {
      format: 'png', // Output image format (png, jpeg, tiff)
      out_dir: outputDir, // Output directory
      out_prefix: 'image_', // Output image prefix
      page: null, // Specify a specific page to convert (null for all pages)
    };
  
    pdfPoppler.convert(pdfPath, options)

    const files = await fs.promises.readdir(outputDir);

    return files;
    }
  
}

module.exports = ImageService;