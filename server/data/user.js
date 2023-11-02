const express = require('express');
const router = express.Router();
const mongoCollections = require('../config/mongoCollections');
const { validObjectId, validString, validEmail, validName, validPassword} = require("../helpers/validations");
const { badRequestError, internalServerError, notFoundError, unauthorizedError} = require("../helpers/wrappers");
const users = mongoCollections.users;
const bcrypt = require('bcryptjs');
const saltRounds = 10;


//Register Function
const createUser = async (firstName, lastName, age, email, password, areaOfInterest, score, isAdmin ) => {
  // Validations
      if (!firstName, !lastName, !age, !email, !password, !areaOfInterest, !score, !isAdmin) 
          throw `All fields must be supplied!`;

      firstName =firstName.trim();
      lastName = lastName.trim();
      email = email.trim().toLowerCase();
      areaOfInterest = areaOfInterest.trim();
      score = score
      isAdmin = isAdmin

      console.log(firstName, lastName, age, email, password, areaOfInterest, score, isAdmin )
      validName(firstName);
      validName(lastName);
      validEmail(email);
      validPassword(password);

    // const takenEmail = await getUserByEmail(email);
    // if (takenEmail) throw `Email already registered to another account!`;

  // Trim inputs
  

  // Mongo Collection operations and password hashing
  try {
    console.log("I'm at 34")
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash)
    const userCollection = await users();
    let newUser = {
              firstName: firstName,
              lastName: lastName,
              age: age,
              email: email,
              hashedPassword: hash,
              areaOfInterest : areaOfInterest,
              score : score,
              isAdmin : isAdmin
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw internalServerError("Could not add user");
  
    return {insertedUser: true};
  } catch (err) {
    throw err;
  }
};


//Login Function
const checkUser =  async (email, password ) => {

  email = email.trim().toLowerCase();
  try {
   validEmail(email);
   validPassword(password);
  } catch (e) {
      throw e;
  }
  
  console.log("okayyy here")
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) throw badRequestError("Either the email or password is invalid");

    const comparePasswords = await bcrypt.compare(password, existingUser.hashedPassword);
    console.log(existingUser)
    if (comparePasswords) {
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
    //console.log(user)
    return user;
  } catch (e) {
    throw e;
  }
};

module.exports = {

  createUser,
  checkUser,
  getUserByEmail

};
