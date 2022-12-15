// TODO: Change url when uploading to server
const url = 'http://localhost:3000';

let deliveryOptions = [];
let selectedDeliveryOptions = [];

const descriptionInput = document.querySelector('#descriptionInput');
const descriptionCharCounterText = document.querySelector('#descriptionCharCounter');
const instructionInput = document.querySelector('#instructionInput');
const instructionCharCounterText = document.querySelector('#instructionCharCounter');
const dropdownInput = document.querySelector('#dropdownInput');
const dropdownIcon = document.querySelector('#dropdownIcon');
const dropdownWrapper = document.querySelector('#dropdownWrapper');
const modifyForm = document.querySelector('#modifyForm');
const cancelButton = document.querySelector('#cancelButton');

// Get query params
const getQueryParam = (param) => {
    const queryStr = window.location.search;
    const urlParams = new URLSearchParams(queryStr);
    return urlParams.get(param);
};

// Get id from address
const plant_id = getQueryParam('id');

// Get user data
const user = JSON.parse(sessionStorage.getItem('user'));

// Get delivery options
const getDeliveryOptions = async () => {
    try {
        const options = {
            method: 'GET'
        };
        const response = await fetch(url + '/delivery', options);
        const result = await response.json();
        // Loop result to deliveryOptions array
        result.forEach(item => {
            deliveryOptions.push({id: item.delivery_id, name: item.name});
        });
    } catch (e) {
        console.log(e.message);
    }
};

// Count characters and add under input
const charCounter = (input, counterText) => {
    const count = input.value.length;
    counterText.innerHTML = count + '/280';
};

// Add existing plant data to form
const getPlant = async (id) => {
    try {
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + /plant/ + id, options);
        const plant = await response.json();
        // Check if user token's id doesn't match with plant's seller's id and the user is not admin
        if (plant.seller.user_id !== user.user_id && user.role !== 0) {
            location.href = 'index.html';
            return;
        }
        // Insert data to inputs
        const inputs = modifyForm.querySelectorAll('input');
        const textareas = modifyForm.querySelectorAll('textarea');
        inputs[0].value = plant.name;
        inputs[1].value = plant.price;
        inputs[2].value = plant.delivery;
        textareas[0].value = plant.description;
        descriptionCharCounterText.innerHTML = plant.description.length + '/280';
        textareas[1].value = plant.instruction;
        instructionCharCounterText.innerHTML = plant.description.length + '/280';
        // Add delivery options to selectedDeliveryOptions
        const deliveryArr = plant.delivery.split(', ');
        selectedDeliveryOptions = deliveryOptions.filter(item => deliveryArr.find(del => item.name === del));
    } catch (e) {
        console.log(e.message);
    }
};

// Add char counter under description when typing
descriptionInput.addEventListener('keyup', () => {
    charCounter(descriptionInput, descriptionCharCounterText);
});

// Add char counter under description when typing
descriptionInput.addEventListener('keydown', () => {
    charCounter(descriptionInput, descriptionCharCounterText);
});

// Add char counter under instruction when typing
instructionInput.addEventListener('keyup', () => {
    charCounter(instructionInput, instructionCharCounterText);
});

// Add char counter under instruction when typing
instructionInput.addEventListener('keydown', () => {
    charCounter(instructionInput, instructionCharCounterText);
});

// Add dropdown when using input
dropdownInput.addEventListener('input', () => {
    onInputChange(dropdownInput, dropdownWrapper, deliveryOptions, selectedDeliveryOptions);
});

// Add dropdown when using input
dropdownInput.addEventListener('focusin',  () => {
    onInputChange(dropdownInput, dropdownWrapper, deliveryOptions, selectedDeliveryOptions);
});

// Open dialog when clicking cancel button
cancelButton.addEventListener('click', () => {
    createDialogWithCancel('Haluatko peruuttaa?');
});

// Remove list when clicking dropdown icon, if the list exists
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

modifyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get data from form
    const formData = new FormData(modifyForm);
    // Selected delivery options to delivery array
    const delivery = selectedDeliveryOptions.map(item => item.id);
    // Set delivery array to delivery in formData
    formData.set('delivery', delivery);
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
        const response = await fetch(url + /plant/ + plant_id, options);
        const json = await response.json();
        if (!response.ok) {
            createDialog(json.message, '');
            return;
        }
        // Create dialog and redirect to plant.html when user clicks button
        createDialog(json.message, 'plant.html?id=' + plant_id);
    } catch (e) {
        console.log(e.message);
    }
});

getDeliveryOptions();
getPlant(plant_id);