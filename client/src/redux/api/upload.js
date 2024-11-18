// import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000' });

// export const uploadimage = (imageData) => {
//     return API.post('/upload', imageData); // Ensure to return the promise
// }

const baseURL = 'http://localhost:5000';

const getAuthHeader = () => {
    const profile = localStorage.getItem('profile');
    if(profile){
        return { 'Authorization': `Bearer ${JSON.parse(profile).token}` };
    }
    return {};
};

export const uploadimage = (imageData) => {
    return fetch(`${baseURL}/upload/`, {
        method: 'POST',
        body: imageData, // No need to set headers for FormData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.log('Upload image error from api:', error);
        throw error;
    });
}

export const uploadpost = (newPost) => {
    return fetch(`${baseURL}/post/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
        },
        body: JSON.stringify(newPost),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Upload post error from api:', error);
        throw error;
    });
}


