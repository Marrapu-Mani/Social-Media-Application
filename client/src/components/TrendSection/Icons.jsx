import { Link } from 'react-router-dom';

import Home from '../../img/home.png';
import Notification from '../../img/noti.png';
import Comment from '../../img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';

function Icons() {
    return (
        <div className='flex justify-between mt-4'>
            <Link to='../home'>
                <img src={Home} className='icon' />
            </Link>
            <UilSetting  className='icon' />
            <img src={Notification} className='icon' />
            <img src={Comment} className='icon' />
        </div>
    );
}

export default Icons;