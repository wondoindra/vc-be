const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('./index')

class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  status: DataTypes.STRING,
  url: DataTypes.STRING,
  sessionId: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'User',
})

module.exports = User