import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons';
import { uploadImage, uploadPost } from '../../redux/actions/upload.js';

function PostShare({inModal, handleClose}) {
    const dispatch = useDispatch();
    const imageRef = useRef();
    const descRef = useRef();
    const [image, setImage] = useState(null);
    const { user } = useSelector(state => state.authReducer.authData);
    const isUploading = useSelector(state => state.postReducer.uploading);
    const imagesFolder = process.env.REACT_APP_IMAGES_FOLDER;

    const handleImageChange = (e) => {
        // on image change the selected image will be assigned to image
        if(e.target.files && e.target.files[0]){
            let imgObj = e.target.files[0];
            setImage(imgObj);
        }
    }

    const resetPostShare = () => {
        setImage(null);
        descRef.current.value = "";
    }

    const handlePostShare = async (e) => {
        e.preventDefault();
    
        const newPost = {
            userId: user._id,
            description: descRef.current.value,
        };
    
        if (image) {
            const data = new FormData();
            const filename = Date.now() + "_" + image.name;
            data.append("filename", filename);
            data.append("file", image);
    
            newPost.image = filename;
    
            try {
                await dispatch(uploadImage(data));
                await dispatch(uploadPost(newPost));
                resetPostShare();
            } catch (error) {
                console.log("Upload error from PostShare:", error);
            }
        } else {
            try {
                await dispatch(uploadPost(newPost));
                resetPostShare();
            } catch (error) {
                console.log("Upload post error from PostShare:", error);
            }
        }

        if(inModal){
            handleClose();
        }
    };

    useEffect(() => {
        return () => {
            if (image) {
                URL.revokeObjectURL(URL.createObjectURL(image));
            }
        };
    }, [image]);

    return (
        <div className='flex gap-4 bg-cardColor rounded-xl p-4'>
            <img 
                src={user.profilePic ? `${imagesFolder}${user.profilePic}` : `${imagesFolder}defaultProfilePic.jpeg`} 
                className='rounded-[50%] size-12'
            />
            <div className='flex flex-col w-[90%] gap-4'>
                <input 
                    type='text' 
                    placeholder="What's happening" 
                    className="bg-inputColor p-[10px] rounded-[10px] text-[17px] border-none outline-none"     
                    ref={descRef} 
                />

                <div className='flex justify-around'>
                    <div 
                        className='postOptions text-photo' 
                        onClick={() => imageRef.current.click()}
                    >   
                        {/* whenever you click this photo icon the imageRef will be clicked and then the control will go to hidden input and it will open directory box */}
                        <UilScenery />
                        Photo
                    </div>
                    <div className='postOptions text-video'>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className='postOptions text-location'>
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className='postOptions text-shedule'>
                        <UilSchedule />
                        Schedule
                    </div>
                    <motion.button 
                        className={`bg-buttonBg text-[white] w-24 h-8 hover:bg-none hover:text-[#8E57FD] hover:border rounded-[6px] ${isUploading ? 'cursor-not-allowed' : ''}`} 
                        onClick={handlePostShare} 
                        disabled={isUploading}
                    >
                        {isUploading ? "Uploading..." : "Share"}
                    </motion.button>
            
                    <div style={{display: 'none'}}>
                        <input 
                            type='file' 
                            name='myImage' 
                            ref={imageRef} 
                            onChange={handleImageChange}
                        />
                        {/* when you click on an image then the control will go to handleImageChange function*/}
                    </div>
                </div>   

                {image && 
                    <div className='relative'>
                        <UilTimes 
                            className='absolute top-2 right-2 hover:cursor-pointer'
                            onClick={() => setImage(null)} 
                        />
                        <img 
                            src={URL.createObjectURL(image)}
                            className='w-full max-h-[20rem] object-cover rounded-xl'    
                        />
                    </div>
                }         
            </div>
        </div>
    );
}

export default PostShare;