const express = require('express');
const router = express.Router();
const {uploadImage,createUser,loginUser,getUserById,updateUser,deleteUser, getUsers}= require('../controllers/userController'); 

// Routes for user management
router.post('/create', uploadImage, createUser);
router.post('/login',  loginUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', uploadImage, updateUser); // Changed PATCH to PUT
router.delete('/:id',deleteUser);


module.exports = router;
