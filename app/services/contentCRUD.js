const { Content, Image } = require('../data/associations');
const Map = require('../models/mapModel');
const appError = require('../utils/appError');

class ContentService {
    async createContent(description) {
        if (!description) {
            throw new appError(404, "Please enter description")
        }
        const content = await Content.create({ Description: description });
        return content;
    }

    async getContentId(id) {
        const content = await Content.findByPk(id, { include: Image });
        if (!content) {
            throw new appError(404, "content not found")
        }
        return content;
    }

    async updateContent(id, NewDescription) {
        const content = await Content.findByPk(id);
        if (!content) {
            throw new appError(404, "content not found")
        }

        content.Description = NewDescription;
        const updatedContent = await content.save();
        return updatedContent;
    }

    async deleteContent(id) {
        const content = await Content.findByPk(id);
        if (!content) {
            throw new appError(404, "content not found")
        }

        return await content.destroy();

    }
}

module.exports = ContentService
