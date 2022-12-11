'use strict';
// TODO: Change url when uploading to server
const url = 'http://localhost:3000';
let municipalities = [];
const dropdownInput = document.querySelector('#dropdownInput');
const dropdownIcon = document.querySelector('#dropdownIcon');
const dropdownWrapper = document.querySelector('#dropdownWrapper');
const registerForm = document.querySelector('#registerForm');

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
            // names must be equal
            return 0;
        });
        console.log(municipalities);
    } catch (e) {
        console.log(e.message);
    }
};

// Register
registerForm.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        // Get data from form
        const formData = new FormData(registerForm);
        formData.set('municipality', selectedID);
          // Create obj for json data and loop form's data to obj
        const obj = {};
        formData.forEach((value, key) => obj[key] = value);
        // Create json data from obj
        const jsonData = JSON.stringify(obj);
        // Fetch options
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        };
        const response = await fetch(url + '/auth/register', options);
        const json = await response.json();
        if(response.status !== 200) {
            createDialog(json.message);
            return;
        }
        createDialog(json.message);
        const button = document.querySelector('dialog form button');
        button.addEventListener('click', () => {
            location.href = 'login.html';
        });
    } catch (e) {
        console.log(e.message);
    }
});

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

getMunicipalities();