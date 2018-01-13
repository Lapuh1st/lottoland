'use strict';

var url = 'https://media.lottoland.com/api/drawings/euroJackpot';
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';

fetch(proxyUrl + url).then(function (result) {
    return result.json();
}).then(function (data) {
    console.table(data);
    document.querySelector(".qqq").innerHTML = JSON.stringify(data, null, 2);
}).catch(function (e) {
    console.log(e);
});