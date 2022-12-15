'use strict';
// TODO: Change url when uploading to server
const url = 'http://localhost:3000';

let deliveryOptions = [];
let selectedDeliveryOptions = [];

let user;

//If cancelled, alert user and if yes go back to previous page
const btnBack = document.getElementById("back");
const goBack=()=>{
    if (confirm("Haluatko peruuttaa?")) {
        history.back();
    }
}

btnBack.addEventListener("click",goBack);

//new stuff

let municipalities = [];

const dropdownInput = document.querySelector('#dropdownInput');
const dropdownIcon = document.querySelector('#dropdownIcon');
const dropdownWrapper = document.querySelector('#dropdownWrapper');
const settingsForm = document.querySelector('#settingsForm');

// Get municipalities
const getMunicipalities = async () => {
    try {
        const options = {
            method: 'GET'
        };
        const response = await fetch(url + '/location', options);
        const result = await response.json();
        // Loop result to municipalities array
        result.forEach(item => {
            item.municipalities.forEach(i => {
                municipalities.push({id: i.municipality_id, name: i.municipality});
            });
        });
        // Sort municipalities by name
        municipalities.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // Ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // Ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // Names must be equal
            return 0;
        });
    } catch (e) {
        console.log(e.message);
    }
};

dropdownInput.addEventListener('input', () => {
    onInputChange(dropdownWrapper, dropdownInput, municipalities);
});

dropdownInput.addEventListener('focusin',  () => {
    onInputChange(dropdownWrapper, dropdownInput, municipalities);
});

dropdownIcon.addEventListener('click', () => {
    // Get ul list
    const listEl = document.querySelector('#dropdownList');
    // If it exists, remove it
    if (listEl) {
        listEl.remove();
        return;
    }
    addFocusToInputEl(dropdownInput);
});


const getUserInfo = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url +"/user/"+user.user_id, options);
        if (!response.ok) {
            console.log("notok")
            location.href = 'not-found.html';
            return;
        }
        const userProfile = await response.json();
        printUserInfo(userProfile.username, userProfile.location, userProfile.email);
    } catch (e) {
        console.log(e);
    }
};

//add placeholders
function printUserInfo(name, location, email){
    document.getElementById("username").placeholder=name;
    document.getElementById("email").placeholder=email;
    document.getElementById("dropdownInput").placeholder=location;
}

// Settings form
settingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get data from form
    const formData = new FormData(settingsForm);

    const oldpassword = formData.get('oldpassword');
    if (!oldpassword) {
        formData.delete('oldpassword');
    }
    //
    formData.set('municipality', selectedID);
    // Create obj for json data and loop form's data to obj
    const obj = {};
    formData.forEach((value, key) => obj[key] = value);
    // Create json data from obj
    const jsonData = JSON.stringify(obj);
    try {
        // Fetch options
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            body: jsonData
        };
        // Fetch and check if status is not OK
        const response = await fetch(url + /user/, options);
        const json = await response.json();
        console.log("response: "+response)
        console.log("json: "+json)
        if (!response.ok) {
            createDialog(json.message, '');
            return;
        }
        //TODO: make a dialog and redirect back to user's profile
        alert("Tiedot tallennettu");
        //createDialog(json.message, 'plant.html?id=' + plant_id);
    } catch (e) {
        console.log(e);
    }
});

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
    await getUserInfo();
};
getMunicipalities();
start();


