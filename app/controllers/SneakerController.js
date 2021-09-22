import Sneaker from "../models/Sneaker.js";

class SneakerController {
    async postSneakers(req, res) {
        const pair = await Sneaker.create(req.body);

        res.json(pair)
    }
}

export default new SneakerController();