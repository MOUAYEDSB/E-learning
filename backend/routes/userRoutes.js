const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); 

// Routes for user management
router.post('/create', UserController.uploadImage, UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.uploadImage, UserController.updateUser); // Changed PATCH to PUT
router.delete('/:id', UserController.deleteUser);


module.exports = router;
