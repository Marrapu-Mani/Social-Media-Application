import ProfileSection from "../components/ProfileSection";
import PostsSection from "../components/PostsSection";
import TrendSection from "../components/TrendSection";

function Home() {
    return (
        <div className="relative grid grid-cols-[18rem_auto_18rem] gap-4">
            <ProfileSection />
            <PostsSection />
            <TrendSection />
        </div>
    );
}

export default Home;