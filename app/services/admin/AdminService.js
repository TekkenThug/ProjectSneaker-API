import Sneaker from "../../models/Sneaker.js";
import { prepareImageLink } from "../../../utils.js";

class AdminService {
  async getNotApprovedSneakers() {
    return prepareImageLink(await Sneaker.find({
      isApproved: false,
    }));
  }
}

export default new AdminService();