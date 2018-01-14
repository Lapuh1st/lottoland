import { staticData } from './static-data-service'

export function injectHtml(selector, markup) {
    document.querySelectorAll(selector).forEach(item => {
        item.innerHTML = markup;
    });
}

export function generateNumberTemplate(numbers, className) {
    let result = '';
    numbers.forEach(item => {
        const number = `<li class="result__number ${className}">${item}</li>`;
        return result += number;
    });
    return result;
}


export function generateRowTemplate(rows) {
    let result = '';

    for (let index = 1; index < Object.keys(rows).length; index++) {
        const row = `<tr class="result__tr">
                     <td class="results__td">${staticData['row'+index].roman}</td>
                     <td class="results__td">${staticData['row'+index].match}</td>
                     <td class="results__td">${rows['rank'+index].winners}x</td>
                     <td class="results__td">€${rows['rank'+index].prize}</td>
                 </tr>`;
        result += row;
    }
    return result;
}
