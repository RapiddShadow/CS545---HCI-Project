import express from 'express';
const app = express()
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const staticmiddleware = express.static(path.join(__dirname, 'public'));
import configRoutes from "./routes/index.js"


app.use("/public", staticmiddleware);
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
    console.log("routes runnning on http://localhost:3000")
})