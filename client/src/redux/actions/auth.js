import { login, signup } from '../api/auth.js';

export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    try{
        const data = await signup(formData);        // Directly use the response data ({ user, token })
        console.log("Signup successful, data:", data);
        dispatch({ type: 'AUTH_SUCCESS', data });
    } catch(error){
        console.error("Signup error from action:", error);
        dispatch({ type: 'AUTH_FAIL' });
    }
}

export const logIn = (formData) => async (dispatch) => {
    dispatch({type: 'AUTH_START'});
    try{
        const data = await login(formData);         // Directly use the response data ({ user, token })
        console.log("Login successful, data:", data);
        dispatch({ type: 'AUTH_SUCCESS', data });
    } catch(error){
        console.error("Login error from action:", error);
        dispatch({ type: 'AUTH_FAIL' });
    }
}

export const logOut = () => (dispatch) => {
    dispatch({ type: 'LOG_OUT' });
}
