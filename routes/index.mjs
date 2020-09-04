import express from 'express';
import {helloStory} from '../controllers/hello.mjs';

const router = express();

router.get('/', helloStory);

export default router;
