import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { uploadImage } from "../../redux/actions/upload.js";
import { updateUser } from "../../redux/actions/user.js";

const EditInfo = ({data, handleClose}) => {
    const params = useParams();
    const dispatch = useDispatch();
    const {password, ...otherData} = data;
    const [formData, setFormData] = useState(otherData);
    const [profilePic, setProfilePic] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handleImageChange(e){
        // on image change the selected image will be assigned to image
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0];
            e.target.name === "profilePic" ? setProfilePic(img) : setCoverImage(img); 
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        
        let user = formData;

        if(profilePic){
            const data = new FormData();
            const filename = Date.now() + "_" + profilePic.name;
            data.append("filename", filename);
            data.append("file", profilePic);

            user.profilePic = filename;

            try{
                dispatch(uploadImage(data));
            } catch(error){
                console.log("Upload profilePic error from EditInfo:", error);
            }
        }

        if(coverImage){
            const data = new FormData();
            const filename = Date.now() + "_" + coverImage.name;
            data.append("filename", filename);
            data.append("file", coverImage);

            user.coverImage = filename;

            try{
                dispatch(uploadImage(data));
            } catch(error){
                console.log("Upload coverImage error from EditInfo:", error);
            }
        }

        dispatch(updateUser(params.id, user));
        handleClose();
    }

    return (
        <form 
            className='flex flex-col gap-4 p-2 rounded-xl bg-cardColor relative'
            onSubmit={handleSubmit}
        >
            <h3 className='font-bold text-2xl text-black mx-auto'>Edit info</h3>

            <div className='flex gap-4'>
                <input 
                    type='text' 
                    placeholder='First Name' 
                    value={formData.firstname} 
                    name='firstname' 
                    className='infoInput' 
                    onChange={handleChange} 
                />
                <input 
                    type='text' 
                    placeholder='Last Name' 
                    value={formData.lastname} 
                    name='lastname' 
                    className='infoInput' 
                    onChange={handleChange} 
                />
            </div>

            <div className='flex flex-col w-[100%]'>
                <input 
                    type='text' 
                    placeholder='Works at' 
                    value={formData.worksAt} 
                    name='worksAt' 
                    className='infoInput' 
                    onChange={handleChange} 
                />
            </div>

            <div className='flex gap-4'>
                <input 
                    type='text' 
                    placeholder='Lives in' 
                    value={formData.livesIn} 
                    name='livesIn' 
                    className='infoInput' 
                    onChange={handleChange} 
                />
                <input 
                    type='text' 
                    placeholder='Country' 
                    value={formData.country} 
                    name='country' 
                    className='infoInput' 
                    onChange={handleChange}
                />
            </div>

            <div className='flex flex-col w-[100%]'>
                <input 
                    type='text' 
                    placeholder='Relationship Status' 
                    value={formData.relationShip} 
                    name='relationShip' 
                    className='infoInput' 
                    onChange={handleChange}
                />
            </div>

            <div className='flex text-[14px]'>
                <div className='flex items-center'>
                    <span>Profile Image </span>
                    <input 
                        type='file' 
                        name='profilePic' 
                        onChange={handleImageChange}
                    />
                </div>
                <div className='flex items-center'>
                    <span>Cover Image </span>
                    <input 
                        type='file' 
                        name='coverImage' 
                        onChange={handleImageChange}
                    />
                </div>
            </div>

            <button className='bg-buttonBg text-[white] w-24 h-8 mx-auto rounded-[6px] hover:bg-none hover:text-[#8E57FD] hover:border' >
                Update
            </button>
        </form>
    );
}

export default EditInfo;