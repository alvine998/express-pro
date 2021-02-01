const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// Access   Public
router.get('/', (req, res) => {
    Item.find()
        .sort(({date: -1}))
        .then(items => res.json(items))
});

// @route   POST api/items
// @desc    Create an Items
// Access   Public
router.post('/', (req, res) => {
    const newItem = new Item({
        nama: req.body.nama,
        email: req.body.email,
        nohp: req.body.nohp,
        password: req.body.password
    });

    newItem.save().then(item =>  res.json(item)).catch(err => console.log(err));
});

// @route   DELETE api/items/:id
// @desc    Delete an Items
// Access   Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() =>  res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
