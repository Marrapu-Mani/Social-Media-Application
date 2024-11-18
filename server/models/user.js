import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        firstname: {    
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true, // Ensures that usernames are unique to prevent duplicate usernames.
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        profilePic: String,
        coverImage: String,
        about: String,
        worksAt: String,
        livesIn: String,
        country: String,
        relationShip: String,
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users' // Assumes that followers are references to other users
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users' // Assumes that following are references to other users
        }],
    },
    {
        timestamps: true    // Adds createdAt and updatedAt fields to the schema, which is useful for tracking when documents are created or modified.
    } 
);

userSchema.index({ username: 1 }); // Adds an index to the username field to optimize search queries.

const User = mongoose.model("Users", userSchema);   // Converts the schema into a Mongoose model named "Users", which we can use to interact with the users collection in MongoDB.

export default User;
