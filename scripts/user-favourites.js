'use strict';

let user;
/*
const getUserFavourites = async () => {
    await getUserFavouriteData();
};*/

const checkLogin = async () => {
    // Check session storage
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        location.href = 'not-found.html';
        return;
    }
    // Check if token is valid
    try {
        const options = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/user/token', options);
        if (!response.ok) {
            location.href = 'index.html';
            return;
        }
        const json = await response.json();
        sessionStorage.setItem('user', JSON.stringify(json.user));
        user = JSON.parse(sessionStorage.getItem('user'));
    } catch (e) {
        console.log(e.message);
    }
};

const start = async () => {
    await checkLogin();
    await getUserFavouriteData();
};
start();