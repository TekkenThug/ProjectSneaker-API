import * as dotenv from 'dotenv';
import express from 'express';
import routes from './router.js';

dotenv.config();

const app = express();

app.use(routes);

app.listen(process.env.API_PORT, () => {
    console.log('Hello, server is running!')
});

