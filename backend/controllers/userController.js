import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';


// Handling registration
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

   
};
const register = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    // Validation logic
    if (!username || !password || !email) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
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
        throw new Error('Invalid user data');
    }
});


//login functionality 
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validation logic
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(400);
        throw new Error('Invalid credentials');
    }
    //generate token

    const token=generateToken(user._id);
    //set the cookie 
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: token,
       
    });
});
//logout functionality 
const logout = asyncHandler(async (req, res) => { 
    res.clearCookie('token');
    
    res.json({
        message: 'Logged out successfully',
    });
});
//user profile 

const profile = asyncHandler(async (req, res) => {
    // Access the authenticated user's information
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        credits: user.credits,
        credits_used: user.credits_used,
    });
});

//chedk user auth status
const checkAuthStatus = asyncHandler(async (req, res) => {
    const decoded=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
    if(decoded)
    {
        res.json({message:'User is authenticated'});
    }
    else
    {
        res.status(401);
        throw new Error('User is not authenticated');
    }
});

//exporting the functions

export  { register, login ,logout ,profile ,checkAuthStatus};