import User from '../models/user.model.js';
import { generateToken, clearToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            const accessToken = generateToken(res, user._id);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    accessToken
                }
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const accessToken = generateToken(res, user._id);
            
            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    accessToken
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = async (req, res) => {
    try {
        clearToken(res);
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Refresh Token
// @route   POST /api/auth/refresh-token
// @access  Public
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.jwt;

        if (!refreshToken) {
            return res.status(401).json({ success: false, message: 'Not authorized, no refresh token' });
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'your_super_secret_refresh_key');
        
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
        }

        const accessToken = generateToken(res, user._id);
        
        res.json({
            success: true,
            data: { accessToken }
        });

    } catch (error) {
        res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};

// @desc    Mock Google Login for Demo
// @route   POST /api/auth/google-demo
// @access  Public
export const googleDemoLogin = async (req, res) => {
    try {
        const demoEmail = 'google-demo@shopflow.com';
        let user = await User.findOne({ email: demoEmail });

        if (!user) {
            // Create the demo google user if it doesn't exist
            user = await User.create({
                name: 'Google Demo User',
                email: demoEmail,
                password: 'GoogleDemoPassword123!', // They won't use this anyway
                role: 'user'
            });
        }

        const accessToken = generateToken(res, user._id);
        
        res.json({
            success: true,
            message: 'Google login successful',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                accessToken
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
