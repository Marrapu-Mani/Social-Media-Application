import mongoose from "mongoose";

import Post from "../models/post.js";
import User from "../models/user.js";

// create post
export const createPost = async (req, res) => {
    try {
        const { userId, description } = req.body;

        if (!userId || !description) {
            return res.status(400).json({ message: "Missing required fields: userId and description are required." });
        }

        const newPost = new Post(req.body);

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "An error occurred while creating the post.", error: error.message });
    }
};



// get post
export const getPost = async (req, res, next) => {
    const id = req.params.id;

    try {
        // Retrieve the post by ID
        const post = await Post.findById(id);

        if (post) {
            // Post found, return it with a 200 status code
            res.status(200).json(post);
        } else {
            // Post not found, return a 404 status code
            res.status(404).json({ message: "Post does not exist." });
        }
    } catch (error) {
        // Log the error for internal debugging
        console.error("Error retrieving post:", error);

        // Return a 500 status code with a user-friendly error message
        res.status(500).json({ message: "An error occurred while retrieving the post.", error: error.message });
    }
};


// update post
export const updatePost = async (req, res, next) => {
    const id = req.params.id;
    const { _id: currentUserId, isAdmin } = req.user; // Extract user data from req.user

    try {
        // Find the post by ID
        const post = await Post.findById(id);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Check if the user has permission to update the post
        if (post.userId == currentUserId || isAdmin) {
            // Update the post
            await post.updateOne({ $set: req.body });
            res.status(200).json({ message: "Post updated successfully." });
        } else {
            res.status(403).json({ message: "Action denied. You can only update your own posts." });
        }
    } catch (error) {
        // Log the error for debugging
        console.error("Error updating post:", error);

        // Return a 500 status code with a user-friendly error message
        res.status(500).json({ message: "An error occurred while updating the post.", error: error.message });
    }
};


// delete post
export const deletePost = async (req, res, next) => {
    const id = req.params.id;
    const { _id: currentUserId, isAdmin } = req.user; // Extract user data from req.user

    try {
        // Find the post by ID
        const post = await Post.findById(id);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Check if the user has permission to delete the post
        if (post.userId == currentUserId || isAdmin) {
            // Delete the post
            await post.deleteOne();
            res.status(200).json({ message: "Post deleted successfully." });
        } else {
            res.status(403).json({ message: "Action denied. You can only delete your own posts." });
        }
    } catch (error) {
        // Log the error for debugging
        console.error("Error deleting post:", error);

        // Return a 500 status code with a user-friendly error message
        res.status(500).json({ message: "An error occurred while deleting the post.", error: error.message });
    }
};

// like/dislike post
export const likePost = async (req, res, next) => {
    const id = req.params.id;
    const { _id: currentUserId } = req.user; // Extract user ID from req.user

    try {
        // Find the post by ID
        const post = await Post.findById(id);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Check if the user has already liked the post
        if (!post.likes.includes(currentUserId)) {
            // Like the post
            await post.updateOne({ $push: { likes: currentUserId } });
            res.status(200).json({ message: "Liked the post." });
        } else {
            // Dislike the post
            await post.updateOne({ $pull: { likes: currentUserId } });
            res.status(200).json({ message: "Disliked the post." });
        }
    } catch (error) {
        // Log the error for debugging
        console.error("Error liking/disliking post:", error);

        // Return a 500 status code with a user-friendly error message
        res.status(500).json({ message: "An error occurred while liking/disliking the post.", error: error.message });
    }
};

// comment post
export const commentPost = async (req, res, next) => {
    const postId = req.params.id; // ID of the post to comment on
    const { userId, comment } = req.body; // Extract user ID and comment text from the request body

    try {
        // Find the post by ID
        const post = await Post.findById(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Add the new comment to the post
        await post.updateOne({
            $push: {
                comments: {
                    userId,
                    comment
                }
            }
        });

        // Return success response
        res.status(200).json({ message: "Comment added successfully." });
    } catch (error) {
        // Log the error for debugging
        console.error("Error commenting on post:", error);

        // Return a 500 status code with a user-friendly error message
        res.status(500).json({ message: "An error occurred while adding the comment.", error: error.message });
    }
};


// get timeline posts
export const getTimelinePosts = async (req, res, next) => {
    const currentUserId = req.params.id;

    try {
        // Fetch posts created by the current user
        const currentUserPosts = await Post.find({ userId: currentUserId });

        // Aggregate posts from users that the current user is following
        const followingPosts = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(currentUserId),
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ]);

        // Combine current user posts with posts from users they follow
        const allPosts = [...currentUserPosts, ...followingPosts[0].followingPosts].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt); // Sort posts by creation date, most recent first
        });

        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json({ message: error.message }); // Include a message for clarity
    }
};