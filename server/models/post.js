import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        description: {
            type: String,
            maxLength: 500,
        },
        image: String,
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }],
        comments: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            },
            text: {
                type: String,
                required: true,
            }
        }],
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model("Posts", postSchema);

export default Post;
