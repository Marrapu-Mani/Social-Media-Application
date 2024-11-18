import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { UilPen } from '@iconscout/react-unicons';
import Modal from './Modal';
import { getUser } from '../../redux/api/user';
import { logOut } from '../../redux/actions/auth';
import EditInfo from './EditInfo';

function InfoCard() {
    const params = useParams();
    const dispatch = useDispatch();
    const profileId = params.id;
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [profileData, setProfileData] = useState({});
    const { user } = useSelector(state => state.authReducer.authData);

    useEffect(() => {
        const fetchProfileData = async () => {
            if(user._id === profileId){
                setProfileData(user);
            } else{
                const profileData = await getUser(profileId);
                setProfileData(profileData);
            }
        }
        fetchProfileData();
    }, [user]);

    function handleOpen(){
        setIsModalOpened(true);
    }

    function handleClose(){
        setIsModalOpened(false);
    }

    function handleLogOut(){
        dispatch(logOut());
    }

    return (
        <div className='flex flex-col bg-cardColor gap-4 p-4 rounded-xl w-[100%]'>
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-lg'>Profile info</h4>
                <UilPen width='2rem' height='1.2rem' className='cursor-pointer' onClick={handleOpen} />
                {isModalOpened && 
                    <Modal onClose={handleClose}>
                        <EditInfo data={user} handleClose={handleClose} />
                    </Modal>
                }
            </div>

            <div>
                <div>
                    <span><b>Status </b></span>
                    <span>{profileData.relationShip}</span>
                </div>
                <div>
                    <span><b>Lives in </b></span>
                    <span>{profileData.livesIn}</span>
                </div>
                <div>
                    <span><b>Works at </b></span>
                    <span>{profileData.worksAt}</span>
                </div>
            </div>

            <button 
                className='bg-buttonBg text-[white] w-24 h-8 rounded-[6px] self-end hover:bg-none hover:text-[#8E57FD] hover:border mt-12'
                onClick={handleLogOut}
            >
                Logout
            </button>
        </div>
    );
}

export default InfoCard;
