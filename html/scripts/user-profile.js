'use strict';

/* Get user profile id */
const userProfileId = new URLSearchParams(window.location.search).get('id');

let user;

const title = document.getElementById("profileName");
const liLocation = document.getElementById("location");
const liEmail = document.getElementById("email");

const getUser = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url +"/user/"+userProfileId, options);
        if (!response.ok) {
            location.href = 'not-found.html';
            return;
        }
        const userProfile = await response.json();
        printUserProfile(userProfile.username, userProfile.location, userProfile.email);
        createSettings(user);
    } catch (e) {
        console.log(e);
    }
};

function printUserProfile(name, loca, mail){
    title.innerHTML=name;
    liLocation.innerHTML = "<i class=\'fa-solid fa-location-dot\'></i> "+loca;
    liEmail.innerHTML = "<i class=\'fa-solid fa-envelope fa-xl\'></i> <a href='mailto: "+mail+"'>"+mail+"</a>";
}

const createSettings = (user) => {
    // If user is logged
    if (user) {
        // Check if user's id matches with user's page id or the user is admin
        if (user.user_id.toString() === userProfileId || user.role === 0) {
            createEditLogoutButtons();
        }
    }
}
const createEditLogoutButtons = () =>{
    const section = document.querySelector(".profileSettings");

    const div = document.createElement("div");
    div.setAttribute("id","btnWrapper");
    const edit = document.createElement("button");
    edit.classList.add("primaryButton");
    edit.setAttribute("id","edit");
    const logout = document.createElement("button");
    logout.classList.add("secondaryButton");
    logout.setAttribute("id","logout");

    const editLink = document.createElement("a");
    const logoutLink = document.createElement("a");

    editLink.appendChild(edit);
    logoutLink.appendChild(logout);

    edit.innerHTML="<i class=\'fa-solid fa-gear\'></i>";
    editLink.href="./user-settings.html";
    logout.innerHTML="<i class=\'fa-solid fa-right-from-bracket\'></i>";
    logoutLink.href="\logout.html";

    section.appendChild(div);
    div.appendChild(editLink);
    div.appendChild(logoutLink);
}

const checkLogin = async () => {
    // Check session storage
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        liEmail.remove();
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
            liEmail.remove();
            return;
        }
        const json = await response.json();
        sessionStorage.setItem('user', JSON.stringify(json.user));
        user = JSON.parse(sessionStorage.getItem('user'));
    } catch (e) {
        console.log(e);
    }
};

const start = async () => {
    await checkLogin();
    await getUser();
    await getUserData(userProfileId);
};

start();