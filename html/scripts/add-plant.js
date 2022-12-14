// TODO: Change url when uploading to server
const url = 'http://localhost:3000';

let deliveryOptions = [];
let selectedDeliveryOptions = [];

const addFileEl = document.querySelector('#addFile');
const fileInput = document.querySelector('#fileInput');
const descriptionInput = document.querySelector('#descriptionInput');
const descriptionCharCounterText = document.querySelector('#descriptionCharCounter');
const instructionInput = document.querySelector('#instructionInput');
const instructionCharCounterText = document.querySelector('#instructionCharCounter');
const dropdownInput = document.querySelector('#dropdownInput');
const dropdownIcon = document.querySelector('#dropdownIcon');
const dropdownWrapper = document.querySelector('#dropdownWrapper');
const addNewForm = document.querySelector('#addNewForm');
const cancelButton = document.querySelector('#cancelButton');

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

// Add new plant
addNewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get data from form
    const formData = new FormData(addNewForm);
    // Selected delivery options to delivery array
    const delivery = selectedDeliveryOptions.map(item => item.id);
    // Set delivery array to delivery in formData
    formData.set('delivery', delivery);
    try {
        // Fetch options
        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            body: formData
        };
        // Fetch and check if status is not OK
        const response = await fetch(url + '/plant', options);
        const json = await response.json();
        if (!response.ok) {
            createDialog(json.message, '');
            return;
        }
        // Create dialog and redirect to plant.html when user clicks button
        createDialog(json.message, 'plant.html?id=' + json.plant_id);
    } catch (e) {
        console.log(e.message);
    }
});

// Count characters and add under input
const charCounter = (input, counterText) => {
    const count = input.value.length;
    counterText.innerHTML = count + '/280';
};

// Click file input when clicking addFileEl
addFileEl.addEventListener('click', () => {
    console.log(fileInput);
    fileInput.click();
});

// Add file's name to HTML
fileInput.addEventListener('change', () => {
    document.querySelector('#fileName').innerHTML = fileInput.files[0].name;
});

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

// Add dropdown when focusin on input
dropdownInput.addEventListener('focusin',  () => {
    onInputChange(dropdownInput, dropdownWrapper, deliveryOptions, selectedDeliveryOptions);
});

// Create dialog when clicking cancel button
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

getDeliveryOptions();