import { useEffect, useState } from 'react';
import { getAllUsers } from '../../redux/api/user.js';

function Comment({ userId, desc }) {
  const [persons, setPersons] = useState([]);
  const [user, setUser] = useState(null);
  const imagesFolder = process.env.REACT_APP_IMAGES_FOLDER;

  useEffect(() => {
    const fetchPersons = async () => {
      const data = await getAllUsers();
      setPersons(data);
      console.log("data from comment", data);
    };
    fetchPersons();
  }, []);

  useEffect(() => {
    const findUserById = (id) => {
      return persons.find(person => person._id === id);
    };

    if (persons.length > 0) {
      const foundUser = findUserById(userId);
      setUser(foundUser);
      console.log("user from comment", foundUser);
    }
  }, [persons, userId]);

  if (!user) {
    return <div></div>;
  }

  return (
    <>
        <div className='flex items-center gap-4 my-2'>
            <img 
                src={user.profilePic ? `${imagesFolder}${user.profilePic}` : `${imagesFolder}defaultProfilePic.jpeg`} 
                className='rounded-[50%] size-8'
            />
            <span className='font-bold'>{user.firstname} {user.lastname}</span>
        </div>
        <span>{desc}</span>
    </>
  );
}

export default Comment;
