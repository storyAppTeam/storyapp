import express from 'express';
import {helloStory} from '../controllers/hello.mjs';

import userRouter from './user/index.mjs';

const router = express.Router();

router.get('/', helloStory);

// console.log(userRouter);
router.use('/user', userRouter);

export default router;
