const { Content, Image } = require('../data/associations');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const ContentService = require('../services/contentCRUD');
const contentService = new ContentService();

// Create a new content
exports.createContent = asyncErrorHandler(async (req, res, next) => {
    const { description } = req.body;
    const content = await contentService.createContent(description);
    res.status(200).json({
        status: "success",
        message: "Content created successfully",
        data: {
            content
        }
    })
});

// Read all contents
exports.getAllContents = asyncErrorHandler(async (req, res, next) => {
    const contents = await Content.findAll({ include: Image });
    res.status(200).json({
        status: "success",
        message: "View all content",
        data: {
            contents
        }
    })

});

// Read a content by ID
exports.getContentById = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const content = await contentService.getContentId(id);
    res.status(200).json({
        status: "success",
        message: `content retrived from ${id}`,
        data: {
            content
        }
    })
});

// Update a content by ID
exports.updateContent = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const { NewDescription } = req.body;

    const content = await contentService.updateContent(id, NewDescription);
    res.status(200).json({
        status: "success",
        message: "Content updated successfully",
        data: {
            content
        }
    })
});

// Delete a content by ID
exports.deleteContent = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    await contentService.deleteContent(id);
    res.status(200).json({
        status: "success",
        message: 'Content deleted'
    });
});

