const express = require('express');
const router = express.Router();
const userDataFunctions = require('../data/user');

router
  .route('/user')
  .get(async (req, res) => {
    console.log("Heyyyyyy")
    try {
      const users = await userDataFunctions.getAllUsers()
      res.json(users)
    } catch (e) {
      // Something went wrong with the server!
      res.status(500).send(e);
    }
  })


  module.exports = router;