import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const geminiController = async (req, res) => {
    const { heading, tone } = req.body;
    const userId = req.user._id;

    try {
        // 1. Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 2. Check & decrement credits
        if (user.credits < 1) {
            return res.status(403).json({ error: 'Not enough credits' });
        }
        user.credits -= 1;
       // user.credits_used += 1;
        await user.save();

        // 3. Generate content
        const genAI = new GoogleGenerativeAI(process.env.VITE_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Include tone in the prompt
        const prompt = `Generate content with the heading "${heading}" in a ${tone} tone.`;

        const result = await model.generateContent(prompt);
        const output = await result.response.text();

        console.log(output);
        res.json({ response: output });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating content' });
    }
};

// Controller to convert text to summary based on user input number of words
const summarizeController = async (req, res) => {
    const { prompt, words } = req.body;
    const userId = req.user._id;

    try {
        // 1. Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 2. Check & decrement credits
        if (user.credits < 1) {
            return res.status(403).json({ error: 'Not enough credits' });
        }
        user.credits -= 1;
      //  user.credits_used += 1;
        await user.save();

        // 3. Generate summary
        const genAI = new GoogleGenerativeAI(process.env.VITE_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const summaryPrompt = `Generate a summary of the following text in ${words} words:\n\n${prompt}\n\nSummary:`;

        const result = await model.generateContent(summaryPrompt);
        const output = await result.response.text();

        console.log(output);
        res.json({ summary: output });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating the summary' });
    }
};

// Controller to fix grammatical errors in the provided text
const grammarlyController = async (req, res) => {
    const { prompt } = req.body;
    const userId = req.user._id;

    try {
        // 1. Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 2. Check & decrement credits
        if (user.credits < 1) {
            return res.status(403).json({ error: 'Not enough credits' });
        }
        user.credits -= 1;
        //user.credits_used += 1;
        await user.save();

        // 3. Fix grammatical errors
        const genAI = new GoogleGenerativeAI(process.env.VITE_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const grammarPrompt = `Fix all grammatical errors in the following text:\n\n${prompt}\n\nCorrected Text:`;

        const result = await model.generateContent(grammarPrompt);
        const output = await result.response.text();

        console.log(output);
        res.json({ correctedText: output });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while correcting the text' });
    }
};

export { geminiController, summarizeController, grammarlyController };