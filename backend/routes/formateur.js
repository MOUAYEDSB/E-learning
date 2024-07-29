const express = require('express');
const router = express.Router();
const formateurController = require('../controllers/formateurController');

router.post('/', formateurController.createFormateur); // upload middleware is used inside the controller
router.get('/', formateurController.getAllFormateurs);
router.get('/:id', formateurController.getFormateurById);
router.patch('/:id', formateurController.updateFormateur);
router.delete('/:id', formateurController.deleteFormateur);

module.exports = router;
