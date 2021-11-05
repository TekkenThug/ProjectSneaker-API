import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import Token from '../models/Token.js';

dotenv.config();

/**
 * @typedef {object} JWTPair
 * @property {string} token - access token
 * @property {string} refreshToken - refresh token
 */

/**
 * Returns object with jwt tokens pair
 * @param {string} id - user ID
 * @param {object} payload - payload for hashing into token
 * @returns {Promise<JWTPair>} - tokens
 */
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
