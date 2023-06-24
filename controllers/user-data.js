const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('user-data').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
  } catch {
    res.status(500).json(res.error || 'Some error occurred while trying to reach the database.');
  };
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('user-data').find({
      _id: userId
    });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch {
    res.status(500).json(res.error || 'Some error occurred while trying to reach the database.');
  }
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    bookDescription: req.body.bookDescription,
    favoriteQuote: req.body.favoriteQuote
  };
  const result = await mongodb.getDb().db().collection('user-data').insertOne(user);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the contact.');
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    bookDescription: req.body.bookDescription,
    favoriteQuote: req.body.favoriteQuote
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('user-data')
    .replaceOne({
        _id: userId
      },
      user
    );
  if (result.modifiedCount > 0) {
    res.status(204).json(result);
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the contact.');
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('user-data').deleteOne({
    _id: userId
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
  createUser,
  updateUser,
  deleteUser
};