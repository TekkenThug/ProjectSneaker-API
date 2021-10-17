import AdminService from "../services/admin/AdminService.js";

class AdminController {
  async getSneakers(req, res) {
    try {
      res.json(await AdminService.getNotApprovedSneakers());
    } catch (e) {
      res.send(500).json(e.message);
    }
  }
}

export default new AdminController();