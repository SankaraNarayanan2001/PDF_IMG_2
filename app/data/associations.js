const User = require('../models/userModel');
const Content = require('../models/contentModel');
const Image = require('../models/imageModel');
const Map = require('../models/mapModel');

User.hasMany(Map);
Map.belongsTo(User);

Content.hasMany(Image); // Content has many images
Image.belongsTo(Content); // Image belongs to a content

User.belongsToMany(Content, { through: Map });
Content.belongsToMany(User, { through: Map });



module.exports = {
  User,
  Content,
  Image,
  Map
};
