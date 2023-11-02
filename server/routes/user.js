const express = require("express");
const { users } = require("../config/mongoCollections");
const userData = require("../data/user");
const {validEmail, validName, validPassword, validAge} = require("../helpers/validations");
const { badRequestError, internalServerError, notFoundError, unauthorizedError} = require("../helpers/wrappers");
const router = express.Router();
const { ObjectId } = require("mongodb");

  router.route("/register").post(async (req, res) => {
    let requestData = req.body;
    console.log("I am here")

    try{
      // Empty field validations
      if (!requestData.firstName, !requestData.lastName, !requestData.age, !requestData.email, !requestData.password,             !requestData.areaOfInterest, !requestData.score, !requestData.isAdmin) 
        throw {statusCode: 400, message: "Please provide all fields!"};

      validName(requestData.firstName);
      validName(requestData.lastName);
      validAge(requestData.age);
      validEmail(requestData.email);
      validPassword(requestData.password);
      //valid(requestData.areaOfInterest);

    }catch(e) {
        throw e;
    }
    

    usersList = await userData.createUser(
              requestData.firstName, 
              requestData.lastName, 
              requestData.age, 
              requestData.email, 
              requestData.password, 
              requestData.areaOfInterest, 
              requestData.score, 
              requestData.isAdmin
              )
      if(usersList.insertedUser)
        res.json("Inserted")
    
  });


  router.route("/login").post(async (req, res) => {
    let requestData = req.body;
    console.log("heyyyyy")
    try{
      if (!requestData.email, !requestData.password) 
        throw {statusCode: 400, message: "Please provide all fields!"};
      validEmail(requestData.email);
      validPassword(requestData.password);
    }catch(e) {
      console.log("in catch 54")
      res.status(400).send("Either the email or password is invalid");
      //throw badRequestError("Either the email or password is invalid");
    }

    const loggedIn = await userData.checkUser(requestData.email, requestData.password);

    console.log(loggedIn)
    if(loggedIn){     
        return res.json("Logged In")
    }  
    
  });

module.exports = router;
