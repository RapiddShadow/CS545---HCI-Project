const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');

let dataFunctions = {
    async addUser(first, last){
        let newUser = {
            firstName: first,
            lastName: last,
            age: age,
            email: email,
            areaOfInterest : areaOfInterest,
            score : score,
            isAdmin : isAdmin
          };
        const userCollection = await users()
        const newInsertInformation = await userCollection.insertOne(newUser);
    if (!newInsertInformation.insertedId) throw 'Insert failed!';
    },

    async getAllUsers() {

        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        return userList;
      }
}

module.exports =  dataFunctions