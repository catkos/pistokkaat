const onInputChange = (input, appendEl, array, selectedArray) => {
    removeMultiSelectDropDown();
    createMultiSelectDropDown(input, appendEl, array, selectedArray);
}

const onButtonClick = (e, input, array) => {
    // Prevent default event
    e.preventDefault();

    // Get the button that is the target of the click event
    const buttonEl = e.target;

    if(array.includes(buttonEl.innerHTML)) {
        const index = array.indexOf(buttonEl.innerHTML);
        array.splice(index, 1);
    } else {
        array.push(buttonEl.innerHTML);
        array.sort();
    }

    input.value = array.filter((item) => {
        return item;
    }).join(', ');

    removeMultiSelectDropDown();
}

const createMultiSelectDropDown = (input, appendEl, array, selectedArray) => {
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
            onButtonClick(e, input, selectedArray);
        });

        if (selectedArray.includes(item)) {
            button.className = 'selected';
        }

        listItem.appendChild(button);
        listEl.appendChild(listItem);
    });

    // Append ul list
    appendEl.appendChild(listEl);
}

const removeMultiSelectDropDown = () => {
    // Get ul list
    const listEl = document.querySelector('#dropdownList');

    // If it exists, remove it
    if (listEl) listEl.remove();
}

const addFocusToInputEl = (input) => {
    input.focus();
}