import mongoose from 'mongoose';

const Token = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Token', Token);
