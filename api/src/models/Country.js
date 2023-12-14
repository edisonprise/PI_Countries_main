const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "country",
    {
      idCountry: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flag: {
        type: DataTypes.STRING,
        defaultValue:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Nuvola_unknown_flag.svg/1024px-Nuvola_unknown_flag.svg.png",
      },

      region:{
        type: DataTypes.STRING,
        allowNull: false,
        },
    

      capital: {
        type: DataTypes.STRING,
        defaultValue: "Unknown",
      },

      subregion: {
          type: DataTypes.STRING,
          allowNull: false,
          },


      area: {
        type: DataTypes.INTEGER,
      },
      population: {
        type: DataTypes.INTEGER,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
