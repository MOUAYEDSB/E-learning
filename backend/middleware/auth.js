const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: tokenDecode.id, role: tokenDecode.role }; // Store decoded info in req.user
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: "Token verification failed, login again" });
    }
}

export default authMiddleware;