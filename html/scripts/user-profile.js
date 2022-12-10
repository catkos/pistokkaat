// Change thumbs up/like icon and text after click
// TODO: change like amount for user

const icon = document.getElementById("likeIcon");
const text = document.getElementById("giveLike");
let clicked = false;

const changeIcon=()=>{
    if(!clicked){
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        text.innerHTML="Poista";
        clicked = true;
    }else{
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        text.innerHTML="Tykkää!";
        clicked = false;
    }
}

text.addEventListener("click", changeIcon);