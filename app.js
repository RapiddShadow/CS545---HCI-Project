const express = require("express");
const app = express();
const configRoutes = require("./routes");

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use(session({
//     name: 'cs545 final project',
//     secret: 'trivia',
//     resave: "false",
//     saveUninitialized: true
// }))

configRoutes(app)


app.listen(3000, () =>{
    console.log("routes running on http://localhost:3000")
})