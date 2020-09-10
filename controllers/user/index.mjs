const Router = require("express");
const router = Router();

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

router.use('/register', require('./register.mjs'));

export default router;