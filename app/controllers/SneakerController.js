import SneakerService from "../services/sneakers/SneakerService.js";

class SneakerController {
    async getSneakers(req, res) {
        try {
            res.json(await SneakerService.getSneakers())
        } catch (e) {
            res.json(e)
        }
    }

    async postSneakers(req, res) {
        try {
            await SneakerService.createSneakers(req.body);
            res.status(200).json('good');
        } catch (e) {
            res.json(e);
        }
    }
}

export default new SneakerController();