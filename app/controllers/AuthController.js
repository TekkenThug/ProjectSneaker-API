import Auth from '../services/Auth.js';

class AuthController {
    async registerUser(req, res) {
        try {
            await Auth.register(req.body);
            res.json('User is register!');
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }
}

export default new AuthController();