import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Controller to update the user's plan
const updatePlan = asyncHandler(async (req, res) => {
    const { plan } = req.body;

    // Access the authenticated user's information
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Update the user's plan
    user.plan = plan;
    await user.save();

    res.json({
        message: 'Plan updated successfully',
        plan: user.plan,
    });
});
export default updatePlan;