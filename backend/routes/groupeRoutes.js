const express = require('express');
const router = express.Router();
const GroupeController = require('../controllers/GroupeController');


router.post('/', GroupeController.createGroupe);
router.get('/', GroupeController.getGroupes);
router.get('/:id', GroupeController.getGroupeById);
router.put('/:id', GroupeController.updateGroupe);
router.delete('/:id', GroupeController.deleteGroupe);

module.exports = router;
