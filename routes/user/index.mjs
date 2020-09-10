import express from 'express';
const router = express.Router();

import registerRouter from './register.mjs';
import loginRouter from './login.mjs';
import logoutRouter from './logout.mjs';

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);

export default router;