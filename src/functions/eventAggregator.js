import { getPtoHoursOnDay } from "./employeeInfoCalculator";
import moment from "moment";

export function getAggregatedEventList(pto, flex, holiday, payday, hireDate, planYear, beginningBalance) {
    let eventList = [
        ...pto.map(pto => ({
            type: "usage",
            date: pto.date,
            hours: pto.hours * -1
        })),
        ...payday.map(payday => ({
            type: "add",
            date: payday,
            hours: getPtoHoursOnDay(payday, hireDate, planYear)
        }))
    ];

    eventList.push({
        type: "beginning balance",
        date: moment({ month: 0, day: 1, year: planYear }).format("YYYY-MM-DD"),
        hours: beginningBalance
    });

    eventList = eventList.map(currentEvent => ({
        ...currentEvent,
        runningTotal: eventList.filter(allEvents => moment(allEvents.date).isBefore(moment(currentEvent.date)) || 
        (moment(allEvents.date).isSame(moment(currentEvent.date)))).reduce((acc, value) => { return acc + value.hours }, 0)
    }));

    return eventList.sort((a, b) => { return moment(b.date).isSameOrBefore(moment(a.date)) ? 1 : -1 })
}