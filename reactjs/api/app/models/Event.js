/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.User, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      models.User.sync()

      Event.hasMany(models.Post, {
        foreignKey: 'post_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      models.Post.sync()

      Event.belongsToMany(models.User, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        through: 'events_received',
      })
      models.User.sync()

      Event.belongsToMany(models.Post, {
        foreignKey: 'post_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        through: 'events_received',
      })
      models.Post.sync()
    }
  }
  Event.init(
    {
      count: {
        allowNull: false,
        field: 'count',
        type: DataTypes.INTEGER,
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
      icon: {
        allowNull: false,
        field: 'icon',
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        allowNull: false,
        field: 'name',
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [1, 50],
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
      modelName: 'Event',
      options: {
        timestamps: false,
      },
      sequelize,
      tableName: 'events',
    }
  )
  return Event
}
