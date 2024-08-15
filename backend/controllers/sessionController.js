const Session = require("../models/modeleSession");
const Group = require("../models/modeleGroupe");

// Create a new session
exports.createSession = async (req, res) => {
  try {
    const { date, duration, time, group_id } = req.body;

    // Create the session
    const session = new Session({ date, duration, time, group_id });
    const savedSession = await session.save();

    // Add session to the group's sessions array
    await Group.findByIdAndUpdate(group_id, {
      $push: { sessions: savedSession._id },
    });

    res.status(201).json({ success: true, session: savedSession });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update an existing session
exports.updateSession = async (req, res) => {
  try {
    
    const { date, duration, time } = req.body;

    const updatedSession = await Session.findByIdAndUpdate(req.params.id,{date, duration, time}, { new: true });
    if (!updatedSession) {
      return res
        .status(404)
        .json({ success: false, error: "Session not found" });
    }

    res.status(200).json({ success: true, session: updatedSession });
  } catch (err) {
    console.error("Error updating session:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a session
exports.deleteSession = async (req, res) => {
  try {

    const deletedSession = await Session.findByIdAndDelete(req.params.id);

    if (!deletedSession) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Remove the session from the group's sessions array
    await Group.findByIdAndUpdate(deletedSession.group_id, {
      $pull: { sessions: deletedSession._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Session deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// get all sessions
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json({ success: true, sessions: sessions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// get session by Id
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res
        .status(404)
        .json({ success: true, error: "Session not found" });
    }
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
