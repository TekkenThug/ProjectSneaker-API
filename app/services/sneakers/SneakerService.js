import Sneaker from '../../models/Sneaker.js';
import { saveFile } from '../../libs/file.js';
import { formatDate, prepareImageLink } from '../../utils.js';

/**
 * @typedef {object} SneakerSearchParams
 * @property {string} model - model name
 * @property {number} limit - limit for searching output
 */

class SneakerService {
  /**
   * Get sneakers
   * @param {string|number|undefined} id - pair id for getting
   * @param {SneakerSearchParams| {}} searchParams - params for search query
   * @returns {Promise<Array|object>} - pair of sneakers
   */
  async getSneakers(id, searchParams = {}) {
    if (!id) {
      const { model, limit } = searchParams;

      const sneakers = await Sneaker.find({
        model: model ? new RegExp(model, 'gi') : { $exists: true },
        isApproved: true,
      }).limit(limit ? Number.parseInt(limit, 10) : 3);

      return prepareImageLink(sneakers);
    }

    const sneakers = await Sneaker.findById(id).where({ isApproved: true });

    return prepareImageLink(sneakers);
  }

  /**
   * Create pair of sneakers
   * @param {object} data - sneakers data
   * @returns {Promise<void>}
   */
  async createSneakers(data) {
    await Sneaker.create({
      ...data,
      releaseDate: formatDate(data.releaseDate),
      picture: saveFile(data.picture),
    });
  }

  async updateSneakers(id, data) {
    if (!id) {
      throw new Error('ID not found');
    }

    return Sneaker.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteSneakers(id) {
    if (!id) {
      throw new Error('ID not found');
    }

    return Sneaker.findByIdAndDelete(id);
  }
}

export default new SneakerService();
