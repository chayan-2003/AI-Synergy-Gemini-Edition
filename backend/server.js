import express from 'express';
import path from 'path';
import userRouter from './routes/userRouter.js';
import connectDB from './utils/connectdb.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

 dotenv.config();
const app = express();

// CORS Configuration
const allowedOrigins = [
    'https://inspire-text-frontend.vercel.app',
    'https://inspire-text-frontend-edop7h3yl-chayan-2003s-projects.vercel.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin not allowed by CORS: ${origin}`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization'
    ],
    exposedHeaders: ['Authorization'],
    maxAge: 86400 // 24 hours
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// Error handler for CORS
app.use((err, req, res, next) => {
    if (err.message.includes('Origin not allowed by CORS')) {
        res.status(403).json({ message: err.message });
    } else {
        next(err);
    }
});

// Connect to Database
connectDB();

// Serve Static Files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Handle Preflight Requests for All Routes
app.options('*', cors(corsOptions));

// Routes
app.use('/api/users', userRouter);

// Start Server
const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
