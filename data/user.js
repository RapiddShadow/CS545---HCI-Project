import { users } from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

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
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        return userList;
      }
}

export default dataFunctions