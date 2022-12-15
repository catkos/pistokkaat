(async () => {
    'use strict';
    // TODO: Change url when uploading to server
    const url = 'http://localhost:3000';
    // Check session storage
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        location.href = 'index.html';
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
            // TODO: Maybe this should to redirect to logout.html?
            location.href = 'index.html';
        } else {
            const json = await response.json();
            sessionStorage.setItem('user', JSON.stringify(json.user));
        }
    } catch (e) {
        console.log(e.message);
    }
})();