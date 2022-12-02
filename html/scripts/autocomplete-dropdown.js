// TODO: get municipalities from api
// This is only mockup data!
const municipalities = ["Helsinki","Vantaa","Espoo","Joensuu","Rovaniemi", "Hamina", "Elojärvi"];

const dropdownInput = document.querySelector('#dropdownInput');
const dropdownIcon = document.querySelector('#dropdownIcon');
const dropdownWrapper = document.querySelector('#dropdownWrapper');

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

// AUTOCOMPLETE
const onInputChange = (appendEl, input, array) => {
    removeAutocompleteDropdown();

    // Get value from input
    const value = input.value.toLowerCase();

    // If input's value's length is 0, create autocomplete drowdown with array
    if (value.length === 0) {
        createAutoCompleteDropDown(appendEl, array);
        return;
    }

    // Create list from array with values that start the same as input's value
    const filteredArray = array.filter((item) => {
        return item.toLowerCase().startsWith(value);
    });

    createAutoCompleteDropDown(appendEl, filteredArray)
}

const onButtonClick = (e, input) => {
    // Prevent default event
    e.preventDefault();

    // Get the button that is the target of the click event
    const buttonEl = e.target;

    // Add buttonEl's innerHTML to input's value
    input.value = buttonEl.innerHTML;

    removeAutocompleteDropdown();
}

const createAutoCompleteDropDown = (appendEl, array) => {
    // Create ul for dropdown
    const listEl = document.createElement('ul');
    listEl.className = 'dropdownList';
    listEl.id = 'dropdownList';

    // Foreach array to button's inside list
    array.forEach((item) => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.innerHTML = item;
        button.addEventListener('click', (e) => {
            onButtonClick(e, dropdownInput);
        });
        listItem.appendChild(button);
        listEl.appendChild(listItem);
    });

    // Append ul list to dropdownWrapper
    appendEl.appendChild(listEl);
}

const removeAutocompleteDropdown = () => {
    // Get ul list
    const listEl = document.querySelector('#dropdownList');

    // If it exists, remove it
    if (listEl) listEl.remove();
}

const addFocusToInputEl = (input) => {
    input.focus();
}