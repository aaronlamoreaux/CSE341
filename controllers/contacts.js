const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const homeRoute = (req, res) => {
  res.send('Alan Lamoreaux');
};

const anotherPersonRoute = (req, res) => {
  res.send('Amy Lamoreaux');
};

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({
    _id: userId
  });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  res.status(201).json(response);
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db().collection('contacts').replaceOne({_id: userId}, contact);
  res.status(204).json(result);
}

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').deleteOne({_id: userId});
  res.status(200).json(result);
}

module.exports = {
  homeRoute,
  anotherPersonRoute,
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
