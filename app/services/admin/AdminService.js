import Sneaker from '../../models/Sneaker.js';
import { prepareImageLink, serializeObjectId } from '../../utils.js';

class AdminService {
  /**
   * Get not approved application of sneakers
   * @returns {Promise<Array>} Not approved sneakers
   */
  async getNotApprovedSneakers() {
    const pairWithoutId = prepareImageLink(await Sneaker.find({
      isApproved: false,
    }));

    return serializeObjectId(pairWithoutId);
  }

  /**
   * Resolving application of sneakers
   * @param {string|number} id - pair ID
   * @param {string|boolean} resolve - administrator resolving
   * @returns {Promise<void>}
   */
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
