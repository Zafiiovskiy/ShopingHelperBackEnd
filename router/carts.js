const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

router.get('/:isDone', async(req, res) => {
    try {
        const carts = await Cart.find({ isDone: req.params.isDone });
        res.json(carts)
        res.statusCode(200);
    } catch (err) {
        res.json({ message: err });
        res.statusCode(500);
    }
});

router.get('/:Id', async(req, res) => {
    try {
        const cart = await Cart.findById(req.params.Id);
        res.json(cart);
        res.statusCode(200);
    } catch (err) {
        res.json({ message: err });
        res.statusCode(500);
    }
});

router.delete('/:Id', async(req, res) => {
    try {
        const cart = await Cart.remove({ _id: req.params.Id });
        res.json(cart);
        res.statusCode(200);
    } catch (err) {
        res.json({ message: err });
        res.statusCode(500);
    }
});

router.post('/', async(req, res) => {
    const cart = new Cart({
        name: req.body.name,
        toBuys: req.body.toBuys,
        isDone: req.body.isDone
    });

    try {
        const savedCart = await cart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.patch('/:Id', async(req, res) => {
    const values = await req.body;
    try {
        const result = await Cart.updateOne({ _id: req.params.Id }, { $set: values });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.patch('/:Id/:CartId', async(req, res) => {
    const values = await req.body;
    try {
        const result = await Cart.updateOne({ _id: req.params.Id, "toBuys._id": req.params.CartId }, {
            $set: {
                "toBuys.$.name": values.name,
                "toBuys.$.amount": values.amount,
                "toBuys.$.isDone": values.isDone
            }
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});
module.exports = router;