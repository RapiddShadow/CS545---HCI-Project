import path from 'path'
import user from './user.js'

const constructorMethod = (app) => {

    app.use('/', user);
    app.use("*", (req, res) => {
		res.status(404).json({error: "not found"});
	});
}
export default constructorMethod