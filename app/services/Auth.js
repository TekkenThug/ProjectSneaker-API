import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Token from '../models/Token.js';
import { generateTokens, checkAccessToken } from '../libs/jwt.js';

const SALT_ROUNDS = 10;

const generatePayload = (user) => {
  return {
    role: user.permissionID,
  };
};

class Auth {
  async register(data) {
    const isExist = await User.findOne({
      email: data.email,
    });

    if (!isExist && data.password === data.repeatPassword) {
      const hash = await bcrypt.hash(data.password, SALT_ROUNDS);
      await User.create({ ...data, passwordHash: hash, permissionID: 1 });
    } else {
      throw new Error('User with this email is registered');
    }
  }

  async authenticateUser(data) {
    const potentialUser = await User.findOne({
      email: data.email,
    });

    if (potentialUser) {
      if (await Token.findOne({ userID: potentialUser._id.toString() })) {
        throw new Error('User already login');
      }

      const match = await bcrypt.compare(data.password, potentialUser.passwordHash);

      if (!match) throw new Error('Incorrect password');

      return await generateTokens(potentialUser._id.toString(), generatePayload(potentialUser));
    }

    throw new Error('User with this email not found');
  }

  async updateRefreshToken(refreshToken) {
    const tokenRecord = await Token.findOne({ token: refreshToken });

    if (!tokenRecord) throw new Error('Token is expired');

    await Token.deleteOne({ token: refreshToken });

    return await generateTokens(tokenRecord.userID, generatePayload(await User.findById(tokenRecord.userID)));
  }

  async checkUser(token) {
    const potentialTokenData = await checkAccessToken(token);

    if (!potentialTokenData.role) throw new Error('Forbidden');

    return {
      role: potentialTokenData.role,
    };
  }
}

export default new Auth();
