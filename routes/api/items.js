const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const Item = require('../../models/Item');

router.get('/', (req, res) => {
    Item.find()
        .sort({ data: -1 })
        .then(items => res.json(items))
});

router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save()
        .then(item => res.json(item))
});

router.delete('/:id',auth, (req, res) => {
    Item.findById(res.params.id)
        .then(item => item.remove()
                        .then(() => res.json({msuccess: true })))
        .catch(err => res.status(404).json({msuccess: false }));
});


module.exports = router;