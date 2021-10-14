import express from 'express';
import validate, { isNewUser, isPair } from './app/middlewares/validation.js';

/** Controllers */
import AuthController from './app/controllers/AuthController.js';
import SneakerController from './app/controllers/SneakerController.js';

const router = express.Router();

/** Auth Routes */
router.post('/auth/register', validate(isNewUser), AuthController.registerUser);
router.post('/auth/login', AuthController.authentication);

/** Sneakers Routes */
router.get(['/sneakers', '/sneakers/:id'], SneakerController.getSneakers);
router.post('/sneakers', validate(isPair), SneakerController.postSneakers);
router.put('/sneakers/:id', SneakerController.updateSneakers);
router.delete('/sneakers/:id', SneakerController.deleteSneakers);

export default router;