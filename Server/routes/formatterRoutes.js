import express from 'express';

import { formatterController } from '../controllers/formatterController.js';

const router = express.Router();
router.post('/formatter',formatterController);

export default router ;