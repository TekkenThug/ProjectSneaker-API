import Sneaker from "../../models/Sneaker.js";

class SneakerService {
    async getSneakers(id) {
       return Sneaker.findById(id);
    }

    async createSneakers(data) {
        await Sneaker.create(data);
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