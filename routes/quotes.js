const express = require('express');
const router = express.Router();
const {
    quoteValidation
} = require('../validator');

const quoteController = require('../controllers/quotes');

router.get('/', quoteController.getAll);

router.get('/:id', quoteController.getSingle);

router.post('/', quoteValidation, quoteController.createQuote);

router.put('/:id', quoteValidation, quoteController.updateQuote)

router.delete('/:id', quoteController.deleteQuote);

module.exports = router;