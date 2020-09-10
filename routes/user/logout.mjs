import express from "express";
const router = express.Router();

import logoutController from "../../controllers/user/logout.mjs"

router.post('/', logoutController.logout)

export default router;