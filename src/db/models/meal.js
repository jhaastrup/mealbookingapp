'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    store: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    // associations can be defined here
  };
  return Meal;
};