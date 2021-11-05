import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Token from '../models/Token.js';
import { generateTokens } from '../libs/jwt.js';

const SALT_ROUNDS = 10;

const generatePayload = (user) => {
  return {
    id: user._id.toString(),
    role: user.permissionID,
  };
};

/**
 * @typedef {object} LogInData
 * @property {string} email - user email
 * @property {string} password - user password
 */

class Auth {
  /**
   * Register new user
   * @param {object} data - potential new user data
   * @returns {Promise<void>}
   */
  async register(data) {
    const isExist = await User.findOne({
      email: data.email,
    });

    if (isExist) throw new Error('User with this email is registered');

    if (data.password !== data.repeatPassword) throw new Error('Password mismatch');

    const hash = await bcrypt.hash(data.password, SALT_ROUNDS);
    await User.create({ ...data, passwordHash: hash, permissionID: 1 });
  }

  /**
   * Authenticate user
   * @param {LogInData} data - user login data
   * @returns {JWTPair} - token pairs
   */
  async authenticateUser(data) {
    const potentialUser = await User.findOne({
      email: data.email,
    });

    if (!potentialUser) throw new Error('User with this email not found');

    if (await Token.findOne({ userID: potentialUser._id.toString() })) {
      throw new Error('User already login');
    }

    const match = await bcrypt.compare(data.password, potentialUser.passwordHash);

    if (!match) throw new Error('Incorrect password');

    return await generateTokens(potentialUser._id.toString(), generatePayload(potentialUser));
  }

  /**
   * Update refresh token
   * @param {string} refreshToken - user refresh token
   * @returns {JWTPair} - token pair
   */
  async updateRefreshToken(refreshToken) {
    const tokenRecord = await Token.findOne({ token: refreshToken });

    if (!tokenRecord) throw new Error('Token is expired');

    await Token.deleteOne({ token: refreshToken });

    return await generateTokens(tokenRecord.userID, generatePayload(await User.findById(tokenRecord.userID)));
  }

  /**
   * Check authenticate user state
   * @param {string|number} id - user id
   * @returns {Promise<void>}
   */
  async checkAuthStatus(id) {
    const tokenRecord = await Token.findOne({ userID: id });

    if (!tokenRecord) throw new Error('Invalid user');
  }

  /**
   * Logout user
   * @param {string|number} id - user id
   * @returns {Promise<void>}
   */
  async logout(id) {
    const tokenRecord = await Token.findOne({ userID: id });

    if (!tokenRecord) throw new Error('User is not exist');

    await tokenRecord.deleteOne();
  }
}

export default new Auth();
