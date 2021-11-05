import express from 'express';
import AdminController from '../controllers/AdminController.js';

const router = express.Router();

router.get('/sneakers', AdminController.getSneakers);
router.post('/sneakers/resolve', AdminController.resolveSneakersApplication);

export default router;
