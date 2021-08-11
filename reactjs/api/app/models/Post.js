/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasOne(models.User, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      models.User.sync()

      Post.belongsToMany(models.Tag, {
        foreignKey: 'post_id',
        // This post id
        onDelete: 'SET NULL',

        onUpdate: 'CASCADE',

        // from Tag model
        targetKey: 'id',

        through: 'tags_received',
      })
      models.Tag.sync();

      Post.belongsToMany(models.Comment, {
        foreignKey: 'post_id',
        // This post id
        onDelete: 'SET NULL',

        onUpdate: 'CASCADE',

        // from Comment model
        targetKey: 'id',

        through: 'comments_received',
      })
      models.Comment.sync();

      Post.belongsToMany(models.Vote, {
        foreignKey: 'post_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',

        // from Comment model
        targetKey: 'id',

        through: 'votes_received',
      })
      models.Vote.sync();
    }
  }
  Post.init(
    {
      commentCount: {
        allowNull: true,
        field: 'comment_count',
        type: DataTypes.INTEGER,
      },
      content: {
        allowNull: false,
        field: 'content',
        type: DataTypes.TEXT,
        validate: {
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
      status: {
        field: 'status',
        type: DataTypes.ENUM({
          values: ['top', 'popular', 'new'],
        }),
      },
      title: {
        allowNull: false,
        field: 'title',
        type: DataTypes.STRING,
        validate: {
          len: [1, 50],
          notEmpty: true,
        },
      },
      totalVotes: {
        allowNull: true,
        field: 'total_votes',
        type: DataTypes.INTEGER,
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
      modelName: 'Post',
      options: {
        timestamps: false,
      },
      sequelize,
      tableName: 'posts',
    }
  )
  return Post
}
