import { createPortal } from 'react-dom';
import { UilTimes } from '@iconscout/react-unicons'
import { motion } from 'framer-motion';

function Modal({ children, onClose }) {
  return createPortal(
    <>
      <div 
        className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-75 z-10' 
        onClick={onClose}   
      />
      <motion.dialog 
        open
        className="fixed rounded-[6px] p-4 w-[50rem] max-w-[90%] z-10"
        initial={{ y: '-50vh' }}
        animate={{ y: '10vh' }}
        transition={{ type: 'spring', stiffness: 100, damping: 10, duration: 0.5}}
      >
        <div>
          <UilTimes className='ml-auto hover:cursor-pointer' onClick={onClose} />
        </div>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}

export default Modal;