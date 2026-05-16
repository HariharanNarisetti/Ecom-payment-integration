import jwt from 'jsonwebtoken';

export const generateToken = (res, userId) => {
    // Access token for the frontend to use in headers
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET || 'your_super_secret_jwt_key', {
        expiresIn: '15m'
    });

    // Refresh token stored in httpOnly cookie
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET || 'your_super_secret_refresh_key', {
        expiresIn: '7d'
    });

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return accessToken;
};

export const clearToken = (res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
};
