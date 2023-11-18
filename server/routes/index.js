const user = require('./user');
const quiz = require('./quiz');

const constructorMethod = (app) => {
    app.use('/', user);
    app.use('/', quiz);
    app.use("*", (req, res) => {
		res.status(404).json({error: "not found"});
	});
}

module.exports = constructorMethod;