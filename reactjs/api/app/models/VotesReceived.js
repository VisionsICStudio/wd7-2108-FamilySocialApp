/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class VotesReceived extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VotesReceived.hasMany(models.Post, {
        foreignKey: 'post_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      models.Post.sync()
    }
  }
  VotesReceived.init(
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
      voteId: {
        allowNull: false,
        field: 'vote_id',
        type: DataTypes.UUID,
        unique: true,
      },
    },
    {
      modelName: 'VotesReceived',
      options: {
        timestamps: false,
      },
      sequelize,
      tableName: 'votes_received',
    }
  )
  return VotesReceived
}
