'use strict';
/* script for search html */

/* get filtered data/listings */
let queryParams = new URLSearchParams(window.location.search);
//if any form inputs has been filled, get filtered data
if(queryParams.has('nimi') || queryParams.has('sijainti') || queryParams.has('hinta') || queryParams.has('toimitus') ){
    //insert previous typed value into form inputs
    document.getElementById('searchtxt').value = queryParams.get('nimi');
    document.getElementsByClassName('municipality').value = queryParams.get('sijainti'); //TODO: delete, doesnt work
    document.getElementById('price').value = queryParams.get('hinta');
    document.getElementById('mailing').value = queryParams.get('toimitus');

    getFilteredData(queryParams);
}

/* get municipalities */
const urlLocation = 'http://localhost:3000'; // TODO: Change url when uploading to server
let provinces = [];
const dropdownInput = document.querySelector('#dropdownInput');
const dropdownIcon = document.querySelector('#dropdownIcon');
const dropdownWrapper = document.querySelector('#dropdownWrapper');

// Get provinces
const getProvinces = async () => {
    try {
        const options = {
            method: 'GET'
        };
        const response = await fetch(urlLocation + '/location', options);
        const result = await response.json();

        result.forEach(item=>{
            provinces.push({id: item.province_id, name: item.province});
        })

        // Sort municipalities by name
        provinces.sort((a, b) => {
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
    } catch (e) {
        console.log(e.message);
    }
};

dropdownInput.addEventListener('input', () => {
    onInputChange(dropdownWrapper, dropdownInput, provinces);
});

dropdownInput.addEventListener('focusin',  () => {
    onInputChange(dropdownWrapper, dropdownInput, provinces);
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

getProvinces();