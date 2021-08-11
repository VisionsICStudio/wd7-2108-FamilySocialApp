/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vote.hasOne(models.User, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      models.User.sync()
    }
  }
  Vote.init(
    {
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        validate: {
          notEmpty: true,
        },
      },
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      userId: {
        allowNull: false,
        field: 'user_id',
        type: DataTypes.UUID,
        unique: true,
      },
      vote: {
        allowNull: false,
        field: 'vote',
        type: DataTypes.INTEGER,
        unique: true,
        validate: {
          len: [1, 50],
          notEmpty: true,
        },
      },
    },
    {
      modelName: 'Vote',
      options: {
        timestamps: false,
      },
      sequelize,
      tableName: 'votes',
    }
  )
  return Vote
}
