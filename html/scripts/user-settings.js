// Change thumbs up/like icon and text after click
const details = document.querySelector("summary");
const icon = document.getElementById("dropdownIcon");
let clicked = false;

const changeIcon=()=>{
    if(!clicked){
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
        clicked = true;
    }else{
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
        clicked = false;
    }
}

details.addEventListener("click", changeIcon);

//TODO: save user changes

//If cancelled, alert user and if yes go back to previous page
const btnBack = document.getElementById("back");

const goBack=()=>{
    if (confirm("Haluatko peruuttaa?")) {
        history.back();
    }
}

btnBack.addEventListener("click",goBack);