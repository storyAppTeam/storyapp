import express from "express";
const router = express.Router();

import loginController from "../../controllers/user/login.mjs"

router.post('/', loginController.login)

export default router;