import {Router} from 'express';
const router = Router();
import {userDataFunctions} from "../data/index.js"

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await userDataFunctions.getAllUsers()
      res.json(users)
    } catch (e) {
      // Something went wrong with the server!
      res.status(500).send(e);
    }
  })


export default router