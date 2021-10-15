import User from '../models/User.js';
import { generateAccessToken, checkAccessToken } from '../libs/jwt.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

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
         const match = await bcrypt.compare(data.password, potentialUser.passwordHash);

         if (!match) throw new Error('Incorrect password');

         return await generateAccessToken({
           role: potentialUser.permissionID,
         });
       } else {
         throw new Error('User with this email not found');
       }
     }

     async checkUser(token) {
        const potentialTokenData = await checkAccessToken(token);

        if (!potentialTokenData.role) throw new Error('Forbidden');

        return {
          role: potentialTokenData.role
        };
     }
}

export default new Auth();