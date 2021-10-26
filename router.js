import express from 'express';
import * as dotenv from 'dotenv';
import jwtMiddleware from 'express-jwt';
import validate, { isNewUser, isPair } from './app/middlewares/validation.js';

/** Controllers */
import AuthController from './app/controllers/AuthController.js';
import SneakerController from './app/controllers/SneakerController.js';
import AdminController from './app/controllers/AdminController.js';

dotenv.config();
const router = express.Router();

const optionsForJWTMiddleware = {
  secret: process.env.API_JWT_TOKEN,
  algorithms: ['HS256'],
};

/** Auth Routes */
router.post('/auth/register', validate(isNewUser), AuthController.registerUser);
router.post('/auth/login', AuthController.authentication);
router.post('/auth/check', jwtMiddleware(optionsForJWTMiddleware), AuthController.checkIn);
router.post('/auth/refresh', AuthController.updateTokens);
router.post('/auth/logout', jwtMiddleware(optionsForJWTMiddleware), AuthController.logout);

/** Sneakers Routes */
router.get(['/sneakers', '/sneakers/:id'], SneakerController.getSneakers);
router.post('/sneakers', validate(isPair), SneakerController.postSneakers);
router.put('/sneakers/:id', SneakerController.updateSneakers);
router.delete('/sneakers/:id', SneakerController.deleteSneakers);

/** Admin Routes */
router.get('/admin/sneakers', AdminController.getSneakers);
router.post('/admin/sneakers/resolve', AdminController.resolveSneakersApplication);

export default router;
