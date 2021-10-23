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
    const pairIsApproved = (await Sneaker.findById(id, 'isApproved')).isApproved;

    if (pairIsApproved) throw new Error('Pair already confirmed');

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
