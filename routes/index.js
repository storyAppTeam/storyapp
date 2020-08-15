import Router from "express";
const router = Router();

import { helloStory } from '../controllers/hello.js';

router.get('/', helloStory);

export default router;