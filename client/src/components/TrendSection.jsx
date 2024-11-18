import { useState } from "react";
import { motion }from 'framer-motion';

import Icons from "./TrendSection/Icons";
import TrendCard from "./TrendSection/TrendCard";
import Modal from "./ProfileInfo/Modal";
import PostShare from './PostsSection/PostShare';

function TrendSection() {
    const [isModalOpened, setIsModalOpened] = useState(false);

    function handleOpen() {
        setIsModalOpened(true);
    }

    function handleClose() {
        setIsModalOpened(false);
    }

    return (
        <div className="flex flex-col gap-8">
            {/* <Icons /> */}
            <TrendCard />
            <motion.button 
                className='bg-buttonBg text-[white] p-2 w-[80%] self-center rounded-[6px]'
                onClick={handleOpen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} 
            >
                Share
            </motion.button>
            {isModalOpened && 
                <Modal onClose={handleClose}>
                    <PostShare inModal={true} handleClose={handleClose} />
                </Modal>
            }
        </div>
    );
}

export default TrendSection;