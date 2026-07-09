import express from 'express';
import { validatorController } from '../controllers/validatorController.js';

const router = express.Router();

router.post('/validator',validatorController);

export default router ;