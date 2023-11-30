const express = require("express");
const { users } = require("../config/mongoCollections");
const userData = require("../data/user");
const {validEmail, validName, validPassword, validAge} = require("../helpers/validations");
const { badRequestError, internalServerError, notFoundError, unauthorizedError} = require("../helpers/wrappers");
const router = express.Router();
const { ObjectId } = require("mongodb");

  router.route("/register").post(async (req, res) => {
    let requestData = req.body;

    console.log(requestData);
    try{
      // Empty field validations
      if (!requestData.firstName || !requestData.lastName || !requestData.age ||  !requestData.email || !requestData.password || !requestData.areaOfInterest) {
        console.log("at 16 royte")
        throw {statusCode: 400, message: "Please provide all fields!"};
      }
    } catch(e) {
        console.log("I am at 21")
        res.status(400).send(e.message);
    }

    try {
        usersList = await userData.createUser(
          requestData.firstName, requestData.lastName, requestData.age, requestData.email, requestData.password, requestData.areaOfInterest, 0, false
        );

        console.log(usersList);
        if(usersList)
          res.json(usersList);
        
      } catch (e) {
        console.log("I am at 35")
        res.status(500).send(e.message);      
      }

  });


  router.route("/login").post(async (req, res) => {
    let requestData = req.body;
    try{
      if (!requestData.email, !requestData.password) 
        throw {statusCode: 400, message: "Please provide all fields!"};
      // validEmail(requestData.email);
      // validPassword(requestData.password);
    }catch(e) {
      res.status(400).send("Either the email or password is invalid");
      //throw badRequestError("Either the email or password is invalid");
    }


    try{
    const loggedIn = await userData.checkUser(requestData.email, requestData.password);
    if(loggedIn){     
        return res.json(loggedIn);
    }  
  }
  catch(e){
    res.status(400).send("Either the email or password is incorrect");
  }
    
  });

  router
  .route("/userprofile")
  .get(async(req,res) => {
    let requestData = req.body;
    try{
      
      const user = await userData.getUserProfile(requestData.email)
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
