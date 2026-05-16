import express from 'express';
import { registerUser, loginUser, logoutUser, refreshToken, googleDemoLogin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshToken);
router.post('/google-demo', googleDemoLogin);

export default router;
