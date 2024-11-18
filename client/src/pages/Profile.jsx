import ProfileInfo from "../components/ProfileInfo";
import ProfileCard from '../components/ProfileSection/ProfileCard';
import PostsSection from "../components/PostsSection";
import TrendSection from "../components/TrendSection";


function Profile() {
    return (
        <div className="relative grid grid-cols-[18rem_auto_18rem] gap-4">
            <ProfileInfo />
            <div className="flex flex-col gap-4">
                <ProfileCard location="profilePage" />
                <PostsSection />
            </div>
            <TrendSection />
        </div>
    );
}

export default Profile;