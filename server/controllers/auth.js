import bcrypt from 'bcrypt';      // bcrypt is a popular library used for hashing passwords and other sensitive data
import jwt from 'jsonwebtoken';

import User from "../models/user.js";   

// register user
export const registerUser = async (req, res, next) => {
    const { username, password } = req.body;

    // Check if required fields are present
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        // Check if the username is already registered
        const oldUser = await User.findOne({ username });
        if (oldUser) {
            return res.status(400).json({ message: "Username is already registered!" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new User({
            ...req.body,
            password: hashedPassword
        });

        // Save the new user to the database
        const user = await newUser.save();

        // Generate a JWT token for the user
        const token = jwt.sign(
            { id: user._id, username: user.username, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Send the response with the user and token
        res.status(201).json({ user, token });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error registering user:', error);  // Log the actual error for debugging
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

// login user
export const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User doesn't exist." });
        }

        // Check if the password is correct
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Wrong password." });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Send the response with the user and token
        return res.status(200).json({ user, token });

    } catch (error) {
        console.error('Error during login:', error); // Log the error for debugging purposes
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};
