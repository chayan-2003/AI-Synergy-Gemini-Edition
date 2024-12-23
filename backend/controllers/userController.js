import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const register = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        res.status(400);
        throw new Error('All fields are required: username, email, and password.');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('A user with this email already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        credits: 20,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
            credits: user.credits,
        });
    } else {
        res.status(400);
        throw new Error('Failed to create user. Please try again.');
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Both email and password are required.');
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400);
        throw new Error('Invalid email or password.');
    }

    const token = generateToken(user._id);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
    });
});

const logout = asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully.' });
});

const profile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
        res.status(401);
        throw new Error('User not found.');
    }

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        credits: user.credits,
        credits_used: user.credits_used,
    });
});

const checkAuthStatus = asyncHandler(async (req, res) => {
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        res.json({ message: 'User is authenticated.', userId: decoded.id });
    } catch (err) {
        res.status(401);
        throw new Error('Authentication failed or token expired.');
    }
});

export { register, login, logout, profile, checkAuthStatus };
