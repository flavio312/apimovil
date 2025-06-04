import {Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Menu extends Model{}

Menu.init({
    id_Menu:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    ingredientes:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    preparacion:{
        type:DataTypes.TEXT,
        allowNull: false,
    }
},{
    sequelize,
    modelName: 'Menu',
    tableName: 'Menu',
    timestamps: false,
});

export default Menu;