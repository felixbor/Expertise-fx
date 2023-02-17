const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Skill extends Model { }

Skill.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        skill_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Skill',
    }
);

module.exports = Skill;