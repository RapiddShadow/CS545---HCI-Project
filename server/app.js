const express = require("express");
const app = express();
const configRoutes = require("./routes");
const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());

// app.use(session({
//     name: 'cs545 final project',
//     secret: 'trivia',
//     resave: "false",
//     saveUninitialized: true
// }))

configRoutes(app)


app.listen(4000, () =>{
    console.log("routes running on http://localhost:4000")
})