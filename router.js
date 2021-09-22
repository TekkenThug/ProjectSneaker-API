import express from 'express';
import SneakerController from './app/controllers/SneakerController.js';
const router = express.Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.APP_URL);
    next();
});

router.get('/sneakers', SneakerController.getSneakers);
router.post('/sneakers', SneakerController.postSneakers);

export default router;