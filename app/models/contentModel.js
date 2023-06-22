const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');


class Content extends Model { }

Content.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Content',
    timestamps: false,
    freezeTableName: true
  }
);


module.exports = Content;
