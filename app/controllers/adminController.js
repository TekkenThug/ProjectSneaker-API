import adminService from "../services/admin/adminService.js";

const getSneakers = async (req, res) => {
  try {
    res.send(200).json(await adminService.getNotApprovedSneakers());
  } catch (e) {
    res.send(500).json(e.message)
  }
}
export default {
  getSneakers
}