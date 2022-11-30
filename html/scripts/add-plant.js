// TODO: get mailingOptions from api
// This is only mockup data!
const mailingOptions = ["Nouto", "Postitus"];

const addFileEl = document.querySelector('#addFile');
const fileInput = document.querySelector('#fileInput');
const multiSelectionInputEl = document.querySelector('#mailingInput');
const multiSelectionIcon = document.querySelector('#multiSelectionIcon');

const onInputChange = (array) => {
    removeAutocompleteDropdown();

    // Get value from input
    const value = multiSelectionInputEl.value.toLowerCase();

    // If input's value's length is 0, create autocomplete drowdown with array
    if (value.length === 0) {
        createMultiSelectionDropDown(array);
        return;
    }

    // Create list from array with values that start the same as input's value
    const filteredArray = array.filter((item) => {
        return item.toLowerCase().startsWith(value);
    });

    createMultiSelectionDropDown(filteredArray)
}

const onButtonClick = (e) => {
    // Prevent default event
    e.preventDefault();

    // Get the button that is the target of the click event
    const buttonEl = e.target;

    // Add buttonEl's innerHTML to input's value
    multiSelectionInputEl.value = buttonEl.innerHTML;

    removeAutocompleteDropdown();
}

const createMultiSelectionDropDown = (array) => {
    // Create ul for dropdown
    const listEl = document.createElement('ul');
    listEl.className = 'autocompleteList';
    listEl.id = 'autocompleteList';

    // Foreach array to button's inside list
    array.forEach((item) => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.innerHTML = item;
        button.addEventListener('click', onButtonClick);
        listItem.appendChild(button);
        listEl.appendChild(listItem);
    });

    // Append ul list to multiSelectionWrapper
    document.querySelector('#multiSelectionWrapper').appendChild(listEl);
}

const removeAutocompleteDropdown = () => {
    // Get ul list
    const listEl = document.querySelector('#autocompleteList');

    // If it exists, remove it
    if (listEl) listEl.remove();
}

const addFocusToInputEl = () => {
    multiSelectionInputEl.focus();
}

// // Click file input when clicking addFileEl
// addFileEl.addEventListener('click', () => {
//     addFileInput.click()
// });

// // Add file's name no HTML
// addFileInput.addEventListener('change', () => {
//     document.querySelector('#fileName').innerHTML = addFileInput.files[0].name;
// });

// multiSelectionInputEl.addEventListener('input', () => {
//     onInputChange(mailingOptions);
// });

// multiSelectionInputEl.addEventListener('focusin',  () => {
//     onInputChange(mailingOptions);
// });

// multiSelectionIcon.addEventListener('click', addFocusToInputEl);