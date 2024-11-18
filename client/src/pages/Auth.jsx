import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import Logo from '../img/instaLogo.png';
import { logIn, signUp } from '../redux/actions/auth.js';

function Auth() {
    const dispatch = useDispatch();     // instantiation of useDispatch
    const [ isSignUpPage, setSignUpPage ] = useState(false);
    const [ formData, setFormData ] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [ confirmPassword, setConfirmPassword ] = useState(true);
    const isLoading = useSelector(state => state.authReducer.loading);
    
    function handleChange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value });
    } 

    function handleSubmit(e){
        e.preventDefault();

        if(isSignUpPage){
            formData.password === formData.confirmPassword 
                ? dispatch(signUp(formData))
                : setConfirmPassword(false);
        } else{
            dispatch(logIn(formData));
        }
    } 

    function resetForm(){
        setSignUpPage(prev => !prev);
        setFormData({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmPassword: ""
        });
        setConfirmPassword(true);
    }

    return (
        <div className='flex justify-center items-center h-screen gap-16 relative'>
            {/* Brand */}
            <motion.div 
                className='flex justify-center items-center gap-4'
                initial={{translateX: -1000}}
                animate={{translateX: 0}}
                transition={{duration: 0.5}}
            >
                <img src={Logo} className='size-40' />
                <div className='flex flex-col gap-2'>
                    <span className='font-bold text-5xl text-[#8E57FD]'>Social Media</span>
                    <span className='font-bold text-2xl text-[#E2B5E3]'>Connect with your family and friends</span>
                </div>
            </motion.div>

            {/* Form */}
            <motion.form
                className='flex flex-col justify-center items-center gap-4 p-4 rounded-xl bg-cardColor relative'
                onSubmit={handleSubmit} 
                initial={{translateX: 1000}}
                animate={{translateX: 0}}
                transition={{duration: 0.5}}
            >
                <h3 className='font-bold text-2xl my-2 text-black'>{ isSignUpPage ? "Register" : "Login" }</h3>

                { isSignUpPage && <>
                    <div className='flex gap-4'>
                        <input 
                            type='text' 
                            placeholder='First Name' 
                            name='firstname' 
                            className='formInput' 
                            onChange={handleChange}
                            value={formData.firstname}
                        />
                        <input 
                            type='text'
                            placeholder='Last Name' 
                            name='lastname' 
                            className='formInput' 
                            onChange={handleChange}
                            value={formData.lastname}    
                        />
                    </div>
                </> }
                
                <div className='flex flex-col w-[100%]'>
                    <input 
                        type='text' 
                        placeholder='User Name' 
                        name='username' 
                        className='formInput' 
                        onChange={handleChange}
                        value={formData.username}
                    />
                </div>

                <div className='flex gap-4'>
                    <input 
                        type='password' 
                        placeholder='Password' 
                        name='password' 
                        className={isSignUpPage ? 'formInput' : 'formInput w-80'} 
                        onChange={handleChange} 
                        value={formData.password}
                    />
                    { isSignUpPage && <>
                        <input 
                            type='password' 
                            placeholder='Confirm Password' 
                            name='confirmPassword' 
                            className='formInput' 
                            onChange={handleChange} 
                            value={formData.confirmPassword}    
                        />
                    </> }
                </div>

                <span style={{
                    display : confirmPassword ? 'none' : 'block',
                    fontSize: '14px', color: 'red', 
                    alignSelf: 'flex-end', 
                    marginRight: '5px'
                }}>
                    *Confirm password should match!
                </span>

                <div>
                    <span 
                        className='text-[14px] hover:cursor-pointer hover:text-[blue] hover:underline' 
                        onClick={resetForm}
                    >
                        { isSignUpPage 
                            ? "Already have an account. Login!" 
                            : "Don't have an account? Sign up" 
                        }
                    </span>
                </div>
                
                <button 
                    className={`bg-buttonBg text-[white] w-24 h-8 rounded-[6px] self-end hover:bg-none hover:text-[#8E57FD] hover:border ${ isLoading ? 'cursor-not-allowed' : '' }`} 
                    disabled={isLoading}
                >
                    { isLoading ? "Loading..." : isSignUpPage ? "Sign up" : "Login"}
                </button>
            </motion.form>
        </div>
    )
}

export default Auth;