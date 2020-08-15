import express from 'express';
import {helloStory} from '../controllers/hello.js';

const router = express();

router.get('/', helloStory);

export default router;
