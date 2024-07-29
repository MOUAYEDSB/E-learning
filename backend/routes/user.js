// routes/user.js
const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/userController');
const getUserMiddleware = require('../middlewares/getUser');

// User routes
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserMiddleware, getUser);
router.patch('/:id', getUserMiddleware, updateUser);
router.delete('/:id', getUserMiddleware, deleteUser);

// Authentication route
router.post('/login', loginUser);

module.exports = router;
