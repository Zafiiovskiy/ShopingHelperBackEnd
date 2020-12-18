const mongoose = require('mongoose');

const ToBuy = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    amount: {
        required: true,
        type: String,
        default: 1
    },
    isDone: {
        type: Boolean,
        default: false
    }
})

const CartModel = mongoose.Schema({
    name: {
        required: true,
        type: String,
        default: `Cart (${Date.now.toString()})`
    },
    toBuys: [ToBuy],
    isDone: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Carts', CartModel);