const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('./index')

class Admin extends Model {}
Admin.init({
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  sessionId: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Admin',
})

module.exports = Admin