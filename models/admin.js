const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('./index')

class Admin extends Model {}
Admin.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Admin',
})

module.exports = Admin