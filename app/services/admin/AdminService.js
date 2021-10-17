import Sneaker from "../../models/Sneaker.js";

class AdminService {
  async getNotApprovedSneakers() {
    return Sneaker.find({
      isApproved: false,
    });
  }
}

export default new AdminService();