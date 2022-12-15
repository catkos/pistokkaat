(async () => {
    'use strict';
    // TODO: Change url when uploading to server
    const url = 'http://localhost:3000';
    // Check session storage
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        // Remove links from navigation
        document.querySelector('#addPlantLink').remove();
        document.querySelector('#favouritesLink').remove();
        document.querySelector('#profileLink').remove();
        // Show login link
        document.querySelector('#loginLink').style.display = 'block';
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
            // Remove links from navigation
            document.querySelector('#addPlantLink').remove();
            document.querySelector('#favouritesLink').remove();
            document.querySelector('#profileLink').remove();
            // Show login link
            document.querySelector('#loginLink').style.display = 'block';
        } else {
            const json = await response.json();
            sessionStorage.setItem('user', JSON.stringify(json.user));
            // Get user data
            const user = JSON.parse(sessionStorage.getItem('user'));
            // Remove login link from nav
            document.querySelector('#loginLink').remove();
            // Add link to own profile
            const profileLink = document.querySelector('#profileLink');
            profileLink.href = 'user-profile.html?id=' + user.user_id;
            // Select profile link's span and add username to it
            const span = document.querySelector('#profileLink span');
            span.innerHTML = user.username;
        }
    } catch (e) {
        console.log(e.message);
    }
})();