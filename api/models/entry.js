"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Entry.belongsTo(models.User);
    }
  }
  Entry.init(
    {
      key: {
        type: DataTypes.STRING,
        allowNull: false, //required for notNull validation
        validate: {
          notNull: { msg: "Please provide a key." },
          notEmpty: { msg: "Please provide a key." },
        },
      },
      isIncome: {
        type: DataTypes.BOOLEAN,
        allowNull: false, //required for notNull validation
        validate: {
          notNull: {
            msg: "Please provide binary Boolean value for 'isIncome'.",
          },
          notEmpty: {
            msg: "Please provide binary Boolean value for 'isIncome'.",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //required for notNull validation
        validate: {
          notNull: { msg: "Please provide a name for your entry." },
          notEmpty: { msg: "Please provide a name for your entry." },
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: "Please provide an amount." },
          notEmpty: { msg: "Please provide an amount." },
        },
      },
    },
    {
      sequelize,
      modelName: "Entry",
    }
  );
  return Entry;
};
