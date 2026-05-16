import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Protect routes - Verify token
export const protect = async (req, res, next) => {
    let token;

    // First check for access token in Auth header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key');
            req.user = await User.findById(decoded.userId).select('-password');
            return next();
        } catch (error) {
            // Access token failed, maybe expired. We can handle refresh token logic here or let client call /refresh
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }
    
    // If no access token, check for refresh token in cookies as fallback
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'your_super_secret_refresh_key');
            req.user = await User.findById(decoded.userId).select('-password');
            return next();
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

// Admin middleware
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Not authorized as an admin' });
    }
};
