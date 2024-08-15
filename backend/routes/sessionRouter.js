const router = require('express').Router();
const { getAllSessions, getSessionById,createSession,updateSession,deleteSession } = require('../controllers/sessionController');


router.get('/',getAllSessions);
router.get('/:id',getSessionById);
router.post('/create',createSession);
router.put('/:id',updateSession);
router.delete('/:id',deleteSession);

module.exports = router ;