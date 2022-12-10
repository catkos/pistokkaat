/* check url param query */

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
console.log(urlParams.get('nimi'));

//todo: make this better

/* if all params empty, show all plants */
if(!(urlParams.get('nimi'))){
    console.log("iz empty show all plants"); //todo: delete
    getData(); //call getData function from listings.js
}

/* search results counter
const listings = document.querySelector(".listings");
const numberOfChildren = listings.children.length;
const counter = document.querySelector("#searchResultsCounter");
counter.innerHTML += numberOfChildren;*/
/*
let searchName = urlParams.get('nimi');

let searchPrice = urlParams.get('hinta');
let searchMailing = urlParams.get('toimitus');

console.log(searchName);
console.log(searchPrice);
console.log(searchMailing);*/

//add user search to form inputs as value
if (!(searchName==="")){
    document.getElementById("searchtxt").value = searchName;
    document.getElementById("price").value = searchPrice;
    document.getElementById("mailing").value = searchMailing;

}




/* count how many listings */
function listingCounter(){
    const listings = document.querySelector(".listings");
    const numberOfChildren = listings.children.length;
    const counter = document.querySelector("#searchResultsCounter");
    counter.innerHTML += numberOfChildren;
}

