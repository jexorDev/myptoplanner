import moment from "moment";
import { getNextBusinessDay } from "./dateHelpers";

export function getPayDays(year) {
    if (!year) return;
    year = parseInt(year);

    let payDays = [];

    for (let month = 0; month < 12; month++) {
        const midPayDay = getNextBusinessDay(moment({ month: month, day: 15, year: year }), 'previous');       
        payDays.push(midPayDay.format("YYYY-MM-DD"));

        const monthEndPayDay = getNextBusinessDay(moment({ month: month, day: 1, year: year }).endOf("month"), 'previous');
        payDays.push(monthEndPayDay.format("YYYY-MM-DD"));
        
    }

    return payDays;
}