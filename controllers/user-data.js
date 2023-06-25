const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const {
  userSchema
} = require('../validator');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('user-data').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
  } catch {
    res.status(500).json(res.error);
  }
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
    res.status(500).json(res.error);
  }
};

const createUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      bookDescription: req.body.bookDescription,
      favoriteQuote: req.body.favoriteQuote
    };
    const response = await userSchema.validateAsync(user);
    const result = await mongodb.getDb().db().collection('user-data').insertOne(response);
    if (result.acknowledged) {
      res.status(201).json(result);

    }
  } catch (err) {
    if (err.isJOI === true) {
      res.status(422).json(err);
    } else {
      res.status(500).json(err);
    }
  }
};

const updateUser = async (req, res) => {
  try {
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
    const response = await userSchema.validateAsync(user);
    const result = await mongodb
      .getDb()
      .db()
      .collection('user-data')
      .replaceOne({
          _id: userId
        },
        response
      );
    if (result.modifiedCount > 0) {
      res.status(204).json(result);
    }
  } catch (err) {
    if (err.isJOI === true) {
      res.status(422).json(err);
    } else {
      res.status(500).json(err);
    }
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
    res.status(500).json(result.error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};