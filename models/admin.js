const { Model, DataTypes } = require('sequelize')

const sequelize = require('./db')

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