const express = require('express');
const router = express.Router();
const mongoCollections = require('../config/mongoCollections');
const { validObjectId, validString, validEmail, validName, validPassword} = require("../helpers/validations");
const { badRequestError, internalServerError, notFoundError, unauthorizedError} = require("../helpers/wrappers");
const users = mongoCollections.users;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const {ObjectId} = require('mongodb');


//Register Function
const createUser = async (firstName, lastName, age, email, password, areaOfInterest, Pop_score, Geo_score, Hist_score, Sport_score, Sci_score,Surprise_score, isAdmin ) => {
  // Validations
      if (!firstName, !lastName, !age, !email, !password, !areaOfInterest) 
          throw `All fields must be supplied!`;
      firstName =firstName.trim();
      lastName = lastName.trim();
      email = email.trim().toLowerCase();
      areaOfInterest = areaOfInterest.trim();
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const userCollection = await users();
    let newUser = {
              firstName: firstName,
              lastName: lastName,
              age: age,
              email: email,
              hashedPassword: hash,
              areaOfInterest : areaOfInterest,
              Pop_score : Pop_score,
              Geo_score :Geo_score,
              Hist_score : Hist_score,
              Sport_score: Sport_score,
              Sci_score : Sci_score,
              Surprise_score : Surprise_score,  
              isAdmin : isAdmin
    };
    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw internalServerError("Could not add user");

    const existingUser = await getUserByEmail(email);
      return existingUser;
  } catch (err) {
    throw err;
  }
};


//Login Function
const checkUser =  async (email, password ) => {
  email = email.trim().toLowerCase();

  try {
  //  validEmail(email);
  //  validPassword(password);
  } catch (e) {
      throw e;
  }
  
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) throw badRequestError("Either the email or password is invalid");
    const comparePasswords = await bcrypt.compare(password, existingUser.hashedPassword);   
    if (comparePasswords) {
      //return getUserById(users_data._id.toString());
      return existingUser;
    } else 
        throw badRequestError("Either the email or password is invalid");
  } catch (e) {
    throw e;
  }
};

const getUserByEmail = async (email) => {
  // Validations
  email = email.trim().toLowerCase();
  try {
    const userCollection = await users();
    const user = await userCollection.findOne({ email: email });
    if (!user || user === null) return false;
    user._id = user._id.toString();
    return user;
  } catch (e) {
    throw e;
  }
};



const editUser = async(email, firstName, lastName) => {
      email = email.trim().toLowerCase();    
      firstName =firstName.trim();
      lastName = lastName.trim();
      validName(firstName);
      validName(lastName);
      validEmail(email);
      try{
        
        let toUpdateInfo = {
          firstName : firstName,
          lastName : lastName,
        }

        const userCollection = await users()
        const updateUser = await userCollection.updateOne({email: email}, {$set: toUpdateInfo});
        if(!updateUser.matchedCount && !updateUser.modifiedCount) {
          throw "Failed to update user details";}
        return await getUserByEmail(email)

      }catch(e){
        throw e;
      }

      
}

const editScore = async(requestData) => {

  console.log(requestData.category)
  try {  
    let updateInfo = {
    }

    // if (category === 'Geo_score') { updateInfo.category = requestData.ca;}
    // else if (category === 'Pop_score') { updateInfo.Pop_score = requestData.score;}
    // else if (category === 'Hist_score') {updateInfo.Hist_score = requestData.score;}
    // else if (category === 'Sport_score') {updateInfo.Sport_score = requestData.score;}
    // else if (category === 'Sci_score') { updateInfo.Sci_score = requestData.score;}
    // else if (category === 'Surprise_score') {updateInfo.Surprise_score = requestData.score;}
      
    const userCollection = await users();

    // const updateUser = await userCollection.updateOne(
    //   { _id: new ObjectId(requestData.id) },
    //   { $set: { Geo_score: updateInfo.category } }
    // );
    if (requestData.category === 'Geo_score'){
      console.log("geo")
      const updateUser = await userCollection.updateOne(
        { _id: new ObjectId(requestData.id) },
        { $set: { Geo_score : requestData.score } }
      );
    }
    else if (requestData.category === 'Pop_score'){
      console.log("pop")
      const updateUser = await userCollection.updateOne(
        { _id: new ObjectId(requestData.id) },
        { $set: { Pop_score : requestData.score } }
      );

    }

    else if (requestData.category === 'Hist_score'){
      console.log("hist")
      const updateUser = await userCollection.updateOne(
        { _id: new ObjectId(requestData.id) },
        { $set: { Hist_score : requestData.score } }
      );

    }

    else if (requestData.category === 'Sport_score'){
      const updateUser = await userCollection.updateOne(
        { _id: new ObjectId(requestData.id) },
        { $set: { Sport_score : requestData.score } }
      );

    }

    else if (requestData.category === 'Sci_score'){
      const updateUser = await userCollection.updateOne(
        { _id: new ObjectId(requestData.id) },
        { $set: { Sci_score : requestData.score } }
      );

    }

    else if (requestData.category === 'Surprise_score'){
      const updateUser = await userCollection.updateOne(
        { _id: new ObjectId(requestData.id) },
        { $set: { Surprise_score : requestData.score } }
      );

    }

    
    
    // console.log(updateUser)
    if(!updateUser.matchedCount && !updateUser.modifiedCount) {
      throw "Failed to update user details";}
    return await userCollection.findOne( { _id: new ObjectId(requestData.id) });

  } catch(e){
     throw e;
  }

  
}

  const getAllScores = async (email) => {
    try{
      email = email.trim().toLowerCase(); 
    const userCollection = await users()
    const user = await userCollection.findOne({email: email})
    const scores = {popCulture_Score : user.Pop_score, Geography_Score : user.Geo_score, History_Score : user.Hist_score, sports_Score : user.Sport_score, science_Score: user.Sci_score, Surprise_score: user.Surprise_score}
    return scores
    }catch(e){
      throw e
    }
  } 


  const getUserProfile = async (email) => {
    try{
      email = email.trim().toLowerCase(); 
    const userCollection = await users()
    const user = await userCollection.findOne({email: email})
    return user
    }catch(e){
      throw e
    }
  }

module.exports = {

  createUser,
  checkUser,
  getUserByEmail,
  editUser,
  getAllScores,
  getUserProfile,
  editScore
};
