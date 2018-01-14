(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _servicesDateService = require("./services/date-service");

var _servicesTemplateService = require("./services/template-service");

var templateService = _interopRequireWildcard(_servicesTemplateService);

var url = 'https://media.lottoland.com/api/drawings/euroJackpot';
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';

fetch(proxyUrl + url).then(function (result) {
    return result.json();
}).then(function (data) {
    var lastResults = data.last;

    var numbers = templateService.generateNumberTemplate(lastResults.numbers);
    var euroNumbers = templateService.generateNumberTemplate(lastResults.euroNumbers, 'result__number--euro');

    templateService.injectHtml('.js-result-numbers', numbers + euroNumbers);
    templateService.injectHtml('.js-results__table-body', templateService.generateRowTemplate(lastResults.odds));
    templateService.injectHtml('.js-results__full-date', (0, _servicesDateService.injectFullDate)(lastResults.date));
    templateService.injectHtml('.js-results__short-date', (0, _servicesDateService.injectShortDate)(lastResults.date));
})["catch"](function (e) {
    console.log(e);
});

},{"./services/date-service":2,"./services/template-service":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.injectFullDate = injectFullDate;
exports.injectShortDate = injectShortDate;

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

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
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
exports.staticData = staticData;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.injectHtml = injectHtml;
exports.generateNumberTemplate = generateNumberTemplate;
exports.generateRowTemplate = generateRowTemplate;

var _staticDataService = require('./static-data-service');

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
        var row = '<tr class="result__tr">\n                     <td class="results__td">' + _staticDataService.staticData['row' + index].roman + '</td>\n                     <td class="results__td">' + _staticDataService.staticData['row' + index].match + '</td>\n                     <td class="results__td">' + rows['rank' + index].winners + 'x</td>\n                     <td class="results__td">' + currencyFormat(rows['rank' + index].prize) + '</td>\n                 </tr>';
        result += row;
    }
    return result;
}

function currencyFormat(amount) {
    var bigNum = amount.toString();
    var splitedNum = bigNum.substring(0, bigNum.length - 2) + '.' + bigNum.substring(bigNum.length - 2, bigNum.length);

    return parseFloat(splitedNum).toLocaleString(undefined, { style: 'currency', currency: 'EUR' });
}

},{"./static-data-service":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2F0L2xvdHRvbGFuZC9qcy9mZXRjaC1kYXRhLmpzIiwiL1VzZXJzL2thdC9sb3R0b2xhbmQvanMvc2VydmljZXMvZGF0ZS1zZXJ2aWNlLmpzIiwiL1VzZXJzL2thdC9sb3R0b2xhbmQvanMvc2VydmljZXMvc3RhdGljLWRhdGEtc2VydmljZS5qcyIsIi9Vc2Vycy9rYXQvbG90dG9sYW5kL2pzL3NlcnZpY2VzL3RlbXBsYXRlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O21DQ0FnRCx5QkFBeUI7O3VDQUN4Qyw2QkFBNkI7O0lBQWxELGVBQWU7O0FBRTNCLElBQU0sR0FBRyxHQUFHLHNEQUFzRCxDQUFDO0FBQ25FLElBQU0sUUFBUSxHQUFHLHNDQUFzQyxDQUFDOztBQUV4RCxLQUFLLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUNoQixJQUFJLENBQUMsVUFBQSxNQUFNO1dBQUksTUFBTSxDQUFDLElBQUksRUFBRTtDQUFBLENBQUMsQ0FDN0IsSUFBSSxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ1YsUUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFFOUIsUUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RSxRQUFNLFdBQVcsR0FBRyxlQUFlLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDOztBQUU1RyxtQkFBZSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUM7QUFDeEUsbUJBQWUsQ0FBQyxVQUFVLENBQUMseUJBQXlCLEVBQUUsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzdHLG1CQUFlLENBQUMs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QUFNLEdBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLGtDQUNoRSxDQUFDO0FBQ2hCLGNBQU0sSUFBSSxHQUFHLENBQUM7S0FDakI7QUFDRCxXQUFPLE1BQU0sQ0FBQztDQUNqQjs7QUFFRCxTQUFTLGNBQWMsQ0FBRSxNQUFNLEVBQUU7QUFDN0IsUUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2pDLFFBQU0sVUFBVSxHQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEFBQUUsQ0FBQzs7QUFFckgsV0FBTyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Q0FDbkciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgaW5qZWN0RnVsbERhdGUsIGluamVjdFNob3J0RGF0ZSB9IGZyb20gXCIuL3NlcnZpY2VzL2RhdGUtc2VydmljZVwiO1xuaW1wb3J0ICogYXMgdGVtcGxhdGVTZXJ2aWNlIGZyb20gXCIuL3NlcnZpY2VzL3RlbXBsYXRlLXNlcnZpY2VcIjtcblxuY29uc3QgdXJsID0gJ2h0dHBzOi8vbWVkaWEubG90dG9sYW5kLmNvbS9hcGkvZHJhd2luZ3MvZXVyb0phY2twb3QnO1xuY29uc3QgcHJveHlVcmwgPSAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vJztcblxuZmV0Y2gocHJveHlVcmwgKyB1cmwpXG4gICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IGxhc3RSZXN1bHRzID0gZGF0YS5sYXN0O1xuXG4gICAgICAgIGNvbnN0IG51bWJlcnMgPSB0ZW1wbGF0ZVNlcnZpY2UuZ2VuZXJhdGVOdW1iZXJUZW1wbGF0ZShsYXN0UmVzdWx0cy5udW1iZXJzKTtcbiAgICAgICAgY29uc3QgZXVyb051bWJlcnMgPSB0ZW1wbGF0ZVNlcnZpY2UuZ2VuZXJhdGVOdW1iZXJUZW1wbGF0ZShsYXN0UmVzdWx0cy5ldXJvTnVtYmVycywgJ3Jlc3VsdF9fbnVtYmVyLS1ldXJvJyk7XG5cbiAgICAgICAgdGVtcGxhdGVTZXJ2aWNlLmluamVjdEh0bWwoJy5qcy1yZXN1bHQtbnVtYmVycycsIG51bWJlcnMgKyBldXJvTnVtYmVycyk7XG4gICAgICAgIHRlbXBsYXRlU2VydmljZS5pbmplY3RIdG1sKCcuanMtcmVzdWx0c19fdGFibGUtYm9keScsIHRlbXBsYXRlU2VydmljZS5nZW5lcmF0ZVJvd1RlbXBsYXRlKGxhc3RSZXN1bHRzLm9kZHMpKTtcbiAgICAgICAgdGVtcGxhdGVTZXJ2aWNlLmluamVjdEh0bWwoJy5qcy1yZXN1bHRzX19mdWxsLWRhdGUnLCBpbmplY3RGdWxsRGF0ZShsYXN0UmVzdWx0cy5kYXRlKSk7XG4gICAgICAgIHRlbXBsYXRlU2VydmljZS5pbmplY3RIdG1sKCcuanMtcmVzdWx0c19fc2hvcnQtZGF0ZScsIGluamVjdFNob3J0RGF0ZShsYXN0UmVzdWx0cy5kYXRlKSk7XG5cbiAgICB9KVxuICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfSk7XG5cblxuIiwiZXhwb3J0IGZ1bmN0aW9uIGluamVjdEZ1bGxEYXRlIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGVGb3JtYXQoJ2Z1bGwnLCBkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdFNob3J0RGF0ZSAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlRm9ybWF0KCdzaG9ydCcsIGRhdGUpO1xufVxuXG5mdW5jdGlvbiBkYXRlRm9ybWF0KGZvcm1hdCwgZGF0ZSkge1xuICAgIGNvbnN0IGRheXMgPSBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XG4gICAgY29uc3QgbW9udGggPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbiAgICBjb25zdCBkYXRlU3RyaW5nID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLTEsIGRhdGUuZGF5KTtcbiAgICBpZiAoZm9ybWF0ID09PSAnZnVsbCcpIHtcbiAgICAgICAgcmV0dXJuIGAke2RheXNbZGF0ZVN0cmluZy5nZXREYXkoKV19ICR7ZGF0ZVN0cmluZy5nZXREYXRlKCl9ICR7bW9udGhbZGF0ZVN0cmluZy5nZXRNb250aCgpXX0gJHtkYXRlU3RyaW5nLmdldEZ1bGxZZWFyKCl9YDtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gJ3Nob3J0Jykge1xuICAgICAgICByZXR1cm4gYCR7ZGF0ZVN0cmluZy5nZXREYXRlKCl9LiR7ZGF0ZVN0cmluZy5nZXRNb250aCgpKzF9LiR7ZGF0ZVN0cmluZy5nZXRGdWxsWWVhcigpfWA7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHN0YXRpY0RhdGEgPSB7XG4gICAgcm93MSA6IHtcbiAgICAgICAgcm9tYW46ICdJJyxcbiAgICAgICAgbWF0Y2g6ICc1IE51bWJlcnMgKyAyIEV1cm9udW1iZXJzJ1xuICAgIH0sXG4gICAgcm93MiA6IHtcbiAgICAgICAgcm9tYW46ICdJSScsXG4gICAgICAgIG1hdGNoOiAnNSBOdW1iZXJzICsgMSBFdXJvbnVtYmVycydcbiAgICB9LFxuICAgIHJvdzMgOiB7XG4gICAgICAgIHJvbWFuOiAnSUlJJyxcbiAgICAgICAgbWF0Y2g6ICc1IE51bWJlcnMgKyAwIEV1cm9udW1iZXJzJ1xuICAgIH0sXG4gICAgcm93NCA6IHtcbiAgICAgICAgcm9tYW46ICdJVicsXG4gICAgICAgIG1hdGNoOiAnNCBOdW1iZXJzICsgMiBFdXJvbnVtYmVycydcbiAgICB9LFxuICAgIHJvdzUgOiB7XG4gICAgICAgIHJvbWFuOiAnVicsXG4gICAgICAgIG1hdGNoOiAnNCBOdW1iZXJzICsgMSBFdXJvbnVtYmVycydcbiAgICB9LFxuICAgIHJvdzYgOiB7XG4gICAgICAgIHJvbWFuOiAnVkknLFxuICAgICAgICBtYXRjaDogJzQgTnVtYmVycyArIDAgRXVyb251bWJlcnMnXG4gICAgfSxcbiAgICByb3c3IDoge1xuICAgICAgICByb21hbjogJ1ZJSScsXG4gICAgICAgIG1hdGNoOiAnMyBOdW1iZXJzICsgMiBFdXJvbnVtYmVycydcbiAgICB9LFxuICAgIHJvdzggOiB7XG4gICAgICAgIHJvbWFuOiAnVklJSScsXG4gICAgICAgIG1hdGNoOiAnMyBOdW1iZXJzICsgMSBFdXJvbnVtYmVycydcbiAgICB9LFxuICAgIHJvdzkgOiB7XG4gICAgICAgIHJvbWFuOiAnSVgnLFxuICAgICAgICBtYXRjaDogJzMgTnVtYmVycyArIDAgRXVyb251bWJlcnMnXG4gICAgfSxcbiAgICByb3cxMCA6IHtcbiAgICAgICAgcm9tYW46ICdYJyxcbiAgICAgICAgbWF0Y2g6ICcyIE51bWJlcnMgKyAyIEV1cm9udW1iZXJzJ1xuICAgIH0sXG4gICAgcm93MTEgOiB7XG4gICAgICAgIHJvbWFuOiAnWEknLFxuICAgICAgICBtYXRjaDogJzIgTnVtYmVycyArIDEgRXVyb251bWJlcnMnXG4gICAgfSxcbiAgICByb3cxMiA6IHtcbiAgICAgICAgcm9tYW46ICdYSUknLFxuICAgICAgICBtYXRjaDogJzIgTnVtYmVycyArIDAgRXVyb251bWJlcnMnXG4gICAgfVxufTtcblxuIiwiaW1wb3J0IHsgc3RhdGljRGF0YSB9IGZyb20gJy4vc3RhdGljLWRhdGEtc2VydmljZSdcblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdEh0bWwoc2VsZWN0b3IsIG1hcmt1cCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uaW5uZXJIVE1MID0gbWFya3VwO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVOdW1iZXJUZW1wbGF0ZShudW1iZXJzLCBjbGFzc05hbWUpIHtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgbnVtYmVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBudW1iZXIgPSBgPGxpIGNsYXNzPVwicmVzdWx0X19udW1iZXIgJHtjbGFzc05hbWV9XCI+JHtpdGVtfTwvbGk+YDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCArPSBudW1iZXI7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVSb3dUZW1wbGF0ZShyb3dzKSB7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuXG4gICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IE9iamVjdC5rZXlzKHJvd3MpLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCByb3cgPSBgPHRyIGNsYXNzPVwicmVzdWx0X190clwiPlxuICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicmVzdWx0c19fdGRcIj4ke3N0YXRpY0RhdGFbJ3JvdycraW5kZXhdLnJvbWFufTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJyZXN1bHRzX190ZFwiPiR7c3RhdGljRGF0YVsncm93JytpbmRleF0ubWF0Y2h9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJlc3VsdHNfX3RkXCI+JHtyb3dzWydyYW5rJytpbmRleF0ud2lubmVyc314PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJlc3VsdHNfX3RkXCI+JHtjdXJyZW5jeUZvcm1hdChyb3dzWydyYW5rJytpbmRleF0ucHJpemUpfTwvdGQ+XG4gICAgICAgICAgICAgICAgIDwvdHI+YDtcbiAgICAgICAgcmVzdWx0ICs9IHJvdztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gY3VycmVuY3lGb3JtYXQgKGFtb3VudCkge1xuICAgIGNvbnN0IGJpZ051bSA9IGFtb3VudC50b1N0cmluZygpO1xuICAgIGNvbnN0IHNwbGl0ZWROdW0gPSBgJHtiaWdOdW0uc3Vic3RyaW5nKDAsIGJpZ051bS5sZW5ndGggLSAyKX0uJHtiaWdOdW0uc3Vic3RyaW5nKGJpZ051bS5sZW5ndGggLSAyLCBiaWdOdW0ubGVuZ3RoKX1gO1xuXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3BsaXRlZE51bSkudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ0VVUicgfSk7XG59Il19
