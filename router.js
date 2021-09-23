import express from 'express';
import SneakerController from './app/controllers/SneakerController.js';

const router = express.Router();

/** Sneakers Routes */
router.get(['/sneakers', '/sneakers/:id'], SneakerController.getSneakers);
router.post('/sneakers', SneakerController.postSneakers);
router.put('/sneakers/:id', SneakerController.updateSneakers);
router.delete('/sneakers/:id', SneakerController.deleteSneakers);

export default router;