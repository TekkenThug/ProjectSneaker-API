import * as dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import routes from './router.js';

dotenv.config();

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.static('public'));
app.use(fileUpload({}));
app.use('/api', routes);

const startApp = async () => {
    await mongoose.connect(process.env.API_MONGO_CONNECT);

    app.listen(process.env.API_PORT, () => {
        console.log('Hello, server is running!')
    });
}

startApp();



