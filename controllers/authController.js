// controllers/authController.js
// Import necessary modules/models
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
    try {
        // Extract data from request body
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create new user
        user = new User({ name, email, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();

        // Generate JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ success: true, token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res, next) => {
    try {
        // Extract data from request body
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ success: true, token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.getUserByJWT = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.forgetPasswordReq = async (req, res, next) => {
    try {
        res.json({ success: true, message: 'Password reset request sent successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};