import Sneaker from "../../models/Sneaker.js";
import FileHandler from "../FileHandler.js";

class SneakerService {
    async getSneakers(id, pathToFolder) {
        if (!id) {
            const sneakers = await Sneaker.find();

            sneakers.forEach(pair => {
               pair['picture'] = `${pathToFolder}/${pair['picture']}`;
            });

            return sneakers;
        }

        const sneakers = await Sneaker.findById(id);
        sneakers['picture'] = `${pathToFolder}/${sneakers['picture']}`;

        return sneakers;
    }

    async createSneakers(data, image) {
        const imageName = FileHandler.saveFile(image);

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