import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authentication token is missing or invalid." });
        }
        
        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET_KEY;
        if (token) {
            const decoded = jwt.verify(token, secret);
            req.user = { _id: decoded.id, username: decoded.username, isAdmin: decoded.isAdmin }; // Attach the decoded data to req.user
            next();
        } else {
            res.status(401).json({ message: "Authorization failed." });
        }
    } catch (error) {
        console.log("Authentication error:", error);
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

export default authMiddleware;
