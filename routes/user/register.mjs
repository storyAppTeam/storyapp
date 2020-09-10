import express from "express";
const router = express.Router();

import registerController from "../../controllers/user/register.mjs"

router.post('/', registerController.register)

export default router;