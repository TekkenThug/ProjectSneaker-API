import Sneaker from '../../models/Sneaker.js';
import { saveFile } from '../../libs/file.js';
import { formatDate, prepareImageLink } from '../../utils.js';

class SneakerService {
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
