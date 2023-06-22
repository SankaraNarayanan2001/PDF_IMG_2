const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Map = sequelize.define('Map', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
},
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = Map;