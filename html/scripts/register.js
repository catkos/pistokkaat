// TODO: get municipalities from api
// This is only mockup data!
const municipalities = ["Helsinki","Vantaa","Espoo","Joensuu","Rovaniemi", "Hamina", "Elojärvi"];

const autoCompleteInputEl = document.querySelector('#autocompleteInput');
const autoCompleteIcon = document.querySelector('#autoCompleteIcon');

const onInputChange = () => {
    removeAutocompleteDropdown();

    // Get value from input
    const value = autoCompleteInputEl.value.toLowerCase();

    // If input's value's length is 0, create autocomplete drowdown with array
    if (value.length === 0) {
        createAutoCompleteDropDown(municipalities);
        return;
    }

    // Create list from municipalities with values that start the same as input's value
    const filteredMunicipalities = municipalities.filter((municipality) => {
        return municipality.toLowerCase().startsWith(value);
    });

    createAutoCompleteDropDown(filteredMunicipalities)
}

const onMunicipalityButtonClick = (e) => {
    // Prevent default event
    e.preventDefault();

    // Get the button that is the target of the click event
    const buttonEl = e.target;

    // Add buttonEl's innerHTML to input's value
    autoCompleteInputEl.value = buttonEl.innerHTML;

    removeAutocompleteDropdown();
}

const createAutoCompleteDropDown = municipalities => {
    // Create ul for dropdown
    const listEl = document.createElement('ul');
    listEl.className = 'autocompleteList';
    listEl.id = 'autocompleteList';

    // Foreach municipalities to button's inside list
    municipalities.forEach((municipality) => {
        const listItem = document.createElement('li');
        const municipalityButton = document.createElement('button');
        municipalityButton.innerHTML = municipality;
        municipalityButton.addEventListener('click', onMunicipalityButtonClick);
        listItem.appendChild(municipalityButton);
        listEl.appendChild(listItem);
    });

    // Append ul list to autocompleteWrapper
    document.querySelector('#autocompleteWrapper').appendChild(listEl);
}

const removeAutocompleteDropdown = () => {
    // Get ul list containing municipalities
    const listEl = document.querySelector('#autocompleteList');

    // If it exists, remove it
    if (listEl) listEl.remove();
}

const addFocusToInputEl = () => {
    autoCompleteInputEl.focus();
}

autoCompleteInputEl.addEventListener('input', onInputChange);
autoCompleteInputEl.addEventListener('focusin', onInputChange);
autoCompleteIcon.addEventListener('click', addFocusToInputEl);