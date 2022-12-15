'use strict';
// TODO: Change url when uploading to server
const url = 'http://localhost:3000';

(async () => {
    try {
        const response = await fetch(url + '/auth/logout');
        const json = await response.json();
        console.log(json);
        // remove token
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        createDialog("Olet kirjautunut ulos", 'index.html');
    } catch (e) {
        console.log(e.message);
    }
})();