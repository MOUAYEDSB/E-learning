const User = require('../models/modeleUser');
const Enfant = require('../models/modeleEnfant');
const Formateur = require('../models/modeleFormateur');
const Parent = require('../models/modeleParent');
const upload = require('../middlewares/uploadMiddleware');

// Middleware to handle image uploads
exports.uploadImage = upload.single('profileImgURL');

// Create a new user (Parent, Formateur, Enfant)
exports.createUser = async (req, res) => {
  try {
    const { role, ...rest } = req.body;
    let user;

    // Create the user based on the role
    switch (role) {
      case 'Parent':
        user = new Parent(rest);
        break;
      case 'Formateur':
        user = new Formateur(rest);
        break;
      case 'Enfant':
        user = new Enfant(rest);
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    // Assign the file path to profileImgURL if a file was uploaded
    if (req.file) {
      user.profileImgURL = req.file.path.replace(/\\/g, '/'); // Ensure the path uses forward slashes
    }

    // Save the new user to the database
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get all users 
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { role } = req.body;

    // If a new image is uploaded, update the profileImgURL
    if (req.file) {
      req.body.profileImgURL = req.file.path.replace(/\\/g, '/');
    }

    // Update the user in the base User model
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update the specific model based on role
    switch (role) {
      case 'Parent':
        await Parent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        break;
      case 'Formateur':
        await Formateur.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        break;
      case 'Enfant':
        await Enfant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        break;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
