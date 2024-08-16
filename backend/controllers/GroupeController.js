const Groupe = require('../models/modeleGroupe');
const Formateur = require('../models/modeleFormateur');
const Enfant = require('../models/modeleEnfant');

// Create a new group
exports.createGroupe = async (req, res) => {
  try {
    const { nom, trancheAge, description, formateur_id, enfants_id } = req.body;

    // Validate formateur_id and enfants_id
    const formateur = await Formateur.findById(formateur_id);
    if (!formateur) {
      return res.status(404).json({ success: false, message: "Formateur not found" });
    }

    const enfants = await Enfant.find({ _id: { $in: enfants_id } });
    if (enfants.length !== enfants_id.length) {
      return res.status(404).json({ success: false, message: "One or more enfants not found" });
    }

    // Create the new group
    const groupe = new Groupe({
      nom,
      trancheAge,
      description,
      formateur_id,
      enfants_id
    });

    await groupe.save();
    res.status(201).json({ success: true, groupe });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Fetch all groups
exports.getGroupes = async (req, res) => {
  try {
    const groupes = await Groupe.find()
      .populate('formateur_id', 'nom prenom')
      .populate('enfants_id', 'nom prenom');
    res.status(200).json({ success: true, groupes });
  } catch (error) {
    console.error("Error fetching groupes:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Fetch a single group by ID
exports.getGroupeById = async (req, res) => {
  try {
    const groupe = await Groupe.findById(req.params.id)
      .populate('formateur_id', 'nom prenom')
      .populate('enfants_id', 'nom prenom');
    if (!groupe) {
      return res.status(404).json({ success: false, message: "Groupe not found" });
    }
    res.status(200).json({ success: true, groupe });
  } catch (error) {
    console.error("Error fetching groupe by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Update a group by ID
exports.updateGroupe = async (req, res) => {
  try {
    const { nom, trancheAge, description, formateur_id, enfants_id } = req.body;

    // Validate formateur_id and enfants_id
    if (formateur_id) {
      const formateur = await Formateur.findById(formateur_id);
      if (!formateur) {
        return res.status(404).json({ success: false, message: "Formateur not found" });
      }
    }

    if (enfants_id && enfants_id.length > 0) {
      const enfants = await Enfant.find({ _id: { $in: enfants_id } });
      if (enfants.length !== enfants_id.length) {
        return res.status(404).json({ success: false, message: "One or more enfants not found" });
      }
    }

    // Update the group
    const groupe = await Groupe.findByIdAndUpdate(req.params.id, {
      nom,
      trancheAge,
      description,
      formateur_id,
      enfants_id
    }, { new: true });

    if (!groupe) {
      return res.status(404).json({ success: false, message: "Groupe not found" });
    }

    res.status(200).json({ success: true, groupe });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Delete a group by ID
exports.deleteGroupe = async (req, res) => {
  try {
    const groupe = await Groupe.findByIdAndDelete(req.params.id);
    if (!groupe) {
      return res.status(404).json({ success: false, message: "Groupe not found" });
    }
    res.status(200).json({ success: true, message: "Groupe deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
