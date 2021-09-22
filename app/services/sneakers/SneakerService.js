import Sneaker from "../../models/Sneaker.js";

class SneakerService {
    async getSneakers() {
       return Sneaker.find();
    }

    async createSneakers(data) {
        await Sneaker.create(data);
    }
}

export default new SneakerService();