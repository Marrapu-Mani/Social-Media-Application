import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProfileCard({location}) {
    const params = useParams();         // instantiation of useParams
    const { user } = useSelector(state => state.authReducer.authData);
    let posts = useSelector(state => state.postReducer.posts);
    const imagesFolder = process.env.REACT_APP_IMAGES_FOLDER;

    if(!posts) return "No posts";
    if(params.id) posts = posts.filter(post => post.userId === params.id);

    const coverImageSize = (location === 'profilePage') ? 'w-full h-40' : 'w-96 h-28'; 
    const profilePicSize = (location === 'profilePage') ? 'size-28' : 'size-20';

    return (
       <div className='relative flex flex-col rounded-[1.5rem] gap-4 pb-4 overflow-clip bg-cardColor'>
        <div className='relative flex flex-col items-center justify-center'>
            <img 
                src={user.coverImage ? `${imagesFolder}${user.coverImage}` : `${imagesFolder}defaultCoverImage.jpg`} 
                className={coverImageSize}     
            />
            <img 
                src={user.profilePic ? `${imagesFolder}${user.profilePic}` : `${imagesFolder}defaultProfilePic.jpeg`} 
                className={`${profilePicSize} rounded-[50%] absolute -bottom-10 shadow-profileShadow`} 
            />
        </div>

        <div className='flex flex-col items-center mt-8 gap-2'>
            <span className='text-lg font-bold'>{user.firstname} {user.lastname}</span>
            <span className='text-[14px]'>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
        </div>

        <div className='flex flex-col items-center gap-2'>
            <hr className='w-[85%] border border-solid border-hrColor' />

            <div className='flex gap-4 w-[80%] justify-evenly'>
                {location == "profilePage" && <>
                    <div className='flex flex-col items-center'>
                        <span className='font-bold'>{posts.length}</span>
                        <span className='text-gray text-[13px]'>Posts</span>
                    </div>
                    <div className='h-[100%] border-l-2 border-solid border-hrColor'></div>
                </>}
                <div className='flex flex-col items-center'>
                    <span className='font-bold'>{user.followers.length}</span>
                    <span className='text-gray text-[13px]'>Followers</span>
                </div>
                <div className='h-[100%] border-l-2 border-solid border-hrColor'></div>
                <div className='flex flex-col items-center'>
                    <span className='font-bold'>{user.following.length}</span>
                    <span className='text-gray text-[13px]'>Following</span>
                </div>
            </div>
            
            <hr className='w-[85%] border border-solid border-hrColor' />
        </div>

        {location !== "profilePage" && 
            <span className='font-bold text-[#8E57FD] self-center'>
                <Link to={`/profile/${user._id}`}>
                    My Profile
                </Link>
            </span>
        }
       </div>
    );
}

export default ProfileCard;