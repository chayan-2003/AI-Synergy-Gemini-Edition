import express from 'express';
import { register , login ,logout ,profile,} from '../controllers/userController.js';
import isauthenticated from '../middleware/isAuthenticated.js';
import {geminiController ,summarizeController}  from '../controllers/geminicontroller.js';
import { checkAuthStatus } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import paymentController from '../controllers/paymentController.js';
import { grammarlyController } from '../controllers/geminicontroller.js';
import updatePlan from '../controllers/planController.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/profile',isauthenticated, profile);
userRouter.post('/payment',isauthenticated, paymentController);
userRouter.post('/summarize',isauthenticated, summarizeController);
userRouter.post('/gemini',isauthenticated, geminiController);
userRouter.post('/grammarly',isauthenticated, grammarlyController);

userRouter.get('/auth/check', isAuthenticated, checkAuthStatus);
userRouter.post('/updateplan',isauthenticated,updatePlan);


export default userRouter;