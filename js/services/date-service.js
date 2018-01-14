export function injectFullDate (date) {
    return dateFormat('full', date);
}

export function injectShortDate (date) {
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
