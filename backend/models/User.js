import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    }, 
    password: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        required: false,
    },
    billingdates: {
        type: Array,
        required: false
    },
    plan: {
        type: String,
        enum: ['basic', 'pro', 'premium'],
        default: 'basic',
        required: true,
    },
    credits_used:
    {
        type: Number,
        required: false
    }
});

const User = mongoose.model('User', UserSchema);

export default User;