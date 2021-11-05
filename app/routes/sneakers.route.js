import express from 'express';
import validate, { isPair } from '../middlewares/validation.js';
import SneakerController from '../controllers/SneakerController.js';

const router = express.Router();

router
  .route(['/', '/:id'])
  .get(SneakerController.getSneakers)
  .post(validate(isPair), SneakerController.postSneakers)
  .put(SneakerController.updateSneakers)
  .delete(SneakerController.deleteSneakers);

export default router;
