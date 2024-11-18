import InfoCard from "./ProfileInfo/InfoCard";
import FollowersCard from "./ProfileSection/FollowersCard";
import LogoSearch from "./ProfileSection/LogoSearch";

function ProfileInfo() {
    return (
        <div className="flex flex-col gap-4 items-center overflow-auto">
            <LogoSearch />
            <InfoCard />
            <FollowersCard />
        </div>
    )
}

export default ProfileInfo;