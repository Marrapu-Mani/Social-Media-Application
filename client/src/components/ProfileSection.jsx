import LogoSearch from "./ProfileSection/LogoSearch";
import ProfileCard from "./ProfileSection/ProfileCard";
import FollowersCard from "./ProfileSection/FollowersCard";

function ProfileSection() {
    return (
        <div className="flex flex-col gap-4 items-center overflow-auto">
            <LogoSearch />
            <ProfileCard location="homePage" />
            <FollowersCard />
        </div>
    );
}

export default ProfileSection;