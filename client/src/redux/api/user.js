const baseURL = 'http://localhost:5000';

const getAuthHeader = () => {
    const profile = localStorage.getItem('profile');
    if(profile){
        return { 'Authorization': `Bearer ${JSON.parse(profile).token}` };
    }
    return {};
};

export const getAllUsers = () => {
    return fetch(`${baseURL}/user/`)
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .catch(error => {
        console.log("Get all users error from api:", error);
        throw error;
    });
};

export const getUser = (id) => {
    return fetch(`${baseURL}/user/${id}`)
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .catch(error => {
        console.log("Get user error from api:", error);
        throw error;
    });
};

export const updateuser = (id, user) => {
    return fetch(`${baseURL}/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .catch(error => {
        console.log('Update user error from api:', error);
        throw error;
    });
};


export const followuser = (id, user) => {
    return fetch(`${baseURL}/user/${id}/follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .catch(error => {
        console.log('Follow user error from api:', error);
        throw error;
    });
};

export const unfollowuser = (id, user) => {
    return fetch(`${baseURL}/user/${id}/unfollow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .catch(error => {
        console.log('Unfollow user error from api:', error);
        throw error;
    });
};
