const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserSkill extends Model { }

UserSkill.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        skill_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Skill',
                key: 'id',
            },
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'UserSkill',
    }
);

module.exports = UserSkill;