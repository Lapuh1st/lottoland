import { injectFullDate, injectShortDate } from "./services/date-service";
import * as templateService from "./services/template-service";

const url = 'https://media.lottoland.com/api/drawings/euroJackpot';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

fetch(proxyUrl + url)
    .then(result => result.json())
    .then(data => {
        const lastResults = data.last;

        const numbers = templateService.generateNumberTemplate(lastResults.numbers);
        const euroNumbers = templateService.generateNumberTemplate(lastResults.euroNumbers, 'result__number--euro');

        templateService.injectHtml('.js-result-numbers', numbers + euroNumbers);
        templateService.injectHtml('.js-results__table-body', templateService.generateRowTemplate(lastResults.odds));
        templateService.injectHtml('.js-results__full-date', injectFullDate(lastResults.date));
        templateService.injectHtml('.js-results__short-date', injectShortDate(lastResults.date));

    })
    .catch(e => {
        console.log(e);
    });


