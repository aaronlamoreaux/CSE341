const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('quotes').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');

            res.status(200).json(lists);
        });
    } catch {
        res.status(500).json(res.error || 'Some error occurred while trying to reach the database.');
    };
};

const getSingle = async (req, res) => {
    try {
        const quoteId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('quotes').find({
            _id: quoteId
        });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch {
        res.status(500).json(res.error || 'Some error occurred while trying to reach the database.');
    };
};

const createQuote = async (req, res) => {
    const quote = {
        quote: req.body.quote,
        source: req.body.source,
        category: req.body.category,
    };
    const result = await mongodb.getDb().db().collection('quotes').insertOne(quote);
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'Some error occurred while creating the contact.');
    }
};

const updateQuote = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const quote = {
        quote: req.body.quote,
        source: req.body.source,
        category: req.body.category,

    };
    const result = await mongodb
        .getDb()
        .db()
        .collection('quotes')
        .replaceOne({
                _id: id
            },
            quote
        );
    if (result.modifiedCount > 0) {
        res.status(204).json(result);
    } else {
        res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }
};

const deleteQuote = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('quotes').deleteOne({
        _id: id
    });
    if (result.deletedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createQuote,
    updateQuote,
    deleteQuote
};