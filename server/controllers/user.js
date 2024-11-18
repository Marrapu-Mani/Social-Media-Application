import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

// get all users
export const getAllUsers = async (req, res, next) => {
    try {
        // Fetch all users and exclude the password field
        const users = await User.find().select('-password');

        // Send the response with the user data
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error); // Log the error for debugging
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}

// get user
export const getUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        // Fetch user by ID and exclude the password field
        const user = await User.findById(id).select('-password');
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User doesn't exist" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "An error occurred while fetching the user." });
    }
}


// update user
export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { _id: currentUserId, password } = req.body;

    // Ensure `isAdmin` is not taken from the request body to avoid manipulation
    const isUserAdmin = req.user?.isAdmin;

    if (id === currentUserId || isUserAdmin) {
        try {
            if (password && password.trim()) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                req.body.password = hashedPassword;
            }

            const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password');

            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            // Re-generate JWT only if needed
            const tokenPayload = {
                username: user.username,
                id: user._id,
            };

            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            
            res.status(200).json({ user, token, message: "User profile updated successfully." });
        } catch (error) {
            console.error("Update error:", error);
            res.status(500).json({ message: "An error occurred while updating the profile." });
        }
    } else {
        res.status(403).json({ message: "Access Denied! You can only update your own profile." });
    }
};

//delete user
export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    
    // Assuming `req.user` contains the authenticated user's data
    const { _id: currentUserId, isAdmin } = req.user;   // currentUserId is a new variable name that will hold the value of req.user._id

    if (id === currentUserId || isAdmin) {
        try {
            const user = await User.findByIdAndDelete(id);

            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            res.status(200).json({ message: "User deleted successfully." });
        } catch (error) {
            console.error("Delete error:", error);
            res.status(500).json({ message: "An error occurred while deleting the user." });
        }
    } else {
        res.status(403).json({ message: "Access Denied! You can only delete your own profile." });
    }
};


// follow user
export const followUser = async (req, res, next) => {
    const id = req.params.id; // ID of the user to be followed
    const { _id: currentUserId } = req.body; // ID of the user who wants to follow another user

    if (id === currentUserId) {
        return res.status(403).json({ message: "Action forbidden: You cannot follow yourself." });
    }

    try {
        // Fetch both users
        const userToFollow = await User.findById(id);
        const currentUser = await User.findById(currentUserId);

        // Check if both users exist
        if (!userToFollow) {
            return res.status(404).json({ message: "User to follow not found." });
        }
        if (!currentUser) {
            return res.status(404).json({ message: "Current user not found." });
        }

        // Check if the current user is already following the user
        if (!userToFollow.followers.includes(currentUserId)) {
            // Update the followers and following arrays
            await Promise.all([
                userToFollow.updateOne({ $push: { followers: currentUserId } }),
                currentUser.updateOne({ $push: { following: id } })
            ]);

            return res.status(200).json({ message: "User followed successfully!" });
        } else {
            return res.status(403).json({ message: "You are already following this user." });
        }
    } catch (error) {
        console.error("Error following user:", error);
        return res.status(500).json({ message: "An error occurred while following the user." });
    }
};

// unfollow user
export const unfollowUser = async (req, res, next) => {
    const id = req.params.id; // ID of the user to be unfollowed
    const { _id: currentUserId } = req.body; // ID of the user who wants to unfollow

    if (id === currentUserId) {
        return res.status(403).json({ message: "Action forbidden: You cannot unfollow yourself." });
    }

    try {
        // Fetch both users
        const userToUnfollow = await User.findById(id);
        const currentUser = await User.findById(currentUserId);

        // Check if both users exist
        if (!userToUnfollow) {
            return res.status(404).json({ message: "User to unfollow not found." });
        }
        if (!currentUser) {
            return res.status(404).json({ message: "Current user not found." });
        }

        // Check if the current user is following the user
        if (userToUnfollow.followers.includes(currentUserId)) {
            // Update the followers and following arrays
            await Promise.all([
                userToUnfollow.updateOne({ $pull: { followers: currentUserId } }),
                currentUser.updateOne({ $pull: { following: id } })
            ]);

            return res.status(200).json({ message: "User unfollowed successfully!" });
        } else {
            return res.status(403).json({ message: "You are not following this user." });
        }
    } catch (error) {
        console.error("Error unfollowing user:", error);
        return res.status(500).json({ message: "An error occurred while unfollowing the user." });
    }
};
