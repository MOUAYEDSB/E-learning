const Groupe = require('../models/modeleGroupe');
const Formateur = require('../models/modeleFormateur');
const Enfant = require('../models/modeleEnfant');

// Create a new group
exports.createGroupe = async (req, res) => {
  try {
    const { nom, trancheAge, description, formateur_id, enfants_id } = req.body;

    // Log the request body for debugging
    console.log('Request Body:', req.body);

    // Validate input
    if (!nom || !trancheAge || !formateur_id || !enfants_id || !Array.isArray(enfants_id)) {
      return res.status(400).json({ error: 'nom, trancheAge, formateur_id, and enfants_id are required' });
    }

    // Create and save the new group
    const groupe = new Groupe({ nom, trancheAge, description, formateur_id, enfants_id });
    await groupe.save();

    // Respond with the created group
    res.status(201).json(groupe);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get all groups
exports.getGroupes = async (req, res) => {
  try {
    const groupes = await Groupe.find().populate('formateur_id').populate('enfants_id');
    res.status(200).json(groupes);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get a single group by ID
exports.getGroupeById = async (req, res) => {
  try {
    const groupe = await Groupe.findById(req.params.id).populate('formateur_id').populate('enfants_id');
    if (!groupe) return res.status(404).send('Group not found');
    res.status(200).json(groupe);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update a group by ID
exports.updateGroupe = async (req, res) => {
  try {
    const { nom, trancheAge, description, formateur_id, enfants_id } = req.body;

    // Log the request body for debugging
    console.log('Request Body:', req.body);

    if (!nom || !trancheAge || !formateur_id || !enfants_id || !Array.isArray(enfants_id)) {
      return res.status(400).json({ error: 'nom, trancheAge, formateur_id, and enfants_id are required' });
    }

    const updatedGroupe = await Groupe.findByIdAndUpdate(req.params.id, {
      nom,
      trancheAge,
      description,
      formateur_id,
      enfants_id
    }, { new: true, runValidators: true })
    .populate('formateur_id')
    .populate('enfants_id');

    if (!updatedGroupe) return res.status(404).send('Group not found');
    res.status(200).json(updatedGroupe);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Delete a group by ID
exports.deleteGroupe = async (req, res) => {
  try {
    const groupe = await Groupe.findByIdAndDelete(req.params.id);
    if (!groupe) return res.status(404).send('Group not found');
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
