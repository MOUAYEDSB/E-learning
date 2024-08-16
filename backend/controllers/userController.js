const User = require("../models/modeleUser");
const Enfant = require("../models/modeleEnfant");
const Formateur = require("../models/modeleFormateur");
const Parent = require("../models/modeleParent");
const upload = require("../middlewares/uploadMiddleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendPasswordEmail } = require("../utils/sendPasswordEmail"); // Import the email sending function

// Middleware to handle image uploads
exports.uploadImage = upload.single("profileImgURL");

// Create a new user (Parent, Formateur, Enfant)
exports.createUser = async (req, res) => {
  try {
    const { role, motdepasse, ...rest } = req.body;
    let user;

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    // Create the user based on the role
    switch (role) {
      case "Parent":
        user = new Parent({ ...rest, motdepasse: hashedPassword });
        break;
      case "Formateur":
        user = new Formateur({ ...rest, motdepasse: hashedPassword });
        break;
      case "Enfant":
        user = new Enfant({ ...rest, motdepasse: hashedPassword });
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid role" });
    }

    // Assign the file path to profileImgURL if a file was uploaded
    if (req.file) {
      user.profileImgURL = req.file.path.replace(/\\/g, "/"); // Ensure the path uses forward slashes
    }

    // Save the new user to the database
    await user.save();

    // Send password to the user's email after saving the user
    await sendPasswordEmail(user.email, motdepasse);

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

// Get all users or filter users by role, name, and prenom
exports.getUsers = async (req, res) => {
  try {
    // Get query parameters
    const { role, nom, prenom } = req.query;

    // Build the query object
    let query = {};

    if (role) {
      query.role = role;
    }

    if (nom) {
      query.nom = new RegExp(nom, 'i'); // Case-insensitive match
    }

    if (prenom) {
      query.prenom = new RegExp(prenom, "i"); // Case-insensitive match
    }

    // Fetch users based on the query object
    const users = await User.find(query);
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user:user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { role } = req.body;

    // If a new image is uploaded, update the profileImgURL
    if (req.file) {
      req.body.profileImgURL = req.file.path.replace(/\\/g, "/");
    }

    // Update the user in the base User model
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update the specific model based on role
    switch (role) {
      case "Parent":
        await Parent.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        break;
      case "Formateur":
        await Formateur.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        break;
      case "Enfant":
        await Enfant.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid role" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error updating user by ID:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, motdepasse } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate a token and include the user's role and ID
    const token = createToken(user._id, user.role);

    res.status(200).json({ success: true, token, role: user.role });
    console.log("Logged in");
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
