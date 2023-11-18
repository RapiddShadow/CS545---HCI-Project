const express = require('express');
const router = express.Router();
const { quiz } = require('../config/mongoCollections');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const data = require("../helpers/questions.json")

const addQuizQuestions = async () => {
    const quizCollection = await quiz();
    const newQuestions = quizCollection.insertMany(data);
    if (!newQuestions.acknowledged || !newQuestions.insertedId)
        throw "Cannot add question";
    return newQuestions;
}

const getQuizQuestions = async (category) => {
    const quizQs = await quiz();
    const selectedQs = await quizQs.find({category:category}).toArray();
    const finalQs = selectedQs.slice(0, Math.min(10, selectedQs.length));
    return finalQs;
}

module.exports = { addQuizQuestions, getQuizQuestions };