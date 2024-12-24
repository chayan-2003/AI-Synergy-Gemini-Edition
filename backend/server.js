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
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://your-frontend-domain.com' : 'http://localhost:5175',
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
app.use((err, req, res, next) => {
    if (err.name === 'CORSError') {
        res.status(403).json({
            message: 'CORS error: ' + err.message
        });
    } else {
        next(err);
    }
});

connectDB();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json()); // Parse incoming JSON data
app.use(cookieParser()); // Parse incoming cookies
app.use('/api/users', userRouter);


const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});