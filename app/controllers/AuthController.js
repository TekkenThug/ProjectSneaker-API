import Auth from '../services/Auth.js';

class AuthController {
    async registerUser(req, res) {
        try {
            await Auth.register(req.body);
            res.json('User registered successfully');
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async authentication(req, res) {
        try {
            await Auth.authenticateUser(req.body);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new AuthController();