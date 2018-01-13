const url = 'https://media.lottoland.com/api/drawings/euroJackpot';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

fetch(proxyUrl + url)
    .then(result => result.json())
    .then(data => {
        console.table(data);
        document.querySelector(".qqq").innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(e => {
        console.log(e);
    });
