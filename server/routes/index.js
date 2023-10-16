const user = require('./user');

const constructorMethod = (app) => {
  console.log("yoooo")

    app.use('/', user);
    app.use("*", (req, res) => {
		res.status(404).json({error: "not found"});
	});
}
module.exports = constructorMethod;