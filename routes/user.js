const express = require('express');
const router = express.Router();
const {
    signupValidation,
    loginValidation
} = require('../validator');

const userController = require('../controllers/user-data');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/register', signupValidation, userController.createUser);

router.put('/:id', signupValidation, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;