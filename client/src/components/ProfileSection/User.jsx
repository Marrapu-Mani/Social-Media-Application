import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { followUser, unFollowUser } from "../../redux/actions/user";

function User({person}) {
    const dispatch = useDispatch();
    const imagesFolder = process.env.REACT_APP_IMAGES_FOLDER;
    const { user } = useSelector(state => state.authReducer.authData);
    const [isFollowing, setIsFollowing] = useState(person.followers.includes(user._id));
    const followButtonClass = isFollowing 
        ? "bg-transparent text-[#8E57FD] border"
        : "bg-buttonBg text-[white]"; 

    function handleFollow(){
        isFollowing 
        ? dispatch(unFollowUser(person._id, user))
        : dispatch(followUser(person._id, user));

        setIsFollowing(prev => !prev);
    }
    return (
        <li>
            <div className="flex items-center gap-2 my-4">
                <img 
                    src={person.profilePic ? `${imagesFolder}${person.profilePic}` : `${imagesFolder}defaultProfilePic.jpeg`} 
                    className="rounded-full size-[3.6rem]"    
                />
                <div className="flex flex-col justify-center">
                    <span className='font-bold'>{person.firstname} {person.lastname}</span>
                    <span className="text-gray text-[14px]">@{person.username}</span>
                </div>
                <motion.button 
                    className={`${followButtonClass} py-1 px-4 rounded-[6px] ml-auto w-24`}
                    onClick={handleFollow}
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1 }}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </motion.button>
            </div>
        </li>
    );
}

export default User;