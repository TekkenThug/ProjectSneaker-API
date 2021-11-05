import mongoose from 'mongoose';
import terminal from 'consola';
import app from './app.js';

mongoose.connect(process.env.API_MONGO_CONNECT)
  .then(() => {
    terminal.success('MongoDB connected');
    app.listen(process.env.API_PORT || 3000, () => {
      terminal.success('Server is started');
    });
  });
