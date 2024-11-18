import { gettimelineposts } from "../api/post.js";

export const getTimelinePosts = (userId) => async (dispatch) => {
    dispatch({ type: 'RETRIEVING_START' });
    try{
        const data = await gettimelineposts(userId);
        console.log('Timeline posts, data:', data);
        dispatch({ type: 'RETRIEVING_SUCCESS', data: data });
    } catch(error){
        console.log("Get timeline post error from action:", error);
        dispatch({ type: 'RETRIEVING_FAIL' });
    }
}