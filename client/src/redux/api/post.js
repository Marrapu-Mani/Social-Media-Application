const baseURL = 'http://localhost:5000';

const getAuthHeader = () => {
    const profile = localStorage.getItem('profile');
    if(profile){
        return { 'Authorization': `Bearer ${JSON.parse(profile).token}` };
    }
    return {};
};

export const gettimelineposts  = (userId) => {
    return fetch(`${baseURL}/post/${userId}/timeline`,{
        headers: {
            ...getAuthHeader()
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .catch(error => {
        console.log('Get timeline posts error from api:', error);
        throw error;
    });
}

export const likePost = (id) => {
    return fetch(`${baseURL}/post/${id}/like`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
        },
    })
    .catch(error => {
        console.log('Like post error from api:', error);
        throw error;
    });
}

export const commentPost = (id, userId, comment) => {
    return fetch(`${baseURL}/post/${id}/comment`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
        },
        body: JSON.stringify({
            userId: userId,  
            comment: comment
        })
    })
    .catch(error => {
        console.log('Comment post error from api:', error);
        throw error;
    });
}