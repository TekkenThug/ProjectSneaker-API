import Sneaker from "../../models/Sneaker.js";
import FileHandler from "../FileHandler.js";
import { formatDate } from "../../../utils.js";

class SneakerService {
    _prepareImageLink(sneakers, pathToFolder) {
        sneakers.forEach(pair => {
            pair['picture'] = `${pathToFolder}/${pair['picture']}`;
        });

        return sneakers;
    }

    async getSneakers(id, pathToFolder, searchParams = {}) {
        if (!id) {
            const sneakers = await Sneaker.find({
                model: new RegExp(searchParams.model, 'gi'),
                isApproved: true,
            }).limit(Number.parseInt(searchParams.limit))

            return this._prepareImageLink(sneakers, pathToFolder);
        }

        const sneakers = await Sneaker.findById(id).where({ isApproved: true });

        return this._prepareImageLink(sneakers, pathToFolder);
    }

    async createSneakers(data, image) {
        const imageName = FileHandler.saveFile(image);

        data.releaseDate = formatDate(data.releaseDate);

        await Sneaker.create({...data, picture: imageName});
    }

    async updateSneakers(id, data) {
        if (!id) {
            throw new Error('ID not found')
        }

        return Sneaker.findByIdAndUpdate(id, data, {new: true})
    }

    async deleteSneakers(id) {
        if (!id) {
            throw new Error('ID not found')
        }

        return Sneaker.findByIdAndDelete(id);
    }
}

export default new SneakerService();