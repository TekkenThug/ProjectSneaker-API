import AdminService from "../services/admin/AdminService.js";

class AdminController {
  async getSneakers(req, res) {
    try {
      res.json(await AdminService.getNotApprovedSneakers());
    } catch (e) {
      res.send(500).json(e.message);
    }
  }

  async resolveSneakersApplication(req, res) {
    try {
      const { id, resolve } = req.body;

      await AdminService.resolveSneakersApplication(id, resolve);

      res.json('Application resolved successfully');
    } catch (e) {
      res.send(500).json(e.message)
    }
  }
}

export default new AdminController();