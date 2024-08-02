const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/modeleUser');

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Generate a token and include the user's role and ID
        const token = createToken(user._id, user.role);

        res.status(200).json({ success: true, token: token, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '3h' });
}



module.exports = { loginUser };