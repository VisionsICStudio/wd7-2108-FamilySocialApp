/* eslint-disable prettier/prettier */
/* eslint-disable semi */
const bcrypt = require('bcrypt')

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Tag, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        through: 'tags_Received',
      })
      models.Tag.sync()

      User.belongsToMany(models.Post, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        through: 'posts_received',
      })
      models.Post.sync()

      User.belongsToMany(models.Vote, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        through: 'votes_received',
      })
      models.Vote.sync()

      User.belongsToMany(models.Comment, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        through: 'comments_received',
      })
      models.Comment.sync()
    }
  }
  User.init(
    {
      avatar: {
        allowNull: true,
        field: 'avatar',
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
      city: {
        allowNull: false,
        field: 'city',
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
      loggedIn: {
        field: 'logged_in',
        type: DataTypes.BOOLEAN,
      },
      password: {
        allowNull: false,
        field: 'password',
        type: DataTypes.VIRTUAL,
        validate: {
          len: {
            args: [[8, 12]],
            msg: 'You must enter a value between 8 and 12 characters.',
          },
          notEmpty: true,
        },
      },
      password_confirmation: {
        type: DataTypes.VIRTUAL,
      },
      password_digest: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      state: {
        allowNull: false,
        field: 'state',
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      username: {
        allowNull: false,
        field: 'username',
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [1, 50],
          notEmpty: true,
        },
      },
    },
    {
      modelName: 'User',
      sequelize,
      tableName: 'users',
    }
  )
  const hasSecurePassword = (user, options, callback) => {
    if (user.password !== User.password_confirmation) {
      throw new Error("Password confirmation doesn't match Password")
    }
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) return callback(err)
      user.set('password_digest', hash)
      return callback(null, options)
    })
  }
  User.beforeCreate((user, options, callback) => {
    user.email.toLowerCase()
    if (user.password) hasSecurePassword(user, options, callback)
    else return callback(null, options);
    return user
  })
  User.beforeUpdate((user, options, callback) => {
    user.email.toLowerCase()
    if (user.password) hasSecurePassword(user, options, callback)
    else return callback(null, options)
    return user
  })
  return User
}
