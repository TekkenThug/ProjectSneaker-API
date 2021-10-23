import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import Token from '../models/Token.js';

dotenv.config();

export const generateTokens = async (id, payload) => {
  const newRefreshToken = uuid();
  await Token.create({
    token: newRefreshToken,
    userID: id,
  });

  return {
    token: jwt.sign(payload, process.env.API_JWT_TOKEN, { expiresIn: '1h' }),
    refreshToken: newRefreshToken,
  };
};

export const checkAccessToken = async (token) => {
  return jwt.verify(token, process.env.API_JWT_TOKEN);
};
