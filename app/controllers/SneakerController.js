import SneakerService from "../services/sneakers/SneakerService.js";

class SneakerController {
    async getSneakers(req, res) {
        try {
            res.json(await SneakerService.getSneakers(req.params.id))
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

    async updateSneakers(req, res) {
        try {
            return res.json(await SneakerService.updateSneakers(req.params.id, req.body));
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async deleteSneakers(req, res) {
        try {
            return res.json(await SneakerService.deleteSneakers(req.params.id))
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new SneakerController();