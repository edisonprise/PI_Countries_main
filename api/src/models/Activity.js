const { DataTypes, Sequelize } = require("sequelize");

module.exports = (Sequelize) => {
  Sequelize.define(
    "activity",
    {
       idActivity: {
        type: DataTypes.STRING,
        
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      difficulty: {
        type: DataTypes.ENUM,
        values:["1", "2", "3", "4", "5"]
      },
      duration: {
        type: DataTypes.STRING,
      },
      season: {
        type: DataTypes.ENUM,
        values:["Verano", "Otoño", "Invierno", "Primavera"]
      },
    },
    { timestamps: false }
  );
};
