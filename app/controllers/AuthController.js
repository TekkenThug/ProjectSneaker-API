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

  async checkAuth(req, res, next) {
    try {
      const { token } = req.body;

      if (token) {
        res.locals.tokenData = await Auth.checkUser(req.body.token);
        next();
      } else {
        res.status(403).json('Forbidden');
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async logout(req, res) {
    try {
      // TODO: fictive method
      await Auth.checkUser();
      res.json('Logout is successful');
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new AuthController();
