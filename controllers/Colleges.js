const express = require('express')
const colleges = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const College = require('../models/Colleges');
colleges.use(cors())

process.env.SECRET_KEY = 'secret'

module.exports = {
  addCollege: async(req, res) => {
    try {
      const today = new Date()
      const collegeData = {
        college_name: req.body.college_name,
        created: today
      }
      let newCollege =await College.create(collegeData)
      if (newCollege) {
        res.send('College added successfully');
      } else {
        res.send('Failed to add the college');
      }
    } catch (err) {
      response.error(res, err);
    }
  },
  getColleges:async (req, res) => {
    try {
     let Allcolleges=await College.findAll()
     if (Allcolleges) {
      res.json(Allcolleges)
    } else {
      res.send('No college exist');
    }
    } catch (err) {
      response.error(res, err);
    }
  }
}



