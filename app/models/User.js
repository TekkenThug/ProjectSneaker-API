import mongoose from 'mongoose';

const Sneaker = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  permissionID: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('User', Sneaker);
