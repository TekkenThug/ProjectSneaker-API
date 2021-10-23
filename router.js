import express from 'express';
import validate, { isNewUser, isPair } from './app/middlewares/validation.js';

/** Controllers */
import AuthController from './app/controllers/AuthController.js';
import SneakerController from './app/controllers/SneakerController.js';
import AdminController from './app/controllers/AdminController.js';

const router = express.Router();

/** Auth Routes */
router.post('/auth/register', validate(isNewUser), AuthController.registerUser);
router.post('/auth/login', AuthController.authentication);
router.post('/auth/refresh', AuthController.updateTokens);
router.post('/auth/logout', AuthController.logout);
router.post('/auth/check-in', AuthController.checkAuth, (req, res) => {
  res.status(200).json(res.locals.tokenData);
});

/** Sneakers Routes */
router.get(['/sneakers', '/sneakers/:id'], SneakerController.getSneakers);
router.post('/sneakers', validate(isPair), SneakerController.postSneakers);
router.put('/sneakers/:id', SneakerController.updateSneakers);
router.delete('/sneakers/:id', SneakerController.deleteSneakers);

/** Admin Routes */
router.get('/admin/sneakers', AdminController.getSneakers);
router.post('/admin/sneakers/resolve', AdminController.resolveSneakersApplication);

export default router;
