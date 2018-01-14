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
        var row = '<tr class="result__tr">\n                     <td class="results__td">' + _staticDataService.staticData['row' + index].roman + '</td>\n                     <td class="results__td">' + _staticDataService.staticData['row' + index].match + '</td>\n                     <td class="results__td">' + rows['rank' + index].winners + 'x</td>\n                     <td class="results__td">€' + rows['rank' + index].prize + '</td>\n                 </tr>';
        result += row;
    }
    return result;
}

},{"./static-data-service":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2F0L2xvdHRvbGFuZC9qcy9mZXRjaC1kYXRhLmpzIiwiL1VzZXJzL2thdC9sb3R0b2xhbmQvanMvc2VydmljZXMvZGF0ZS1zZXJ2aWNlLmpzIiwiL1VzZXJzL2thdC9sb3R0b2xhbmQvanMvc2VydmljZXMvc3RhdGljLWRhdGEtc2VydmljZS5qcyIsIi9Vc2Vycy9rYXQvbG90dG9sYW5kL2pzL3NlcnZpY2VzL3RlbXBsYXRlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O21DQ0FnRCx5QkFBeUI7O3VDQUN4Qyw2QkFBNkI7O0lBQWxELGVBQWU7O0FBRTNCLElBQU0sR0FBRyxHQUFHLHNEQUFzRCxDQUFDO0FBQ25FLElBQU0sUUFBUSxHQUFHLHNDQUFzQyxDQUFDOztBQUV4RCxLQUFLLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUNoQixJQUFJLENBQUMsVUFBQSxNQUFNO1dBQUksTUFBTSxDQUFDLElBQUksRUFBRTtDQUFBLENBQUMsQ0FDN0IsSUFBSSxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ1YsUUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFFOUIsUUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RSxRQUFNLFdBQVcsR0FBRyxlQUFlLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDOztBQUU1RyxtQkFBZSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUM7QUFDeEUsbUJBQWUsQ0FBQyxVQUFVLENBQUMseUJBQXlCLEVBQUUsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzdHLG1CQUFlLENBQUMs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QUFLLENBQUMsQ0FBQyxLQUFLLGtDQUNqRCxDQUFDO0FBQ2hCLGNBQU0sSUFBSSxHQUFHLENBQUM7S0FDakI7QUFDRCxXQUFPLE1BQU0sQ0FBQztDQUNqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBpbmplY3RGdWxsRGF0ZSwgaW5qZWN0U2hvcnREYXRlIH0gZnJvbSBcIi4vc2VydmljZXMvZGF0ZS1zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyB0ZW1wbGF0ZVNlcnZpY2UgZnJvbSBcIi4vc2VydmljZXMvdGVtcGxhdGUtc2VydmljZVwiO1xuXG5jb25zdCB1cmwgPSAnaHR0cHM6Ly9tZWRpYS5sb3R0b2xhbmQuY29tL2FwaS9kcmF3aW5ncy9ldXJvSmFja3BvdCc7XG5jb25zdCBwcm94eVVybCA9ICdodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS8nO1xuXG5mZXRjaChwcm94eVVybCArIHVybClcbiAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgY29uc3QgbGFzdFJlc3VsdHMgPSBkYXRhLmxhc3Q7XG5cbiAgICAgICAgY29uc3QgbnVtYmVycyA9IHRlbXBsYXRlU2VydmljZS5nZW5lcmF0ZU51bWJlclRlbXBsYXRlKGxhc3RSZXN1bHRzLm51bWJlcnMpO1xuICAgICAgICBjb25zdCBldXJvTnVtYmVycyA9IHRlbXBsYXRlU2VydmljZS5nZW5lcmF0ZU51bWJlclRlbXBsYXRlKGxhc3RSZXN1bHRzLmV1cm9OdW1iZXJzLCAncmVzdWx0X19udW1iZXItLWV1cm8nKTtcblxuICAgICAgICB0ZW1wbGF0ZVNlcnZpY2UuaW5qZWN0SHRtbCgnLmpzLXJlc3VsdC1udW1iZXJzJywgbnVtYmVycyArIGV1cm9OdW1iZXJzKTtcbiAgICAgICAgdGVtcGxhdGVTZXJ2aWNlLmluamVjdEh0bWwoJy5qcy1yZXN1bHRzX190YWJsZS1ib2R5JywgdGVtcGxhdGVTZXJ2aWNlLmdlbmVyYXRlUm93VGVtcGxhdGUobGFzdFJlc3VsdHMub2RkcykpO1xuICAgICAgICB0ZW1wbGF0ZVNlcnZpY2UuaW5qZWN0SHRtbCgnLmpzLXJlc3VsdHNfX2Z1bGwtZGF0ZScsIGluamVjdEZ1bGxEYXRlKGxhc3RSZXN1bHRzLmRhdGUpKTtcbiAgICAgICAgdGVtcGxhdGVTZXJ2aWNlLmluamVjdEh0bWwoJy5qcy1yZXN1bHRzX19zaG9ydC1kYXRlJywgaW5qZWN0U2hvcnREYXRlKGxhc3RSZXN1bHRzLmRhdGUpKTtcblxuICAgIH0pXG4gICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcblxuXG4iLCJleHBvcnQgZnVuY3Rpb24gaW5qZWN0RnVsbERhdGUgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZUZvcm1hdCgnZnVsbCcsIGRhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0U2hvcnREYXRlIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGVGb3JtYXQoJ3Nob3J0JywgZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGRhdGVGb3JtYXQoZm9ybWF0LCBkYXRlKSB7XG4gICAgY29uc3QgZGF5cyA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXTtcbiAgICBjb25zdCBtb250aCA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXTtcblxuICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgtMSwgZGF0ZS5kYXkpO1xuICAgIGlmIChmb3JtYXQgPT09ICdmdWxsJykge1xuICAgICAgICByZXR1cm4gYCR7ZGF5c1tkYXRlU3RyaW5nLmdldERheSgpXX0gJHtkYXRlU3RyaW5nLmdldERhdGUoKX0gJHttb250aFtkYXRlU3RyaW5nLmdldE1vbnRoKCldfSAke2RhdGVTdHJpbmcuZ2V0RnVsbFllYXIoKX1gO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSAnc2hvcnQnKSB7XG4gICAgICAgIHJldHVybiBgJHtkYXRlU3RyaW5nLmdldERhdGUoKX0uJHtkYXRlU3RyaW5nLmdldE1vbnRoKCkrMX0uJHtkYXRlU3RyaW5nLmdldEZ1bGxZZWFyKCl9YDtcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3Qgc3RhdGljRGF0YSA9IHtcbiAgICByb3cxIDoge1xuICAgICAgICByb21hbjogJ0knLFxuICAgICAgICBtYXRjaDogJzUgTnVtYmVycyArIDIgRXVyb251bWJlcnMnXG4gICAgfSxcbiAgICByb3cyIDoge1xuICAgICAgICByb21hbjogJ0lJJyxcbiAgICAgICAgbWF0Y2g6ICc1IE51bWJlcnMgKyAxIEV1cm9udW1iZXJzJ1xuICAgIH0sXG4gICAgcm93MyA6IHtcbiAgICAgICAgcm9tYW46ICdJSUknLFxuICAgICAgICBtYXRjaDogJzUgTnVtYmVycyArIDAgRXVyb251bWJlcnMnXG4gICAgfSxcbiAgICByb3c0IDoge1xuICAgICAgICByb21hbjogJ0lWJyxcbiAgICAgICAgbWF0Y2g6ICc0IE51bWJlcnMgKyAyIEV1cm9udW1iZXJzJ1xuICAgIH0sXG4gICAgcm93NSA6IHtcbiAgICAgICAgcm9tYW46ICdWJyxcbiAgICAgICAgbWF0Y2g6ICc0IE51bWJlcnMgKyAxIEV1cm9udW1iZXJzJ1xuICAgIH0sXG4gICAgcm93NiA6IHtcbiAgICAgICAgcm9tYW46ICdWSScsXG4gICAgICAgIG1hdGNoOiAnNCBOdW1iZXJzICsgMCBFdXJvbnVtYmVycydcbiAgICB9LFxuICAgIHJvdzcgOiB7XG4gICAgICAgIHJvbWFuOiAnVklJJyxcbiAgICAgICAgbWF0Y2g6ICczIE51bWJlcnMgKyAyIEV1cm9udW1iZXJzJ1xuICAgIH0sXG4gICAgcm93OCA6IHtcbiAgICAgICAgcm9tYW46ICdWSUlJJyxcbiAgICAgICAgbWF0Y2g6ICczIE51bWJlcnMgKyAxIEV1cm9udW1iZXJzJ1xuICAgIH0sXG4gICAgcm93OSA6IHtcbiAgICAgICAgcm9tYW46ICdJWCcsXG4gICAgICAgIG1hdGNoOiAnMyBOdW1iZXJzICsgMCBFdXJvbnVtYmVycydcbiAgICB9LFxuICAgIHJvdzEwIDoge1xuICAgICAgICByb21hbjogJ1gnLFxuICAgICAgICBtYXRjaDogJzIgTnVtYmVycyArIDIgRXVyb251bWJlcnMnXG4gICAgfSxcbiAgICByb3cxMSA6IHtcbiAgICAgICAgcm9tYW46ICdYSScsXG4gICAgICAgIG1hdGNoOiAnMiBOdW1iZXJzICsgMSBFdXJvbnVtYmVycydcbiAgICB9LFxuICAgIHJvdzEyIDoge1xuICAgICAgICByb21hbjogJ1hJSScsXG4gICAgICAgIG1hdGNoOiAnMiBOdW1iZXJzICsgMCBFdXJvbnVtYmVycydcbiAgICB9XG59O1xuXG4iLCJpbXBvcnQgeyBzdGF0aWNEYXRhIH0gZnJvbSAnLi9zdGF0aWMtZGF0YS1zZXJ2aWNlJ1xuXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0SHRtbChzZWxlY3RvciwgbWFya3VwKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5pbm5lckhUTUwgPSBtYXJrdXA7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU51bWJlclRlbXBsYXRlKG51bWJlcnMsIGNsYXNzTmFtZSkge1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICBudW1iZXJzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IG51bWJlciA9IGA8bGkgY2xhc3M9XCJyZXN1bHRfX251bWJlciAke2NsYXNzTmFtZX1cIj4ke2l0ZW19PC9saT5gO1xuICAgICAgICByZXR1cm4gcmVzdWx0ICs9IG51bWJlcjtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVJvd1RlbXBsYXRlKHJvd3MpIHtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG5cbiAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgT2JqZWN0LmtleXMocm93cykubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGA8dHIgY2xhc3M9XCJyZXN1bHRfX3RyXCI+XG4gICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJyZXN1bHRzX190ZFwiPiR7c3RhdGljRGF0YVsncm93JytpbmRleF0ucm9tYW59PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJlc3VsdHNfX3RkXCI+JHtzdGF0aWNEYXRhWydyb3cnK2luZGV4XS5tYXRjaH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicmVzdWx0c19fdGRcIj4ke3Jvd3NbJ3JhbmsnK2luZGV4XS53aW5uZXJzfXg8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicmVzdWx0c19fdGRcIj7igqwke3Jvd3NbJ3JhbmsnK2luZGV4XS5wcml6ZX08L3RkPlxuICAgICAgICAgICAgICAgICA8L3RyPmA7XG4gICAgICAgIHJlc3VsdCArPSByb3c7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iXX0=
