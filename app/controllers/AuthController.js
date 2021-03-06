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
      const jwtKeys = await Auth.authenticateUser(req.body);
      res.json(jwtKeys);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async updateTokens(req, res) {
    try {
      const { refreshToken } = req.body;
      const newTokens = await Auth.updateRefreshToken(refreshToken);

      res.json(newTokens);
    } catch (e) {
      res.status(500).json({ auth: false });
    }
  }

  async checkIn(req, res) {
    try {
      if (req.user) {
        await Auth.checkAuthStatus(req.user.id);
        res.json({ auth: true });
      } else {
        res.json({ auth: false });
      }
    } catch (e) {
      res.status(500).json({
        error: e.message,
        auth: false,
      });
    }
  }

  async logout(req, res) {
    try {
      const { id: userID } = req.user;

      await Auth.logout(userID);

      res.json('Logout is successful');
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new AuthController();
