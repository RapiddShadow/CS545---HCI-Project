// const { dbConnection, closeConnection } = require("./config/mongoConnection.js");
// const quiz = require('./data/quiz.js');
// const db = await dbConnection();
// await db.dropDatabase();

// const user1 = await users.addUser("Siddharth", "D")
// const user2 = await users.addUser("Siddharth", "P")
// const user3 = await users.addUser("Deepali", "N")
// const user4 = await users.addUser("Parth", "P")

// const userGet = await users.getAllUsers()
// console.log(userGet)
// console.log('Done seeding database');
// await closeConnection();
// Assuming this code is within an async function or an IIFE (Immediately Invoked Function Expression)

// const fetch = async () => {
//     try {
//       await quiz.addQuizQuestions();
//     } catch (e) {
//       console.log(e);
//     } 
//  };

//  const main = async () => {
//     const db = await dbConnection();
//     // await db.dropDatabase();
//     await fetch()
//     console.log("Fetching done!")
//     // await closeConnection()
// }

// main()