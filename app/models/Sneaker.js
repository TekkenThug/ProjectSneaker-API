import mongoose from 'mongoose';

const Sneaker = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    colorway: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    vendorCode: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    }
})

export default mongoose.model('Sneaker', Sneaker)