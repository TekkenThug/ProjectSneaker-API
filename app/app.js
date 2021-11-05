import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import routes from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));
app.use('/api', routes);

export default app;
