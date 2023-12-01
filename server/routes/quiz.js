const express = require("express");
const { quiz } = require("../config/mongoCollections");
const quizData = require("../data/quiz");
const router = express.Router();
const { validString } = require("../helpers/validations");
const { ObjectId } = require("mongodb");

router.route("/quiz").get(async (req, res) => {
    try{
        let reqData = req.body;
        //validString(reqData.category);
        let popQs = await quizData.getQuizQuestions(reqData.category);
        return res.json(popQs);
    }
    catch (e) {
        return res.status(400).send({error: e});
    }
});

module.exports = router