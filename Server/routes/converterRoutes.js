import express from 'express';
import { convertController } from '../controllers/converterController.js';

const router = express.Router();

router.post('/converter',convertController);

export default router ;