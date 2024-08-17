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
    const { role, motdepasse, children, ...rest } = req.body; // Changed `enfants_id` to `children`
    let user;

    let hashedPassword;

    // Generate password if the role is Formateur or Parent
    if (role === "Formateur" || role === "Parent") {
      hashedPassword = await bcrypt.hash(motdepasse, 10);
    }

    let childIds = [];
    if (children && Array.isArray(children) && children.length > 0) {
      childIds = await Promise.all(
        children.map(async (child) => {
          if (!child.email) return null; // Skip if no email

          // Check if Enfant already exists; if not, create it
          let enfant = await Enfant.findOne({ email: child.email });
          if (!enfant) {
            // Set password only for Enfant
            const childHashedPassword = await bcrypt.hash(child.motdepasse, 10);
            enfant = new Enfant({ ...child, motdepasse: childHashedPassword });
            await enfant.save();
          }
          return enfant._id;
        })
      );
      childIds = childIds.filter((id) => id); // Remove null values
    }

    switch (role) {
      case "Parent":
        user = new Parent({
          ...rest,
          motdepasse: hashedPassword,
          enfants_id: childIds,
        });
        break;
      case "Formateur":
        user = new Formateur({ ...rest, motdepasse: hashedPassword });
        break;
      case "Enfant":
        // Set password for Enfant directly from the request
        const enfantPassword = await bcrypt.hash(motdepasse, 10);
        user = new Enfant({ ...rest, motdepasse: enfantPassword });
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid role" });
    }

    if (req.file) {
      user.profileImgURL = req.file.path.replace(/\\/g, "/");
    }

    const savedUser = await user.save();
    console.log("User created successfully:", savedUser);

    // Send password email only for Formateur and Parent
    if (role === "Formateur" || role === "Parent") {
      await sendPasswordEmail(user.email, motdepasse);
    }

    res.status(201).json({ success: true, user: savedUser });
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

// Additional functions for getting, updating, and deleting users
exports.getUsers = async (req, res) => {
  try {
    const { role, nom, prenom } = req.query;
    let query = {};

    if (role) {
      query.role = role;
    }

    if (nom) {
      query.nom = new RegExp(nom, "i");
    }

    if (prenom) {
      query.prenom = new RegExp(prenom, "i");
    }

    const users = await User.find(query);
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("enfants_id");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { role } = req.body;

    if (req.file) {
      req.body.profileImgURL = req.file.path.replace(/\\/g, "/");
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

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
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

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
    res.status(500).json({
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
