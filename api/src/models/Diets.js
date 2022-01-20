const { DataTypes } = require('sequelize');

/* [ ] Tipo de dieta con las siguientes propiedades:

ID
Nombre 

 */

module.exports = (sequelize) => {
  
    sequelize.define('diets', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      } 
    });
  };