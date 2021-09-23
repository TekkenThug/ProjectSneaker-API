import express from 'express';
import SneakerController from './app/controllers/SneakerController.js';
const router = express.Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.APP_URL);
    next();
});

router.get(['/sneakers', '/sneakers/:id'], SneakerController.getSneakers);
router.post('/sneakers', SneakerController.postSneakers);
router.put('/sneakers/:id', SneakerController.updateSneakers);
router.delete('/sneakers/:id', SneakerController.deleteSneakers);

export default router;