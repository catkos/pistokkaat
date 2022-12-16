'use strict';
// TODO: Change url when uploading to server
const url = 'http://localhost:3000';

// Get elements from page
const commentTextArea = document.querySelector('#commentTextArea');
const favouriteButton = document.querySelector('#favouriteButton');
const heartIcon = document.querySelector('#heartIcon');
const imgWrapper = document.querySelector('.imgWrapper');
const img = document.querySelector('#plantImg');
const title = document.querySelector('#title');
const infoPrice = document.querySelector('#infoPrice');
const infoLocation = document.querySelector('#infoLocation');
const infoDelivery = document.querySelector('#infoDelivery');
const infoDate = document.querySelector('#infoDate');
const infoFavourites = document.querySelector('#infoFavourites');
const description = document.querySelector('#description');
const instruction = document.querySelector('#instruction');
const userLink = document.querySelectorAll('.username a');
const userEmail = document.querySelectorAll('.userEmail');
const userEmailList = document.querySelectorAll('.userEmailList');
const userLocation = document.querySelectorAll('.userLocation');
const commentsDiv = document.querySelector('.comments');
const addCommentForm = document.querySelector('#addCommentForm');
const main = document.querySelector('main');

let user;
let favourite = false;

// Get query params
const getQueryParam = (param) => {
    const queryStr = window.location.search;
    const urlParams = new URLSearchParams(queryStr);
    return urlParams.get(param);
};

// Get id from address
const plant_id = getQueryParam('id');

const checkLogin = async () => {
    // Check session storage
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        addCommentForm.remove();
        favouriteButton.remove();
        return;
    }
    // Check if token is valid
    try {
        const options = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/user/token', options);
        if (!response.ok) {
            addCommentForm.remove();
            favouriteButton.remove();
            return;
        }
        const json = await response.json();
        sessionStorage.setItem('user', JSON.stringify(json.user));
        user = JSON.parse(sessionStorage.getItem('user'));
        setFavourite();
    } catch (e) {
        console.log(e.message);
    }
};

const getPlant = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + /plant/ + plant_id, options);
        if (!response.ok) {
            location.href = 'not-found.html';
            return;
        }
        const plant = await response.json();
        createPlant(plant);
    } catch (e) {
        console.log(e.message);
    }
};

const deletePlant = async () => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/plant/' + plant_id, options);
        const json = await response.json();
        if (!response.ok) {
            createDialogWithCancel(json.message, '');
            return;
        }
        location.href = 'index.html';
    } catch (e) {
        console.log(e.message);
    }
};

const getComments = async () => {
    try {
        const options = {method: 'GET'};
        const response = await fetch(url + /plant/ + plant_id + '/comment', options);
        if (!response.ok) {
            const paragraph = document.createElement('p');
            paragraph.innerHTML = 'Ei kommentteja.';
            commentsDiv.appendChild(paragraph);
            return;
        }
        const comments = await response.json();
        commentsDiv.innerHTML = '';
        comments.forEach(comment => {
            createComment(comment);
        });
    } catch (e) {
        console.log(e.message);
    }
};

const addComment = async () => {
    // Get data from form
    const formData = new FormData(addCommentForm);
    // Create obj for json data and loop form's data to obj
    const obj = {};
    formData.forEach((value, key) => obj[key] = value);
    // Create json data from obj
    const jsonData = JSON.stringify(obj);
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            body: jsonData
        };
        // Fetch and check if status is not OK
        const response = await fetch(url + /plant/ + plant_id + '/comment', options);
        const json = await response.json();
        if (!response.ok) {
            createDialog(json.message, '');
            return;
        }
        getComments();
        commentTextArea.value = '';
        resizeCommentTextArea();
    } catch (e) {
        console.log(e.message);
    };
};

const getFavourites = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        // Fetch and check if status is not OK
        const response = await fetch(url + '/user/favourite', options);
        const favourites = await response.json();
        if (!response.ok) {
            return [];
        }
        return favourites;
    } catch (e) {
        console.log(e.message);
    }
};

const addFavourite = async () => {
    try {
        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const response = await fetch(url + /plant/ + plant_id + '/favourite', options);
        const json = await response.json();
        if (!response.ok) {
            createDialog(json.message, '');
            return;
        }
        favourite = true;
        changeHeartIcon();
        getPlant();
    } catch (e) {
        console.log(e.message);
    }
};

const deleteFavourite = async () => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const response = await fetch(url + /plant/ + plant_id + '/favourite', options);
        const json = await response.json();
        if (!response.ok) {
            createDialog(json.message, '');
            return;
        }
        favourite = false;
        changeHeartIcon();
        getPlant();
    } catch (e) {
        console.log(e.message);
    }
};

const createPlant = (plant) => {
    // If user is logged
    if (user) {
        // Check if user's id matches with plant's seller's id or the user is admin 
        if (plant.seller.user_id === user.user_id || user.role === 0) {
            createEditDelButtons();
        }
        // If user is same as seller, remove favourite button
        if (plant.seller.user_id === user.user_id) {
            favouriteButton.remove();
        }
    }

    img.src = url + '/resizes/' + plant.imagename;
    img.alt = plant.name;

    // Add placeholder image if img error
    img.onerror = (e) => {
        img.src = './assets/img/placeholder.png';
        img.alt = 'Väliaikainen kuva';
    };

    title.innerHTML = plant.name;
    infoPrice.innerHTML = plant.price + ' €';
    infoLocation.innerHTML = plant.seller.location;
    infoDelivery.innerHTML = plant.delivery;
    const createdDate = new Date(plant.created).toLocaleString('fi-FI');
    infoDate.innerHTML = createdDate.slice(0, createdDate.length-3);
    
    if (plant.edited) {
        const editedDate = new Date(plant.edited).toLocaleString('fi-FI');
        infoDate.innerHTML += ' | Muokattu ' + editedDate.slice(0, editedDate.length-3);
    }

    infoFavourites.innerHTML = plant.favourites;
    description.innerHTML = plant.description;
    instruction.innerHTML = plant.instruction;
    userLink[0].href = 'user-profile.html?id=' + plant.seller.user_id;
    userLink[0].innerHTML = plant.seller.username;
    userLink[1].href = 'user-profile.html?id=' + plant.seller.user_id;
    userLink[1].innerHTML = plant.seller.username;
    
    if (!plant.seller.email) {
        userEmailList[0].remove();
        userEmailList[1].remove();
    } else {
        userEmail[0].innerHTML = plant.seller.email;
        userEmail[1].innerHTML = plant.seller.email;
    }

    userLocation[0].innerHTML = plant.seller.location;
    userLocation[1].innerHTML = plant.seller.location;
};

const createComment = (comment) => {
    const article = document.createElement('article');
    article.className = 'comment';
    const commentTopDiv = document.createElement('div');
    commentTopDiv.className = 'commentTop';
    const h4 = document.createElement('h4');
    h4.className = 'commentAuthor';
    const link = document.createElement('a');
    link.href = 'user-profile.html?id=' + comment.user_id;
    link.innerHTML = comment.username;
    const timeParagraph = document.createElement('p');
    timeParagraph.className = 'commentTime';
    timeParagraph.id = 'commentTime';
    const time = document.createElement('time');
    const date = new Date(comment.created).toLocaleString('fi-FI');
    time.timedate = date.slice(0, date.length-3);
    time.innerHTML = date.slice(0, date.length-3);
    const commentParagraph = document.createElement('p');
    commentParagraph.id = 'comment';
    commentParagraph.innerHTML = comment.comment;
    h4.appendChild(link);
    commentTopDiv.appendChild(h4);
    timeParagraph.appendChild(time);
    commentTopDiv.appendChild(timeParagraph);
    article.appendChild(commentTopDiv);
    article.appendChild(commentParagraph);
    commentsDiv.appendChild(article);
};

const createEditDelButtons = () => {
    // If editDeleteButtonDiv already exists, remove it
    if (document.querySelector('.editDeleteButtonWrapper')) {
        document.querySelector('.editDeleteButtonWrapper').remove();
    }
    const editDeleteButtonDiv = document.createElement('div');
    editDeleteButtonDiv.className = 'editDeleteButtonWrapper';

    // Create edit button
    const editLink = document.createElement('a');
    editLink.href = 'modify-plant.html?id=' + plant_id;
    const editButton = document.createElement('button');
    editButton.className = 'primaryButton';
    editButton.id = 'editButton';
    editButton.title = 'Muokkaa';
    const editIcon = document.createElement('i');
    editIcon.className = 'fa-solid fa-pen fa-lg';
    editButton.append(editIcon);
    editLink.append(editButton);
    editDeleteButtonDiv.append(editLink);

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'primaryButton';
    deleteButton.id = 'deleteButton';
    deleteButton.title = 'Poista';
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa-solid fa-trash fa-lg';

    // When clicking deleteButton, open dialog to confirm if user wants to delete plant
    deleteButton.addEventListener('click', () => {
        createDialogToDeletePlant();
    });

    deleteButton.append(deleteIcon);
    editDeleteButtonDiv.append(deleteButton);
    main.prepend(editDeleteButtonDiv);
};

const createDialogToDeletePlant = () => {
    // Select old dialog and if it exists, remove it
    const oldDialog = document.querySelector('dialog')
    if (oldDialog) {oldDialog.remove()};

    const dialog = document.createElement('dialog');
    const paragraph = document.createElement('p');
    paragraph.innerHTML = 'Haluatko varmasti poistaa pistokkaan?';
    const form = document.createElement('form');
    form.method = 'dialog';
    const okButton = document.createElement('button');
    okButton.className = 'primaryButton';
    okButton.innerHTML = 'OK';
    const cancelButton = document.createElement('button');
    cancelButton.className = 'secondaryButton';
    cancelButton.innerHTML = 'Peruuta';

    // Delete plant when clicking okButton
    okButton.addEventListener('click', () => {
        deletePlant();
    });

    dialog.appendChild(paragraph);
    form.appendChild(okButton);
    form.appendChild(cancelButton);
    dialog.appendChild(form);
    main.appendChild(dialog);
    dialog.showModal();
};

// Check if user has plant already in favourites
const setFavourite = async () => {
    const favourites = await getFavourites();
    if (favourites.find(favourite => favourite && favourite.plant_id == plant_id)) {
        favourite = true;
        changeHeartIcon();
    } else {
        favourite = false;
        changeHeartIcon();
    }
};

// Resize comment textarea
const resizeCommentTextArea = () => {
    // If textarea doens't have any value, height = 3rem
    if (!commentTextArea.value) {
        commentTextArea.style.height = '3rem';
    }
    // Change height according to scrollbar height in textarea
    commentTextArea.style.height = commentTextArea.scrollHeight+'px';
};

// Change heart icon
const changeHeartIcon = () => {
    // If favourite is true change heart icons's class
    if (favourite) {
        heartIcon.className = 'fa-solid fa-heart fa-lg';
    } else {
        heartIcon.className = 'fa-regular fa-heart fa-lg';
    }
};

commentTextArea.addEventListener('keyup', resizeCommentTextArea);

commentTextArea.addEventListener('keydown', resizeCommentTextArea);

favouriteButton.addEventListener('click', () => {
    if (!favourite) {
        addFavourite();
    } else {
        deleteFavourite();
    }
});

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addComment();
});

const start = async () => {
    await checkLogin();
    await getPlant();
    await getComments();
};

start();