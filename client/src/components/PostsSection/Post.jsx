import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { commentPost, likePost } from '../../redux/api/post';
import Comment from './Comment.jsx';

function Post({ data }) {
    const descRef = useRef();
    const { user } = useSelector(state => state.authReducer.authData);
    const [isLiked, setIsLiked] = useState(data.likes.includes(user._id)); 
    const [likes, setLikes] = useState(data.likes.length);
    const [comments, setComments] = useState(data.comments);
    const [isCommentOpen, setCommentOpen] = useState(false);
    const imagesFolder = process.env.REACT_APP_IMAGES_FOLDER;

    const handleLike = async () => {
        setIsLiked(prev => !prev);
        await likePost(data._id, user._id);
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
    }

    const handleComment = async () => {
        const commentText = descRef.current.value;
        if (commentText.trim() === "") return;

        const newComment = await commentPost(data._id, user._id, commentText);
        setComments([...comments, newComment]);
        descRef.current.value = '';
        setCommentOpen(false);
    }

    return (
        <div className='flex flex-col gap-2 p-4 bg-cardColor rounded-xl'>
            {data.image && (
                <img 
                    src={`${imagesFolder}${data.image}`}  
                    className='rounded-xl w-full max-h-[20rem] object-cover'
                />
            )}

            <div className='flex gap-4'>
                <span
                    className='cursor-pointer' 
                    onClick={handleLike}    
                >
                    {isLiked 
                        ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                          </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                          </svg>
                    }
                </span>

                <span
                    className='cursor-pointer' 
                    onClick={() => setCommentOpen(prev => !prev)}   
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                </span>

                <span
                    className='cursor-pointer'    
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </span>
            </div>

            <span className='text-gray text-[14px]'>{likes ? `${likes} likes` : 'No likes'}</span>
            
            <span> {data.description}</span>

            {isCommentOpen && (
                <>
                    <div className='flex gap-2'>
                        <img 
                            src={user.profilePic ? `${imagesFolder}${user.profilePic}` : `${imagesFolder}defaultProfilePic.jpeg`} 
                            className='rounded-[50%] size-10'
                            alt="User Profile"
                        />
                        <input 
                            type='text' 
                            placeholder="Share your thoughts" 
                            className="bg-inputColor h-10 p-[8px] rounded-[6px] text-[14px] border-none outline-none w-[90%]" 
                            ref={descRef}   
                        />
                        <button 
                            className={`bg-buttonBg text-[white] h-9 w-16 my-auto ml-auto rounded-[6px] hover:bg-none hover:text-[#8E57FD] hover:border`} 
                            onClick={handleComment}    
                        >
                            Post
                        </button>
                    </div>
                    <div>
                        {comments.map(comment => (
                            <Comment key={comment._id} userId={comment.userId} desc={comment.desc} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Post;
