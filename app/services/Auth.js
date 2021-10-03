import User from '../models/User.js';
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
}

export default new Auth();