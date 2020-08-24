const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING,
      required:true
    },
    last_name: {
      type: Sequelize.STRING,
      required:true
    },
    email: {
      type: Sequelize.STRING,
      required:true
    },
    password: {
      type: Sequelize.STRING,
      required:true
    },
    college_name:{
      type: Sequelize.STRING,
      required:true
    }
    // created: {
    //   type: Sequelize.DATE,
    //   defaultValue: Sequelize.NOW
    // }
  },
  {
    timestamps: true
  }
)
