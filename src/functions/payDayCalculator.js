import moment from "moment";

export function getPayDays(year) {
    if (!year) return;
    year = parseInt(year);

    let payDays = [];

    for (let month = 0; month < 12; month++) {
        let midPayDay = moment({ month: month, day: 15, year: year });
        while (midPayDay.day() === 0 || midPayDay.day() === 6) {
            midPayDay.add(-1, 'day');
        }

        payDays.push(midPayDay.format("YYYY-MM-DD"));

        let monthEndPayDay = moment({ month: (month + 1) % 12, day: 1, year: (month + 1) === 12 ? year + 1 : year });
        monthEndPayDay.add(-1, 'day');

        while (monthEndPayDay.day() === 0 || monthEndPayDay.day() === 6) {
            monthEndPayDay.add(-1, 'day');
        }

        payDays.push(monthEndPayDay.format("YYYY-MM-DD"));
        
    }

    return payDays;
}