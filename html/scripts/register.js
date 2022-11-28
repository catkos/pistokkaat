const autoCompleteInputEl = document.querySelector('#autocomplete-input');
// TODO: get kunnat from api
// This is only mockup data!
const kunnat = ["Helsinki","Vantaa","Espoo","Joensuu","Rovaniemi", "Hamina", "Elojärvi"];

const onInputChange = () => {
    removeAutocompleteDropdown();

    const value = autoCompleteInputEl.value.toLowerCase();

    if (value.length === 0) return;

    const filteredKunnat = kunnat.filter((kunta) => {
        return kunta.toLowerCase().startsWith(value);
    });

    createAutoCompleteDropDown(filteredKunnat)
}

const onKuntaButtonClick = (e) => {
    e.preventDefault();
    const buttonEl = e.target;
    autoCompleteInputEl.value = buttonEl.innerHTML;

    removeAutocompleteDropdown();
}

const createAutoCompleteDropDown = array => {
    const listEl = document.createElement('ul');
    listEl.className = 'autocomplete-list';
    listEl.id = 'autocomplete-list';

    array.forEach((kunta) => {
        const listItem = document.createElement('li');
        const kuntaButton = document.createElement('button');
        kuntaButton.innerHTML = kunta;
        kuntaButton.addEventListener('click', onKuntaButtonClick);
        listItem.appendChild(kuntaButton);
        listEl.appendChild(listItem);
    });

    document.querySelector('#autocomplete-wrapper').appendChild(listEl);
}

const removeAutocompleteDropdown = () => {
    const listEl = document.querySelector('#autocomplete-list');

    if (listEl) listEl.remove();
}

autoCompleteInputEl.addEventListener('input', onInputChange);