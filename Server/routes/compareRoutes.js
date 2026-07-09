    import express from 'express';
    import { compareController } from '../controllers/compareController.js';

    const router = express.Router();
    router.post('/compare', compareController);

    export default router ;