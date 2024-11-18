import { followuser, unfollowuser, updateuser } from "../api/user.js";

export const updateUser = (id, user) => async (dispatch) => {
    dispatch({ type: "UPDATE_START" });
    try{
        const data = await updateuser(id, user);
        console.log("Updated user:", data);
        dispatch({ type: "UPDATE_SUCCESS", data: data });
    } catch(error){
        console.log("Update user error from action:", error);
        dispatch({ type: "UPDATE_FAIL" });
    }
}

export const followUser = (id, user) => async (dispatch) => {
    dispatch({type: "FOLLOW_USER"});
    await followuser(id, user);
}

export const unFollowUser = (id, user) => async (dispatch) => {
    dispatch({type: "UNFOLLOW_USER"});
    await unfollowuser(id, user);
}