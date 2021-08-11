/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class TagsReceived extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TagsReceived.hasMany(models.Tag, {
        foreignKey: 'tag_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      models.Tag.sync()

      TagsReceived.hasMany(models.User, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      models.User.sync()
    }
  }
  TagsReceived.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      postId: {
        allowNull: false,
        field: 'post_id',
        type: DataTypes.UUID,
        unique: true,
      },
      tagId: {
        allowNull: false,
        field: 'tag_id',
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
      modelName: 'TagsReceived',
      options: {
        timestamps: false,
      },
      sequelize,
      tableName: 'tags_received',
    }
  )
  return TagsReceived
}
