const express = require('express');
const app = express();

const routes = require('./router');

app.listen(process.env.API_PORT, () => {
    console.log('Hello, server is running!')
});

app.use(routes);

