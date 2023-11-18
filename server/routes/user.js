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

  router
  .route("/userprofile")
  .get(async(req,res) => {
    let requestData = req.body;
    try{
      
      const user = await userData.getUserProfile(requestData.email)
      console.log("here")
      return res.status(200).json(user)
    }catch(e){
      res.status(500).send("Internal Server Error")
    }
  })


  router.route("/userprofile/edituser").post(async (req, res) => {
    let requestData = req.body;
    try{
      if (!requestData.email, !requestData.firstName, !requestData.lastName) 
        throw {statusCode: 400, message: "Please provide all fields!"};
        const editUser = await userData.editUser(requestData.email, requestData.firstName, requestData.lastName)
        if(editUser) return res.json("Edit user successful")
    }catch(e){
      res.status(400).send("Edit user failed")
    }
  });

  router
  .route("/userprofile/getscore")
  .get(async(req,res) => {
    let requestData = req.body;
    try{
      
      const user = await userData.getUserProfile(requestData.email)
      return res.status(200).json(user.score)
    }catch(e){
      res.status(500).send("Internal Server Error")
    }
  })


module.exports = router;
