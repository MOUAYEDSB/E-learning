const Groupe = require('../models/modeleGroupe');

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

    const groupe = new Groupe({ nom, trancheAge, description, formateur_id, enfants_id });
    await groupe.save();
    res.status(201).json(groupe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all groups
exports.getGroupes = async (req, res) => {
  try {
    const groupes = await Groupe.find().populate('formateur_id').populate('enfants_id');
    res.status(200).json(groupes);
  } catch (error) {
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
    res.status(500).json({ error: error.message });
  }
};

// Update a group by ID
exports.updateGroupe = async (req, res) => {
  try {
    const { nom, trancheAge, description, formateur_id, enfants_id } = req.body;

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
    res.status(500).json({ error: error.message });
  }
};
