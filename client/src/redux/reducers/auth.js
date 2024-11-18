const initialState = {
    authData: null,
    loading: false,
    error: false,
    updating: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case "AUTH_START":
            return {...state, loading: true, error: false};
        case "AUTH_SUCCESS":
            console.log("Reducer AUTH_SUCCESS, action.data:", action.data);
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));   // optional chaining
            return { ...state, authData: action.data, loading: false, error: false };
        case "AUTH_FAIL":
            return {...state, loading: false, error: true};
            
        case "UPDATE_START":
            return {...state, updating: true, error: false};
        case "UPDATE_SUCCESS":
            console.log("Reducer UPDATE_SUCCESS, action.data:", action.data);
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return {...state, authData: action.data, updating: false, error: false};
        case "UPDATE_FAIL": 
            return {...state, updating: false, error: true};

        case "FOLLOW_USER":
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following, action.data] }}};
        case "UNFOLLOW_USER":
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following.filter(personId => personId !== action.data)] }}};
    
        case "LOG_OUT":
            localStorage.clear();
            return {...state, authData: null, loading: false, error: false};
        default:
            return state;
    }
}

export default authReducer;