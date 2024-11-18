import PostShare from "./PostsSection/PostShare";
import Posts from "./PostsSection/Posts";

function PostsSection() {
    return (
        <div className="flex flex-col gap-4 h-screen overflow-auto">
            <PostShare />
            <Posts />
        </div>
    );
}

export default PostsSection;