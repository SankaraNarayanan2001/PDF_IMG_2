const Map = require('../models/mapModel');
const User = require('../models/userModel');
const Content = require('../models/contentModel');
const Image = require('../models/imageModel');
const appError = require('../utils/appError');


class mapService {
    async createMap(userId, contentId) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new appError(404, "user not found");
        }
        const content = await Content.findOne({ where: { id: contentId } })
        if (!content) {
            throw new appError(404, "content not found");
        }
        const map = await Map.create({ UserId: user.id, ContentId: content.id });
        return map;
    }

    async readMap() {
        const maps = await Map.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                    include: [
                        {
                            model: Content,
                            attributes: ['id', 'Description'],
                            include: [
                                {
                                    model: Image,
                                    attributes: ['id', 'image'],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        const transformedMaps = [];
        const processedUsers = new Set();

        for (const map of maps) {
            const userId = map.User.id;


            if (!processedUsers.has(userId)) {
                const userContents = map.User.Contents.map((content) => {
                    const contentImages = content.Images.map((image) => ({
                        id: image.id,
                        image: image.image,
                        url: `http://localhost:5000/preview/${image.image}`
                    }));

                    return {
                        id: content.id,
                        Description: content.Description,
                        Images: contentImages,
                    };
                });

                const sortedContents = userContents.sort((a, b) => a.id - b.id);


                transformedMaps.push({
                    User: {
                        name: map.User.name,
                    },
                    Contents: sortedContents,
                });

                processedUsers.add(userId);
            }
        }
        return transformedMaps;
    }


    async readSingleMap(id) {
        const map = await Map.findOne({
            where: { UserId: id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                    include: [
                        {
                            model: Content,
                            attributes: ['id', 'Description'],
                            include: [
                                {
                                    model: Image,
                                    attributes: ['id', 'image'],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (!map) {
            throw new appError(404, 'User not found');
        }

        const transformedMaps = [];
        const processedUsers = new Set();

        const userId = map.User.id;

        if (!processedUsers.has(userId)) {
            const userContents = map.User.Contents.map((content) => {
                const contentImages = content.Images.map((image) => ({
                    id: image.id,
                    image: image.image,
                    url: `http://localhost:5000/preview/${image.image}`,
                }));

                return {
                    id: content.id,
                    Description: content.Description,
                    Images: contentImages,
                };
            });

            const sortedContents = userContents.sort((a, b) => a.id - b.id);

            transformedMaps.push({
                User: {
                    name: map.User.name,
                },
                Contents: sortedContents,
            });

            processedUsers.add(userId);
        }

        return transformedMaps;

    }

    async updateMap(id, contentID, updatedContentId) {

        // Find the map record associated with the user
        const map = await Map.findOne({ where: { UserId: id, ContentId: contentID } });

        if (!map) {
            throw new appError(404, 'user not found');
        }

        // Update the content ID for the map record
        map.ContentId = updatedContentId;
        return await map.save();
    }

    async deleteMap(userid, contentid) {
        if (userid && contentid) {
            // Delete specific user-content mapping
            const map = await Map.findOne({ where: { UserId: userid, ContentId: contentid } });

            if (!map) {
                throw new appError(404, 'User-content mapping not found');
            }

            return await map.destroy();

        } else if (userid) {
            // Delete all mappings for the user
            return await Map.destroy({ where: { UserId: userid } });
        } else {
            throw new appError(400, 'Invalid request');
        }
    }

}


module.exports = mapService;