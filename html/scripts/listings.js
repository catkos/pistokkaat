'use strict';

/* print listings
* make sure this script is above other script files that calls functions in this file
*  */
const url = 'http://localhost:3000'; // change url when uploading to server

//get all data
function getData(){

    const getJSON = async url => {
        const response = await fetch(url);
        if(!response.ok) // check if response worked (no 404 errors etc...)
            throw new Error(response.statusText);

        const db = response.json(); // get JSON from the response
        return db; // returns a promise, which resolves to this data value
    }

    console.log("Fetching data...");

    getJSON(url+"/plant").then(data => {

        console.log(data); //todo: delete

        //print out data
        for(const i in data) {
            printListing(data[i].plant_id, data[i].imagename, data[i].name, data[i].price, data[i].seller.location, data[i].delivery, data[i].created);
        }

    }).catch(error => {
        console.error(error); //todo: change
    });
}

//get filtered data (for search form)
function getFilteredData(queryParams){

    const getJSON = async url => {
        const response = await fetch(url);
        if(!response.ok) { // check if response worked
            throw new Error(response.statusText);
        }

        const db = response.json(); // get JSON from the response
        return db; // returns a promise, which resolves to this data value
    }

    getJSON(url+"/plant?"+queryParams).then(data => {

        //print out data
        for(const i in data) {
            printListing(data[i].plant_id, data[i].imagename, data[i].name, data[i].price, data[i].seller.location, data[i].delivery, data[i].created);
        }

        printListingCounter(data.length);

    }).catch(error => {
        console.log(error);
        unHideText();
    });

}

//get 3 newest listings (for index/frontpage)
function getNewestData(maxAmount){

    const getJSON = async url => {
        const response = await fetch(url);
        if(!response.ok) // check if response worked (no 404 errors etc...)
            throw new Error(response.statusText);

        const db = response.json(); // get JSON from the response
        return db; // returns a promise, which resolves to this data value
    }

    getJSON(url+"/plant?raja="+maxAmount).then(data => {

        //print out data
        for(const i in data) {
            printListing(data[i].plant_id, data[i].imagename, data[i].name, data[i].price, data[i].seller.location, data[i].delivery, data[i].created);
        }

    }).catch(error => {
        console.error(error); //todo: change
    });
}

/* dom manipulation */
function printListing(id, imgSrc, name, price, location, mailing, date) {

    const listings = document.querySelector(".listings");
    const article = document.createElement("article");
    article.classList.add("listing");

    listings.append(article);

    //make listing clickable
    article.addEventListener("click",function(){
        //TODO: change this when switching servers
        window.location = "/pistokkaat/html/plant.html?id="+id;
    });

    // create elements inside listing/article
    const figure = document.createElement("figure");
    figure.classList.add("listingImg");
    const image = document.createElement("img");
    image.src="assets/img/plant.jpg";
    //TODO: use this -> image.src = url+"/thumbnails/"+imgSrc;
    //ul li element creation
    const ul = document.createElement("ul");
    ul.classList.add("listingInfo");
    const liName = document.createElement("li");
    liName.classList.add("listingName");
    const liPrice = document.createElement("li");
    const liLocation = document.createElement("li");
    const liMailing = document.createElement("li");
    const liDate = document.createElement("li");
    ul.appendChild(liName);
    ul.appendChild(liPrice);
    ul.appendChild(liLocation);
    ul.appendChild(liMailing);
    ul.appendChild(liDate);

    //append elements to article/listing
    article.appendChild(figure);
    figure.appendChild(image);
    article.appendChild(ul);

    liName.innerHTML = "<h3>" + name + "</h3>";
    liPrice.innerHTML = "<i class=\'fa-solid fa-tag\'></i> " + price + " €";
    liLocation.innerHTML = "<i class=\'fa-solid fa-location-dot\'></i> " + location;
    liMailing.innerHTML = "<i class=\'fa-solid fa-truck\'></i> " + mailing;
    //TODO: delete string trim
    liDate.innerHTML = "<i class=\'fa-solid fa-calendar-days\'></i> " + date.substring(0,10);
}

//print counter number
function printListingCounter(dataLength){
    const text = document.querySelector("#searchResultsCounter");
    text.innerHTML= dataLength;
    unHideText();
}
function unHideText(){
    const title = document.querySelector("#searchResultsText");
    title.style.display="block";
}