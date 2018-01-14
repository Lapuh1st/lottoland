const url = 'https://media.lottoland.com/api/drawings/euroJackpot';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const staticData = {
    row1 : {
        roman: 'I',
        match: '5 Numbers + 2 Euronumbers'
    },
    row2 : {
        roman: 'II',
        match: '5 Numbers + 1 Euronumbers'
    },
    row3 : {
        roman: 'III',
        match: '5 Numbers + 0 Euronumbers'
    },
    row4 : {
        roman: 'IV',
        match: '4 Numbers + 2 Euronumbers'
    },
    row5 : {
        roman: 'V',
        match: '4 Numbers + 1 Euronumbers'
    },
    row6 : {
        roman: 'VI',
        match: '4 Numbers + 0 Euronumbers'
    },
    row7 : {
        roman: 'VII',
        match: '3 Numbers + 2 Euronumbers'
    },
    row8 : {
        roman: 'VIII',
        match: '3 Numbers + 1 Euronumbers'
    },
    row9 : {
        roman: 'IX',
        match: '3 Numbers + 0 Euronumbers'
    },
    row10 : {
        roman: 'X',
        match: '2 Numbers + 2 Euronumbers'
    },
    row11 : {
        roman: 'XI',
        match: '2 Numbers + 1 Euronumbers'
    },
    row12 : {
        roman: 'XII',
        match: '2 Numbers + 0 Euronumbers'
    }
};

fetch(proxyUrl + url)
    .then(result => result.json())
    .then(data => {
        const lastResults = data.last;
        console.log(data);
        const numbers = generateNumberTemplate(lastResults.numbers);
        const euroNumbers = generateNumberTemplate(lastResults.euroNumbers, 'result__number--euro');

        injectHtml('.js-result-numbers', numbers + euroNumbers);
        injectHtml('.js-results__table-body', generateRowTemplate(lastResults.odds));
        injectHtml('.js-results__full-date', injectFullDate(lastResults.date));
        injectHtml('.js-results__short-date', injectShortDate(lastResults.date));

    })
    .catch(e => {
        console.log(e);
    });

function injectFullDate (date) {
   return dateFormat('full', date);
}

function injectShortDate (date) {
    return dateFormat('short', date);
}

function dateFormat(format, date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dateString = new Date(date.year, date.month-1, date.day);
    if (format === 'full') {
        return `${days[dateString.getDay()]} ${dateString.getDate()} ${month[dateString.getMonth()]} ${dateString.getFullYear()}`;
    }
    if (format === 'short') {
        return `${dateString.getDate()}.${dateString.getMonth()+1}.${dateString.getFullYear()}`;
    }
}

function injectHtml(selector, markup) {
    document.querySelectorAll(selector).forEach(item => {
        item.innerHTML = markup;
    });
}

function generateNumberTemplate(numbers, className) {
    let result = '';
    numbers.forEach(item => {
        const number = `<li class="result__number ${className}">${item}</li>`;
        return result += number;
    });
    return result;
}


function generateRowTemplate(rows) {
    let result = '';

    for (let index = 1; index < Object.keys(rows).length; index++) {
        const row = `<tr class="result__tr">
                     <td class="results__td">${staticData['row'+index].roman}</td>
                     <td class="results__td">${staticData['row'+index].match}</td>
                     <td class="results__td">${rows['rank'+index].winners}</td>
                     <td class="results__td">${rows['rank'+index].prize}</td>
                 </tr>`;
        result += row;
    }
    return result;
}

