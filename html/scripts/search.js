/* script for search html */

let queryParams = urlParams = new URLSearchParams(window.location.search);
console.log("query param: "+queryParams); //TODO: delete

//get data
if(queryParams.has('nimi') || queryParams.has('hinta') || queryParams.has('toimitus') ){
    getFilteredData(queryParams);
}