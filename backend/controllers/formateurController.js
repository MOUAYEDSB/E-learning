const bcrypt = require('bcryptjs');
const Formateur = require('../models/Formateur');
const upload = require('../middlewares/upload');

// Create new formateur
exports.createFormateur = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            try {
                const {
                    nom,
                    prenom,
                    email,
                    type_dutilisateur,
                    mot_de_passe,
                    confirmation_de_mot_passe,
                    titre,
                    bio,
                    telephone,
                    adresse
                } = req.body;

                if (!mot_de_passe || !confirmation_de_mot_passe) {
                    return res.status(400).json({ message: "Password and confirmation password are required" });
                }

                if (mot_de_passe !== confirmation_de_mot_passe) {
                    return res.status(400).json({ message: "Passwords do not match" });
                }

                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds);

                const formateur = new Formateur({
                    nom,
                    prenom,
                    email,
                    type_dutilisateur,
                    mot_de_passe: hashedPassword,
                    titre,
                    bio,
                    telephone,
                    adresse,
                    image: req.file ? `/uploads/${req.file.filename}` : null
                });

                await formateur.save();

                res.status(201).json({
                    message: "Formateur created successfully",
                    formateur: {
                        id: formateur._id,
                        nom: formateur.nom,
                        prenom: formateur.prenom,
                        email: formateur.email,
                        type_dutilisateur: formateur.type_dutilisateur,
                        titre: formateur.titre,
                        bio: formateur.bio,
                        telephone: formateur.telephone,
                        adresse: formateur.adresse,
                        image: formateur.image
                    }
                });
            } catch (error) {
                console.error("Error creating formateur:", error);
                res.status(500).json({ message: error.message });
            }
        }
    });
};

// Get all formateurs with filters
exports.getAllFormateurs = async (req, res) => {
    try {
        const { nom, email } = req.query; // Retrieve query parameters for filtering

        // Build the filter object based on the query parameters
        const filters = {};
        if (nom) {
            filters.nom = nom;
        }
        if (email) {
            filters.email = email;
        }

        const formateurs = await Formateur.find(filters);
        res.status(200).json(formateurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get formateur by ID
exports.getFormateurById = async (req, res) => {
    try {
        const formateur = await Formateur.findById(req.params.id);
        if (!formateur) {
            return res.status(404).json({ message: "Formateur not found" });
        }
        res.status(200).json(formateur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update formateur
exports.updateFormateur = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            try {
                const { mot_de_passe, confirmation_de_mot_passe } = req.body;

                if (mot_de_passe && mot_de_passe !== confirmation_de_mot_passe) {
                    return res.status(400).json({ message: "Passwords do not match" });
                }

                const updateData = { ...req.body };
                if (mot_de_passe) {
                    const saltRounds = 10;
                    updateData.mot_de_passe = await bcrypt.hash(mot_de_passe, saltRounds);
                }
                if (req.file) {
                    updateData.image = `/uploads/${req.file.filename}`;
                }

                const formateur = await Formateur.findByIdAndUpdate(req.params.id, updateData, { new: true });
                if (!formateur) {
                    return res.status(404).json({ message: "Formateur not found" });
                }

                res.status(200).json({ message: "Formateur updated successfully", formateur });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
    });
};

// Delete formateur
exports.deleteFormateur = async (req, res) => {
    try {
        const formateur = await Formateur.findByIdAndDelete(req.params.id);
        if (!formateur) {
            return res.status(404).json({ message: "Formateur not found" });
        }

        res.status(200).json({ message: "Formateur deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
