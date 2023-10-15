const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');

let dataFunctions = {
    async addUser(first, last){
        let newUser = {
            firstName: first,
            lastName: last
          };
        const userCollection = await users()
        const newInsertInformation = await userCollection.insertOne(newUser);
    if (!newInsertInformation.insertedId) throw 'Insert failed!';
    },

    async getAllUsers() {

        console.log(users)
        console.log("heewwwwwww")
        const userCollection = await users();
        console.log(userCollection);
        const userList = await userCollection.find({}).toArray();
        console.log(userList)
        return userList;
      }
}

module.exports =  dataFunctions