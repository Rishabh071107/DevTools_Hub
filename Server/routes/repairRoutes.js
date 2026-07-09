import express from 'express';
import { repairController } from '../controllers/repairController.js';

const router = express.Router();

router.post('/repair', repairController);

export default router;
