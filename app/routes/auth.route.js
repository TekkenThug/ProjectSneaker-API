import express from 'express';
import jwtMiddleware from 'express-jwt';
import * as dotenv from 'dotenv';
import validate, { isNewUser } from '../middlewares/validation.js';
import AuthController from '../controllers/AuthController.js';

dotenv.config();

const router = express.Router();

const optionsForJWTMiddleware = {
  secret: process.env.API_JWT_TOKEN,
  algorithms: ['HS256'],
};

router.post('/register', validate(isNewUser), AuthController.registerUser);
router.post('/login', AuthController.authentication);
router.post('/check', jwtMiddleware(optionsForJWTMiddleware), AuthController.checkIn);
router.post('/refresh', AuthController.updateTokens);
router.post('/logout', jwtMiddleware(optionsForJWTMiddleware), AuthController.logout);

export default router;
