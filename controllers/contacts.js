const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const homeRoute = (req, res) => {
  res.send('Alan Lamoreaux');
};

const anotherPersonRoute = (req, res) => {
  res.send('Amy Lamoreaux');
};

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find().catch();
  result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
    .catch();
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({
      _id: userId
    })
    .catch();
  result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    })
    .catch();
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact).catch();
  res.status(201).json(response).catch();
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
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({
        _id: userId
      },
      contact
    )
    .catch();
  res.status(204).json(result).catch();
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').deleteOne({
    _id: userId
  }).catch();
  res.status(200).json(result).catch();
};

module.exports = {
  homeRoute,
  anotherPersonRoute,
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};