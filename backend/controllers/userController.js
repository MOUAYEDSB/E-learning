const User = require("../models/modeleUser");
const Enfant = require("../models/modeleEnfant");
const Formateur = require("../models/modeleFormateur");
const Parent = require("../models/modeleParent");
const upload = require("../middlewares/uploadMiddleware");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sendPasswordEmail } = require("../utils/sendPasswordEmail"); // Import the email sending function

// Middleware to handle image uploads
exports.uploadImage = upload.single("profileImgURL");

// Function to generate a random password
const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8); // Simple password generation for example purposes
};

exports.createUser = async (req, res) => {
  try {
    const { role, children, ...rest } = req.body;
    let user;
    let plainMotdepasse;
    let hashedMotdepasse;
    let childDetails = []; // To store child emails and passwords

    // Handle password generation and hashing
    if (["Formateur", "Parent", "Enfant"].includes(role)) {
      if (!req.body.motdepasse) {
        plainMotdepasse = generateRandomPassword();
        hashedMotdepasse = await bcrypt.hash(plainMotdepasse, 10);
        rest.motdepasse = hashedMotdepasse;
      } else {
        plainMotdepasse = req.body.motdepasse;
        hashedMotdepasse = await bcrypt.hash(plainMotdepasse, 10);
        rest.motdepasse = hashedMotdepasse;
      }
    } else if (role === "admin") {
      if (!req.body.motdepasse) {
        return res.status(400).json({
          success: false,
          message: "Password is required for admin creation.",
        });
      }
      plainMotdepasse = req.body.motdepasse;
      hashedMotdepasse = await bcrypt.hash(plainMotdepasse, 10);
      rest.motdepasse = hashedMotdepasse;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    let childIds = [];
    if (children && Array.isArray(children) && children.length > 0) {
      childIds = await Promise.all(
        children.map(async (child) => {
          if (!child.email) return null;

          let enfant = await Enfant.findOne({ email: child.email });
          if (!enfant) {
            const childPlainMotdepasse = generateRandomPassword();
            const childHashedMotdepasse = await bcrypt.hash(
              childPlainMotdepasse,
              10
            );
            enfant = new Enfant({
              ...child,
              motdepasse: childHashedMotdepasse,
            });
            await enfant.save();
            childDetails.push({
              email: child.email,
              motdepasse: childPlainMotdepasse,
            });
          } else {
            childDetails.push({ email: enfant.email, motdepasse: "Existing" });
          }
          return enfant._id;
        })
      );
      childIds = childIds.filter((id) => id);
    }

    switch (role) {
      case "Parent":
        user = new Parent({
          ...rest,
          motdepasse: hashedMotdepasse,
          enfants_id: childIds,
        });
        break;
      case "Formateur":
        user = new Formateur({ ...rest, motdepasse: hashedMotdepasse });
        break;
      case "Enfant":
        user = new Enfant({ ...rest, motdepasse: hashedMotdepasse });
        break;
      case "admin":
        user = new User({
          ...rest,
          motdepasse: hashedMotdepasse,
          role: "admin",
        });
        break;
    }

    if (req.file) {
      user.profileImgURL = req.file.path.replace(/\\/g, "/");
    }

    const savedUser = await user.save();
    console.log("User created successfully:", savedUser);

    // Send password email only if password was generated and role is not "admin"
    if (plainMotdepasse && role !== "admin") {
      await sendPasswordEmail(user.email, plainMotdepasse, role, childDetails);
    }

    res.status(201).json({ success: true, user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
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

    console.log("Logged in successfully");

    // Create a token including the user's role, profileImgURL, and nom
    const token = createToken(user._id, user.role, user.profileImgURL, user.nom);

    // Respond with the token, role, profile image URL, and user's name
    res.status(200).json({
      success: true,
      token,
      role: user.role,
      profileImgURL: user.profileImgURL,
      nom: user.nom, // Include the user's name
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Updated createToken function
const createToken = (id, role, profileImgURL, nom) => {
  return jwt.sign(
    { id, role, profileImgURL, nom },  // Include profileImgURL and nom in the token payload
    process.env.JWT_SECRET, 
    { expiresIn: "1h" }
  );
};
