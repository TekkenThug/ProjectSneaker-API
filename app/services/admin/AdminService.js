import Sneaker from '../../models/Sneaker.js';
import { prepareImageLink, serializeObjectId } from '../../../utils.js';

class AdminService {
  async getNotApprovedSneakers() {
    const pairWithoutId = prepareImageLink(await Sneaker.find({
      isApproved: false,
    }));

    return serializeObjectId(pairWithoutId);
  }

  async resolveSneakersApplication(id, resolve) {
    if (resolve) {
      await Sneaker.findByIdAndUpdate(id, {
        isApproved: true,
      });
    } else {
      await Sneaker.findByIdAndDelete(id);
    }
  }
}

export default new AdminService();
