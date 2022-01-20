
const { DataTypes } = require('sequelize');

/* const { DataTypes } = require('sequelize'); */
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.



/* Base de datos
El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterisco deben ser obligatorias):

[ ] Receta con las siguientes propiedades:
ID: *
Nombre *
Resumen del plato *
Puntuación
Nivel de "comida saludable"
Paso a paso */




module.exports = (sequelize) => {
  
  sequelize.define('recipes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,

    },
    score: {
      type: DataTypes.INTEGER
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    }

  });
};

