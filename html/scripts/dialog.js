'use strict';

// Params: string to add to dialog and url to redirect if user clicks OK, give empty url if don't want to redirect
const createDialog = (string, url) => {
    // Select old dialog and if it exists, remove it
    const oldDialog = document.querySelector('dialog');

    if (oldDialog) {oldDialog.remove()};

    // Select main and create dialog and it's content
    const main = document.querySelector('main');

    const dialog = document.createElement('dialog');
    const paragraph = document.createElement('p');
    paragraph.innerHTML = string;
    const form = document.createElement('form');
    form.method = 'dialog';
    const button = document.createElement('button');
    button.className = 'primaryButton';
    button.innerHTML = 'OK';

    if (url !== '') {
        button.addEventListener('click', () => {
            location.href = url;
        });
    }

    dialog.appendChild(paragraph);
    form.appendChild(button);
    dialog.appendChild(form);
    main.appendChild(dialog);
    dialog.showModal();
};

// Params: string to add to dialog
const createDialogWithCancel = (string) => {
    // Select old dialog and if it exists, remove it
    const oldDialog = document.querySelector('dialog');

    if (oldDialog) {oldDialog.remove()};

    // Select main and create dialog and it's content
    const main = document.querySelector('main');

    const dialog = document.createElement('dialog');
    const paragraph = document.createElement('p');
    paragraph.innerHTML = string;
    const form = document.createElement('form');
    form.method = 'dialog';
    const okButton = document.createElement('button');
    okButton.className = 'primaryButton';
    okButton.innerHTML = 'OK';
    const cancelButton = document.createElement('button');
    cancelButton.className = 'secondaryButton';
    cancelButton.innerHTML = 'Peruuta';

    // Redirect to given url when clicking okButton
    okButton.addEventListener('click', () => {
        history.back();
    });

    dialog.appendChild(paragraph);
    form.appendChild(okButton);
    form.appendChild(cancelButton);
    dialog.appendChild(form);
    main.appendChild(dialog);
    dialog.showModal();
};