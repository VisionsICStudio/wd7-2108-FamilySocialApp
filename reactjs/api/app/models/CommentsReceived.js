/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class CommentsReceived extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommentsReceived.hasMany(models.Post, {
        foreignKey: 'post_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      models.Post.sync()
    }
  }
  CommentsReceived.init(
    {
      commentId: {
        allowNull: false,
        field: 'comment_id',
        type: DataTypes.UUID,
        unique: true,
      },
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
    },
    {
      modelName: 'CommentsReceived',
      options: {
        timestamps: false,
      },
      sequelize,
      tableName: 'comments_received',
    }
  );
  return CommentsReceived
}
