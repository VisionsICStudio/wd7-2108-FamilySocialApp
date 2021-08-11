/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.hasOne(models.User, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      models.User.sync()
    }
  }
  Comment.init(
    {
      content: {
        allowNull: false,
        field: 'content',
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [1, 50],
          notEmpty: true,
        },
      },
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
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: DataTypes.DATE,
        validate: {
          notEmpty: true,
        },
      },
      userId: {
        allowNull: false,
        field: 'user_id',
        type: DataTypes.UUID,
        unique: true,
      },
    },
    {
      modelName: 'Comment',
      options: {
        timestamps: false,
      },
      sequelize,
      tableName: 'comments',
    }
  )
  return Comment
}
