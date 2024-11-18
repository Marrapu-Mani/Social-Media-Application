import { uploadimage, uploadpost } from "../api/upload.js";

export const uploadImage = (imageData) => async (dispatch) => {
    try {
        await uploadimage(imageData);
    } catch (error) {
        console.log("Upload image error from action:", error);
    }
}

export const uploadPost = (newPost) => async (dispatch) => {
    dispatch({ type: 'UPLOAD_START' });
    try{
        const data = await uploadpost(newPost);
        console.log("Post uploaded successfully, data:", data);
        dispatch({ type: 'UPLOAD_SUCCESS', data: data });
    } catch(error){
        console.log("Upload post error from action:", error);
        dispatch({ type: 'UPLOAD_FAIL' });
    }
}