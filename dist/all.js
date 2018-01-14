'use strict';

var url = 'https://media.lottoland.com/api/drawings/euroJackpot';
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';

var staticData = {
    row1: {
        roman: 'I',
        match: '5 Numbers + 2 Euronumbers'
    },
    row2: {
        roman: 'II',
        match: '5 Numbers + 1 Euronumbers'
    },
    row3: {
        roman: 'III',
        match: '5 Numbers + 0 Euronumbers'
    },
    row4: {
        roman: 'IV',
        match: '4 Numbers + 2 Euronumbers'
    },
    row5: {
        roman: 'V',
        match: '4 Numbers + 1 Euronumbers'
    },
    row6: {
        roman: 'VI',
        match: '4 Numbers + 0 Euronumbers'
    },
    row7: {
        roman: 'VII',
        match: '3 Numbers + 2 Euronumbers'
    },
    row8: {
        roman: 'VIII',
        match: '3 Numbers + 1 Euronumbers'
    },
    row9: {
        roman: 'IX',
        match: '3 Numbers + 0 Euronumbers'
    },
    row10: {
        roman: 'X',
        match: '2 Numbers + 2 Euronumbers'
    },
    row11: {
        roman: 'XI',
        match: '2 Numbers + 1 Euronumbers'
    },
    row12: {
        roman: 'XII',
        match: '2 Numbers + 0 Euronumbers'
    }
};

fetch(proxyUrl + url).then(function (result) {
    return result.json();
}).then(function (data) {
    var lastResults = data.last;
    console.log(data);
    var numbers = generateNumberTemplate(lastResults.numbers);
    var euroNumbers = generateNumberTemplate(lastResults.euroNumbers, 'result__number--euro');

    injectHtml('.js-result-numbers', numbers + euroNumbers);
    injectHtml('.js-results__table-body', generateRowTemplate(lastResults.odds));
    injectHtml('.js-results__full-date', injectFullDate(lastResults.date));
    injectHtml('.js-results__short-date', injectShortDate(lastResults.date));
}).catch(function (e) {
    console.log(e);
});

function injectFullDate(date) {
    return dateFormat('full', date);
}

function injectShortDate(date) {
    return dateFormat('short', date);
}

function dateFormat(format, date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var dateString = new Date(date.year, date.month - 1, date.day);
    if (format === 'full') {
        return days[dateString.getDay()] + ' ' + dateString.getDate() + ' ' + month[dateString.getMonth()] + ' ' + dateString.getFullYear();
    }
    if (format === 'short') {
        return dateString.getDate() + '.' + (dateString.getMonth() + 1) + '.' + dateString.getFullYear();
    }
}

function injectHtml(selector, markup) {
    document.querySelectorAll(selector).forEach(function (item) {
        item.innerHTML = markup;
    });
}

function generateNumberTemplate(numbers, className) {
    var result = '';
    numbers.forEach(function (item) {
        var number = '<li class="result__number ' + className + '">' + item + '</li>';
        return result += number;
    });
    return result;
}

function generateRowTemplate(rows) {
    var result = '';

    for (var index = 1; index < Object.keys(rows).length; index++) {
        var row = '<tr class="result__tr">\n                     <td class="results__td">' + staticData['row' + index].roman + '</td>\n                     <td class="results__td">' + staticData['row' + index].match + '</td>\n                     <td class="results__td">' + rows['rank' + index].winners + '</td>\n                     <td class="results__td">' + rows['rank' + index].prize + '</td>\n                 </tr>';
        result += row;
    }
    return result;
}