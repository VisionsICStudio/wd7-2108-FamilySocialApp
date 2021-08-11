/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class PostsReceived extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostsReceived.hasMany(models.Post, {
        foreignKey: 'post_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      models.Post.sync()

      PostsReceived.hasMany(models.User, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      models.User.sync()
    }
  }
  PostsReceived.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      postId: {
        allowNull: false,
        field: 'post_id',
        type: DataTypes.UUID,
        unique: true,
      },
      userId: {
        allowNull: false,
        field: 'user_id',
        type: DataTypes.UUID,
        unique: true,
      },
    },
    {
      modelName: 'PostsReceived',
      options: {
        timestamps: false,
      },
      sequelize,
      tableName: 'posts_received',
    }
  )
  return PostsReceived
}
