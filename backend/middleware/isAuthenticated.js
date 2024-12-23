// filepath: /c:/Users/User/Desktop/ai_content_generator/middleware/isAuthenticated.js
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const isAuthenticated = asyncHandler(async (req, res, next) => {
    if (req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
             next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export default isAuthenticated;