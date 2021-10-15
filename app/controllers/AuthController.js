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
            const jwtKey = await Auth.authenticateUser(req.body);
            res.json({
                token: jwtKey,
            });
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async checkAuth(req, res) {
        try {
            const { token } = req.body;

            if (token) {
                const tokenData = await Auth.checkUser(req.body.token);
                res.status(200).json(tokenData);
            }
            else {
                res.status(403).json('Forbidden');
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new AuthController();