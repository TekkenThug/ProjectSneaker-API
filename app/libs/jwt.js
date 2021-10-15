import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = async (payload) => {
  return jwt.sign( payload, process.env.API_JWT_TOKEN, { expiresIn: '1h' });
}

export const checkAccessToken = async (token) => {
  return jwt.verify(token, process.env.API_JWT_TOKEN);
}
