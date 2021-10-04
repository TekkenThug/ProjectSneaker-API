import Auth from '../services/Auth.js';

class AuthController {
    async registerUser(req, res) {
        try {
            await Auth.register(req.body);
            res.json('User registered successfully');
        } catch (e) {
            console.log(e.message);
            res.status(500).json(e.message);
        }
    }
}

export default new AuthController();