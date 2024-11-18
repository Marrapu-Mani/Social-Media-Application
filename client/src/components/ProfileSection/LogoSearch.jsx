import { Link } from 'react-router-dom';

import Logo from '../../img/instaLogo.png';
import { UilSearch } from '@iconscout/react-unicons';

function LogoSearch() {
    return (
        <div className='flex items-center gap-1'>
            <Link to='../home'>
                <img src={Logo} className='size-12' alt="logo"/>
            </Link>
            <div className='flex bg-inputColor rounded-[10px] h-10 p-[5px]'>
                <input type="text" placeholder='#Explore' className='w-[100%] rounded-none outline-none bg-[transparent]' />
                <div className='flex justify-center items-center bg-gradient-to-r from-[#E2B5E3] to-[#8E57FD] text-[white] rounded-[5px] p-[4px] hover:cursor-pointer'>
                    <UilSearch className='size-6' />
                </div>
            </div>
        </div>
    );
}

export default LogoSearch;