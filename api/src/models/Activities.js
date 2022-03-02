const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
   id:{
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true
   },
   name:{
       type: DataTypes.STRING,
   },
   difficult:{
       type: DataTypes.ENUM("1", "2", "3", "4", "5")
   },
   duration:{
       type: DataTypes.STRING
   },
   season:{
       type: DataTypes.ENUM("Summer", "Winter", "Spring", "Autumn")
   }
   
  });
};
